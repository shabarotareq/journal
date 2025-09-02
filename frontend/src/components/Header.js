import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b-2 border-amber-500">
      <div className="flex items-center justify-between px-6 py-4">
        {/* الشعار */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
            <i className="fas fa-broadcast-tower text-white text-xl"></i>
          </div>
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-amber-800 amiri-font"
            >
              أصداء
            </Link>
            <p className="text-xs text-gray-600">منصة إعلامية تراثية</p>
          </div>
        </div>

        {/* شريط البحث الذكي */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث الذكي في الأخبار والتراث والمشاريع..."
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none"
            />
            <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600"></i>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ai-pulse">
                <i className="fas fa-robot mr-1"></i>AI
              </span>
            </div>
          </div>
        </div>

        {/* الإشعارات والملف الشخصي */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="relative p-3 text-gray-600 hover:text-amber-600 transition-colors">
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
            <i className="fas fa-user text-white"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
