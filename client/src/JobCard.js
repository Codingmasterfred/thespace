import React from "react"

function JobCard(props) {
    // console.log(props)
    return (
        <div style={{ position: "relative", minWidth: "181.229", minHeight: "92.385", display: "flex", alignItems: "center", justifyContent: "center", padding:"10px"  }}>

            <button
                onClick={() => {
                    let updatedJobListings = props.jobListings.map(listings => {
                        if (listings.id === props.listing.id) {
                            // props.setUpdateThisVar(null)
                            console.log("dkldlqdql")

                            return {
                                ...listings,
                                title: "",
                                description: "",
                                postedDate: null,
                                created: true,
                                deleted: true,

                            };
                        }
                        return listings; // Return other listings unchanged
                    }
                    );
                    props.setJobListings(updatedJobListings);
                    console.log(updatedJobListings);


                }}
                style={{
                    position: "absolute",
                    top: 1, // Adjust top position as needed
                    left: 0, // Adjust right position as needed
                    zIndex: 1, // Ensure the button is on top of the iframe
                    backgroundColor: "white", // Set button background color
                    borderRadius: "50%", // Make it circular if needed
                    border: "1px solid #ccc", // Add a border
                    padding: "5px", // Adjust padding as needed
                }}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
            <button

                onClick={() => {
                    
                    props.jobListings.map(listings => {
                        if (listings.id === props.listing.id) {
                            props.setUpdateThisVar(listings)
                            console.log(listings.id ,props.listing.id)
                           
                                console.log("dkldlqdql")
                                props.setModalTitle(listings.title)
                                props.setModalDescription(listings.description)
                               
                                props.handleShow()

                           
                        }
                       
                    }
                    );





                }}
                style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 39, // Adjust top position as needed
                    left: 0, // Adjust right position as needed
                    zIndex: 1, // Ensure the button is on top of the iframe
                    backgroundColor: "white", // Set button background color
                    borderRadius: "50%", // Make it circular if needed
                    border: "1px solid #ccc", // Add a border
                    padding: "5px", // Adjust padding as needed
                }}
            >
                <i class="bi bi-pen"></i>

            </button>
            <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", flexDirection: "column", minWidth: "181.229px", minHeight: "92.385px", overflowY: "auto", border:"none" }}>
                <h6 style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{props.listing.title}</h6>
                <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{props.listing.postedDate}</p>
            </div>
        </div>
    )
}
export default JobCard