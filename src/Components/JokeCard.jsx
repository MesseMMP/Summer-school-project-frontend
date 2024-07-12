import React, {useState} from 'react';
import {Card, Badge} from 'react-bootstrap';
import likeIcon from '../img/like.svg';
import './JokeCard.css'; // Подключаем стили

const JokeCard = ({title, text, tags, date}) => {
    const [likes, setLikes] = useState(0)

    function handleClick() {
        setLikes(likes + 1);
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <div className="mb-2">
                    {tags.map((tag, index) => (
                        <Badge bg="secondary" key={index} className="me-1">{tag}</Badge>
                    ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
                    <div className="d-flex align-items-center">
                        <button className="like-button" onClick={handleClick}>
                            <img
                                src={likeIcon}
                                alt="like icon"
                                width="20"
                                height="20"
                                className="me-1"
                            />
                        </button>
                        <span>{likes}</span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default JokeCard;