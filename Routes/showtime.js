import express from "express";
import Showtime from "../models/showtimes.js";
import { isAdmin } from "../Authentication/Adminauth.js";
import Movie from "../models/movies.js";


const router = express.Router();



// Route to create a new showtime
router.post('/add/:movie_Id', isAdmin, async (req, res) => {
  try {
      const movieId = req.params.movie_Id;

      // Find the corresponding Movie by its ID
      const movie = await Movie.findById(movieId);

      if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
      }

      // Create a new showtime and populate its fields
      const newShowtime = new Showtime({
          movie_Id: movie._id,
          movie_name: movie.title,
          price: req.body.price,
          start_time: req.body.start_time,
          // You can add more fields as needed for other showtime-related information.
      });

      // Save the new showtime to the database
      await newShowtime.save();

      res.status(201).json(newShowtime);
  } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
  }
});




// Route to get all showtimes of a particular movie by movie ID
router.get('/all/:movieId', async (req, res) => {
  try {
      const movieId = req.params.movieId;
      const showtimes = await Showtime.find({ movie_Id: movieId });

      if (!showtimes || showtimes.length === 0) {
          return res.status(404).json({ error: 'No showtimes found for this movie' });
      }

      res.json(showtimes);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


  



// Route to get showtime details by ID
router.get('/:showtimeId', async (req, res) => {
    try {
      const showtime = await Showtime.findById(req.params.showtimeId);
      if (!showtime) {
        return res.status(404).json({ error: 'Showtime not found' });
      }
      res.json(showtime);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  



// Route to delete a showtime by ID
router.delete('/delete/:showtimeId',isAdmin,  async (req, res) => {
    try {
      const deletedShowtime = await Showtime.findByIdAndDelete(req.params.showtimeId);
      if (!deletedShowtime) {
        return res.status(404).json({ error: 'Showtime not found' });
      }
      res.json({ message: 'Showtime deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  

export const showtimeRouter = router;