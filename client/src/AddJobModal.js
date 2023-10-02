import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from 'react-bootstrap/Modal';

function AddJobModal(props){
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            {console.log("updated",props.updateThisVar)}
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                       
                        onChange={(e) => { props.setModalTitle(e.target.value) }}
                        placeholder="Job Title"
                        autoFocus
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        placeholder="Job Description"
            
                        onChange={(e) => { props.setModalDescription(e.target.value) }}
                        as="textarea"
                        rows={9} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() =>props.SubmitJobListing(props.updateThisVar)}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
    )
}
export default AddJobModal