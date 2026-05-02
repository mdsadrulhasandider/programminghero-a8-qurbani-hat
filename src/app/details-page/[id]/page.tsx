"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

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

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session, isPending: loadingAuth } = useSession();
  const user = session?.user;
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // 1. Authentication Check
  useEffect(() => {
    if (!loadingAuth) {
      if (!user) {
        toast.error("You must be logged in to view details and book.");
        router.push("/login");
      } else {
        // Pre-fill user data if available
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || ""
        }));
      }
    }
  }, [user, loadingAuth, router]);

  // 2. Fetch Animal Data
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch('/data/animals.json');
        const data: Animal[] = await response.json();
        const found = data.find(item => item.id.toString() === resolvedParams.id);
        if (found) {
          setAnimal(found);
        } else {
          toast.error("Animal not found");
          router.push("/animals");
        }
      } catch (error) {
        console.error("Error fetching animal:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loadingAuth && user) {
      // simulate network delay for requirement
      setTimeout(() => {
         fetchAnimal();
      }, 500);
    }
  }, [resolvedParams.id, loadingAuth, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // No DB save required as per assignment
    toast.success("Booking successful! We will contact you soon.");
    
    // Reset form
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: ""
    });
  };

  if (loadingAuth || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-green-600 animate-pulse">Loading Details...</div>
      </div>
    );
  }

  if (!animal) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Animal Details Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg animate__animated animate__fadeInLeft">
          <img 
            src={animal.image} 
            alt={animal.name} 
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{animal.name}</h1>
            <span className="text-2xl font-bold text-green-600">৳ {animal.price.toLocaleString()}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold text-gray-900">{animal.category}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Breed</p>
              <p className="font-semibold text-gray-900">{animal.breed}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-semibold text-gray-900">{animal.weight} kg</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold text-gray-900">{animal.age} Years</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{animal.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
            <p className="text-gray-600">{animal.location}</p>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInRight">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Book This Animal</h2>
          
          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-gray-50"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+880 1..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter full address for delivery..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md mt-6"
            >
              Confirm Booking (৳ {animal.price.toLocaleString()})
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
