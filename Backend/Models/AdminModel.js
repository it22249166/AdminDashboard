import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "Manager",
    },
    gender: {
      type: String,
      required: true,
      default: "1999-01-01",
    },
    location: {
        type: String,
        required: true,
        default: "Colombo",
    },
    profileImg: {
      type: String,
      required: true,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png",
    },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
