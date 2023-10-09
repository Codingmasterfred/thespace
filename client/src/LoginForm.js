import React from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        //add some suthentication logic (api call, state logic, etc)
        //adding a message to show the button was clicked
        alert('login button was clicked');

    };

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Goup controlId="loginPassword">
                <Form.Control type="password" placeholder="Password" />
            </Form.Goup>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;