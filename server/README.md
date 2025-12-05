# BKPMUN Backend API

Backend server for BKPMUN website with MongoDB database.

## 🚀 Setup

```bash
cd server
npm install
```

## 📝 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bkpmun
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## 🏃 Running

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get single teacher
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Committees
- `GET /api/committees` - Get all committees
- `GET /api/committees/:id` - Get single committee
- `POST /api/committees` - Create committee
- `PUT /api/committees/:id` - Update committee
- `DELETE /api/committees/:id` - Delete committee

### Schedule
- `GET /api/schedule` - Get all schedules
- `GET /api/schedule/:id` - Get single schedule
- `POST /api/schedule` - Create schedule
- `PUT /api/schedule/:id` - Update schedule
- `DELETE /api/schedule/:id` - Delete schedule

### Study Guides
- `GET /api/study-guides` - Get all guides (with ?category= & ?search=)
- `GET /api/study-guides/:id` - Get single guide
- `POST /api/study-guides` - Create guide
- `PUT /api/study-guides/:id` - Update guide
- `DELETE /api/study-guides/:id` - Delete guide

### Announcements
- `GET /api/announcements/active` - Get active announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get single announcement
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

## 🗄️ Database

Uses MongoDB. Make sure MongoDB is running locally or use MongoDB Atlas.

