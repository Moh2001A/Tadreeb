import { useMemo, useState } from "react";

import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  Search,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialStudents = [
  {
    id: 1,

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    organization:
      "شركة التقنية المتقدمة",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    requiredVisits: 2,
    completedVisits: 2,

    attendanceRate: 96,

    evaluationScore: 89,
    evaluationGrade: "جيد جدًا",

    finalReportSubmitted: true,
    finalReportApproved: false,

    supervisorEvaluationCompleted: true,

    completionStatus:
      "جاهز للاعتماد",

    finalDecision: "",

    finalDecisionNote: "",

    certificateStatus:
      "غير متاح",

    submittedAt:
      "2026-10-23",
  },

  {
    id: 2,

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    organization: "بنك فلسطين",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    requiredVisits: 2,
    completedVisits: 2,

    attendanceRate: 98,

    evaluationScore: 97,
    evaluationGrade: "ممتاز",

    finalReportSubmitted: true,
    finalReportApproved: true,

    supervisorEvaluationCompleted: true,

    completionStatus:
      "مكتمل",

    finalDecision:
      "اعتماد الإتمام",

    finalDecisionNote:
      "تم استيفاء جميع متطلبات التدريب.",

    certificateStatus:
      "جاهزة للإصدار",

    submittedAt:
      "2026-10-22",
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

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 110,

    requiredVisits: 2,
    completedVisits: 1,

    attendanceRate: 91,

    evaluationScore: null,
    evaluationGrade: "—",

    finalReportSubmitted: false,
    finalReportApproved: false,

    supervisorEvaluationCompleted: true,

    completionStatus:
      "غير جاهز",

    finalDecision: "",

    finalDecisionNote: "",

    certificateStatus:
      "غير متاح",

    submittedAt:
      "2026-10-23",
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

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 160,
    completedHours: 160,

    requiredVisits: 3,
    completedVisits: 3,

    attendanceRate: 100,

    evaluationScore: 97,
    evaluationGrade: "ممتاز",

    finalReportSubmitted: true,
    finalReportApproved: true,

    supervisorEvaluationCompleted: true,

    completionStatus:
      "مكتمل",

    finalDecision:
      "اعتماد الإتمام",

    finalDecisionNote:
      "تم اعتماد إنهاء التدريب السريري بنجاح.",

    certificateStatus:
      "تم الإصدار",

    submittedAt:
      "2026-10-20",
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

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 140,
    completedHours: 140,

    requiredVisits: 2,
    completedVisits: 2,

    attendanceRate: 94,

    evaluationScore: 83,
    evaluationGrade: "جيد جدًا",

    finalReportSubmitted: true,
    finalReportApproved: false,

    supervisorEvaluationCompleted: true,

    completionStatus:
      "جاهز للاعتماد",

    finalDecision: "",

    finalDecisionNote: "",

    certificateStatus:
      "غير متاح",

    submittedAt:
      "2026-10-23",
  },
];

/* =========================================================
   READINESS
========================================================= */

function evaluateCompletion(student) {
  const hoursPassed =
    student.completedHours >=
    student.requiredHours;

  const visitsPassed =
    student.completedVisits >=
    student.requiredVisits;

  const attendancePassed =
    student.attendanceRate >= 75;

  const evaluationPassed =
    student.evaluationScore !== null &&
    student.evaluationScore >= 60;

  const reportSubmitted =
    student.finalReportSubmitted;

  const supervisorEvaluation =
    student.supervisorEvaluationCompleted;

  const ready =
    hoursPassed &&
    visitsPassed &&
    attendancePassed &&
    evaluationPassed &&
    reportSubmitted &&
    supervisorEvaluation;

  return {
    ready,

    checks: [
      {
        label: "الساعات التدريبية",
        value: `${student.completedHours}/${student.requiredHours}`,
        passed: hoursPassed,
      },

      {
        label: "الزيارات المطلوبة",
        value: `${student.completedVisits}/${student.requiredVisits}`,
        passed: visitsPassed,
      },

      {
        label: "نسبة الحضور",
        value: `${student.attendanceRate}%`,
        passed: attendancePassed,
      },

      {
        label: "التقييم النهائي",
        value:
          student.evaluationScore !== null
            ? `${student.evaluationScore}%`
            : "غير مكتمل",
        passed: evaluationPassed,
      },

      {
        label: "التقرير النهائي",
        value: reportSubmitted
          ? "مرفوع"
          : "غير مرفوع",
        passed: reportSubmitted,
      },

      {
        label: "تقييم مشرف الجهة",
        value: supervisorEvaluation
          ? "مكتمل"
          : "غير مكتمل",
        passed:
          supervisorEvaluation,
      },
    ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function FinalReportApproval() {
  const [students, setStudents] =
    useState(initialStudents);

  const [searchTerm, setSearchTerm] =
    useState("");

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
    showDecisionModal,
    setShowDecisionModal,
  ] = useState(false);

  const [decisionType, setDecisionType] =
    useState("");

  const [decisionNote, setDecisionNote] =
    useState("");

  /* =========================================================
     ENRICH
  ========================================================= */

  const enrichedStudents =
    useMemo(
      () =>
        students.map((student) => ({
          ...student,
          readiness:
            evaluateCompletion(
              student
            ),
        })),
      [students]
    );

  const periods = useMemo(
    () => [
      ...new Set(
        students.map(
          (student) =>
            student.trainingPeriod
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
      enrichedStudents.length;

    const ready =
      enrichedStudents.filter(
        (student) =>
          student.readiness.ready &&
          student.completionStatus ===
            "جاهز للاعتماد"
      ).length;

    const completed =
      enrichedStudents.filter(
        (student) =>
          student.completionStatus ===
          "مكتمل"
      ).length;

    const incomplete =
      enrichedStudents.filter(
        (student) =>
          !student.readiness.ready
      ).length;

    return [
      {
        title: "إجمالي الملفات",
        value: total,
        description:
          "طلبة في مرحلة الإتمام",
        icon: FileCheck2,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "جاهزة للاعتماد",
        value: ready,
        description:
          "استوفت جميع الشروط",
        icon: ShieldCheck,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "مكتملة",
        value: completed,
        description:
          "تم اعتماد الإتمام",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "غير جاهزة",
        value: incomplete,
        description:
          "يوجد متطلبات ناقصة",
        icon: AlertTriangle,
        bg: "bg-[#FFF1F2]",
        color: "text-[#BE123C]",
      },
    ];
  }, [enrichedStudents]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return enrichedStudents.filter(
        (student) => {
          const matchesSearch =
            !query ||
            student.student
              .toLowerCase()
              .includes(query) ||
            student.studentId
              .toLowerCase()
              .includes(query) ||
            student.major
              .toLowerCase()
              .includes(query) ||
            student.organization
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            student.completionStatus ===
              statusFilter;

          const matchesPeriod =
            periodFilter ===
              "الكل" ||
            student.trainingPeriod ===
              periodFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesPeriod
          );
        }
      );
    }, [
      enrichedStudents,
      searchTerm,
      statusFilter,
      periodFilter,
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
     REPORT APPROVAL
  ========================================================= */

  const approveReport = (
    student
  ) => {
    setStudents((previous) =>
      previous.map((item) =>
        item.id === student.id
          ? {
              ...item,
              finalReportApproved:
                true,
            }
          : item
      )
    );

    setShowDetails(false);
    setSelectedStudent(null);
  };

  /* =========================================================
     FINAL DECISION
  ========================================================= */

  const openDecision = (
    student,
    type
  ) => {
    setSelectedStudent(student);
    setDecisionType(type);
    setDecisionNote(
      student.finalDecisionNote ||
        ""
    );

    setShowDetails(false);
    setShowDecisionModal(true);
  };

  const saveDecision = () => {
    if (!selectedStudent) {
      return;
    }

    if (
      decisionType ===
        "اعتماد الإتمام" &&
      !selectedStudent.readiness
        .ready
    ) {
      return;
    }

    if (
      decisionType ===
        "إعادة للاستكمال" &&
      !decisionNote.trim()
    ) {
      return;
    }

    setStudents((previous) =>
      previous.map((student) =>
        student.id ===
        selectedStudent.id
          ? {
              ...student,

              completionStatus:
                decisionType ===
                "اعتماد الإتمام"
                  ? "مكتمل"
                  : "غير جاهز",

              finalDecision:
                decisionType,

              finalDecisionNote:
                decisionNote.trim(),

              finalReportApproved:
                decisionType ===
                "اعتماد الإتمام"
                  ? true
                  : student.finalReportApproved,

              certificateStatus:
                decisionType ===
                "اعتماد الإتمام"
                  ? "جاهزة للإصدار"
                  : "غير متاح",
            }
          : student
      )
    );

    setShowDecisionModal(false);
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
                التقرير النهائي والإتمام
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
                اعتماد الإتمام
              </h1>

              <p
                className="
                  m-0
                  mt-[3px]

                  max-w-[900px]

                  text-[11px]
                  leading-[21px]
                  text-[#64748B]

                  sm:text-[12px]
                "
              >
                المراجعة النهائية لملف
                التدريب بعد استكمال الساعات
                والحضور والزيارات والتقييم
                والتقرير النهائي، تمهيدًا
                لاعتماد إنهاء التدريب وإتاحة
                الشهادة.
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
                          <Icon size={20} />
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

                  md:grid-cols-3
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
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
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
                  value={periodFilter}
                  onChange={setPeriodFilter}
                >
                  <option value="الكل">
                    كل الفترات
                  </option>

                  {periods.map((period) => (
                    <option
                      key={period}
                      value={period}
                    >
                      {period}
                    </option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="حالة الإتمام"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="جاهز للاعتماد">
                    جاهز للاعتماد
                  </option>

                  <option value="مكتمل">
                    مكتمل
                  </option>

                  <option value="غير جاهز">
                    غير جاهز
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
                    ملفات الإتمام
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    اعتماد إنهاء التدريب
                    بعد استيفاء جميع المتطلبات
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
                  ملف
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
                        الجهة
                      </TableHead>

                      <TableHead>
                        الساعات
                      </TableHead>

                      <TableHead>
                        الزيارات
                      </TableHead>

                      <TableHead>
                        التقييم
                      </TableHead>

                      <TableHead>
                        التقرير
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
                      (student) => (
                        <tr
                          key={student.id}
                          className="
                            border-t
                            border-[#EEF2F7]

                            hover:bg-[#FBFCFE]
                          "
                        >
                          <TableCell>
                            <div className="min-w-[145px]">
                              <p
                                className="
                                  m-0

                                  text-[10px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {
                                  student.student
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
                                {student.major}
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
                                student.organization
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <CheckValue
                              passed={
                                student.completedHours >=
                                student.requiredHours
                              }
                            >
                              {
                                student.completedHours
                              }
                              /
                              {
                                student.requiredHours
                              }
                            </CheckValue>
                          </TableCell>

                          <TableCell>
                            <CheckValue
                              passed={
                                student.completedVisits >=
                                student.requiredVisits
                              }
                            >
                              {
                                student.completedVisits
                              }
                              /
                              {
                                student.requiredVisits
                              }
                            </CheckValue>
                          </TableCell>

                          <TableCell>
                            {student.evaluationScore !==
                            null ? (
                              <div>
                                <strong
                                  className="
                                    text-[10px]
                                    text-[#09379A]
                                  "
                                >
                                  {
                                    student.evaluationScore
                                  }
                                  %
                                </strong>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#64748B]
                                  "
                                >
                                  {
                                    student.evaluationGrade
                                  }
                                </span>
                              </div>
                            ) : (
                              <span className="text-[9px] text-[#94A3B8]">
                                —
                              </span>
                            )}
                          </TableCell>

                          <TableCell>
                            <CheckValue
                              passed={
                                student.finalReportSubmitted
                              }
                            >
                              {student.finalReportSubmitted
                                ? "مرفوع"
                                : "ناقص"}
                            </CheckValue>
                          </TableCell>

                          <TableCell>
                            <CompletionBadge
                              status={
                                student.completionStatus
                              }
                            />
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
                              <Eye size={14} />
                              مراجعة
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
                            {student.student}
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {student.studentId}
                            {" · "}
                            {student.major}
                          </span>
                        </div>

                        <CompletionBadge
                          status={
                            student.completionStatus
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
                          value={`${student.completedHours}/${student.requiredHours}`}
                        />

                        <MobileInfo
                          label="الزيارات"
                          value={`${student.completedVisits}/${student.requiredVisits}`}
                        />

                        <MobileInfo
                          label="التقييم"
                          value={
                            student.evaluationScore !==
                            null
                              ? `${student.evaluationScore}%`
                              : "غير مكتمل"
                          }
                        />

                        <MobileInfo
                          label="الشهادة"
                          value={
                            student.certificateStatus
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

                        مراجعة الملف
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
          DETAILS
      ====================================================== */}

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
                    المراجعة النهائية
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedStudent.studentId}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(false)
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
                {/* STUDENT */}

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
                        {selectedStudent.student}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[2px]

                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        {selectedStudent.major}
                        {" · "}
                        {selectedStudent.organization}
                      </p>
                    </div>
                  </div>

                  <CompletionBadge
                    status={
                      selectedStudent.completionStatus
                    }
                  />
                </div>

                <SectionTitle>
                  حالة المتطلبات
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {selectedStudent.readiness.checks.map(
                    (check) => (
                      <RequirementRow
                        key={
                          check.label
                        }
                        {...check}
                      />
                    )
                  )}
                </div>

                {/* EVALUATION */}

                <SectionTitle>
                  التقييم النهائي
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="الدرجة"
                    value={
                      selectedStudent.evaluationScore !==
                      null
                        ? `${selectedStudent.evaluationScore}%`
                        : "غير مكتمل"
                    }
                  />

                  <InfoBox
                    label="التقدير"
                    value={
                      selectedStudent.evaluationGrade
                    }
                  />
                </div>

                {/* REPORT */}

                <SectionTitle>
                  التقرير النهائي
                </SectionTitle>

                <div
                  className="
                    rounded-[10px]

                    border
                    border-[#E7ECF2]

                    bg-[#FAFBFC]

                    p-[12px]
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
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <FileText
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
                          تقرير التدريب النهائي
                        </p>

                        <span
                          className="
                            mt-[2px]
                            block

                            text-[8px]
                            text-[#94A3B8]
                          "
                        >
                          {selectedStudent.finalReportSubmitted
                            ? "تم رفع التقرير"
                            : "لم يتم رفع التقرير"}
                        </span>
                      </div>
                    </div>

                    {selectedStudent.finalReportSubmitted && (
                      <ReportBadge
                        approved={
                          selectedStudent.finalReportApproved
                        }
                      />
                    )}
                  </div>

                  {selectedStudent.finalReportSubmitted &&
                    !selectedStudent.finalReportApproved &&
                    selectedStudent.completionStatus !==
                      "مكتمل" && (
                      <button
                        type="button"
                        onClick={() =>
                          approveReport(
                            selectedStudent
                          )
                        }
                        className="
                          mt-[11px]

                          min-h-[36px]
                          w-full

                          rounded-[8px]

                          border
                          border-[#D7E5FF]

                          bg-[#F6F9FF]

                          text-[9px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        اعتماد التقرير النهائي
                      </button>
                    )}
                </div>

                {/* DECISION */}

                {selectedStudent.finalDecision && (
                  <>
                    <SectionTitle>
                      قرار الإتمام
                    </SectionTitle>

                    <div
                      className="
                        rounded-[10px]

                        border
                        border-[#D7E5FF]

                        bg-[#F6F9FF]

                        p-[12px]
                      "
                    >
                      <p
                        className="
                          m-0

                          text-[9px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        {
                          selectedStudent.finalDecision
                        }
                      </p>

                      <p
                        className="
                          m-0
                          mt-[6px]

                          text-[9px]
                          leading-[18px]
                          text-[#475569]
                        "
                      >
                        {selectedStudent.finalDecisionNote ||
                          "لا توجد ملاحظات."}
                      </p>
                    </div>
                  </>
                )}

                {/* CERTIFICATE */}

                <SectionTitle>
                  حالة الشهادة
                </SectionTitle>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3

                    rounded-[10px]

                    border
                    border-[#E7ECF2]

                    bg-[#FAFBFC]

                    px-[11px]
                    py-[10px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <Award
                      size={18}
                      className="text-[#09379A]"
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        text-[#475569]
                      "
                    >
                      شهادة التدريب
                    </span>
                  </div>

                  <CertificateBadge
                    status={
                      selectedStudent.certificateStatus
                    }
                  />
                </div>

                {!selectedStudent.readiness.ready && (
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
                      لا يمكن اعتماد إنهاء
                      التدريب قبل استكمال
                      جميع المتطلبات الموضحة
                      أعلاه.
                    </p>
                  </div>
                )}
              </div>

              {/* ACTIONS */}

              {selectedStudent.completionStatus !==
                "مكتمل" && (
                <div
                  className="
                    flex
                    gap-[7px]

                    border-t
                    border-[#E2E8F0]

                    px-5
                    py-[14px]
                  "
                >
                  {selectedStudent.readiness.ready && (
                    <button
                      type="button"
                      onClick={() =>
                        openDecision(
                          selectedStudent,
                          "اعتماد الإتمام"
                        )
                      }
                      className="
                        flex
                        min-h-[40px]
                        flex-1
                        items-center
                        justify-center
                        gap-[5px]

                        rounded-[8px]

                        border-0

                        bg-[#15803D]

                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      <CheckCircle2
                        size={14}
                      />

                      اعتماد الإتمام
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedStudent,
                        "إعادة للاستكمال"
                      )
                    }
                    className="
                      flex
                      min-h-[40px]
                      flex-1
                      items-center
                      justify-center
                      gap-[5px]

                      rounded-[8px]

                      border
                      border-[#FED7AA]

                      bg-[#FFF7ED]

                      text-[9px]
                      font-bold
                      text-[#C2410C]
                    "
                  >
                    <XCircle
                      size={14}
                    />

                    إعادة للاستكمال
                  </button>
                </div>
              )}
            </aside>
          </>
        )}

      {/* =====================================================
          DECISION MODAL
      ====================================================== */}

      {showDecisionModal &&
        selectedStudent && (
          <div
            onClick={() =>
              setShowDecisionModal(false)
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
                    {decisionType ===
                    "اعتماد الإتمام"
                      ? "اعتماد إنهاء التدريب"
                      : "إعادة الملف للاستكمال"}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedStudent.student}
                    {" · "}
                    {selectedStudent.studentId}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDecisionModal(false)
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
                {decisionType ===
                  "اعتماد الإتمام" && (
                  <div
                    className="
                      mb-[14px]

                      flex
                      items-start
                      gap-[8px]

                      rounded-[10px]

                      border
                      border-[#BBF7D0]

                      bg-[#ECFDF3]

                      px-[11px]
                      py-[10px]
                    "
                  >
                    <CheckCircle2
                      size={16}
                      className="
                        mt-[1px]
                        shrink-0
                        text-[#15803D]
                      "
                    />

                    <p
                      className="
                        m-0

                        text-[9px]
                        leading-[18px]
                        text-[#166534]
                      "
                    >
                      بعد تأكيد هذا القرار
                      سيصبح التدريب مكتملًا
                      وسيصبح الطالب جاهزًا
                      لإصدار شهادة التدريب.
                    </p>
                  </div>
                )}

                <Label>
                  ملاحظات القرار
                  {decisionType ===
                    "إعادة للاستكمال" &&
                    " *"}
                </Label>

                <textarea
                  value={decisionNote}
                  onChange={(event) =>
                    setDecisionNote(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder={
                    decisionType ===
                    "اعتماد الإتمام"
                      ? "يمكن إضافة ملاحظة نهائية..."
                      : "اكتب ما يجب استكماله قبل إعادة الاعتماد..."
                  }
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
                    setShowDecisionModal(false)
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
                  onClick={saveDecision}
                  className={`
                    min-h-[40px]

                    rounded-[8px]

                    border-0

                    px-[18px]

                    text-[9px]
                    font-bold
                    text-white

                    ${
                      decisionType ===
                      "اعتماد الإتمام"
                        ? "bg-[#15803D]"
                        : "bg-[#C2410C]"
                    }
                  `}
                >
                  تأكيد القرار
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

function CompletionBadge({
  status,
}) {
  const styles = {
    "جاهز للاعتماد":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    مكتمل:
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

function CertificateBadge({
  status,
}) {
  const styles = {
    "جاهزة للإصدار":
      "bg-[#FFF7ED] text-[#C2410C]",

    "تم الإصدار":
      "bg-[#ECFDF3] text-[#15803D]",

    "غير متاح":
      "bg-[#F1F5F9] text-[#64748B]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        rounded-full

        px-[8px]

        text-[8px]
        font-bold

        ${
          styles[status] ||
          "bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function ReportBadge({
  approved,
}) {
  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        rounded-full

        px-[8px]

        text-[8px]
        font-bold

        ${
          approved
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#FFF7ED] text-[#C2410C]"
        }
      `}
    >
      {approved
        ? "معتمد"
        : "بانتظار الاعتماد"}
    </span>
  );
}

function CheckValue({
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

function RequirementRow({
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
          <XCircle
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
          onChange(event.target.value)
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