import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Topics from '../Data/Topics';

function Home() {
  // const [topics, setTopics] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/v1/topics/');
  //       if (response.data.success) {
  //         console.log('Fetched topics:', response.data.data); 
  //         setTopics(response.data.data); 
  //       } else {
  //         throw new Error(response.data.message || 'Failed to fetch topics');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching topics:', error);
  //       setError(error.message || 'Failed to fetch topics');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTopics();
  // }, []);



  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p className="text-red-500">{error}</p>;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-gray-200 mt-16">
      <header className="w-full py-16">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1
            className="text-5xl font-bold text-gray-800 mb-4"
            style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)" }}
          >
            Welcome to BackendVerse
          </h1>
          <p
            className="text-xl text-gray-900"
            style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Your hub for mastering backend technologies, programming insights, and
            developer best practices.
          </p>
        </div>

      </header>



      <hr className="border-t-2 border-gray-400 mb-16  w-4/5 mx-auto" />

      {/* Topics Section */}
      <div className="mt-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Topics.length > 0 ? (
            Topics.map((topic) => (
              <Link
                key={topic._id}
                to={`/topic/${topic.name}`}
                className="relative group"
              >
                <div
                  className="w-full h-48  text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                // style={{
                //   backgroundImage: `url(${topic.image || 'https://via.placeholder.com/400x300'})`, // Dynamic background image if provided, fallback to placeholder
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
                >
                  <div className={`absolute inset-0  flex justify-center items-center ${topic.gradient}`}>
                    <h2 className="text-2xl font-bold capitalize">{topic.name}</h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-800 text-center col-span-full">
              No topics available.
            </p>
          )}
        </div>
      </div>

    </div>
  );

}

export default Home;
