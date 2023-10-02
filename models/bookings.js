import mongoose from "mongoose";



const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
    },
    movie_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    },
    movie_name:{
        type: String,
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime", // Reference to the Showtime model
    },
    start_time:{
        type:String,
    },
    number_of_seats: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one seat is booked
    },
    total_price: {
        type: Number,
    },
    payment_status: {
        type: String,
        default:"Pending"
    },
    booking_date: {
        type: Date,
        default: () => {
            const now = new Date();
            // Adjust to Indian Standard Time (IST) UTC offset (UTC+05:30)
            const ISTOffset = 330; // Minutes
            const indianTime = new Date(now.getTime() + ISTOffset * 60000);
            return indianTime;
        },
    },
    // You can add more fields for other booking-related information as needed.
});



const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
