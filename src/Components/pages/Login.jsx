import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8008/login', {
                username,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            handleLogin();
            navigate('/');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className="mt-3">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Login;
