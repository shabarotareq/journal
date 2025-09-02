import React from "react";

const VRStudio = () => {
  const startVRReporting = () => {
    alert(
      "🎬 بدء تسجيل تقرير VR!\n\nالميزات المتاحة:\n• تسجيل بدقة 4K\n• صوت محيطي ثلاثي الأبعاد\n• تأثيرات بصرية متقدمة\n• تحرير تلقائي بالذكاء الاصطناعي\n\nجاري تحضير الاستوديو الافتراضي..."
    );
  };

  const startARTour = () => {
    alert(
      "🗺️ بدء جولة الواقع المعزز!\n\nالمواقع المتاحة:\n• البلدة القديمة في نابلس\n• المسجد الكبير\n• أسواق نابلس التراثية\n• مصانع الصابون التقليدية\n\nيرجى توجيه الكاميرا نحو الموقع المطلوب..."
    );
  };

  const startVRInterview = () => {
    alert(
      "🎙️ إعداد مقابلة VR!\n\nالبيئات المتاحة:\n• استوديو إخباري كلاسيكي\n• موقع أثري في نابلس\n• مكتبة تراثية\n• ساحة المدينة القديمة\n\nجاري تحميل البيئة الافتراضية..."
    );
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="vr-effect rounded-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🥽</div>
              <h2 className="text-3xl font-bold mb-2">
                استوديو الواقع المعزز والافتراضي
              </h2>
              <p className="text-lg opacity-90">
                تجربة إعلامية تفاعلية ثلاثية الأبعاد
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-3">📹</div>
                <h3 className="font-bold mb-2">تقارير VR</h3>
                <p className="text-sm opacity-90">
                  إنتاج تقارير إخبارية بتقنية الواقع الافتراضي
                </p>
                <button
                  onClick={startVRReporting}
                  className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
                >
                  ابدأ التسجيل
                </button>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="font-bold mb-2">جولات AR</h3>
                <p className="text-sm opacity-90">
                  جولات تفاعلية بالواقع المعزز للمواقع التراثية
                </p>
                <button
                  onClick={startARTour}
                  className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
                >
                  بدء الجولة
                </button>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-3">🎙️</div>
                <h3 className="font-bold mb-2">مقابلات تفاعلية</h3>
                <p className="text-sm opacity-90">
                  إجراء مقابلات في بيئات افتراضية متطورة
                </p>
                <button
                  onClick={startVRInterview}
                  className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
                >
                  إعداد المقابلة
                </button>
              </div>
            </div>

            {/* VR Controls */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold mb-3 flex items-center">
                <span className="ml-2">🎮</span>
                لوحة التحكم VR/AR
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">جودة العرض</label>
                  <select className="w-full bg-white bg-opacity-20 rounded px-3 py-2 text-white">
                    <option>4K Ultra HD</option>
                    <option>Full HD</option>
                    <option>HD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">نوع التجربة</label>
                  <select className="w-full bg-white bg-opacity-20 rounded px-3 py-2 text-white">
                    <option>واقع افتراضي كامل</option>
                    <option>واقع معزز</option>
                    <option>واقع مختلط</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VRStudio;
