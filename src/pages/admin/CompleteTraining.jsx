import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Menu,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

export default function CompleteTraining() {
  const navigate = useNavigate();

  const [completed, setCompleted] =
    useState(false);

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-student-sidebar")
    );
  };

  const requirements = [
    "اكتمال 120 ساعة تدريبية",
    "اعتماد التقرير النهائي",
    "اكتمال تقييم الجهة",
    "اكتمال تقييم المشرف الأكاديمي",
  ];

  return (
    <div
      dir="rtl"
      className="
        flex
        h-screen
        w-full
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#111C2D]
      "
    >
      <Sidebar />

      <div
        className="
          flex
          h-screen
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        {/* HEADER */}

        <header
          className="
            flex
            h-[72px]
            shrink-0
            items-center
            justify-between
            border-b
            border-[#E6EBF5]
            bg-white
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                text-[#09379A]
                lg:hidden
              "
            >
              <Menu size={21} />
            </button>

            <button
              onClick={() =>
                navigate("/admin/announcements")
              }
              className="relative p-2"
            >
              <Bell size={20} />

              <span
                className="
                  absolute
                  right-[7px]
                  top-[5px]
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[#FF6534]
                "
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-[44px]
                w-[44px]
                items-center
                justify-center
                rounded-full
                bg-[#E6EBF5]
                text-[12px]
                font-bold
                text-[#09379A]
              "
            >
              سم
            </div>

            <div>
              <p className="m-0 text-[12px] font-bold">
                د. سامر يوسف
              </p>

              <p className="m-0 text-[10px] text-[#64748B]">
                مشرف أكاديمي
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <main
          className="
            flex-1
            overflow-x-hidden
            overflow-y-auto
            px-4
            pb-6
            pt-5
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto w-full max-w-[1450px]">
            <div
              className="
                mb-7
                flex
                items-center
                gap-2
                text-[12px]
                text-[#64748B]
              "
            >
              <button
                onClick={() =>
                  navigate("/admin/dashboard")
                }
              >
                الرئيسية
              </button>

              <ChevronLeft size={15} />

              <span className="font-semibold text-[#111C2D]">
                إنهاء التدريب
              </span>
            </div>

            <section
              className="
                mb-6
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <h1
                  className="
                    m-0
                    text-[26px]
                    font-bold
                  "
                >
                  إنهاء التدريب
                </h1>

                <p className="m-0 mt-1 text-[12px] text-[#64748B]">
                  استكمال متطلبات إنهاء تدريب الطالب
                </p>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="
                  flex
                  h-[44px]
                  items-center
                  gap-2
                  rounded-[8px]
                  border
                  border-[#E0E7F2]
                  bg-white
                  px-5
                  text-[12px]
                "
              >
                <ArrowRight size={16} />
                رجوع
              </button>
            </section>

            {/* STEPS */}

            <section
              className="
                mb-6
                rounded-[12px]
                border
                border-[#E0E7F2]
                bg-white
                px-5
                py-5
              "
            >
              <div className="grid gap-5 md:grid-cols-4">
                <SimpleStep
                  label="تقرير نهائي"
                  done
                />

                <SimpleStep
                  label="التقييم"
                  done
                />

                <SimpleStep
                  label="مراجعة المشرف"
                  active
                  number="3"
                />

                <SimpleStep
                  label="إنهاء التدريب"
                  number="4"
                />
              </div>
            </section>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                xl:grid-cols-[minmax(0,1.7fr)_400px]
              "
            >
              {/* REQUIREMENTS */}

              <section
                className="
                  rounded-[12px]
                  border
                  border-[#E0E7F2]
                  bg-white
                  p-5
                "
              >
                <h2
                  className="
                    m-0
                    border-b
                    border-[#E6EBF5]
                    pb-4
                    text-[16px]
                    font-bold
                    text-[#062569]
                  "
                >
                  متطلبات الإنهاء
                </h2>

                <div className="mt-4 space-y-3">
                  {requirements.map((item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-center
                        gap-2
                        text-[11px]
                      "
                    >
                      <CheckCircle2
                        size={17}
                        className="text-[#15803D]"
                      />

                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* ACTION */}

              <section
                className="
                  rounded-[12px]
                  border
                  border-[#E0E7F2]
                  bg-white
                  p-5
                "
              >
                <h2
                  className="
                    m-0
                    border-b
                    border-[#E6EBF5]
                    pb-4
                    text-[16px]
                    font-bold
                    text-[#062569]
                  "
                >
                  الإنهاء
                </h2>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-4
                    rounded-[10px]
                    border
                    border-[#BED0FF]
                    bg-[#EEF4FF]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      h-[56px]
                      w-[56px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#09379A]
                      text-white
                    "
                  >
                    <GraduationCap size={25} />
                  </div>

                  <div>
                    <p className="m-0 text-[13px] font-bold">
                      جاهز لإنهاء التدريب
                    </p>

                    <p className="m-0 mt-1 text-[10px] text-[#64748B]">
                      سيتم إصدار الشهادة بعد التأكيد.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="
                      h-[44px]
                      rounded-[8px]
                      border
                      border-[#E0E7F2]
                      bg-white
                      px-5
                      text-[11px]
                    "
                  >
                    إلغاء
                  </button>

                  <button
                    onClick={() =>
                      setCompleted(true)
                    }
                    className="
                      flex
                      h-[44px]
                      items-center
                      gap-2
                      rounded-[8px]
                      bg-[#FF6534]
                      px-5
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >
                    <CheckCircle2 size={16} />
                    إنهاء التدريب
                  </button>
                </div>

                {completed && (
                  <p
                    className="
                      mt-4
                      rounded-[8px]
                      bg-[#F0FDF4]
                      px-4
                      py-3
                      text-[11px]
                      font-semibold
                      text-[#15803D]
                    "
                  >
                    تم إنهاء التدريب بنجاح وأصبح الطالب جاهزًا لإصدار الشهادة.
                  </p>
                )}
              </section>
            </div>

            <footer
              className="
                mt-[380px]
                flex
                flex-col
                gap-3
                text-[11px]
                text-[#64748B]
                sm:flex-row
                sm:justify-between
              "
            >
              <p>
                جميع الحقوق محفوظة © 2025 كلية الدراسات المتوسطة - جامعة الأزهر - غزة
              </p>

              <div className="flex gap-3">
                <span className="text-[#09379A]">
                  الدعم الفني والأكاديمي
                </span>

                <span>•</span>

                <span className="text-[#09379A]">
                  دليل بوابة التدريب الميداني
                </span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function SimpleStep({
  label,
  number,
  done,
  active,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex
          h-[34px]
          w-[34px]
          items-center
          justify-center
          rounded-full
          border
          text-[11px]
          font-bold

          ${
            done
              ? "border-[#15803D] bg-[#15803D] text-white"
              : active
              ? "border-[#09379A] bg-[#09379A] text-white"
              : "border-[#D7E0EB] bg-white text-[#94A3B8]"
          }
        `}
      >
        {done ? (
          <Check size={16} />
        ) : (
          number
        )}
      </div>

      <span
        className={`
          text-[11px]
          font-semibold

          ${
            done
              ? "text-[#15803D]"
              : active
              ? "text-[#09379A]"
              : "text-[#64748B]"
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}