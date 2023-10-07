import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react"

function ShowAllModalComponent(props) {
  return (
    <Modal show={props.seeAllModal} onHide={ ()=>props.setSeeAllModal(false)}
   
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => Modal.Footer> props.setSeeAllModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default ShowAllModalComponent