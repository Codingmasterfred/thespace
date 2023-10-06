import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./controllers/auth.js";
import userRoutes from "./controllers/users.js";
import postRoutes from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./schemas/User.js";
import Post from "./schemas/Posts.js";
import { users, posts } from "./data/index.js";


// Adding onto Eric's Configs
const _fileName = fileURLToPath(import.meta.url);
const _dirName =path.dirname(_fileName);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json({ limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true}));
app.use("/assets", express.static(path.join(_dirName,"public/assets")));

// Correcting File Storage and image paths
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Cleaning up File Routes
app.post("/auth/register", upload.single('picture'), register);
app.post("/posts", verifyToken, upload.single('picture'),createPost)


// Route Werk
app.post("/auth", authRoutes);
app.post("/users", userRoutes);
app.post("/posts",postRoutes);


const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>{
  app.listen(PORT, () => console.log(`All systems go on port:${PORT}`));
})
.catch((error) => console.log(`${error} it didn't work family`))


// app.post('/auth/register', upload.single('picture'), (req, res) => {
//   try {
//     const { firstName, lastName, email, password, location, occupation } = req.body;
//     res.json({ success: true, message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// });
// app.post('/auth/login', (req, res) => {
//   try {
//     const { email, password } = req.body;
//     res.json({
//       success: true,
//       user: { /* user data here */ },
//       token: 'your_access_token',
//     });
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Login failed' });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });