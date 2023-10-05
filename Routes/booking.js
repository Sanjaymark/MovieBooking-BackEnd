import express from "express";
import Booking from "../models/bookings.js";
import { isUser } from "../Authentication/Userauth.js";
import { isAdmin } from "../Authentication/Adminauth.js";
import Showtime from "../models/showtimes.js";


const router = express.Router();



// Route to create a new booking with showtime and movie details
router.post('/add/:showtime_Id',isUser,  async (req, res) => {
  try {
      const showtimeId = req.params.showtime_Id;

      

      // Find the corresponding Showtime by its ID and populate the 'movie' field
      const showtime = await Showtime.findById(showtimeId);

      

      if (!showtime) {
          return res.status(404).json({ error: 'Showtime not found' });
      }

      const movie_id = showtime.movie_Id;
      const movie_name = showtime.movie_name;
      const time = showtime.start_time;

      

      // Create a new booking and populate its fields
      const newBooking = new Booking({
          user: req.user._id, // Assuming you have user authentication in place
          movie_id: movie_id,
          movie_name: movie_name,
          showtime: showtime._id,
          start_time:time,
          number_of_seats: req.body.number_of_seats,
          total_price: req.body.number_of_seats * showtime.price,
      });


      // Save the new booking to the database
      await newBooking.save();

      res.status(201).json({ booking: newBooking });
  } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
  }
});


  



// Route to get booking details by ID
router.get('/:bookingId',isUser, async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  



  // Route to delete a booking by ID
  router.delete('/delete/:bookingId',isUser, async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.bookingId);
      if (!deletedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  



// Route to get all bookings of a specific user by user ID
router.get('/user/bookings/:userId',isUser, async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.find({ user: userId });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ error: 'No bookings found for this user' });
      }
  
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


export const bookingRouter = router;