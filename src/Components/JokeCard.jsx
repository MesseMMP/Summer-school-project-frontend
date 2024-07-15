import React, {useEffect, useState} from 'react';
import {Card, Badge, Button} from 'react-bootstrap';
import './JokeCard.css';
import axios from "axios";

const JokeCard = ({jokeId, title, text, tags, date, userId, isAdmin, getJokesAgain}) => {

    const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const [author, setAuthor] = useState('');


    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8008/user/${userId}`);
                setAuthor(response.data.username);
            } catch (error) {
                setAuthor("Unknown");
            }
        };


        fetchAuthor();

    }, [userId]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8008/delete-joke/${jokeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert(response.data.message);
            getJokesAgain()
        } catch (error) {
            alert('An error occurred while deleting the joke');
        }
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <div className="mb-2">
                    {parsedTags.map((tag, index) => (
                        <Badge bg="secondary" key={index} className="me-1">{tag}</Badge>
                    ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
                    <div className="d-flex align-items-center author-info">
                        <span className="author-label">Author:</span>
                        <span className="author-name ms-2">{author}</span>
                    </div>
                    {isAdmin && (
                        <Button variant="danger" className="ms-3" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default JokeCard;
