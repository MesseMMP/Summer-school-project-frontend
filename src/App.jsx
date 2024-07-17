import Header from "./Components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import {useEffect, useState} from "react";
import NewJokeForm from "./Components/pages/NewJoke";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    // Функция для получения даты истечения срока действия токена
    function getTokenExpirationDate(token) {
        if (!token) {
            return null;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);

        if (!payload.exp) {
            return null;
        }

        return new Date(payload.exp * 1000);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        // Функция для проверки истечения срока действия токена
        function checkTokenExpiration() {
            const token = localStorage.getItem('token');
            const now = new Date();
            const expirationDate = getTokenExpirationDate(token);
            const timeLeft = expirationDate - now;

            if (timeLeft <= 0) {
                toast.error("Your session has expired. Please log in again.");
                handleLogout();
            }
            // Если осталось меньше 2 минут, выводит предупреждения
            else if (timeLeft <= 2 * 1000 * 60) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                toast.warn(`Time left for session: ${hours}h ${minutes}m ${seconds}s`);
            }
        }

        checkTokenExpiration();
        // Интервал для периодической проверки
        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 30000); // Проверка каждые 30 секунд

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    return (
        <Router>
            <div className="App">
                <Header categories={categories} isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>}/>
                        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/create-joke" element={<NewJokeForm categories={categories} isAuthenticated={isAuthenticated}/>}
                        />
                    </Routes>
                </div>
            </div>
            <ToastContainer theme="colored"/>
        </Router>
    );
}

export default App;
