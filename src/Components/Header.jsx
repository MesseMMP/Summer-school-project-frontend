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

const Header = () => {
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
                        <Nav.Link href="/login">Sign in</Nav.Link>
                        <Nav.Link href="/register">Sign up</Nav.Link>
                        <Nav.Link href="#action2">Random joke</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Politics</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Satire</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Military humor</NavDropdown.Item>
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