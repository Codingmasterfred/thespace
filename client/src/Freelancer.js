import React, { useState, useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import axios from "axios"
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import { end } from "@popperjs/core";

function UserProfileComponent() {

    const isForPhone = useMediaQuery({ maxWidth: 539 }); // Adjust the breakpoint as needed
    const isSmallComputerScreen = useMediaQuery({ maxWidth: 927 }); // Adjust the breakpoint as needed


    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [cancelRequest, setCancelRequest] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState(1)
    const [Password, setPassword] = useState("")

    const [ListOfPortfolioFiles, setListOfPortfolioFiles] = useState([
        { deleted: false, created: false, id: 1 },
        { deleted: false, created: false, id: 2 },
        { deleted: false, created: false, id: 3 },
        { deleted: false, created: false, id: 4 }
    ])
    const [PortfolioId, setPortfolioId] = useState(0)

    const [Pitch, setPitch] = useState(null)
    const [file, setFile] = useState(null)
    const [file2, setFile2] = useState(null)
    const [file3, setFile3] = useState(null)
    const [picfile, setPicFile] = useState(null)
    const [Resume, setResume] = useState(null)
    const [warnedAboutPortfolio, setwarnedAboutPortfolio] = useState(false)
    const [Link1, setLink1] = useState("")
    const [Link2, setLink2] = useState("")
    const [LinkArray, setLinkArray] = useState([])
    const [warnedAboutPortfolioLinks, setWarnedAboutPortfolioLinks] = useState(false)

    const [showNextArrow, setShowNextArrow] = useState(false)
    const [showPreviousArrow, setShowPreviousArrow] = useState(false)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Define the state variable without initialization
    const [endIndex, setEndIndex] = useState(null)

    // Use useEffect to conditionally initialize the state variable
    const hasCodeRun = useRef(false);
    useEffect(() => {
        if (!hasCodeRun.current) {
            if (isSmallComputerScreen) {
                setEndIndex(2);
            }
            if (isForPhone) {
                setEndIndex(1);
            } else if (!isForPhone && !isSmallComputerScreen) {
                // Initialize with a different value for other cases
                setEndIndex(3);
            }
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
    
            hasCodeRun.current = true; // Set the flag to true after running the code
        }
        if (ListOfPortfolioFiles.slice(currentIndex, endIndex).every(obj => obj.created === true && obj.deleted === false  )) {
            console.log("success")
            setShowNextArrow(true);
        } else {
            setShowNextArrow(false);
            
        }

        if (currentIndex > 0) {
            setShowPreviousArrow(true);
        } else {
            setShowPreviousArrow(false);
        }

        if (endIndex >= 3) {
            setShowNextArrow(false);
        }
    }, [ListOfPortfolioFiles,currentIndex,endIndex]);


    const handleNext = () => {


        if (isSmallComputerScreen && !isForPhone) {
            console.log("tablet")
            setCurrentIndex(prevIndex => prevIndex + 2);
        } else if (isForPhone && isSmallComputerScreen) {
            console.log("iphone")
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
        setEndIndex(prevIndex => prevIndex + 1);
    };
    console.log(currentIndex, endIndex)





const handlePrevious = () => {

    if (isSmallComputerScreen && !isForPhone) {
        setCurrentIndex(currentIndex - 2);
    } else if (isForPhone && isSmallComputerScreen) {
        setCurrentIndex(currentIndex - 1);
    }

    if (isSmallComputerScreen) {
        setEndIndex(endIndex - 1);
    } else if (isForPhone) {
        setEndIndex(endIndex - 1);
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

        setCancelRequest(true);
        toast.error("Enter Valid Location.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000, // Automatically close after 5 seconds
        });
        console.log("locationIQ error", error);
        return
    }
};
// console.log("LinkArray",LinkArray)

const handleFileChange = (event, id) => {
    // Handle the selected file
    const selectedFile = event.target.files[0]; // Access the selected file correctly

    if (selectedFile) {
        if (selectedFile.type === 'application/pdf') {
            // Handle the PDF file
            const fileURL = URL.createObjectURL(selectedFile);
            setFile(fileURL);

            const updatedFiles = ListOfPortfolioFiles.map((Portfolio) => {
                if (Portfolio.id === id) { // Use the passed id parameter
                    return {
                        ...Portfolio,
                        file: fileURL,
                        created: true,
                        deleted: false,
                    };
                }
                return Portfolio; // Return other listings unchanged
            });

            setListOfPortfolioFiles(updatedFiles);
        } else {
            // Show an error message or toast for unsupported file type
            console.error('Unsupported file type. Please select a PDF file.');
            toast.error('Unsupported file type. Please select a PDF file.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000, // Automatically close after 5 seconds
            });
        }
    }
};

function Reset(id) {
    const UpdatedFiles = ListOfPortfolioFiles.map((Portfolio) => {
        if (Portfolio.id === id) { // Use the passed id parameter
            const { file, ...newPortfolio } = Portfolio;
            return {
                ...newPortfolio,
                created: true,
                deleted: true,
            };
        }
        return Portfolio; // Return other listings unchanged
    });

    setListOfPortfolioFiles(UpdatedFiles);
}


const handleFileChange3 = (e) => {
    // Handle the selected file
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        if (selectedFile.type === 'application/pdf') {
            // Handle the PDF file
            const fileURL = URL.createObjectURL(selectedFile);
            // console.log(fileURL)
            setFile3(fileURL)
            setListOfPortfolioFiles((prevFiles) => [...prevFiles, fileURL])
        } else {
            // Show an error message or toast for unsupported file type
            console.error('Unsupported file type. Please select a PDF file.');
            toast.error('Unsupported file type. Please select a PDF file.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000, // Automatically close after 5 seconds
            });
        }

    };
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

function UploadResume(e) {
    // Handle the selected file
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        if (selectedFile.type === 'application/pdf') {
            // Handle the PDF file
            const ResumeURL = URL.createObjectURL(selectedFile);
            console.log(ResumeURL)
            setResume(ResumeURL)
        } else {
            // Show an error message or toast for unsupported file type
            console.error('Unsupported file type. Please select a PDF file.');
            toast.error('Unsupported file type. Please select a PDF file.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000, // Automatically close after 5 seconds
            });
        }
    }
}

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
    if (cancelRequest == true) {
        console.log("It's not inside of USA");
        return;
    }

    console.log(
        `profilepicture: ${picfile}, name: ${Name}, password: ${Password}, email: ${Email}, phonenumber: ${PhoneNumber}, city: ${City}, state: ${State}, portfolio: ${ListOfPortfolioFiles}, pitch: ${Pitch}, resume: ${Resume}`
    );
    if (!picfile) {
        toast.error("Please select a profile picture. Your profile picture is important for employers to recognize you and make a positive impression.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!Name) {
        toast.error("Please enter your name. Your name is essential for personalizing your profile and facilitating communication with employers.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!Password) {
        toast.error("Please enter a password. A strong password helps protect your account from unauthorized access.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!Email) {
        toast.error("Please enter your email address. Your email is used for communication and receiving notifications from employers.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!PhoneNumber) {
        toast.error("Please enter your phone number. Employers may need to contact you by phone.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!City) {
        toast.error("Please enter your city. Providing your location helps employers find candidates in their area.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!State) {
        toast.error("Please enter your state. Your state helps employers further narrow down your location.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!ListOfPortfolioFiles.length && !warnedAboutPortfolio) {
        // Warn the user about the importance of Portfolio Files on the first try.
        toast.warning("We recommend adding Portfolio Files. Your portfolio showcases your work and skills, which can significantly improve your chances of getting noticed by employers.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000,
        });
        setwarnedAboutPortfolio(true); // Add a variable to track the warning.
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



    if (!Pitch) {
        toast.error("Pitch is required. Your pitch is your opportunity to introduce yourself and highlight your qualifications to employers.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }

    if (!Resume) {
        toast.error("Resume is required. Your resume provides a detailed overview of your professional experience and qualifications.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        return;
    }
    console.log(ListOfPortfolioFiles)
    toast.success("Profile Created Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000, // Automatically close after 5 seconds
    });

    try {
        axios
            .post("https://localhost:7260/UserProfiles", {
                profilepicture: picfile,
                name: Name,
                password: Password,
                email: Email,
                phonenumber: PhoneNumber,
                city: City,
                state: State,
                portfolio: ListOfPortfolioFiles,
                link: LinkArray,
                pitch: Pitch,
                resume: Resume,
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
console.log(ListOfPortfolioFiles)




return (
    <div id="UserProfileComponentContainer" >
        <div id="UserProfileContent" style={isSmallComputerScreen ? { width: "100%", flexDirection: "column-reverse", } : {}}>
            {/* <h1 id="profileH1">Profile</h1> */}
            <div id="SnapShotAndResumeContainer" style={{ width: isSmallComputerScreen && "100%" }}>

                <h4 id="PortfolioH4">Portfolio Snapshot</h4>
                <div id="PortfolioSnapchot">
                    {isSmallComputerScreen  && (
                        <div style={{ width: "10%", border: "none" }}>
                            {showPreviousArrow &&
                                <svg style={{}} onClick={handlePrevious} xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            }
                        </div>
                    )
                }
                    {ListOfPortfolioFiles.slice(currentIndex, endIndex).map((Portfolio, index) => (
                        <div id="PortfolioItems"  style={{width: isSmallComputerScreen && isForPhone
                        && "70%"}} key={index}>
                        
                        
                            {(!Portfolio.deleted && Portfolio.created && Portfolio.file) ? (
                                <div style={{ position: "relative",  width: isSmallComputerScreen && !isForPhone
                                ? "90%" // When it's a small computer screen
                                : isForPhone
                                ? "100%" // When it's for a phone
                                : isForPhone && !isSmallComputerScreen
                                ? "181.229px" // When none of the conditions match
                                : "auto",
                                height:isSmallComputerScreen && !isForPhone
                              ? "137px"
                              :isForPhone && !isSmallComputerScreen
                              ? "100%"
                              : "100%", padding:" 1px 15px"  }}>
                                   { console.log("Here")}
                                    <iframe
                                        style={{ overflow: "hidden", width: "100%", height: "100%", paddingLeft:"10px", overflowX: "hidden" }}
                                        src={Portfolio.file}
                                        allowFullScreen
                                    />
                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            Reset(Portfolio.id)

                                        }}
                                        style={{
                                            position: "absolute",
                                            top: 1,
                                            left: 0,
                                            zIndex: 1,
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                            border: "1px solid #ccc",
                                            padding: "5px",
                                        }}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                  
                                </div>
                            ) : (

                                <label htmlFor={`fileInput${index}`} className="file-label">
                                     { console.log("Here 2")}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
                                        <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                    <input
                                        type="file"
                                        className="file-input"
                                        onChange={(e) => {
                                            handleFileChange(e, Portfolio.id); // Pass Portfolio.id as a parameter
                                        }}
                                        id={`fileInput${index}`}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            )}
                        </div>
                    ))}
                    {isSmallComputerScreen && (
                        <div style={{ width: "10%", border: "none" }}>
                            {showNextArrow &&
                                <svg style={{}} onClick={handleNext} xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                </svg>
                            }
                        </div>
                    )
                    }
                </div>


                <div style={
                    isSmallComputerScreen && isForPhone
                        ? { margin: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "150px", marginTop: "50px",alignSelf:"center",width:"95%" }
                        : { margin: "10px", display: "flex", justifyContent: "space-evenly", }
                }>
                    <input onChange={Link1function}
                        value={Link1} // Bind the input value to Link1 state
                        style={{
                            width: isSmallComputerScreen && isForPhone ? "100%" : "40%", borderRadius: " 25px",
                            height: isSmallComputerScreen && isForPhone ? "50px" : "default",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1", textAlign: "center"
                        }} placeholder="Link"></input>


                    <input onChange={Link2function}
                        value={Link2} // Bind the input value to Link1 state
                        style={{
                            width: isSmallComputerScreen && isForPhone ? "100%" : "40%", borderRadius: " 25px",
                            height: isSmallComputerScreen && isForPhone ? "50px" : "default",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1", textAlign: "center"
                        }} placeholder="Link"></input>

                </div>
                <div id="ResumeContainer" style={isForPhone && isSmallComputerScreen ? {marginTop:"50px"} :{}}>
                    <h4>Pitch</h4>
                    <textarea onChange={(e) => { setPitch(e.target.value) }} id="ResumeTextArea" style={isForPhone && isSmallComputerScreen ? {height:"150px"} :{}}></textarea>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>< h4>Upload Resume</h4></Form.Label>
                        <Form.Control onChange={UploadResume} type="file" />
                    </Form.Group>
                    <Button type="submit" id="ResumeSubmitButton" onClick={PostRequest}>Create Profile</Button>
                </div>
            </div>

            <div id="ProfileContainer" style={isSmallComputerScreen ? { width: "100%", height: "100%", margin: "25px 0px" } : {}}>
                <h4>Profile Info</h4>
                <div id="ProfileContentContainer" style={isSmallComputerScreen || isForPhone ? { border: "none", width: "100%" } : { padding: picfile ? "0px" : "20px" }}>

                    {picfile ? (

                        <div id="ProfilePicDiv">
                            <img id="ProfilePicDivImg" src={picfile} alt="Selected Profile" />

                        </div>
                    ) :
                        <div style={isSmallComputerScreen ? { width: "30%", height: "40%" } : { width: picfile ? "155px" : "70%", height: picfile ? "144px" : "25%", backgroundColor: "black", margin: "10px" }}>

                            <label style={{ height: picfile && "100%" }} htmlFor="fileInput" className="file-label">
                                <svg style={isSmallComputerScreen ? { width: "80%", height: "80%" } : { width: picfile ? "100%" : "100%", height: picfile ? "100%" : "100%" }} xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">

                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="6" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>

                                </svg>
                                <input type="file" id="fileInput" className="file-input" onChange={handleFileChangePicFile} />
                            </label></div>}

                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setName(e.target.value) }} placeholder="Name" required />
                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" required />
                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setCity(e.target.value) }} placeholder="City" required value={City} />
                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setState(e.target.value) }} placeholder="State" required value={State} />
                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" required />
                    <input style={{ height: isSmallComputerScreen ? "45px" : "inherit" }} onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder="Phone Number" required />
                </div>
            </div>
        </div>
    </div>
)
}
export default UserProfileComponent