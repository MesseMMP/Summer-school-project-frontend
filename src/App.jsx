import Header from "./Components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import {useEffect, useState} from "react";
import NewJokeForm from "./Components/pages/NewJoke";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jokeCount, setJokeCount] = useState(0);

    const updateJokeCount = (number) => {
        setJokeCount(number);
    };
    const categories = [
        "General",
        "Technology",
        "Science",
        "Politics",
        "Sports",
        "Animals",
        "School",
        "Work",
        "Adventure"
    ];

    // Загружаем состояние авторизации из localStorage при начальной загрузке
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);


    // Функция для изменения состояния авторизации
    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="App">
                <Header categories={categories} isAuthenticated={isAuthenticated} handleLogout={handleLogout}
                        jokeCount={jokeCount}/>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home updateJokeCount={updateJokeCount}/>}/>
                        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/create-joke" element={<NewJokeForm categories={categories}/>}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
