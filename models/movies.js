import mongoose from "mongoose";


const movieSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        maxlength: 10000,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    // can add more fields for movie details, such as genre, duration, director, etc.
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
