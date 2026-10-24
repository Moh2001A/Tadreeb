import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  FilePlus2,
  GraduationCap,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   FIELD TRAINING DATA
========================================================= */

const fieldTrainingData = [
  {
    id: 1,
    studentId: "20231045",
    student: "أحمد خالد محمد",
    college:
      "كلية الهندسة وتكنولوجيا المعلومات",
    major: "هندسة البرمجيات",
    organization: "شركة التقنية المتقدمة",
    period: "الفصل الأول 2026/2027",
    requiredHours: 120,
    completedHours: 120,
    attendanceRate: 96,
    visits: 2,
    evaluation: 89,
    grade: "جيد جدًا",
    status: "مكتمل",
  },

  {
    id: 2,
    studentId: "20230876",
    student: "سارة محمود علي",
    college:
      "كلية الاقتصاد والعلوم الإدارية",
    major: "إدارة الأعمال",
    organization: "بنك فلسطين",
    period: "الفصل الأول 2026/2027",
    requiredHours: 120,
    completedHours: 120,
    attendanceRate: 98,
    visits: 2,
    evaluation: 97,
    grade: "ممتاز",
    status: "مكتمل",
  },

  {
    id: 3,
    studentId: "20231234",
    student: "محمد سامي حسن",
    college:
      "كلية الهندسة وتكنولوجيا المعلومات",
    major: "نظم المعلومات",
    organization:
      "شركة الاتصالات الفلسطينية",
    period: "الفصل الأول 2026/2027",
    requiredHours: 120,
    completedHours: 110,
    attendanceRate: 91,
    visits: 1,
    evaluation: null,
    grade: "—",
    status: "قيد التدريب",
  },

  {
    id: 4,
    studentId: "20230765",
    student: "مريم أحمد علي",
    college:
      "كلية العلوم الطبية التطبيقية",
    major: "التمريض",
    organization: "مستشفى الشفاء",
    period: "الفصل الأول 2026/2027",
    requiredHours: 160,
    completedHours: 160,
    attendanceRate: 100,
    visits: 3,
    evaluation: 97,
    grade: "ممتاز",
    status: "مكتمل",
  },

  {
    id: 5,
    studentId: "20231356",
    student: "لينا محمود حسن",
    college:
      "كلية العلوم الطبية التطبيقية",
    major: "المختبرات الطبية",
    organization: "مركز المختبرات الطبية",
    period: "الفصل الأول 2026/2027",
    requiredHours: 140,
    completedHours: 140,
    attendanceRate: 94,
    visits: 2,
    evaluation: 83,
    grade: "جيد جدًا",
    status: "مكتمل",
  },
];

/* =========================================================
   COURSE DATA
========================================================= */

const courseData = [
  {
    id: 1,
    code: "TR-C-101",
    title: "مهارات الإنعاش القلبي الرئوي",
    category: "صحي",
    trainer: "د. أحمد خالد",
    capacity: 30,
    registered: 26,
    completed: 23,
    passed: 21,
    attendanceRate: 92,
    averageScore: 87,
    certificatesIssued: 18,
    status: "منتهية",
  },

  {
    id: 2,
    code: "TR-C-102",
    title: "تطوير تطبيقات الويب الحديثة",
    category: "تقني",
    trainer: "م. سامر يوسف",
    capacity: 25,
    registered: 18,
    completed: 0,
    passed: 0,
    attendanceRate: 0,
    averageScore: 0,
    certificatesIssued: 0,
    status: "التسجيل مفتوح",
  },

  {
    id: 3,
    code: "TR-C-103",
    title: "مهارات الاتصال المؤسسي",
    category: "إداري",
    trainer: "د. ليلى أحمد",
    capacity: 40,
    registered: 40,
    completed: 0,
    passed: 0,
    attendanceRate: 0,
    averageScore: 0,
    certificatesIssued: 0,
    status: "مكتملة المقاعد",
  },

  {
    id: 4,
    code: "TR-C-104",
    title: "أساسيات البحث العلمي",
    category: "أكاديمي",
    trainer: "د. محمد حسن",
    capacity: 35,
    registered: 32,
    completed: 0,
    passed: 0,
    attendanceRate: 89,
    averageScore: 0,
    certificatesIssued: 0,
    status: "جارية",
  },

  {
    id: 5,
    code: "TR-C-105",
    title: "التسويق الرقمي",
    category: "إداري",
    trainer: "أ. خالد يوسف",
    capacity: 30,
    registered: 28,
    completed: 27,
    passed: 25,
    attendanceRate: 94,
    averageScore: 84,
    certificatesIssued: 24,
    status: "منتهية",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Reports() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("field");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  /* =========================================================
     FIELD STATS
  ========================================================= */

  const fieldStats = useMemo(() => {
    const total =
      fieldTrainingData.length;

    const completed =
      fieldTrainingData.filter(
        (item) =>
          item.status === "مكتمل"
      ).length;

    const active =
      fieldTrainingData.filter(
        (item) =>
          item.status === "قيد التدريب"
      ).length;

    const attendance =
      total > 0
        ? Math.round(
            fieldTrainingData.reduce(
              (sum, item) =>
                sum +
                item.attendanceRate,
              0
            ) / total
          )
        : 0;

    return [
      {
        title: "إجمالي الطلبة",
        value: total,
        description:
          "ضمن بيانات التدريب",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مكتملون",
        value: completed,
        description:
          "أنهوا التدريب بنجاح",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "قيد التدريب",
        value: active,
        description:
          "تدريبهم ما زال مستمرًا",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "متوسط الحضور",
        value: `${attendance}%`,
        description:
          "متوسط الطلبة المعروضين",
        icon: TrendingUp,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, []);

  /* =========================================================
     COURSE STATS
  ========================================================= */

  const courseStats = useMemo(() => {
    const total = courseData.length;

    const totalRegistrations =
      courseData.reduce(
        (sum, item) =>
          sum + item.registered,
        0
      );

    const completed =
      courseData.filter(
        (item) =>
          item.status === "منتهية"
      ).length;

    const certificates =
      courseData.reduce(
        (sum, item) =>
          sum +
          item.certificatesIssued,
        0
      );

    return [
      {
        title: "إجمالي الدورات",
        value: total,
        description:
          "دورات مسجلة بالنظام",
        icon: BookOpen,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "إجمالي التسجيلات",
        value: totalRegistrations,
        description:
          "تسجيلات الطلبة",
        icon: Users,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "دورات منتهية",
        value: completed,
        description:
          "اكتمل تنفيذها",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "شهادات صادرة",
        value: certificates,
        description:
          "شهادات دورات تم إصدارها",
        icon: Award,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, []);

  /* =========================================================
     COLLEGES
  ========================================================= */

  const colleges = useMemo(
    () => [
      ...new Set(
        fieldTrainingData.map(
          (item) => item.college
        )
      ),
    ],
    []
  );

  /* =========================================================
     FIELD FILTER
  ========================================================= */

  const filteredFieldData =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return fieldTrainingData.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.student
              .toLowerCase()
              .includes(query) ||
            item.studentId
              .toLowerCase()
              .includes(query) ||
            item.major
              .toLowerCase()
              .includes(query) ||
            item.organization
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "الكل" ||
            item.status ===
              statusFilter;

          const matchesCollege =
            collegeFilter === "الكل" ||
            item.college ===
              collegeFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesCollege
          );
        }
      );
    }, [
      searchTerm,
      statusFilter,
      collegeFilter,
    ]);

  /* =========================================================
     COURSE FILTER
  ========================================================= */

  const filteredCourseData =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return courseData.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.title
              .toLowerCase()
              .includes(query) ||
            item.code
              .toLowerCase()
              .includes(query) ||
            item.trainer
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "الكل" ||
            item.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      searchTerm,
      statusFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  /* =========================================================
     TAB
  ========================================================= */

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setStatusFilter("الكل");
    setCollegeFilter("الكل");
    setSelectedItem(null);
    setShowDetails(false);
  };

  const statistics =
    activeTab === "field"
      ? fieldStats
      : courseStats;

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
      <Sidebar />

      <div
        className="
          flex
          h-dvh
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        <Header />

        <main
          className="
            min-h-0
            flex-1
            overflow-x-hidden
            overflow-y-auto

            px-4
            pb-8
            pt-5

            sm:px-5
            md:px-6

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[26px]
          "
        >
          <div className="mx-auto w-full max-w-[1180px]">
            {/* ================================================
                BREADCRUMB
            ================================================= */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-[7px]
                text-[11px]
                font-medium
                text-[#64748B]
              "
            >
              <span>
                الرئيسية
              </span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                التقارير والإحصائيات
              </span>
            </div>

            {/* ================================================
                HEADER
            ================================================= */}

            <section
              className="
                mt-[5px]

                flex
                flex-col
                gap-[14px]

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <h1
                  className="
                    m-0

                    text-[25px]
                    font-bold
                    leading-[38px]
                    text-[#14213D]

                    sm:text-[27px]
                  "
                >
                  التقارير والإحصائيات
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]

                    max-w-[760px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  مركز موحد لتحليل أداء
                  التدريب الميداني والدورات
                  التدريبية ومتابعة الإنجاز
                  والحضور والنتائج والشهادات.
                </p>
              </div>

              {/* زر التقرير المخصص */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/reports/custom"
                  )
                }
                className="
                  flex
                  h-[40px]
                  w-fit
                  shrink-0
                  items-center
                  justify-center
                  gap-[7px]

                  rounded-[9px]

                  border-0

                  bg-[#09379A]

                  px-[15px]

                  text-[9px]
                  font-bold
                  text-white

                  transition

                  hover:bg-[#072E81]
                "
              >
                <FilePlus2
                  size={15}
                />

                إنشاء تقرير مخصص
              </button>
            </section>

            {/* ================================================
                TABS
            ================================================= */}

            <section
              className="
                mt-[20px]

                flex
                w-full
                flex-col
                gap-[7px]

                rounded-[13px]

                border
                border-[#DDE5EF]

                bg-white

                p-[6px]

                sm:flex-row
              "
            >
              <TabButton
                active={
                  activeTab === "field"
                }
                icon={Building2}
                label="التدريب الميداني"
                onClick={() =>
                  changeTab("field")
                }
              />

              <TabButton
                active={
                  activeTab === "courses"
                }
                icon={BookOpen}
                label="الدورات التدريبية"
                onClick={() =>
                  changeTab("courses")
                }
              />
            </section>

            {/* ================================================
                STATS
            ================================================= */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[12px]

                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {statistics.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <article
                      key={
                        item.title
                      }
                      className="
                        min-h-[125px]

                        rounded-[14px]

                        border
                        border-[#DDE5EF]

                        bg-white

                        p-[17px]
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div>
                          <p
                            className="
                              m-0
                              text-[10px]
                              text-[#64748B]
                            "
                          >
                            {item.title}
                          </p>

                          <strong
                            className="
                              mt-[8px]
                              block
                              text-[27px]
                              text-[#14213D]
                            "
                          >
                            {item.value}
                          </strong>

                          <p
                            className="
                              m-0
                              mt-[5px]
                              text-[9px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <div
                          className={`
                            flex
                            h-[42px]
                            w-[42px]
                            items-center
                            justify-center

                            rounded-[10px]

                            ${item.bg}
                            ${item.color}
                          `}
                        >
                          <Icon size={20} />
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </section>

            {/* ================================================
                ANALYTICS
            ================================================= */}

            {activeTab === "field" ? (
              <FieldAnalytics />
            ) : (
              <CourseAnalytics />
            )}

            {/* ================================================
                FILTERS
            ================================================= */}

            <section
              className="
                mt-[16px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                p-[15px]
              "
            >
              <div
                className={`
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-2

                  ${
                    activeTab ===
                    "field"
                      ? "xl:grid-cols-3"
                      : ""
                  }
                `}
              >
                <div>
                  <Label>
                    البحث
                  </Label>

                  <div
                    className="
                      flex
                      h-[42px]
                      items-center
                      gap-[8px]

                      rounded-[9px]

                      border
                      border-[#D9E2EC]

                      px-[11px]

                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <Search
                      size={16}
                      className="text-[#94A3B8]"
                    />

                    <input
                      value={
                        searchTerm
                      }
                      onChange={(
                        event
                      ) =>
                        setSearchTerm(
                          event.target
                            .value
                        )
                      }
                      placeholder={
                        activeTab ===
                        "field"
                          ? "الطالب، التخصص أو جهة التدريب..."
                          : "اسم الدورة، الرمز أو المدرب..."
                      }
                      className="
                        min-w-0
                        flex-1

                        border-0
                        bg-transparent

                        font-['Cairo']
                        text-[10px]

                        outline-none
                      "
                    />
                  </div>
                </div>

                {activeTab ===
                  "field" && (
                  <FilterSelect
                    label="الكلية"
                    value={
                      collegeFilter
                    }
                    onChange={
                      setCollegeFilter
                    }
                  >
                    <option value="الكل">
                      كل الكليات
                    </option>

                    {colleges.map(
                      (college) => (
                        <option
                          key={
                            college
                          }
                          value={
                            college
                          }
                        >
                          {college}
                        </option>
                      )
                    )}
                  </FilterSelect>
                )}

                <FilterSelect
                  label={
                    activeTab ===
                    "field"
                      ? "حالة التدريب"
                      : "حالة الدورة"
                  }
                  value={
                    statusFilter
                  }
                  onChange={
                    setStatusFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  {activeTab ===
                  "field" ? (
                    <>
                      <option value="قيد التدريب">
                        قيد التدريب
                      </option>

                      <option value="مكتمل">
                        مكتمل
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="التسجيل مفتوح">
                        التسجيل مفتوح
                      </option>

                      <option value="مكتملة المقاعد">
                        مكتملة المقاعد
                      </option>

                      <option value="جارية">
                        جارية
                      </option>

                      <option value="منتهية">
                        منتهية
                      </option>
                    </>
                  )}
                </FilterSelect>
              </div>
            </section>

            {/* ================================================
                TABLE
            ================================================= */}

            {activeTab === "field" ? (
              <FieldTable
                data={
                  filteredFieldData
                }
                onOpen={
                  openDetails
                }
              />
            ) : (
              <CourseTable
                data={
                  filteredCourseData
                }
                onOpen={
                  openDetails
                }
              />
            )}
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedItem && (
          <>
            <button
              type="button"
              aria-label="إغلاق التفاصيل"
              onClick={() =>
                setShowDetails(
                  false
                )
              }
              className="
                fixed
                inset-0
                z-[90]

                border-0

                bg-[#0F172A]/35
              "
            />

            <aside
              dir="rtl"
              className="
                fixed
                bottom-0
                right-0
                top-0
                z-[100]

                flex
                w-full
                max-w-[620px]
                flex-col

                bg-white

                shadow-[-12px_0_35px_rgba(15,23,42,0.12)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#E2E8F0]

                  px-5
                  py-[17px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0
                      text-[17px]
                      font-bold
                    "
                  >
                    {activeTab ===
                    "field"
                      ? "تفاصيل تقرير الطالب"
                      : "تفاصيل تقرير الدورة"}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    تقرير تشغيلي مختصر
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(
                      false
                    )
                  }
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center

                    rounded-[8px]

                    border-0

                    bg-[#F8FAFC]
                  "
                >
                  <X size={17} />
                </button>
              </div>

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto

                  px-5
                  py-5
                "
              >
                {activeTab ===
                "field" ? (
                  <FieldDetails
                    item={
                      selectedItem
                    }
                  />
                ) : (
                  <CourseDetails
                    item={
                      selectedItem
                    }
                  />
                )}
              </div>
            </aside>
          </>
        )}
    </div>
  );
}

/* =========================================================
   FIELD ANALYTICS
========================================================= */

function FieldAnalytics() {
  const collegeSummary =
    useMemo(() => {
      const map = {};

      fieldTrainingData.forEach(
        (item) => {
          if (!map[item.college]) {
            map[item.college] = 0;
          }

          map[item.college] += 1;
        }
      );

      return Object.entries(map);
    }, []);

  const maxValue = Math.max(
    ...collegeSummary.map(
      ([, value]) => value
    ),
    1
  );

  const studentsWithEvaluation =
    fieldTrainingData.filter(
      (item) =>
        item.evaluation !== null
    );

  const averageEvaluation =
    studentsWithEvaluation.length
      ? Math.round(
          studentsWithEvaluation.reduce(
            (sum, item) =>
              sum +
              item.evaluation,
            0
          ) /
            studentsWithEvaluation.length
        )
      : 0;

  const averageProgress =
    Math.round(
      fieldTrainingData.reduce(
        (sum, item) =>
          sum +
          (item.completedHours /
            item.requiredHours) *
            100,
        0
      ) /
        fieldTrainingData.length
    );

  return (
    <section
      className="
        mt-[16px]

        grid
        grid-cols-1
        gap-[12px]

        xl:grid-cols-2
      "
    >
      <article
        className="
          rounded-[14px]

          border
          border-[#DDE5EF]

          bg-white

          p-[16px]
        "
      >
        <SectionHeader
          icon={BarChart3}
          title="التوزيع حسب الكلية"
          subtitle="عدد الطلبة في بيانات التقرير"
        />

        <div
          className="
            mt-[16px]

            flex
            flex-col
            gap-[11px]
          "
        >
          {collegeSummary.map(
            ([college, value]) => (
              <ProgressRow
                key={college}
                label={college}
                value={value}
                width={
                  (value /
                    maxValue) *
                  100
                }
              />
            )
          )}
        </div>
      </article>

      <article
        className="
          rounded-[14px]

          border
          border-[#DDE5EF]

          bg-white

          p-[16px]
        "
      >
        <SectionHeader
          icon={GraduationCap}
          title="مؤشرات الإنجاز"
          subtitle="قراءة سريعة لحالة التدريب"
        />

        <div
          className="
            mt-[16px]

            grid
            grid-cols-2
            gap-[9px]
          "
        >
          <MetricBox
            label="متوسط الساعات المنجزة"
            value={`${averageProgress}%`}
          />

          <MetricBox
            label="متوسط التقييم"
            value={`${averageEvaluation}%`}
          />

          <MetricBox
            label="إجمالي الزيارات"
            value={fieldTrainingData.reduce(
              (sum, item) =>
                sum + item.visits,
              0
            )}
          />

          <MetricBox
            label="جهات التدريب"
            value={
              new Set(
                fieldTrainingData.map(
                  (item) =>
                    item.organization
                )
              ).size
            }
          />
        </div>
      </article>
    </section>
  );
}

/* =========================================================
   COURSE ANALYTICS
========================================================= */

function CourseAnalytics() {
  const ended =
    courseData.filter(
      (item) =>
        item.status === "منتهية"
    );

  const averageAttendance =
    ended.length
      ? Math.round(
          ended.reduce(
            (sum, item) =>
              sum +
              item.attendanceRate,
            0
          ) / ended.length
        )
      : 0;

  const averageScore =
    ended.length
      ? Math.round(
          ended.reduce(
            (sum, item) =>
              sum +
              item.averageScore,
            0
          ) / ended.length
        )
      : 0;

  const completedTotal =
    ended.reduce(
      (sum, item) =>
        sum + item.completed,
      0
    );

  const passedTotal =
    ended.reduce(
      (sum, item) =>
        sum + item.passed,
      0
    );

  const passRate =
    completedTotal > 0
      ? Math.round(
          (passedTotal /
            completedTotal) *
            100
        )
      : 0;

  return (
    <section
      className="
        mt-[16px]

        grid
        grid-cols-1
        gap-[12px]

        xl:grid-cols-2
      "
    >
      <article
        className="
          rounded-[14px]

          border
          border-[#DDE5EF]

          bg-white

          p-[16px]
        "
      >
        <SectionHeader
          icon={TrendingUp}
          title="أداء الدورات المنتهية"
          subtitle="مؤشرات الأداء الرئيسية"
        />

        <div
          className="
            mt-[16px]

            grid
            grid-cols-2
            gap-[9px]
          "
        >
          <MetricBox
            label="متوسط الحضور"
            value={`${averageAttendance}%`}
          />

          <MetricBox
            label="متوسط النتائج"
            value={`${averageScore}%`}
          />

          <MetricBox
            label="نسبة النجاح"
            value={`${passRate}%`}
          />

          <MetricBox
            label="دورات منتهية"
            value={ended.length}
          />
        </div>
      </article>

      <article
        className="
          rounded-[14px]

          border
          border-[#DDE5EF]

          bg-white

          p-[16px]
        "
      >
        <SectionHeader
          icon={Award}
          title="إصدار الشهادات"
          subtitle="الدورات المنتهية والشهادات"
        />

        <div
          className="
            mt-[16px]

            flex
            flex-col
            gap-[10px]
          "
        >
          {ended.map(
            (course) => {
              const value =
                course.completed > 0
                  ? Math.round(
                      (course.certificatesIssued /
                        course.completed) *
                        100
                    )
                  : 0;

              return (
                <ProgressRow
                  key={course.id}
                  label={
                    course.title
                  }
                  value={`${course.certificatesIssued}/${course.completed}`}
                  width={value}
                />
              );
            }
          )}
        </div>
      </article>
    </section>
  );
}

/* =========================================================
   FIELD TABLE
========================================================= */

function FieldTable({
  data,
  onOpen,
}) {
  return (
    <section
      className="
        mt-[16px]

        overflow-hidden

        rounded-[14px]

        border
        border-[#DDE5EF]

        bg-white
      "
    >
      <TableHeader
        title="تقرير التدريب الميداني"
        count={`${data.length} طالب`}
      />

      <div
        className="
          hidden
          overflow-x-auto

          md:block
        "
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <TableHead>
                الطالب
              </TableHead>

              <TableHead>
                التخصص
              </TableHead>

              <TableHead>
                جهة التدريب
              </TableHead>

              <TableHead>
                الساعات
              </TableHead>

              <TableHead>
                الحضور
              </TableHead>

              <TableHead>
                التقييم
              </TableHead>

              <TableHead>
                الحالة
              </TableHead>

              <TableHead>
                الإجراء
              </TableHead>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (item) => (
                <tr
                  key={item.id}
                  className="
                    border-t
                    border-[#EEF2F7]

                    hover:bg-[#FBFCFE]
                  "
                >
                  <TableCell>
                    <StudentCell
                      name={
                        item.student
                      }
                      id={
                        item.studentId
                      }
                    />
                  </TableCell>

                  <TableCell>
                    {item.major}
                  </TableCell>

                  <TableCell>
                    {
                      item.organization
                    }
                  </TableCell>

                  <TableCell>
                    {
                      item.completedHours
                    }
                    /
                    {
                      item.requiredHours
                    }
                  </TableCell>

                  <TableCell>
                    <AttendanceBadge
                      value={
                        item.attendanceRate
                      }
                    />
                  </TableCell>

                  <TableCell>
                    {item.evaluation !==
                    null
                      ? `${item.evaluation}%`
                      : "—"}
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      status={
                        item.status
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <ViewButton
                      onClick={() =>
                        onOpen(
                          item
                        )
                      }
                    />
                  </TableCell>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <MobileList
        data={data}
        type="field"
        onOpen={onOpen}
      />
    </section>
  );
}

/* =========================================================
   COURSE TABLE
========================================================= */

function CourseTable({
  data,
  onOpen,
}) {
  return (
    <section
      className="
        mt-[16px]

        overflow-hidden

        rounded-[14px]

        border
        border-[#DDE5EF]

        bg-white
      "
    >
      <TableHeader
        title="تقرير الدورات التدريبية"
        count={`${data.length} دورة`}
      />

      <div
        className="
          hidden
          overflow-x-auto

          md:block
        "
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <TableHead>
                الدورة
              </TableHead>

              <TableHead>
                المدرب
              </TableHead>

              <TableHead>
                المسجلون
              </TableHead>

              <TableHead>
                الحضور
              </TableHead>

              <TableHead>
                المتوسط
              </TableHead>

              <TableHead>
                الشهادات
              </TableHead>

              <TableHead>
                الحالة
              </TableHead>

              <TableHead>
                الإجراء
              </TableHead>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (item) => (
                <tr
                  key={item.id}
                  className="
                    border-t
                    border-[#EEF2F7]

                    hover:bg-[#FBFCFE]
                  "
                >
                  <TableCell>
                    <StudentCell
                      name={
                        item.title
                      }
                      id={
                        item.code
                      }
                    />
                  </TableCell>

                  <TableCell>
                    {item.trainer}
                  </TableCell>

                  <TableCell>
                    {
                      item.registered
                    }
                    /
                    {item.capacity}
                  </TableCell>

                  <TableCell>
                    {item.attendanceRate
                      ? `${item.attendanceRate}%`
                      : "—"}
                  </TableCell>

                  <TableCell>
                    {item.averageScore
                      ? `${item.averageScore}%`
                      : "—"}
                  </TableCell>

                  <TableCell>
                    {
                      item.certificatesIssued
                    }
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      status={
                        item.status
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <ViewButton
                      onClick={() =>
                        onOpen(
                          item
                        )
                      }
                    />
                  </TableCell>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <MobileList
        data={data}
        type="course"
        onOpen={onOpen}
      />
    </section>
  );
}

/* =========================================================
   MOBILE LIST
========================================================= */

function MobileList({
  data,
  type,
  onOpen,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-[9px]
        p-[11px]

        md:hidden
      "
    >
      {data.map(
        (item) => (
          <article
            key={item.id}
            className="
              rounded-[10px]

              border
              border-[#E2E8F0]

              bg-[#FAFBFC]

              p-[12px]
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-3
              "
            >
              <div>
                <h3
                  className="
                    m-0
                    text-[11px]
                    font-bold
                    text-[#334155]
                  "
                >
                  {type ===
                  "field"
                    ? item.student
                    : item.title}
                </h3>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  {type ===
                  "field"
                    ? item.studentId
                    : item.code}
                </p>
              </div>

              <StatusBadge
                status={
                  item.status
                }
              />
            </div>

            <div
              className="
                mt-[10px]

                grid
                grid-cols-2
                gap-[8px]

                border-t
                border-[#E2E8F0]

                pt-[9px]
              "
            >
              {type ===
              "field" ? (
                <>
                  <MobileInfo
                    label="التخصص"
                    value={
                      item.major
                    }
                  />

                  <MobileInfo
                    label="الحضور"
                    value={`${item.attendanceRate}%`}
                  />

                  <MobileInfo
                    label="الساعات"
                    value={`${item.completedHours}/${item.requiredHours}`}
                  />

                  <MobileInfo
                    label="التقييم"
                    value={
                      item.evaluation !==
                      null
                        ? `${item.evaluation}%`
                        : "—"
                    }
                  />
                </>
              ) : (
                <>
                  <MobileInfo
                    label="المدرب"
                    value={
                      item.trainer
                    }
                  />

                  <MobileInfo
                    label="المسجلون"
                    value={`${item.registered}/${item.capacity}`}
                  />

                  <MobileInfo
                    label="الحضور"
                    value={
                      item.attendanceRate
                        ? `${item.attendanceRate}%`
                        : "—"
                    }
                  />

                  <MobileInfo
                    label="الشهادات"
                    value={
                      item.certificatesIssued
                    }
                  />
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                onOpen(item)
              }
              className="
                mt-[10px]

                flex
                h-[34px]
                w-full
                items-center
                justify-center
                gap-[5px]

                rounded-[8px]

                border
                border-[#D7E5FF]

                bg-[#F6F9FF]

                text-[8px]
                font-bold
                text-[#09379A]
              "
            >
              <Eye size={13} />

              عرض التفاصيل
            </button>
          </article>
        )
      )}

      {data.length === 0 && (
        <div
          className="
            flex
            min-h-[170px]
            items-center
            justify-center
            text-[9px]
            text-[#94A3B8]
          "
        >
          لا توجد نتائج مطابقة.
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FIELD DETAILS
========================================================= */

function FieldDetails({
  item,
}) {
  return (
    <>
      <div
        className="
          flex
          items-center
          gap-[10px]
        "
      >
        <div
          className="
            flex
            h-[44px]
            w-[44px]
            items-center
            justify-center

            rounded-[10px]

            bg-[#EEF3FF]
            text-[#09379A]
          "
        >
          <GraduationCap
            size={21}
          />
        </div>

        <div>
          <h3
            className="
              m-0
              text-[14px]
              font-bold
              text-[#334155]
            "
          >
            {item.student}
          </h3>

          <p
            className="
              m-0
              mt-[2px]

              text-[9px]
              text-[#94A3B8]
            "
          >
            {item.studentId}
            {" · "}
            {item.major}
          </p>
        </div>
      </div>

      <SectionTitle>
        بيانات التدريب
      </SectionTitle>

      <div
        className="
          grid
          grid-cols-2
          gap-[8px]
        "
      >
        <InfoBox
          label="الكلية"
          value={
            item.college
          }
        />

        <InfoBox
          label="الفترة"
          value={
            item.period
          }
        />

        <InfoBox
          label="جهة التدريب"
          value={
            item.organization
          }
        />

        <InfoBox
          label="الحالة"
          value={
            item.status
          }
        />
      </div>

      <SectionTitle>
        مؤشرات الأداء
      </SectionTitle>

      <div
        className="
          grid
          grid-cols-2
          gap-[8px]
        "
      >
        <InfoBox
          label="الساعات"
          value={`${item.completedHours}/${item.requiredHours}`}
        />

        <InfoBox
          label="الحضور"
          value={`${item.attendanceRate}%`}
        />

        <InfoBox
          label="الزيارات"
          value={
            item.visits
          }
        />

        <InfoBox
          label="التقييم"
          value={
            item.evaluation !==
            null
              ? `${item.evaluation}% - ${item.grade}`
              : "غير مكتمل"
          }
        />
      </div>
    </>
  );
}

/* =========================================================
   COURSE DETAILS
========================================================= */

function CourseDetails({
  item,
}) {
  const occupancy =
    item.capacity > 0
      ? Math.round(
          (item.registered /
            item.capacity) *
            100
        )
      : 0;

  const passRate =
    item.completed > 0
      ? Math.round(
          (item.passed /
            item.completed) *
            100
        )
      : 0;

  return (
    <>
      <div
        className="
          flex
          items-center
          gap-[10px]
        "
      >
        <div
          className="
            flex
            h-[44px]
            w-[44px]
            items-center
            justify-center

            rounded-[10px]

            bg-[#EEF3FF]
            text-[#09379A]
          "
        >
          <BookOpen
            size={21}
          />
        </div>

        <div>
          <h3
            className="
              m-0
              text-[14px]
              font-bold
              text-[#334155]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              m-0
              mt-[2px]

              text-[9px]
              text-[#94A3B8]
            "
          >
            {item.code}
            {" · "}
            {item.category}
          </p>
        </div>
      </div>

      <SectionTitle>
        بيانات الدورة
      </SectionTitle>

      <div
        className="
          grid
          grid-cols-2
          gap-[8px]
        "
      >
        <InfoBox
          label="المدرب"
          value={
            item.trainer
          }
        />

        <InfoBox
          label="الحالة"
          value={
            item.status
          }
        />

        <InfoBox
          label="السعة"
          value={
            item.capacity
          }
        />

        <InfoBox
          label="المسجلون"
          value={
            item.registered
          }
        />
      </div>

      <SectionTitle>
        مؤشرات الأداء
      </SectionTitle>

      <div
        className="
          grid
          grid-cols-2
          gap-[8px]
        "
      >
        <InfoBox
          label="إشغال المقاعد"
          value={`${occupancy}%`}
        />

        <InfoBox
          label="متوسط الحضور"
          value={
            item.attendanceRate
              ? `${item.attendanceRate}%`
              : "—"
          }
        />

        <InfoBox
          label="متوسط النتائج"
          value={
            item.averageScore
              ? `${item.averageScore}%`
              : "—"
          }
        />

        <InfoBox
          label="نسبة النجاح"
          value={
            item.completed
              ? `${passRate}%`
              : "—"
          }
        />

        <InfoBox
          label="أكملوا الدورة"
          value={
            item.completed
          }
        />

        <InfoBox
          label="شهادات صادرة"
          value={
            item.certificatesIssued
          }
        />
      </div>
    </>
  );
}

/* =========================================================
   TAB BUTTON
========================================================= */

function TabButton({
  active,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        min-h-[40px]
        flex-1
        items-center
        justify-center
        gap-[7px]

        rounded-[9px]

        border-0

        px-[14px]

        text-[9px]
        font-bold

        transition

        ${
          active
            ? `
                bg-[#09379A]
                text-white
              `
            : `
                bg-transparent
                text-[#64748B]

                hover:bg-[#F8FAFC]
              `
        }
      `}
    >
      <Icon size={15} />

      {label}
    </button>
  );
}

/* =========================================================
   LABEL
========================================================= */

function Label({
  children,
}) {
  return (
    <label
      className="
        mb-[5px]
        block

        text-[9px]
        font-bold
        text-[#64748B]
      "
    >
      {children}
    </label>
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
      <Label>
        {label}
      </Label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="
          h-[42px]
          w-full

          rounded-[9px]

          border
          border-[#D9E2EC]

          bg-white

          px-[11px]

          font-['Cairo']
          text-[9px]
          text-[#475569]

          outline-none

          focus:border-[#09379A]
          focus:ring-2
          focus:ring-[#09379A]/10
        "
      >
        {children}
      </select>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[9px]
      "
    >
      <div
        className="
          flex
          h-[34px]
          w-[34px]
          shrink-0
          items-center
          justify-center

          rounded-[8px]

          bg-[#EEF3FF]
          text-[#09379A]
        "
      >
        <Icon size={16} />
      </div>

      <div>
        <h3
          className="
            m-0
            text-[11px]
            font-bold
            text-[#334155]
          "
        >
          {title}
        </h3>

        <p
          className="
            m-0
            mt-[2px]
            text-[8px]
            text-[#94A3B8]
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   METRIC BOX
========================================================= */

function MetricBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        p-[11px]
      "
    >
      <p
        className="
          m-0
          text-[8px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <strong
        className="
          mt-[4px]
          block
          text-[16px]
          text-[#334155]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */

function ProgressRow({
  label,
  value,
  width,
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            min-w-0
            truncate
            text-[8px]
            font-medium
            text-[#475569]
          "
        >
          {label}
        </span>

        <span
          className="
            shrink-0
            text-[8px]
            font-bold
            text-[#09379A]
          "
        >
          {value}
        </span>
      </div>

      <div
        className="
          mt-[5px]
          h-[6px]
          overflow-hidden
          rounded-full
          bg-[#EEF2F7]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#09379A]
          "
          style={{
            width: `${Math.min(
              Math.max(
                width,
                0
              ),
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({
  title,
  count,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4

        border-b
        border-[#EEF2F7]

        px-[16px]
        py-[13px]
      "
    >
      <div>
        <h2
          className="
            m-0
            text-[13px]
            font-bold
            text-[#334155]
          "
        >
          {title}
        </h2>

        <p
          className="
            m-0
            mt-[2px]
            text-[8px]
            text-[#94A3B8]
          "
        >
          البيانات المطابقة للفلاتر
        </p>
      </div>

      <span
        className="
          rounded-full
          bg-[#F1F5F9]
          px-[9px]
          py-[5px]
          text-[8px]
          font-bold
          text-[#64748B]
        "
      >
        {count}
      </span>
    </div>
  );
}

/* =========================================================
   TABLE
========================================================= */

function TableHead({
  children,
}) {
  return (
    <th
      className="
        whitespace-nowrap

        px-[12px]
        py-[11px]

        text-right
        text-[8px]
        font-bold
        text-[#64748B]
      "
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
}) {
  return (
    <td
      className="
        px-[12px]
        py-[11px]

        align-middle

        text-[9px]
        text-[#475569]
      "
    >
      {children}
    </td>
  );
}

/* =========================================================
   STUDENT CELL
========================================================= */

function StudentCell({
  name,
  id,
}) {
  return (
    <div>
      <p
        className="
          m-0
          whitespace-nowrap
          text-[9px]
          font-bold
          text-[#334155]
        "
      >
        {name}
      </p>

      <p
        className="
          m-0
          mt-[2px]
          text-[8px]
          text-[#94A3B8]
        "
      >
        {id}
      </p>
    </div>
  );
}

/* =========================================================
   ATTENDANCE
========================================================= */

function AttendanceBadge({
  value,
}) {
  let style =
    "bg-[#ECFDF3] text-[#15803D]";

  if (value < 90) {
    style =
      "bg-[#FFF1F2] text-[#BE123C]";
  } else if (value < 95) {
    style =
      "bg-[#FFF7ED] text-[#C2410C]";
  }

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-[8px]
        py-[4px]
        text-[8px]
        font-bold

        ${style}
      `}
    >
      {value}%
    </span>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}) {
  const styles = {
    مكتمل:
      "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]",

    "قيد التدريب":
      "border-[#D7E5FF] bg-[#EEF4FF] text-[#09379A]",

    منتهية:
      "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]",

    جارية:
      "border-[#D7E5FF] bg-[#EEF4FF] text-[#09379A]",

    "التسجيل مفتوح":
      "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]",

    "مكتملة المقاعد":
      "border-[#FED7AA] bg-[#FFF7ED] text-[#C2410C]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap

        rounded-full

        border

        px-[8px]
        py-[4px]

        text-[8px]
        font-bold

        ${
          styles[status] ||
          "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   VIEW BUTTON
========================================================= */

function ViewButton({
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="عرض التفاصيل"
      className="
        flex
        h-[31px]
        w-[31px]
        items-center
        justify-center

        rounded-[7px]

        border
        border-[#D7E5FF]

        bg-[#F6F9FF]

        text-[#09379A]

        transition

        hover:bg-[#EEF4FF]
      "
    >
      <Eye size={14} />
    </button>
  );
}

/* =========================================================
   MOBILE INFO
========================================================= */

function MobileInfo({
  label,
  value,
}) {
  return (
    <div>
      <p
        className="
          m-0
          text-[7px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <p
        className="
          m-0
          mt-[2px]
          text-[8px]
          font-bold
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  children,
}) {
  return (
    <h4
      className="
        m-0
        mb-[9px]
        mt-[20px]

        text-[10px]
        font-bold
        text-[#334155]
      "
    >
      {children}
    </h4>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E2E8F0]

        bg-[#F8FAFC]

        p-[11px]
      "
    >
      <p
        className="
          m-0
          text-[8px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <p
        className="
          m-0
          mt-[3px]

          break-words

          text-[9px]
          font-bold
          leading-[17px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}