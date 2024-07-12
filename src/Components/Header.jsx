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
import {useSearchParams} from "react-router-dom";

const Header = ({isAuthenticated, handleLogout}) => {

    const setSearchParams = useSearchParams()[1];

    const clickCategoryHandler = (filterValue) => {
        setSearchParams({filter: filterValue});
    }

    const clickRandomJoke = (value) => {
        setSearchParams({random: value});
    }

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
                                <Nav.Link href="/profile">Profile</Nav.Link>
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
                            <NavDropdown.Item onClick={() => clickCategoryHandler("general")}>General</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => clickCategoryHandler("politics")}>Politics</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("school")}>School</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => clickCategoryHandler("technology")}>Technology</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("food")}>Food</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("sports")}>Sports</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("travel")}>Travel</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("work")}>Work</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("animals")}>Animals</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickCategoryHandler("health")}>Health</NavDropdown.Item>
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