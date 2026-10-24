import { useMemo, useState } from "react";

import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileText,
  GraduationCap,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialEvaluations = [
  {
    id: 1,

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    organization:
      "شركة التقنية المتقدمة",

    academicSupervisor:
      "د. سامر يوسف",

    fieldSupervisor:
      "م. محمد حمدي",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    attendanceRate: 96,

    requiredVisits: 2,
    completedVisits: 2,

    finalReportSubmitted: true,

    fieldSupervisorEvaluationSubmitted: true,

    status: "جاهز للتقييم",

    scores: {
      attendance: 19,
      practical: 18,
      professional: 18,
      communication: 9,
      discipline: 9,
      finalReport: 16,
    },

    evaluatorNote:
      "أداء قوي والتزام واضح خلال فترة التدريب.",

    evaluatedAt: "",
  },

  {
    id: 2,

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    organization:
      "بنك فلسطين",

    academicSupervisor:
      "د. ليلى أحمد",

    fieldSupervisor:
      "أ. رامي حسن",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    attendanceRate: 98,

    requiredVisits: 2,
    completedVisits: 2,

    finalReportSubmitted: true,

    fieldSupervisorEvaluationSubmitted: true,

    status: "تم التقييم",

    scores: {
      attendance: 20,
      practical: 19,
      professional: 19,
      communication: 10,
      discipline: 10,
      finalReport: 19,
    },

    evaluatorNote:
      "أداء ممتاز جدًا واحترافية عالية في جهة التدريب.",

    evaluatedAt: "2026-10-23",
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

    academicSupervisor:
      "د. أحمد نصار",

    fieldSupervisor:
      "م. خالد يوسف",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 110,

    attendanceRate: 91,

    requiredVisits: 2,
    completedVisits: 1,

    finalReportSubmitted: false,

    fieldSupervisorEvaluationSubmitted: true,

    status: "غير جاهز",

    scores: {
      attendance: 0,
      practical: 0,
      professional: 0,
      communication: 0,
      discipline: 0,
      finalReport: 0,
    },

    evaluatorNote: "",

    evaluatedAt: "",
  },

  {
    id: 4,

    studentId: "20230765",
    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    organization:
      "مستشفى الشفاء",

    academicSupervisor:
      "د. سارة خليل",

    fieldSupervisor:
      "أ. محمود حسن",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 160,
    completedHours: 160,

    attendanceRate: 100,

    requiredVisits: 3,
    completedVisits: 3,

    finalReportSubmitted: true,

    fieldSupervisorEvaluationSubmitted: true,

    status: "تم التقييم",

    scores: {
      attendance: 20,
      practical: 20,
      professional: 19,
      communication: 10,
      discipline: 10,
      finalReport: 18,
    },

    evaluatorNote:
      "استوفت الطالبة جميع المتطلبات بمستوى متميز.",

    evaluatedAt: "2026-10-21",
  },

  {
    id: 5,

    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    organization:
      "مركز المختبرات الطبية",

    academicSupervisor:
      "د. خالد يوسف",

    fieldSupervisor:
      "أ. خالد إبراهيم",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 140,
    completedHours: 140,

    attendanceRate: 94,

    requiredVisits: 2,
    completedVisits: 2,

    finalReportSubmitted: true,

    fieldSupervisorEvaluationSubmitted: false,

    status: "غير جاهز",

    scores: {
      attendance: 0,
      practical: 0,
      professional: 0,
      communication: 0,
      discipline: 0,
      finalReport: 0,
    },

    evaluatorNote: "",

    evaluatedAt: "",
  },
];

/* =========================================================
   SCORE MODEL
========================================================= */

const scoreFields = [
  {
    key: "attendance",
    label: "الحضور والالتزام",
    max: 20,
  },

  {
    key: "practical",
    label: "الأداء العملي",
    max: 20,
  },

  {
    key: "professional",
    label: "السلوك المهني",
    max: 20,
  },

  {
    key: "communication",
    label: "التواصل",
    max: 10,
  },

  {
    key: "discipline",
    label: "الانضباط",
    max: 10,
  },

  {
    key: "finalReport",
    label: "التقرير النهائي",
    max: 20,
  },
];

function calculateTotal(scores) {
  return scoreFields.reduce(
    (total, field) =>
      total +
      Number(scores[field.key] || 0),
    0
  );
}

function calculateGrade(total) {
  if (total >= 90) {
    return "ممتاز";
  }

  if (total >= 80) {
    return "جيد جدًا";
  }

  if (total >= 70) {
    return "جيد";
  }

  if (total >= 60) {
    return "مقبول";
  }

  return "راسب";
}

/* =========================================================
   READINESS
========================================================= */

function evaluateReadiness(student) {
  const hoursCompleted =
    student.completedHours >=
    student.requiredHours;

  const visitsCompleted =
    student.completedVisits >=
    student.requiredVisits;

  const reportCompleted =
    student.finalReportSubmitted;

  const supervisorEvaluation =
    student.fieldSupervisorEvaluationSubmitted;

  const attendancePassed =
    student.attendanceRate >= 75;

  const ready =
    hoursCompleted &&
    visitsCompleted &&
    reportCompleted &&
    supervisorEvaluation &&
    attendancePassed;

  return {
    ready,

    checks: [
      {
        label: "ساعات التدريب",
        value: `${student.completedHours}/${student.requiredHours}`,
        passed: hoursCompleted,
      },

      {
        label: "الزيارات",
        value: `${student.completedVisits}/${student.requiredVisits}`,
        passed: visitsCompleted,
      },

      {
        label: "التقرير النهائي",
        value: reportCompleted
          ? "مرفوع"
          : "غير مرفوع",
        passed: reportCompleted,
      },

      {
        label: "تقييم مشرف الجهة",
        value: supervisorEvaluation
          ? "مكتمل"
          : "غير مكتمل",
        passed: supervisorEvaluation,
      },

      {
        label: "نسبة الحضور",
        value: `${student.attendanceRate}%`,
        passed: attendancePassed,
      },
    ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function Evaluations() {
  const [evaluations, setEvaluations] =
    useState(initialEvaluations);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [gradeFilter, setGradeFilter] =
    useState("الكل");

  const [periodFilter, setPeriodFilter] =
    useState("الكل");

  const [
    selectedEvaluation,
    setSelectedEvaluation,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [
    showEvaluationModal,
    setShowEvaluationModal,
  ] = useState(false);

  const [formScores, setFormScores] =
    useState({
      attendance: 0,
      practical: 0,
      professional: 0,
      communication: 0,
      discipline: 0,
      finalReport: 0,
    });

  const [evaluationNote, setEvaluationNote] =
    useState("");

  /* =========================================================
     ENRICH DATA
  ========================================================= */

  const enrichedEvaluations =
    useMemo(() => {
      return evaluations.map(
        (item) => {
          const total =
            calculateTotal(
              item.scores
            );

          const grade =
            calculateGrade(total);

          const readiness =
            evaluateReadiness(
              item
            );

          return {
            ...item,
            total,
            grade,
            readiness,
          };
        }
      );
    }, [evaluations]);

  const periods = useMemo(
    () => [
      ...new Set(
        evaluations.map(
          (item) =>
            item.trainingPeriod
        )
      ),
    ],
    [evaluations]
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      enrichedEvaluations.length;

    const ready =
      enrichedEvaluations.filter(
        (item) =>
          item.status ===
          "جاهز للتقييم"
      ).length;

    const evaluated =
      enrichedEvaluations.filter(
        (item) =>
          item.status ===
          "تم التقييم"
      ).length;

    const incomplete =
      enrichedEvaluations.filter(
        (item) =>
          !item.readiness.ready
      ).length;

    return [
      {
        title: "إجمالي الطلبة",
        value: total,
        description:
          "ضمن مرحلة التقييم",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "جاهزون للتقييم",
        value: ready,
        description:
          "استوفوا شروط التقييم",
        icon: ClipboardCheck,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "تم تقييمهم",
        value: evaluated,
        description:
          "تم اعتماد درجاتهم",
        icon: Star,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "متطلبات ناقصة",
        value: incomplete,
        description:
          "لا يمكن تقييمهم بعد",
        icon: AlertTriangle,
        bg: "bg-[#FFF1F2]",
        color: "text-[#BE123C]",
      },
    ];
  }, [enrichedEvaluations]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredEvaluations =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return enrichedEvaluations.filter(
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
            statusFilter ===
              "الكل" ||
            item.status ===
              statusFilter;

          const matchesGrade =
            gradeFilter ===
              "الكل" ||
            item.grade ===
              gradeFilter;

          const matchesPeriod =
            periodFilter ===
              "الكل" ||
            item.trainingPeriod ===
              periodFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesGrade &&
            matchesPeriod
          );
        }
      );
    }, [
      enrichedEvaluations,
      searchTerm,
      statusFilter,
      gradeFilter,
      periodFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    evaluation
  ) => {
    setSelectedEvaluation(
      evaluation
    );

    setShowDetails(true);
  };

  /* =========================================================
     EVALUATE
  ========================================================= */

  const openEvaluation = (
    evaluation
  ) => {
    if (
      !evaluation.readiness.ready
    ) {
      return;
    }

    setSelectedEvaluation(
      evaluation
    );

    setFormScores({
      ...evaluation.scores,
    });

    setEvaluationNote(
      evaluation.evaluatorNote ||
        ""
    );

    setShowDetails(false);

    setShowEvaluationModal(true);
  };

  const updateScore = (
    key,
    value,
    max
  ) => {
    const numeric =
      Number(value);

    const normalized =
      Math.max(
        0,
        Math.min(
          numeric,
          max
        )
      );

    setFormScores(
      (previous) => ({
        ...previous,
        [key]: normalized,
      })
    );
  };

  const saveEvaluation = () => {
    if (!selectedEvaluation) {
      return;
    }

    const readiness =
      evaluateReadiness(
        selectedEvaluation
      );

    if (!readiness.ready) {
      return;
    }

    setEvaluations(
      (previous) =>
        previous.map(
          (item) =>
            item.id ===
            selectedEvaluation.id
              ? {
                  ...item,

                  scores:
                    formScores,

                  evaluatorNote:
                    evaluationNote,

                  status:
                    "تم التقييم",

                  evaluatedAt:
                    "2026-10-24",
                }
              : item
        )
    );

    setShowEvaluationModal(
      false
    );

    setSelectedEvaluation(
      null
    );
  };

  const formTotal =
    calculateTotal(
      formScores
    );

  const formGrade =
    calculateGrade(
      formTotal
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
                التقييمات
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
                تقييمات التدريب
              </h1>

              <p
                className="
                  m-0
                  mt-[3px]

                  max-w-[880px]

                  text-[11px]
                  leading-[21px]
                  text-[#64748B]

                  sm:text-[12px]
                "
              >
                اعتماد التقييم النهائي
                للطالب بعد استكمال ساعات
                التدريب والحضور والزيارات
                وتقييم مشرف الجهة والتقرير
                النهائي.
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
                      placeholder="الطالب، الرقم، التخصص أو الجهة..."
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

                  {periods.map(
                    (period) => (
                      <option
                        key={period}
                        value={period}
                      >
                        {period}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="حالة التقييم"
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

                  <option value="جاهز للتقييم">
                    جاهز للتقييم
                  </option>

                  <option value="تم التقييم">
                    تم التقييم
                  </option>

                  <option value="غير جاهز">
                    غير جاهز
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="التقدير"
                  value={
                    gradeFilter
                  }
                  onChange={
                    setGradeFilter
                  }
                >
                  <option value="الكل">
                    كل التقديرات
                  </option>

                  <option value="ممتاز">
                    ممتاز
                  </option>

                  <option value="جيد جدًا">
                    جيد جدًا
                  </option>

                  <option value="جيد">
                    جيد
                  </option>

                  <option value="مقبول">
                    مقبول
                  </option>

                  <option value="راسب">
                    راسب
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
                    تقييمات الطلبة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    لا يتم فتح التقييم
                    النهائي قبل استيفاء
                    جميع متطلبات الجاهزية
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
                    filteredEvaluations.length
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
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        الساعات
                      </TableHead>

                      <TableHead>
                        الحضور
                      </TableHead>

                      <TableHead>
                        الزيارات
                      </TableHead>

                      <TableHead>
                        الجاهزية
                      </TableHead>

                      <TableHead>
                        النتيجة
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEvaluations.map(
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
                            <div className="min-w-[150px]">
                              <p
                                className="
                                  m-0

                                  text-[10px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {item.student}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {item.studentId}
                                {" · "}
                                {item.major}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="min-w-[145px]">
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {item.organization}
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
                                  item.academicSupervisor
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <ConditionValue
                              passed={
                                item.completedHours >=
                                item.requiredHours
                              }
                            >
                              {
                                item.completedHours
                              }
                              /
                              {
                                item.requiredHours
                              }
                            </ConditionValue>
                          </TableCell>

                          <TableCell>
                            <ConditionValue
                              passed={
                                item.attendanceRate >=
                                75
                              }
                            >
                              {
                                item.attendanceRate
                              }
                              %
                            </ConditionValue>
                          </TableCell>

                          <TableCell>
                            <ConditionValue
                              passed={
                                item.completedVisits >=
                                item.requiredVisits
                              }
                            >
                              {
                                item.completedVisits
                              }
                              /
                              {
                                item.requiredVisits
                              }
                            </ConditionValue>
                          </TableCell>

                          <TableCell>
                            <EvaluationStatusBadge
                              status={
                                item.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            {item.status ===
                            "تم التقييم" ? (
                              <div>
                                <strong
                                  className="
                                    text-[11px]
                                    text-[#09379A]
                                  "
                                >
                                  {
                                    item.total
                                  }
                                  %
                                </strong>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    font-bold
                                    text-[#64748B]
                                  "
                                >
                                  {
                                    item.grade
                                  }
                                </span>
                              </div>
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
                          </TableCell>

                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  item
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
                                size={14}
                              />

                              عرض
                            </button>
                          </TableCell>
                        </tr>
                      )
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
                {filteredEvaluations.map(
                  (item) => (
                    <article
                      key={item.id}
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
                            {item.student}
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {item.studentId}
                            {" · "}
                            {item.major}
                          </span>
                        </div>

                        <EvaluationStatusBadge
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
                          gap-[9px]

                          border-t
                          border-[#E7ECF2]

                          pt-[10px]
                        "
                      >
                        <MobileInfo
                          label="الساعات"
                          value={`${item.completedHours}/${item.requiredHours}`}
                        />

                        <MobileInfo
                          label="الحضور"
                          value={`${item.attendanceRate}%`}
                        />

                        <MobileInfo
                          label="الزيارات"
                          value={`${item.completedVisits}/${item.requiredVisits}`}
                        />

                        <MobileInfo
                          label="النتيجة"
                          value={
                            item.status ===
                            "تم التقييم"
                              ? `${item.total}% - ${item.grade}`
                              : "—"
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openDetails(
                            item
                          )
                        }
                        className="
                          mt-[11px]

                          flex
                          h-[35px]
                          w-full
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
                        <Eye size={14} />

                        عرض التقييم
                      </button>
                    </article>
                  )
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedEvaluation && (
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
                max-w-[640px]
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
                    تقييم الطالب
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
                      selectedEvaluation.studentId
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
                          selectedEvaluation.student
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
                          selectedEvaluation.major
                        }
                        {" · "}
                        {
                          selectedEvaluation.organization
                        }
                      </p>
                    </div>
                  </div>

                  <EvaluationStatusBadge
                    status={
                      selectedEvaluation.status
                    }
                  />
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
                    label="الفترة التدريبية"
                    value={
                      selectedEvaluation.trainingPeriod
                    }
                  />

                  <InfoBox
                    label="المشرف الأكاديمي"
                    value={
                      selectedEvaluation.academicSupervisor
                    }
                  />

                  <InfoBox
                    label="مشرف الجهة"
                    value={
                      selectedEvaluation.fieldSupervisor
                    }
                  />

                  <InfoBox
                    label="جهة التدريب"
                    value={
                      selectedEvaluation.organization
                    }
                  />
                </div>

                <SectionTitle>
                  جاهزية التقييم
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {selectedEvaluation.readiness.checks.map(
                    (check) => (
                      <ReadinessRow
                        key={
                          check.label
                        }
                        {...check}
                      />
                    )
                  )}
                </div>

                {!selectedEvaluation
                  .readiness.ready && (
                  <div
                    className="
                      mt-[12px]

                      flex
                      items-start
                      gap-[8px]

                      rounded-[10px]

                      border
                      border-[#FED7AA]

                      bg-[#FFF7ED]

                      px-[11px]
                      py-[10px]
                    "
                  >
                    <AlertTriangle
                      size={16}
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
                      لا يمكن اعتماد التقييم
                      النهائي قبل استكمال
                      جميع متطلبات الجاهزية.
                    </p>
                  </div>
                )}

                {selectedEvaluation.status ===
                  "تم التقييم" && (
                  <>
                    <SectionTitle>
                      نتيجة التقييم
                    </SectionTitle>

                    <div
                      className="
                        rounded-[12px]

                        border
                        border-[#D7E5FF]

                        bg-[#F6F9FF]

                        p-[14px]
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
                        <div>
                          <p
                            className="
                              m-0

                              text-[9px]
                              text-[#64748B]
                            "
                          >
                            الدرجة النهائية
                          </p>

                          <strong
                            className="
                              mt-[4px]
                              block

                              text-[28px]
                              text-[#09379A]
                            "
                          >
                            {
                              selectedEvaluation.total
                            }
                            %
                          </strong>
                        </div>

                        <div className="text-left">
                          <Award
                            size={27}
                            className="text-[#09379A]"
                          />

                          <p
                            className="
                              m-0
                              mt-[4px]

                              text-[11px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {
                              selectedEvaluation.grade
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                        mt-[10px]

                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      {scoreFields.map(
                        (field) => (
                          <ScoreBox
                            key={
                              field.key
                            }
                            label={
                              field.label
                            }
                            value={
                              selectedEvaluation
                                .scores[
                                field.key
                              ]
                            }
                            max={
                              field.max
                            }
                          />
                        )
                      )}
                    </div>

                    <SectionTitle>
                      ملاحظات المقيم
                    </SectionTitle>

                    <TextBox>
                      {selectedEvaluation.evaluatorNote ||
                        "لا توجد ملاحظات."}
                    </TextBox>

                    <p
                      className="
                        m-0
                        mt-[8px]

                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      تاريخ التقييم:{" "}
                      {
                        selectedEvaluation.evaluatedAt
                      }
                    </p>
                  </>
                )}
              </div>

              {selectedEvaluation
                .readiness.ready && (
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
                      openEvaluation(
                        selectedEvaluation
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

                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    <Star
                      size={14}
                    />

                    {selectedEvaluation.status ===
                    "تم التقييم"
                      ? "تعديل التقييم"
                      : "بدء التقييم"}
                  </button>
                </div>
              )}
            </aside>
          </>
        )}

      {/* =====================================================
          EVALUATION MODAL
      ====================================================== */}

      {showEvaluationModal &&
        selectedEvaluation && (
          <div
            onClick={() =>
              setShowEvaluationModal(
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
                max-w-[800px]
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
                    التقييم النهائي
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
                      selectedEvaluation.student
                    }
                    {" · "}
                    {
                      selectedEvaluation.major
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowEvaluationModal(
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
                {/* SUMMARY */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]

                    md:grid-cols-4
                  "
                >
                  <SummaryBox
                    label="الساعات"
                    value={`${selectedEvaluation.completedHours}/${selectedEvaluation.requiredHours}`}
                  />

                  <SummaryBox
                    label="الحضور"
                    value={`${selectedEvaluation.attendanceRate}%`}
                  />

                  <SummaryBox
                    label="الزيارات"
                    value={`${selectedEvaluation.completedVisits}/${selectedEvaluation.requiredVisits}`}
                  />

                  <SummaryBox
                    label="تقييم الجهة"
                    value={
                      selectedEvaluation.fieldSupervisorEvaluationSubmitted
                        ? "مكتمل"
                        : "غير مكتمل"
                    }
                  />
                </div>

                {/* SCORES */}

                <SectionTitle>
                  عناصر التقييم
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[10px]

                    sm:grid-cols-2
                  "
                >
                  {scoreFields.map(
                    (field) => (
                      <ScoreInput
                        key={
                          field.key
                        }
                        label={
                          field.label
                        }
                        value={
                          formScores[
                            field.key
                          ]
                        }
                        max={
                          field.max
                        }
                        onChange={(
                          value
                        ) =>
                          updateScore(
                            field.key,
                            value,
                            field.max
                          )
                        }
                      />
                    )
                  )}
                </div>

                {/* TOTAL */}

                <div
                  className="
                    mt-[18px]

                    rounded-[12px]

                    border
                    border-[#D7E5FF]

                    bg-[#F6F9FF]

                    p-[14px]
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
                    <div>
                      <p
                        className="
                          m-0

                          text-[9px]
                          text-[#64748B]
                        "
                      >
                        الدرجة النهائية
                      </p>

                      <strong
                        className="
                          mt-[4px]
                          block

                          text-[27px]
                          text-[#09379A]
                        "
                      >
                        {formTotal}%
                      </strong>
                    </div>

                    <div className="text-left">
                      <p
                        className="
                          m-0

                          text-[8px]
                          text-[#64748B]
                        "
                      >
                        التقدير
                      </p>

                      <strong
                        className="
                          mt-[4px]
                          block

                          text-[14px]
                          text-[#334155]
                        "
                      >
                        {formGrade}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* NOTE */}

                <div className="mt-[16px]">
                  <Label>
                    ملاحظات المقيم
                  </Label>

                  <textarea
                    value={
                      evaluationNote
                    }
                    onChange={(
                      event
                    ) =>
                      setEvaluationNote(
                        event.target
                          .value
                      )
                    }
                    rows={5}
                    placeholder="اكتب ملخصًا عن أداء الطالب..."
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
                    setShowEvaluationModal(
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
                    saveEvaluation
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

                    px-[18px]

                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  <CheckCircle2
                    size={14}
                  />

                  اعتماد التقييم
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

function EvaluationStatusBadge({
  status,
}) {
  const styles = {
    "جاهز للتقييم":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "تم التقييم":
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "غير جاهز":
      "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
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

function ReadinessRow({
  label,
  value,
  passed,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3

        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[10px]
        py-[9px]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[7px]
        "
      >
        {passed ? (
          <CheckCircle2
            size={14}
            className="text-[#15803D]"
          />
        ) : (
          <AlertTriangle
            size={14}
            className="text-[#BE123C]"
          />
        )}

        <span
          className="
            text-[9px]
            font-medium
            text-[#475569]
          "
        >
          {label}
        </span>
      </div>

      <strong
        className={`
          text-[9px]

          ${
            passed
              ? "text-[#15803D]"
              : "text-[#BE123C]"
          }
        `}
      >
        {value}
      </strong>
    </div>
  );
}

function Label({
  children,
}) {
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

function ScoreInput({
  label,
  value,
  max,
  onChange,
}) {
  return (
    <div>
      <div
        className="
          mb-[6px]

          flex
          items-center
          justify-between
          gap-3
        "
      >
        <Label>
          {label}
        </Label>

        <span
          className="
            text-[8px]
            text-[#94A3B8]
          "
        >
          من {max}
        </span>
      </div>

      <input
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={inputStyle}
      />
    </div>
  );
}

function ScoreBox({
  label,
  value,
  max,
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

          text-[10px]
          font-bold
          text-[#334155]
        "
      >
        {value}
        <span
          className="
            mr-[2px]

            text-[8px]
            font-medium
            text-[#94A3B8]
          "
        >
          / {max}
        </span>
      </p>
    </div>
  );
}

function SummaryBox({
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

        px-[9px]
        py-[10px]

        text-center
      "
    >
      <strong
        className="
          block

          text-[12px]
          text-[#09379A]
        "
      >
        {value}
      </strong>

      <span
        className="
          mt-[2px]
          block

          text-[8px]
          text-[#94A3B8]
        "
      >
        {label}
      </span>
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

function TextBox({
  children,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[11px]
        py-[10px]

        text-[9px]
        leading-[19px]
        text-[#475569]
      "
    >
      {children}
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