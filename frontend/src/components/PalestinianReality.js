import React, { useState, useEffect } from "react";

const PalestinianReality = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // محاكاة بيانات (API لاحقاً)
    const mockNews = [
      {
        id: 1,
        title: "أزمة المعيشة تتفاقم في غزة",
        content: "تقرير ميداني عن تأثير الحصار على الحياة اليومية لسكان القطاع",
      },
      {
        id: 2,
        title: "توسع استيطاني جديد في الضفة",
        content: "تحليل للسياسات الاستيطانية وتأثيرها على المجتمعات الفلسطينية",
      },
    ];
    setNewsItems(mockNews);
  }, []);

  const regions = [
    {
      title: "الضفة الغربية",
      gradient: "from-green-600 to-emerald-700",
      accent: "green",
      stats: {
        population: "3.2 مليون",
        unemployment: "26%",
        settlements: "132",
      },
      updates: "اعتقالات في نابلس وجنين",
    },
    {
      title: "قطاع غزة",
      gradient: "from-red-600 to-orange-700",
      accent: "red",
      stats: { population: "2.3 مليون", unemployment: "47%", years: "17 سنة" },
      updates: "أزمة كهرباء ومياه مستمرة",
    },
    {
      title: "فلسطين 48",
      gradient: "from-blue-600 to-indigo-700",
      accent: "blue",
      stats: {
        population: "1.9 مليون",
        unemployment: "18%",
        demolitions: "مستمر",
      },
      updates: "قوانين تمييزية وعنصرية",
    },
    {
      title: "الشتات",
      gradient: "from-purple-600 to-pink-700",
      accent: "purple",
      stats: { refugees: "6.4 مليون", countries: "58 دولة", camps: "68 مخيم" },
      updates: "مطلب أساسي وحق مقدس",
    },
  ];

  return (
    <section className="mb-12">
      {/* العنوان */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 amiri-font">
            الواقع الفلسطيني اليوم
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            تغطية شاملة للأوضاع السياسية والمعيشية في فلسطين والشتات
          </p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs animate-pulse">
            <i className="fas fa-globe text-red-500 mr-1"></i>
            تحديث مستمر
          </span>
          <button className="bg-gradient-to-r from-green-600 to-red-600 text-white px-4 py-2 text-xs rounded-full hover:from-green-700 hover:to-red-700 transition-all">
            <i className="fas fa-plus ml-1"></i>
            تقرير جديد
          </button>
        </div>
      </div>

      {/* بلوكات المناطق */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {regions.map((region, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden card-hover h-full flex flex-col"
          >
            {/* رأس البلوك */}
            <div
              className={`bg-gradient-to-br ${region.gradient} p-3 text-white relative`}
            >
              <h3 className="text-base font-bold amiri-font">{region.title}</h3>
              <p className="text-white/80 text-xs">
                {region.title === "الشتات"
                  ? "حول العالم"
                  : region.title === "قطاع غزة"
                  ? "تحت الحصار"
                  : "11 محافظة"}
              </p>
            </div>

            {/* محتوى البلوك */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2 text-sm">
                {Object.entries(region.stats).map(([key, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs"
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
                    <span className={`font-semibold text-${region.accent}-600`}>
                      {value}
                    </span>
                  </div>
                ))}

                <div
                  className={`bg-${region.accent}-50 p-2 rounded text-xs leading-relaxed`}
                >
                  <strong className={`text-${region.accent}-700`}>
                    {region.title === "الشتات" ? "حق العودة:" : "آخر التطورات:"}
                  </strong>
                  <p className={`text-${region.accent}-600 mt-1`}>
                    {region.updates}
                  </p>
                </div>
              </div>

              <button
                className={`w-full mt-3 bg-${region.accent}-600 text-white py-1.5 rounded-md hover:bg-${region.accent}-700 transition-colors text-xs`}
              >
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

      {/* التقارير السريعة */}
      <div className="carousel-container flex space-x-4 space-x-reverse overflow-x-auto pb-4">
        {newsItems.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="carousel-item bg-white rounded-xl shadow-md overflow-hidden card-hover min-w-[260px]"
          >
            <div className="h-32 bg-gradient-to-br from-red-600 to-orange-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-home text-white text-4xl opacity-80"></i>
              </div>
              <div className="absolute top-2 right-2">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                  عاجل
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-1 amiri-font">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs mb-2">
                {item.content.substring(0, 80)}...
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  <i className="fas fa-users ml-1"></i>
                  2.3 مليون متأثر
                </span>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-[11px]">
                  اقرأ
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
