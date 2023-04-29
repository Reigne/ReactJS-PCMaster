const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Mouse",
        "KeyBoard",
        "Headset",
        "Microphone",
        "Headphones",
        "Central Processing Unit",
        "Graphics Processing Unit",
        "Motherboard",
        "Memory",
        "Storage",
        "Power Supply Unit",
        "Gaming Peripherals",
        "Uncategorized",
      ],
      message: "Please choose the suitable product category.",
    },
  },
  brand: {
    type: String,
    required: [true, "Please select brand for this product"],
    enum: {
      values: [
        "Select brand...",
        "Logitech",
        "Razer",
        "Corsair",
        "HyperX",
        "SteelSeries",
        "Sennheiser",
        "Audio-Technica",
        "Blue Yeti",
        "Samson",
        "Intel",
        "AMD",
        "Nvidia",
        "ASUS",
        "Gigabyte",
        "MSI",
        "ASRock",
        "Crucial",
        "Kingston",
        "Samsung",
        "Western Digital",
        "Seagate",
        "EVGA",
        "Cooler Master",
        "Thermaltake",
        "NZXT",
        "RAIDMAX",
        "Rosewill",
        "G.Skill",
        "Patriot",
        "ADATA",
        "Redragon",
        "Cougar",
        "Unknown Brand"
      ],
      message: "Please choose the suitable product brand.",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
