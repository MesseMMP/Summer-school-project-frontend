import React, {useEffect, useState} from 'react';
import {Card, Badge} from 'react-bootstrap';
import './JokeCard.css';
import axios from "axios";

const JokeCard = ({title, text, tags, date, userId}) => {

    const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const [author, setAuthor] = useState('');

    useEffect(() => {
        // Функция для получения имени автора анекдота
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
                </div>
            </Card.Body>
        </Card>
    );
};

export default JokeCard;
