import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  Search,
  SlidersHorizontal,
  ArrowDownUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Clock3,
  Percent,
  Star,
  X,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const INITIAL_EVALUATIONS = [
  {
    id: 1,
    student: "أمل أحمد",
    fieldScore: 4.0,
    academicScore: 4.5,
    finalScore: 4.25,
    status: "completed",
  },
  {
    id: 2,
    student: "محمود رضوان",
    fieldScore: 3.5,
    academicScore: null,
    finalScore: null,
    status: "review",
  },
  {
    id: 3,
    student: "أنس البيطار",
    fieldScore: 4.5,
    academicScore: 4.5,
    finalScore: 4.5,
    status: "approved",
  },
  {
    id: 4,
    student: "هدى شهير",
    fieldScore: null,
    academicScore: null,
    finalScore: null,
    status: "not_started",
  },
  {
    id: 5,
    student: "سارة عبد الرحمن",
    fieldScore: 4.2,
    academicScore: 4.4,
    finalScore: 4.3,
    status: "completed",
  },
  {
    id: 6,
    student: "بلال الشيخ",
    fieldScore: 3.8,
    academicScore: null,
    finalScore: null,
    status: "review",
  },
  {
    id: 7,
    student: "نور خليل",
    fieldScore: 4.8,
    academicScore: 4.6,
    finalScore: 4.7,
    status: "approved",
  },
  {
    id: 8,
    student: "محمد العطار",
    fieldScore: null,
    academicScore: null,
    finalScore: null,
    status: "not_started",
  },
];

const STATUS_OPTIONS = [
  {
    value: "all",
    label: "كل الحالات",
  },
  {
    value: "completed",
    label: "مكتمل",
  },
  {
    value: "review",
    label: "قيد المراجعة",
  },
  {
    value: "approved",
    label: "معتمد",
  },
  {
    value: "not_started",
    label: "لم يبدأ",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Evaluations() {
  const navigate = useNavigate();

  const [evaluations] = useState(
    INITIAL_EVALUATIONS
  );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [sortOrder, setSortOrder] =
    useState("name");

  const [showFilters, setShowFilters] =
    useState(false);

  const [showSort, setShowSort] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    selectedEvaluation,
    setSelectedEvaluation,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const pageSize = 4;

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const total = 186;
    const completed = 142;
    const review = 28;

    const scored = evaluations.filter(
      (item) =>
        item.finalScore !== null
    );

    const average =
      scored.length > 0
        ? (
            scored.reduce(
              (sum, item) =>
                sum + item.finalScore,
              0
            ) / scored.length
          ).toFixed(1)
        : "0.0";

    return {
      total,
      completed,
      review,
      average,
    };
  }, [evaluations]);

  /* =======================================================
     FILTER / SORT
  ======================================================= */

  const filteredEvaluations =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      let result =
        evaluations.filter(
          (evaluation) => {
            const matchesSearch =
              !query ||
              evaluation.student
                .toLowerCase()
                .includes(query);

            const matchesStatus =
              statusFilter === "all" ||
              evaluation.status ===
                statusFilter;

            return (
              matchesSearch &&
              matchesStatus
            );
          }
        );

      result = [...result].sort(
        (a, b) => {
          if (sortOrder === "name") {
            return a.student.localeCompare(
              b.student,
              "ar"
            );
          }

          if (sortOrder === "field") {
            return (
              (b.fieldScore || 0) -
              (a.fieldScore || 0)
            );
          }

          if (
            sortOrder === "academic"
          ) {
            return (
              (b.academicScore || 0) -
              (a.academicScore || 0)
            );
          }

          if (sortOrder === "final") {
            return (
              (b.finalScore || 0) -
              (a.finalScore || 0)
            );
          }

          return 0;
        }
      );

      return result;
    }, [
      evaluations,
      search,
      statusFilter,
      sortOrder,
    ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEvaluations.length /
        pageSize
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const visibleEvaluations =
    filteredEvaluations.slice(
      (safePage - 1) * pageSize,
      safePage * pageSize
    );

  /* =======================================================
     ACTIONS
  ======================================================= */

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event(
        "toggle-student-sidebar"
      )
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortOrder("name");
    setCurrentPage(1);
    setShowFilters(false);
    setShowSort(false);
  };

  const openDetails = (
    evaluation
  ) => {
    setSelectedEvaluation(
      evaluation
    );

    setShowDetails(true);
  };

  return (
    <div
      dir="rtl"
      className="
        flex
        h-screen
        w-full
        overflow-hidden

        bg-[#F8FAFC]

        font-['Cairo']
        text-[#111C2D]
      "
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          PAGE
      ====================================================== */}

      <div
        className="
          flex
          h-screen
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className="
            z-30

            flex
            h-[72px]
            w-full
            shrink-0

            items-center
            justify-between

            border-b
            border-[#E6EBF5]

            bg-white

            px-4

            sm:px-6
            lg:px-8
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="فتح القائمة"
              className="
                flex
                h-[38px]
                w-[38px]

                items-center
                justify-center

                rounded-[8px]

                text-[#09379A]

                hover:bg-[#F1F5F9]

                lg:hidden
              "
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/announcements"
                )
              }
              aria-label="الإشعارات"
              className="
                relative

                flex
                h-[38px]
                w-[38px]

                items-center
                justify-center

                rounded-[8px]

                text-[#111C2D]

                hover:bg-[#F8FAFC]
              "
            >
              <Bell size={20} />

              <span
                className="
                  absolute
                  right-[6px]
                  top-[5px]

                  h-[7px]
                  w-[7px]

                  rounded-full

                  bg-[#FF6B35]
                "
              />
            </button>
          </div>

          {/* USER */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-[44px]
                w-[44px]
                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[#E6EBF5]

                text-[12px]
                font-bold
                text-[#09379A]
              "
            >
              سم
            </div>

            <div>
              <p
                className="
                  m-0
                  text-[12px]
                  font-bold
                "
              >
                د. سامر يوسف
              </p>

              <p
                className="
                  m-0
                  text-[10px]
                  text-[#64748B]
                "
              >
                مشرف أكاديمي
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
            السكرول فقط هنا
        ================================================== */}

        <main
          className="
            w-full
            min-w-0
            flex-1

            overflow-x-hidden
            overflow-y-auto

            px-4
            pb-7
            pt-5

            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1450px]
            "
          >
            {/* =============================================
                BREADCRUMB
            ============================================== */}

            <div
              className="
                mb-8

                flex
                items-center
                gap-2

                text-[12px]
                text-[#64748B]
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/dashboard"
                  )
                }
                className="
                  hover:text-[#09379A]
                "
              >
                الرئيسية
              </button>

              <ChevronLeft
                size={15}
              />

              <span
                className="
                  font-semibold
                  text-[#111C2D]
                "
              >
                التقييمات
              </span>
            </div>

            {/* =============================================
                PAGE TITLE
            ============================================== */}

            <section className="mb-6">
              <h1
                className="
                  m-0

                  text-[23px]
                  font-bold
                  leading-9

                  text-[#111C2D]

                  sm:text-[26px]
                "
              >
                التقييمات
              </h1>

              <p
                className="
                  m-0
                  mt-1

                  text-[13px]
                  text-[#64748B]
                "
              >
                إدارة ومراجعة تقييمات الطلاب
              </p>
            </section>

            {/* =============================================
                STATS
            ============================================== */}

            <section
              className="
                mb-6

                grid
                grid-cols-1
                gap-3

                sm:grid-cols-2

                xl:grid-cols-4
              "
            >
              <StatCard
                title="إجمالي التقييمات"
                value={stats.total}
                suffix="تقييم"
                icon={Star}
                iconClass="
                  bg-[#E8EEF9]
                  text-[#09379A]
                "
              />

              <StatCard
                title="مكتملة"
                value={
                  stats.completed
                }
                suffix="تقييم"
                icon={CheckCircle2}
                iconClass="
                  bg-[#DCFCE7]
                  text-[#15803D]
                "
              />

              <StatCard
                title="قيد المراجعة"
                value={stats.review}
                suffix="تقييم"
                icon={Clock3}
                iconClass="
                  bg-[#FFE5D9]
                  text-[#B54708]
                "
              />

              <StatCard
                title="متوسط الدرجة النهائية"
                value={stats.average}
                suffix="من 5"
                icon={Percent}
                iconClass="
                  bg-[#DDF6FF]
                  text-[#08759B]
                "
              />
            </section>

            {/* =============================================
                SEARCH + TOOLS
            ============================================== */}

            <section
              className="
                mb-5

                flex
                min-w-0
                flex-col
                gap-3

                xl:flex-row
                xl:items-center
              "
            >
              {/* SEARCH */}

              <div
                className="
                  relative
                  min-w-0
                  flex-1
                "
              >
                <Search
                  size={18}
                  className="
                    pointer-events-none

                    absolute
                    right-4
                    top-1/2

                    -translate-y-1/2

                    text-[#64748B]
                  "
                />

                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value
                    );

                    setCurrentPage(1);
                  }}
                  placeholder="ابحث عن طالب..."
                  className="
                    h-[44px]
                    w-full
                    min-w-0

                    rounded-[8px]

                    border
                    border-[#E0E7F2]

                    bg-white

                    pr-11
                    pl-4

                    text-[13px]

                    outline-none

                    transition

                    focus:border-[#09379A]

                    focus:ring-2
                    focus:ring-[#09379A]/10
                  "
                />
              </div>

              {/* TOOLS */}

              <div
                className="
                  flex
                  shrink-0
                  flex-wrap
                  gap-3
                "
              >
                {/* FILTER */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFilters(
                        (value) =>
                          !value
                      );

                      setShowSort(false);
                    }}
                    className="
                      flex
                      h-[44px]
                      items-center
                      gap-2

                      rounded-[8px]

                      border
                      border-[#E0E7F2]

                      bg-white

                      px-4

                      text-[12px]

                      hover:border-[#B9C9E8]
                    "
                  >
                    <SlidersHorizontal
                      size={17}
                    />

                    تصفية
                  </button>

                  {showFilters && (
                    <div
                      className="
                        absolute
                        right-0
                        top-[50px]
                        z-20

                        w-[240px]

                        rounded-[10px]

                        border
                        border-[#E0E7F2]

                        bg-white

                        p-3

                        shadow-lg
                      "
                    >
                      {STATUS_OPTIONS.map(
                        (option) => (
                          <button
                            key={
                              option.value
                            }
                            type="button"
                            onClick={() => {
                              setStatusFilter(
                                option.value
                              );

                              setCurrentPage(
                                1
                              );

                              setShowFilters(
                                false
                              );
                            }}
                            className={`
                              w-full

                              rounded-[7px]

                              px-3
                              py-2

                              text-right
                              text-[11px]

                              ${
                                statusFilter ===
                                option.value
                                  ? `
                                      bg-[#EEF4FF]
                                      font-bold
                                      text-[#09379A]
                                    `
                                  : `
                                      hover:bg-[#F8FAFC]
                                    `
                              }
                            `}
                          >
                            {
                              option.label
                            }
                          </button>
                        )
                      )}

                      <button
                        type="button"
                        onClick={
                          resetFilters
                        }
                        className="
                          mt-2

                          flex
                          h-[34px]
                          w-full

                          items-center
                          justify-center
                          gap-1

                          rounded-[7px]

                          border
                          border-[#E0E7F2]

                          text-[10px]
                        "
                      >
                        <RotateCcw
                          size={13}
                        />

                        إعادة ضبط
                      </button>
                    </div>
                  )}
                </div>

                {/* SORT */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSort(
                        (value) =>
                          !value
                      );

                      setShowFilters(
                        false
                      );
                    }}
                    className="
                      flex
                      h-[44px]

                      items-center
                      gap-2

                      rounded-[8px]

                      border
                      border-[#E0E7F2]

                      bg-white

                      px-4

                      text-[12px]

                      hover:border-[#B9C9E8]
                    "
                  >
                    <ArrowDownUp
                      size={17}
                    />

                    ترتيب
                  </button>

                  {showSort && (
                    <div
                      className="
                        absolute
                        left-0
                        top-[50px]
                        z-20

                        w-[200px]

                        rounded-[10px]

                        border
                        border-[#E0E7F2]

                        bg-white

                        p-2

                        shadow-lg
                      "
                    >
                      <SortButton
                        label="حسب اسم الطالب"
                        active={
                          sortOrder ===
                          "name"
                        }
                        onClick={() => {
                          setSortOrder(
                            "name"
                          );

                          setShowSort(
                            false
                          );
                        }}
                      />

                      <SortButton
                        label="تقييم المشرف الميداني"
                        active={
                          sortOrder ===
                          "field"
                        }
                        onClick={() => {
                          setSortOrder(
                            "field"
                          );

                          setShowSort(
                            false
                          );
                        }}
                      />

                      <SortButton
                        label="تقييم المشرف الأكاديمي"
                        active={
                          sortOrder ===
                          "academic"
                        }
                        onClick={() => {
                          setSortOrder(
                            "academic"
                          );

                          setShowSort(
                            false
                          );
                        }}
                      />

                      <SortButton
                        label="الدرجة النهائية"
                        active={
                          sortOrder ===
                          "final"
                        }
                        onClick={() => {
                          setSortOrder(
                            "final"
                          );

                          setShowSort(
                            false
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* =============================================
                TABLE
            ============================================== */}

            <section
              className="
                w-full
                min-w-0
                overflow-hidden

                rounded-[12px]

                border
                border-[#E0E7F2]

                bg-white

                p-3

                sm:p-5
              "
            >
              <div
                className="
                  w-full
                  max-w-full
                  min-w-0

                  overflow-x-auto
                  overflow-y-hidden

                  rounded-[9px]

                  border
                  border-[#E0E7F2]
                "
              >
                <table
                  className="
                    w-full
                    min-w-[950px]

                    border-collapse

                    text-right
                  "
                >
                  <thead>
                    <tr
                      className="
                        bg-[#F1F5F9]

                        text-[11px]
                        font-semibold
                        text-[#64748B]
                      "
                    >
                      <th className="px-4 py-4">
                        الطالب
                      </th>

                      <th className="px-4 py-4">
                        تقييم المشرف الميداني
                      </th>

                      <th className="px-4 py-4">
                        تقييم المشرف الأكاديمي
                      </th>

                      <th className="px-4 py-4">
                        الدرجة النهائية
                      </th>

                      <th className="px-4 py-4">
                        حالة التقييم
                      </th>

                      <th className="px-4 py-4">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleEvaluations.map(
                      (evaluation) => (
                        <tr
                          key={
                            evaluation.id
                          }
                          className="
                            border-t
                            border-[#E6EBF5]

                            text-[11px]

                            hover:bg-[#FAFBFE]
                          "
                        >
                          <td
                            className="
                              px-4
                              py-5

                              font-bold
                              text-[#111C2D]
                            "
                          >
                            {
                              evaluation.student
                            }
                          </td>

                          <td className="px-4 py-5">
                            <Score
                              value={
                                evaluation.fieldScore
                              }
                            />
                          </td>

                          <td className="px-4 py-5">
                            <Score
                              value={
                                evaluation.academicScore
                              }
                            />
                          </td>

                          <td className="px-4 py-5">
                            <Score
                              value={
                                evaluation.finalScore
                              }
                              strong
                            />
                          </td>

                          <td className="px-4 py-5">
                            <EvaluationStatus
                              status={
                                evaluation.status
                              }
                            />
                          </td>

                          <td className="px-4 py-5">
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
                                border-[#E0E7F2]

                                bg-white

                                px-3

                                text-[10px]

                                transition

                                hover:border-[#09379A]
                                hover:text-[#09379A]
                              "
                            >
                              <Eye
                                size={14}
                              />

                              عرض
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* ===========================================
                  PAGINATION
              ============================================ */}

              <div
                className="
                  mt-4

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    m-0

                    text-[10px]
                    text-[#64748B]
                  "
                >
                  عرض{" "}
                  {filteredEvaluations.length
                    ? (safePage - 1) *
                        pageSize +
                      1
                    : 0}
                  {" - "}
                  {Math.min(
                    safePage *
                      pageSize,
                    filteredEvaluations.length
                  )}{" "}
                  من{" "}
                  {
                    filteredEvaluations.length
                  }{" "}
                  تقييمًا
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    disabled={
                      safePage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            1,
                            page - 1
                          )
                      )
                    }
                    className="
                      flex
                      h-[34px]

                      items-center
                      gap-1

                      rounded-full

                      border
                      border-[#E0E7F2]

                      px-3

                      text-[10px]

                      disabled:opacity-40
                    "
                  >
                    <ChevronRight
                      size={13}
                    />

                    السابق
                  </button>

                  {Array.from(
                    {
                      length:
                        totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`
                        h-[34px]
                        min-w-[34px]

                        rounded-full

                        border

                        text-[10px]

                        ${
                          page ===
                          safePage
                            ? `
                                border-[#09379A]
                                bg-[#09379A]
                                text-white
                              `
                            : `
                                border-[#E0E7F2]
                                bg-white
                              `
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={
                      safePage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            totalPages,
                            page + 1
                          )
                      )
                    }
                    className="
                      flex
                      h-[34px]

                      items-center
                      gap-1

                      rounded-full

                      border
                      border-[#E0E7F2]

                      px-3

                      text-[10px]

                      disabled:opacity-40
                    "
                  >
                    التالي

                    <ChevronLeft
                      size={13}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* =============================================
                FOOTER
            ============================================== */}

            <footer
              className="
                mt-10

                flex
                flex-col
                gap-3

                pb-2

                text-[11px]
                text-[#64748B]

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p className="m-0">
                جميع الحقوق محفوظة © 2025 كلية الدراسات المتوسطة - جامعة الأزهر - غزة
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <span className="text-[#09379A]">
                  الدعم الفني والأكاديمي
                </span>

                <span>•</span>

                <span className="text-[#09379A]">
                  دليل بوابة التدريب الميداني
                </span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS MODAL
      ====================================================== */}

      {showDetails &&
        selectedEvaluation && (
          <div
            className="
              fixed
              inset-0
              z-[100]

              flex
              items-center
              justify-center

              bg-[#0F172A]/45

              px-4
              py-6
            "
          >
            <button
              type="button"
              aria-label="إغلاق"
              onClick={() =>
                setShowDetails(false)
              }
              className="
                absolute
                inset-0
                cursor-default
              "
            />

            <div
              className="
                relative
                z-10

                w-full
                max-w-[520px]

                rounded-[14px]

                bg-white

                p-5

                shadow-2xl

                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between

                  border-b
                  border-[#E6EBF5]

                  pb-4
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[17px]
                      font-bold
                      text-[#062569]
                    "
                  >
                    تفاصيل التقييم
                  </h2>

                  <p
                    className="
                      m-0
                      mt-1

                      text-[11px]
                      text-[#64748B]
                    "
                  >
                    {
                      selectedEvaluation.student
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

                    text-[#64748B]

                    hover:bg-[#F1F5F9]
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="
                  mt-5
                  space-y-4
                "
              >
                <DetailRow
                  label="الطالب"
                  value={
                    selectedEvaluation.student
                  }
                />

                <DetailRow
                  label="تقييم المشرف الميداني"
                  value={
                    selectedEvaluation.fieldScore !==
                    null
                      ? `${selectedEvaluation.fieldScore.toFixed(
                          1
                        )} من 5`
                      : "لم يتم التقييم"
                  }
                />

                <DetailRow
                  label="تقييم المشرف الأكاديمي"
                  value={
                    selectedEvaluation.academicScore !==
                    null
                      ? `${selectedEvaluation.academicScore.toFixed(
                          1
                        )} من 5`
                      : "لم يتم التقييم"
                  }
                />

                <DetailRow
                  label="الدرجة النهائية"
                  value={
                    selectedEvaluation.finalScore !==
                    null
                      ? `${selectedEvaluation.finalScore.toFixed(
                          2
                        )} من 5`
                      : "—"
                  }
                />

                <div
                  className="
                    flex
                    flex-col
                    gap-2

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <span
                    className="
                      text-[11px]
                      text-[#64748B]
                    "
                  >
                    حالة التقييم
                  </span>

                  <EvaluationStatus
                    status={
                      selectedEvaluation.status
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  suffix,
  icon: Icon,
  iconClass,
}) {
  return (
    <article
      className="
        min-h-[125px]

        rounded-[11px]

        border
        border-[#E0E7F2]

        bg-white

        p-4

        sm:p-5
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className={`
            flex
            h-[42px]
            w-[42px]
            shrink-0

            items-center
            justify-center

            rounded-[8px]

            ${iconClass}
          `}
        >
          <Icon size={19} />
        </div>

        <span
          className="
            text-[11px]
            font-semibold
            text-[#334155]
          "
        >
          {title}
        </span>
      </div>

      <div
        className="
          mt-5

          flex
          items-baseline
          gap-2
        "
      >
        <strong
          className="
            text-[31px]
            font-bold
            leading-none

            text-[#062569]
          "
        >
          {value}
        </strong>

        <span
          className="
            text-[11px]
            text-[#64748B]
          "
        >
          {suffix}
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   SCORE
========================================================= */

function Score({
  value,
  strong = false,
}) {
  if (value === null) {
    return (
      <span
        className="
          text-[#94A3B8]
        "
      >
        —
      </span>
    );
  }

  return (
    <span
      className={`
        whitespace-nowrap

        ${
          strong
            ? `
                font-bold
                text-[#09379A]
              `
            : `
                font-semibold
                text-[#334155]
              `
        }
      `}
    >
      {value.toFixed(
        value % 1 === 0 ? 1 : 2
      )}
    </span>
  );
}

/* =========================================================
   STATUS
========================================================= */

function EvaluationStatus({
  status,
}) {
  const config = {
    completed: {
      label: "مكتمل",
      className:
        "bg-[#DCFCE7] text-[#15803D]",
    },

    review: {
      label: "قيد المراجعة",
      className:
        "bg-[#FFF1E8] text-[#B54708]",
    },

    approved: {
      label: "معتمد",
      className:
        "bg-[#E8EEF9] text-[#09379A]",
    },

    not_started: {
      label: "لم يبدأ",
      className:
        "bg-[#F1F5F9] text-[#475569]",
    },
  };

  const current =
    config[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-[5px]

        whitespace-nowrap

        rounded-full

        px-[10px]
        py-[5px]

        text-[9px]
        font-semibold

        ${current.className}
      `}
    >
      <span
        className="
          h-[5px]
          w-[5px]

          rounded-full

          bg-current
        "
      />

      {current.label}
    </span>
  );
}

/* =========================================================
   SORT BUTTON
========================================================= */

function SortButton({
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full

        rounded-[7px]

        px-3
        py-2

        text-right
        text-[11px]

        ${
          active
            ? `
                bg-[#EEF4FF]
                font-semibold
                text-[#09379A]
              `
            : `
                hover:bg-[#F8FAFC]
              `
        }
      `}
    >
      {label}
    </button>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-1

        border-b
        border-[#E6EBF5]

        pb-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <span
        className="
          text-[11px]
          text-[#64748B]
        "
      >
        {label}
      </span>

      <strong
        className="
          text-[11px]
          text-[#111C2D]
        "
      >
        {value}
      </strong>
    </div>
  );
}