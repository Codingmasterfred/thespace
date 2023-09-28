import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import JobCard from "./JobCard"
import AddJobModal from "./AddJobModal"

function ModalShow(props) {
    var selectedJoblistingIndex = null;
    var listings = props.jobListings.slice(0, 3)
    var jobListingsHTML = listings.map((listing, index) => {
        var html = null
        if (listing == null) {
            html =
                <button onClick={() => {
                    props.handleShow()
                    }} style={{ position: "relative", width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>

                </button>
        }
        else {
            html = <JobCard setModal1Set1={props.setModal1Set1}
                setModal1Title2={props.setModal1Title2}
                setModal1Description1={props.setModal1Description1}
            />
        }
        return html
    })

    return (
        <>
            <div id="PortfolioSnapchot">

                {jobListingsHTML}
                <AddJobModal
                selectedJoblistingIndex={selectedJoblistingIndex}
                show={props.show}
                handleClose={props.handleClose}
                setModalTitle={props.setModalTitle}
                setModalDescription={props.setModalDescription}
                SubmitJobListing={props.SubmitJobListing}
                />
            </div>



        </>
    )
}

export default ModalShow