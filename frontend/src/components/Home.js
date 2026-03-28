import { useEffect, useState } from "react";

function Home({ setScreen }) {
    return (
        <div className="home-container">
            {/* 🌌 Background Glow (kept for aesthetic) */}
            <div className="bg-glow"></div>

            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-text">Interview.<span className="logo-text-highlight">IQ</span></span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#profile">Profile</a></li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <div className="hero-section">
                {/* Center Content (Left side of the screen visually, but centered in its flex column) */}
                <div className="hero-content">
                    <h1 className="hero-title">Interview.IQ</h1>
                    <p className="hero-about">
                        Interview.IQ is an AI-based platform that simulates real interview scenarios using voice and video interaction. 
                        It helps users practice answering questions, provides live transcription, and generates performance feedback to improve confidence, fluency, and clarity.
                    </p>
                    <button
                        className="start-btn get-started-btn"
                        onClick={() => setScreen("instructions")}
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Image */}
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80" alt="AI Technical Assistant" className="tech-pic" />
                    <div className="glow-behind-image"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;