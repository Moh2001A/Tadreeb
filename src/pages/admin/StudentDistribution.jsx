import { useMemo, useState } from "react";

import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  GraduationCap,
  Route,
  Save,
  Search,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   TRAINING PERIODS
========================================================= */

const trainingPeriods = [
  {
    id: 1,
    name: "فترة التدريب الميداني - الفصل الأول",
    code: "TP-2026-01",
    semester: "الفصل الأول",
    academicYear: "2026/2027",
    status: "مفتوحة",
  },

  {
    id: 2,
    name: "فترة التدريب السريري - الفصل الأول",
    code: "TP-2026-02",
    semester: "الفصل الأول",
    academicYear: "2026/2027",
    status: "جارية",
  },

  {
    id: 3,
    name: "فترة التدريب الصيفي",
    code: "TP-2026-03",
    semester: "الفصل الصيفي",
    academicYear: "2025/2026",
    status: "مغلقة",
  },
];

/* =========================================================
   ORGANIZATIONS
========================================================= */

const organizations = [
  {
    id: 1,
    name: "شركة التقنية المتقدمة",
    specialization: "هندسة البرمجيات",
    capacity: 10,
    assigned: 6,

    opportunities: [
      "مطور برمجيات متدرب",
      "تطوير تطبيقات الويب",
    ],

    fieldSupervisor: "م. محمد حمدي",
  },

  {
    id: 2,
    name: "شركة الاتصالات الفلسطينية",
    specialization: "نظم المعلومات",
    capacity: 8,
    assigned: 5,

    opportunities: [
      "دعم الأنظمة والشبكات",
      "تحليل نظم",
    ],

    fieldSupervisor: "م. خالد يوسف",
  },

  {
    id: 3,
    name: "بنك فلسطين",
    specialization: "إدارة الأعمال",
    capacity: 12,
    assigned: 8,

    opportunities: [
      "تدريب إداري ومالي",
      "خدمة العملاء",
    ],

    fieldSupervisor: "أ. رامي حسن",
  },

  {
    id: 4,
    name: "مدرسة الأزهر النموذجية",
    specialization: "تعليم أساسي",
    capacity: 15,
    assigned: 10,

    opportunities: [
      "التربية العملية",
    ],

    fieldSupervisor: "أ. خالد النجار",
  },

  {
    id: 5,
    name: "مستشفى الشفاء",
    specialization: "التمريض",
    capacity: 20,
    assigned: 14,

    opportunities: [
      "التدريب السريري",
    ],

    fieldSupervisor: "أ. محمود حسن",
  },

  {
    id: 6,
    name: "مركز المختبرات الطبية",
    specialization: "المختبرات الطبية",
    capacity: 12,
    assigned: 7,

    opportunities: [
      "التدريب السريري في المختبرات",
    ],

    fieldSupervisor: "أ. خالد إبراهيم",
  },

  {
    id: 7,
    name: "مؤسسة الإبداع الرقمي",
    specialization: "الإعلام",
    capacity: 8,
    assigned: 4,

    opportunities: [
      "إنتاج المحتوى الرقمي",
      "الإعلام الرقمي",
    ],

    fieldSupervisor: "م. سارة محمود",
  },
];

/* =========================================================
   ACADEMIC SUPERVISORS
========================================================= */

const academicSupervisors = [
  {
    id: 1,
    name: "د. سامر يوسف",
    specialization: "هندسة البرمجيات",
  },

  {
    id: 2,
    name: "د. أحمد نصار",
    specialization: "نظم المعلومات",
  },

  {
    id: 3,
    name: "د. ليلى أحمد",
    specialization: "إدارة الأعمال",
  },

  {
    id: 4,
    name: "د. منى عبد الرحمن",
    specialization: "تعليم أساسي",
  },

  {
    id: 5,
    name: "د. سارة خليل",
    specialization: "التمريض",
  },

  {
    id: 6,
    name: "د. خالد يوسف",
    specialization: "المختبرات الطبية",
  },

  {
    id: 7,
    name: "د. خالد حسن",
    specialization: "الإعلام",
  },
];

/* =========================================================
   STUDENTS
========================================================= */

const initialStudents = [
  {
    id: 1,
    studentId: "20231045",
    name: "أحمد خالد محمد",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "هندسة البرمجيات",

    eligibility: "مؤهل",

    requiredHours: 120,

    status: "موزع",

    trainingPeriodId: 1,

    organizationId: 1,
    organization: "شركة التقنية المتقدمة",

    opportunity: "مطور برمجيات متدرب",

    academicSupervisor:
      "د. سامر يوسف",

    fieldSupervisor:
      "م. محمد حمدي",
  },

  {
    id: 2,
    studentId: "20230876",
    name: "سارة محمود علي",

    college: "كلية الاقتصاد والعلوم الإدارية",
    major: "إدارة الأعمال",

    eligibility: "مؤهل",

    requiredHours: 120,

    status: "بانتظار التوزيع",

    trainingPeriodId: 1,

    organizationId: null,
    organization: "—",

    opportunity: "—",

    academicSupervisor:
      "د. ليلى أحمد",

    fieldSupervisor: "—",
  },

  {
    id: 3,
    studentId: "20231234",
    name: "محمد سامي حسن",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "نظم المعلومات",

    eligibility: "مؤهل",

    requiredHours: 120,

    status: "موزع",

    trainingPeriodId: 1,

    organizationId: 2,
    organization:
      "شركة الاتصالات الفلسطينية",

    opportunity:
      "دعم الأنظمة والشبكات",

    academicSupervisor:
      "د. أحمد نصار",

    fieldSupervisor:
      "م. خالد يوسف",
  },

  {
    id: 4,
    studentId: "20230987",
    name: "ريم أحمد يوسف",

    college: "كلية التربية",
    major: "تعليم أساسي",

    eligibility: "غير مؤهل",

    requiredHours: 150,

    status: "غير قابل للتوزيع",

    trainingPeriodId: 1,

    organizationId: null,
    organization: "—",

    opportunity: "—",

    academicSupervisor:
      "د. منى عبد الرحمن",

    fieldSupervisor: "—",
  },

  {
    id: 5,
    studentId: "20230765",
    name: "مريم أحمد علي",

    college: "كلية العلوم الطبية التطبيقية",
    major: "التمريض",

    eligibility: "مكتمل التدريب",

    requiredHours: 160,

    status: "مكتمل",

    trainingPeriodId: 2,

    organizationId: 5,
    organization: "مستشفى الشفاء",

    opportunity:
      "التدريب السريري",

    academicSupervisor:
      "د. سارة خليل",

    fieldSupervisor:
      "أ. محمود حسن",
  },

  {
    id: 6,
    studentId: "20231356",
    name: "لينا محمود حسن",

    college: "كلية العلوم الطبية التطبيقية",
    major: "المختبرات الطبية",

    eligibility: "يحتاج مراجعة",

    requiredHours: 140,

    status: "غير قابل للتوزيع",

    trainingPeriodId: 2,

    organizationId: null,
    organization: "—",

    opportunity: "—",

    academicSupervisor:
      "د. خالد يوسف",

    fieldSupervisor: "—",
  },

  {
    id: 7,
    studentId: "20231587",
    name: "عمر يوسف سليمان",

    college: "كلية الآداب والعلوم الإنسانية",
    major: "الإعلام",

    eligibility: "غير مؤهل",

    requiredHours: 100,

    status: "غير قابل للتوزيع",

    trainingPeriodId: 1,

    organizationId: null,
    organization: "—",

    opportunity: "—",

    academicSupervisor:
      "د. خالد حسن",

    fieldSupervisor: "—",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function StudentDistribution() {
  const [students, setStudents] =
    useState(initialStudents);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [majorFilter, setMajorFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [periodFilter, setPeriodFilter] =
    useState("الكل");

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [
    showDistributionModal,
    setShowDistributionModal,
  ] = useState(false);

  const [
    selectedPeriodId,
    setSelectedPeriodId,
  ] = useState("");

  const [
    selectedOrganizationId,
    setSelectedOrganizationId,
  ] = useState("");

  const [
    selectedOpportunity,
    setSelectedOpportunity,
  ] = useState("");

  const [
    selectedAcademicSupervisor,
    setSelectedAcademicSupervisor,
  ] = useState("");

  /* =========================================================
     OPTIONS
  ========================================================= */

  const colleges = useMemo(
    () => [
      ...new Set(
        students.map(
          (student) => student.college
        )
      ),
    ],
    [students]
  );

  const majors = useMemo(
    () => [
      ...new Set(
        students.map(
          (student) => student.major
        )
      ),
    ],
    [students]
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      students.length;

    const waiting =
      students.filter(
        (student) =>
          student.status ===
          "بانتظار التوزيع"
      ).length;

    const distributed =
      students.filter(
        (student) =>
          student.status ===
          "موزع"
      ).length;

    const unavailable =
      students.filter(
        (student) =>
          student.status ===
          "غير قابل للتوزيع"
      ).length;

    return [
      {
        title: "إجمالي الطلبة",
        value: total,
        description:
          "ضمن فترات التدريب",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "بانتظار التوزيع",
        value: waiting,
        description:
          "مؤهلون ولم يتم توزيعهم",
        icon: Route,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "تم توزيعهم",
        value: distributed,
        description:
          "لديهم جهة تدريب",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "غير قابلين للتوزيع",
        value: unavailable,
        description:
          "الأهلية غير مكتملة",
        icon: AlertTriangle,
        bg: "bg-[#FFF1F2]",
        color: "text-[#BE123C]",
      },
    ];
  }, [students]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return students.filter(
        (student) => {
          const matchesSearch =
            !query ||
            student.name
              .toLowerCase()
              .includes(query) ||
            student.studentId
              .toLowerCase()
              .includes(query) ||
            student.major
              .toLowerCase()
              .includes(query);

          const matchesCollege =
            collegeFilter ===
              "الكل" ||
            student.college ===
              collegeFilter;

          const matchesMajor =
            majorFilter ===
              "الكل" ||
            student.major ===
              majorFilter;

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            student.status ===
              statusFilter;

          const matchesPeriod =
            periodFilter ===
              "الكل" ||
            Number(periodFilter) ===
              student.trainingPeriodId;

          return (
            matchesSearch &&
            matchesCollege &&
            matchesMajor &&
            matchesStatus &&
            matchesPeriod
          );
        }
      );
    }, [
      students,
      searchTerm,
      collegeFilter,
      majorFilter,
      statusFilter,
      periodFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  /* =========================================================
     DISTRIBUTION MODAL
  ========================================================= */

  const openDistribution = (
    student
  ) => {
    if (
      student.eligibility !==
      "مؤهل"
    ) {
      return;
    }

    setSelectedStudent(student);

    setSelectedPeriodId(
      student.trainingPeriodId
        ? String(
            student.trainingPeriodId
          )
        : ""
    );

    setSelectedOrganizationId(
      student.organizationId
        ? String(
            student.organizationId
          )
        : ""
    );

    setSelectedOpportunity(
      student.opportunity !== "—"
        ? student.opportunity
        : ""
    );

    setSelectedAcademicSupervisor(
      student.academicSupervisor !==
        "—"
        ? student.academicSupervisor
        : ""
    );

    setShowDetails(false);

    setShowDistributionModal(true);
  };

  /* =========================================================
     COMPATIBLE ORGANIZATIONS
  ========================================================= */

  const compatibleOrganizations =
    useMemo(() => {
      if (!selectedStudent) {
        return [];
      }

      return organizations.filter(
        (organization) =>
          organization.specialization ===
          selectedStudent.major
      );
    }, [selectedStudent]);

  const selectedOrganization =
    useMemo(
      () =>
        organizations.find(
          (organization) =>
            organization.id ===
            Number(
              selectedOrganizationId
            )
        ) || null,
      [selectedOrganizationId]
    );

  const compatibleAcademicSupervisors =
    useMemo(() => {
      if (!selectedStudent) {
        return [];
      }

      return academicSupervisors.filter(
        (supervisor) =>
          supervisor.specialization ===
          selectedStudent.major
      );
    }, [selectedStudent]);

  /* =========================================================
     SAVE DISTRIBUTION
  ========================================================= */

  const saveDistribution = () => {
    if (
      !selectedStudent ||
      !selectedPeriodId ||
      !selectedOrganization ||
      !selectedOpportunity ||
      !selectedAcademicSupervisor
    ) {
      return;
    }

    if (
      selectedStudent.eligibility !==
      "مؤهل"
    ) {
      return;
    }

    if (
      selectedOrganization.assigned >=
      selectedOrganization.capacity
    ) {
      return;
    }

    setStudents((previous) =>
      previous.map((student) =>
        student.id ===
        selectedStudent.id
          ? {
              ...student,

              trainingPeriodId:
                Number(
                  selectedPeriodId
                ),

              organizationId:
                selectedOrganization.id,

              organization:
                selectedOrganization.name,

              opportunity:
                selectedOpportunity,

              academicSupervisor:
                selectedAcademicSupervisor,

              fieldSupervisor:
                selectedOrganization.fieldSupervisor,

              status: "موزع",
            }
          : student
      )
    );

    setShowDistributionModal(
      false
    );

    setSelectedStudent(null);
  };

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
            {/* BREADCRUMB */}

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

              <span>
                التدريب الميداني
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
                توزيع الطلبة
              </span>
            </div>

            {/* HEADER */}

            <section className="mt-[5px]">
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
                توزيع الطلبة
              </h1>

              <p
                className="
                  m-0
                  mt-[3px]

                  max-w-[850px]

                  text-[11px]
                  leading-[21px]
                  text-[#64748B]

                  sm:text-[12px]
                "
              >
                توزيع الطلبة المؤهلين
                على جهات وفرص التدريب
                المناسبة ضمن الفترة التدريبية
                الحالية، مع تعيين المشرف
                الأكاديمي ومشرف جهة التدريب.
              </p>
            </section>

            {/* STATS */}

            <section
              className="
                mt-[22px]

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
                      key={item.title}
                      className="
                        min-h-[128px]

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
                          <Icon
                            size={20}
                          />
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </section>

            {/* FILTERS */}

            <section
              className="
                mt-[18px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                p-[15px]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-2

                  xl:grid-cols-5
                "
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
                      placeholder="الاسم أو الرقم الجامعي..."
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

                <FilterSelect
                  label="التخصص"
                  value={
                    majorFilter
                  }
                  onChange={
                    setMajorFilter
                  }
                >
                  <option value="الكل">
                    كل التخصصات
                  </option>

                  {majors.map(
                    (major) => (
                      <option
                        key={major}
                        value={major}
                      >
                        {major}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="الفترة التدريبية"
                  value={
                    periodFilter
                  }
                  onChange={
                    setPeriodFilter
                  }
                >
                  <option value="الكل">
                    كل الفترات
                  </option>

                  {trainingPeriods.map(
                    (period) => (
                      <option
                        key={period.id}
                        value={
                          period.id
                        }
                      >
                        {period.name}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="حالة التوزيع"
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

                  <option value="بانتظار التوزيع">
                    بانتظار التوزيع
                  </option>

                  <option value="موزع">
                    موزع
                  </option>

                  <option value="غير قابل للتوزيع">
                    غير قابل للتوزيع
                  </option>

                  <option value="مكتمل">
                    مكتمل
                  </option>
                </FilterSelect>
              </div>
            </section>

            {/* TABLE */}

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
              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#EEF2F7]

                  px-[18px]
                  py-[15px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[14px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    طلبة التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    التوزيع متاح فقط
                    للطلبة المؤهلين
                  </p>
                </div>

                <span
                  className="
                    rounded-[8px]

                    bg-[#F8FAFC]

                    px-[10px]
                    py-[7px]

                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  {
                    filteredStudents.length
                  }{" "}
                  طالب
                </span>
              </div>

              {/* DESKTOP */}

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
                        الأهلية
                      </TableHead>

                      <TableHead>
                        الفترة
                      </TableHead>

                      <TableHead>
                        الجهة / الفرصة
                      </TableHead>

                      <TableHead>
                        المشرف الأكاديمي
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
                    {filteredStudents.map(
                      (student) => {
                        const period =
                          trainingPeriods.find(
                            (item) =>
                              item.id ===
                              student.trainingPeriodId
                          );

                        return (
                          <tr
                            key={
                              student.id
                            }
                            className="
                              border-t
                              border-[#EEF2F7]

                              hover:bg-[#FBFCFE]
                            "
                          >
                            <TableCell>
                              <div className="min-w-[150px]">
                                <p
                                  className="
                                    m-0

                                    text-[10px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {
                                    student.name
                                  }
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {
                                    student.studentId
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[130px]">
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    font-medium
                                    text-[#475569]
                                  "
                                >
                                  {
                                    student.major
                                  }
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {
                                    student.requiredHours
                                  }{" "}
                                  ساعة
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <EligibilityBadge
                                status={
                                  student.eligibility
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[150px]">
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    text-[#475569]
                                  "
                                >
                                  {period
                                    ?.semester ||
                                    "—"}
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {period
                                    ?.academicYear ||
                                    "—"}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[160px]">
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    font-medium
                                    text-[#475569]
                                  "
                                >
                                  {
                                    student.organization
                                  }
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {
                                    student.opportunity
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  text-[9px]
                                  text-[#475569]
                                "
                              >
                                {
                                  student.academicSupervisor
                                }
                              </span>
                            </TableCell>

                            <TableCell>
                              <DistributionBadge
                                status={
                                  student.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  gap-[6px]
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    openDetails(
                                      student
                                    )
                                  }
                                  className="
                                    flex
                                    h-[32px]
                                    items-center
                                    gap-[5px]

                                    rounded-[7px]

                                    border
                                    border-[#DCE5F0]

                                    bg-white

                                    px-[8px]

                                    text-[9px]
                                    font-bold
                                    text-[#09379A]
                                  "
                                >
                                  <Eye
                                    size={
                                      14
                                    }
                                  />

                                  عرض
                                </button>

                                {student.eligibility ===
                                  "مؤهل" &&
                                  student.status !==
                                    "مكتمل" && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openDistribution(
                                          student
                                        )
                                      }
                                      className="
                                        flex
                                        h-[32px]
                                        items-center

                                        rounded-[7px]

                                        border-0

                                        bg-[#09379A]

                                        px-[9px]

                                        text-[9px]
                                        font-bold
                                        text-white
                                      "
                                    >
                                      {student.status ===
                                      "موزع"
                                        ? "تعديل"
                                        : "توزيع"}
                                    </button>
                                  )}
                              </div>
                            </TableCell>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div
                className="
                  flex
                  flex-col
                  gap-[9px]

                  p-[12px]

                  md:hidden
                "
              >
                {filteredStudents.map(
                  (student) => (
                    <article
                      key={student.id}
                      className="
                        rounded-[11px]

                        border
                        border-[#E7ECF2]

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
                          <p
                            className="
                              m-0

                              text-[11px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {
                              student.name
                            }
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              student.studentId
                            }
                            {" · "}
                            {
                              student.major
                            }
                          </span>
                        </div>

                        <DistributionBadge
                          status={
                            student.status
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[10px]

                          grid
                          grid-cols-2
                          gap-[9px]

                          border-t
                          border-[#E7ECF2]

                          pt-[10px]
                        "
                      >
                        <MobileInfo
                          label="الأهلية"
                          value={
                            student.eligibility
                          }
                        />

                        <MobileInfo
                          label="جهة التدريب"
                          value={
                            student.organization
                          }
                        />

                        <MobileInfo
                          label="الفرصة"
                          value={
                            student.opportunity
                          }
                        />

                        <MobileInfo
                          label="المشرف"
                          value={
                            student.academicSupervisor
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[11px]

                          flex
                          gap-[7px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              student
                            )
                          }
                          className="
                            flex
                            h-[35px]
                            flex-1
                            items-center
                            justify-center
                            gap-[5px]

                            rounded-[8px]

                            border
                            border-[#D7E5FF]

                            bg-[#F6F9FF]

                            text-[9px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          <Eye
                            size={14}
                          />

                          التفاصيل
                        </button>

                        {student.eligibility ===
                          "مؤهل" &&
                          student.status !==
                            "مكتمل" && (
                            <button
                              type="button"
                              onClick={() =>
                                openDistribution(
                                  student
                                )
                              }
                              className="
                                h-[35px]

                                rounded-[8px]

                                border-0

                                bg-[#09379A]

                                px-[14px]

                                text-[9px]
                                font-bold
                                text-white
                              "
                            >
                              {student.status ===
                              "موزع"
                                ? "تعديل"
                                : "توزيع"}
                            </button>
                          )}
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* CAPACITY */}

            <section
              className="
                mt-[16px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                p-[16px]
              "
            >
              <h2
                className="
                  m-0

                  text-[14px]
                  font-bold
                  text-[#1E293B]
                "
              >
                الطاقة الاستيعابية
                لجهات التدريب
              </h2>

              <p
                className="
                  m-0
                  mt-[2px]

                  text-[9px]
                  text-[#94A3B8]
                "
              >
                متابعة المقاعد المتاحة
                قبل تنفيذ عمليات التوزيع
              </p>

              <div
                className="
                  mt-[14px]

                  grid
                  grid-cols-1
                  gap-[10px]

                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {organizations.map(
                  (organization) => {
                    const percentage =
                      Math.round(
                        (organization.assigned /
                          organization.capacity) *
                          100
                      );

                    return (
                      <article
                        key={
                          organization.id
                        }
                        className="
                          rounded-[10px]

                          border
                          border-[#E7ECF2]

                          bg-[#FAFBFC]

                          p-[11px]
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
                            <p
                              className="
                                m-0

                                text-[10px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {
                                organization.name
                              }
                            </p>

                            <span
                              className="
                                mt-[2px]
                                block

                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              {
                                organization.specialization
                              }
                            </span>
                          </div>

                          <span
                            className="
                              text-[9px]
                              font-bold
                              text-[#09379A]
                            "
                          >
                            {
                              organization.assigned
                            }
                            /
                            {
                              organization.capacity
                            }
                          </span>
                        </div>

                        <div
                          className="
                            mt-[9px]

                            h-[6px]

                            overflow-hidden

                            rounded-full

                            bg-[#E2E8F0]
                          "
                        >
                          <div
                            className={`
                              h-full
                              rounded-full

                              ${
                                percentage >=
                                90
                                  ? "bg-[#EA580C]"
                                  : "bg-[#09379A]"
                              }
                            `}
                            style={{
                              width: `${Math.min(
                                percentage,
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <p
                          className="
                            m-0
                            mt-[6px]

                            text-[8px]
                            text-[#64748B]
                          "
                        >
                          متاح{" "}
                          {Math.max(
                            organization.capacity -
                              organization.assigned,
                            0
                          )}{" "}
                          مقاعد
                        </p>
                      </article>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* DETAILS */}

      {showDetails &&
        selectedStudent && (
          <>
            <div
              onClick={() =>
                setShowDetails(false)
              }
              className="
                fixed
                inset-0
                z-[90]

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
                max-w-[600px]
                flex-col

                bg-white
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
                    تفاصيل التوزيع
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {
                      selectedStudent.studentId
                    }
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
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
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
                        {
                          selectedStudent.name
                        }
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[2px]

                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        {
                          selectedStudent.major
                        }
                      </p>
                    </div>
                  </div>

                  <EligibilityBadge
                    status={
                      selectedStudent.eligibility
                    }
                  />
                </div>

                <SectionTitle>
                  البيانات الأكاديمية
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
                      selectedStudent.college
                    }
                  />

                  <InfoBox
                    label="ساعات التدريب"
                    value={`${selectedStudent.requiredHours} ساعة`}
                  />
                </div>

                <SectionTitle>
                  الفترة التدريبية
                </SectionTitle>

                {trainingPeriods
                  .filter(
                    (period) =>
                      period.id ===
                      selectedStudent.trainingPeriodId
                  )
                  .map(
                    (period) => (
                      <div
                        key={
                          period.id
                        }
                        className="
                          rounded-[10px]

                          border
                          border-[#D7E5FF]

                          bg-[#F6F9FF]

                          p-[12px]
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            gap-[8px]
                          "
                        >
                          <CalendarDays
                            size={17}
                            className="
                              mt-[1px]
                              text-[#09379A]
                            "
                          />

                          <div>
                            <p
                              className="
                                m-0

                                text-[10px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {
                                period.name
                              }
                            </p>

                            <p
                              className="
                                m-0
                                mt-[2px]

                                text-[8px]
                                text-[#64748B]
                              "
                            >
                              {
                                period.semester
                              }
                              {" · "}
                              {
                                period.academicYear
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                <SectionTitle>
                  بيانات التوزيع
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="جهة التدريب"
                    value={
                      selectedStudent.organization
                    }
                  />

                  <InfoBox
                    label="الفرصة"
                    value={
                      selectedStudent.opportunity
                    }
                  />

                  <InfoBox
                    label="المشرف الأكاديمي"
                    value={
                      selectedStudent.academicSupervisor
                    }
                  />

                  <InfoBox
                    label="مشرف الجهة"
                    value={
                      selectedStudent.fieldSupervisor
                    }
                  />
                </div>

                {selectedStudent.eligibility !==
                  "مؤهل" &&
                  selectedStudent.status !==
                    "مكتمل" && (
                    <div
                      className="
                        mt-[18px]

                        flex
                        items-start
                        gap-[8px]

                        rounded-[10px]

                        border
                        border-[#FED7AA]

                        bg-[#FFF7ED]

                        p-[12px]
                      "
                    >
                      <AlertTriangle
                        size={17}
                        className="
                          mt-[1px]
                          shrink-0
                          text-[#C2410C]
                        "
                      />

                      <p
                        className="
                          m-0

                          text-[9px]
                          leading-[18px]
                          text-[#9A3412]
                        "
                      >
                        لا يمكن توزيع هذا
                        الطالب حتى تصبح
                        حالة الأهلية
                        "مؤهل".
                      </p>
                    </div>
                  )}
              </div>

              {selectedStudent.eligibility ===
                "مؤهل" &&
                selectedStudent.status !==
                  "مكتمل" && (
                  <div
                    className="
                      border-t
                      border-[#E2E8F0]

                      px-5
                      py-[14px]
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openDistribution(
                          selectedStudent
                        )
                      }
                      className="
                        flex
                        min-h-[40px]
                        w-full
                        items-center
                        justify-center
                        gap-[6px]

                        rounded-[8px]

                        border-0

                        bg-[#09379A]

                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      <Route
                        size={14}
                      />

                      {selectedStudent.status ===
                      "موزع"
                        ? "تعديل التوزيع"
                        : "توزيع الطالب"}
                    </button>
                  </div>
                )}
            </aside>
          </>
        )}

      {/* DISTRIBUTION MODAL */}

      {showDistributionModal &&
        selectedStudent && (
          <div
            onClick={() =>
              setShowDistributionModal(
                false
              )
            }
            className="
              fixed
              inset-0
              z-[120]

              flex
              items-center
              justify-center

              overflow-y-auto

              bg-[#0F172A]/45

              px-4
              py-6
            "
          >
            <div
              dir="rtl"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                max-h-[92dvh]
                w-full
                max-w-[700px]
                overflow-y-auto

                rounded-[16px]

                bg-white
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
                  py-[16px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[16px]
                      font-bold
                    "
                  >
                    {selectedStudent.status ===
                    "موزع"
                      ? "تعديل توزيع الطالب"
                      : "توزيع الطالب"}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {
                      selectedStudent.name
                    }
                    {" · "}
                    {
                      selectedStudent.major
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDistributionModal(
                      false
                    )
                  }
                  className="
                    flex
                    h-[32px]
                    w-[32px]
                    items-center
                    justify-center

                    rounded-[8px]

                    border-0

                    bg-[#F8FAFC]
                  "
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[14px]

                  px-5
                  py-5

                  sm:grid-cols-2
                "
              >
                <FormSelect
                  label="الفترة التدريبية"
                  value={
                    selectedPeriodId
                  }
                  onChange={
                    setSelectedPeriodId
                  }
                >
                  <option value="">
                    اختر الفترة
                  </option>

                  {trainingPeriods
                    .filter(
                      (period) =>
                        period.status !==
                        "مغلقة"
                    )
                    .map(
                      (period) => (
                        <option
                          key={
                            period.id
                          }
                          value={
                            period.id
                          }
                        >
                          {
                            period.name
                          }
                        </option>
                      )
                    )}
                </FormSelect>

                <FormSelect
                  label="جهة التدريب"
                  value={
                    selectedOrganizationId
                  }
                  onChange={(value) => {
                    setSelectedOrganizationId(
                      value
                    );

                    setSelectedOpportunity(
                      ""
                    );
                  }}
                >
                  <option value="">
                    اختر الجهة
                  </option>

                  {compatibleOrganizations.map(
                    (organization) => (
                      <option
                        key={
                          organization.id
                        }
                        value={
                          organization.id
                        }
                        disabled={
                          organization.assigned >=
                          organization.capacity
                        }
                      >
                        {
                          organization.name
                        }
                        {" - "}
                        {
                          organization.assigned
                        }
                        /
                        {
                          organization.capacity
                        }
                      </option>
                    )
                  )}
                </FormSelect>

                <FormSelect
                  label="فرصة التدريب"
                  value={
                    selectedOpportunity
                  }
                  onChange={
                    setSelectedOpportunity
                  }
                  disabled={
                    !selectedOrganization
                  }
                >
                  <option value="">
                    اختر الفرصة
                  </option>

                  {selectedOrganization?.opportunities.map(
                    (opportunity) => (
                      <option
                        key={
                          opportunity
                        }
                        value={
                          opportunity
                        }
                      >
                        {
                          opportunity
                        }
                      </option>
                    )
                  )}
                </FormSelect>

                <FormSelect
                  label="المشرف الأكاديمي"
                  value={
                    selectedAcademicSupervisor
                  }
                  onChange={
                    setSelectedAcademicSupervisor
                  }
                >
                  <option value="">
                    اختر المشرف
                  </option>

                  {compatibleAcademicSupervisors.map(
                    (supervisor) => (
                      <option
                        key={
                          supervisor.id
                        }
                        value={
                          supervisor.name
                        }
                      >
                        {
                          supervisor.name
                        }
                      </option>
                    )
                  )}
                </FormSelect>

                <div className="sm:col-span-2">
                  <Label>
                    مشرف جهة التدريب
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

                      bg-[#F8FAFC]

                      px-[11px]
                    "
                  >
                    <UserRoundCheck
                      size={15}
                      className="text-[#64748B]"
                    />

                    <span
                      className="
                        text-[10px]
                        font-medium
                        text-[#475569]
                      "
                    >
                      {selectedOrganization
                        ?.fieldSupervisor ||
                        "يتم تحديده حسب جهة التدريب"}
                    </span>
                  </div>
                </div>

                {selectedOrganization && (
                  <div className="sm:col-span-2">
                    <div
                      className="
                        rounded-[10px]

                        border
                        border-[#D7E5FF]

                        bg-[#F6F9FF]

                        p-[12px]
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-[8px]
                          "
                        >
                          <Building2
                            size={17}
                            className="text-[#09379A]"
                          />

                          <div>
                            <p
                              className="
                                m-0

                                text-[9px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              الطاقة الاستيعابية
                            </p>

                            <p
                              className="
                                m-0
                                mt-[2px]

                                text-[8px]
                                text-[#64748B]
                              "
                            >
                              تم توزيع{" "}
                              {
                                selectedOrganization.assigned
                              }{" "}
                              من أصل{" "}
                              {
                                selectedOrganization.capacity
                              }
                            </p>
                          </div>
                        </div>

                        <strong
                          className="
                            text-[11px]
                            text-[#09379A]
                          "
                        >
                          {Math.max(
                            selectedOrganization.capacity -
                              selectedOrganization.assigned,
                            0
                          )}{" "}
                          متاح
                        </strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-[8px]

                  border-t
                  border-[#E2E8F0]

                  px-5
                  py-[14px]

                  sm:flex-row
                  sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowDistributionModal(
                      false
                    )
                  }
                  className="
                    min-h-[40px]

                    rounded-[8px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[15px]

                    text-[9px]
                    font-bold
                  "
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={
                    saveDistribution
                  }
                  className="
                    flex
                    min-h-[40px]
                    items-center
                    justify-center
                    gap-[6px]

                    rounded-[8px]

                    border-0

                    bg-[#09379A]

                    px-[17px]

                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  <Save
                    size={14}
                  />

                  حفظ التوزيع
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

const inputStyle = `
  h-[42px]
  w-full

  rounded-[9px]

  border
  border-[#D9E2EC]

  bg-white

  px-[11px]

  font-['Cairo']

  text-[10px]
  text-[#334155]

  outline-none

  focus:border-[#09379A]
  focus:ring-2
  focus:ring-[#09379A]/10
`;

function EligibilityBadge({
  status,
}) {
  const styles = {
    مؤهل:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "غير مؤهل":
      "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",

    "يحتاج مراجعة":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "مكتمل التدريب":
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        whitespace-nowrap

        rounded-full

        border

        px-[8px]

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

function DistributionBadge({
  status,
}) {
  const styles = {
    موزع:
      "bg-[#ECFDF3] text-[#15803D]",

    "بانتظار التوزيع":
      "bg-[#FFF7ED] text-[#C2410C]",

    "غير قابل للتوزيع":
      "bg-[#FFF1F2] text-[#BE123C]",

    مكتمل:
      "bg-[#EEF3FF] text-[#09379A]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        whitespace-nowrap

        rounded-full

        px-[8px]

        text-[8px]
        font-bold

        ${
          styles[status] ||
          "bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function Label({ children }) {
  return (
    <label
      className="
        mb-[6px]
        block

        text-[10px]
        font-bold
        text-[#475569]
      "
    >
      {children}
    </label>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={inputStyle}
      >
        {children}
      </select>
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  children,
  disabled = false,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <select
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={`
          ${inputStyle}

          ${
            disabled
              ? "cursor-not-allowed bg-[#F8FAFC] text-[#94A3B8]"
              : ""
          }
        `}
      >
        {children}
      </select>
    </div>
  );
}

function TableHead({
  children,
}) {
  return (
    <th
      className="
        whitespace-nowrap

        px-[13px]
        py-[11px]

        text-right
        text-[9px]
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
        px-[13px]
        py-[12px]

        align-middle
      "
    >
      {children}
    </td>
  );
}

function InfoBox({
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

        px-[10px]
        py-[9px]
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

          text-[9px]
          font-bold
          leading-[18px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

function MobileInfo({
  label,
  value,
}) {
  return (
    <div>
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
          mt-[2px]

          text-[9px]
          font-medium
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

function SectionTitle({
  children,
}) {
  return (
    <h4
      className="
        m-0
        mb-[9px]
        mt-[20px]

        text-[11px]
        font-bold
        text-[#334155]
      "
    >
      {children}
    </h4>
  );
}