import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import ImageGeneratorComponent from './ImageGeneratorComponent';
import './App.css'; // Importing CSS file

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/generate-image" element={<ImageGeneratorComponent />} />
          <Route path="/" element={<div className="container">
        <h1>Welcome to the AI Application</h1>
        <nav className="nav">
          <Link to="/chat">
            <button className="nav-button">Chat API</button>
          </Link>
          <Link to="/generate-image">
            <button className="nav-button">Image Generator</button>
          </Link>
        </nav>
        </div>} />
        </Routes>
     
    </Router>
  );
}

export default App;
