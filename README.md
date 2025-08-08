# 🚀 Job Board Application

A full-stack job board application built with React, Node.js, Express, and MongoDB. Users can browse job listings, search for jobs, and apply to positions.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
job-board-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   ├── seed.js             # Database seeding script
│   └── package.json
└── README.md
```

## 🚀 Features

### ✅ Implemented Features
- **Job Listings**: Display all available jobs with title, company, location, and description
- **Search & Filter**: Search jobs by keyword and filter by location
- **Job Application**: Apply to jobs with name, email, and resume URL
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **State Management**: Redux Toolkit for efficient state management
- **Routing**: React Router for navigation between pages
- **Error Handling**: Comprehensive error handling on both frontend and backend

### 🔄 API Endpoints

#### Jobs
- `GET /jobs` - Get all job listings
- `GET /jobs/:id` - Get a specific job
- `POST /jobs` - Create a new job (admin)
- `PUT /jobs/:id` - Update a job (admin)
- `DELETE /jobs/:id` - Delete a job (admin)

#### Applications
- `POST /apply/:jobId` - Submit a job application
- `GET /apply` - Get all applications (admin)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd job-board-app
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard?retryWrites=true&w=majority
   PORT=5000
   ```
   
   Replace `username` and `password` with your MongoDB credentials.

4. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000

6. **Set up the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   ```

7. **Start the frontend development server**
   ```bash
   npm start
   ```
   The app will run on http://localhost:3000

## 📱 Usage

1. **Browse Jobs**: Visit the homepage to see all available job listings
2. **Search Jobs**: Use the search bar to filter jobs by keyword or location
3. **Apply for Jobs**: Click "Apply Now" on any job card to fill out the application form
4. **Submit Application**: Fill in your name, email, and resume URL to apply

## 🔧 Development

### Running in Development Mode

**Backend:**
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

**Frontend:**
```bash
cd client
npm start    # React development server with hot reload
```

### Database Operations

**Seed database with sample jobs:**
```bash
cd server
npm run seed
```

**Connect to MongoDB:**
The application connects to MongoDB using the connection string in your `.env` file.

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Deploy the `server` directory
3. Ensure MongoDB connection string is properly configured

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Configure API base URL for production

## 🔮 Future Enhancements

- **JWT Authentication**: Admin login for job management
- **File Upload**: Direct resume file upload instead of URLs
- **Job Categories**: Categorize jobs by industry/type
- **Pagination**: Handle large numbers of job listings
- **Email Notifications**: Notify employers of new applications
- **Advanced Search**: Salary range, job type filters
- **User Profiles**: Save applications and job preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB URI in the `.env` file
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check if MongoDB service is running (for local installations)

2. **CORS Errors**
   - Ensure the backend server is running on port 5000
   - Check that CORS is properly configured in `server/index.js`

3. **Frontend Not Loading Jobs**
   - Verify the API URL in `client/src/store/jobsSlice.js`
   - Check browser console for network errors
   - Ensure backend server is running

4. **Application Submission Fails**
   - Verify all form fields are filled
   - Check that the job ID is valid
   - Ensure backend validation is not blocking the request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Happy Job Hunting! 🎯**