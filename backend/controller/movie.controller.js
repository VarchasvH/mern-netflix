// Import the service for fetching the data
import { fetchFromTMDB } from "../services/tmdb.service.js";

/*
 * Get a random trending movie from the API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status, content, and trending movie.
 */
export const getTrendingMovie = async (req, res) => {
  try {
    // Fetch the trending movies from the API
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    // Select a random movie from the list
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    // Send the random movie as the response
    res.json({ sucess: true, content: randomMovie });
  } catch (error) {
    // Handle internal server error
    console.log("Error :: getTrendingMovie Controller :: ", error);
    res.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};

/*
 * Get the trailers for a movie from the API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and trailers.
 */
export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the movie trailers from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    // Send the trailers as the response
    res.json({ sucess: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getMovieTrailers Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};

/*
 * Get the details of a movie from the API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and movie details.
 */
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the movie details from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    // Send the movie details as the response
    res.status(200).json({ sucess: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getMovieDetails Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};
/*
 * Get similar movies to a movie from the API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and similar movies.
 */
export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the similar movies to the given movie from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    // Send the similar movies as the response
    res.status(200).json({ sucess: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getSimilarMovies Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};

/*
 * Get movies by category from the API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and movies by category.
 */
export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    // Fetch the movies by category from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    // Send the movies by category as the response

    res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getMoviesByCategory Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};
