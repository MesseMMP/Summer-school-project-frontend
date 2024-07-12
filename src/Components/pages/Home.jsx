import JokeCard from "../JokeCard";
import Pagination from "./Pagination";
import {useState} from "react";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jokesPerPage] = useState(10); // Количество анекдотов на одной странице

    const jokes = [
        {
            title: "Funny Joke 1",
            text: "This is a funny joke!",
            tags: ["funny", "general"],
            likes: 12,
            date: "2023-07-12T00:00:00Z"
        },
        {
            title: "Another Joke",
            text: "Here's another hilarious joke!",
            tags: ["hilarious", "silly"],
            likes: 34,
            date: "2023-07-11T00:00:00Z"
        },
        {
            title: "Another Joke",
            text: "Here's another hilarious joke!",
            tags: ["hilarious", "silly"],
            likes: 34,
            date: "2023-07-11T00:00:00Z"
        },
        {
            title: "Another Joke",
            text: "Here's another hilarious joke!",
            tags: ["hilarious", "silly"],
            likes: 34,
            date: "2023-07-11T00:00:00Z"
        },
        {
            title: "Another Joke",
            text: "Here's another hilarious joke!",
            tags: ["hilarious", "silly"],
            likes: 34,
            date: "2023-07-11T00:00:00Z"
        },
    ];
// Вычисляем индекс первого и последнего анекдота на текущей странице
    const indexOfLastJoke = currentPage * jokesPerPage;
    const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
    const currentJokes = jokes.slice(indexOfFirstJoke, indexOfLastJoke);

    return (
        <div>
            {currentJokes.map((joke, index) => (
                <JokeCard
                    key={index}
                    title={joke.title}
                    text={joke.text}
                    tags={joke.tags}
                    likes={joke.likes}
                    date={joke.date}
                />
            ))}

            {/* Компонент пагинации */}
            <Pagination
                jokesPerPage={jokesPerPage}
                totalJokes={jokes.length}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
        </div>
    );
}

export default Home;