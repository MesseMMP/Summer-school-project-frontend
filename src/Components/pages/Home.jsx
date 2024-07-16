import JokeCard from "../JokeCard";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const Home = ({isAuthenticated}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jokesPerPage] = useState(10); // Количество анекдотов на одной странице

    const searchParams = useSearchParams()[0];

    const [jokes, SetJokes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showRandomJoke, setShowRandomJoke] = useState(false);
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);

    useEffect(() => {
        setSelectedCategory(searchParams.get('filter'));
        setShowRandomJoke(Boolean(searchParams.get('random')));
        setShowLeaderBoard(Boolean(searchParams.get('leaderboard')));
    }, [searchParams]);

    const getJokes = async () => {
        const response = await axios.get(`http://127.0.0.1:8008/jokes`)
        if (response.status === 200) {
            SetJokes(response.data.jokes);
        }
    }

    useEffect(() => {
        getJokes()
    }, [])

    const [likeStates, setLikeStates] = useState({}); // Состояние для хранения состояний лайков

    // Функция для получения состояний лайков для конкретного анекдота
    const getLikeState = async (jokeId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8008/is-liked/${jokeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                if (response.data.is_liked === 'true') {
                    return true
                } else {
                    return false
                }
            }
        } catch (error) {
            return false;
        }
    };

    // Получение и сохранение количества лайков и состояний для каждого анекдота
    useEffect(() => {
        const fetchLikesForJokes = async () => {
            const states = {};
            for (const joke of jokes) {
                states[joke.id] = await getLikeState(joke.id);
            }
            setLikeStates(states);
        };
        fetchLikesForJokes();
    }, [jokes]);

    const fetchTopJokes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8008/top-jokes');
            setFilteredJokes(response.data.jokes);
        } catch (error) {
            console.error('Error fetching top jokes', error);
        }
    };

    const [filteredJokes, setFilteredJokes] = useState([]);

    useEffect(() => {
        if (selectedCategory !== undefined && selectedCategory !== null && selectedCategory !== "All") {
            setFilteredJokes(jokes.filter(joke => joke.tags.includes(selectedCategory)))
        } else if (showRandomJoke) {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            setFilteredJokes(jokes.slice(randomIndex, randomIndex + 1));
        } else if (showLeaderBoard) {
            fetchTopJokes()
        } else {
            setFilteredJokes(jokes);
        }
    }, [selectedCategory, showRandomJoke, showLeaderBoard, jokes]);


    // Вычисляем индекс первого и последнего анекдота на текущей странице
    const indexOfLastJoke = currentPage * jokesPerPage;
    const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
    const currentJokes = filteredJokes.slice(indexOfFirstJoke, indexOfLastJoke);
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {

        const checkAdmin = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8008/check-admin`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.isAdmin === 'true') {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            } catch (error) {
                setAdmin(false);
            }
        };
        checkAdmin();
    })


    return (
        <div>
            {currentJokes.map((joke, index) => (
                <JokeCard
                    key={index}
                    jokeId={joke.id}
                    title={joke.title}
                    text={joke.text}
                    tags={joke.tags}
                    date={joke.date}
                    likes={joke.likes}
                    isLiked={likeStates[joke.id]}
                    isAuthenticated={isAuthenticated}
                    userId={joke.userId}
                    isAdmin={isAdmin}
                    getJokesAgain={getJokes}
                />
            ))}

            {/* Компонент пагинации */}
            <Pagination
                jokesPerPage={jokesPerPage}
                totalJokes={filteredJokes.length}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
        </div>
    );
}

export default Home;
