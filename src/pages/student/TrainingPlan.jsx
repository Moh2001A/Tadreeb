import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  Info,
  Printer,
  ShieldCheck,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingPlan() {
  const navigate = useNavigate();

  const goals = [
    "التعرف على بيئة العمل الواقعية في قطاع الاتصالات والشبكات.",
    "اكتساب مهارات عملية ومعايير قياسية في تركيب وصيانة الشبكات.",
    "تطوير مهارات العمل الجماعي، حل المشكلات التقنية والتواصل المهني.",
  ];

  const tasks = [
    {
      week: "1",
      title: "التدريب على الأنظمة وصيانة الشبكات",
      description:
        "التعرف على بروتوكولات الأمان الداخلي وإجراءات الفحص الأساسية لأجهزة التوجيه والتحكم.",
      output: "تقرير أسبوعي (1)",
      status: "مكتمل",
      statusType: "completed",
    },
    {
      week: "2 - 3",
      title: "المشاركة في تركيب وصيانة الشبكات",
      description:
        "المشاركة الميدانية في تمديد الكابلات وتهيئة أجهزة التبديل وإعداد نقاط التوزيع المحلية.",
      output: "تقرير أسبوعي (2)",
      status: "قيد التنفيذ",
      statusType: "progress",
    },
    {
      week: "4 - 5",
      title: "العمل على مشاريع عملية واختبارات الأداء",
      description:
        "تطبيق حلول عملية لمعالجة الاختناقات الشبكية وإعداد سيناريوهات استعادة الاتصال.",
      output: "تقرير أسبوعي (3)",
      status: "قادم",
      statusType: "upcoming",
    },
    {
      week: "6 - 7",
      title: "تجهيز التقرير النهائي وعرض الإنجاز",
      description:
        "حصر ساعات التدريب العملي وتوثيق المهارات المكتسبة واعتماد النموذج من المشرف الميداني.",
      output: "تقرير نهائي شامل",
      status: "قادم",
      statusType: "upcoming",
    },
  ];

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
      <Sidebar />

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
        <Header />

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
                onClick={() => navigate("/student/dashboard")}
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
                  hover:text-[#09379A]
                "
              >
                الرئيسية
              </button>

              <span className="text-[#94A3B8]">›</span>

              <button
                type="button"
                onClick={() => navigate("/student/training-profile")}
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
                  hover:text-[#09379A]
                "
              >
                ملفي التدريبي
              </button>

              <span className="text-[#94A3B8]">›</span>

              <span className="font-bold text-[#09379A]">
                خطة التدريب
              </span>
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section className="mt-[5px]">
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-[20px]
                "
              >
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
                    خطة التدريب
                  </h1>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      text-[13px]
                      leading-[22px]
                      text-[#64748B]
                    "
                  >
                    الخطة المعتمدة وتفاصيل المهام والأنشطة الأسبوعية
                    الموزعة على فترة التدريب الميداني
                  </p>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-end
                    gap-[10px]
                  "
                >
                  <span
                    className="
                      h-[30px]
                      px-[12px]
                      rounded-[15px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                      flex
                      items-center
                      gap-[7px]
                      text-[10px]
                      font-medium
                      whitespace-nowrap
                    "
                  >
                    <span
                      className="
                        w-[6px]
                        h-[6px]
                        rounded-full
                        bg-[#FF6B35]
                      "
                    />

                    مسار: شبكات واتصالات
                  </span>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="
                      h-[30px]
                      px-[12px]
                      rounded-[8px]
                      border
                      border-[#E2E8F0]
                      bg-white
                      text-[#334155]
                      flex
                      items-center
                      gap-[7px]
                      text-[10px]
                      font-bold
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <Printer size={14} className="text-[#09379A]" />
                    طباعة الخطة
                  </button>
                </div>
              </div>

              <div
                className="
                  mt-[10px]
                  flex
                  items-center
                  gap-[7px]
                  text-[10px]
                  font-medium
                  text-[#09379A]
                "
              >
                <ShieldCheck size={15} />

                الاعتماد الأكاديمي للعام الدراسي 2025/2026
              </div>
            </section>

            {/* =====================================
                SUMMARY CARDS
            ====================================== */}
            <section
              className="
                mt-[24px]
                grid
                grid-cols-1
                md:grid-cols-3
                gap-[18px]
              "
            >
              <SummaryCard
                icon={Clock3}
                label="مدة التدريب"
                value="8 أسابيع"
                description="بواقع 120 ساعة ميدانية"
              />

              <SummaryCard
                icon={CalendarDays}
                label="تاريخ البدء"
                value="2025/10/01"
                description="الأسبوع الأكاديمي الأول"
              />

              <SummaryCard
                icon={CalendarDays}
                label="تاريخ الانتهاء"
                value="2025/12/01"
                description="تسليم التقييم النهائي"
              />
            </section>

            {/* =====================================
                TRAINING GOALS
            ====================================== */}
            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                px-[24px]
                py-[24px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[12px]
                "
              >
                <div
                  className="
                    w-[36px]
                    h-[36px]
                    rounded-[9px]
                    bg-[#0F172A]
                    text-[#2563EB]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h2
                    className="
                      m-0
                      text-[19px]
                      leading-[28px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    أهداف التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    المخرجات التعليمية والمهارات التطبيقية المستهدفة
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-[18px]
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-[14px]
                "
              >
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className="
                      min-h-[72px]
                      rounded-[10px]
                      bg-[#F4F6FF]
                      px-[14px]
                      py-[13px]
                      flex
                      items-start
                      gap-[9px]
                    "
                  >
                    <div
                      className="
                        w-[23px]
                        h-[23px]
                        rounded-full
                        bg-[#E2E9FF]
                        text-[#2563EB]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <Check size={13} strokeWidth={2} />
                    </div>

                    <p
                      className="
                        m-0
                        text-[11px]
                        leading-[20px]
                        font-medium
                        text-[#334155]
                      "
                    >
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================
                TASKS TABLE
            ====================================== */}
            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                overflow-hidden
              "
            >
              {/* Table Header */}
              <div
                className="
                  px-[24px]
                  py-[20px]
                  flex
                  items-start
                  justify-between
                  gap-[20px]
                "
              >
                <div className="flex items-start gap-[10px]">
                  <div
                    className="
                      w-[35px]
                      h-[35px]
                      rounded-[8px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <FileText size={18} />
                  </div>

                  <div>
                    <h2
                      className="
                        m-0
                        text-[18px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      المهام والأنشطة
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      4 مراحل رئيسية معتمدة وفق الجدول الزمني
                    </p>
                  </div>
                </div>

                <div
                  className="
                    min-w-[200px]
                    max-w-[390px]
                    flex-1
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-[9px]
                      text-[#64748B]
                      mb-[5px]
                    "
                  >
                    <span>مكتمل: 1 أسبوع / 8 أسابيع</span>

                    <Flag size={13} className="text-[#09379A]" />
                  </div>

                  <div
                    className="
                      w-full
                      h-[10px]
                      rounded-full
                      bg-[#E7ECFF]
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        h-full
                        w-[12.5%]
                        rounded-full
                        bg-[#09379A]
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Column Labels */}
              <div
                className="
                  grid
                  grid-cols-[100px_minmax(0,1fr)_170px_110px]
                  bg-[#EFF3FF]
                  px-[20px]
                  py-[12px]
                  text-[10px]
                  font-medium
                  text-[#64748B]
                "
              >
                <div>الأسبوع</div>
                <div>المهام والأنشطة العملية</div>
                <div>المخرجات المتوقعة</div>
                <div>الحالة</div>
              </div>

              {/* Rows */}
              <div>
                {tasks.map((task, index) => (
                  <div
                    key={task.week}
                    className={`
                      grid
                      grid-cols-[100px_minmax(0,1fr)_170px_110px]
                      items-center
                      gap-[10px]
                      px-[20px]
                      py-[22px]

                      ${
                        index !== tasks.length - 1
                          ? "border-b border-[#EEF2F7]"
                          : ""
                      }
                    `}
                  >
                    {/* Week */}
                    <div>
                      <span
                        className="
                          inline-flex
                          min-w-[46px]
                          h-[36px]
                          px-[9px]
                          rounded-[9px]
                          bg-[#E9EEFF]
                          text-[#09379A]
                          items-center
                          justify-center
                          text-[14px]
                          font-bold
                        "
                      >
                        {task.week}
                      </span>
                    </div>

                    {/* Task */}
                    <div>
                      <h3
                        className="
                          m-0
                          text-[12px]
                          leading-[20px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        {task.title}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[4px]
                          text-[9px]
                          leading-[16px]
                          text-[#64748B]
                        "
                      >
                        {task.description}
                      </p>
                    </div>

                    {/* Output */}
                    <div>
                      <span
                        className={`
                          inline-flex
                          min-h-[28px]
                          px-[10px]
                          rounded-[7px]
                          items-center
                          gap-[6px]
                          text-[9px]
                          font-medium

                          ${
                            index === tasks.length - 1
                              ? `
                                bg-[#09379A]
                                text-white
                              `
                              : `
                                bg-[#EEF3FF]
                                text-[#475569]
                              `
                          }
                        `}
                      >
                        <FileText size={12} />

                        {task.output}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <StatusBadge
                        status={task.status}
                        type={task.statusType}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================
                SUPERVISOR NOTES
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[78px]
                rounded-[12px]
                border
                border-[#DFE6F4]
                bg-[#EEF3FF]
                px-[20px]
                py-[16px]
                flex
                items-center
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
                    w-[34px]
                    h-[34px]
                    rounded-[8px]
                    bg-white
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Info size={17} />
                </div>

                <div>
                  <h3
                    className="
                      m-0
                      text-[13px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    ملاحظات اعتماد المشرف الأكاديمي
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      text-[9px]
                      leading-[16px]
                      text-[#64748B]
                    "
                  >
                    يجب رفع التقارير الدورية كل يوم خميس من نهاية
                    الأسبوع لضمان توثيق الساعات.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/student/reports")}
                className="
                  border-0
                  bg-transparent
                  text-[#09379A]
                  flex
                  items-center
                  gap-[7px]
                  text-[10px]
                  font-bold
                  cursor-pointer
                  whitespace-nowrap
                "
              >
                دليل إعداد التقارير
                <ArrowLeft size={14} />
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div
      className="
        min-h-[105px]
        rounded-[14px]
        bg-white
        border
        border-[#EEF2F6]
        px-[20px]
        py-[18px]
        flex
        items-center
        justify-between
        gap-[15px]
      "
    >
      <div>
        <p
          className="
            m-0
            text-[10px]
            text-[#94A3B8]
          "
        >
          {label}
        </p>

        <h3
          className="
            m-0
            mt-[6px]
            text-[19px]
            leading-[28px]
            font-bold
            text-[#1E293B]
          "
        >
          {value}
        </h3>

        <p
          className="
            m-0
            mt-[4px]
            text-[9px]
            text-[#94A3B8]
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          w-[44px]
          h-[44px]
          rounded-[10px]
          bg-[#EAF0FF]
          text-[#09379A]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon size={21} strokeWidth={1.8} />
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status, type }) {
  const styles = {
    completed: `
      bg-[#EAF1FF]
      text-[#09379A]
    `,
    progress: `
      bg-[#FFF0E8]
      text-[#EA580C]
    `,
    upcoming: `
      bg-[#F1F5F9]
      text-[#94A3B8]
    `,
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
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
            type === "completed"
              ? "bg-[#09379A]"
              : type === "progress"
              ? "bg-[#FF6B35]"
              : "bg-[#CBD5E1]"
          }
        `}
      />

      {status}
    </span>
  );
}