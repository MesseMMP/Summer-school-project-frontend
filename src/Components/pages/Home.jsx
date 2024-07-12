import JokeCard from "../JokeCard";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const Home = ({isAuthenticated}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jokesPerPage] = useState(10); // Количество анекдотов на одной странице

    const searchParams = useSearchParams()[0];

    useEffect(() => {
        setSelectedCategory(searchParams.get('filter'));
        setShowRandomJoke(Boolean(searchParams.get('random')));
    }, [searchParams]);

    const jokes = [
        {
            title: "Почему программисты предпочитают темный режим?",
            text: "Потому что свет привлекает ошибки!",
            tags: ["technology"],
            date: "2023-09-10T00:00:00Z"
        },
        {
            title: "Зачем ученые изучают кошек?",
            text: "Чтобы понять, как управлять миром!",
            tags: ["animals"],
            date: "2023-09-11T00:00:00Z"
        },
        {
            title: "Шутка о школе",
            text: "Почему учительница всегда улыбается? Потому что она знает, что ей скоро каникулы!",
            tags: ["school"],
            date: "2023-09-12T00:00:00Z"
        },
        {
            title: "Анекдот о политике",
            text: "Политика похожа на анекдот — порой смешно, но чаще грустно.",
            tags: ["politics"],
            date: "2023-09-13T00:00:00Z"
        },
        {
            title: "Анекдот про путешествия",
            text: "Как называется самый ленивый вид путешествия? Стояние в очереди на паспортный контроль.",
            tags: ["travel"],
            date: "2023-09-14T00:00:00Z"
        },
        {
            title: "Работа в офисе",
            text: "Офисное рабство — это когда ты идешь на работу не потому, что хочешь, а потому, что должен.",
            tags: ["work"],
            date: "2023-09-15T00:00:00Z"
        },
        {
            title: "Анекдот о спорте",
            text: "Как называется самая опасная игра? Монополия с братом, который проиграл в споре.",
            tags: ["sports"],
            date: "2023-09-16T00:00:00Z"
        },
        {
            title: "Юмор о еде",
            text: "Если вы не можете сбросить вес, возможно, ваша еда скучна. Попробуйте добавить больше юмора в свой обед!",
            tags: ["food"],
            date: "2023-09-17T00:00:00Z"
        },
        {
            title: "Шутка о животных",
            text: "Что говорит собака программиста? 'Woof woof error woof woof!'",
            tags: ["animals", "technology"],
            date: "2023-09-18T00:00:00Z"
        },
        {
            title: "Анекдот о технике",
            text: "Как называется устройство, которое делает вас богаче? Принтер для денег.",
            tags: ["technology"],
            date: "2023-09-19T00:00:00Z"
        },
        {
            title: "Шутка про медицину",
            text: "Врачи советуют есть фрукты каждый день. Так что я решил начать с пиццы с ананасом!",
            tags: ["food", "health"],
            date: "2023-09-20T00:00:00Z"
        },
        {
            title: "Анекдот о путешествиях",
            text: "Как называется самая длинная дорога? Та, по которой дети спрашивают 'Мы скоро приедем?'",
            tags: ["travel"],
            date: "2023-09-21T00:00:00Z"
        },
        {
            title: "Шутка о работе",
            text: "Работа как кофе — иногда кажется, что без нее невозможно проснуться, но слишком много вызывает сердечные проблемы.",
            tags: ["work"],
            date: "2023-09-22T00:00:00Z"
        },
        {
            title: "Анекдот о спорте",
            text: "Почему баскетболисты так хорошо владеют мячом? Потому что им приходится делать много шуток на тренировках!",
            tags: ["sports"],
            date: "2023-09-23T00:00:00Z"
        },
        {
            title: "Юмор о технологиях",
            text:
                "Как называется самая быстрая игра? Установка всех обновлений перед выключением компьютера.",
            tags: ["technology"],
            date: "2023-09-24T00:00:00Z"
        },
        {
            title: "Анекдот о животных",
            text:
                "Почему коты такие хорошие программисты? Потому что им всегда удается найти клавишу 'Esc'!",
            tags: ["animals", "technology"],
            date: "2023-09-25T00:00:00Z"
        }

    ];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showRandomJoke, setShowRandomJoke] = useState(false);

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
                    isAuthenticated={isAuthenticated}
                    title={joke.title}
                    text={joke.text}
                    tags={joke.tags}
                    date={joke.date}
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
