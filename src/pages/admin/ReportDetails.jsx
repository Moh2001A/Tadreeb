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
  Send,
  X,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   SAMPLE REPORT
========================================================= */

const REPORT = {
  id: 1,
  student: "أمل أحمد",
  type: "أسبوعي - 3",
  date: "2025/12/22",
  status: "بانتظار المراجعة",

  title:
    "تقرير الأسبوع 3 - تطوير واجهات الويب",

  description:
    "خلال هذا الأسبوع عملت على بناء واجهات المستخدم لنظام إدارة العملاء باستخدام HTML وCSS وJavaScript، وشاركت في اجتماع مراجعة الكود مع فريق التطوير.",

  achievements: [
    "تنفيذ 4 صفحات متجاوبة.",
    "معالجة 6 ملاحظات على واجهة تسجيل الدخول.",
    "توثيق المكونات المستخدمة.",
  ],

  challenges:
    "التعامل مع اتجاه RTL في الجداول، وتم حلها بالتنسيق مع المشرف الميداني.",
};

/* =========================================================
   PAGE
========================================================= */

export default function ReportDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showRevisionModal, setShowRevisionModal] =
    useState(false);

  const [revisionNote, setRevisionNote] =
    useState("");

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-student-sidebar")
    );
  };

  const submitRevision = (event) => {
    event.preventDefault();

    if (!revisionNote.trim()) {
      return;
    }

    console.log({
      reportId: id,
      revisionNote,
    });

    setShowRevisionModal(false);
    setRevisionNote("");
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
        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className="
            z-30

            flex
            h-[72px]
            w-full
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

        {/* =================================================
            CONTENT
        ================================================== */}

        <main
          className="
            w-full
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
                type="button"
                onClick={() =>
                  navigate("/admin/dashboard")
                }
              >
                الرئيسية
              </button>

              <ChevronLeft size={15} />

              <span
                className="
                  font-semibold
                  text-[#111C2D]
                "
              >
                تفاصيل التقرير
              </span>
            </div>

            {/* PAGE HEADER */}

            <section
              className="
                mb-7
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-start
                lg:justify-between
              "
            >
              <div>
                <h1
                  className="
                    m-0
                    text-[27px]
                    font-bold
                    leading-10
                    text-[#111C2D]
                  "
                >
                  تفاصيل التقرير
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

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/reports")
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
                    font-semibold
                  "
                >
                  <ArrowRight size={16} />
                  التقارير
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowRevisionModal(true)
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
                    font-semibold
                  "
                >
                  <Pencil size={16} />
                  طلب تعديل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/reports/${id}/review`
                    )
                  }
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    rounded-[8px]
                    bg-[#09379A]
                    px-5
                    text-[11px]
                    font-semibold
                    text-white
                    hover:bg-[#072E81]
                  "
                >
                  <Check size={16} />
                  اعتماد التقرير
                </button>
              </div>
            </section>

            {/* =================================================
                GRID
            ================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1.65fr)_400px]
              "
            >
              {/* CONTENT */}

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
                  محتوى التقرير
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
                      text-[15px]
                      font-bold
                      text-[#111C2D]
                    "
                  >
                    {REPORT.title}
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
                    {REPORT.description}
                  </p>

                  <h4
                    className="
                      m-0
                      mt-5
                      text-[13px]
                      font-bold
                    "
                  >
                    المنجزات
                  </h4>

                  <ul
                    className="
                      mt-3
                      list-disc
                      space-y-2
                      pr-5
                      text-[12px]
                      text-[#475569]
                    "
                  >
                    {REPORT.achievements.map(
                      (item) => (
                        <li key={item}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>

                  <h4
                    className="
                      m-0
                      mt-5
                      text-[13px]
                      font-bold
                    "
                  >
                    التحديات
                  </h4>

                  <p
                    className="
                      m-0
                      mt-3
                      text-[12px]
                      leading-7
                      text-[#475569]
                    "
                  >
                    {REPORT.challenges}
                  </p>
                </div>
              </section>

              {/* LEFT COLUMN */}

              <div
                className="
                  flex
                  flex-col
                  gap-6
                "
              >
                {/* REPORT INFO */}

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
                    معلومات التقرير
                  </h2>

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-x-8
                      gap-y-5
                    "
                  >
                    <InfoItem
                      label="الطالب"
                      value={REPORT.student}
                    />

                    <InfoItem
                      label="نوع التقرير"
                      value={REPORT.type}
                    />

                    <InfoItem
                      label="تاريخ الإرسال"
                      value={REPORT.date}
                    />

                    <InfoItem
                      label="الحالة"
                      value={REPORT.status}
                    />
                  </div>
                </section>

                {/* REVIEW */}

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
                    المراجعة
                  </h2>

                  <label
                    className="
                      mt-4
                      block
                      text-[11px]
                      font-medium
                      text-[#334155]
                    "
                  >
                    ملاحظات المشرف
                  </label>

                  <textarea
                    rows={5}
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
                      leading-6
                      outline-none
                      focus:border-[#09379A]
                      focus:ring-2
                      focus:ring-[#09379A]/10
                    "
                  />
                </section>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>

      {/* =====================================================
          REQUEST REVISION MODAL
      ====================================================== */}

      {showRevisionModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#0F172A]/50
            px-4
          "
        >
          <form
            onSubmit={submitRevision}
            className="
              w-full
              max-w-[520px]
              rounded-[14px]
              bg-white
              p-7
              shadow-2xl
            "
          >
            <div
              className="
                flex
                h-[56px]
                w-[56px]
                items-center
                justify-center
                rounded-full
                bg-[#FFE5D9]
                text-[#B54708]
              "
            >
              <Pencil size={25} />
            </div>

            <h2
              className="
                m-0
                mt-5
                text-[21px]
                font-bold
                text-[#111C2D]
              "
            >
              طلب تعديل على التقرير
            </h2>

            <p
              className="
                m-0
                mt-2
                text-[12px]
                leading-6
                text-[#64748B]
              "
            >
              سيعاد التقرير إلى الطالبة أمل أحمد مع
              ملاحظاتك لإجراء التعديلات المطلوبة.
            </p>

            <label
              className="
                mt-5
                block
                text-[11px]
                font-semibold
                text-[#334155]
              "
            >
              ما المطلوب تعديله؟
            </label>

            <textarea
              required
              rows={5}
              value={revisionNote}
              onChange={(event) =>
                setRevisionNote(
                  event.target.value
                )
              }
              placeholder="أضف المخرجات بشكل أوضح..."
              className="
                mt-2
                w-full
                resize-none
                rounded-[8px]
                border
                border-[#E0E7F2]
                p-3
                text-[12px]
                leading-6
                outline-none
                focus:border-[#09379A]
                focus:ring-2
                focus:ring-[#09379A]/10
              "
            />

            <div
              className="
                mt-5
                flex
                items-center
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowRevisionModal(false)
                }
                className="
                  h-[44px]
                  rounded-[8px]
                  border
                  border-[#E0E7F2]
                  bg-white
                  px-5
                  text-[11px]
                  font-semibold
                "
              >
                إلغاء
              </button>

              <button
                type="submit"
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
                <Send size={16} />
                إرسال طلب التعديل
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function InfoItem({
  label,
  value,
}) {
  return (
    <div>
      <p
        className="
          m-0
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          m-0
          mt-1
          text-[12px]
          font-semibold
          text-[#111C2D]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer
      className="
        mt-[150px]
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

      <div className="flex flex-wrap items-center gap-3">
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