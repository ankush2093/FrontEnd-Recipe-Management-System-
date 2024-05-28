import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <nav className="flex justify-center space-x-4">
            <a href="" className="text-sm hover:underline">
              About Us
            </a>
            <a href="" className="text-sm hover:underline">
              Contact
            </a>
            <a href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
