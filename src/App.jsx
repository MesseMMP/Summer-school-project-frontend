import Header from "./Components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import {useEffect, useState} from "react";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    };
    return (
        <Router>
            <div className="App">
                <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />}/>
                        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;