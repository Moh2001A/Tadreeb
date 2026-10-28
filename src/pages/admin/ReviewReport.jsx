import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Bell,
  Menu,
  ChevronLeft,
  ArrowRight,
  Check,
  Pencil,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

export default function ReviewReport() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [checks, setChecks] = useState({
    achievements: true,
    documentation: true,
    deadline: true,
  });

  const [note, setNote] =
    useState("");

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-student-sidebar")
    );
  };

  const toggleCheck = (name) => {
    setChecks((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const approve = () => {
    console.log({
      reportId: id,
      approved: true,
      note,
    });

    navigate("/admin/reports");
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
                مراجعة التقرير
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
                  مراجعة التقرير
                </h1>

                <p
                  className="
                    m-0
                    mt-1
                    text-[12px]
                    text-[#64748B]
                  "
                >
                  تقرير الأسبوع 3 - أمل أحمد
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/reports/${id}`
                  )
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
                  flex
                  items-center
                  gap-4
                "
              >
                <Step
                  number="✓"
                  label="استلام التقرير"
                  active
                  completed
                />

                <div
                  className="
                    h-[2px]
                    flex-1
                    bg-[#16A34A]
                  "
                />

                <Step
                  number="2"
                  label="مراجعة المشرف"
                  active
                />

                <div
                  className="
                    h-[2px]
                    flex-1
                    bg-[#DCE4F0]
                  "
                />

                <Step
                  number="3"
                  label="القرار"
                />
              </div>
            </section>

            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1.65fr)_400px]
              "
            >
              {/* REPORT */}

              <section
                className="
                  min-h-[430px]
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
                  التقرير
                </h2>

                <div
                  className="
                    mt-2
                    rounded-[10px]
                    border
                    border-[#E0E7F2]
                    p-6
                  "
                >
                  <h3
                    className="
                      m-0
                      text-[14px]
                      font-bold
                    "
                  >
                    ملخص التقرير
                  </h3>

                  <p
                    className="
                      m-0
                      mt-4
                      text-[12px]
                      leading-7
                      text-[#64748B]
                    "
                  >
                    بناء واجهات الويب لنظام العملاء،
                    مراجعة الكود، توثيق المكونات.
                  </p>
                </div>
              </section>

              {/* CHECKLIST */}

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
                  قائمة المراجعة
                </h2>

                <div className="mt-4 space-y-4">
                  <CheckItem
                    checked={checks.achievements}
                    onChange={() =>
                      toggleCheck("achievements")
                    }
                    label="المخرجات واضحة ومكتملة"
                  />

                  <CheckItem
                    checked={checks.documentation}
                    onChange={() =>
                      toggleCheck("documentation")
                    }
                    label="التوثيق مناسب"
                  />

                  <CheckItem
                    checked={checks.deadline}
                    onChange={() =>
                      toggleCheck("deadline")
                    }
                    label="الالتزام بالموعد"
                  />
                </div>

                <label
                  className="
                    mt-5
                    block
                    text-[11px]
                    font-medium
                  "
                >
                  ملاحظات المشرف
                </label>

                <textarea
                  rows={5}
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  placeholder="اكتب ملاحظاتك..."
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                    p-3
                    text-[12px]
                    outline-none
                    focus:border-[#09379A]
                  "
                />

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
                    onClick={() =>
                      navigate(
                        `/admin/reports/${id}`
                      )
                    }
                    className="
                      flex
                      h-[44px]
                      items-center
                      gap-2
                      rounded-[8px]
                      border
                      border-[#E0E7F2]
                      px-4
                      text-[11px]
                    "
                  >
                    <Pencil size={15} />
                    طلب تعديل
                  </button>

                  <button
                    type="button"
                    onClick={approve}
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
                    <Check size={15} />
                    اعتماد
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

/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  label,
  active = false,
  completed = false,
}) {
  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-3
      "
    >
      <div
        className={`
          flex
          h-[32px]
          w-[32px]
          items-center
          justify-center
          rounded-full
          border
          text-[11px]
          font-bold

          ${
            completed
              ? `
                  border-[#15803D]
                  bg-[#15803D]
                  text-white
                `
              : active
              ? `
                  border-[#09379A]
                  bg-[#09379A]
                  text-white
                `
              : `
                  border-[#DCE4F0]
                  bg-white
                  text-[#64748B]
                `
          }
        `}
      >
        {number}
      </div>

      <span
        className={`
          text-[11px]
          font-semibold

          ${
            completed
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

/* =========================================================
   CHECK ITEM
========================================================= */

function CheckItem({
  checked,
  onChange,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="
        flex
        w-full
        items-center
        gap-3
        text-right
        text-[11px]
        text-[#334155]
      "
    >
      <span
        className={`
          flex
          h-[20px]
          w-[20px]
          items-center
          justify-center
          rounded-[4px]

          ${
            checked
              ? `
                  bg-[#09379A]
                  text-white
                `
              : `
                  border
                  border-[#CBD5E1]
                  bg-white
                `
          }
        `}
      >
        {checked && (
          <Check size={13} />
        )}
      </span>

      {label}
    </button>
  );
}

function Footer() {
  return (
    <footer
      className="
        mt-[230px]
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
          دليل بوابة التدريب الميداني
        </span>
      </div>
    </footer>
  );
}