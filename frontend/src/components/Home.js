// src/components/Home.js
import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <h1>Hey there!</h1>
      <p>Welcome to the Book Exchange platform. Explore and manage your book collection.</p>

      <style jsx>{`
        .home-container {
          text-align: center;
          padding: 40px;
          background-color: rgba(255, 255, 255, 0.9); /* Light background for readability */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .home-container h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .home-container p {
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}

export default Home;
