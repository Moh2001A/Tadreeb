import { useNavigate } from "react-router-dom";

import {
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
        h-screen
        w-full
        flex
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* =========================================
          SIDEBAR
      ========================================== */}
      <Sidebar />

      {/* =========================================
          MAIN AREA
      ========================================== */}
      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* =========================================
            FIXED HEADER
        ========================================== */}
        <Header />

        {/* =========================================
            SCROLLABLE CONTENT
        ========================================== */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[18px]
            pb-[40px]
          "
        >
          <div
            className="
              w-full
              max-w-[1080px]
              mx-auto
            "
          >
            {/* =====================================
                BREADCRUMB
            ====================================== */}
            <div
              className="
                flex
                items-center
                gap-[7px]
                text-[13px]
                leading-[20px]
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
                  cursor-pointer
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
                  navigate("/student/training-profile")
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
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
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section
              className="
                mt-[6px]
                flex
                items-start
                justify-between
                gap-[20px]
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-[11px]
                "
              >
                <div
                  className="
                    w-[38px]
                    h-[38px]
                    rounded-[8px]
                    bg-[#EEF3FF]
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <FileText
                    size={19}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h1
                    className="
                      m-0
                      text-[28px]
                      leading-[40px]
                      font-bold
                      text-[#14213D]
                    "
                  >
                    السجل التدريبي اليومي
                  </h1>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[13px]
                      leading-[21px]
                      text-[#64748B]
                    "
                  >
                    توثيق الأنشطة وساعات التدريب الميداني
                    المعتمدة وفق خطة الفصل الأكاديمي الحالي
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/daily-training-log/details"
                  )
                }
                className="
                  h-[42px]
                  px-[18px]
                  rounded-[8px]
                  border-0
                  bg-[#FF6B35]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[12px]
                  font-bold
                  cursor-pointer
                  transition
                  hover:bg-[#EA5A28]
                "
              >
                <Plus
                  size={17}
                  strokeWidth={2}
                />

                إضافة سجل جديد
              </button>
            </section>

            {/* =====================================
                TRAINING SUMMARY
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[105px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[24px]
                py-[18px]
                flex
                items-center
                justify-between
                gap-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Organization */}
              <div
                className="
                  flex
                  items-center
                  gap-[14px]
                  min-w-0
                "
              >
                <div
                  className="
                    w-[52px]
                    h-[52px]
                    rounded-[9px]
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Building2
                    size={25}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                      flex-wrap
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        text-[#94A3B8]
                      "
                    >
                      جهة التدريب المعتمدة
                    </span>

                    <span
                      className="
                        h-[22px]
                        px-[8px]
                        rounded-[10px]
                        bg-[#E7F8EE]
                        text-[#10B981]
                        flex
                        items-center
                        gap-[5px]
                        text-[9px]
                        font-bold
                      "
                    >
                      <span
                        className="
                          w-[5px]
                          h-[5px]
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
                      text-[18px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    شركة القدس للاتصالات
                  </h2>
                </div>
              </div>

              {/* Summary Numbers */}
              <div
                className="
                  flex
                  items-center
                  divide-x
                  divide-x-reverse
                  divide-[#E2E8F0]
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

            {/* =====================================
                CURRENT WEEK HEADER
            ====================================== */}
            <section
              className="
                mt-[24px]
                flex
                items-center
                justify-between
                gap-[16px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[8px]
                "
              >
                <h2
                  className="
                    m-0
                    text-[19px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  سجلات الأسبوع الحالي
                </h2>

                <span
                  className="
                    h-[25px]
                    px-[9px]
                    rounded-[12px]
                    bg-[#EEF4FF]
                    text-[#09379A]
                    flex
                    items-center
                    text-[9px]
                    font-bold
                  "
                >
                  {logs.length} أيام موثقة
                </span>
              </div>
            </section>

            {/* =====================================
                LOGS
            ====================================== */}
            <section
              className="
                mt-[12px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                overflow-hidden
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {logs.length > 0 ? (
                <>
                  {/* Header */}
                  <div
                    className="
                      grid
                      grid-cols-[170px_minmax(0,1fr)_150px_130px_100px]
                      bg-[#F8FAFC]
                      border-b
                      border-[#E2E8F0]
                      px-[20px]
                      py-[13px]
                      text-[10px]
                      font-medium
                      text-[#64748B]
                    "
                  >
                    <div>اليوم</div>
                    <div>المهام المنجزة</div>
                    <div>المدة</div>
                    <div>الملاحظات</div>
                    <div>الإجراء</div>
                  </div>

                  {/* Rows */}
                  <div>
                    {logs.map((log, index) => (
                      <div
                        key={log.id}
                        className={`
                          grid
                          grid-cols-[170px_minmax(0,1fr)_150px_130px_100px]
                          items-center
                          gap-[10px]
                          px-[20px]
                          py-[18px]

                          ${
                            index !==
                            logs.length - 1
                              ? "border-b border-[#EEF2F7]"
                              : ""
                          }
                        `}
                      >
                        {/* Day */}
                        <div
                          className="
                            flex
                            items-center
                            gap-[8px]
                          "
                        >
                          <span
                            className="
                              w-[7px]
                              h-[7px]
                              rounded-full
                              bg-[#09379A]
                              shrink-0
                            "
                          />

                          <div>
                            <strong
                              className="
                                block
                                text-[11px]
                                text-[#1E293B]
                              "
                            >
                              {log.day}
                            </strong>

                            <span
                              dir="ltr"
                              className="
                                block
                                mt-[2px]
                                text-[9px]
                                text-[#94A3B8]
                              "
                            >
                              {log.date}
                            </span>
                          </div>
                        </div>

                        {/* Task */}
                        <div
                          className="
                            text-[11px]
                            font-medium
                            text-[#334155]
                          "
                        >
                          {log.task}
                        </div>

                        {/* Hours */}
                        <div
                          className="
                            flex
                            items-center
                            gap-[6px]
                            text-[10px]
                            text-[#64748B]
                          "
                        >
                          <Clock3
                            size={14}
                            strokeWidth={1.7}
                          />

                          {log.hours} ساعات
                        </div>

                        {/* Notes */}
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
                                text-[10px]
                                text-[#94A3B8]
                              "
                            >
                              —
                            </span>
                          )}
                        </div>

                        {/* Action */}
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
                              text-[#09379A]
                              text-[10px]
                              font-bold
                              cursor-pointer
                              hover:underline
                            "
                          >
                            عرض
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="
                      min-h-[46px]
                      bg-[#F8FAFC]
                      border-t
                      border-[#E2E8F0]
                      px-[20px]
                      flex
                      items-center
                      justify-between
                      gap-[20px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[18px]
                        text-[9px]
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
                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      تم التحديث تلقائيا: اليوم 02:40 م
                    </span>
                  </div>
                </>
              ) : (
                /* =================================
                    EMPTY STATE
                ================================== */
                <div
                  className="
                    min-h-[250px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-[24px]
                  "
                >
                  <div
                    className="
                      w-[48px]
                      h-[48px]
                      rounded-[12px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FileText size={22} />
                  </div>

                  <h3
                    className="
                      m-0
                      mt-[12px]
                      text-[15px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    لا توجد سجلات لهذا الأسبوع
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[4px]
                      text-[11px]
                      text-[#64748B]
                    "
                  >
                    أضف أول سجل تدريبي لبدء توثيق
                    أنشطتك وساعاتك الميدانية.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/daily-training-log/details"
                      )
                    }
                    className="
                      mt-[14px]
                      h-[38px]
                      px-[15px]
                      rounded-[8px]
                      border-0
                      bg-[#09379A]
                      text-white
                      flex
                      items-center
                      gap-[7px]
                      text-[10px]
                      font-bold
                      cursor-pointer
                      hover:bg-[#072E81]
                    "
                  >
                    <Plus size={14} />
                    إضافة سجل جديد
                  </button>
                </div>
              )}
            </section>

            {/* =====================================
                ACADEMIC GUIDANCE
            ====================================== */}
            <section
              className="
                mt-[24px]
                min-h-[74px]
                rounded-[12px]
                border
                border-[#BFD6FF]
                bg-[#EEF4FF]
                px-[18px]
                py-[15px]
                flex
                items-start
                gap-[11px]
              "
            >
              <div
                className="
                  w-[32px]
                  h-[32px]
                  shrink-0
                  rounded-[8px]
                  bg-[#DCE7FA]
                  text-[#09379A]
                  flex
                  items-center
                  justify-center
                "
              >
                <Info size={16} />
              </div>

              <div>
                <h3
                  className="
                    m-0
                    text-[12px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  توجيه أكاديمي هام للطلبة
                </h3>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[9px]
                    leading-[17px]
                    text-[#64748B]
                  "
                >
                  يرجى توثيق المهام المنجزة يوميا قبل
                  الساعة الخامسة مساءً. يتم إغلاق اعتماد
                  السجلات الأسبوعية بواسطة مشرف المؤسسة
                  ومشرف الكلية كل يوم خميس، وتعتمد
                  الدرجات النهائية بناءً على انتظام توثيق
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
        min-w-[150px]
        px-[22px]
        text-center
      "
    >
      <p
        className="
          m-0
          flex
          items-center
          justify-center
          gap-[5px]
          text-[9px]
          text-[#94A3B8]
        "
      >
        {Icon && (
          <Icon
            size={12}
            strokeWidth={1.7}
          />
        )}

        {label}
      </p>

      <div
        className="
          mt-[5px]
          flex
          items-baseline
          justify-center
          gap-[4px]
        "
      >
        <strong
          className="
            text-[16px]
            text-[#1E293B]
          "
        >
          {value}
        </strong>

        {sub && (
          <span
            className="
              text-[9px]
              text-[#94A3B8]
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

function StatusBadge({ text, type }) {
  const styles = {
    good: `
      bg-[#DFF8FE]
      text-[#0E7490]
    `,

    excellent: `
      bg-[#EEF4FF]
      text-[#09379A]
    `,
  };

  return (
    <span
      className={`
        inline-flex
        h-[24px]
        px-[9px]
        rounded-[12px]
        items-center
        gap-[6px]
        text-[9px]
        font-bold
        ${styles[type]}
      `}
    >
      <span
        className={`
          w-[5px]
          h-[5px]
          rounded-full

          ${
            type === "good"
              ? "bg-[#06B6D4]"
              : "bg-[#09379A]"
          }
        `}
      />

      {text}
    </span>
  );
}