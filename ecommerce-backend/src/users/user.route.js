const express = require('express');
const User = require('./user.Model');
const generateToken = require('../middleware/generateToken');

const router = express.Router();

// ✅ Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Save new user
    const user = new User({ username, email, password });
    await user.save();

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login attempt:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password does not match" });
    }
    const token = await generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession
      }
    });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// logout endpoint 
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send({message: 'Logged out successfully'})
})

//  delet a user
router.delete('/users/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id);
      if(!user) {
        return res.status(404).send({message: 'User not found'})
      }  
      res.status(200).send({message: 'User deleted successfully'})
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).send({message: "Error deleting user", })
    }
})

// get all users
router.get('/users', async (req, res) => {
    try {
       const users = await User.find({}, 'id email role').sort({createdAt: -1});
       res.status(200).send(users) 
    } catch (error) {
       console.error("Error fetching user", error);
        res.status(500).send({message: "Error fetching user", }) 
    }
})

// update user role
router.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true});
        if(!user){
           return res.status(404).send({message: 'User not found'})
        }
        res.status(200).send({message: 'User role updated successfully', user})
    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({message: "Error updating user role", }) 
    }
})

// edit or update profile 
router.patch('/edit-profile', async (req, res) => {
 try {
    const {userId, username, profileImage, bio, profession} = req.body;
    if(!userId){
        return res.status(400).send({message: 'User ID is required'})
    }
    const user = await User.findById(userId);
     
    if(!user){
        return res.status(400).send({message: 'User not foun'})
    }
    // update profile
    if(username !== undefined) user.username = username;
     if(profileImage !== undefined) user.profileImage = profileImage;
      if(bio !== undefined) user.bio = bio;
       if(profession !== undefined) user.profession = profession;

       await user.save();
        res.status(200).send({
            message: "Profile updated successfully",
            user: {
                 _id: user._id,
                 username: user.username,
                 email: user.email,
                 profileImage: user.profileImage,
                 bio: user.bio,
                 profession: user.profession,
                 role: user.role,
            },
        });
 } catch (error) {
    console.error("Error updating user profile", error);
        res.status(500).send({message: "Error updating user profile", }) 
 }
})  

module.exports = router;
