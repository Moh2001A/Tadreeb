import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  History,
  RefreshCw,
  UserX,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Reports() {
  const navigate = useNavigate();

  const [reportType, setReportType] = useState("attendance");
  const [trainingProgram, setTrainingProgram] = useState("all");
  const [dateRange, setDateRange] = useState("");

  const availableReports = [
    {
      id: 1,
      title: "تقرير الحضور والغياب",
      meta: "PDF • 240 KB",
    },
    {
      id: 2,
      title: "تقرير أداء الطالب",
      meta: "PDF • 410 KB",
    },
    {
      id: 3,
      title: "تقرير تقييم المدرب",
      meta: "PDF • 180 KB",
    },
    {
      id: 4,
      title: "تقرير ختامي للتدريب",
      meta: "PDF • 650 KB",
    },
  ];

  const weeklyHours = [
    {
      week: "الأسبوع 1",
      value: 28,
    },
    {
      week: "الأسبوع 2",
      value: 26,
    },
    {
      week: "الأسبوع 3",
      value: 30,
    },
    {
      week: "الأسبوع 4",
      value: 27,
    },
  ];

  const maxHours = 40;

  const handleDownloadReport = () => {
    console.log({
      reportType,
      trainingProgram,
      dateRange,
    });
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
      {/* =========================
          SIDEBAR
      ========================== */}
      <Sidebar />

      {/* =========================
          MAIN AREA
      ========================== */}
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
        {/* =========================
            HEADER
        ========================== */}
        <Header />

        {/* =========================
            SCROLLABLE CONTENT
        ========================== */}
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
          <div className="w-full max-w-[1080px] mx-auto">

            {/* =========================
                BREADCRUMB
            ========================== */}
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
                onClick={() => navigate("/student/dashboard")}
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

              <span className="text-[#94A3B8]">›</span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                التقارير
              </span>
            </div>

            {/* =========================
                PAGE TITLE
            ========================== */}
            <section className="mt-[5px]">
              <h1
                className="
                  m-0
                  text-[30px]
                  leading-[42px]
                  font-bold
                  text-[#14213D]
                "
              >
                التقارير
              </h1>
            </section>

            {/* =========================
                FILTER CARD
            ========================== */}
            <section
              className="
                mt-[18px]
                w-full
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[24px]
                py-[22px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Row 1 */}
              <div
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-[22px]
                "
              >
                {/* Report Type */}
                <FilterSelect
                  label="نوع التقرير"
                  value={reportType}
                  onChange={(event) =>
                    setReportType(event.target.value)
                  }
                >
                  <option value="attendance">
                    تقرير الحضور والغياب
                  </option>

                  <option value="performance">
                    تقرير أداء الطالب
                  </option>

                  <option value="evaluation">
                    تقرير تقييم المدرب
                  </option>

                  <option value="final">
                    التقرير الختامي للتدريب
                  </option>
                </FilterSelect>

                {/* Date Range */}
                <div>
                  <label
                    className="
                      mb-[7px]
                      block
                      text-[11px]
                      leading-[18px]
                      font-medium
                      text-[#64748B]
                    "
                  >
                    الفترة الزمنية
                  </label>

                  <div
                    className="
                      h-[44px]
                      rounded-[8px]
                      border
                      border-[#D9E2EC]
                      bg-white
                      px-[13px]
                      flex
                      items-center
                      gap-[9px]
                      transition
                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <CalendarDays
                      size={16}
                      strokeWidth={1.7}
                      className="
                        shrink-0
                        text-[#94A3B8]
                      "
                    />

                    <input
                      type="text"
                      value={dateRange}
                      onChange={(event) =>
                        setDateRange(event.target.value)
                      }
                      placeholder="من تاريخ - إلى تاريخ"
                      className="
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[11px]
                        text-[#334155]
                        placeholder:text-[#94A3B8]
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div
                className="
                  mt-[20px]
                  w-full
                  lg:w-[calc(50%_-_11px)]
                "
              >
                <FilterSelect
                  label="البرنامج التدريبي"
                  value={trainingProgram}
                  onChange={(event) =>
                    setTrainingProgram(event.target.value)
                  }
                >
                  <option value="all">
                    جميع البرامج
                  </option>

                  <option value="networks">
                    شبكات واتصالات
                  </option>

                  <option value="it">
                    تقنية المعلومات
                  </option>
                </FilterSelect>
              </div>

              {/* Actions */}
              <div
                className="
                  mt-[22px]
                  pt-[18px]
                  border-t
                  border-[#EEF2F7]
                  flex
                  flex-wrap
                  items-center
                  justify-start
                  gap-[10px]
                "
              >
                {/* Primary - Orange */}
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="
                    h-[42px]
                    px-[19px]
                    rounded-[8px]
                    border-0
                    bg-[#FF6B35]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    text-[11px]
                    font-bold
                    cursor-pointer
                    shadow-[0_3px_7px_rgba(255,107,53,0.18)]
                    transition
                    hover:bg-[#EA5A28]
                  "
                >
                  <Download
                    size={15}
                    strokeWidth={1.8}
                  />

                  تحميل تقرير
                </button>

                {/* Secondary */}
                <button
                  type="button"
                  className="
                    h-[42px]
                    px-[17px]
                    rounded-[8px]
                    border
                    border-[#C9D9F8]
                    bg-white
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    text-[11px]
                    font-bold
                    cursor-pointer
                    transition
                    hover:bg-[#F5F8FF]
                  "
                >
                  <History
                    size={15}
                    strokeWidth={1.8}
                  />

                  سجل التحميل
                </button>
              </div>
            </section>

            {/* =========================
                STATISTICS
            ========================== */}
            <section
              className="
                mt-[22px]
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-[18px]
              "
            >
              <StatisticCard
                label="إجمالي الساعات"
                value="120"
                description="ساعة تدريبية معتمدة"
                icon={Clock3}
                iconClass="bg-[#EEF4FF] text-[#09379A]"
              />

              <StatisticCard
                label="نسبة الحضور"
                value="92%"
                description="أداء فصلي مرتفع"
                icon={RefreshCw}
                iconClass="bg-[#E9FFF4] text-[#10B981]"
                badge="ممتاز"
                valueClass="text-[#09379A]"
              />

              <StatisticCard
                label="عدد الأيام الفعلية"
                value="24"
                description="يوما من أصل 26"
                icon={CalendarDays}
                iconClass="bg-[#EEF4FF] text-[#09379A]"
              />

              <StatisticCard
                label="عدد مرات الغياب"
                value="2"
                description="غياب موثق بعذر"
                icon={UserX}
                iconClass="bg-[#FFF0F0] text-[#EF4444]"
                valueClass="text-[#EF4444]"
              />
            </section>

            {/* =========================
                LOWER CONTENT
            ========================== */}
            <section
              className="
                mt-[22px]
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-[20px]
                items-stretch
              "
            >
              {/* =====================
                  AVAILABLE REPORTS
              ====================== */}
              <article
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[20px]
                  py-[20px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  أهم التقارير المتاحة
                </h2>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  مستندات وتقارير جاهزة للتصدير
                </p>

                <div
                  className="
                    mt-[18px]
                    flex
                    flex-col
                    gap-[11px]
                  "
                >
                  {availableReports.map((report) => (
                    <button
                      key={report.id}
                      type="button"
                      className="
                        min-h-[63px]
                        w-full
                        rounded-[9px]
                        border
                        border-[#E7ECF2]
                        bg-white
                        px-[12px]
                        flex
                        items-center
                        justify-between
                        gap-[10px]
                        text-right
                        cursor-pointer
                        transition
                        hover:bg-[#F8FAFC]
                        hover:border-[#C9D7EA]
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-[10px]
                          min-w-0
                        "
                      >
                        <div
                          className="
                            w-[34px]
                            h-[34px]
                            rounded-[8px]
                            bg-[#EEF4FF]
                            text-[#09379A]
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <FileText
                            size={16}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="
                              m-0
                              text-[11px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {report.title}
                          </h3>

                          <p
                            dir="ltr"
                            className="
                              m-0
                              mt-[4px]
                              text-[8px]
                              text-[#94A3B8]
                              text-right
                            "
                          >
                            {report.meta}
                          </p>
                        </div>
                      </div>

                      <Download
                        size={14}
                        className="
                          shrink-0
                          text-[#94A3B8]
                        "
                      />
                    </button>
                  ))}
                </div>

                <div
                  className="
                    mt-[18px]
                    pt-[12px]
                    border-t
                    border-[#EEF2F7]
                    flex
                    items-center
                    gap-[6px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  <span
                    className="
                      w-[6px]
                      h-[6px]
                      rounded-full
                      bg-[#10B981]
                    "
                  />

                  جميع التقارير معتمدة وموقعة إلكترونيا
                </div>
              </article>

              {/* =====================
                  WEEKLY HOURS
              ====================== */}
              <article
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[20px]
                  py-[20px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  توزيع الساعات حسب الأسابيع
                </h2>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  معدل الساعات المنجزة أسبوعيا
                </p>

                <div
                  className="
                    mt-[26px]
                    h-[210px]
                    flex
                    items-end
                    justify-between
                    gap-[15px]
                    border-b
                    border-[#EEF2F7]
                    px-[8px]
                  "
                >
                  {weeklyHours.map((item) => {
                    const height =
                      (item.value / maxHours) * 100;

                    return (
                      <div
                        key={item.week}
                        className="
                          flex-1
                          h-full
                          flex
                          flex-col
                          justify-end
                          items-center
                        "
                      >
                        <div
                          className="
                            w-full
                            max-w-[42px]
                            flex-1
                            flex
                            items-end
                          "
                        >
                          <div
                            className="
                              w-full
                              rounded-t-[5px]
                              bg-[#09379A]
                              transition-all
                            "
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        </div>

                        <span
                          className="
                            mt-[8px]
                            mb-[8px]
                            text-[8px]
                            text-[#64748B]
                            whitespace-nowrap
                          "
                        >
                          {item.week}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-[22px] text-center">
                  <p
                    className="
                      m-0
                      text-[9px]
                      font-medium
                      text-[#10A36A]
                    "
                  >
                    المتوسط الأسبوعي المطلوب:
                    30 ساعة / مكتمل
                  </p>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      text-[9px]
                      font-bold
                      text-[#10A36A]
                    "
                  >
                    100%
                  </p>
                </div>
              </article>

              {/* =====================
                  ATTENDANCE DONUT
              ====================== */}
              <article
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[20px]
                  py-[20px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  نسبة الحضور والغياب
                </h2>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  توزيع أيام التدريب الفعلي
                </p>

                <div
                  className="
                    mt-[32px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      relative
                      w-[160px]
                      h-[160px]
                      rounded-full
                    "
                    style={{
                      background:
                        "conic-gradient(#10B981 0deg 331.2deg, #EF4444 331.2deg 360deg)",
                    }}
                  >
                    <div
                      className="
                        absolute
                        inset-[16px]
                        rounded-full
                        bg-white
                        flex
                        flex-col
                        items-center
                        justify-center
                      "
                    >
                      <strong
                        className="
                          text-[27px]
                          leading-[30px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        92%
                      </strong>

                      <span
                        className="
                          mt-[3px]
                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        نسبة الالتزام
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    mt-[38px]
                    pt-[14px]
                    border-t
                    border-[#EEF2F7]
                    flex
                    items-center
                    justify-center
                    gap-[28px]
                    text-[9px]
                    text-[#64748B]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[6px]
                    "
                  >
                    <span
                      className="
                        w-[7px]
                        h-[7px]
                        rounded-full
                        bg-[#10B981]
                      "
                    />

                    حاضر (24 يوما)
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-[6px]
                    "
                  >
                    <span
                      className="
                        w-[7px]
                        h-[7px]
                        rounded-full
                        bg-[#EF4444]
                      "
                    />

                    غائب (2 يومان)
                  </div>
                </div>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <label
        className="
          mb-[7px]
          block
          text-[11px]
          leading-[18px]
          font-medium
          text-[#64748B]
        "
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="
            w-full
            h-[44px]
            appearance-none
            rounded-[8px]
            border
            border-[#D9E2EC]
            bg-white
            px-[13px]
            pl-[36px]
            outline-none
            font-['Cairo']
            text-[11px]
            text-[#334155]
            cursor-pointer
            transition
            focus:border-[#09379A]
            focus:ring-2
            focus:ring-[#09379A]/10
          "
        >
          {children}
        </select>

        <ChevronDown
          size={15}
          className="
            absolute
            left-[12px]
            top-1/2
            -translate-y-1/2
            pointer-events-none
            text-[#94A3B8]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   STATISTIC CARD
========================================================= */

function StatisticCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
  valueClass = "text-[#14213D]",
  badge,
}) {
  return (
    <article
      className="
        min-h-[135px]
        rounded-[14px]
        border
        border-[#DDE5EF]
        bg-white
        px-[18px]
        py-[17px]
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
            rounded-[8px]
            flex
            items-center
            justify-center
            ${iconClass}
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
          mt-[18px]
          flex
          items-end
          gap-[8px]
        "
      >
        <strong
          className={`
            text-[28px]
            leading-[30px]
            font-bold
            ${valueClass}
          `}
        >
          {value}
        </strong>

        {badge && (
          <span
            className="
              mb-[2px]
              h-[21px]
              px-[8px]
              rounded-[10px]
              bg-[#E9FFF4]
              text-[#16A34A]
              flex
              items-center
              text-[8px]
              font-bold
            "
          >
            {badge}
          </span>
        )}
      </div>

      <p
        className="
          m-0
          mt-[8px]
          text-[9px]
          text-[#64748B]
        "
      >
        {description}
      </p>
    </article>
  );
}