import Header from "./Components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";


const App = () => {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;