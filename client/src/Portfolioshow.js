// import React from "react";
// import "./App.css";

// function Portfolio(props) {
//   return (
//     <div id="PortfolioItems">
//       {/* Portfolio Item 1 */}
//       {props.file ? (
//         <div style={{ position: "relative", width: "100%", height: "100%" }}>
//           <iframe
//             style={{ overflow: "hidden", width: "100%", height: "100%" }}
//             src={props.file}
//             allowFullScreen
//           />
//           <button
//             onClick={() => {
//               props.setFile(null);
//             }}
//             style={{
//               position: "absolute",
//               top: 1, // Adjust top position as needed
//               left: 5, // Adjust right position as needed
//               zIndex: 1, // Ensure the button is on top of the iframe
//               backgroundColor: "white", // Set button background color
//               borderRadius: "50%", // Make it circular if needed
//               border: "1px solid #ccc", // Add a border
//               padding: "5px", // Adjust padding as needed
//             }}
//           >
//             <i className="fas fa-trash-alt"></i>
//           </button>
//         </div>
//       ) : (
//         <label htmlFor="fileInput2" className="file-label">
//           {/* SVG icon */}
//           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
//                                         <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
//                                         <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
//                                     </svg>
//           <input
//             type="file"
//             className="file-input"
//             onChange={props.handleFileChange}
//             id="fileInput2"
//             style={{ display: "none" }}
//           />
//         </label>
//       )}

//       {/* Portfolio Item 2 */}
//       {props.file2 ? (
//         <div style={{ position: "relative", width: "100%", height: "100%" }}>
//           <iframe
//             style={{ overflow: "hidden", width: "100%", height: "100%" }}
//             src={props.file2}
//             allowFullScreen
//           />
//           <button
//             onClick={() => {
//               props.setFile2(null);
//             }}
//             style={{
//               position: "absolute",
//               top: 1, // Adjust top position as needed
//               left: 5, // Adjust right position as needed
//               zIndex: 1, // Ensure the button is on top of the iframe
//               backgroundColor: "white", // Set button background color
//               borderRadius: "50%", // Make it circular if needed
//               border: "1px solid #ccc", // Add a border
//               padding: "5px", // Adjust padding as needed
//             }}
//           >
//             <i className="fas fa-trash-alt"></i>
//           </button>
//         </div>
//       ) : (
//         <label htmlFor="fileInput2" className="file-label">
//           {/* SVG icon */}
//           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
//                                         <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
//                                         <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
//                                     </svg>
//           <input
//             type="file"
//             className="file-input"
//             onChange={props.handleFileChange2}
//             id="fileInput2"
//             style={{ display: "none" }}
//           />
//         </label>
//       )}

//       {/* Portfolio Item 3 */}
//       {props.file3 ? (
//         <div style={{ position: "relative", width: "100%", height: "100%" }}>
//           <iframe
//             style={{ overflow: "hidden", width: "100%", height: "100%" }}
//             src={props.file3}
//             allowFullScreen
//           />
//           <button
//             onClick={() => {
//               props.setFile3(null);
//             }}
//             style={{
//               position: "absolute",
//               top: 1, // Adjust top position as needed
//               left: 5, // Adjust right position as needed
//               zIndex: 1, // Ensure the button is on top of the iframe
//               backgroundColor: "white", // Set button background color
//               borderRadius: "50%", // Make it circular if needed
//               border: "1px solid #ccc", // Add a border
//               padding: "5px", // Adjust padding as needed
//             }}
//           >
//             <i className="fas fa-trash-alt"></i>
//           </button>
//         </div>
//       ) : (
//         <label htmlFor="fileInput3" className="file-label">
//           {/* SVG icon */}
//           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
//                                         <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
//                                         <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
//                                     </svg>
//           <input
//             type="file"
//             className="file-input"
//             onChange={props.handleFileChange3}
//             id="fileInput3"
//             style={{ display: "none" }}
//           />
//         </label>
//       )}
//     </div>
//   );
// }

// export default Portfolio;
