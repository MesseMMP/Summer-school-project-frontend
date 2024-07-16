import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";

const NewJokeForm = ({categories}) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8008/create-joke', {
                title: title,
                text: text,
                tags: selectedTags.length > 0 ? selectedTags.join(', ') : 'General'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success(response.data.message);
            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response);
        }
    };

    const handleTagClick = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        } else {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        }
    };

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Create New Joke</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Joke Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter joke title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                        <Form.Label>Joke Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter joke text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tags</Form.Label>
                        <div>
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant={`${
                                        selectedTags.includes(category)
                                            ? 'secondary'
                                            : 'outline-secondary'
                                    }`}
                                    className={"me-1"}
                                    size="sm"
                                    style={{
                                        cursor: 'pointer',
                                        marginBottom: '5px',
                                    }}
                                    onClick={() => handleTagClick(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className="mt-3">
                        Create Joke
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default NewJokeForm;
