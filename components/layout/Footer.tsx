import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/[0.07] bg-[#07070f] mt-0">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
