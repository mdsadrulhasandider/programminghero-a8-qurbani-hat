"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/login");
      setIsMobileMenuOpen(false); // Close menu on logout
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600 tracking-tight" onClick={closeMenu}>
              Qurbani<span className="text-gray-800">Hat</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</Link>
            <Link href="/animals" className="text-gray-700 hover:text-green-600 font-medium transition-colors">All Animals</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/my-profile" className="text-gray-700 hover:text-green-600 transition-colors" title="My Profile">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                      }}
                      className="w-8 h-8 rounded-full border border-green-500 object-cover" 
                    />
                  ) : (
                    <FaUserCircle className="text-3xl" />
                  )}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Login</Link>
                <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate__animated animate__fadeInDown animate__faster">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
            >
              Home
            </Link>
            <Link 
              href="/animals" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
            >
              All Animals
            </Link>
            
            <div className="border-t border-gray-200 my-2 pt-2"></div>
            
            {user ? (
              <div className="space-y-3">
                <Link 
                  href="/my-profile" 
                  onClick={closeMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                      }}
                      className="w-6 h-6 rounded-full mr-3 border border-green-500 object-cover" 
                    />
                  ) : (
                    <FaUserCircle className="text-2xl mr-3" />
                  )}
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 mt-4">
                <Link 
                  href="/login" 
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2 border border-green-600 rounded-md text-green-600 font-medium hover:bg-green-50"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
