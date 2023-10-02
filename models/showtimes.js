import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    movie_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // Reference to the Movie model
        required: true,
    },
    movie_name:{
        type:String,
    },
    price: {
        type: Number,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    // can add more fields for showtime-related information, like available seats, price, etc.
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

export default Showtime;
