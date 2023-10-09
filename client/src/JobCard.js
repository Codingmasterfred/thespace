import React from "react"

function JobCard(props) {
    // console.log(props)
    let date = props.listing.postedDate.split(",")[1] 
    console.log(date)
    return (
        <div style={{ position: "relative",  width: props.isSmallComputerScreen && !props.isForPhone
        ? "30%" // When it's a small computer screen
        : props.isForPhone
        ? "70%" // When it's for a phone
        : !props.isForPhone && !props.isSmallComputerScreen
        ? "181.229px" // When none of the conditions match
        : "auto",
        height: props.isSmallComputerScreen && !props.isForPhone
      ? "137px"
      : props.isForPhone && props.isSmallComputerScreen
      ? "100%"
      : "122.385px", display: "flex", alignItems: "center", justifyContent: "center", padding:"15px"  }}>

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
                
            <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", flexDirection: "column", width:!props.isSmallComputerScreen && props.isForPhone?"70%": "181.229px", height:props.isSmallComputerScreen && props.isForPhone?"200px": "92.385px", overflowY: "hidden", border:"none", }}>
                <h6 style={{ height: "90%", maxWidth:props.isSmallComputerScreen && props.isForPhone?"95%" :"80%", overflow: "auto", textOverflow: "ellipsis" , fontSize:props.isSmallComputerScreen && props.isForPhone?"24px":"default" }}>{props.listing.title}</h6>
                <p style={{ height:props.isSmallComputerScreen && props.isForPhone? "10":"10%", whiteSpace: "pre-wrap", fontSize:props.isSmallComputerScreen && props.isForPhone?"24px":"15px" }}>{props.isSmallComputerScreen?date:props.listing.postedDate}</p>
            </div>
        </div>
    )
}
export default JobCard