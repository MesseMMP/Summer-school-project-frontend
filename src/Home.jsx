import Header from "./Components/Header";
import JokeCard from "./Components/JokeCard";

function Home() {
    const jokes = [
        {
            title: "Funny Joke 1",
            text: "This is a funny joke!",
            tags: ["funny", "general"],
            date: "2023-07-12T00:00:00Z"
        },
        {
            title: "Lorem 150 joke",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam blanditiis culpa deleniti dolorum esse et laboriosam maiores nam perspiciatis placeat, porro quae quaerat rem rerum saepe sit totam, veniam, vitae voluptas. Doloribus eum ipsa ipsum non nulla odio odit reiciendis! Autem blanditiis, dicta doloremque ducimus ipsum labore officia perferendis praesentium similique totam! Aliquam deleniti eveniet facere id laboriosam officiis provident quam quas sint voluptatum. Adipisci assumenda, consequatur consequuntur culpa debitis doloribus eos, iste nemo possimus quaerat qui quia quibusdam, reprehenderit tenetur veniam? Architecto dolores eius est officia? Ad esse facere illum nam tenetur, velit! Alias assumenda autem beatae consequatur culpa cupiditate deleniti doloribus eaque et eum ex facilis hic, laborum laudantium non omnis perferendis placeat possimus quas quasi quidem repellendus soluta vel voluptatem voluptates? Animi aspernatur consequuntur cumque deserunt distinctio enim est et excepturi id, ipsum itaque laboriosam, libero maxime minima nobis odio porro similique suscipit, tenetur voluptas voluptatibus.",
            tags: ["hilarious", "silly"],
            date: "2023-07-11T00:00:00Z"
        }
    ];
    return (
        <div className="App">
            <Header/>
            <div className="container mt-3">
                {jokes.map((joke, index) => (
                    <JokeCard
                        key={index}
                        title={joke.title}
                        text={joke.text}
                        tags={joke.tags}
                        date={joke.date}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;