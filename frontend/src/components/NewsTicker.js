import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsTicker = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/breaking-news/"
        );
        setBreakingNews(response.data);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
        // Fallback data
        setBreakingNews([
          {
            id: 1,
            title:
              "اكتشاف أثري مهم في البلدة القديمة بنابلس يكشف عن حضارة عمرها 2000 عام",
          },
          {
            id: 2,
            title:
              "مهرجان نابلس للتراث يستقطب 50 ألف زائر من جميع أنحاء فلسطين",
          },
          {
            id: 3,
            title:
              "ترميم المسجد الكبير في نابلس يدخل مرحلته النهائية بتقنيات حديثة",
          },
        ]);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="breaking-news text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-white text-red-600 px-3 py-1 font-bold text-sm ml-4 pulse-live">
          عاجل
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="ticker-scroll">
            {breakingNews.map((news, index) => (
              <span key={news.id} className="mx-8">
                🔴 {news.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
