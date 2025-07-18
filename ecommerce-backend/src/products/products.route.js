const express = require('express');
const Products = require('./products.model');
const Reviews = require("../reviews/reviews.model"); // ✅ Adjust path if needed
const verifyToken = require("../middleware/verifyToken"); 
const verifyAdmin = require("../middleware/verifyAdmin");
const mongoose = require('mongoose'); // ✅ Fixed typo here

const router = express.Router();

// ✅ Create a product
router.post("/create-product", async (req, res) => {
    try {
        const newProduct = new Products({ ...req.body });
        const savedProduct = await newProduct.save();

        const reviews = await Reviews.find({ productId: savedProduct._id });

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }

        res.status(201).send(savedProduct);
    } catch (error) {
        console.error("Error creating new product", error);
        res.status(500).send({ message: "Error creating new product" });
    }
});

// ✅ Get all products with filters
router.get("/", async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        let filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }

        if (color && color !== "all") {
            filter.color = color;
        }

        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("author", "email")
            .sort({ createdAt: -1 });

        res.status(200).send({ products, totalPages, totalProducts });
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).send({ message: "Error fetching products" });
    }
});

// ✅ Get single product by ID
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: "Invalid product ID format" });
        }

        const product = await Products.findById(productId).populate("author", "email username");

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const reviews = await Reviews.find({ productId }).populate("userId", "username email");

        res.status(200).send({ product, reviews });
    } catch (error) {
        console.error("Error fetching the product", error);
        res.status(500).send({ message: "Failed to fetch the product" });
    }
});

// ✅ Update a product
router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: "Invalid product ID format" });
        }

        const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.error("Error updating the product", error);
        res.status(500).send({ message: "Failed to update the product" });
    }
});

// ✅ Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: "Invalid product ID format" });
        }

        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        await Reviews.deleteMany({ productId });

        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting the product", error);
        res.status(500).send({ message: "Failed to delete the product" });
    }
});

// ✅ Get related products
router.get("/related/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid product ID format" });
        }

        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).send({ message: "Failed to fetch related products" });
        }

        const titleRegex = new RegExp(
            product.name
                .split(" ")
                .filter((word) => word.length > 1)
                .join("|"),
            "i"
        );

        const relatedProducts = await Products.find({
            _id: { $ne: id },
            $or: [
                { name: { $regex: titleRegex } },
                { category: product.category },
            ],
        });

        res.status(200).send(relatedProducts);
    } catch (error) {
        console.error("Error fetching the related products", error);
        res.status(500).send({ message: "Failed to fetch related products" });
    }
});

module.exports = router;
