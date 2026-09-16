const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Security
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  })
);

// Rate limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// Upload folder
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Models
const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      image: String,
      price: String,
      link: String,
    },
    { timestamps: true }
  )
);

const Webinar = mongoose.model(
  "Webinar",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      date: String,
      time: String,
      image: String,
      link: String,
    },
    { timestamps: true }
  )
);

const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      title: String,
      content: String,
      image: String,
    },
    { timestamps: true }
  )
);

const Gallery = mongoose.model(
  "Gallery",
  new mongoose.Schema(
    {
      title: String,
      image: String,
    },
    { timestamps: true }
  )
);

const Enquiry = mongoose.model(
  "Enquiry",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      message: String,
      type: String,
    },
    { timestamps: true }
  )
);

// Create default admin
async function createAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.log("Admin environment variables are missing.");
      return;
    }

    const existingAdmin = await Admin.findOne({ username });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 12);

      await Admin.create({
        username,
        password: hashedPassword,
      });

      console.log("Default admin created.");
    }
  } catch (error) {
    console.error("Admin creation error:", error.message);
  }
}

// Authentication middleware
function authenticate(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
}

// Health
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CRIMELENS backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

// Login
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

// Logout
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out",
  });
});

// Check authentication
app.get("/api/admin/me", authenticate, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

// Courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
});

app.post("/api/courses", authenticate, async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
});

app.put("/api/courses/:id", authenticate, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
});

app.delete("/api/courses/:id", authenticate, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Course deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
});

// Webinars
app.get("/api/webinars", async (req, res) => {
  try {
    const webinars = await Webinar.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      webinars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch webinars",
    });
  }
});

app.post("/api/webinars", authenticate, async (req, res) => {
  try {
    const webinar = await Webinar.create(req.body);

    res.json({
      success: true,
      webinar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create webinar",
    });
  }
});

app.put("/api/webinars/:id", authenticate, async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      webinar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update webinar",
    });
  }
});

app.delete("/api/webinars/:id", authenticate, async (req, res) => {
  try {
    await Webinar.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Webinar deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete webinar",
    });
  }
});

// Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
});

app.post("/api/posts", authenticate, async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
});

app.put("/api/posts/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
});

app.delete("/api/posts/:id", authenticate, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
});

// Gallery
app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
    });
  }
});

app.post(
  "/api/gallery",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const gallery = await Gallery.create({
        title: req.body.title || "",
        image: `/uploads/${req.file.filename}`,
      });

      res.json({
        success: true,
        gallery,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }
  }
);

app.delete("/api/gallery/:id", authenticate, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (gallery) {
      const filename = path.basename(gallery.image);
      const filePath = path.join(uploadDir, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await Gallery.findByIdAndDelete(req.params.id);
    }

    res.json({
      success: true,
      message: "Gallery item deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete gallery item",
    });
  }
});

// Enquiries
app.post("/api/enquiries", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    res.json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
});

app.get("/api/enquiries", authenticate, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
});

app.delete("/api/enquiries/:id", authenticate, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Enquiry deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
    });
  }
});

// Static uploads
app.use("/uploads", express.static(uploadDir));

// Start server
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`CRIMELENS backend running on port ${PORT}`);
  await createAdmin();
});
