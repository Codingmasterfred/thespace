import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { v4 as uuidv4 } from 'uuid';
import Form from "react-bootstrap/Form"
import axios from "axios"
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import ModalShow from "./modals"

function Corporate() {
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [cancelRequest, setCancelRequest] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState(0)
    const [Password, setPassword] = useState("")
    const [ListOfPortfolioFiles, setListOfPortfolioFiles] = useState([])
    const [Pitch, setPitch] = useState(null)
    const [picfile, setPicFile] = useState(null)
    const [Link1, setLink1] = useState("")
    const [Link2, setLink2] = useState("")
    const [LinkArray, setLinkArray] = useState([])
    const [warnedAboutPortfolioLinks, setWarnedAboutPortfolioLinks] = useState(false)
    const [warnedAboutPortfolio, setwarnedAboutPortfolio] = useState(false)

    const [jobListings, setJobListings] = useState([
    { title: "", description: "", deleted: false, created:false, postedDate:null,id:uuidv4()},
    { title: "", description: "", deleted: false, created:false, postedDate:null,id:uuidv4()},
    { title: "", description: "", deleted: false, created:false, postedDate:null,id:uuidv4()},
    { title: "", description: "", deleted: false, created:false, postedDate:null,id:uuidv4()},
    { title: "", description: "",deleted: false, created:false , postedDate:null ,id:uuidv4()},
    { title: "", description: "",deleted: false, created:false , postedDate:null ,id:uuidv4()},
    { title: "", description: "",deleted: false, created:false , postedDate:null ,id:uuidv4()},
    { title: "", description: "",deleted: false, created:false , postedDate:null ,id:uuidv4()},
    { title: "", description: "",deleted: false, created:false , postedDate:null ,id:uuidv4()}]);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [endIndex,setEndIndex] = useState(3)
    
    const [showNextArrow, setShowNextArrow] = useState(false)
    const [showPreviousArrow,setShowPreviousArrow] = useState(false)

    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("")
    const [modalDescription, setModalDescription] = useState("")
    const [postedDate, setPostedDate] = useState("")


    const [updateThisVar,setUpdateThisVar] = useState({})
    const [seeAllModal, setSeeAllModal] = useState(false)

    const [editSubmit,setEditSubmit] = useState(false)



    let FetchLocationIQData = async () => {
        try {
            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${City},${State}&format=json`);
            console.log(response.data);

            // Check if the split result contains at least 5 elements
            if (response.data[0].display_name.split(",").length >= 5) {
                console.log(response.data[0].display_name.split(",")[4]);

                if (response.data[0].display_name.split(",")[4].trim() !== "USA") {
                  
                    setCancelRequest(true);
                    toast.error("This location is not in the USA.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000, // Automatically close after 5 seconds
                    });
                    return;
                }
            } 

            console.log("LocationIQ", response);
        } catch (error) {
            console.error("locationIQ error", error);
        }
    };


    const handleNext = () => {
      
            setCurrentIndex(currentIndex + 3);
            setEndIndex(endIndex + 3)
        
    };

    const handlePrevious = () => {
        
        setCurrentIndex(currentIndex - 3);
        setEndIndex(endIndex - 3)
        
    };
    
    
    
    const handleClose = () => {
        setShow(false)
        setUpdateThisVar({})
    }
    
    
    const handleShow = () => setShow(true);

  

    const SubmitJobListing = (SaveListing) => {
        console.log("we in ");
        if (modalTitle === "" || modalDescription === "") {
            handleClose();
            return;
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        setPostedDate(formattedDate);
    
        // Use map to create a new array with the updated created property
        const updatedJobListings = jobListings.map((listing) => {
            if (listing.id === SaveListing.id) {
               
                return {
                    ...listing,
                    title:modalTitle,
                    description:modalDescription,
                    postedDate:formattedDate,
                    created: true,
                    deleted:false
                    
                };
            }
            return listing; // Return other listings unchanged
        });
        
        
        
        console.log(updatedJobListings);
        setJobListings(updatedJobListings);
        
        // setUpdateThisVar({})
        setModalDescription("")
        setModalTitle("")
   
        handleClose();
    };
 

    const handleFileChangePicFile = (e) => {
        // Handle the selected file
        let files = e.target.files[0]
        if (files) {
            let filesURL = URL.createObjectURL(files)
            console.log(filesURL)
            setPicFile(filesURL)
        }

    };


    function Link1function(e) {
        const link1Value = e.target.value;
        setLink1(link1Value);
        setLinkArray([link1Value, Link2]); // Replace Link1 in the array
    }

    function Link2function(e) {
        const link2Value = e.target.value;
        setLink2(link2Value);
        setLinkArray([Link1, link2Value]); // Replace Link2 in the array
    }

    function PostRequest(event) {
        event.preventDefault();
        FetchLocationIQData();
        if (cancelRequest) {
            console.log("It's not inside of USA");
            return;
        }

        // console.log(
        //     `profilepicture: ${picfile}, name: ${Name}, password: ${Password}, email: ${Email}, phonenumber: ${PhoneNumber}, city: ${City}, state: ${State}, portfolio: ${ListOfPortfolioFiles}, pitch: ${Pitch}, Link: ${LinkArray}`
        // );
        if (!picfile) {
            toast.error("Must Select Profile Picture. Your profile picture helps employers recognize you and make a positive impression.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!Name) {
            toast.error("Name is required. Your name is essential for personalizing your profile and communication with employers.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!Password) {
            toast.error("Password is required. A strong password helps protect your account from unauthorized access.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!Email) {
            toast.error("Email is required. Your email is used for communication and notifications from employers.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!PhoneNumber) {
            toast.error("Phone Number is required. Employers may need to contact you by phone.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!City) {
            toast.error("City is required. Providing your location helps employers find candidates in their area.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (!State) {
            toast.error("State is required. Your state helps employers further narrow down your location.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }


        if (!ListOfPortfolioFiles.length && !warnedAboutPortfolio) {

            // Warn the user about the importance of Portfolio Files on the first try.
            toast.warning("Adding Portfolio Files is recommended. Your portfolio showcases your work and skills, improving your chances of getting noticed by employers.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000,

            });
            setwarnedAboutPortfolio(true) // Add a variable to track the warning.
            return
        }

        if (!Pitch) {
            toast.error("Pitch is required. Your pitch is your opportunity to introduce yourself and highlight your qualifications to employers.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        if (LinkArray.length < 2 && !warnedAboutPortfolioLinks) {
            toast.warning("We recommend adding at least two portfolio links. Your portfolio links are crucial for showcasing your work and skills to potential employers.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000,
            });
            setWarnedAboutPortfolioLinks(true);
            return;
        }
        // console.log(ListOfPortfolioFiles)
        toast.success("Profile Created Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000, // Automatically close after 5 seconds
        });

        try {
            axios
                .post("https://localhost:7260/Corporate", {
                    profilepicture: picfile,
                    name: Name,
                    password: Password,
                    email: Email,
                    phonenumber: PhoneNumber,
                    city: City,
                    state: State,
                    // JobListing: Job,
                    pitch: Pitch,
                    link: LinkArray,
                })
                .then((res) => {
                    console.log("successful", res.data);

                    window.location.reload();
                    // Display a success toast message when the profile is created successfully
                    toast.success("Profile Created Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000, // Automatically close after 5 seconds
                    });
                })
                .catch((error) => {
                    console.error("failed", error);
                });
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div id="UserProfileComponentContainer">
            <div id="UserProfileContent">
                {/* <h1 id="profileH1">Profile</h1> */}
                <div id="SnapShotAndResumeContainer">

                    {/* <h4 id="PortfolioH4">Jobs Listing </h4> */}


                <ModalShow 
                    jobListings={jobListings}
                    setModalTitle={setModalTitle}
                    setModalDescription={setModalDescription}
                    handleShow={handleShow}
                    show={show}
                    handleClose={handleClose}
                    SubmitJobListing={SubmitJobListing}
                    setJobListings={setJobListings}
                    modalTitle={modalTitle}
                    modalDescription={modalDescription}
                    setUpdateThisVar={setUpdateThisVar}
                    updateThisVar={updateThisVar}
                    postedDate={postedDate}
                    setCurrentIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                    setEndIndex={setEndIndex}
                    endIndex={endIndex}
                    setShowNextArrow={setShowNextArrow}
                    showNextArrow={showNextArrow}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    showPreviousArrow={showPreviousArrow}
                    setShowPreviousArrow={setShowPreviousArrow}
                    seeAllModal={seeAllModal}
                    setSeeAllModal={setSeeAllModal}
                     />

                    


                    <div style={{ margin: "10px", display: "flex", justifyContent: "space-around " }}>
                        <input onChange={Link1function}
                            value={Link1} // Bind the input value to Link1 state
                            style={{
                                width: "40%", borderRadius: " 25px",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1", textAlign: "center"
                            }} placeholder="Link"></input>


                        <input onChange={Link2function}
                            value={Link2} // Bind the input value to Link1 state
                            style={{
                                width: "40%", borderRadius: " 25px",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1", textAlign: "center"
                            }} placeholder="Link"></input>

                    </div>
                    <div id="Container" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <h4>Company Overview</h4>
                        <textarea onChange={(e) => { setPitch(e.target.value) }} style={{ height: "120px", width: "100%", display: "flex", margin: "10px" }}></textarea>
                        <Button type="submit" id="ResumeSubmitButton" onClick={PostRequest}>Create Profile</Button>
                    </div>
                </div>
                <div id="ProfileContainer"style={{}}>
                    <h4>Profile Info</h4>
                    <div id="ProfileContentContainer" style={{ padding: picfile ? "0px" : "20px" }}>

                        {picfile ? (

                            <div id="ProfilePicDiv">
                                <img id="ProfilePicDivImg" src={picfile} alt="Selected Profile" />

                            </div>
                        ) :
                            <div style={{ width: "60%", height: "25%", backgroundColor: "black" }}>

                                <label htmlFor="fileInput" className="file-label">
                                    <svg style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">

                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="6" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                        </svg>

                                    </svg>
                                    <input type="file" id="fileInput" className="file-input" onChange={handleFileChangePicFile} />
                                </label></div>}

                        <input style={{width:"90%"}}  onChange={(e) => { setName(e.target.value) }} placeholder="Company" required />
                        <input style={{width:"90%"}} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" required />
                        <input style={{width:"90%"}} onChange={(e) => { setCity(e.target.value) }} placeholder="City" required value={City} />
                        <input style={{width:"90%"}} onChange={(e) => { setState(e.target.value) }} placeholder="State" required value={State} />
                        <input style={{width:"90%"}} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" required />
                        <input style={{width:"90%"}} onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder="Phone Number" required />

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Corporate