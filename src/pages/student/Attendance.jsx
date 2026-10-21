import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Plus,
  RefreshCw,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Attendance() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const attendanceRows = [
    {
      id: 1,
      date: "2025/10/01",
      day: "الأربعاء",
      status: "present",
      note: "—",
    },
    {
      id: 2,
      date: "2025/10/02",
      day: "الخميس",
      status: "present",
      note: "—",
    },
    {
      id: 3,
      date: "2025/10/03",
      day: "الجمعة",
      status: "absent",
      note: "غياب غير مبرر - يرجى تقديم عذر معتمد",
    },
    {
      id: 4,
      date: "2025/10/06",
      day: "الإثنين",
      status: "present",
      note: "—",
    },
    {
      id: 5,
      date: "2025/10/07",
      day: "الثلاثاء",
      status: "present",
      note: "—",
    },
  ];

  const filteredRows = useMemo(() => {
    if (filter === "all") return attendanceRows;

    return attendanceRows.filter(
      (row) => row.status === filter
    );
  }, [filter]);

  const stats = {
    presentDays: 23,
    totalDays: 25,
    attendanceRate: 92,
    absenceDays: 2,
    justifiedAbsenceDays: 1,
  };

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

              <span
                className="
                  font-bold
                  text-[#64748B]
                "
              >
                لوحة المتابعة
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
              {/* Title */}
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
                  الحضور والغياب
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
                  سجل التواجد الميداني والتنفيذ لساعات
                  التدريب الأكاديمي المعتمدة
                </p>
              </div>

              {/* Actions */}
              <div
                className="
                  flex
                  items-center
                  gap-[10px]
                "
              >
                <button
                  type="button"
                  className="
                    h-[40px]
                    px-[15px]
                    rounded-[8px]
                    border
                    border-[#D9E2EC]
                    bg-white
                    text-[#334155]
                    flex
                    items-center
                    justify-center
                    gap-[7px]
                    text-[11px]
                    font-bold
                    cursor-pointer
                    transition
                    hover:bg-[#F8FAFC]
                  "
                >
                  <Download
                    size={15}
                    strokeWidth={1.8}
                    className="text-[#09379A]"
                  />

                  تصدير كشف الحضور (PDF)
                </button>

                <button
                  type="button"
                  className="
                    h-[40px]
                    px-[16px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-[7px]
                    text-[11px]
                    font-bold
                    cursor-pointer
                    transition
                    hover:bg-[#072E81]
                  "
                >
                  <Plus
                    size={16}
                    strokeWidth={2}
                  />

                  تقديم عذر غياب
                </button>
              </div>
            </section>

            {/* =====================================
                TRAINING INFORMATION
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[78px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[20px]
                py-[15px]
                flex
                items-center
                justify-between
                gap-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Semester */}
              <div
                className="
                  h-[28px]
                  px-[12px]
                  rounded-[14px]
                  bg-[#EEF4FF]
                  text-[#2563EB]
                  flex
                  items-center
                  gap-[7px]
                  text-[10px]
                  font-bold
                  whitespace-nowrap
                "
              >
                <span
                  className="
                    w-[6px]
                    h-[6px]
                    rounded-full
                    bg-[#2563EB]
                  "
                />

                الفصل الدراسي الأول 2025/2026
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-[42px]
                  flex-1
                  justify-end
                "
              >
                <InfoItem
                  label="فترة التدريب"
                  value="2025/10/01 — 2025/12/01"
                />

                <InfoItem
                  label="المشرف الميداني"
                  value="م. سارة خليل"
                />

                <div
                  className="
                    flex
                    items-center
                    gap-[10px]
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
                    "
                  >
                    <Building2
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      جهة التدريب
                    </p>

                    <strong
                      className="
                        block
                        mt-[3px]
                        text-[12px]
                        text-[#1E293B]
                      "
                    >
                      شركة القدس للاتصالات
                    </strong>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================
                STATS CARDS
            ====================================== */}
            <section
              className="
                mt-[22px]
                grid
                grid-cols-1
                md:grid-cols-3
                gap-[20px]
              "
            >
              {/* Absence */}
              <StatCard
                type="danger"
                icon={AlertTriangle}
                label="عدد أيام الغياب"
                value={stats.absenceDays}
                suffix="أيام غير محتسبة"
                footer={
                  <>
                    غياب بعذر مقبول وموثق:
                    <strong className="mr-[4px]">
                      {stats.justifiedAbsenceDays} يوم
                    </strong>
                  </>
                }
              />

              {/* Attendance rate */}
              <article
                className="
                  min-h-[165px]
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[20px]
                  py-[18px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  <p
                    className="
                      m-0
                      text-[10px]
                      text-[#64748B]
                    "
                  >
                    نسبة الحضور التراكمية
                  </p>

                  <div
                    className="
                      w-[34px]
                      h-[34px]
                      rounded-full
                      bg-[#EFF5FF]
                      text-[#2563EB]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <RefreshCw
                      size={15}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-[20px]
                    flex
                    items-end
                    gap-[8px]
                  "
                >
                  <strong
                    className="
                      text-[31px]
                      leading-[32px]
                      font-bold
                      text-[#10A36A]
                    "
                  >
                    {stats.attendanceRate}%
                  </strong>

                  <span
                    className="
                      h-[22px]
                      px-[8px]
                      rounded-[10px]
                      bg-[#E9FDF3]
                      text-[#16A34A]
                      flex
                      items-center
                      text-[9px]
                      font-bold
                    "
                  >
                    ممتاز
                  </span>
                </div>

                <div
                  className="
                    mt-[18px]
                    h-[8px]
                    rounded-full
                    bg-[#EAF0F5]
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#10B981]
                    "
                    style={{
                      width: `${stats.attendanceRate}%`,
                    }}
                  />
                </div>
              </article>

              {/* Presence */}
              <StatCard
                type="success"
                icon={Check}
                label="عدد أيام الحضور"
                value={stats.presentDays}
                suffix="يوما مكتملًا"
                footer={
                  <>
                    من أصل
                    <strong className="mx-[4px]">
                      {stats.totalDays}
                    </strong>
                    يوما تدريبيا معتمدا
                  </>
                }
              />
            </section>

            {/* =====================================
                CALENDAR + TABLE
            ====================================== */}
            <section
              dir="ltr"
              className="
                mt-[24px]
                grid
                grid-cols-1
                lg:grid-cols-[320px_minmax(0,1fr)]
                gap-[22px]
                items-start
              "
            >
              {/* =================================
                  CALENDAR
              ================================== */}
              <aside
                dir="rtl"
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[18px]
                  py-[18px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[7px]
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="text-[#09379A]"
                    />

                    <h2
                      className="
                        m-0
                        text-[13px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      أكتوبر 2025
                    </h2>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <button
                      type="button"
                      className="
                        border-0
                        bg-transparent
                        text-[#94A3B8]
                        p-[2px]
                      "
                    >
                      <ChevronRight size={16} />
                    </button>

                    <button
                      type="button"
                      className="
                        border-0
                        bg-transparent
                        text-[#94A3B8]
                        p-[2px]
                      "
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </div>
                </div>

                <AttendanceCalendar />

                {/* Legend */}
                <div
                  className="
                    mt-[16px]
                    pt-[14px]
                    border-t
                    border-[#EEF2F7]
                    flex
                    items-center
                    justify-between
                    gap-[8px]
                    text-[8px]
                    text-[#64748B]
                  "
                >
                  <CalendarLegend
                    color="#10B981"
                    label="حاضر"
                    count={23}
                  />

                  <CalendarLegend
                    color="#EF4444"
                    label="غائب"
                    count={2}
                  />

                  <CalendarLegend
                    color="#CBD5E1"
                    label="يوم إجازة"
                    count={6}
                  />
                </div>
              </aside>

              {/* =================================
                  ATTENDANCE TABLE
              ================================== */}
              <section
                dir="rtl"
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  overflow-hidden
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                {/* Header */}
                <div
                  className="
                    px-[20px]
                    py-[18px]
                    flex
                    items-start
                    justify-between
                    gap-[15px]
                  "
                >
                  <div>
                    <h2
                      className="
                        m-0
                        text-[18px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      تفاصيل الحضور والغياب
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      سجل الحركات اليومية المعتمدة من جهاز
                      البصمة والمشرف الميداني
                    </p>
                  </div>

                  {/* Filter */}
                  <div
                    className="
                      flex
                      items-center
                      gap-[6px]
                      rounded-[8px]
                      bg-[#F5F7FB]
                      px-[7px]
                      py-[5px]
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      تصفية:
                    </span>

                    <select
                      value={filter}
                      onChange={(event) =>
                        setFilter(event.target.value)
                      }
                      className="
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[9px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      <option value="all">
                        جميع الحالات
                      </option>

                      <option value="present">
                        حاضر
                      </option>

                      <option value="absent">
                        غائب
                      </option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div
                  className="
                    overflow-x-auto
                  "
                >
                  <div
                    className="
                      min-w-[650px]
                    "
                  >
                    <div
                      className="
                        grid
                        grid-cols-[130px_130px_140px_minmax(0,1fr)]
                        bg-[#EFF3FB]
                        px-[18px]
                        py-[12px]
                        text-[9px]
                        font-medium
                        text-[#64748B]
                      "
                    >
                      <div>التاريخ</div>
                      <div>اليوم</div>
                      <div>الحالة</div>
                      <div>الملاحظات والتوثيق</div>
                    </div>

                    {filteredRows.map(
                      (row, index) => (
                        <div
                          key={row.id}
                          className={`
                            grid
                            grid-cols-[130px_130px_140px_minmax(0,1fr)]
                            items-center
                            px-[18px]
                            py-[14px]
                            min-h-[52px]

                            ${
                              row.status === "absent"
                                ? "bg-[#FFF4F4]"
                                : "bg-white"
                            }

                            ${
                              index !==
                              filteredRows.length - 1
                                ? "border-b border-[#EEF2F7]"
                                : ""
                            }
                          `}
                        >
                          <div
                            dir="ltr"
                            className={`
                              text-[9px]

                              ${
                                row.status ===
                                "absent"
                                  ? "font-bold text-[#DC2626]"
                                  : "text-[#475569]"
                              }
                            `}
                          >
                            {row.date}
                          </div>

                          <div
                            className={`
                              text-[10px]
                              font-medium

                              ${
                                row.status ===
                                "absent"
                                  ? "text-[#DC2626]"
                                  : "text-[#475569]"
                              }
                            `}
                          >
                            {row.day}
                          </div>

                          <div>
                            {row.status ===
                            "present" ? (
                              <span
                                className="
                                  inline-flex
                                  h-[24px]
                                  px-[9px]
                                  rounded-[12px]
                                  bg-[#E9FFF4]
                                  text-[#16A34A]
                                  items-center
                                  gap-[5px]
                                  text-[9px]
                                  font-bold
                                "
                              >
                                <Check
                                  size={11}
                                  strokeWidth={2}
                                />

                                حاضر
                              </span>
                            ) : (
                              <span
                                className="
                                  inline-flex
                                  h-[24px]
                                  px-[9px]
                                  rounded-[12px]
                                  bg-[#FFE8E8]
                                  text-[#DC2626]
                                  items-center
                                  gap-[5px]
                                  text-[9px]
                                  font-bold
                                "
                              >
                                × غائب
                              </span>
                            )}
                          </div>

                          <div>
                            {row.status ===
                            "absent" ? (
                              <span
                                className="
                                  inline-flex
                                  min-h-[25px]
                                  px-[8px]
                                  rounded-[5px]
                                  border
                                  border-[#FCA5A5]
                                  bg-white
                                  text-[#DC2626]
                                  items-center
                                  gap-[5px]
                                  text-[8px]
                                  font-medium
                                "
                              >
                                <FileText
                                  size={11}
                                />

                                {row.note}
                              </span>
                            ) : (
                              <span
                                className="
                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                —
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Footer / Pagination */}
                <div
                  className="
                    min-h-[52px]
                    border-t
                    border-[#EEF2F7]
                    px-[18px]
                    flex
                    items-center
                    justify-between
                    gap-[15px]
                  "
                >
                  <span
                    className="
                      text-[8px]
                      text-[#64748B]
                    "
                  >
                    عرض 5 من أصل
                    <strong className="mx-[3px]">
                      25
                    </strong>
                    سجل
                  </span>

                  <div
                    dir="ltr"
                    className="
                      flex
                      items-center
                      gap-[5px]
                    "
                  >
                    <PaginationButton>
                      التالي
                      <ChevronLeft size={12} />
                    </PaginationButton>

                    {[3, 2, 1].map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`
                          w-[30px]
                          h-[30px]
                          rounded-[5px]
                          border
                          text-[9px]
                          font-bold

                          ${
                            currentPage === page
                              ? `
                                border-[#09379A]
                                bg-[#09379A]
                                text-white
                              `
                              : `
                                border-[#DDE5EF]
                                bg-white
                                text-[#475569]
                              `
                          }
                        `}
                      >
                        {page}
                      </button>
                    ))}

                    <PaginationButton>
                      <ChevronRight size={12} />
                      السابق
                    </PaginationButton>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p
        className="
          m-0
          text-[9px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <strong
        className="
          block
          mt-[3px]
          text-[10px]
          text-[#334155]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  footer,
  type,
}) {
  const isDanger = type === "danger";

  return (
    <article
      className="
        min-h-[165px]
        rounded-[14px]
        border
        border-[#DDE5EF]
        bg-white
        px-[20px]
        py-[18px]
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <p
          className="
            m-0
            text-[10px]
            text-[#64748B]
          "
        >
          {label}
        </p>

        <div
          className={`
            w-[34px]
            h-[34px]
            rounded-full
            flex
            items-center
            justify-center

            ${
              isDanger
                ? `
                  bg-[#FFF1F1]
                  text-[#EF4444]
                `
                : `
                  bg-[#EAFBF4]
                  text-[#10B981]
                `
            }
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        </div>
      </div>

      <div
        className="
          mt-[21px]
          flex
          items-baseline
          gap-[7px]
        "
      >
        <strong
          className={`
            text-[30px]
            leading-[31px]
            font-bold

            ${
              isDanger
                ? "text-[#EF4444]"
                : "text-[#09379A]"
            }
          `}
        >
          {value}
        </strong>

        <span
          className="
            text-[9px]
            text-[#94A3B8]
          "
        >
          {suffix}
        </span>
      </div>

      <div
        className="
          mt-[17px]
          pt-[12px]
          border-t
          border-[#EEF2F7]
          text-[9px]
          text-[#64748B]
        "
      >
        {footer}
      </div>
    </article>
  );
}

/* =========================================================
   CALENDAR
========================================================= */

function AttendanceCalendar() {
  const days = [
    ["27", "28", "29", "30", "1", "2", "3"],
    ["4", "5", "6", "7", "8", "9", "10"],
    ["11", "12", "13", "14", "15", "16", "17"],
    ["18", "19", "20", "21", "22", "23", "24"],
    ["25", "26", "27", "28", "29", "30", "31"],
  ];

  const presentDays = new Set([
    "1",
    "2",
    "6",
    "7",
    "8",
    "9",
    "12",
    "13",
    "14",
    "15",
    "16",
    "19",
    "20",
    "21",
    "22",
    "23",
    "26",
    "28",
    "29",
    "30",
  ]);

  const absentDays = new Set(["3", "27"]);

  return (
    <div className="mt-[18px]">
      <div
        className="
          grid
          grid-cols-7
          text-center
          text-[8px]
          text-[#94A3B8]
        "
      >
        {[
          "سبت",
          "أحد",
          "إثنين",
          "ثلاثاء",
          "أربعاء",
          "خميس",
          "جمعة",
        ].map((day) => (
          <span key={day}>
            {day}
          </span>
        ))}
      </div>

      <div
        className="
          mt-[10px]
          flex
          flex-col
          gap-[9px]
        "
      >
        {days.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="
              grid
              grid-cols-7
              text-center
            "
          >
            {week.map((day, index) => {
              const isOutside =
                weekIndex === 0 && index < 4;

              const isPresent =
                !isOutside &&
                presentDays.has(day);

              const isAbsent =
                !isOutside &&
                absentDays.has(day);

              return (
                <div
                  key={`${weekIndex}-${index}`}
                  className="
                    min-h-[35px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-[4px]
                  "
                >
                  <span
                    className={`
                      text-[9px]

                      ${
                        isOutside
                          ? "text-[#CBD5E1]"
                          : isAbsent
                          ? "font-bold text-[#EF4444]"
                          : "text-[#475569]"
                      }
                    `}
                  >
                    {day}
                  </span>

                  {isPresent && (
                    <span
                      className="
                        w-[5px]
                        h-[5px]
                        rounded-full
                        bg-[#10B981]
                      "
                    />
                  )}

                  {isAbsent && (
                    <span
                      className="
                        w-[5px]
                        h-[5px]
                        rounded-full
                        bg-[#EF4444]
                      "
                    />
                  )}

                  {!isPresent &&
                    !isAbsent &&
                    !isOutside && (
                      <span
                        className="
                          w-[5px]
                          h-[5px]
                          rounded-full
                          bg-[#CBD5E1]
                        "
                      />
                    )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   CALENDAR LEGEND
========================================================= */

function CalendarLegend({
  color,
  label,
  count,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[5px]
      "
    >
      <span
        className="
          w-[6px]
          h-[6px]
          rounded-full
        "
        style={{
          backgroundColor: color,
        }}
      />

      <span>
        {label} ({count})
      </span>
    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function PaginationButton({
  children,
}) {
  return (
    <button
      type="button"
      className="
        h-[30px]
        px-[9px]
        rounded-[5px]
        border
        border-[#DDE5EF]
        bg-white
        text-[#64748B]
        flex
        items-center
        gap-[4px]
        text-[8px]
        font-medium
        hover:bg-[#F8FAFC]
      "
    >
      {children}
    </button>
  );
}