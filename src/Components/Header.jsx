import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Form,
    Button,
} from "react-bootstrap";
import logo from "../img/logo.svg";
import {useNavigate, useSearchParams} from "react-router-dom";

const Header = ({categories, isAuthenticated, handleLogout}) => {

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
            <Container fluid>
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
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        {isAuthenticated ? (
                            <>
                                <Nav.Link onClick={handleNewJokeClick}>New Joke</Nav.Link>
                                <Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Sign in</Nav.Link>
                                <Nav.Link href="/register">Sign up</Nav.Link>
                            </>
                        )}
                        <Nav.Link onClick={() => clickRandomJoke("true")}>Random joke</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {categories.map((category, index) => (
                                <NavDropdown.Item key={index} onClick={() => clickCategoryHandler(category)}>
                                    {category}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;