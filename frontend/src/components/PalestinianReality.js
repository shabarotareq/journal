import React, { useState, useEffect } from "react";
import axios from "axios";

const PalestinianReality = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // محاكاة لجلب البيانات (في التطبيق الحقيقي ستكون API call)
    const mockNews = [
      {
        id: 1,
        title: "أزمة المعيشة تتفاقم في غزة",
        content: "تقرير ميداني عن تأثير الحصار على الحياة اليومية لسكان القطاع",
        category: "palestinian_reality",
        region: "gaza",
      },
      {
        id: 2,
        title: "توسع استيطاني جديد في الضفة",
        content: "تحليل للسياسات الاستيطانية وتأثيرها على المجتمعات الفلسطينية",
        category: "palestinian_reality",
        region: "west_bank",
      },
    ];
    setNewsItems(mockNews);
  }, []);

  const regions = [
    {
      title: "الضفة الغربية",
      color: "green",
      stats: {
        population: "3.2 مليون",
        unemployment: "26%",
        settlements: "132",
      },
      updates: "اعتقالات في نابلس وجنين",
    },
    {
      title: "قطاع غزة",
      color: "red",
      stats: { population: "2.3 مليون", unemployment: "47%", years: "17 سنة" },
      updates: "أزمة كهرباء ومياه مستمرة",
    },
    {
      title: "فلسطين 48",
      color: "blue",
      stats: {
        population: "1.9 مليون",
        unemployment: "18%",
        demolitions: "مستمر",
      },
      updates: "قوانين تمييزية وعنصرية",
    },
    {
      title: "الشتات",
      color: "purple",
      stats: { refugees: "6.4 مليون", countries: "58 دولة", camps: "68 مخيم" },
      updates: "مطلب أساسي وحق مقدس",
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 amiri-font">
            الواقع الفلسطيني اليوم
          </h2>
          <p className="text-gray-600 mt-1">
            تغطية شاملة للأوضاع السياسية والمعيشية في فلسطين والشتات
          </p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm animate-pulse">
            <i className="fas fa-globe text-red-500 mr-1"></i>
            تحديث مستمر
          </span>
          <button className="bg-gradient-to-r from-green-600 to-red-600 text-white px-6 py-3 rounded-full hover:from-green-700 hover:to-red-700 transition-all">
            <i className="fas fa-plus ml-2"></i>
            تقرير جديد
          </button>
        </div>
      </div>

      {/* الخريطة السياسية والمعيشية */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {regions.map((region, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-t-4 border-green-600"
          >
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 text-white relative">
              <div className="absolute top-2 left-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs">
                  🇵🇸
                </span>
              </div>
              <h3 className="text-lg font-bold amiri-font">{region.title}</h3>
              <p className="text-green-100 text-sm">
                {region.title === "الشتات"
                  ? "حول العالم"
                  : region.title === "قطاع غزة"
                  ? "تحت الحصار"
                  : "11 محافظة"}
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {Object.entries(region.stats).map(([key, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600">
                      {key === "population" && "السكان"}
                      {key === "unemployment" && "البطالة"}
                      {key === "settlements" && "المستوطنات"}
                      {key === "years" && "سنوات الحصار"}
                      {key === "demolitions" && "هدم المنازل"}
                      {key === "refugees" && "اللاجئون"}
                      {key === "countries" && "الدول المضيفة"}
                      {key === "camps" && "مخيمات اللجوء"}
                    </span>
                    <span className="font-bold text-green-600">{value}</span>
                  </div>
                ))}
                <div className="bg-green-50 p-2 rounded text-xs">
                  <strong className="text-green-700">
                    {region.title === "الشتات" ? "حق العودة:" : "آخر التطورات:"}
                  </strong>
                  <p className="text-green-600 mt-1">{region.updates}</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                {region.title === "الشتات"
                  ? "قصص الشتات"
                  : region.title === "قطاع غزة"
                  ? "تقارير الحصار"
                  : "تقارير مفصلة"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* التقارير الحية والتحليلات */}
      <div className="carousel-container flex space-x-6 space-x-reverse overflow-x-auto pb-4">
        {newsItems.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="carousel-item bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
          >
            <div className="h-48 bg-gradient-to-br from-red-600 to-orange-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-home text-white text-6xl opacity-80"></i>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  <i className="fas fa-exclamation-triangle mr-1"></i>عاجل
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">
                  منذ ساعتين
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 amiri-font">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <i className="fas fa-users ml-1"></i>
                  2.3 مليون متأثر
                </span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  اقرأ التقرير
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PalestinianReality;
