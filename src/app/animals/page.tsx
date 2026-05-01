"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import 'animate.css';

interface Animal {
  id: number;
  name: string;
  type: string;
  breed: string;
  price: number;
  weight: number;
  age: number;
  location: string;
  description: string;
  image: string;
  category: string;
}

export default function AllAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  useEffect(() => {
    // Fetching data from public folder
    const fetchAnimals = async () => {
      try {
        const response = await fetch('/data/animals.json');
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error("Failed to fetch animals:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulated delay to show loading state as per requirement
    setTimeout(() => {
      fetchAnimals();
    }, 1000);
  }, []);

  // Handle sorting logic
  const sortedAnimals = [...animals].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0; // Default order
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 animate__animated animate__fadeInLeft">
            Available Animals for Qurbani
          </h1>
          
          <div className="flex items-center space-x-3 animate__animated animate__fadeInRight">
            <label htmlFor="sort" className="text-gray-700 font-medium">Sort by Price:</label>
            <select 
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "default" | "asc" | "desc")}
              className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 py-2 px-3 bg-white"
            >
              <option value="default">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-56 bg-gray-300 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Animals Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAnimals.map((animal, index) => (
              <div 
                key={animal.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={animal.image} 
                  alt={animal.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{animal.name}</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {animal.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Breed:</strong> {animal.breed}</p>
                  <p className="text-gray-600 mb-4"><strong>Location:</strong> {animal.location}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-green-600">৳ {animal.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{animal.weight} kg</span>
                  </div>
                  
                  <Link 
                    href={`/details-page/${animal.id}`}
                    className="block w-full text-center bg-gray-900 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
