import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import img1 from '../../assets/bird-8788491.jpg'
import img2 from '../../assets/tree-736885_1920.jpg'
import img3 from '../../assets/butterfly-7862893.jpg'
import axios from 'axios';
import CoverFlow from '../CoverFlow/CoverFlow';
import Cube from '../cube/Cube';
import IMG from '../../assets/river-8279466.jpg'
import Fade from '../fade/Fade';

const UNSPLASH_API_KEY = 'e4J_oIj7S4jMLMQH7OpJ3qbtwPoPjNtlBlOPqnTTFdI';

const components = {
  Cube: { component: Cube, title: 'CUBE', wide: false,img: img1 },
  Fade: { component: Fade, title: 'FADE', wide: false ,img: img2 },
  CoverFlow: { component: CoverFlow, title: 'FLIP', wide: false ,img: img3 },
};

export default function ImageSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos/`, {
        params: {
          client_id: UNSPLASH_API_KEY,
          per_page: 30,
          query: searchTerm,
        },
      });
      setImages(res.data.results);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to fetch images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  const toggleComponent = useCallback((component) => {
    setActiveComponent(prev => (prev === component ? null : component));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"
    style={{
      backgroundImage: `url(${IMG})`, // Set the background image
      backgroundSize: 'cover', // Ensures the background image covers the div
      backgroundPosition: 'center', // Centers the background image
    }}
    >
      <header className=" text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">ImageSearch</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
          <input
            type="search"
            placeholder="Search for images..."
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2  text-black bg-green-300 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            <Search className="inline-block mr-2 h-5 w-5" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 ml-[10vw] mr-[10vw] gap-4 mb-8">
          {Object.entries(components).map(([key, { title,img }]) => (
           
           <div
           key={key}
           className="h-[250px] flex text-white text-4xl sm:text-5xl lg:text-6xl rounded-3xl items-center justify-center font-bold cursor-pointer transition-transform hover:scale-105"
           onClick={() => toggleComponent(key)}
           style={{
             backgroundImage: `url(${img})`, // Set the background image
             backgroundSize: 'cover', // Ensures the background image covers the div
             backgroundPosition: 'center', // Centers the background image
           }}
         >

              <p className="text-center">{title}</p>
            </div>
          ))}
        </div>

        {activeComponent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={() => setActiveComponent(null)} // Close the modal when clicking on the background
          >
            <div
              className={`bg-black rounded-lg overflow-auto ${
                components[activeComponent].wide ? 'w-full max-w-7xl' : 'max-w-3xl w-full'
              } max-h-[90vh]`}
              onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
            >
              <div className="overflow-hidden relative">
                <button
                  className="z-30 top-2 right-2 fixed text-white px-3 font-semibold bg-black hover:bg-red-700 rounded-full p-2"
                  onClick={() => setActiveComponent(null)} // Close button inside the modal
                >
                  Close
                </button>
                {React.createElement(components[activeComponent].component, {
                  images, // Pass images to the active component
                  onClose: () => setActiveComponent(null),
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      
    </div>
  );
}
