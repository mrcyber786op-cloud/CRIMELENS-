require('dotenv').config();

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 10000);

const UPLOADS = path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOADS, { recursive: true });

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters.');
}

if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD is required.');
}

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

const allowedOrigin =
  process.env.FRONTEND_URL && process.env.FRONTEND_URL !== '*'
    ? process.env.FRONTEND_URL
    : null;

if (allowedOrigin) {
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many login attempts. Try again later.'
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, UPLOADS),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, crypto.randomUUID() + ext);
    }
  }),
  limits: {
    fileSize: (Number(process.env.MAX_UPLOAD_MB) || 5) * 1024 * 1024
  },
  fileFilter: (_, file, cb) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ];

    cb(null, allowed.includes(file.mimetype));
  }
});

const types = ['gallery', 'course', 'webinar', 'post'];

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: types,
      index: true,
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 160,
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Item = mongoose.model('Item', itemSchema);

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true
    },
    passwordHash: String
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model('Admin', adminSchema);

function signToken(admin) {
  return jwt.sign(
    {
      sub: String(admin._id),
      username: admin.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
      issuer: 'crimelens'
    }
  );
}

function auth(req, res, next) {
  try {
    const token = req.cookies.crimelens_admin;

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    req.admin = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'crimelens'
    });

    next();
  } catch {
    return res.status(401).json({
      error: 'Invalid or expired session'
    });
  }
}

function cleanUrl(value) {
  if (!value) return '';

  try {
    const url = new URL(value);

    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }

    return url.toString();
  } catch {
    return '';
  }
}

/* Health check */
app.get('/', (_, res) => {
  res.json({
    ok: true,
    service: 'CRIMELENS Backend',
    status: 'running'
  });
});

/* Authentication */
app.post('/api/auth/login', async (req, res) => {
  try {
    const username = String(req.body.username || '').trim();
    const password = String(req.body.password || '');

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required.'
      });
    }

    const admin = await Admin.findOne({ username });

    if (
      !admin ||
      !(await bcrypt.compare(password, admin.passwordHash))
    ) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const token = signToken(admin);

    res.cookie('crimelens_admin', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000,
      path: '/'
    });

    res.json({
      ok: true,
      user: {
        username: admin.username
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Login failed'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('crimelens_admin', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/'
  });

  res.json({
    ok: true
  });
});

app.get('/api/auth/me', auth, (req, res) => {
  res.json({
    ok: true,
    user: {
      username: req.admin.username
    }
  });
});

/* Public content */
app.get('/api/content/:type', async (req, res) => {
  try {
    const type = req.params.type;

    if (!types.includes(type)) {
      return res.status(404).json({
        error: 'Unknown content type'
      });
    }

    const data = await Item.find({ type })
      .sort({ createdAt: -1 })
      .lean();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Database error'
    });
  }
});

/* Create content */
app.post(
  '/api/content/:type',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const type = req.params.type;

      if (!types.includes(type)) {
        return res.status(404).json({
          error: 'Unknown content type'
        });
      }

      const title = String(req.body.title || '').trim();

      if (!title) {
        return res.status(400).json({
          error: 'Title is required'
        });
      }

      const doc = await Item.create({
        type,
        title,
        description: String(
          req.body.description || ''
        ).trim(),
        link: cleanUrl(
          String(req.body.link || '')
        ),
        image: req.file
          ? '/uploads/' + req.file.filename
          : ''
      });

      res.status(201).json(doc);
    } catch (error) {
      console.error(error);

      if (req.file) {
        fs.rmSync(
          path.join(UPLOADS, req.file.filename),
          { force: true }
        );
      }

      res.status(400).json({
        error: 'Could not save content'
      });
    }
  }
);

/* Update content */
app.put(
  '/api/content/:type/:id',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const type = req.params.type;

      if (!types.includes(type)) {
        return res.status(404).json({
          error: 'Unknown content type'
        });
      }

      const doc = await Item.findOne({
        _id: req.params.id,
        type
      });

      if (!doc) {
        return res.status(404).json({
          error: 'Not found'
        });
      }

      if (req.body.title !== undefined) {
        doc.title = String(req.body.title).trim();
      }

      if (req.body.description !== undefined) {
        doc.description = String(
          req.body.description
        ).trim();
      }

      if (req.body.link !== undefined) {
        doc.link = cleanUrl(
          String(req.body.link)
        );
      }

      if (req.file) {
        if (doc.image) {
          fs.rmSync(
            path.join(
              __dirname,
              doc.image.replace(/^\//, '')
            ),
            { force: true }
          );
        }

        doc.image =
          '/uploads/' + req.file.filename;
      }

      await doc.save();

      res.json(doc);
    } catch (error) {
      console.error(error);

      if (req.file) {
        fs.rmSync(
          path.join(UPLOADS, req.file.filename),
          { force: true }
        );
      }

      res.status(400).json({
        error: 'Could not update content'
      });
    }
  }
);

/* Delete content */
app.delete(
  '/api/content/:type/:id',
  auth,
  async (req, res) => {
    try {
      const type = req.params.type;

      if (!types.includes(type)) {
        return res.status(404).json({
          error: 'Unknown content type'
        });
      }

      const doc = await Item.findOneAndDelete({
        _id: req.params.id,
        type
      });

      if (!doc) {
        return res.status(404).json({
          error: 'Not found'
        });
      }

      if (doc.image) {
        fs.rmSync(
          path.join(
            __dirname,
            doc.image.replace(/^\//, '')
          ),
          { force: true }
        );
      }

      res.json({
        ok: true
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: 'Could not delete'
      });
    }
  }
);

/* Uploaded images */
app.use(
  '/uploads',
  express.static(UPLOADS, {
    fallthrough: false,
    maxAge: '7d'
  })
);

/* Start server */
async function bootstrap() {
  await mongoose.connect(
    process.env.MONGO_URL,
    {
      dbName: process.env.DB_NAME || 'crimelens'
    }
  );

  const username = String(
    process.env.ADMIN_USERNAME || 'admin'
  ).trim();

  let admin = await Admin.findOne({
    username
  });

  if (!admin) {
    admin = await Admin.create({
      username,
      passwordHash: await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        12
      )
    });

    console.log(
      'Admin account created:',
      username
    );
  } else {
    console.log(
      'Admin account exists:',
      username
    );
  }

  app.listen(PORT, () => {
    console.log(
      `CRIMELENS backend running on port ${PORT}`
    );
  });
}

bootstrap().catch((error) => {
  console.error(
    'Startup failed:',
    error.message
  );

  process.exit(1);
});
