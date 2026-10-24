import { useMemo, useState } from "react";

import {
  Award,
  BarChart3,
  CheckCircle2,
  Eye,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   COURSE
========================================================= */

const courseInfo = {
  id: 1,

  code: "TR-C-101",

  title: "مهارات الإنعاش القلبي الرئوي",

  trainer: "د. أحمد خالد",

  totalHours: 12,

  status: "منتهية",
};

/* =========================================================
   EVALUATION CRITERIA
========================================================= */

const criteria = [
  {
    key: "attendance",
    label: "الحضور والالتزام",
    max: 20,
  },

  {
    key: "participation",
    label: "المشاركة والتفاعل",
    max: 20,
  },

  {
    key: "practical",
    label: "الأداء العملي",
    max: 30,
  },

  {
    key: "knowledge",
    label: "المعرفة والفهم",
    max: 20,
  },

  {
    key: "professionalism",
    label: "السلوك المهني",
    max: 10,
  },
];

/* =========================================================
   DATA
========================================================= */

const initialEvaluations = [
  {
    id: 1,

    studentId: "20230765",

    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    attendanceRate: 100,

    completedHours: 12,

    eligibleForEvaluation: true,

    status: "تم التقييم",

    scores: {
      attendance: 20,
      participation: 19,
      practical: 29,
      knowledge: 19,
      professionalism: 9,
    },

    evaluatorNote:
      "أداء ممتاز ومشاركة فعالة خلال الجانب العملي.",

    evaluatedAt: "2026-11-04",
  },

  {
    id: 2,

    studentId: "20231356",

    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    attendanceRate: 92,

    completedHours: 11,

    eligibleForEvaluation: true,

    status: "بانتظار التقييم",

    scores: {
      attendance: 0,
      participation: 0,
      practical: 0,
      knowledge: 0,
      professionalism: 0,
    },

    evaluatorNote: "",

    evaluatedAt: "",
  },

  {
    id: 3,

    studentId: "20231470",

    student: "نور أحمد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    attendanceRate: 67,

    completedHours: 8,

    eligibleForEvaluation: false,

    status: "غير جاهز",

    scores: {
      attendance: 0,
      participation: 0,
      practical: 0,
      knowledge: 0,
      professionalism: 0,
    },

    evaluatorNote: "",

    evaluatedAt: "",
  },

  {
    id: 4,

    studentId: "20231618",

    student: "سلمى خالد يوسف",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    attendanceRate: 100,

    completedHours: 12,

    eligibleForEvaluation: true,

    status: "تم التقييم",

    scores: {
      attendance: 20,
      participation: 17,
      practical: 25,
      knowledge: 17,
      professionalism: 9,
    },

    evaluatorNote:
      "أداء جيد جدًا مع حاجة بسيطة لزيادة الثقة أثناء التطبيق العملي.",

    evaluatedAt: "2026-11-04",
  },

  {
    id: 5,

    studentId: "20231632",

    student: "يوسف رائد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    attendanceRate: 100,

    completedHours: 12,

    eligibleForEvaluation: true,

    status: "تم التقييم",

    scores: {
      attendance: 20,
      participation: 15,
      practical: 22,
      knowledge: 16,
      professionalism: 8,
    },

    evaluatorNote:
      "أداء جيد والطالب أظهر فهمًا مناسبًا لمحتوى الدورة.",

    evaluatedAt: "2026-11-04",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function calculateTotal(scores) {
  return criteria.reduce(
    (total, criterion) =>
      total +
      Number(
        scores[criterion.key] || 0
      ),
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

function calculateResult(total) {
  return total >= 60
    ? "ناجح"
    : "راسب";
}

/* =========================================================
   PAGE
========================================================= */

export default function CourseEvaluations() {
  const [
    evaluations,
    setEvaluations,
  ] = useState(initialEvaluations);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("الكل");

  const [
    resultFilter,
    setResultFilter,
  ] = useState("الكل");

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
      participation: 0,
      practical: 0,
      knowledge: 0,
      professionalism: 0,
    });

  const [
    evaluatorNote,
    setEvaluatorNote,
  ] = useState("");

  /* =========================================================
     ENRICHED DATA
  ========================================================= */

  const enrichedEvaluations =
    useMemo(() => {
      return evaluations.map(
        (evaluation) => {
          const total =
            calculateTotal(
              evaluation.scores
            );

          return {
            ...evaluation,

            total,

            grade:
              calculateGrade(total),

            result:
              calculateResult(total),
          };
        }
      );
    }, [evaluations]);

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const evaluated =
      enrichedEvaluations.filter(
        (item) =>
          item.status ===
          "تم التقييم"
      );

    const totalStudents =
      enrichedEvaluations.length;

    const evaluatedCount =
      evaluated.length;

    const pending =
      enrichedEvaluations.filter(
        (item) =>
          item.status ===
          "بانتظار التقييم"
      ).length;

    const passed =
      evaluated.filter(
        (item) =>
          item.total >= 60
      ).length;

    const average =
      evaluated.length
        ? Math.round(
            evaluated.reduce(
              (
                total,
                evaluation
              ) =>
                total +
                evaluation.total,
              0
            ) /
              evaluated.length
          )
        : 0;

    return [
      {
        title: "إجمالي المتدربين",
        value: totalStudents,
        description:
          "ضمن سجل الدورة",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "تم تقييمهم",
        value: evaluatedCount,
        description:
          "نتائج معتمدة",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "بانتظار التقييم",
        value: pending,
        description:
          "جاهزون لإدخال الدرجات",
        icon: Star,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "متوسط النتائج",
        value: `${average}%`,
        description:
          `${passed} ناجحين حتى الآن`,
        icon: BarChart3,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
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
        (evaluation) => {
          const matchesSearch =
            !query ||
            evaluation.student
              .toLowerCase()
              .includes(query) ||
            evaluation.studentId
              .toLowerCase()
              .includes(query) ||
            evaluation.major
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            evaluation.status ===
              statusFilter;

          let matchesResult = true;

          if (
            resultFilter !==
              "الكل" &&
            evaluation.status ===
              "تم التقييم"
          ) {
            matchesResult =
              evaluation.result ===
              resultFilter;
          }

          if (
            resultFilter !==
              "الكل" &&
            evaluation.status !==
              "تم التقييم"
          ) {
            matchesResult = false;
          }

          return (
            matchesSearch &&
            matchesStatus &&
            matchesResult
          );
        }
      );
    }, [
      enrichedEvaluations,
      searchTerm,
      statusFilter,
      resultFilter,
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
     EVALUATION
  ========================================================= */

  const openEvaluation = (
    evaluation
  ) => {
    if (
      !evaluation
        .eligibleForEvaluation
    ) {
      return;
    }

    setSelectedEvaluation(
      evaluation
    );

    setFormScores({
      ...evaluation.scores,
    });

    setEvaluatorNote(
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
    const number =
      Number(value);

    const normalized =
      Math.max(
        0,
        Math.min(
          number,
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

    if (
      !selectedEvaluation
        .eligibleForEvaluation
    ) {
      return;
    }

    setEvaluations(
      (previous) =>
        previous.map(
          (evaluation) =>
            evaluation.id ===
            selectedEvaluation.id
              ? {
                  ...evaluation,

                  scores: {
                    ...formScores,
                  },

                  evaluatorNote:
                    evaluatorNote.trim(),

                  status:
                    "تم التقييم",

                  evaluatedAt:
                    "2026-11-04",
                }
              : evaluation
        )
    );

    setShowEvaluationModal(false);
    setSelectedEvaluation(null);
  };

  const formTotal =
    calculateTotal(formScores);

  const formGrade =
    calculateGrade(formTotal);

  const formResult =
    calculateResult(formTotal);

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
            {/* =================================================
                BREADCRUMB
            ================================================== */}

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
                الدورات التدريبية
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
                التقييم والنتائج
              </span>
            </div>

            {/* =================================================
                HEADER
            ================================================== */}

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
                تقييمات ونتائج الدورة
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
                تقييم المتدربين بعد
                استكمال متطلبات الدورة،
                واعتماد النتائج ومراجعة
                الدرجات والتقديرات من شاشة
                واحدة.
              </p>
            </section>

            {/* =================================================
                COURSE SUMMARY
            ================================================== */}

            <section
              className="
                mt-[18px]

                rounded-[14px]

                border
                border-[#D7E5FF]

                bg-[#F6F9FF]

                p-[15px]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4

                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div>
                  <p
                    className="
                      m-0

                      text-[8px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    {courseInfo.code}
                  </p>

                  <h2
                    className="
                      m-0
                      mt-[4px]

                      text-[15px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    {courseInfo.title}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[3px]

                      text-[9px]
                      text-[#64748B]
                    "
                  >
                    المدرب:{" "}
                    {courseInfo.trainer}
                  </p>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-[7px]
                  "
                >
                  <SummaryTag
                    label="الساعات"
                    value={`${courseInfo.totalHours} ساعة`}
                  />

                  <SummaryTag
                    label="حالة الدورة"
                    value={
                      courseInfo.status
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                STATS
            ================================================== */}

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

            {/* =================================================
                RESULT OVERVIEW
            ================================================== */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[10px]

                md:grid-cols-4
              "
            >
              <ResultSummary
                label="ممتاز"
                value={
                  enrichedEvaluations.filter(
                    (item) =>
                      item.status ===
                        "تم التقييم" &&
                      item.grade ===
                        "ممتاز"
                  ).length
                }
              />

              <ResultSummary
                label="جيد جدًا"
                value={
                  enrichedEvaluations.filter(
                    (item) =>
                      item.status ===
                        "تم التقييم" &&
                      item.grade ===
                        "جيد جدًا"
                  ).length
                }
              />

              <ResultSummary
                label="جيد / مقبول"
                value={
                  enrichedEvaluations.filter(
                    (item) =>
                      item.status ===
                        "تم التقييم" &&
                      [
                        "جيد",
                        "مقبول",
                      ].includes(
                        item.grade
                      )
                  ).length
                }
              />

              <ResultSummary
                label="راسب"
                value={
                  enrichedEvaluations.filter(
                    (item) =>
                      item.status ===
                        "تم التقييم" &&
                      item.grade ===
                        "راسب"
                  ).length
                }
              />
            </section>

            {/* =================================================
                FILTERS
            ================================================== */}

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
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="اسم الطالب، الرقم أو التخصص..."
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
                  label="حالة التقييم"
                  value={statusFilter}
                  onChange={
                    setStatusFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="تم التقييم">
                    تم التقييم
                  </option>

                  <option value="بانتظار التقييم">
                    بانتظار التقييم
                  </option>

                  <option value="غير جاهز">
                    غير جاهز
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="النتيجة"
                  value={resultFilter}
                  onChange={
                    setResultFilter
                  }
                >
                  <option value="الكل">
                    كل النتائج
                  </option>

                  <option value="ناجح">
                    ناجح
                  </option>

                  <option value="راسب">
                    راسب
                  </option>
                </FilterSelect>
              </div>
            </section>

            {/* =================================================
                TABLE
            ================================================== */}

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
                    نتائج المتدربين
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    إدخال التقييم وعرض
                    النتيجة من نفس القائمة
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
                  متدرب
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
                        المتدرب
                      </TableHead>

                      <TableHead>
                        الحضور
                      </TableHead>

                      <TableHead>
                        الساعات
                      </TableHead>

                      <TableHead>
                        حالة التقييم
                      </TableHead>

                      <TableHead>
                        الدرجة
                      </TableHead>

                      <TableHead>
                        التقدير
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
                      (evaluation) => (
                        <tr
                          key={
                            evaluation.id
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
                                  evaluation.student
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
                                  evaluation.studentId
                                }
                                {" · "}
                                {
                                  evaluation.major
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <AttendanceBadge
                              value={
                                evaluation.attendanceRate
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-bold
                                text-[#475569]
                              "
                            >
                              {
                                evaluation.completedHours
                              }
                              /
                              {
                                courseInfo.totalHours
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <EvaluationStatusBadge
                              status={
                                evaluation.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[10px]
                                font-bold
                                text-[#09379A]
                              "
                            >
                              {evaluation.status ===
                              "تم التقييم"
                                ? `${evaluation.total}%`
                                : "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-bold
                                text-[#475569]
                              "
                            >
                              {evaluation.status ===
                              "تم التقييم"
                                ? evaluation.grade
                                : "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            {evaluation.status ===
                            "تم التقييم" ? (
                              <ResultBadge
                                result={
                                  evaluation.result
                                }
                              />
                            ) : (
                              <span className="text-[9px] text-[#94A3B8]">
                                —
                              </span>
                            )}
                          </TableCell>

                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  evaluation
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
                  (evaluation) => (
                    <article
                      key={
                        evaluation.id
                      }
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
                              evaluation.student
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
                              evaluation.studentId
                            }
                            {" · "}
                            {
                              evaluation.major
                            }
                          </span>
                        </div>

                        <EvaluationStatusBadge
                          status={
                            evaluation.status
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
                          label="الحضور"
                          value={`${evaluation.attendanceRate}%`}
                        />

                        <MobileInfo
                          label="الساعات"
                          value={`${evaluation.completedHours}/${courseInfo.totalHours}`}
                        />

                        <MobileInfo
                          label="الدرجة"
                          value={
                            evaluation.status ===
                            "تم التقييم"
                              ? `${evaluation.total}%`
                              : "—"
                          }
                        />

                        <MobileInfo
                          label="التقدير"
                          value={
                            evaluation.status ===
                            "تم التقييم"
                              ? evaluation.grade
                              : "—"
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openDetails(
                            evaluation
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
                        عرض النتيجة
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
              {/* HEADER */}

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
                    نتيجة المتدرب
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

              {/* BODY */}

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

                        text-[15px]
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
                        mt-[3px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {
                        selectedEvaluation.major
                      }
                      {" · "}
                      {
                        selectedEvaluation.college
                      }
                    </p>
                  </div>

                  <EvaluationStatusBadge
                    status={
                      selectedEvaluation.status
                    }
                  />
                </div>

                <SectionTitle>
                  جاهزية التقييم
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="نسبة الحضور"
                    value={`${selectedEvaluation.attendanceRate}%`}
                  />

                  <InfoBox
                    label="الساعات"
                    value={`${selectedEvaluation.completedHours}/${courseInfo.totalHours}`}
                  />
                </div>

                {!selectedEvaluation
                  .eligibleForEvaluation && (
                  <div
                    className="
                      mt-[10px]

                      rounded-[10px]

                      border
                      border-[#FED7AA]

                      bg-[#FFF7ED]

                      px-[11px]
                      py-[10px]

                      text-[9px]
                      leading-[18px]
                      text-[#9A3412]
                    "
                  >
                    المتدرب غير جاهز
                    للتقييم النهائي بسبب
                    عدم استكمال متطلبات
                    الحضور أو الساعات.
                  </div>
                )}

                {selectedEvaluation.status ===
                  "تم التقييم" && (
                  <>
                    <SectionTitle>
                      النتيجة النهائية
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

                              text-[8px]
                              text-[#64748B]
                            "
                          >
                            الدرجة
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
                              mt-[3px]

                              text-[11px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {
                              selectedEvaluation.grade
                            }
                          </p>

                          <ResultBadge
                            result={
                              selectedEvaluation.result
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <SectionTitle>
                      تفاصيل الدرجات
                    </SectionTitle>

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      {criteria.map(
                        (criterion) => (
                          <ScoreBox
                            key={
                              criterion.key
                            }
                            label={
                              criterion.label
                            }
                            value={
                              selectedEvaluation
                                .scores[
                                criterion.key
                              ]
                            }
                            max={
                              criterion.max
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

              {/* FOOTER */}

              {selectedEvaluation
                .eligibleForEvaluation && (
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
                    <Star size={14} />

                    {selectedEvaluation.status ===
                    "تم التقييم"
                      ? "تعديل التقييم"
                      : "إدخال التقييم"}
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
                max-w-[780px]
                overflow-y-auto

                rounded-[16px]

                bg-white
              "
            >
              {/* HEADER */}

              <div
                className="
                  sticky
                  top-0
                  z-10

                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#E2E8F0]

                  bg-white

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
                    تقييم المتدرب
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
                      selectedEvaluation.studentId
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

              {/* BODY */}

              <div
                className="
                  px-5
                  py-5
                "
              >
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]

                    md:grid-cols-3
                  "
                >
                  <SummaryBox
                    label="الحضور"
                    value={`${selectedEvaluation.attendanceRate}%`}
                  />

                  <SummaryBox
                    label="الساعات"
                    value={`${selectedEvaluation.completedHours}/${courseInfo.totalHours}`}
                  />

                  <SummaryBox
                    label="الحالة"
                    value="جاهز للتقييم"
                  />
                </div>

                <SectionTitle>
                  عناصر التقييم
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[11px]

                    sm:grid-cols-2
                  "
                >
                  {criteria.map(
                    (criterion) => (
                      <ScoreInput
                        key={
                          criterion.key
                        }
                        label={
                          criterion.label
                        }
                        max={
                          criterion.max
                        }
                        value={
                          formScores[
                            criterion.key
                          ]
                        }
                        onChange={(value) =>
                          updateScore(
                            criterion.key,
                            value,
                            criterion.max
                          )
                        }
                      />
                    )
                  )}
                </div>

                {/* RESULT PREVIEW */}

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

                          text-[8px]
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
                          mt-[3px]
                          block

                          text-[13px]
                          text-[#334155]
                        "
                      >
                        {formGrade}
                      </strong>

                      <div className="mt-[5px]">
                        <ResultBadge
                          result={
                            formResult
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[16px]">
                  <Label>
                    ملاحظات المقيم
                  </Label>

                  <textarea
                    value={evaluatorNote}
                    onChange={(event) =>
                      setEvaluatorNote(
                        event.target.value
                      )
                    }
                    rows={5}
                    placeholder="اكتب ملاحظاتك حول أداء المتدرب..."
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

              {/* FOOTER */}

              <div
                className="
                  sticky
                  bottom-0

                  flex
                  flex-col-reverse
                  gap-[8px]

                  border-t
                  border-[#E2E8F0]

                  bg-white

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
                  onClick={saveEvaluation}
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

                  اعتماد النتيجة
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
    "تم التقييم":
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "بانتظار التقييم":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "غير جاهز":
      "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]",
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

function ResultBadge({
  result,
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
          result === "ناجح"
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#FFF1F2] text-[#BE123C]"
        }
      `}
    >
      {result}
    </span>
  );
}

function AttendanceBadge({
  value,
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
          value >= 85
            ? "bg-[#ECFDF3] text-[#15803D]"
            : value >= 70
            ? "bg-[#FFF7ED] text-[#C2410C]"
            : "bg-[#FFF1F2] text-[#BE123C]"
        }
      `}
    >
      {value}%
    </span>
  );
}

function ResultSummary({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[11px]

        border
        border-[#E2E8F0]

        bg-white

        px-[12px]
        py-[11px]
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
            font-medium
            text-[#64748B]
          "
        >
          {label}
        </span>

        <strong
          className="
            text-[16px]
            text-[#09379A]
          "
        >
          {value}
        </strong>
      </div>
    </div>
  );
}

function ScoreInput({
  label,
  max,
  value,
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
        <Label>{label}</Label>

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

function SummaryTag({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[8px]

        bg-white

        px-[10px]
        py-[7px]
      "
    >
      <span
        className="
          text-[7px]
          text-[#94A3B8]
        "
      >
        {label}
      </span>

      <strong
        className="
          mr-[5px]

          text-[8px]
          text-[#334155]
        "
      >
        {value}
      </strong>
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
          leading-[17px]
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