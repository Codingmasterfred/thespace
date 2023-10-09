import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


function LandingPage() {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [isSignUpFormVisible, setSignUpFormVisible] = useState(false);

    const handleLoginClick = () => {
        setLoginFormVisible(true);
        setSignUpFormVisible(false);
    };

    const handleSignUpClick = () => {
        setSignUpFormVisible(true);
        setLoginFormVisible(false);
    }

    const handleSignUp = (formData) => {
        // Handle the signup logic here (e.g., API calls, state management).
        // Redirect based on user_type.
        if (formData.user_type === 'Leadership') {
          history.push('/CreatecorporateProfileComponent');
        } else if (formData.user_type === 'Freelancer') {
          history.push('/CreatefreelancerProfileComponent');
        }
      };

    return (
        <Container>
            <Row>
                <Col>
                    <img src={logo} alt="Company Logo" />
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