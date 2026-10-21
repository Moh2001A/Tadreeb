import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingProfile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    {
      id: "basic",
      label: "أساسية",
    },
    {
      id: "attachments",
      label: "المرفقات",
    },
    {
      id: "evaluations",
      label: "التقييمات",
    },
    {
      id: "certificate",
      label: "الشهادة",
    },
  ];

  const trainingData = {
    organization: "شركة القدس للاتصالات",
    description: "تدريب في مجال هندسة الاتصالات",

    status: "نشط / معتمد",

    duration: "8 أسابيع",

    dateRange: "2025/10/01 - 2025/12/01",

    location: "غزة - الرمال",

    academicYear: "السنة الأكاديمية 2024/2025",

    studentName: "أمل أحمد",

    academicSupervisor: "د. أحمد محمد",

    fieldSupervisor: "م. سارة خليل",

    major: "هندسة الاتصالات",

    trainingLocation: "غزة - الرمال",

    trainingDescription:
      "التدريب على الأنظمة والشبكات والمعدات الحديثة في مجال الاتصالات.",
  };

  return (
    <div
      dir="rtl"
      className="
        h-screen
        w-full
        flex
        overflow-hidden
        bg-white
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
          bg-white
        "
      >
        {/* =====================================================
            FIXED HEADER
      ====================================================== */}

        <Header />

        {/* =====================================================
            SCROLLABLE PAGE CONTENT
      ====================================================== */}

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
            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <section>
              {/* Breadcrumb */}

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

                    font-normal
                    text-[#64748B]

                    cursor-pointer

                    transition
                    hover:text-[#09379A]
                  "
                >
                  الرئيسية
                </button>

                <span
                  className="
                    text-[#94A3B8]
                  "
                >
                  ›
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/student/opportunities")
                  }
                  className="
                    border-0
                    bg-transparent
                    p-0

                    font-normal
                    text-[#64748B]

                    cursor-pointer

                    transition
                    hover:text-[#09379A]
                  "
                >
                  فرص التدريب
                </button>

                <span
                  className="
                    text-[#94A3B8]
                  "
                >
                  ›
                </span>

                <span
                  className="
                    font-bold
                    text-[#09379A]
                  "
                >
                  ملفي التدريبي
                </span>
              </div>

              {/* Title + Academic Year */}

              <div
                className="
                  mt-[6px]

                  flex
                  items-center
                  justify-between
                  gap-[20px]
                "
              >
                <h1
                  className="
                    m-0

                    text-[28px]
                    leading-[40px]

                    font-bold

                    text-[#14213D]
                  "
                >
                  ملفي التدريبي
                </h1>

                <div
                  className="
                    h-[30px]

                    px-[12px]

                    rounded-[15px]

                    border
                    border-[#D8E0EA]

                    bg-[#F8FAFC]

                    flex
                    items-center
                    gap-[7px]

                    text-[11px]
                    font-normal
                    text-[#64748B]

                    whitespace-nowrap
                  "
                >
                  <CheckCircle2
                    size={15}
                    strokeWidth={1.8}
                    className="
                      shrink-0
                      text-[#10B981]
                    "
                  />

                  {trainingData.academicYear}
                </div>
              </div>

              {/* Dashed separator */}

              <div
                className="
                  mt-[14px]

                  border-b
                  border-dashed
                  border-[#D9E2EC]
                "
              />
            </section>

            {/* =================================================
                TRAINING SUMMARY
            ================================================== */}

            <section
              className="
                mt-[24px]

                w-full
                min-h-[145px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                px-[30px]
                py-[28px]

                flex
                items-center
                justify-between

                gap-[24px]

                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Training information */}

              <div
                className="
                  flex
                  items-center
                  gap-[18px]

                  min-w-0
                "
              >
                {/* Organization logo */}

                <div
                  className="
                    w-[64px]
                    h-[64px]

                    shrink-0

                    rounded-[12px]

                    border
                    border-[#E2E8F0]

                    bg-[#F1F5F9]

                    flex
                    flex-col
                    items-center
                    justify-center

                    text-[#09379A]
                  "
                >
                  <Building2
                    size={27}
                    strokeWidth={1.8}
                  />

                  <span
                    className="
                      mt-[2px]

                      text-[7px]
                      leading-[10px]

                      font-bold
                    "
                  >
                    PALTEL
                  </span>

                  <span
                    className="
                      text-[6px]
                      leading-[8px]

                      font-bold
                    "
                  >
                    GROUP
                  </span>
                </div>

                {/* Content */}

                <div
                  className="
                    min-w-0
                  "
                >
                  <h2
                    className="
                      m-0

                      text-[20px]
                      leading-[30px]

                      font-bold

                      text-[#1E293B]
                    "
                  >
                    {trainingData.organization}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[13px]
                      leading-[20px]

                      font-normal

                      text-[#64748B]
                    "
                  >
                    {trainingData.description}
                  </p>

                  {/* Metadata */}

                  <div
                    className="
                      mt-[14px]

                      flex
                      flex-wrap
                      items-center

                      gap-x-[22px]
                      gap-y-[8px]

                      text-[11px]
                      leading-[18px]

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
                      <Clock3
                        size={15}
                        strokeWidth={1.7}
                      />

                      <span>
                        {trainingData.duration}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-[6px]
                      "
                    >
                      <CalendarDays
                        size={15}
                        strokeWidth={1.7}
                      />

                      <span dir="ltr">
                        {trainingData.dateRange}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-[6px]
                      "
                    >
                      <MapPin
                        size={15}
                        strokeWidth={1.7}
                      />

                      <span>
                        {trainingData.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}

              <div
                className="
                  h-[31px]

                  px-[14px]

                  rounded-[16px]

                  border
                  border-[#C8DAFF]

                  bg-[#EFF5FF]

                  flex
                  items-center
                  gap-[7px]

                  shrink-0

                  text-[11px]
                  leading-[18px]

                  font-bold

                  text-[#09379A]
                "
              >
                <span
                  className="
                    w-[7px]
                    h-[7px]

                    rounded-full

                    bg-[#2563EB]
                  "
                />

                {trainingData.status}
              </div>
            </section>

            {/* =================================================
                TABS
            ================================================== */}

            <section
              className="
                mt-[13px]

                w-full

                border-b
                border-[#E2E8F0]
              "
            >
              <div
                className="
                  flex
                  items-center

                  gap-[42px]

                  px-[6px]
                "
              >
                {tabs.map((tab) => {
                  const isActive =
                    activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setActiveTab(tab.id)
                      }
                      className={`
                        relative

                        h-[48px]

                        px-[5px]

                        border-0
                        bg-transparent

                        text-[13px]
                        leading-[20px]

                        cursor-pointer

                        transition-colors

                        ${
                          isActive
                            ? `
                              font-bold
                              text-[#09379A]
                            `
                            : `
                              font-normal
                              text-[#64748B]

                              hover:text-[#09379A]
                            `
                        }
                      `}
                    >
                      {tab.label}

                      {isActive && (
                        <span
                          className="
                            absolute

                            right-0
                            left-0
                            bottom-0

                            h-[3px]

                            rounded-t-full

                            bg-[#09379A]
                          "
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                BASIC TAB
            ================================================== */}

            {activeTab === "basic" && (
              <section
                className="
                  mt-[24px]

                  w-full

                  rounded-[14px]

                  border
                  border-[#DDE5EF]

                  bg-white

                  px-[32px]
                  py-[32px]

                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                {/* Section title */}

                <h2
                  className="
                    m-0

                    text-[20px]
                    leading-[30px]

                    font-medium

                    text-[#334155]
                  "
                >
                  البيانات الأساسية
                </h2>

                {/* Main fields */}

                <div
                  className="
                    mt-[24px]

                    grid
                    grid-cols-1
                    md:grid-cols-2

                    gap-x-[24px]
                    gap-y-[24px]
                  "
                >
                  <InfoField
                    label="اسم الطالب"
                    value={trainingData.studentName}
                  />

                  <InfoField
                    label="الجهة التدريبية"
                    value={trainingData.organization}
                  />

                  <InfoField
                    label="المشرف الأكاديمي"
                    value={
                      trainingData.academicSupervisor
                    }
                  />

                  <InfoField
                    label="المشرف في جهة التدريب"
                    value={
                      trainingData.fieldSupervisor
                    }
                  />

                  <InfoField
                    label="التخصص"
                    value={trainingData.major}
                  />

                  <InfoField
                    label="مكان التدريب"
                    value={
                      trainingData.trainingLocation
                    }
                  />
                </div>

                {/* Training description */}

                <div
                  className="
                    mt-[24px]

                    min-h-[87px]

                    rounded-[12px]

                    border
                    border-[#EEF2F6]

                    bg-[#F8FAFC]

                    px-[20px]
                    py-[15px]
                  "
                >
                  <p
                    className="
                      m-0

                      text-[11px]
                      leading-[18px]

                      font-normal

                      text-[#94A3B8]
                    "
                  >
                    وصف التدريب
                  </p>

                  <p
                    className="
                      m-0
                      mt-[7px]

                      text-[13px]
                      leading-[22px]

                      font-medium

                      text-[#334155]
                    "
                  >
                    {
                      trainingData.trainingDescription
                    }
                  </p>
                </div>
              </section>
            )}

            {/* =================================================
                ATTACHMENTS PLACEHOLDER
            ================================================== */}

            {activeTab === "attachments" && (
              <EmptyTabMessage
                title="المرفقات"
                text="سيتم عرض المرفقات المعتمدة الخاصة بملف التدريب هنا."
              />
            )}

            {/* =================================================
                EVALUATIONS PLACEHOLDER
            ================================================== */}

            {activeTab === "evaluations" && (
              <EmptyTabMessage
                title="التقييمات"
                text="سيتم عرض تقييمات التدريب المعتمدة هنا."
              />
            )}

            {/* =================================================
                CERTIFICATE PLACEHOLDER
            ================================================== */}

            {activeTab === "certificate" && (
              <EmptyTabMessage
                title="الشهادة"
                text="ستظهر شهادة التدريب بعد استكمال واعتماد جميع متطلبات التدريب."
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   INFO FIELD
========================================================= */

function InfoField({ label, value }) {
  return (
    <div
      className="
        min-h-[84px]

        rounded-[12px]

        border
        border-[#EEF2F6]

        bg-[#F8FAFC]

        px-[20px]
        py-[16px]

        flex
        flex-col
        justify-center
      "
    >
      <p
        className="
          m-0

          text-[11px]
          leading-[18px]

          font-normal

          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <p
        className="
          m-0
          mt-[6px]

          text-[14px]
          leading-[22px]

          font-bold

          text-[#334155]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY TAB
========================================================= */

function EmptyTabMessage({ title, text }) {
  return (
    <section
      className="
        mt-[24px]

        min-h-[220px]

        w-full

        rounded-[14px]

        border
        border-[#DDE5EF]

        bg-white

        px-[32px]
        py-[30px]

        flex
        flex-col
        items-center
        justify-center

        text-center
      "
    >
      <h2
        className="
          m-0

          text-[18px]
          font-bold

          text-[#1E293B]
        "
      >
        {title}
      </h2>

      <p
        className="
          m-0
          mt-[7px]

          text-[12px]
          leading-[21px]

          text-[#64748B]
        "
      >
        {text}
      </p>
    </section>
  );
}