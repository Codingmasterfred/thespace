import React from "react"

function JobCard(props){
    console.log(props)
    return(
        <div style={{ position: "relative", width: "30%", height: "100%" }}>
        <button
            onClick={() => {
                props.setModal1Set1(false)
                props.setModal1Title1("")
                props.setModal1Description1("")

            }}
            style={{
                position: "absolute",
                top: 1, // Adjust top position as needed
                left: -4, // Adjust right position as needed
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
                props.setModal1Set1(true)
                props.setModal1Title1(props.modal1Title1)
                props.setModal1Description1(props.modal1Description1)
                props.handleShow1()

            }}
            style={{
                alignSelf: "center",
                position: "absolute",
                bottom: 27, // Adjust top position as needed
                left: -4, // Adjust right position as needed
                zIndex: 1, // Ensure the button is on top of the iframe
                backgroundColor: "white", // Set button background color
                borderRadius: "50%", // Make it circular if needed
                border: "1px solid #ccc", // Add a border
                padding: "5px", // Adjust padding as needed
            }}
        >
            <i class="bi bi-pen"></i>

        </button>
        <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", flexDirection: "column", width: "100%", height: "100%", overflowY: "auto" }}>
            <h6 style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{props.modal1Title1}</h6>
            <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{props.postedDate1}</p>
        </div>
    </div>
    )
}
export default JobCard