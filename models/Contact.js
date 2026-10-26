const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    company: {
      type: String,
      trim: true,
      minlength: [3, "CompanyName must be at least 3 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
    },
    status: {
      type: String,
      enum: ["Unread", "Read", "Replied"],
      default: "Unread",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
