import { useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  BadgeCheck,
  Check,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

export default function FinalEvaluationReview() {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-student-sidebar")
    );
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
                  top-[6px]
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
                التقييم النهائي
              </span>
            </div>

            {/* TITLE */}

            <section
              className="
                mb-6
                flex
                items-start
                justify-between
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
                  مراجعة التقييم النهائي
                </h1>

                <p className="m-0 mt-1 text-[13px] text-[#64748B]">
                  أمل أحمد صيام - 20231234
                </p>
              </div>

              <button
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
                  px-5
                  text-[11px]
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
                px-6
                py-5
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  md:grid-cols-4
                "
              >
                <Step
                  title="تقييم الجهة"
                  state="done"
                />

                <Step
                  title="تقييم المشرف"
                  state="done"
                />

                <Step
                  title="المراجعة النهائية"
                  state="active"
                  number="3"
                />

                <Step
                  title="الاعتماد"
                  state="pending"
                  number="4"
                />
              </div>
            </section>

            {/* CONTENT */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                xl:grid-cols-[minmax(0,1.65fr)_400px]
              "
            >
              {/* TABLE */}

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
                  مكونات الدرجة النهائية
                </h2>

                <div
                  className="
                    mt-3
                    overflow-hidden
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                  "
                >
                  <table
                    className="
                      w-full
                      min-w-[600px]
                      border-collapse
                      text-right
                    "
                  >
                    <thead>
                      <tr
                        className="
                          bg-[#F1F5F9]
                          text-[10px]
                          text-[#64748B]
                        "
                      >
                        <th className="px-4 py-4">
                          العنصر
                        </th>
                        <th className="px-4 py-4">
                          الدرجة
                        </th>
                        <th className="px-4 py-4">
                          المقيم
                        </th>
                        <th className="px-4 py-4">
                          الحالة
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <GradeRow
                        title="تقييم المشرف الميداني"
                        grade="4.0 من 5"
                        evaluator="م. خالد عودة"
                        status="مكتمل"
                        green
                      />

                      <GradeRow
                        title="تقييم المشرف الأكاديمي"
                        grade="4.5 من 5"
                        evaluator="د. سامر يوسف"
                        status="مكتمل"
                        green
                      />

                      <GradeRow
                        title="الحضور والالتزام"
                        grade="92%"
                        evaluator="النظام"
                        status="محتسب"
                      />
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SCORE */}

              <section
                className="
                  h-fit
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
                  الدرجة النهائية
                </h2>

                <div className="mt-4 text-center">
                  <strong
                    className="
                      text-[44px]
                      leading-none
                      text-[#062569]
                    "
                  >
                    4.25
                  </strong>

                  <p className="mt-2 text-[10px] text-[#64748B]">
                    من 5 - ممتاز
                  </p>
                </div>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <button
                    type="button"
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
                    <RotateCcw size={15} />
                    إعادة
                  </button>

                  <button
                    type="button"
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
                      hover:bg-[#E95526]
                    "
                  >
                    <BadgeCheck size={16} />
                    اعتماد الدرجة
                  </button>
                </div>
              </section>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function Step({
  title,
  state,
  number,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex
          h-[32px]
          w-[32px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          text-[11px]
          font-bold

          ${
            state === "done"
              ? `
                  border-[#15803D]
                  bg-[#15803D]
                  text-white
                `
              : state === "active"
              ? `
                  border-[#09379A]
                  bg-[#09379A]
                  text-white
                `
              : `
                  border-[#D7E0EC]
                  bg-white
                  text-[#64748B]
                `
          }
        `}
      >
        {state === "done" ? (
          <Check size={15} />
        ) : (
          number
        )}
      </div>

      <span
        className={`
          text-[11px]
          font-semibold

          ${
            state === "done"
              ? "text-[#15803D]"
              : state === "active"
              ? "text-[#09379A]"
              : "text-[#64748B]"
          }
        `}
      >
        {title}
      </span>
    </div>
  );
}

function GradeRow({
  title,
  grade,
  evaluator,
  status,
  green = false,
}) {
  return (
    <tr
      className="
        border-t
        border-[#E6EBF5]
        text-[11px]
      "
    >
      <td className="px-4 py-5 font-medium">
        {title}
      </td>

      <td className="px-4 py-5">
        {grade}
      </td>

      <td className="px-4 py-5">
        {evaluator}
      </td>

      <td className="px-4 py-5">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1
            text-[9px]
            font-semibold

            ${
              green
                ? `
                    bg-[#DCFCE7]
                    text-[#15803D]
                  `
                : `
                    bg-[#DDF6FF]
                    text-[#08759B]
                  `
            }
          `}
        >
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
          {status}
        </span>
      </td>
    </tr>
  );
}

function Footer() {
  return (
    <footer
      className="
        mt-[300px]
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

      <div className="flex gap-3">
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