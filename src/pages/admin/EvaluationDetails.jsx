import { useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  ChevronLeft,
  ArrowRight,
  Printer,
  Star,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

const CRITERIA = [
  {
    title: "المهارات الفنية والتطبيقية",
    score: 4,
  },
  {
    title: "الالتزام والانضباط",
    score: 5,
  },
  {
    title: "التواصل والعمل الجماعي",
    score: 4,
  },
  {
    title: "الابتكار وحل المشكلات",
    score: 4,
  },
];

export default function EvaluationDetails() {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-student-sidebar")
    );
  };

  const handlePrint = () => {
    window.print();
  };

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
            z-30
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
              type="button"
              onClick={toggleSidebar}
              className="
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                rounded-[8px]
                text-[#09379A]
                hover:bg-[#F1F5F9]
                lg:hidden
              "
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/announcements")
              }
              className="
                relative
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                rounded-[8px]
                text-[#111C2D]
                hover:bg-[#F8FAFC]
              "
            >
              <Bell size={20} />

              <span
                className="
                  absolute
                  right-[6px]
                  top-[5px]
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[#FF6B35]
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
            min-w-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            px-4
            pb-7
            pt-5
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto w-full max-w-[1450px]">
            {/* BREADCRUMB */}

            <div
              className="
                mb-8
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

              <span className="font-bold text-[#111C2D]">
                تفاصيل التقييم
              </span>
            </div>

            {/* TITLE */}

            <section
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div>
                <h1
                  className="
                    m-0
                    text-[25px]
                    font-bold
                    text-[#111C2D]
                    sm:text-[28px]
                  "
                >
                  تفاصيل التقييم
                </h1>

                <p className="m-0 mt-1 text-[13px] text-[#64748B]">
                  أمل أحمد صيام - شركة القدس للاتصالات
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/evaluations")
                  }
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    px-4
                    text-[11px]
                  "
                >
                  <ArrowRight size={16} />
                  التقييمات
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    px-4
                    text-[11px]
                  "
                >
                  <Printer size={16} />
                  طباعة
                </button>
              </div>
            </section>

            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                xl:grid-cols-[minmax(0,1.65fr)_400px]
              "
            >
              {/* RIGHT */}

              <div className="space-y-5">
                <section
                  className="
                    rounded-[12px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    p-6
                  "
                >
                  <h2
                    className="
                      m-0
                      border-b
                      border-[#E6EBF5]
                      pb-4
                      text-[17px]
                      font-bold
                      text-[#062569]
                    "
                  >
                    معايير تقييم المشرف الميداني
                  </h2>

                  <div>
                    {CRITERIA.map((item) => (
                      <div
                        key={item.title}
                        className="
                          flex
                          min-h-[56px]
                          items-center
                          justify-between
                          gap-4
                          border-b
                          border-[#E6EBF5]
                          last:border-b-0
                        "
                      >
                        <span className="text-[12px] font-bold">
                          {item.title}
                        </span>

                        <RatingStars score={item.score} />
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className="
                    rounded-[12px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    p-6
                  "
                >
                  <h2
                    className="
                      m-0
                      border-b
                      border-[#E6EBF5]
                      pb-4
                      text-[17px]
                      font-bold
                      text-[#062569]
                    "
                  >
                    ملاحظات المشرف الميداني
                  </h2>

                  <p
                    className="
                      m-0
                      pt-4
                      text-[12px]
                      leading-7
                      text-[#64748B]
                    "
                  >
                    أظهرت الطالبة مهارات جيدة في بناء الواجهات
                    والتزاماً تاماً بساعات الدوام.
                  </p>
                </section>
              </div>

              {/* LEFT */}

              <div className="space-y-5">
                <section
                  className="
                    rounded-[12px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    p-6
                    text-center
                  "
                >
                  <h2
                    className="
                      m-0
                      border-b
                      border-[#E6EBF5]
                      pb-4
                      text-[17px]
                      font-bold
                      text-[#062569]
                    "
                  >
                    الدرجة النهائية
                  </h2>

                  <div
                    className="
                      mt-4
                      text-[44px]
                      font-bold
                      leading-none
                      text-[#062569]
                    "
                  >
                    4.25
                  </div>

                  <p className="mt-2 text-[10px] text-[#64748B]">
                    من 5 - الدرجة النهائية
                  </p>

                  <span
                    className="
                      mt-2
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#DCFCE7]
                      px-3
                      py-1
                      text-[10px]
                      font-semibold
                      text-[#15803D]
                    "
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-current" />
                    مكتمل
                  </span>
                </section>

                <section
                  className="
                    rounded-[12px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    p-6
                  "
                >
                  <h2
                    className="
                      m-0
                      border-b
                      border-[#E6EBF5]
                      pb-4
                      text-[17px]
                      font-bold
                      text-[#062569]
                    "
                  >
                    الدرجات
                  </h2>

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-6
                    "
                  >
                    <ScoreItem
                      label="المشرف الميداني"
                      value="4.0 من 5"
                    />

                    <ScoreItem
                      label="المشرف الأكاديمي"
                      value="4.5 من 5"
                    />
                  </div>
                </section>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function RatingStars({ score }) {
  return (
    <div
      dir="ltr"
      className="flex items-center gap-[2px]"
    >
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          key={number}
          size={17}
          fill={
            number <= score
              ? "#F59E0B"
              : "transparent"
          }
          className="text-[#F59E0B]"
        />
      ))}
    </div>
  );
}

function ScoreItem({ label, value }) {
  return (
    <div>
      <p className="m-0 text-[10px] text-[#64748B]">
        {label}
      </p>

      <strong
        className="
          mt-2
          block
          text-[12px]
          text-[#111C2D]
        "
      >
        {value}
      </strong>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="
        mt-[250px]
        flex
        flex-col
        gap-3
        pb-2
        text-[11px]
        text-[#64748B]
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <p className="m-0">
        جميع الحقوق محفوظة © 2025 كلية الدراسات المتوسطة - جامعة الأزهر - غزة
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[#09379A]">
          الدعم الفني والأكاديمي
        </span>
        <span>•</span>
        <span className="text-[#09379A]">
          دليل الطالب للتدريب الميداني
        </span>
      </div>
    </footer>
  );
}