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

export default function Home() {
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('/data/animals.json');
        const data: Animal[] = await response.json();
        // Take the first 4 animals for the featured section
        setFeaturedAnimals(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch animals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center animate__animated animate__fadeInDown">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find the Perfect Animal for Qurbani</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Browse our wide selection of healthy, locally sourced livestock. Book online securely.
          </p>
          <Link href="/animals" className="bg-white text-green-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
            Browse Animals
          </Link>
        </div>
      </section>

      {/* Featured Animals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate__animated animate__fadeInUp">
            Featured Animals
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredAnimals.map((animal, index) => (
                <div 
                  key={animal.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate__animated animate__zoomIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{animal.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{animal.breed} • {animal.weight}kg</p>
                    
                    <div className="flex justify-between items-center mt-4 border-t pt-4">
                      <span className="text-lg font-bold text-green-600">৳ {animal.price.toLocaleString()}</span>
                      <Link 
                        href={`/details-page/${animal.id}`}
                        className="bg-gray-900 hover:bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/animals" className="text-green-600 font-bold hover:underline text-lg">
              View All Animals →
            </Link>
          </div>
        </div>
      </section>

      {/* Qurbani Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Essential Qurbani Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-green-50">
              <h3 className="text-xl font-bold text-green-700 mb-3">Checking Health</h3>
              <p className="text-gray-600">Ensure the animal is active, has clear eyes, and no visible injuries or diseases before purchasing.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-green-50">
              <h3 className="text-xl font-bold text-green-700 mb-3">Age Requirements</h3>
              <p className="text-gray-600">Cows and buffalos must be at least 2 years old. Goats and sheep must be at least 1 year old for Qurbani.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-green-50">
              <h3 className="text-xl font-bold text-green-700 mb-3">Proper Feeding</h3>
              <p className="text-gray-600">Feed the animal properly and provide enough water a few days prior to Qurbani.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
