import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState("political");
  const [stats, setStats] = useState({});
  const countersAnimated = useRef(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/dashboard-stats/"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback data
        setStats({
          political_decisions: 73,
          violations_documented: 156,
          public_rejection: 89,
          youth_percentage: 67,
          unemployment_rate: 34,
          community_initiatives: 89,
          tourism_revenue: "2.3M",
          new_jobs: 1247,
          ecommerce_growth: 67,
        });
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!countersAnimated.current && Object.keys(stats).length > 0) {
      animateCounters();
      countersAnimated.current = true;
    }
  }, [stats]);

  const animateCounters = () => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;

          // Format numbers with commas for large numbers
          if (target >= 1000000) {
            counter.textContent = (current / 1000000).toFixed(1) + "M";
          } else if (target >= 1000) {
            counter.textContent = (current / 1000).toFixed(0) + "K";
          } else {
            counter.textContent = Math.floor(current);
          }

          requestAnimationFrame(updateCounter);
        } else {
          // Final formatting
          if (target >= 1000000) {
            counter.textContent = (target / 1000000).toFixed(1) + "M";
          } else if (target >= 1000) {
            counter.textContent = (target / 1000).toFixed(0) + "K";
          } else {
            counter.textContent = target;
          }
        }
      };

      updateCounter();
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "political":
        return (
          <div id="analysis-political" className="analysis-content">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
                <div
                  className="text-xl font-bold counter"
                  data-target={stats.political_decisions || 73}
                >
                  {stats.political_decisions || 73}
                </div>
                <div className="text-sm opacity-90">قرار سياسي هذا الشهر</div>
                <div className="text-xs mt-1">📈 تأثير مباشر على نابلس</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
                <div
                  className="text-xl font-bold counter"
                  data-target={stats.violations_documented || 156}
                >
                  {stats.violations_documented || 156}
                </div>
                <div className="text-sm opacity-90">انتهاك موثق</div>
                <div className="text-xs mt-1">⚠️ في الضفة الغربية</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
                <div
                  className="text-xl font-bold counter"
                  data-target={stats.public_rejection || 89}
                >
                  {stats.public_rejection || 89}%
                </div>
                <div className="text-sm opacity-90">رفض شعبي</div>
                <div className="text-xs mt-1">📊 للسياسات الاحتلالية</div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-r-4 border-red-500">
              <h3 className="font-bold text-red-800 mb-3 flex items-center">
                <span className="ml-2">🚨</span>
                تحليل سياسي عاجل
              </h3>
              <p className="text-red-700 text-sm mb-3">
                تشير التحليلات إلى تصاعد السياسات الاستيطانية في محيط نابلس، مع
                رصد 12 مخططاً استيطانياً جديداً يهدد الأراضي الزراعية والمواقع
                الأثرية. الذكاء الاصطناعي يحلل تأثير هذه السياسات على الاقتصاد
                المحلي والتراث الثقافي.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-600">
                  آخر تحديث: منذ 15 دقيقة
                </span>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                  التقرير كاملاً
                </button>
              </div>
            </div>
          </div>
        );
      // باقي المحتويات تبقى كما هي...
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="ml-3 text-3xl">🔍</span>
              مركز التحليلات المتخصصة
            </h2>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse ai-glow bg-red-600 text-white px-3 py-1 rounded-lg ml-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full pulse-live"></div>
                <span className="text-sm">تحليل مستمر</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-green-600 text-white px-3 py-1 rounded-lg">
                <span className="text-sm">🛡️ موثق</span>
              </div>
            </div>
          </div>

          {/* Analysis Categories Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab("political")}
              className={`analysis-tab px-4 py-2 rounded-t-lg ${
                activeTab === "political"
                  ? "bg-red-100 text-red-800 border-b-2 border-red-500 font-bold"
                  : "hover:bg-red-100 text-red-800"
              }`}
            >
              🏛️ سياسي
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`analysis-tab px-4 py-2 rounded-t-lg ${
                activeTab === "social"
                  ? "bg-blue-100 text-blue-800 border-b-2 border-blue-500 font-bold"
                  : "hover:bg-blue-100 text-blue-800"
              }`}
            >
              👥 اجتماعي
            </button>
            <button
              onClick={() => setActiveTab("cultural")}
              className={`analysis-tab px-4 py-2 rounded-t-lg ${
                activeTab === "cultural"
                  ? "bg-purple-100 text-purple-800 border-b-2 border-purple-500 font-bold"
                  : "hover:bg-purple-100 text-purple-800"
              }`}
            >
              🎭 ثقافي
            </button>
            <button
              onClick={() => setActiveTab("economic")}
              className={`analysis-tab px-4 py-2 rounded-t-lg ${
                activeTab === "economic"
                  ? "bg-green-100 text-green-800 border-b-2 border-green-500 font-bold"
                  : "hover:bg-green-100 text-green-800"
              }`}
            >
              💼 اقتصادي
            </button>
            <button
              onClick={() => setActiveTab("occupation")}
              className={`analysis-tab px-4 py-2 rounded-t-lg ${
                activeTab === "occupation"
                  ? "bg-orange-100 text-orange-800 border-b-2 border-orange-500 font-bold"
                  : "hover:bg-orange-100 text-orange-800"
              }`}
            >
              ⚠️ معيقات الاحتلال
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default AnalysisDashboard;
