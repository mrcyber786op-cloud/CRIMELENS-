# CRIMELENS — Secure Admin Website

## Requirements
- Node.js 20+
- MongoDB (local or hosted)

## Setup
1. Copy `.env.example` to `.env`.
2. Set `MONGO_URL`, `DB_NAME`, and a random `JWT_SECRET` (64+ random characters).
3. Set `ADMIN_USERNAME=admin`.
4. Set `ADMIN_PASSWORD` to the admin password you chose. It is hashed with bcrypt when the first admin is created; the password is never sent to the browser.
5. Run `npm install` then `npm start`.
6. Open `http://localhost:3000` and admin at `http://localhost:3000/admin.html`.

## Production
- Use HTTPS and set `NODE_ENV=production`.
- Keep `.env` private and never commit it.
- Use a managed MongoDB with network restrictions and backups.
- Set `FRONTEND_URL` to your final HTTPS domain if you later use cross-origin API access.
- Back up MongoDB and the `uploads/` directory.
- Put the app behind a reverse proxy such as Nginx/Cloudflare and restrict server access.

## Content
Admin can add/edit/delete Gallery, Courses, Webinars and Posts. Images are stored on the server and metadata in MongoDB, so content is not dependent on one phone/browser.
