const express = require('express');
const router = express.Router();
const Reviews = require('./reviews.model');
const Products = require('../products/products.model'); // ✅ Make sure path is correct

// ✅ POST a new review or update existing
router.post("/post-review", async (req, res) => {
    try {
        const { comment, rating, productId, userId } = req.body;

        // 🔎 Validate input
        if (!comment || !rating || !productId || !userId) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // 🔄 Check for existing review
        let existingReview = await Reviews.findOne({ productId, userId });

        if (existingReview) {
            // 📝 Update review
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            // 🆕 Create review
            newReview = new Reviews({ comment, rating, productId, userId });
            await newReview.save();
        }

        // ⭐ Recalculate product average rating
        const reviews = await Reviews.find({ productId });

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            const product = await Products.findById(productId);

            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false }); // ✅ spelling fix
            } else {
                return res.status(404).send({ message: 'Product not found' });
            }
        }

        res.status(200).send({
            message: 'Review processed successfully',
            review: review,
        });

    } catch (error) {
        console.error("Error posting review", error);
        res.status(500).send({ message: "Failed to post review" });
    }
});

// total reviews count 
router.get("/total-reviews", async (React, res) => {
    try {
        const totalreviews = await Reviews.countDocuments({});
        res.status(200).send({totalreviews})

    } catch (error) {
       console.error("Error getting review", error);
        res.status(500).send({ message: "Failed to get review count" }); 
    }
});

//  get reviews by userid
router.get("/:userId", async (req, res) => {
    if(!userId) {
        return res.status(400).send({ message: "User ID is required" });
    }
    try {
        const reviews = await Reviews.find({userId: userId}).sort({createAt: -1});
        if(reviews.length === 0){
            return res.status(404).send({ message: "No reviews found "});
        }
        res.status(200).send(reviews);
    } catch (error) {
        console.error("Error fetching review by user", error);
        res.status(500).send({ message: "Failed to fetch reviews by user" }); 
    }
})

module.exports = router;
