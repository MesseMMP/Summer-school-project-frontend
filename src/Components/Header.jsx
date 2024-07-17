import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import logo from "../img/logo.svg";
import {useNavigate} from "react-router-dom";

const Header = ({categories, isAuthenticated, handleLogout}) => {

    const navigate = useNavigate();

    const clickCategoryHandler = (filterValue) => {
        navigate(`/?filter=${filterValue}`);
    }

    const clickRandomJoke = (value) => {
        navigate(`/?random=${value}`);
    }

    const showLeaderBoard = (value) => {
        navigate(`/?leaderboard=${value}`);
    }

    const handleNewJokeClick = () => {
        navigate('/create-joke');
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary" variant="light" id="navbar">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Navbar.Brand href="/">
                        <img
                            alt="logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Summer school jokes
                    </Navbar.Brand>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span className="welcome-message">Enjoy your stay and explore jokes!</span>
                </div>
                <div className="d-flex align-items-center">
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            {isAuthenticated ? (
                                <>
                                    <Nav.Link onClick={handleNewJokeClick}>New Joke</Nav.Link>
                                    <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login">Sign in</Nav.Link>
                                    <Nav.Link href="/register">Sign up</Nav.Link>
                                </>
                            )}
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                {categories.map((category, index) => (
                                    <NavDropdown.Item key={index} onClick={() => clickCategoryHandler(category)}>
                                        {category}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link onClick={() => showLeaderBoard("true")}>LeaderBoard</Nav.Link>
                            <Nav.Link onClick={() => clickRandomJoke("true")}>Random joke</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;