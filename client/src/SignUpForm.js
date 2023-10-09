import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SignUpForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        profile_photo: '',
        bio: '',
        user_type: 'Leadership', // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here (e.g., API calls, state management).
        // For now, let's just display the form data.
        alert('Signup form data: ' + JSON.stringify(formData));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                />
            </Form.Group>
            <Form.Group controlId="signupLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                />
            </Form.Group>
            <Form.Group controlId="signupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
            </Form.Group>
            <Form.Group controlId="signupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
            </Form.Group>
            <Form.Group controlId="signupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </Form.Group>
            <Form.Group controlId="signupProfilePhoto">
                <Form.Label>Profile Photo URL</Form.Label>
                <Form.Control
                    type="text"
                    name="profile_photo"
                    value={formData.profile_photo}
                    onChange={handleChange}
                    placeholder="Enter profile photo URL"
                />
            </Form.Group>
            <Form.Group controlId="signupBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter bio"
                />
            </Form.Group>
            <Form.Group controlId="signupUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                    as="select"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                >
                    <option value="Leadership">Leadership</option>
                    <option value="Freelancer">Freelancer</option>
                </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">
                Sign Up
            </Button>
        </Form>
    );
};


export default SignUpForm;