// get user data

export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.status(200).json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Store User Recent Searched Cities

export const storeRecentSearchedCities = async (req, res) => {
  try {
    // Get the city sent by the frontend
    const { recentSearchedCity } = req.body;

    // Get the logged-in user from the auth middleware
    const user = req.user;

    // If fewer than 3 cities are stored
    if (user.recentSearchedCities.length < 3) {

      // Add the new city
      user.recentSearchedCities.push(recentSearchedCity);

    } else {

      // Remove the oldest city
      user.recentSearchedCities.shift();

      // Add the newest city
      user.recentSearchedCities.push(recentSearchedCity);
    }

    // Save changes to MongoDB
    await user.save();

    // Send success response
    res.json({
      success: true,
      message: "City added"
    });

  } catch (error) {

    // Send error response
    res.json({
      success: false,
      message: error.message
    });

  }
};