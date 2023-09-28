import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import axios from "axios"
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS

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

    const [jobListings, setJobListings] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [show1, setShow1] = useState(false);
    const [modal1Set1, setModal1Set1] = useState(false)
    const [modal1Title1, setModal1Title1] = useState("")
    const [modal1Description1, setModal1Description1] = useState("")
    const [postedDate1, setPostedDate1] = useState("")

    const [show2, setShow2] = useState(false);
    const [modal1Set2, setModal1Set2] = useState(false)
    const [modal1Title2, setModal1Title2] = useState("")
    const [modal1Description2, setModal1Description2] = useState("")
    const [postedDate2, setPostedDate2] = useState("")

    const [show3, setShow3] = useState(false);
    const [modal1Set3, setModal1Set3] = useState(false)
    const [modal1Title3, setModal1Title3] = useState("")
    const [modal1Description3, setModal1Description3] = useState("")
    const [postedDate3, setPostedDate3] = useState("")
    const [showNextArrow, setShowNextArrow] = useState(false)
    const [mapNow, startMapping] = useState(false)
    const [notloop, setnotloop] = useState(2)
    if (notloop > 0) {
        if (modal1Set1 & modal1Set2 & modal1Set3) {
            startMapping(true)
            setShow1(false);
            setModal1Set1(false);
            setModal1Title1("");
            setModal1Description1("");
            setPostedDate1("");

            setShow2(false);
            setModal1Set2(false);
            setModal1Title2("");
            setModal1Description2("");
            setPostedDate2("");

            setShow3(false);
            setModal1Set3(false);
            setModal1Title3("");
            setModal1Description3("");
            setPostedDate3("");

            setnotloop(0)
        }

    }

    let FetchLocationIQData = async () => {
        try {
            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${City},${State}&format=json`);
            console.log(response.data);

            // Check if the split result contains at least 5 elements
            if (response.data[0].display_name.split(",").length >= 5) {
                console.log(response.data[0].display_name.split(",")[4]);

                if (response.data[0].display_name.split(",")[4].trim() !== "USA") {
                    console.log("NOT USA");
                    setCancelRequest(true);
                    toast.error("This location is not in the USA.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000, // Automatically close after 5 seconds
                    });
                    return;
                }
            } else {
                console.log("Unexpected data structure:", response.data[0].display_name);
            }

            console.log("LocationIQ", response);
        } catch (error) {
            console.log("locationIQ error", error);
        }
    };


    const handleNext = () => {
        if (currentIndex + 3 < jobListings.length) {
            setCurrentIndex(currentIndex + 3);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - 3 >= 0) {
            setCurrentIndex(currentIndex - 3);
        }
    };

    const handleClose1 = () => {
        setShow1(false)
    }
    const handleShow1 = () => setShow1(true);

    function SubmitJobListing1() {
        if (modal1Title1 === "" || modal1Description1 === "") {
            handleClose1()
            return
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        setPostedDate1(formattedDate)
        setModal1Set1(true)
        setJobListings([...jobListings, { title: modal1Title1, description: modal1Description1, postedTime: postedDate1 }])
        handleClose1()
    }


    const handleClose2 = () => {
        setShow2(false)
    }
    const handleShow2 = () => setShow2(true);

    function SubmitJobListing2() {
        if (modal1Title2 === "" || modal1Description2 === "") {
            handleClose2()
            return
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        setPostedDate2(formattedDate)
        setModal1Set2(true)
        setJobListings([...jobListings, { title: modal1Title2, description: modal1Description2, postedTime: postedDate2 }])
        handleClose2()
    }

    const handleClose3 = () => {
        setShow3(false)
    }
    const handleShow3 = () => setShow3(true);

    function SubmitJobListing3() {
        if (modal1Title3 === "" || modal1Description3 === "") {
            handleClose3()
            return
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        setPostedDate3(formattedDate)
        setModal1Set3(true)
        setJobListings([...jobListings, { title: modal1Title3, description: modal1Description3, postedTime: formattedDate }])
        handleClose3()
    }










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

        console.log(
            `profilepicture: ${picfile}, name: ${Name}, password: ${Password}, email: ${Email}, phonenumber: ${PhoneNumber}, city: ${City}, state: ${State}, portfolio: ${ListOfPortfolioFiles}, pitch: ${Pitch}, Link: ${LinkArray}`
        );
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
        console.log(ListOfPortfolioFiles)
        toast.success("Profile Created Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000, // Automatically close after 5 seconds
        });

        try {
            axios
                .post("https://localhost:7260/freelancer", {
                    profilepicture: picfile,
                    name: Name,
                    password: Password,
                    email: Email,
                    phonenumber: PhoneNumber,
                    city: City,
                    state: State,
                    portfolio: ListOfPortfolioFiles,
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

                    <h4 id="PortfolioH4">Jobs Listing </h4>



                    {mapNow ? (
                        <div id="PortfolioSnapchot">
                            {jobListings.map((job, index) => (
                                <div key={index} style={{ position: "relative", width: "30%", height: "100%" }}>
                                    <button
                                        onClick={() => {
                                            if(index == 0){

                                                setModal1Set1(false);
                                                setModal1Title1("");
                                                setModal1Description1("");
                                            }else if (index== 1){

                                                setModal1Set2(false);
                                                    setModal1Title2("");
                                                    setModal1Description2("");
                                            } else if(index == 2){
                                                setModal1Set3(false);
                                                setModal1Title3("");
                                                setModal1Description3("");
                                            }
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
                                            if(index == 0){

                                                setModal1Set1(true);
                                                setModal1Title1(modal1Title1);
                                                setModal1Description1(modal1Description1);
                                                handleShow1();
                                            }
                                            else if(index == 1 ){

                                                setModal1Set2(true);
                                                setModal1Title2(modal1Title1);
                                                setModal1Description2(modal1Description1);
                                                handleShow2();
                                            }
                                            else if( index == 2){
                                                
                                                setModal1Set1(true);
                                                setModal1Title1(modal1Title1);
                                                setModal1Description1(modal1Description1);
                                                handleShow1();
                                            }
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
                                        <h6 value={job.} style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{index == 0 && modal1Title1 || index == 1 && modal1Title2 || index == 2 && modal1Title3}</h6>
                                        <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{index == 0 ? postedDate1 : index == 1 ? postedDate2 : index == 2 && postedDate3}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) :

                        <div id="PortfolioSnapchot">



                            {modal1Set1 ? (
                                <div style={{ position: "relative", width: "30%", height: "100%" }}>
                                    <button
                                        onClick={() => {
                                            setModal1Set1(false)
                                            setModal1Title1("")
                                            setModal1Description1("")

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
                                            setModal1Set1(true)
                                            setModal1Title1(modal1Title1)
                                            setModal1Description1(modal1Description1)
                                            handleShow1()

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
                                        <h6 style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{modal1Title1}</h6>
                                        <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{postedDate1}</p>
                                    </div>
                                </div>


                            ) : (

                                <button onClick={handleShow1} style={{ position: "relative", width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>

                                </button>


                            )
                            }

                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={modal1Title1}
                                                onChange={(e) => { setModal1Title1(e.target.value) }}
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
                                                value={modal1Description1}
                                                onChange={(e) => { setModal1Description1(e.target.value) }}
                                                as="textarea"
                                                rows={9} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose1}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={SubmitJobListing1}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* {showNextArrow && <i class="bi bi-arrow-Right-circle"></i>} */}

                            {modal1Set2 ? (
                                <div style={{ position: "relative", width: "30%", height: "100%" }}>
                                    <button
                                        onClick={() => {
                                            setModal1Set2(false)
                                            setModal1Title2("")
                                            setModal1Description2("")

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
                                            setModal1Set2(true)
                                            setModal1Title2(modal1Title2)
                                            setModal1Description2(modal1Description2)
                                            handleShow2()

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
                                        <h6 style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{modal1Title2}</h6>
                                        <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{postedDate2}</p>
                                    </div>
                                </div>


                            ) : (

                                <button onClick={handleShow2} style={{ position: "relative", width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>

                                </button>


                            )}



                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={modal1Title2}
                                                onChange={(e) => { setModal1Title2(e.target.value) }}
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
                                                value={modal1Description2}
                                                onChange={(e) => { setModal1Description2(e.target.value) }}
                                                as="textarea"
                                                rows={9} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={SubmitJobListing2}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>



                            {modal1Set3 ? (
                                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                    <button
                                        onClick={() => {
                                            setModal1Set3(false)
                                            setModal1Title3("")
                                            setModal1Description3("")

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
                                            setModal1Set3(true)
                                            setModal1Title3(modal1Title3)
                                            setModal1Description3(modal1Description3)
                                            handleShow3()

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
                                        <h6 style={{ height: "90%", maxWidth: "80%", overflow: "auto", textOverflow: "ellipsis" }}>{modal1Title3}</h6>
                                        <p style={{ height: "10%", whiteSpace: "pre-wrap" }}>{postedDate3}</p>
                                    </div>
                                </div>


                            ) : (

                                <button onClick={handleShow3} style={{ position: "relative", width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>

                                </button>


                            )}



                            <Modal show={show3} onHide={handleClose3}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={modal1Title3}
                                                onChange={(e) => { setModal1Title3(e.target.value) }}
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
                                                value={modal1Description3}
                                                onChange={(e) => { setModal1Description3(e.target.value) }}
                                                as="textarea"
                                                rows={9} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose3}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={SubmitJobListing3}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>


                    }


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
                <div id="ProfileContainer">
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

                        <input onChange={(e) => { setName(e.target.value) }} placeholder="Company" required />
                        <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" required />
                        <input onChange={(e) => { setCity(e.target.value) }} placeholder="City" required value={City} />
                        <input onChange={(e) => { setState(e.target.value) }} placeholder="State" required value={State} />
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" required />
                        <input onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder="Phone Number" required />

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Corporate