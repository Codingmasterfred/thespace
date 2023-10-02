import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import JobCard from "./JobCard"
import AddJobModal from "./AddJobModal"
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalShow(props) {
    var selectedJoblistingIndex = null;
    var listings = props.jobListings.slice(props.currentIndex, props.endIndex)
    var jobListingsHTML = listings.map((listing, index) => {
        console.log(listing.created)
        if (listing.created === false ) {
          console.log("here")
            return(

                <button onClick={() => {
                    console.log(listing)
                    props.setUpdateThisVar(listing)
                   
                    props.handleShow()
                    console.log("made it ")
                    
                }} style={{ position: "relative", width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>

                </button>
            )
          
        }
        else if  (listing.created === true && index === 0) {
            console.log("index 0")
            props.setGroupBy3(props.groupedBy3 + 1)
            return(
                <JobCard 
                modalTitle={listing.title}
                postedDate={listing.postedDate}
                
        
                
                />
                )
        }
        else if  (listing.created === true && index === 1) {
            console.log("index1")
            props.setGroupBy3(props.groupedBy3 + 1)
            return(
                <JobCard 

                modalTitle={listing.title}
                postedDate={listing.postedDate}
                />
                )
            }
       else if  (listing.created === true && index === 2) {
           console.log("index2")
           props.setGroupBy3(props.groupedBy3 + 1)
           return(
            <JobCard
            modalTitle={listing.title}
            postedDate={listing.postedDate}
               
                />
        )
    }
    })

    return (
        <>
            {props.showNextArrow && <i class="bi bi-arrow-right-circle"></i>}
            <div id="PortfolioSnapchot">
                {jobListingsHTML}
                <AddJobModal
                updateThisVar={props.updateThisVar}
                setUpdateThisVar={props.setUpdateThisVar}
                selectedJoblistingIndex={selectedJoblistingIndex}
                show={props.show}
                handleClose={props.handleClose}
                setModalTitle={props.setModalTitle}
                setModalDescription={props.setModalDescription}
                SubmitJobListing={props.SubmitJobListing        }
                setModal1Description1={props.setModal1Description1}
                setModal1Title1={props.setModal1Title1}
                handleShow1={props.handleShow1}
                show1={props.show1}

                />
            </div>



            {console.log(props.jobListings)}
        </>
    )
}

export default ModalShow