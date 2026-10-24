import { useMemo, useState } from "react";

import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  GraduationCap,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   TRAINING REQUIREMENTS
========================================================= */

const trainingRequirements = {
  "هندسة البرمجيات": {
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    trainingCourse: "التدريب الميداني في هندسة البرمجيات",
    courseCode: "SE-490",
    requiredTrainingHours: 120,
    minimumAcademicHours: 90,
    minimumGpa: 2.0,
    prerequisites: [
      "هندسة البرمجيات",
      "قواعد البيانات",
      "تطوير تطبيقات الويب",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: true,
  },

  "نظم المعلومات": {
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    trainingCourse: "التدريب الميداني في نظم المعلومات",
    courseCode: "IS-490",
    requiredTrainingHours: 120,
    minimumAcademicHours: 90,
    minimumGpa: 2.0,
    prerequisites: [
      "تحليل وتصميم النظم",
      "قواعد البيانات",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: true,
  },

  "إدارة الأعمال": {
    college: "كلية الاقتصاد والعلوم الإدارية",
    trainingCourse: "التدريب العملي في إدارة الأعمال",
    courseCode: "BUS-410",
    requiredTrainingHours: 120,
    minimumAcademicHours: 85,
    minimumGpa: 2.0,
    prerequisites: [
      "إدارة الموارد البشرية",
      "مبادئ الإدارة",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: false,
  },

  المحاسبة: {
    college: "كلية الاقتصاد والعلوم الإدارية",
    trainingCourse: "التدريب العملي في المحاسبة",
    courseCode: "ACC-410",
    requiredTrainingHours: 120,
    minimumAcademicHours: 85,
    minimumGpa: 2.0,
    prerequisites: [
      "المحاسبة المتوسطة",
      "التدقيق",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: false,
  },

  التمريض: {
    college: "كلية العلوم الطبية التطبيقية",
    trainingCourse: "التدريب السريري المتقدم",
    courseCode: "NUR-480",
    requiredTrainingHours: 160,
    minimumAcademicHours: 100,
    minimumGpa: 2.5,
    prerequisites: [
      "تمريض البالغين",
      "تمريض الأطفال",
      "تمريض صحة المجتمع",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: true,
  },

  "المختبرات الطبية": {
    college: "كلية العلوم الطبية التطبيقية",
    trainingCourse: "التدريب السريري في المختبرات",
    courseCode: "MLT-470",
    requiredTrainingHours: 140,
    minimumAcademicHours: 100,
    minimumGpa: 2.5,
    prerequisites: [
      "الكيمياء السريرية",
      "أمراض الدم",
      "الأحياء الدقيقة",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: true,
  },

  "تعليم أساسي": {
    college: "كلية التربية",
    trainingCourse: "التربية العملية",
    courseCode: "EDU-450",
    requiredTrainingHours: 150,
    minimumAcademicHours: 90,
    minimumGpa: 2.0,
    prerequisites: [
      "طرق التدريس",
      "علم النفس التربوي",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: false,
  },

  الإعلام: {
    college: "كلية الآداب والعلوم الإنسانية",
    trainingCourse: "التدريب الإعلامي",
    courseCode: "MEDIA-420",
    requiredTrainingHours: 100,
    minimumAcademicHours: 80,
    minimumGpa: 2.0,
    prerequisites: [
      "التحرير الصحفي",
      "الإنتاج الإعلامي",
    ],
    requireAcademicApproval: true,
    requireNoAcademicWarning: false,
  },
};

/* =========================================================
   STUDENT DATA
========================================================= */

const initialStudents = [
  {
    id: 1,
    studentId: "20231045",
    name: "أحمد خالد محمد",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "هندسة البرمجيات",

    academicHours: 104,
    gpa: 3.12,

    completedCourses: [
      "هندسة البرمجيات",
      "قواعد البيانات",
      "تطوير تطبيقات الويب",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: false,

    lastReview: "2026-10-20",
    reviewedBy: "د. سامر يوسف",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 2,
    studentId: "20230876",
    name: "سارة محمود علي",

    college: "كلية الاقتصاد والعلوم الإدارية",
    major: "إدارة الأعمال",

    academicHours: 96,
    gpa: 3.41,

    completedCourses: [
      "إدارة الموارد البشرية",
      "مبادئ الإدارة",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: false,

    lastReview: "2026-10-21",
    reviewedBy: "د. ليلى أحمد",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 3,
    studentId: "20231234",
    name: "محمد سامي حسن",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "نظم المعلومات",

    academicHours: 94,
    gpa: 2.73,

    completedCourses: [
      "تحليل وتصميم النظم",
      "قواعد البيانات",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: false,

    lastReview: "2026-10-20",
    reviewedBy: "د. أحمد نصار",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 4,
    studentId: "20230987",
    name: "ريم أحمد يوسف",

    college: "كلية التربية",
    major: "تعليم أساسي",

    academicHours: 88,
    gpa: 2.91,

    completedCourses: [
      "طرق التدريس",
      "علم النفس التربوي",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: false,

    lastReview: "2026-10-19",
    reviewedBy: "د. منى عبد الرحمن",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 5,
    studentId: "20230765",
    name: "مريم أحمد علي",

    college: "كلية العلوم الطبية التطبيقية",
    major: "التمريض",

    academicHours: 118,
    gpa: 3.54,

    completedCourses: [
      "تمريض البالغين",
      "تمريض الأطفال",
      "تمريض صحة المجتمع",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: true,

    lastReview: "2026-10-18",
    reviewedBy: "د. سارة خليل",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 6,
    studentId: "20231356",
    name: "لينا محمود حسن",

    college: "كلية العلوم الطبية التطبيقية",
    major: "المختبرات الطبية",

    academicHours: 103,
    gpa: 2.67,

    completedCourses: [
      "الكيمياء السريرية",
      "أمراض الدم",
    ],

    academicWarning: false,
    academicApproval: true,

    previousTrainingCompleted: false,

    lastReview: "2026-10-17",
    reviewedBy: "د. خالد يوسف",

    manualStatus: null,
    manualNote: "",
  },

  {
    id: 7,
    studentId: "20231587",
    name: "عمر يوسف سليمان",

    college: "كلية الآداب والعلوم الإنسانية",
    major: "الإعلام",

    academicHours: 84,
    gpa: 1.86,

    completedCourses: [
      "التحرير الصحفي",
      "الإنتاج الإعلامي",
    ],

    academicWarning: true,
    academicApproval: false,

    previousTrainingCompleted: false,

    lastReview: "2026-10-16",
    reviewedBy: "د. خالد حسن",

    manualStatus: null,
    manualNote: "",
  },
];

/* =========================================================
   ELIGIBILITY ENGINE
========================================================= */

function evaluateStudent(student) {
  const requirement =
    trainingRequirements[student.major];

  if (!requirement) {
    return {
      status: "يحتاج مراجعة",
      reason: "لا توجد متطلبات تدريب معرفة لهذا التخصص.",
      checks: [],
      requirement: null,
    };
  }

  const hoursPassed =
    student.academicHours >=
    requirement.minimumAcademicHours;

  const gpaPassed =
    student.gpa >=
    requirement.minimumGpa;

  const missingCourses =
    requirement.prerequisites.filter(
      (course) =>
        !student.completedCourses.includes(
          course
        )
    );

  const coursesPassed =
    missingCourses.length === 0;

  const warningPassed =
    !requirement.requireNoAcademicWarning ||
    !student.academicWarning;

  const approvalPassed =
    !requirement.requireAcademicApproval ||
    student.academicApproval;

  const checks = [
    {
      id: "hours",
      label: "الساعات الأكاديمية",
      passed: hoursPassed,
      current: `${student.academicHours} ساعة`,
      required: `${requirement.minimumAcademicHours} ساعة على الأقل`,
    },

    {
      id: "gpa",
      label: "المعدل التراكمي",
      passed: gpaPassed,
      current: student.gpa.toFixed(2),
      required: `${requirement.minimumGpa.toFixed(2)} على الأقل`,
    },

    {
      id: "courses",
      label: "المساقات السابقة",
      passed: coursesPassed,
      current: coursesPassed
        ? "مكتملة"
        : `ناقص ${missingCourses.length}`,
      required: requirement.prerequisites.length
        ? requirement.prerequisites.join("، ")
        : "لا يوجد",
    },

    {
      id: "warning",
      label: "الحالة الأكاديمية",
      passed: warningPassed,
      current: student.academicWarning
        ? "يوجد إنذار أكاديمي"
        : "لا يوجد إنذار",
      required: requirement.requireNoAcademicWarning
        ? "يشترط عدم وجود إنذار"
        : "لا يوجد شرط",
    },

    {
      id: "approval",
      label: "الموافقة الأكاديمية",
      passed: approvalPassed,
      current: student.academicApproval
        ? "تمت الموافقة"
        : "لم تتم الموافقة",
      required: requirement.requireAcademicApproval
        ? "مطلوبة"
        : "غير مطلوبة",
    },
  ];

  let status = "مؤهل";

  if (
    !hoursPassed ||
    !gpaPassed ||
    !coursesPassed ||
    !warningPassed
  ) {
    status = "غير مؤهل";
  } else if (!approvalPassed) {
    status = "يحتاج مراجعة";
  }

  if (student.previousTrainingCompleted) {
    status = "مكتمل التدريب";
  }

  const failedChecks =
    checks.filter(
      (item) => !item.passed
    );

  let reason =
    "يستوفي الطالب جميع متطلبات التدريب.";

  if (status === "مكتمل التدريب") {
    reason =
      "الطالب أكمل التدريب مسبقًا ولا يحتاج إلى توزيع جديد.";
  } else if (
    failedChecks.length > 0
  ) {
    reason =
      failedChecks
        .map(
          (item) => item.label
        )
        .join("، ") +
      " بحاجة إلى استيفاء.";
  }

  return {
    status:
      student.manualStatus ||
      status,

    reason:
      student.manualNote ||
      reason,

    checks,
    missingCourses,
    requirement,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function TrainingEligibility() {
  const [students, setStudents] =
    useState(initialStudents);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [majorFilter, setMajorFilter] =
    useState("الكل");

  const [
    eligibilityFilter,
    setEligibilityFilter,
  ] = useState("الكل");

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [
    showReviewModal,
    setShowReviewModal,
  ] = useState(false);

  const [reviewStatus, setReviewStatus] =
    useState("مؤهل");

  const [reviewNote, setReviewNote] =
    useState("");

  /* =========================================================
     ENRICH DATA
  ========================================================= */

  const evaluatedStudents =
    useMemo(
      () =>
        students.map(
          (student) => ({
            ...student,

            eligibility:
              evaluateStudent(
                student
              ),
          })
        ),
      [students]
    );

  const colleges = useMemo(
    () => [
      ...new Set(
        students.map(
          (student) =>
            student.college
        )
      ),
    ],
    [students]
  );

  const majors = useMemo(
    () => [
      ...new Set(
        students.map(
          (student) =>
            student.major
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
      evaluatedStudents.length;

    const eligible =
      evaluatedStudents.filter(
        (student) =>
          student.eligibility
            .status === "مؤهل"
      ).length;

    const ineligible =
      evaluatedStudents.filter(
        (student) =>
          student.eligibility
            .status ===
          "غير مؤهل"
      ).length;

    const review =
      evaluatedStudents.filter(
        (student) =>
          student.eligibility
            .status ===
          "يحتاج مراجعة"
      ).length;

    return [
      {
        title: "إجمالي الطلبة",
        value: total,
        description:
          "تم فحص أهليتهم",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مؤهلون للتدريب",
        value: eligible,
        description:
          "استوفوا جميع الشروط",
        icon: UserCheck,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "غير مؤهلين",
        value: ineligible,
        description:
          "لديهم متطلبات ناقصة",
        icon: AlertTriangle,
        bg: "bg-[#FFF1F2]",
        color: "text-[#BE123C]",
      },

      {
        title: "يحتاج مراجعة",
        value: review,
        description:
          "بحاجة لتدخل أكاديمي",
        icon: ShieldCheck,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },
    ];
  }, [evaluatedStudents]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return evaluatedStudents.filter(
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

          const matchesEligibility =
            eligibilityFilter ===
              "الكل" ||
            student.eligibility
              .status ===
              eligibilityFilter;

          return (
            matchesSearch &&
            matchesCollege &&
            matchesMajor &&
            matchesEligibility
          );
        }
      );
    }, [
      evaluatedStudents,
      searchTerm,
      collegeFilter,
      majorFilter,
      eligibilityFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    student
  ) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  /* =========================================================
     MANUAL REVIEW
  ========================================================= */

  const openReview = (
    student
  ) => {
    setSelectedStudent(student);

    setReviewStatus(
      student.eligibility.status ===
        "مكتمل التدريب"
        ? "مؤهل"
        : student.eligibility.status
    );

    setReviewNote(
      student.manualNote || ""
    );

    setShowDetails(false);
    setShowReviewModal(true);
  };

  const saveManualReview = () => {
    if (!selectedStudent) {
      return;
    }

    setStudents((previous) =>
      previous.map((student) =>
        student.id ===
        selectedStudent.id
          ? {
              ...student,

              manualStatus:
                reviewStatus,

              manualNote:
                reviewNote,

              lastReview:
                "2026-10-24",

              reviewedBy:
                "مدير النظام",
            }
          : student
      )
    );

    setShowReviewModal(false);
    setSelectedStudent(null);
  };

  const clearManualReview = () => {
    if (!selectedStudent) {
      return;
    }

    setStudents((previous) =>
      previous.map((student) =>
        student.id ===
        selectedStudent.id
          ? {
              ...student,
              manualStatus: null,
              manualNote: "",
            }
          : student
      )
    );

    setShowReviewModal(false);
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
                الأهلية للتدريب
              </span>
            </div>

            {/* HEADER */}

            <section
              className="
                mt-[5px]

                flex
                flex-col
                gap-4

                md:flex-row
                md:items-end
                md:justify-between
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
                  الأهلية للتدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]

                    max-w-[830px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  التحقق من أهلية الطلبة
                  تلقائيًا وفق متطلبات التدريب
                  المحددة لكل تخصص، بما يشمل
                  الساعات الأكاديمية والمعدل
                  والمساقات السابقة والحالة
                  الأكاديمية والموافقات المطلوبة.
                </p>
              </div>
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
                  xl:grid-cols-4
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
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="اسم الطالب أو الرقم الجامعي..."
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
                  label="حالة الأهلية"
                  value={
                    eligibilityFilter
                  }
                  onChange={
                    setEligibilityFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="مؤهل">
                    مؤهل
                  </option>

                  <option value="غير مؤهل">
                    غير مؤهل
                  </option>

                  <option value="يحتاج مراجعة">
                    يحتاج مراجعة
                  </option>

                  <option value="مكتمل التدريب">
                    مكتمل التدريب
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
                    مراجعة أهلية الطلبة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    نتيجة التحقق من شروط
                    التدريب لكل طالب
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
                        الساعات
                      </TableHead>

                      <TableHead>
                        المعدل
                      </TableHead>

                      <TableHead>
                        المساقات السابقة
                      </TableHead>

                      <TableHead>
                        الأهلية
                      </TableHead>

                      <TableHead>
                        آخر مراجعة
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map(
                      (student) => {
                        const requirement =
                          student
                            .eligibility
                            .requirement;

                        const courseCheck =
                          student.eligibility.checks.find(
                            (item) =>
                              item.id ===
                              "courses"
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
                                    requirement
                                      ?.courseCode ||
                                    "—"
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <ConditionValue
                                passed={
                                  student
                                    .eligibility
                                    .checks.find(
                                      (
                                        item
                                      ) =>
                                        item.id ===
                                        "hours"
                                    )
                                    ?.passed
                                }
                              >
                                {
                                  student.academicHours
                                }
                                /
                                {
                                  requirement
                                    ?.minimumAcademicHours ||
                                  "—"
                                }
                              </ConditionValue>
                            </TableCell>

                            <TableCell>
                              <ConditionValue
                                passed={
                                  student
                                    .eligibility
                                    .checks.find(
                                      (
                                        item
                                      ) =>
                                        item.id ===
                                        "gpa"
                                    )
                                    ?.passed
                                }
                              >
                                {student.gpa.toFixed(
                                  2
                                )}
                              </ConditionValue>
                            </TableCell>

                            <TableCell>
                              <ConditionValue
                                passed={
                                  courseCheck?.passed
                                }
                              >
                                {courseCheck?.passed
                                  ? "مكتملة"
                                  : `${student.eligibility.missingCourses.length} ناقصة`}
                              </ConditionValue>
                            </TableCell>

                            <TableCell>
                              <EligibilityBadge
                                status={
                                  student
                                    .eligibility
                                    .status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    text-[#475569]
                                  "
                                >
                                  {
                                    student.lastReview
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
                                    student.reviewedBy
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
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

                                  px-[9px]

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

                                مراجعة
                              </button>
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
                  (student) => {
                    const requirement =
                      student.eligibility
                        .requirement;

                    return (
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

                          <EligibilityBadge
                            status={
                              student
                                .eligibility
                                .status
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
                            label="الساعات الأكاديمية"
                            value={`${student.academicHours}/${requirement?.minimumAcademicHours || "—"}`}
                          />

                          <MobileInfo
                            label="المعدل"
                            value={student.gpa.toFixed(
                              2
                            )}
                          />

                          <MobileInfo
                            label="المساق التدريبي"
                            value={
                              requirement
                                ?.courseCode ||
                              "—"
                            }
                          />

                          <MobileInfo
                            label="آخر مراجعة"
                            value={
                              student.lastReview
                            }
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              student
                            )
                          }
                          className="
                            mt-[11px]

                            flex
                            h-[35px]
                            w-full
                            items-center
                            justify-center
                            gap-[6px]

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

                          مراجعة الأهلية
                        </button>
                      </article>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* DETAILS DRAWER */}

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
                max-w-[610px]
                flex-col

                bg-white

                shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
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
                    مراجعة الأهلية
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
                  <div>
                    <h3
                      className="
                        m-0

                        text-[16px]
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
                        mt-[3px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {
                        selectedStudent.major
                      }
                      {" · "}
                      {
                        selectedStudent.college
                      }
                    </p>
                  </div>

                  <EligibilityBadge
                    status={
                      selectedStudent
                        .eligibility
                        .status
                    }
                  />
                </div>

                <SectionTitle>
                  متطلبات التخصص
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="مساق التدريب"
                    value={
                      selectedStudent
                        .eligibility
                        .requirement
                        ?.trainingCourse ||
                      "غير معرف"
                    }
                  />

                  <InfoBox
                    label="رمز المساق"
                    value={
                      selectedStudent
                        .eligibility
                        .requirement
                        ?.courseCode ||
                      "—"
                    }
                  />

                  <InfoBox
                    label="ساعات التدريب"
                    value={
                      selectedStudent
                        .eligibility
                        .requirement
                        ? `${selectedStudent.eligibility.requirement.requiredTrainingHours} ساعة`
                        : "—"
                    }
                  />

                  <InfoBox
                    label="الحد الأدنى للمعدل"
                    value={
                      selectedStudent
                        .eligibility
                        .requirement
                        ?.minimumGpa ??
                      "—"
                    }
                  />
                </div>

                <SectionTitle>
                  نتيجة التحقق
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[8px]
                  "
                >
                  {selectedStudent.eligibility.checks.map(
                    (check) => (
                      <EligibilityCheck
                        key={
                          check.id
                        }
                        check={
                          check
                        }
                      />
                    )
                  )}
                </div>

                {selectedStudent
                  .eligibility
                  .missingCourses
                  ?.length >
                  0 && (
                  <>
                    <SectionTitle>
                      المساقات الناقصة
                    </SectionTitle>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-[6px]
                      "
                    >
                      {selectedStudent.eligibility.missingCourses.map(
                        (course) => (
                          <span
                            key={
                              course
                            }
                            className="
                              rounded-full

                              bg-[#FFF1F2]

                              px-[9px]
                              py-[5px]

                              text-[8px]
                              font-bold
                              text-[#BE123C]
                            "
                          >
                            {course}
                          </span>
                        )
                      )}
                    </div>
                  </>
                )}

                <SectionTitle>
                  نتيجة الأهلية
                </SectionTitle>

                <div
                  className="
                    rounded-[10px]

                    border
                    border-[#E2E8F0]

                    bg-[#FAFBFC]

                    p-[13px]
                  "
                >
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
                        text-[9px]
                        font-bold
                        text-[#475569]
                      "
                    >
                      الحالة الحالية
                    </span>

                    <EligibilityBadge
                      status={
                        selectedStudent
                          .eligibility
                          .status
                      }
                    />
                  </div>

                  <p
                    className="
                      m-0
                      mt-[10px]

                      text-[9px]
                      leading-[19px]
                      text-[#64748B]
                    "
                  >
                    {
                      selectedStudent
                        .eligibility
                        .reason
                    }
                  </p>
                </div>

                <SectionTitle>
                  آخر مراجعة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="التاريخ"
                    value={
                      selectedStudent.lastReview
                    }
                  />

                  <InfoBox
                    label="تمت بواسطة"
                    value={
                      selectedStudent.reviewedBy
                    }
                  />
                </div>
              </div>

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
                    openReview(
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
                  <ShieldCheck
                    size={14}
                  />

                  مراجعة يدوية
                </button>
              </div>
            </aside>
          </>
        )}

      {/* MANUAL REVIEW */}

      {showReviewModal &&
        selectedStudent && (
          <div
            onClick={() =>
              setShowReviewModal(
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
                w-full
                max-w-[540px]

                rounded-[16px]

                border
                border-[#E2E8F0]

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
                    مراجعة الأهلية
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
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowReviewModal(
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
                  px-5
                  py-5
                "
              >
                <Label>
                  قرار المراجعة
                </Label>

                <select
                  value={
                    reviewStatus
                  }
                  onChange={(event) =>
                    setReviewStatus(
                      event.target
                        .value
                    )
                  }
                  className={inputStyle}
                >
                  <option value="مؤهل">
                    مؤهل
                  </option>

                  <option value="غير مؤهل">
                    غير مؤهل
                  </option>

                  <option value="يحتاج مراجعة">
                    يحتاج مراجعة
                  </option>
                </select>

                <div className="mt-[14px]">
                  <Label>
                    ملاحظات المراجع
                  </Label>

                  <textarea
                    value={reviewNote}
                    onChange={(
                      event
                    ) =>
                      setReviewNote(
                        event.target
                          .value
                      )
                    }
                    rows={5}
                    placeholder="اكتب سبب القرار أو أي ملاحظات أكاديمية..."
                    className="
                      w-full

                      resize-none

                      rounded-[9px]

                      border
                      border-[#D9E2EC]

                      px-[11px]
                      py-[10px]

                      font-['Cairo']

                      text-[10px]
                      leading-[20px]

                      outline-none

                      focus:border-[#09379A]
                      focus:ring-2
                      focus:ring-[#09379A]/10
                    "
                  />
                </div>

                <div
                  className="
                    mt-[12px]

                    rounded-[9px]

                    border
                    border-[#D7E5FF]

                    bg-[#F6F9FF]

                    px-[11px]
                    py-[10px]

                    text-[9px]
                    leading-[18px]
                    text-[#475569]
                  "
                >
                  القرار اليدوي يتجاوز
                  النتيجة المحسوبة تلقائيًا
                  ويستخدم فقط للحالات
                  الاستثنائية أو عند وجود
                  قرار أكاديمي رسمي.
                </div>
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
                  sm:justify-between
                "
              >
                <button
                  type="button"
                  onClick={
                    clearManualReview
                  }
                  className="
                    min-h-[40px]

                    rounded-[8px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[14px]

                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  إعادة للحساب التلقائي
                </button>

                <div
                  className="
                    flex
                    gap-[8px]
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setShowReviewModal(
                        false
                      )
                    }
                    className="
                      min-h-[40px]

                      rounded-[8px]

                      border
                      border-[#D9E2EC]

                      bg-white

                      px-[14px]

                      text-[9px]
                      font-bold
                    "
                  >
                    إلغاء
                  </button>

                  <button
                    type="button"
                    onClick={
                      saveManualReview
                    }
                    className="
                      min-h-[40px]

                      rounded-[8px]

                      border-0

                      bg-[#09379A]

                      px-[16px]

                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    حفظ القرار
                  </button>
                </div>
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
          "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
        }
      `}
    >
      {status}
    </span>
  );
}

function ConditionValue({
  passed,
  children,
}) {
  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        rounded-full

        px-[7px]

        text-[8px]
        font-bold

        ${
          passed
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#FFF1F2] text-[#BE123C]"
        }
      `}
    >
      {children}
    </span>
  );
}

function EligibilityCheck({
  check,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-[9px]

        rounded-[10px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[11px]
        py-[10px]
      "
    >
      <div
        className={`
          mt-[1px]

          flex
          h-[25px]
          w-[25px]
          shrink-0
          items-center
          justify-center

          rounded-full

          ${
            check.passed
              ? "bg-[#ECFDF3] text-[#15803D]"
              : "bg-[#FFF1F2] text-[#BE123C]"
          }
        `}
      >
        {check.passed ? (
          <CheckCircle2
            size={14}
          />
        ) : (
          <AlertTriangle
            size={14}
          />
        )}
      </div>

      <div className="min-w-0">
        <p
          className="
            m-0

            text-[9px]
            font-bold
            text-[#334155]
          "
        >
          {check.label}
        </p>

        <p
          className="
            m-0
            mt-[3px]

            text-[8px]
            leading-[17px]
            text-[#64748B]
          "
        >
          الحالي:{" "}
          <strong>
            {check.current}
          </strong>
        </p>

        <p
          className="
            m-0

            text-[8px]
            leading-[17px]
            text-[#94A3B8]
          "
        >
          المطلوب:{" "}
          {check.required}
        </p>
      </div>
    </div>
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