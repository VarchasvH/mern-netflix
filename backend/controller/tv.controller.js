// Import the service for fetching the data
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    // Fetch the trending movies from the API
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    // Select a random movie from the list
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    // Send the random movie as the response
    res.json({ sucess: true, content: randomMovie });
  } catch (error) {
    // Handle internal server error
    console.log("Error :: getTrendingTv Controller :: ", error);
    res.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the movie trailers from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    // Send the trailers as the response
    res.json({ sucess: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getTvTrailers Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the movie details from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    // Send the movie details as the response
    res.status(200).json({ sucess: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getTvDetails Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the similar movies to the given movie from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    // Send the similar movies as the response
    res.status(200).json({ sucess: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getSimilarTvs Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    // Fetch the movies by category from the API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    // Send the movies by category as the response

    res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      // Handle resource not found error
      res.status(404).send(null);
    } else {
      // Handle internal server error
      console.log("Error :: getTvsByCategory Controller :: ", error);
      res.status(500).json({ sucess: false, message: "Internal Server Error" });
    }
  }
};
