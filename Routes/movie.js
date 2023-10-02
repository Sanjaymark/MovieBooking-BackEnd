import express from "express";
import Movie from "../models/movies.js";
import { isAdmin } from "../Authentication/Adminauth.js";


const router = express.Router();


// Route to create a new movie
router.post('/add',isAdmin, async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  });



  
// Route to get a all movies
router.get('/all', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



// Route to get movie details by ID
router.get('/:movieId', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  


// Route to edit movie details by ID
router.put('/edit/:movieId',isAdmin, async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(updatedMovie);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  });

  



// Route to delete a movie by ID
router.delete('/delete/:movieId',isAdmin, async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);
      if (!deletedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



export const movieRouter = router;
