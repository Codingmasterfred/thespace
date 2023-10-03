
import React, { useState } from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import JobCard from "./JobCard"
import AddJobModal from "./AddJobModal"
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalShow(props) {
    const [seeAllModal, setSeeAllModal] = useState(false)

    var selectedJoblistingIndex = null;
    var listings = props.jobListings.slice(props.currentIndex, props.endIndex)
    // console.log(props.currentIndex, "currentIndex", props.endIndex, "endIndex")
    var jobListingsHTML = listings.map((listing, index) => {
        // console.log(listing.created)

        if (!listing.created === true || listing.created === true && listing.deleted === true || !listing.deleted === false) {
            // console.log("here")
            return (

                <button onClick={() => {
                    props.setUpdateThisVar(listing)
                    
                    props.handleShow()
                    // console.log("made it ")
                    
                }} style={{ position: "relative", width: "28%", height: "70%", display: "flex", alignItems: "center", justifyContent: "center", padding:"0" }}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>

                </button>
            )

        }
        else if (listing.created === true && index === 0) {
            // console.log("index 0")
            
            return (
                <JobCard
                onCLick={ props.setUpdateThisVar(listing) }
                setUpdateThisVar={props.setUpdateThisVar}
                    updateThisVar={props.updateThisVar}
                    jobListings={props.jobListings}
                    listing={listing}
                    modalTitle={props.setModalTitle}
                    postedDate={props.postedDate}
                    handleShow={props.handleShow}
                    setModalDescription={props.setModalDescription}
                    setModalTitle={props.setModalTitle}
                    setJobListings={props.setJobListings}
                    
                    

                />
            )
        }
        else if (listing.created === true && index === 1) {
            // console.log("index1")

            return (
                <JobCard
                updateThisVar={props.updateThisVar}
                jobListings={props.jobListings}
                listing={listing}
                modalTitle={props.setModalTitle}
                postedDate={props.postedDate}
                handleShow={props.handleShow}
                setModalDescription={props.setModalDescription}
                setModalTitle={props.setModalTitle}
                setJobListings={props.setJobListings}
                />
                )
            }
            else if (listing.created === true && index === 2) {
            // console.log("index2")
            return (
                <>

                <JobCard
                updateThisVar={props.updateThisVar}
                    jobListings={props.jobListings}
                    listing={listing}
                    modalTitle={props.setModalTitle}
                    postedDate={props.postedDate}
                    handleShow={props.handleShow}
                    setModalDescription={props.setModalDescription}
                    setModalTitle={props.setModalTitle}
                    setJobListings={props.setJobListings}
                
                />
                </>
                )
            }

            
            

        })

    if (listings.every(obj => obj.created === true && props.endIndex < props.jobListings.length)) {
        props.setShowNextArrow(true)

    }
    else {
        props.setShowNextArrow(false)
    }
    
    if (props.currentIndex > 0) {
        props.setShowPreviousArrow(true)
    }
    else {
        props.setShowPreviousArrow(false)
    }

    if(props.endIndex >= 3 && props.showNextArrow ){
        props.setSeeAllModal(true)
    }
    
    
    
    
    
    
    
    
    return (
        <>
        
                {props.seeAllModal ? <h6 style={{textAlign:"right", postition:"absolute"}}>See More</h6> : <></>}
            <div id="PortfolioSnapchot" style={{ alignItems: "center",padding:"1px" }}>
                {props.showPreviousArrow &&
                    (
                        <svg style={{  minHeight: "110px" }} onClick={props.handlePrevious} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    )}


                {jobListingsHTML}
                <AddJobModal
               
               updateThisVar={props.updateThisVar}
               setUpdateThisVar={props.setUpdateThisVar}
               selectedJoblistingIndex={selectedJoblistingIndex}
               show={props.show}
               handleClose={props.handleClose}
               modalTitle={props.modalTitle}
               modalDescription={props.modalDescription}
               setModalTitle={props.setModalTitle}
               setModalDescription={props.setModalDescription}
               SubmitJobListing={props.SubmitJobListing}
               
               
               />
                {props.showNextArrow &&
                    (
                        <svg style={{padding:"0" , margin:"0"}} onClick={props.handleNext} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                    )}
            </div>



            {console.log(props.jobListings)}
            {console.log("listing",props.updateThisVar)}
        </>
    )
}

export default ModalShow