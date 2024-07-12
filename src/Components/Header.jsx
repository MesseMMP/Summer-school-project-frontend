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

const Header = ({ isAuthenticated, handleLogout }) => {

    const setSearchParams = useSearchParams()[1];

    const clickHandler = (filterValue) => {
        setSearchParams({filter: filterValue});
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
                                <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Sign in</Nav.Link>
                                <Nav.Link href="/register">Sign up</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="#action2">Random joke</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => clickHandler("general")}>General</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("politics")}>Politics</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("school")}>School</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("technology")}>Technology</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("food")}>Food</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("sports")}>Sports</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("travel")}>Travel</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("work")}>Work</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("animals")}>Animals</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => clickHandler("health")}>Health</NavDropdown.Item>
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