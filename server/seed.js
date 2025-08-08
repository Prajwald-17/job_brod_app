const mongoose = require('mongoose');
const Job = require('./models/Job');
require('dotenv').config();

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using React, HTML, CSS, and JavaScript. Experience with modern frontend frameworks and responsive design is required."
  },
  {
    title: "Backend Developer",
    company: "DataSoft Solutions",
    location: "New York, NY",
    description: "Join our backend team to build scalable APIs and microservices. We work with Node.js, Express, MongoDB, and AWS. Looking for someone with 2+ years of experience in backend development and database design."
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    description: "Exciting opportunity for a Full Stack Developer to work on cutting-edge web applications. You'll work with React, Node.js, PostgreSQL, and Docker. Perfect for someone who loves working in a fast-paced startup environment."
  },
  {
    title: "UI/UX Designer",
    company: "Creative Agency",
    location: "Los Angeles, CA",
    description: "We're seeking a talented UI/UX Designer to create beautiful and intuitive user experiences. Proficiency in Figma, Adobe Creative Suite, and understanding of user-centered design principles is essential."
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Seattle, WA",
    description: "Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, Kubernetes, and automation tools is required. Help us scale our applications efficiently."
  },
  {
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    description: "Join our data science team to extract insights from large datasets. We work with Python, R, SQL, and machine learning frameworks. Looking for someone with strong analytical skills and experience in statistical modeling."
  },
  {
    title: "Mobile Developer",
    company: "AppMakers Ltd",
    location: "Chicago, IL",
    description: "Develop amazing mobile applications for iOS and Android platforms. Experience with React Native or Flutter is preferred. You'll work on consumer-facing apps with millions of users."
  },
  {
    title: "Product Manager",
    company: "InnovateTech",
    location: "Denver, CO",
    description: "Lead product development from conception to launch. Work closely with engineering, design, and marketing teams. Looking for someone with 3+ years of product management experience and strong analytical skills."
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    await Job.insertMany(sampleJobs);
    console.log('Sample jobs inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();