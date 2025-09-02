import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsSection = () => {
  const [localNews, setLocalNews] = useState([]);
  const [globalNews, setGlobalNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/articles/");
        const articles = response.data;

        // تقسيم الأخبار إلى محلية وعالمية (في تطبيق حقيقي، سيكون هناك حقل للتصنيف)
        setLocalNews(articles.slice(0, 3));
        setGlobalNews(articles.slice(3, 7));
      } catch (error) {
        console.error("Error fetching news:", error);
        // بيانات افتراضية للعرض
        setLocalNews([
          {
            id: 1,
            title: "اكتشاف مقبرة أثرية جديدة في جبل عيبال شمال نابلس",
            content:
              "فريق من علماء الآثار الفلسطينيين يكشف عن مقبرة تعود للعصر البرونزي المتأخر...",
            location: "نابلس",
            views_count: 12450,
            comments_count: 89,
            shares_count: 234,
          },
          {
            id: 2,
            title: "إطلاق أول منصة فلسطينية للذكاء الاصطناعي في التعليم",
            content:
              "جامعة بيرزيت تدشن منصة 'تعلم ذكي' التي تستخدم تقنيات الذكاء الاصطناعي...",
            location: "رام الله",
            views_count: 8720,
            comments_count: 156,
            shares_count: 89,
          },
          {
            id: 3,
            title: "مهرجان القدس للتراث الشعبي يستقطب 30 ألف زائر",
            content:
              "انطلق المهرجان السنوي في البلدة القديمة بمشاركة 50 فرقة تراثية من فلسطين...",
            location: "القدس",
            views_count: 25340,
            comments_count: 267,
            shares_count: 445,
          },
        ]);

        setGlobalNews([
          {
            id: 4,
            title: "قمة المناخ تتوصل لاتفاق تاريخي حول الطاقة المتجددة",
            content:
              "195 دولة توقع على اتفاقية جديدة لتسريع التحول نحو الطاقة النظيفة بحلول 2030...",
            category: "دولي",
            views_count: 45000,
          },
          {
            id: 5,
            title: "إطلاق أول قمر صناعي عربي للذكاء الاصطناعي",
            content:
              "الإمارات تطلق 'الذكاء الفضائي 1' لتطوير تطبيقات الذكاء الاصطناعي في الفضاء...",
            category: "تقنية",
            views_count: 32000,
          },
          {
            id: 6,
            title: "العملات الرقمية تشهد انتعاشاً قوياً في الأسواق العربية",
            content:
              "البيتكوين يتجاوز 45 ألف دولار مع تزايد الاستثمار المؤسسي في المنطقة...",
            category: "اقتصاد",
            views_count: 28000,
          },
          {
            id: 7,
            title: "السعودية تفوز بحق استضافة كأس العالم 2034",
            content:
              "الفيفا يعلن رسمياً اختيار المملكة العربية السعودية لاستضافة البطولة العالمية...",
            category: "رياضة",
            views_count: 67000,
          },
        ]);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-8 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            الأخبار المحلية والعالمية
          </h2>
          <p className="text-gray-600">تغطية شاملة ومتجددة للأحداث المهمة</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Local News Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center">
              <span className="text-xl ml-2">🏠</span>
              <span className="font-bold">الأخبار المحلية</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent mr-4"></div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm pulse-live">
              تحديث مستمر
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {localNews.map((news, index) => (
              <div
                key={news.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0
                      ? "from-green-400 via-blue-500 to-purple-600"
                      : index === 1
                      ? "from-orange-400 via-red-500 to-pink-600"
                      : "from-purple-400 via-blue-500 to-teal-600"
                  } opacity-90`}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative p-6 h-80 flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs pulse-live">
                        عاجل
                      </span>
                      <span className="mr-2 text-xs opacity-75">
                        📍 {news.location}
                      </span>
                      <span className="mr-2 text-xs opacity-75">
                        ⏰ منذ 20 دقيقة
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-300 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {news.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <span className="ml-3">👁️ {news.views_count}</span>
                      <span className="ml-3">💬 {news.comments_count}</span>
                      <span>📤 {news.shares_count}</span>
                    </div>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-bold">
                      اقرأ المزيد
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  {index === 0 ? "🏛️" : index === 1 ? "🤖" : "🎭"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global News Section */}
        <div>
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
              <span className="text-xl ml-2">🌍</span>
              <span className="font-bold">الأخبار العالمية</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent mr-4"></div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              آخر التطورات
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {globalNews.map((news, index) => (
              <div
                key={news.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0
                      ? "from-red-500 via-orange-500 to-yellow-500"
                      : index === 1
                      ? "from-blue-500 via-purple-500 to-indigo-600"
                      : index === 2
                      ? "from-green-500 via-teal-500 to-blue-600"
                      : "from-purple-500 via-pink-500 to-red-600"
                  } opacity-90`}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative p-4 h-64 flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs pulse-live">
                        عاجل
                      </span>
                      <span className="mr-2 text-xs opacity-75">
                        🌍 {news.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {news.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>👁️ {news.views_count}</span>
                    <button className="bg-white text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition-colors font-bold">
                      المزيد
                    </button>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg animate-bounce">
                  {index === 0
                    ? "🌱"
                    : index === 1
                    ? "🛰️"
                    : index === 2
                    ? "₿"
                    : "⚽"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Updates Bar */}
        <div className="mt-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full pulse-live ml-3"></div>
              <span className="font-bold">تحديثات مباشرة</span>
            </div>
            <div className="text-sm opacity-90">آخر تحديث: منذ دقيقتين</div>
          </div>
          <div className="mt-2 text-sm opacity-95">
            🔴 متابعة مستمرة للأحداث المحلية والعالمية • 📊 تحليل فوري بالذكاء
            الاصطناعي • 🌍 تغطية شاملة من 50 دولة
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
