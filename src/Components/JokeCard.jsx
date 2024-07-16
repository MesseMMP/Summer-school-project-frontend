import React, {useEffect, useState} from 'react';
import {Card, Badge, Button} from 'react-bootstrap';
import './JokeCard.css';
import axios from "axios";
import likedIcon from '../img/liked.svg'
import unlikedIcon from '../img/unliked.svg'
import { toast } from 'react-toastify';

const JokeCard = ({
                      jokeId,
                      title,
                      text,
                      tags,
                      date,
                      likes,
                      isLiked,
                      isAuthenticated,
                      userId,
                      isAdmin,
                      getJokesAgain
                  }) => {

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
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            getJokesAgain()
        } catch (error) {
            toast.error('An error occurred while deleting the joke!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8008/like-post/${jokeId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            getJokesAgain(); // обновить шутки после изменения лайка
        } catch (error) {
            toast.error('You need to be signed in to like posts!');
        }
    };

    function handleClick() {
        handleLike()
    }

    return (
        <Card className="mb-3" id="joke-card">
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
                    <div className="d-flex align-items-center">
                        <button className="like-button" onClick={handleClick}>
                            <img
                                src={isAuthenticated ? (isLiked ? likedIcon : unlikedIcon) : unlikedIcon}
                                alt="like icon"
                                width="20"
                                height="20"
                                className="me-1"
                            />
                        </button>
                        <span>{likes}</span>
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
