import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  FileText,
  Info,
  Plus,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function DailyTrainingLog() {
  const navigate = useNavigate();

  /* =========================================================
     LOGS DATA
  ========================================================= */

  const logs = [
    {
      id: 1,
      day: "الأحد",
      date: "2025/10/05",
      task: "متابعة تركيب الشبكات",
      hours: 6,
      note: "جيد",
      noteType: "good",
    },

    {
      id: 2,
      day: "الإثنين",
      date: "2025/10/06",
      task: "دعم فني للعملاء",
      hours: 5,
      note: "",
      noteType: "none",
    },

    {
      id: 3,
      day: "الثلاثاء",
      date: "2025/10/07",
      task: "تجهيز التقارير",
      hours: 4,
      note: "ممتاز",
      noteType: "excellent",
    },

    {
      id: 4,
      day: "الأربعاء",
      date: "2025/10/08",
      task: "صيانة الأجهزة",
      hours: 5,
      note: "",
      noteType: "none",
    },
  ];

  const totalHours = logs.reduce(
    (total, item) => total + item.hours,
    0
  );

  return (
    <div
      dir="rtl"
      className="
        flex
        h-dvh
        w-full
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div
        className="
          flex
          h-dvh
          min-w-0
          flex-1
          flex-col
          overflow-hidden
          bg-[#F8FAFC]
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative shrink-0">
          <Header />
        </div>

        {/* =====================================================
            SCROLLABLE CONTENT
        ====================================================== */}

        <main
          className="
            min-h-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            bg-[#F8FAFC]

            px-4
            pb-8
            pt-5

            sm:px-5
            sm:pt-6

            md:px-6
            md:pt-7

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[14px]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1080px]
            "
          >
            {/* =================================================
                BREADCRUMB
            ================================================== */}

            <nav
              aria-label="مسار التنقل"
              className="
                flex
                flex-wrap
                items-center
                gap-[7px]
                text-[11px]
                font-medium
                leading-[20px]

                sm:text-[12px]

                xl:text-[13px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate("/student/dashboard")
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  transition

                  hover:text-[#09379A]
                "
              >
                الرئيسية
              </button>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/training-profile"
                  )
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  transition

                  hover:text-[#09379A]
                "
              >
                ملفي التدريبي
              </button>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                السجل التدريبي اليومي
              </span>
            </nav>

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <section
              className="
                mt-[7px]
                flex
                flex-col
                gap-4

                md:flex-row
                md:items-start
                md:justify-between
              "
            >
              {/* TITLE */}

              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-[11px]
                "
              >
                <div
                  className="
                    hidden
                    h-[38px]
                    w-[38px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#EEF3FF]
                    text-[#09379A]

                    sm:flex
                  "
                >
                  <FileText
                    size={19}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <h1
                    className="
                      m-0
                      text-[24px]
                      font-bold
                      leading-[36px]
                      text-[#14213D]

                      sm:text-[26px]

                      xl:text-[28px]
                      xl:leading-[40px]
                    "
                  >
                    السجل التدريبي اليومي
                  </h1>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      max-w-[700px]
                      text-[11px]
                      leading-[21px]
                      text-[#64748B]

                      sm:text-[12px]

                      xl:text-[13px]
                    "
                  >
                    توثيق الأنشطة وساعات التدريب
                    الميداني المعتمدة وفق خطة الفصل
                    الأكاديمي الحالي
                  </p>
                </div>
              </div>

              {/* ADD BUTTON */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/daily-training-log/details"
                  )
                }
                className="
                  flex
                  min-h-[42px]
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  gap-[8px]
                  rounded-[9px]
                  border-0
                  bg-[#09379A]
                  px-[18px]
                  text-[11px]
                  font-bold
                  text-white
                  shadow-[0_4px_12px_rgba(9,55,154,0.16)]
                  transition

                  hover:bg-[#072E81]
                  hover:shadow-[0_6px_16px_rgba(9,55,154,0.20)]

                  active:translate-y-[1px]

                  sm:w-fit
                  sm:text-[12px]
                "
              >
                <Plus
                  size={17}
                  strokeWidth={2.2}
                />

                إضافة سجل جديد
              </button>
            </section>

            {/* =================================================
                TRAINING SUMMARY
            ================================================== */}

            <section
              className="
                mt-5
                flex
                flex-col
                gap-5
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-4
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:p-5

                lg:flex-row
                lg:items-center
                lg:justify-between

                xl:mt-[22px]
                xl:min-h-[105px]
                xl:px-[24px]
                xl:py-[18px]
              "
            >
              {/* ORGANIZATION */}

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-[14px]
                "
              >
                <div
                  className="
                    flex
                    h-[50px]
                    w-[50px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-[#09379A]
                    text-white

                    sm:h-[52px]
                    sm:w-[52px]
                  "
                >
                  <Building2
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-[8px]
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-medium
                        text-[#94A3B8]

                        sm:text-[11px]
                      "
                    >
                      جهة التدريب المعتمدة
                    </span>

                    <span
                      className="
                        inline-flex
                        min-h-[23px]
                        items-center
                        gap-[5px]
                        rounded-full
                        bg-[#E7F8EE]
                        px-[8px]
                        text-[9px]
                        font-bold
                        text-[#10B981]

                        sm:text-[10px]
                      "
                    >
                      <span
                        className="
                          h-[5px]
                          w-[5px]
                          rounded-full
                          bg-[#10B981]
                        "
                      />

                      نشط
                    </span>
                  </div>

                  <h2
                    className="
                      m-0
                      mt-[4px]
                      text-[17px]
                      font-bold
                      leading-[27px]
                      text-[#1E293B]

                      sm:text-[18px]
                    "
                  >
                    شركة القدس للاتصالات
                  </h2>
                </div>
              </div>

              {/* SUMMARY NUMBERS */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  min-[430px]:grid-cols-3

                  lg:flex
                  lg:items-center
                  lg:divide-x
                  lg:divide-x-reverse
                  lg:divide-[#E2E8F0]
                  lg:gap-0
                "
              >
                <SummaryInfo
                  icon={Clock3}
                  label="الساعات المنجزة"
                  value={`${totalHours} ساعة`}
                  sub="/ 120"
                />

                <SummaryInfo
                  icon={CalendarDays}
                  label="التاريخ"
                  value="2025/10/05"
                />

                <SummaryInfo
                  label="الأسبوع"
                  value="الثاني"
                />
              </div>
            </section>

            {/* =================================================
                CURRENT WEEK
            ================================================== */}

            <section
              className="
                mt-6
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-[8px]
                "
              >
                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]

                    sm:text-[18px]

                    xl:text-[19px]
                  "
                >
                  سجلات الأسبوع الحالي
                </h2>

                <span
                  className="
                    inline-flex
                    min-h-[25px]
                    items-center
                    rounded-full
                    bg-[#EEF4FF]
                    px-[9px]
                    text-[9px]
                    font-bold
                    text-[#09379A]

                    sm:text-[10px]
                  "
                >
                  {logs.length} أيام موثقة
                </span>
              </div>

              <span
                className="
                  hidden
                  items-center
                  gap-[6px]
                  text-[10px]
                  text-[#94A3B8]

                  sm:flex
                "
              >
                <Info size={13} />

                يتم اعتماد السجلات أسبوعيًا
              </span>
            </section>

            {/* =================================================
                LOGS
            ================================================== */}

            <section
              className="
                mt-3
                overflow-hidden
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {logs.length > 0 ? (
                <>
                  {/* ===========================================
                      DESKTOP TABLE
                  ============================================ */}

                  <div
                    className="
                      hidden

                      md:block
                    "
                  >
                    {/* HEADER */}

                    <div
                      className="
                        grid
                        grid-cols-[150px_minmax(0,1fr)_120px_110px_80px]
                        gap-[10px]
                        border-b
                        border-[#E2E8F0]
                        bg-[#F8FAFC]
                        px-[18px]
                        py-[13px]
                        text-[10px]
                        font-semibold
                        text-[#64748B]

                        lg:grid-cols-[170px_minmax(0,1fr)_150px_130px_100px]
                        lg:px-[20px]
                      "
                    >
                      <div>اليوم</div>

                      <div>
                        المهام المنجزة
                      </div>

                      <div>المدة</div>

                      <div>
                        الملاحظات
                      </div>

                      <div>الإجراء</div>
                    </div>

                    {/* ROWS */}

                    <div>
                      {logs.map(
                        (log, index) => (
                          <div
                            key={log.id}
                            className={`
                              grid
                              grid-cols-[150px_minmax(0,1fr)_120px_110px_80px]
                              items-center
                              gap-[10px]
                              px-[18px]
                              py-[17px]

                              lg:grid-cols-[170px_minmax(0,1fr)_150px_130px_100px]
                              lg:px-[20px]

                              ${
                                index !==
                                logs.length - 1
                                  ? `
                                    border-b
                                    border-[#EEF2F7]
                                  `
                                  : ""
                              }
                            `}
                          >
                            {/* DAY */}

                            <div
                              className="
                                flex
                                items-center
                                gap-[8px]
                              "
                            >
                              <span
                                className="
                                  h-[7px]
                                  w-[7px]
                                  shrink-0
                                  rounded-full
                                  bg-[#09379A]
                                "
                              />

                              <div>
                                <strong
                                  className="
                                    block
                                    text-[11px]
                                    font-bold
                                    text-[#1E293B]

                                    lg:text-[12px]
                                  "
                                >
                                  {log.day}
                                </strong>

                                <span
                                  dir="ltr"
                                  className="
                                    mt-[2px]
                                    block
                                    text-[9px]
                                    text-[#94A3B8]

                                    lg:text-[10px]
                                  "
                                >
                                  {log.date}
                                </span>
                              </div>
                            </div>

                            {/* TASK */}

                            <div
                              className="
                                min-w-0
                                text-[11px]
                                font-medium
                                leading-[19px]
                                text-[#334155]

                                lg:text-[12px]
                              "
                            >
                              {log.task}
                            </div>

                            {/* HOURS */}

                            <div
                              className="
                                flex
                                items-center
                                gap-[6px]
                                text-[10px]
                                text-[#64748B]

                                lg:text-[11px]
                              "
                            >
                              <Clock3
                                size={14}
                                strokeWidth={1.7}
                                className="shrink-0"
                              />

                              {log.hours} ساعات
                            </div>

                            {/* NOTES */}

                            <div>
                              {log.noteType ===
                                "good" && (
                                <StatusBadge
                                  text="جيد"
                                  type="good"
                                />
                              )}

                              {log.noteType ===
                                "excellent" && (
                                <StatusBadge
                                  text="ممتاز"
                                  type="excellent"
                                />
                              )}

                              {log.noteType ===
                                "none" && (
                                <span
                                  className="
                                    text-[11px]
                                    text-[#94A3B8]
                                  "
                                >
                                  —
                                </span>
                              )}
                            </div>

                            {/* ACTION */}

                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/student/daily-training-log/details?id=${log.id}`
                                  )
                                }
                                className="
                                  border-0
                                  bg-transparent
                                  p-0
                                  text-[10px]
                                  font-bold
                                  text-[#09379A]
                                  transition

                                  hover:text-[#072E81]
                                  hover:underline

                                  lg:text-[11px]
                                "
                              >
                                عرض
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* ===========================================
                      MOBILE CARDS
                  ============================================ */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      bg-[#FAFBFD]
                      p-3

                      md:hidden
                    "
                  >
                    {logs.map((log) => (
                      <article
                        key={log.id}
                        className="
                          rounded-[12px]
                          border
                          border-[#E2E8F0]
                          bg-white
                          p-4
                        "
                      >
                        {/* TOP */}

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              items-start
                              gap-[8px]
                            "
                          >
                            <span
                              className="
                                mt-[6px]
                                h-[7px]
                                w-[7px]
                                shrink-0
                                rounded-full
                                bg-[#09379A]
                              "
                            />

                            <div>
                              <h3
                                className="
                                  m-0
                                  text-[14px]
                                  font-bold
                                  text-[#1E293B]
                                "
                              >
                                {log.day}
                              </h3>

                              <span
                                dir="ltr"
                                className="
                                  mt-[2px]
                                  block
                                  text-[10px]
                                  text-[#94A3B8]
                                "
                              >
                                {log.date}
                              </span>
                            </div>
                          </div>

                          {log.noteType ===
                            "good" && (
                            <StatusBadge
                              text="جيد"
                              type="good"
                            />
                          )}

                          {log.noteType ===
                            "excellent" && (
                            <StatusBadge
                              text="ممتاز"
                              type="excellent"
                            />
                          )}
                        </div>

                        {/* TASK */}

                        <div
                          className="
                            mt-4
                            rounded-[9px]
                            bg-[#F8FAFC]
                            p-3
                          "
                        >
                          <span
                            className="
                              block
                              text-[10px]
                              font-medium
                              text-[#94A3B8]
                            "
                          >
                            المهمة المنجزة
                          </span>

                          <p
                            className="
                              m-0
                              mt-[4px]
                              text-[13px]
                              font-bold
                              leading-[21px]
                              text-[#334155]
                            "
                          >
                            {log.task}
                          </p>
                        </div>

                        {/* BOTTOM */}

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-[6px]
                              text-[11px]
                              text-[#64748B]
                            "
                          >
                            <Clock3
                              size={14}
                              strokeWidth={1.7}
                            />

                            {log.hours} ساعات
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/student/daily-training-log/details?id=${log.id}`
                              )
                            }
                            className="
                              flex
                              h-[34px]
                              items-center
                              gap-[5px]
                              rounded-[7px]
                              border
                              border-[#D7E3F7]
                              bg-[#F5F8FF]
                              px-[10px]
                              text-[10px]
                              font-bold
                              text-[#09379A]
                            "
                          >
                            عرض التفاصيل

                            <ArrowLeft
                              size={12}
                            />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* ===========================================
                      FOOTER
                  ============================================ */}

                  <div
                    className="
                      flex
                      min-h-[52px]
                      flex-col
                      gap-3
                      border-t
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-4
                      py-3

                      sm:flex-row
                      sm:items-center
                      sm:justify-between

                      lg:px-[20px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-[5px]
                        text-[10px]

                        sm:flex-row
                        sm:items-center
                        sm:gap-[18px]

                        lg:text-[11px]
                      "
                    >
                      <span className="text-[#64748B]">
                        مجموع ساعات الأسبوع:

                        <strong
                          className="
                            mr-[5px]
                            text-[#1E293B]
                          "
                        >
                          {totalHours} ساعة
                        </strong>
                      </span>

                      <span
                        className="
                          hidden
                          h-[16px]
                          w-px
                          bg-[#DCE3ED]

                          sm:block
                        "
                      />

                      <span className="text-[#64748B]">
                        حالة التوقيع الميداني:

                        <strong
                          className="
                            mr-[5px]
                            text-[#09379A]
                          "
                        >
                          بانتظار اعتماد المشرف
                        </strong>
                      </span>
                    </div>

                    <span
                      className="
                        text-[9px]
                        text-[#94A3B8]

                        sm:text-[10px]
                      "
                    >
                      تم التحديث تلقائيا: اليوم
                      02:40 م
                    </span>
                  </div>
                </>
              ) : (
                /* =============================================
                   EMPTY STATE
                ============================================== */

                <div
                  className="
                    flex
                    min-h-[280px]
                    flex-col
                    items-center
                    justify-center
                    px-5
                    py-8
                    text-center
                  "
                >
                  <div
                    className="
                      flex
                      h-[52px]
                      w-[52px]
                      items-center
                      justify-center
                      rounded-[12px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                    "
                  >
                    <FileText size={23} />
                  </div>

                  <h3
                    className="
                      m-0
                      mt-4
                      text-[16px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    لا توجد سجلات لهذا الأسبوع
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      max-w-[400px]
                      text-[11px]
                      leading-[20px]
                      text-[#64748B]

                      sm:text-[12px]
                    "
                  >
                    أضف أول سجل تدريبي لبدء
                    توثيق أنشطتك وساعاتك الميدانية.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/daily-training-log/details"
                      )
                    }
                    className="
                      mt-4
                      flex
                      min-h-[38px]
                      items-center
                      gap-[7px]
                      rounded-[8px]
                      border-0
                      bg-[#09379A]
                      px-[15px]
                      text-[10px]
                      font-bold
                      text-white

                      hover:bg-[#072E81]
                    "
                  >
                    <Plus size={14} />

                    إضافة سجل جديد
                  </button>
                </div>
              )}
            </section>

            {/* =================================================
                ACADEMIC GUIDANCE
            ================================================== */}

            <section
              className="
                mt-5
                flex
                items-start
                gap-[11px]
                rounded-[12px]
                border
                border-[#BFD6FF]
                bg-[#EEF4FF]
                px-4
                py-4

                sm:px-[18px]
                sm:py-[15px]

                xl:mt-[24px]
              "
            >
              <div
                className="
                  flex
                  h-[32px]
                  w-[32px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  bg-[#DCE7FA]
                  text-[#09379A]
                "
              >
                <Info size={16} />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    m-0
                    text-[12px]
                    font-bold
                    text-[#09379A]

                    sm:text-[13px]
                  "
                >
                  توجيه أكاديمي هام للطلبة
                </h3>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[10px]
                    leading-[19px]
                    text-[#64748B]

                    sm:text-[11px]
                    sm:leading-[20px]
                  "
                >
                  يرجى توثيق المهام المنجزة يوميا
                  قبل الساعة الخامسة مساءً. يتم
                  إغلاق اعتماد السجلات الأسبوعية
                  بواسطة مشرف المؤسسة ومشرف الكلية
                  كل يوم خميس، وتعتمد الدرجات
                  النهائية بناءً على انتظام توثيق
                  هذه التقارير.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY INFO
========================================================= */

function SummaryInfo({
  icon: Icon,
  label,
  value,
  sub,
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        justify-between
        gap-3
        rounded-[10px]
        bg-[#F8FAFC]
        px-3
        py-3

        min-[430px]:flex-col
        min-[430px]:justify-center
        min-[430px]:text-center

        lg:min-w-[145px]
        lg:rounded-none
        lg:bg-transparent
        lg:px-[20px]
        lg:py-0

        xl:min-w-[150px]
        xl:px-[22px]
      "
    >
      <p
        className="
          m-0
          flex
          items-center
          gap-[5px]
          text-[10px]
          font-medium
          text-[#94A3B8]
        "
      >
        {Icon && (
          <Icon
            size={13}
            strokeWidth={1.7}
          />
        )}

        {label}
      </p>

      <div
        className="
          flex
          items-baseline
          gap-[4px]

          min-[430px]:mt-[5px]
          min-[430px]:justify-center
        "
      >
        <strong
          className="
            text-[14px]
            font-bold
            text-[#1E293B]

            sm:text-[15px]

            xl:text-[16px]
          "
        >
          {value}
        </strong>

        {sub && (
          <span
            className="
              text-[9px]
              text-[#94A3B8]

              sm:text-[10px]
            "
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  text,
  type,
}) {
  const styles = {
    good: {
      wrapper:
        "bg-[#DFF8FE] text-[#0E7490]",
      dot:
        "bg-[#06B6D4]",
    },

    excellent: {
      wrapper:
        "bg-[#EEF4FF] text-[#09379A]",
      dot:
        "bg-[#09379A]",
    },
  };

  const current =
    styles[type] || styles.good;

  return (
    <span
      className={`
        inline-flex
        min-h-[25px]
        items-center
        gap-[6px]
        rounded-full
        px-[9px]
        text-[10px]
        font-bold

        ${current.wrapper}
      `}
    >
      <span
        className={`
          h-[5px]
          w-[5px]
          rounded-full

          ${current.dot}
        `}
      />

      {text}
    </span>
  );
}