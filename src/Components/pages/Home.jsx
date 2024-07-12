import JokeCard from "../JokeCard";

const Home = () => {
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
        }
    ];

    return (
        <div>
            {jokes.map((joke, index) => (
                <JokeCard
                    key={index}
                    title={joke.title}
                    text={joke.text}
                    tags={joke.tags}
                    likes={joke.likes}
                    date={joke.date}
                />
            ))}
        </div>
    );
}

export default Home;