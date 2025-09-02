// Sidebar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// إصلاح أيقونات Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Sidebar = () => {
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      text: "مرحباً! أنا مساعدك الإعلامي الذكي. يمكنني مساعدتك في تحليل الأخبار وكتابة التقارير عن التراث الفلسطيني والنابلسي.",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [news, setNews] = useState([]);

  const sendAIMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = { id: Date.now(), text: inputMessage, isUser: true };
    setAiMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const aiResponses = [
        "تحليل الذكاء الاصطناعي يشير إلى أن الاكتشاف الأثري في نابلس يعكس عمق التاريخ الفلسطيني.",
        "مهرجان التراث النابلسي يعزز الهوية الثقافية الفلسطينية.",
        "نابلس تحتل مكانة مركزية في الخريطة الثقافية الفلسطينية.",
        "التراث النابلسي يواجه تحديات الحفظ والتوثيق.",
      ];
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
      };
      setAiMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.worldnewsapi.com/search-news",
          {
            params: {
              "source-country": "ps",
              language: "ar",
              apiKey: "06ce6303812b4f869ec43c92a13b55c3",
            },
          }
        );
        setNews(response.data.articles.slice(0, 6));
      } catch (error) {
        console.error("فشل في جلب الأخبار:", error);
        // بيانات وهمية للعرض عند فشل جلب الأخبار
        setNews([
          { title: "افتتاح معرض الكنافة النابلسية في المدينة القديمة" },
          { title: "جامعة النجاح تطلق مشروع توثيق التراث الرقمي" },
          { title: "ورشة تدريبية لحرفيي الصابون النابلسي" },
          { title: "اكتشاف أثري جديد في نابلس يعود للعصر الروماني" },
          { title: "مهرجان التراث الفلسطيني يستقطب آلاف الزوار" },
          { title: "إطلاق منصة ذكية للتراث الثقافي الفلسطيني" },
        ]);
      }
    };
    fetchNews();
  }, []);

  const showLiveLocation = (location, description) => {
    alert(
      `📍 موقع مباشر: ${location}\n\n${description}\n\nالمراسلون النشطون: 2\nجودة الإشارة: ممتازة\nعدد المشاهدين: 15,420\n\nهل تريد مشاهدة البث المباشر؟`
    );
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="container mx-auto px-6">
        {/* العنوان مع تبديل اللوجو والبانر */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <img src="/banner.png" alt="البانر" className="w-12 h-12 ml-4" />
          لوحة المعلومات المباشرة
          <img src="/logo.png" alt="اللوجو" className="w-12 h-12 mr-4" />
        </h2>

        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Chat */}
            <div className="bg-white rounded-lg shadow-lg p-4 ai-glow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="ml-2">🤖</span> المساعد الذكي
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 h-64 overflow-y-auto mb-3">
                {aiMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`inline-block px-3 py-2 rounded max-w-xs ${
                        msg.isUser
                          ? "bg-gray-600 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendAIMessage()}
                  placeholder="اسأل عن الأخبار..."
                  className="flex-1 border rounded-r-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendAIMessage}
                  className="bg-blue-500 text-white px-3 py-1 rounded-l-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  إرسال
                </button>
              </div>
            </div>

            {/* Live Map */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="ml-2">📍</span> الخريطة الحية
              </h3>
              <MapContainer
                center={[31.95, 35.93]}
                zoom={8}
                className="rounded-lg h-48"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[31.7767, 35.2345]}
                  eventHandlers={{
                    click: () =>
                      showLiveLocation(
                        "المسجد الأقصى",
                        "بث مباشر من القدس الشريف"
                      ),
                  }}
                />
                <Marker
                  position={[32.2226, 35.2622]}
                  eventHandlers={{
                    click: () =>
                      showLiveLocation(
                        "نابلس",
                        "تغطية مباشرة من موقع الاكتشاف الأثري"
                      ),
                  }}
                />
                <Marker
                  position={[32.2211, 35.2544]}
                  eventHandlers={{
                    click: () => showLiveLocation("جبل جرزيم", "مراسل ميداني"),
                  }}
                />
              </MapContainer>
            </div>

            {/* News Ticker */}
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="ml-2">📰</span> الأخبار المتحركة
              </h3>
              <div className="overflow-hidden whitespace-nowrap relative">
                <div className="ticker-container">
                  <div className="ticker-content">
                    {news.length > 0 ? (
                      news.map((n, idx) => (
                        <span
                          key={idx}
                          className="mx-4 text-sm text-gray-800 font-medium inline-block"
                        >
                          {n.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">
                        جاري تحميل الأخبار...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
