/**
 * @module searchController
 * @description Contains the controllers for searching in the TMDB API and managing the search history.
 */

// Import the service for fetching the data
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

/**
 * Controller function for searching a person in the TMDB API.
 * This function is used to search for a person in the TMDB API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and person details.
 */
export const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    // Fetch the person details from the TMDB API
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=true&language=en-US&page=1`
    );

    // If no results are found, return a 404 error
    if (response.results.length === 0) return res.status(404).send(null);
    if (response.length === 0) return res.status(404).send(null);

    // Update the user's search history with the person details
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    // Send the person details as the response
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    // Log the error and send an internal server error response
    console.log("Error :: searchPerson Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller function for searching a movie in the TMDB API.
 * This function is used to search for a movie in the TMDB API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and movie details.
 */
export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    // Fetch the movie details from the TMDB API
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`
    );

    // If no results are found, return a 404 error
    if (response.results.length === 0) return res.status(404).send(null);
    if (response.length === 0) return res.status(404).send(null);

    // Update the user's search history with the movie details
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    // Send the movie details as the response
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    // Log the error and send an internal server error response
    console.log("Error :: searchMovie Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller function for searching a TV show in the TMDB API.
 * This function is used to search for a TV show in the TMDB API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and TV show details.
 */
/**
 * Controller function for searching a TV show in the TMDB API.
 * This function is used to search for a TV show in the TMDB API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    // Fetch the TV show details from the TMDB API
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`
    );

    // If no results are found, return a 404 error
    if (response.results.length === 0 || response.length === 0) {
      return res.status(404).send(null);
    }

    // Update the user's search history with the TV show details
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    // Log the error and send an internal server error response
    console.log("Error :: searchTv Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller function for getting the search history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and search history.
 */
export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error :: getSearchHistory Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller function for removing an item from the search history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the success status and message.
 */

export const removeFromSearchHistory = async (req, res) => {
  // Extract the id from the request parameters and convert it to an integer.
  let { id } = req.params;
  id = parseInt(id);

  try {
    // Find the user by their ID and update their search history by removing the item with the given id.
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    // Send a success response with a message indicating that the search history item has been removed.
    res
      .status(200)
      .json({ success: true, message: "Search history item removed" });
  } catch (error) {
    // Log the error and send an internal server error response.
    console.log("Error :: removeFromSearchHistory Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
