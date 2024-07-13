import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminSecret, setAdminSecret] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8008/register', {
                username,
                email,
                password,
                isAdmin,
                adminSecret
            });
            alert(response.data.message);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Register</Card.Title>
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

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <Form.Group controlId="formBasicAdmin">
                        <Form.Check
                            type="checkbox"
                            label="I am admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>

                    {isAdmin && (
                        <Form.Group controlId="formBasicAdminSecret">
                            <Form.Label>Admin Secret</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter admin secret"
                                value={adminSecret}
                                onChange={(e) => setAdminSecret(e.target.value)}
                            />
                        </Form.Group>
                    )}

                    <Button variant="outline-primary" type="submit" className="mt-3">
                        Register
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Register;