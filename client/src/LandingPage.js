import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


function LandingPage() {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [isSignUpFormVisible, setSignUpFormVisibile] = useState(false);

    const handleLoginClick = () => {
        setLoginFormVisible(true);
        setSignUpFormVisible(false);
    };

    const handleSignUpClick = () => {
        setSignUpFormVisible(true);
        setLoginFormVisible(false);
    }

    return (
        <Container LandingPage>
            <Row>
                <Col>
                    <img src="https://picsum.photos/200/300" alt="Company Logo" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleLoginClick}>Login</Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={handleSignUpClick}>Sign Up</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                {isLoginFormVisible && <LoginForm/>}
                {isSignUpFormVisible && <SignUpForm />}
                </Col>
            </Row>

        </Container>
    );
};

export default LandingPage;