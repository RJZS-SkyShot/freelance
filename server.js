const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

/* 🚀 App Create (सबसे पहले) */
const app = express();
const fs = require("fs");

/* Create uploads folder if not exists */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* ⚙️ Middleware */
app.use(cors());
app.use(express.json());

/* 📁 Static folder (अब सही जगह) */
app.use("/uploads", express.static("uploads"));

/* 🔗 MongoDB Connect */
mongoose.connect("mongodb://127.0.0.1:27017/digital_services")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* 📦 Models */
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String
});

const Note = mongoose.model("Note", {
  title: String,
  price: String,
  image: String
});

const Service = mongoose.model("Service", {
  service_type: String,
  data: Object
});

/* 📂 Multer Setup */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* 🔐 Signup */
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

/* 🔐 Login */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

/* 📝 Add Note (Image Upload) */
app.post("/add-note", upload.single("image"), async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      price: req.body.price,
      image: "/uploads/" + req.file.filename
    });

    await note.save();
    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

/* 📊 Service */
app.post("/service", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

/* 📥 Get Requests */
app.get("/requests", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

/* 📥 Get Notes */
app.get("/notes", async (req, res) => {
  const data = await Note.find();
  res.json(data);
});

/* ❌ Delete Request */
app.delete("/delete/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

/* ▶️ Server Start */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});