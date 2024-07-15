import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Badge,
} from "react-bootstrap";
import logo from "../img/logo.svg";
import {useNavigate, useSearchParams} from "react-router-dom";

const Header = ({categories, isAuthenticated, handleLogout, jokeCount}) => {

    const setSearchParams = useSearchParams()[1];
    const navigate = useNavigate();

    const clickCategoryHandler = (filterValue) => {
        setSearchParams({filter: filterValue});
    }

    const clickRandomJoke = (value) => {
        setSearchParams({random: value});
    }

    const handleNewJokeClick = () => {
        navigate('/create-joke');
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
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
                    <div className="d-flex align-items-center">
                        <span className="me-2">Total Jokes on Site:</span>
                        <Badge pill bg={"primary"}>
                            {jokeCount}
                        </Badge>
                    </div>
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
                            <Nav.Link onClick={() => clickRandomJoke("true")}>Random joke</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;