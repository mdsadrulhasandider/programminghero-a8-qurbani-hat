"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

export default function MyProfile() {
  const router = useRouter();
  const { data: session, isPending: loading } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to view your profile");
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-green-600 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center animate__animated animate__fadeInDown">
          My Profile
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
          <div className="bg-green-600 h-32"></div>
          
          <div className="px-6 sm:px-12 pb-8 flex flex-col items-center -mt-16">
            {user.image ? (
              <img 
                src={user.image!} 
                alt="Profile" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white relative z-10"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-300 bg-white rounded-full border-4 border-white shadow-md relative z-10" />
            )}
            
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {user.name || "No Name Set"}
            </h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
            
            <div className="mt-8 w-full border-t border-gray-100 pt-8 flex justify-center">
              <Link 
                href="/update-profile"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
              >
                Update Profile Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
