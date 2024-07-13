import JokeCard from "../JokeCard";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jokesPerPage] = useState(10); // Количество анекдотов на одной странице

    const searchParams = useSearchParams()[0];

    useEffect(() => {
        setSelectedCategory(searchParams.get('filter'));
        setShowRandomJoke(Boolean(searchParams.get('random')));
    }, [searchParams]);


    const [jokes, SetJokes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showRandomJoke, setShowRandomJoke] = useState(false);

    const getJokes = async () => {
        const response = await axios.get("http://127.0.0.1:8008/jokes")
        if (response.status === 200) {
            SetJokes(response.data.jokes);
        }
    }

    useEffect(() => {
        getJokes()
    }, [])


    // Фильтрация анекдотов по выбранной категории
    let filteredJokes = selectedCategory === null
    || selectedCategory === 'All'
        ? jokes
        : jokes.filter(joke => joke.tags.includes(selectedCategory));

    if (showRandomJoke) {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        filteredJokes = jokes.slice(randomIndex, randomIndex + 1);
    }

    // Вычисляем индекс первого и последнего анекдота на текущей странице
    const indexOfLastJoke = currentPage * jokesPerPage;
    const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
    const currentJokes = filteredJokes.slice(indexOfFirstJoke, indexOfLastJoke);


    return (
        <div>
            {currentJokes.map((joke, index) => (
                <JokeCard
                    key={index}
                    title={joke.title}
                    text={joke.text}
                    tags={joke.tags}
                    date={joke.date}
                    userId={joke.userId}
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
