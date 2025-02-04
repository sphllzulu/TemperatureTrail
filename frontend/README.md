WeatherTrip Planner
Table of Contents
Introduction
Developers
Technologies Used
Setup Instructions
App Features
File Structure

Introduction
WeatherTrip Planner is a web application designed to enhance your travel experiences by providing real-time weather forecasts and personalized activity recommendations based on your chosen destination.

Developers
Frontend: Sibusiso Khoza
 Email: sibusisok59@domain.com
Backend: Siphelele Zulu
 Email: shpllzulu@gmail.com

Technologies Used
Frontend:
React.js
Material-UI (MUI) for UI components
Vite for development and bundling
Backend:
MongoDB for the database

Setup Instructions

Deployed link: https://temperaturetrail-2.onrender.com
Prerequisites
Ensure you have the following installed on your system:
Node.js (v16+ recommended)
npm or yarn package manager
Backend Setup
Clone the repository:
 git clone <backend-repo-url>
cd backend


Install dependencies:
 npm install


Set up your environment variables:
Create a .env file in the root directory.
Add the following variables:
 MONGO_URI=your_mongodb_connection_string
PORT=5000


Start the backend server:
 npm start


Frontend Setup
Clone the repository:
 git clone <frontend-repo-url>
cd frontend


Install dependencies:
 npm install


Start the development server:
 npm run dev


Access the application in your browser at http://localhost:3000.

App Features
Header
Logo: Positioned on the left, displaying the app name (e.g., "WeatherTrip Planner").
Navigation Bar: Links to key sections such as:
Home
Favorites
About
Contact Us
Search Bar: Centrally located, with a placeholder like "Search destination...".
Homepage Layout
Hero Section
Full-width background image of a scenic travel location.
Prominent search bar for entering a city or destination.
Weather Results Section (After Search)
Overview Panel:
Current weather details, including city name, date, temperature, humidity, and wind speed.
7-Day Forecast:
Scrollable carousel or grid layout showing daily weather summaries.
Interactive Map:
Displays a pin on the searched destination using a map API.
Activity Recommendations Section
Suggests activities based on weather:
Sunny: Outdoor activities.
Rainy: Indoor activities.
Cloudy: Neutral activities.
Favorites Page
Grid/List view for saved destinations with options to view or remove details.
Footer
Quick links, social media icons, and copyright information.

File Structure
Frontend
frontend/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- assets/
|-- package.json
|-- vite.config.js

Backend
backend/
|-- models/
|-- routes/
|-- controllers/
|-- .env
|-- server.js


Dependencies
Frontend
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@mui/material": "^5.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2"
  }
}

Backend
express
mongoose
dotenv
cors

License
This project is open-source and available under the MIT License.
