const jwt = require("jsonwebtoken");
const User = require("../users/user.Model");

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    // 👇 Check if secret is available
    console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // ✅ must not be undefined
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};

module.exports = generateToken;
