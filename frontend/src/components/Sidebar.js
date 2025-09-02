import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: "fa-home",
      label: "الرئيسية",
      path: "/",
      active: location.pathname === "/",
    },
    {
      icon: "fa-flag",
      label: "الواقع الفلسطيني",
      path: "/palestinian-reality",
      badge: "🇵🇸",
    },
    {
      icon: "fa-landmark",
      label: "مشاريع إحياء التراث",
      path: "/heritage-projects",
      badge: "جديد",
    },
    {
      icon: "fa-vr-cardboard",
      label: "غرفة الواقع الافتراضي",
      path: "/vr-room",
    },
    { icon: "fa-robot", label: "مساعد الذكاء الاصطناعي", path: "/ai-helper" },
    { icon: "fa-newspaper", label: "الأخبار والتقارير", path: "/news" },
    {
      icon: "fa-microphone",
      label: "الخدمات الصحفية",
      path: "/press-services",
    },
    { icon: "fa-users", label: "إدارة العاملين", path: "/staff-management" },
    { icon: "fa-chart-line", label: "المالية", path: "/finance" },
    { icon: "fa-archive", label: "المكتبة الإعلامية", path: "/media-library" },
    { icon: "fa-graduation-cap", label: "التدريب والتطوير", path: "/training" },
    { icon: "fa-building", label: "المؤسسات والجهات", path: "/institutions" },
    { icon: "fa-cog", label: "الإعدادات", path: "/settings" },
  ];

  return (
    <aside className="fixed right-0 top-20 h-full w-80 bg-white/90 backdrop-blur-sm shadow-xl border-l-2 border-amber-200 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item flex items-center space-x-3 space-x-reverse p-4 rounded-lg ${
                item.active
                  ? "bg-amber-50 text-amber-800"
                  : "text-gray-700 hover:text-amber-800"
              }`}
            >
              <i
                className={`fas ${item.icon} text-xl ${
                  item.active ? "text-amber-600" : ""
                }`}
              ></i>
              <span className="font-semibold">{item.label}</span>
              {item.badge && (
                <span
                  className={`mr-auto px-2 py-1 rounded-full text-xs ${
                    item.badge === "🇵🇸"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
