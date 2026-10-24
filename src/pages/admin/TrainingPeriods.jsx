import { useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  GraduationCap,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   MOCK DATA
========================================================= */

const initialPeriods = [
  {
    id: 1,
    code: "TP-2026-01",
    name: "فترة التدريب الميداني - الفصل الأول",
    semester: "الفصل الأول",
    academicYear: "2026/2027",

    applicationStart: "2026-10-01",
    applicationEnd: "2026-10-15",

    trainingStart: "2026-10-20",
    trainingEnd: "2027-01-20",

    colleges: [
      "كلية الهندسة وتكنولوجيا المعلومات",
      "كلية الاقتصاد والعلوم الإدارية",
      "كلية التربية",
    ],

    majors: [
      "هندسة البرمجيات",
      "نظم المعلومات",
      "إدارة الأعمال",
      "المحاسبة",
      "تعليم أساسي",
    ],

    students: 124,
    status: "مفتوحة",
  },

  {
    id: 2,
    code: "TP-2026-02",
    name: "فترة التدريب السريري - الفصل الأول",
    semester: "الفصل الأول",
    academicYear: "2026/2027",

    applicationStart: "2026-09-20",
    applicationEnd: "2026-10-05",

    trainingStart: "2026-10-10",
    trainingEnd: "2027-02-10",

    colleges: [
      "كلية العلوم الطبية التطبيقية",
    ],

    majors: [
      "التمريض",
      "المختبرات الطبية",
    ],

    students: 68,
    status: "جارية",
  },

  {
    id: 3,
    code: "TP-2026-03",
    name: "فترة التدريب الصيفي",
    semester: "الفصل الصيفي",
    academicYear: "2025/2026",

    applicationStart: "2026-05-01",
    applicationEnd: "2026-05-20",

    trainingStart: "2026-06-01",
    trainingEnd: "2026-08-20",

    colleges: [
      "كلية الهندسة وتكنولوجيا المعلومات",
      "كلية الاقتصاد والعلوم الإدارية",
      "كلية الآداب والعلوم الإنسانية",
    ],

    majors: [
      "هندسة البرمجيات",
      "نظم المعلومات",
      "إدارة الأعمال",
      "المحاسبة",
      "الإعلام",
    ],

    students: 96,
    status: "مغلقة",
  },
];

const collegeOptions = [
  {
    name: "كلية الهندسة وتكنولوجيا المعلومات",
    majors: [
      "هندسة البرمجيات",
      "نظم المعلومات",
      "علوم الحاسوب",
    ],
  },
  {
    name: "كلية الاقتصاد والعلوم الإدارية",
    majors: [
      "إدارة الأعمال",
      "المحاسبة",
    ],
  },
  {
    name: "كلية العلوم الطبية التطبيقية",
    majors: [
      "التمريض",
      "المختبرات الطبية",
    ],
  },
  {
    name: "كلية التربية",
    majors: ["تعليم أساسي"],
  },
  {
    name: "كلية الآداب والعلوم الإنسانية",
    majors: ["الإعلام"],
  },
];

const emptyForm = {
  name: "",
  code: "",
  semester: "الفصل الأول",
  academicYear: "2026/2027",

  applicationStart: "",
  applicationEnd: "",

  trainingStart: "",
  trainingEnd: "",

  colleges: [],
  majors: [],

  students: 0,
  status: "مسودة",
};

/* =========================================================
   PAGE
========================================================= */

export default function TrainingPeriods() {
  const [periods, setPeriods] =
    useState(initialPeriods);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [semesterFilter, setSemesterFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [selectedPeriod, setSelectedPeriod] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingPeriod, setEditingPeriod] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    const total = periods.length;

    const open = periods.filter(
      (item) => item.status === "مفتوحة"
    ).length;

    const active = periods.filter(
      (item) => item.status === "جارية"
    ).length;

    const students = periods.reduce(
      (sum, item) =>
        sum + item.students,
      0
    );

    return [
      {
        title: "إجمالي الفترات",
        value: total,
        description: "فترات التدريب المسجلة",
        icon: CalendarDays,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مفتوحة للتقديم",
        value: open,
        description: "يمكن للطلبة التقديم عليها",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "فترات جارية",
        value: active,
        description: "التدريب قائم حاليًا",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "الطلبة المسجلون",
        value: students,
        description: "ضمن جميع الفترات",
        icon: Users,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [periods]);

  /* =========================================================
     FILTERS
  ========================================================= */

  const filteredPeriods = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return periods.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          .toLowerCase()
          .includes(query) ||
        item.code
          .toLowerCase()
          .includes(query) ||
        item.academicYear
          .toLowerCase()
          .includes(query);

      const matchesSemester =
        semesterFilter === "الكل" ||
        item.semester === semesterFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesSemester &&
        matchesStatus
      );
    });
  }, [
    periods,
    searchTerm,
    semesterFilter,
    statusFilter,
  ]);

  /* =========================================================
     ADD / EDIT
  ========================================================= */

  const openAddModal = () => {
    setEditingPeriod(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (period) => {
    setEditingPeriod(period);

    setFormData({
      ...period,
    });

    setShowDetails(false);
    setShowModal(true);
  };

  const submitPeriod = () => {
    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.applicationStart ||
      !formData.applicationEnd ||
      !formData.trainingStart ||
      !formData.trainingEnd
    ) {
      return;
    }

    if (editingPeriod) {
      setPeriods((previous) =>
        previous.map((item) =>
          item.id === editingPeriod.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      const nextId =
        Math.max(
          ...periods.map(
            (item) => item.id
          ),
          0
        ) + 1;

      setPeriods((previous) => [
        {
          id: nextId,
          ...formData,
        },
        ...previous,
      ]);
    }

    setShowModal(false);
    setEditingPeriod(null);
  };

  /* =========================================================
     COLLEGES
  ========================================================= */

  const toggleCollege = (
    collegeName
  ) => {
    setFormData((previous) => {
      const exists =
        previous.colleges.includes(
          collegeName
        );

      let colleges;

      if (exists) {
        colleges =
          previous.colleges.filter(
            (item) =>
              item !== collegeName
          );
      } else {
        colleges = [
          ...previous.colleges,
          collegeName,
        ];
      }

      const allowedMajors =
        collegeOptions
          .filter((college) =>
            colleges.includes(
              college.name
            )
          )
          .flatMap(
            (college) =>
              college.majors
          );

      return {
        ...previous,
        colleges,

        majors:
          previous.majors.filter(
            (major) =>
              allowedMajors.includes(
                major
              )
          ),
      };
    });
  };

  const availableMajors =
    collegeOptions
      .filter((college) =>
        formData.colleges.includes(
          college.name
        )
      )
      .flatMap(
        (college) => college.majors
      );

  const toggleMajor = (major) => {
    setFormData((previous) => ({
      ...previous,

      majors:
        previous.majors.includes(
          major
        )
          ? previous.majors.filter(
              (item) =>
                item !== major
            )
          : [
              ...previous.majors,
              major,
            ],
    }));
  };

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (period) => {
    setSelectedPeriod(period);
    setShowDetails(true);
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
              <span>الرئيسية</span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span>
                الإعداد الأكاديمي
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
                الفصول والفترات التدريبية
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
                  الفصول والفترات التدريبية
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]

                    max-w-[800px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  إنشاء وتنظيم فترات التدريب
                  المرتبطة بالفصول الأكاديمية
                  وتحديد مواعيد التقديم والتدريب
                  والكليات والتخصصات المشمولة.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="
                  flex
                  min-h-[42px]
                  w-full
                  items-center
                  justify-center
                  gap-[7px]

                  rounded-[9px]

                  border-0

                  bg-[#09379A]

                  px-[16px]

                  text-[11px]
                  font-bold
                  text-white

                  hover:bg-[#072E81]

                  sm:w-auto
                "
              >
                <Plus size={16} />
                إنشاء فترة تدريب
              </button>
            </section>

            {/* STATISTICS */}

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
              {statistics.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="
                      min-h-[130px]

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
                      "
                    >
                      <div>
                        <p
                          className="
                            m-0

                            text-[11px]
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
                          {item.description}
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
              })}
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
                  <Label>البحث</Label>

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
                      placeholder="اسم الفترة أو الرمز..."
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

                <SelectFilter
                  label="الفصل"
                  value={semesterFilter}
                  onChange={
                    setSemesterFilter
                  }
                >
                  <option value="الكل">
                    كل الفصول
                  </option>

                  <option value="الفصل الأول">
                    الفصل الأول
                  </option>

                  <option value="الفصل الثاني">
                    الفصل الثاني
                  </option>

                  <option value="الفصل الصيفي">
                    الفصل الصيفي
                  </option>
                </SelectFilter>

                <SelectFilter
                  label="الحالة"
                  value={statusFilter}
                  onChange={
                    setStatusFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="مسودة">
                    مسودة
                  </option>

                  <option value="مفتوحة">
                    مفتوحة
                  </option>

                  <option value="جارية">
                    جارية
                  </option>

                  <option value="مغلقة">
                    مغلقة
                  </option>
                </SelectFilter>
              </div>
            </section>

            {/* PERIOD CARDS */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[13px]

                xl:grid-cols-2
              "
            >
              {filteredPeriods.map(
                (period) => (
                  <article
                    key={period.id}
                    className="
                      rounded-[14px]

                      border
                      border-[#DDE5EF]

                      bg-white

                      p-[16px]
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
                          items-start
                          gap-[10px]
                        "
                      >
                        <div
                          className="
                            flex
                            h-[40px]
                            w-[40px]
                            shrink-0
                            items-center
                            justify-center

                            rounded-[10px]

                            bg-[#EEF3FF]

                            text-[#09379A]
                          "
                        >
                          <CalendarDays
                            size={19}
                          />
                        </div>

                        <div>
                          <h3
                            className="
                              m-0

                              text-[12px]
                              font-bold
                              leading-[20px]
                              text-[#334155]
                            "
                          >
                            {period.name}
                          </h3>

                          <p
                            className="
                              m-0
                              mt-[2px]

                              text-[9px]
                              text-[#94A3B8]
                            "
                          >
                            {period.code}
                            {" · "}
                            {
                              period.academicYear
                            }
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={
                          period.status
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-[14px]

                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      <InfoBox
                        label="الفصل"
                        value={
                          period.semester
                        }
                      />

                      <InfoBox
                        label="عدد الطلبة"
                        value={`${period.students} طالب`}
                      />

                      <InfoBox
                        label="فترة التقديم"
                        value={`${period.applicationStart} → ${period.applicationEnd}`}
                      />

                      <InfoBox
                        label="فترة التدريب"
                        value={`${period.trainingStart} → ${period.trainingEnd}`}
                      />
                    </div>

                    <div
                      className="
                        mt-[13px]

                        flex
                        flex-wrap
                        gap-[6px]
                      "
                    >
                      {period.majors
                        .slice(0, 4)
                        .map((major) => (
                          <span
                            key={major}
                            className="
                              rounded-full

                              bg-[#F1F5F9]

                              px-[8px]
                              py-[5px]

                              text-[8px]
                              text-[#64748B]
                            "
                          >
                            {major}
                          </span>
                        ))}

                      {period.majors.length >
                        4 && (
                        <span
                          className="
                            rounded-full

                            bg-[#EEF3FF]

                            px-[8px]
                            py-[5px]

                            text-[8px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          +
                          {period.majors
                            .length - 4}
                        </span>
                      )}
                    </div>

                    <div
                      className="
                        mt-[14px]

                        flex
                        gap-[8px]

                        border-t
                        border-[#EEF2F7]

                        pt-[12px]
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openDetails(
                            period
                          )
                        }
                        className="
                          flex
                          h-[36px]
                          flex-1
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
                        <Eye size={14} />
                        التفاصيل
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            period
                          )
                        }
                        className="
                          flex
                          h-[36px]
                          w-[42px]
                          items-center
                          justify-center

                          rounded-[8px]

                          border
                          border-[#DCE5F0]

                          bg-white

                          text-[#64748B]
                        "
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  </article>
                )
              )}
            </section>

            {filteredPeriods.length ===
              0 && <EmptyState />}
          </div>
        </main>
      </div>

      {/* DETAILS DRAWER */}

      {showDetails &&
        selectedPeriod && (
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
                max-w-[580px]
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
                    تفاصيل فترة التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedPeriod.code}
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
                <div>
                  <h3
                    className="
                      m-0

                      text-[16px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    {selectedPeriod.name}
                  </h3>

                  <div className="mt-[7px]">
                    <StatusBadge
                      status={
                        selectedPeriod.status
                      }
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-[18px]

                    grid
                    grid-cols-2
                    gap-[9px]
                  "
                >
                  <InfoBox
                    label="السنة الأكاديمية"
                    value={
                      selectedPeriod.academicYear
                    }
                  />

                  <InfoBox
                    label="الفصل"
                    value={
                      selectedPeriod.semester
                    }
                  />

                  <InfoBox
                    label="بداية التقديم"
                    value={
                      selectedPeriod.applicationStart
                    }
                  />

                  <InfoBox
                    label="نهاية التقديم"
                    value={
                      selectedPeriod.applicationEnd
                    }
                  />

                  <InfoBox
                    label="بداية التدريب"
                    value={
                      selectedPeriod.trainingStart
                    }
                  />

                  <InfoBox
                    label="نهاية التدريب"
                    value={
                      selectedPeriod.trainingEnd
                    }
                  />
                </div>

                <SectionTitle>
                  الكليات المشمولة
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-[6px]
                  "
                >
                  {selectedPeriod.colleges.map(
                    (college) => (
                      <Tag
                        key={college}
                        text={college}
                      />
                    )
                  )}
                </div>

                <SectionTitle>
                  التخصصات المشمولة
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-[6px]
                  "
                >
                  {selectedPeriod.majors.map(
                    (major) => (
                      <Tag
                        key={major}
                        text={major}
                      />
                    )
                  )}
                </div>

                <SectionTitle>
                  بيانات التسجيل
                </SectionTitle>

                <div
                  className="
                    rounded-[11px]

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
                        عدد الطلبة المسجلين
                      </p>

                      <strong
                        className="
                          mt-[3px]
                          block

                          text-[24px]
                          text-[#09379A]
                        "
                      >
                        {
                          selectedPeriod.students
                        }
                      </strong>
                    </div>

                    <Users
                      size={24}
                      className="text-[#09379A]"
                    />
                  </div>
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
                    openEditModal(
                      selectedPeriod
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

                    border
                    border-[#D7E5FF]

                    bg-[#F6F9FF]

                    text-[10px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  <Edit3 size={14} />
                  تعديل الفترة
                </button>
              </div>
            </aside>
          </>
        )}

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div
          onClick={() =>
            setShowModal(false)
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
              max-w-[820px]
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
                  {editingPeriod
                    ? "تعديل فترة التدريب"
                    : "إنشاء فترة تدريب"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  إعداد الفصل ومواعيد التقديم والتدريب
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
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
              <FormInput
                label="اسم الفترة"
                value={formData.name}
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      name: value,
                    })
                  )
                }
              />

              <FormInput
                label="رمز الفترة"
                value={formData.code}
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      code: value,
                    })
                  )
                }
              />

              <FormSelect
                label="الفصل الأكاديمي"
                value={
                  formData.semester
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      semester: value,
                    })
                  )
                }
              >
                <option value="الفصل الأول">
                  الفصل الأول
                </option>

                <option value="الفصل الثاني">
                  الفصل الثاني
                </option>

                <option value="الفصل الصيفي">
                  الفصل الصيفي
                </option>
              </FormSelect>

              <FormInput
                label="السنة الأكاديمية"
                value={
                  formData.academicYear
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      academicYear: value,
                    })
                  )
                }
              />

              <FormDate
                label="بداية التقديم"
                value={
                  formData.applicationStart
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      applicationStart:
                        value,
                    })
                  )
                }
              />

              <FormDate
                label="نهاية التقديم"
                value={
                  formData.applicationEnd
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      applicationEnd:
                        value,
                    })
                  )
                }
              />

              <FormDate
                label="بداية التدريب"
                value={
                  formData.trainingStart
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      trainingStart:
                        value,
                    })
                  )
                }
              />

              <FormDate
                label="نهاية التدريب"
                value={
                  formData.trainingEnd
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      trainingEnd:
                        value,
                    })
                  )
                }
              />

              <FormSelect
                label="حالة الفترة"
                value={
                  formData.status
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      status: value,
                    })
                  )
                }
              >
                <option value="مسودة">
                  مسودة
                </option>

                <option value="مفتوحة">
                  مفتوحة
                </option>

                <option value="جارية">
                  جارية
                </option>

                <option value="مغلقة">
                  مغلقة
                </option>
              </FormSelect>

              <FormNumber
                label="عدد الطلبة"
                value={
                  formData.students
                }
                onChange={(value) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      students:
                        Number(value),
                    })
                  )
                }
              />

              {/* COLLEGES */}

              <div className="sm:col-span-2">
                <Label>
                  الكليات المشمولة
                </Label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[8px]

                    sm:grid-cols-2
                  "
                >
                  {collegeOptions.map(
                    (college) => (
                      <CheckItem
                        key={college.name}
                        label={
                          college.name
                        }
                        checked={formData.colleges.includes(
                          college.name
                        )}
                        onChange={() =>
                          toggleCollege(
                            college.name
                          )
                        }
                      />
                    )
                  )}
                </div>
              </div>

              {/* MAJORS */}

              <div className="sm:col-span-2">
                <Label>
                  التخصصات المشمولة
                </Label>

                {availableMajors.length >
                0 ? (
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-[8px]

                      sm:grid-cols-3
                    "
                  >
                    {availableMajors.map(
                      (major) => (
                        <CheckItem
                          key={major}
                          label={major}
                          checked={formData.majors.includes(
                            major
                          )}
                          onChange={() =>
                            toggleMajor(
                              major
                            )
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div
                    className="
                      rounded-[9px]

                      border
                      border-dashed
                      border-[#D9E2EC]

                      px-[12px]
                      py-[18px]

                      text-center

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    اختر كلية واحدة على الأقل أولًا.
                  </div>
                )}
              </div>
            </div>

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
                  setShowModal(false)
                }
                className="
                  min-h-[40px]

                  rounded-[8px]

                  border
                  border-[#D9E2EC]

                  bg-white

                  px-[16px]

                  text-[10px]
                  font-bold
                "
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={submitPeriod}
                className="
                  min-h-[40px]

                  rounded-[8px]

                  border-0

                  bg-[#09379A]

                  px-[18px]

                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {editingPeriod
                  ? "حفظ التعديلات"
                  : "إنشاء الفترة"}
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

function StatusBadge({
  status,
}) {
  const styles = {
    مسودة:
      "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",

    مفتوحة:
      "bg-[#EEF4FF] text-[#09379A] border-[#D7E5FF]",

    جارية:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    مغلقة:
      "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
        items-center

        rounded-full

        border

        px-[8px]

        text-[9px]
        font-bold

        ${
          styles[status] ||
          styles.مسودة
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

function SelectFilter({
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

function FormInput({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
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

function FormDate({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type="date"
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

function FormNumber({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type="number"
        min="0"
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

function FormSelect({
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

function CheckItem({
  label,
  checked,
  onChange,
}) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-[8px]

        rounded-[9px]

        border
        border-[#E2E8F0]

        bg-[#FAFBFC]

        px-[10px]
        py-[9px]

        text-[9px]
        font-medium
        text-[#475569]
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          h-[15px]
          w-[15px]

          accent-[#09379A]
        "
      />

      {label}
    </label>
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

function Tag({ text }) {
  return (
    <span
      className="
        rounded-full

        bg-[#F1F5F9]

        px-[9px]
        py-[5px]

        text-[8px]
        text-[#64748B]
      "
    >
      {text}
    </span>
  );
}

function EmptyState() {
  return (
    <div
      className="
        mt-[16px]

        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center

        rounded-[14px]

        border
        border-[#DDE5EF]

        bg-white

        text-center
      "
    >
      <CalendarDays
        size={26}
        className="text-[#94A3B8]"
      />

      <h3
        className="
          m-0
          mt-[9px]

          text-[12px]
          font-bold
        "
      >
        لا توجد فترات تدريب
      </h3>

      <p
        className="
          m-0
          mt-[3px]

          text-[9px]
          text-[#94A3B8]
        "
      >
        لا توجد فترات مطابقة للفلاتر الحالية.
      </p>
    </div>
  );
}