import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">QurbaniHat</h3>
            <p className="text-gray-400">
              The most trusted marketplace for buying Qurbani animals online. 
              Get healthy and verified livestock delivered to your location.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-green-500 transition">Home</Link></li>
              <li><Link href="/animals" className="text-gray-400 hover:text-green-500 transition">All Animals</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-green-500 transition">Login</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-green-500 transition">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact & Social</h4>
            <p className="text-gray-400 mb-2">Email: support@qurbanihat.com</p>
            <p className="text-gray-400 mb-4">Phone: +880 1234-567890</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 text-2xl transition"><FaFacebook /></a>
              <a href="#" className="text-gray-400 hover:text-green-500 text-2xl transition"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-green-500 text-2xl transition"><FaInstagram /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
