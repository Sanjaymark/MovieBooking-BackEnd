import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {dbConnection} from "./db.js";
import {userRouter} from "./Routes/user.js"
import { adminRouter } from "./Routes/admin.js";
import { bookingRouter } from "./Routes/booking.js";
import { movieRouter } from "./Routes/movie.js";
import { showtimeRouter } from "./Routes/showtime.js";
import { isUser } from "./Authentication/Userauth.js";



//configure env
dotenv.config();

//DB Connection
dbConnection();

const PORT = process.env.PORT;

//iniitalizing server
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/booking", bookingRouter);
app.use("/movie", movieRouter);
app.use("/showtime", showtimeRouter);



//start Listening
app.listen(PORT, ()=>console.log(`server started in localhost:${PORT}`));