import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="news-gradient text-white shadow-2xl">
      <div className="container mx-auto px-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-3 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-6 space-x-reverse text-sm">
            <span>{new Date().toLocaleDateString("ar-SA")}</span>
            <span>|</span>
            <span>نابلس، فلسطين</span>
            <span>|</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full ml-2 pulse-live"></span>
              بث مباشر
            </span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="hover:text-gray-300 transition-colors">
              🔍
            </button>
            <button className="hover:text-gray-300 transition-colors">
              🌐
            </button>
            <button className="hover:text-gray-300 transition-colors">
              📱
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Promotional Banner */}
          <div className="hidden lg:block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg p-3 text-white shadow-lg ai-glow max-w-sm">
            <div className="flex items-center">
              <div className="text-2xl ml-3 animate-bounce">🚀</div>
              <div>
                <div className="text-sm font-bold">
                  جديد! تقنية الذكاء الاصطناعي
                </div>
                <div className="text-xs opacity-90">
                  تحليل فوري للأخبار والأحداث
                </div>
              </div>
            </div>
          </div>

          {/* Platform Name and Logo */}
          <div className="flex items-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold">الجزيرة الذكية</h1>
              <p className="text-gray-200">
                منصة إخبارية متطورة بتقنيات الذكاء الاصطناعي
              </p>
            </div>
            {/* Logo */}
            <div className="mr-4 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl animate-pulse">
              📺
            </div>
          </div>

          {/* AI Status Indicator */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse ai-glow bg-white bg-opacity-10 rounded-lg px-4 py-2">
            <div className="w-3 h-3 bg-green-400 rounded-full pulse-live"></div>
            <span className="text-sm">الذكاء الاصطناعي نشط</span>
            <span className="text-xs opacity-75">تحليل مستمر للأخبار</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="pb-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex space-x-8 space-x-reverse">
              <a
                href="#breaking"
                className="hover:text-gray-200 transition-colors font-bold border-b-2 border-white pb-1"
              >
                عاجل
              </a>
              <a
                href="#palestine"
                className="hover:text-gray-200 transition-colors"
              >
                فلسطين
              </a>
              <a
                href="#nablus"
                className="hover:text-gray-200 transition-colors"
              >
                نابلس
              </a>
              <a
                href="#ai-analysis"
                className="hover:text-gray-200 transition-colors"
              >
                تحليل ذكي
              </a>
              <a
                href="#heritage"
                className="hover:text-gray-200 transition-colors"
              >
                تراث
              </a>
              <a
                href="#vr-studio"
                className="hover:text-gray-200 transition-colors"
              >
                استوديو VR
              </a>
              <a
                href="#live-map"
                className="hover:text-gray-200 transition-colors"
              >
                خريطة حية
              </a>
            </div>
            <button
              id="menuBtn"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex flex-col space-y-3">
                <a
                  href="#breaking"
                  className="hover:text-gray-200 transition-colors font-bold"
                >
                  عاجل
                </a>
                <a
                  href="#palestine"
                  className="hover:text-gray-200 transition-colors"
                >
                  فلسطين
                </a>
                <a
                  href="#nablus"
                  className="hover:text-gray-200 transition-colors"
                >
                  نابلس
                </a>
                <a
                  href="#ai-analysis"
                  className="hover:text-gray-200 transition-colors"
                >
                  تحليل ذكي
                </a>
                <a
                  href="#heritage"
                  className="hover:text-gray-200 transition-colors"
                >
                  تراث
                </a>
                <a
                  href="#vr-studio"
                  className="hover:text-gray-200 transition-colors"
                >
                  استوديو VR
                </a>
                <a
                  href="#live-map"
                  className="hover:text-gray-200 transition-colors"
                >
                  خريطة حية
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
