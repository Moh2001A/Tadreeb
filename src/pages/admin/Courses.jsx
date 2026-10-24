import { useMemo, useState } from "react";

import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  GraduationCap,
  MapPin,
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

const initialCourses = [
  {
    id: 1,

    code: "TR-C-101",

    title: "مهارات الإنعاش القلبي الرئوي",

    category: "صحي",

    description:
      "دورة تدريبية عملية لتطوير مهارات الطلبة في الإنعاش القلبي الرئوي والتعامل الأولي مع الحالات الطارئة.",

    trainer: "د. أحمد خالد",

    location: "مركز التدريب الجامعي",

    startDate: "2026-11-02",
    endDate: "2026-11-04",

    registrationStart: "2026-10-20",
    registrationEnd: "2026-10-29",

    capacity: 30,
    registered: 26,
    waiting: 4,

    hours: 12,

    targetColleges: [
      "كلية العلوم الطبية التطبيقية",
    ],

    targetMajors: [
      "التمريض",
      "المختبرات الطبية",
    ],

    status: "التسجيل مفتوح",

    attendanceEnabled: false,

    certificateEnabled: true,
  },

  {
    id: 2,

    code: "TR-C-102",

    title: "تطوير تطبيقات الويب الحديثة",

    category: "تقني",

    description:
      "دورة تطبيقية في تطوير واجهات الويب الحديثة ومبادئ بناء التطبيقات باستخدام تقنيات الويب.",

    trainer: "م. سامر يوسف",

    location: "مختبر الحاسوب 3",

    startDate: "2026-11-10",
    endDate: "2026-11-15",

    registrationStart: "2026-10-22",
    registrationEnd: "2026-11-05",

    capacity: 25,
    registered: 18,
    waiting: 0,

    hours: 20,

    targetColleges: [
      "كلية الهندسة وتكنولوجيا المعلومات",
    ],

    targetMajors: [
      "هندسة البرمجيات",
      "نظم المعلومات",
    ],

    status: "التسجيل مفتوح",

    attendanceEnabled: false,

    certificateEnabled: true,
  },

  {
    id: 3,

    code: "TR-C-103",

    title: "مهارات الاتصال المؤسسي",

    category: "إداري",

    description:
      "تطوير مهارات الاتصال والتواصل المهني وكتابة المراسلات وإدارة التفاعل داخل بيئة العمل.",

    trainer: "د. ليلى أحمد",

    location: "قاعة المؤتمرات",

    startDate: "2026-10-26",
    endDate: "2026-10-28",

    registrationStart: "2026-10-10",
    registrationEnd: "2026-10-22",

    capacity: 40,
    registered: 40,
    waiting: 9,

    hours: 10,

    targetColleges: [
      "كلية الاقتصاد والعلوم الإدارية",
      "كلية الآداب والعلوم الإنسانية",
    ],

    targetMajors: [
      "إدارة الأعمال",
      "الإعلام",
    ],

    status: "مكتملة المقاعد",

    attendanceEnabled: false,

    certificateEnabled: true,
  },

  {
    id: 4,

    code: "TR-C-104",

    title: "أساسيات البحث العلمي",

    category: "أكاديمي",

    description:
      "دورة تمهيدية في منهجية البحث العلمي وصياغة المشكلة وأدوات جمع البيانات والمراجع.",

    trainer: "د. محمد حسن",

    location: "قاعة التدريب 2",

    startDate: "2026-10-18",
    endDate: "2026-10-21",

    registrationStart: "2026-10-01",
    registrationEnd: "2026-10-15",

    capacity: 35,
    registered: 32,
    waiting: 0,

    hours: 12,

    targetColleges: [
      "جميع الكليات",
    ],

    targetMajors: [
      "جميع التخصصات",
    ],

    status: "جارية",

    attendanceEnabled: true,

    certificateEnabled: true,
  },

  {
    id: 5,

    code: "TR-C-105",

    title: "التسويق الرقمي",

    category: "إداري",

    description:
      "مقدمة عملية في التسويق الرقمي وإدارة المحتوى والحملات الرقمية وتحليل أداء القنوات.",

    trainer: "أ. خالد يوسف",

    location: "مركز التدريب الجامعي",

    startDate: "2026-09-20",
    endDate: "2026-09-25",

    registrationStart: "2026-09-01",
    registrationEnd: "2026-09-15",

    capacity: 30,
    registered: 28,
    waiting: 0,

    hours: 18,

    targetColleges: [
      "كلية الاقتصاد والعلوم الإدارية",
      "كلية الآداب والعلوم الإنسانية",
    ],

    targetMajors: [
      "إدارة الأعمال",
      "الإعلام",
    ],

    status: "منتهية",

    attendanceEnabled: true,

    certificateEnabled: true,
  },
];

/* =========================================================
   OPTIONS
========================================================= */

const categoryOptions = [
  "صحي",
  "تقني",
  "إداري",
  "أكاديمي",
  "مهني",
];

const statusOptions = [
  "مسودة",
  "التسجيل مفتوح",
  "مكتملة المقاعد",
  "التسجيل مغلق",
  "جارية",
  "منتهية",
  "ملغاة",
];

const collegeOptions = [
  "كلية الهندسة وتكنولوجيا المعلومات",
  "كلية الاقتصاد والعلوم الإدارية",
  "كلية العلوم الطبية التطبيقية",
  "كلية التربية",
  "كلية الآداب والعلوم الإنسانية",
];

const majorOptions = [
  "هندسة البرمجيات",
  "نظم المعلومات",
  "إدارة الأعمال",
  "المحاسبة",
  "التمريض",
  "المختبرات الطبية",
  "تعليم أساسي",
  "الإعلام",
];

/* =========================================================
   EMPTY COURSE
========================================================= */

const emptyCourse = {
  code: "",
  title: "",
  category: "تقني",

  description: "",

  trainer: "",
  location: "",

  startDate: "",
  endDate: "",

  registrationStart: "",
  registrationEnd: "",

  capacity: 20,
  registered: 0,
  waiting: 0,

  hours: 10,

  targetColleges: [],
  targetMajors: [],

  status: "مسودة",

  attendanceEnabled: false,
  certificateEnabled: true,
};

/* =========================================================
   PAGE
========================================================= */

export default function Courses() {
  const [courses, setCourses] =
    useState(initialCourses);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [categoryFilter, setCategoryFilter] =
    useState("الكل");

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showFormModal, setShowFormModal] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [courseForm, setCourseForm] =
    useState(emptyCourse);

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total = courses.length;

    const open = courses.filter(
      (course) =>
        course.status ===
        "التسجيل مفتوح"
    ).length;

    const active = courses.filter(
      (course) =>
        course.status === "جارية"
    ).length;

    const registered = courses.reduce(
      (totalValue, course) =>
        totalValue + course.registered,
      0
    );

    return [
      {
        title: "إجمالي الدورات",
        value: total,
        description:
          "الدورات المسجلة بالنظام",
        icon: BookOpen,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "التسجيل مفتوح",
        value: open,
        description:
          "متاحة حاليًا للطلبة",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "دورات جارية",
        value: active,
        description:
          "يجري تنفيذها حاليًا",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "إجمالي التسجيلات",
        value: registered,
        description:
          "مقاعد مسجلة في جميع الدورات",
        icon: Users,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [courses]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredCourses =
    useMemo(() => {
      const query =
        searchTerm.trim().toLowerCase();

      return courses.filter(
        (course) => {
          const matchesSearch =
            !query ||
            course.title
              .toLowerCase()
              .includes(query) ||
            course.code
              .toLowerCase()
              .includes(query) ||
            course.trainer
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "الكل" ||
            course.status === statusFilter;

          const matchesCategory =
            categoryFilter === "الكل" ||
            course.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
          );
        }
      );
    }, [
      courses,
      searchTerm,
      statusFilter,
      categoryFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (course) => {
    setSelectedCourse(course);
    setShowDetails(true);
  };

  /* =========================================================
     ADD
  ========================================================= */

  const openAddCourse = () => {
    setEditingCourse(null);

    setCourseForm({
      ...emptyCourse,
    });

    setShowFormModal(true);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const openEditCourse = (course) => {
    setEditingCourse(course);

    setCourseForm({
      ...course,

      targetColleges: [
        ...course.targetColleges,
      ],

      targetMajors: [
        ...course.targetMajors,
      ],
    });

    setShowDetails(false);
    setShowFormModal(true);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const saveCourse = () => {
    if (
      !courseForm.title.trim() ||
      !courseForm.code.trim() ||
      !courseForm.trainer.trim() ||
      !courseForm.startDate ||
      !courseForm.endDate
    ) {
      return;
    }

    if (editingCourse) {
      setCourses((previous) =>
        previous.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...courseForm,
              }
            : course
        )
      );
    } else {
      const nextId =
        Math.max(
          ...courses.map(
            (course) => course.id
          ),
          0
        ) + 1;

      setCourses((previous) => [
        {
          id: nextId,
          ...courseForm,
        },

        ...previous,
      ]);
    }

    setShowFormModal(false);
    setEditingCourse(null);
  };

  /* =========================================================
     STATUS ACTIONS
  ========================================================= */

  const updateCourseStatus = (
    courseId,
    status
  ) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === courseId
          ? {
              ...course,
              status,

              attendanceEnabled:
                status === "جارية" ||
                status === "منتهية"
                  ? true
                  : course.attendanceEnabled,
            }
          : course
      )
    );

    setSelectedCourse((previous) =>
      previous?.id === courseId
        ? {
            ...previous,
            status,

            attendanceEnabled:
              status === "جارية" ||
              status === "منتهية"
                ? true
                : previous.attendanceEnabled,
          }
        : previous
    );
  };

  /* =========================================================
     MULTI SELECT
  ========================================================= */

  const toggleArrayValue = (
    key,
    value
  ) => {
    setCourseForm((previous) => {
      const exists =
        previous[key].includes(value);

      return {
        ...previous,

        [key]: exists
          ? previous[key].filter(
              (item) => item !== value
            )
          : [...previous[key], value],
      };
    });
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
                إدارة الدورات
              </span>
            </div>

            {/* =================================================
                HEADER
            ================================================== */}

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
                  الدورات التدريبية
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
                  إنشاء وإدارة الدورات التدريبية
                  وتحديد الفئة المستهدفة ومواعيد
                  التسجيل والمقاعد والمدربين
                  وحالة الدورة من مكان واحد.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddCourse}
                className="
                  flex
                  min-h-[42px]
                  w-full
                  items-center
                  justify-center
                  gap-[6px]

                  rounded-[9px]

                  border-0

                  bg-[#09379A]

                  px-[16px]

                  text-[10px]
                  font-bold
                  text-white

                  sm:w-auto
                "
              >
                <Plus size={16} />

                إضافة دورة
              </button>
            </section>

            {/* =================================================
                STATS
            ================================================== */}

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
                  const Icon = item.icon;

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
                      placeholder="اسم الدورة، الرمز أو المدرب..."
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
                  label="التصنيف"
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                >
                  <option value="الكل">
                    كل التصنيفات
                  </option>

                  {categoryOptions.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="حالة الدورة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  {statusOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </FilterSelect>
              </div>
            </section>

            {/* =================================================
                COURSE CARDS
            ================================================== */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[12px]

                xl:grid-cols-2
              "
            >
              {filteredCourses.map(
                (course) => {
                  const percentage =
                    course.capacity > 0
                      ? Math.round(
                          (course.registered /
                            course.capacity) *
                            100
                        )
                      : 0;

                  return (
                    <article
                      key={course.id}
                      className="
                        rounded-[14px]

                        border
                        border-[#DDE5EF]

                        bg-white

                        p-[16px]
                      "
                    >
                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div className="min-w-0">
                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              gap-[6px]
                            "
                          >
                            <CourseStatusBadge
                              status={
                                course.status
                              }
                            />

                            <span
                              className="
                                rounded-full

                                bg-[#F1F5F9]

                                px-[8px]
                                py-[4px]

                                text-[8px]
                                font-bold
                                text-[#64748B]
                              "
                            >
                              {course.category}
                            </span>
                          </div>

                          <h2
                            className="
                              m-0
                              mt-[9px]

                              text-[14px]
                              font-bold
                              leading-[24px]
                              text-[#1E293B]
                            "
                          >
                            {course.title}
                          </h2>

                          <p
                            className="
                              m-0
                              mt-[2px]

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {course.code}
                          </p>
                        </div>

                        <div
                          className="
                            flex
                            h-[42px]
                            w-[42px]
                            shrink-0
                            items-center
                            justify-center

                            rounded-[10px]

                            bg-[#EEF3FF]

                            text-[#09379A]
                          "
                        >
                          <BookOpen size={20} />
                        </div>
                      </div>

                      {/* INFO */}

                      <div
                        className="
                          mt-[14px]

                          grid
                          grid-cols-2
                          gap-[8px]
                        "
                      >
                        <MiniInfo
                          icon={GraduationCap}
                          label="المدرب"
                          value={course.trainer}
                        />

                        <MiniInfo
                          icon={MapPin}
                          label="المكان"
                          value={course.location}
                        />

                        <MiniInfo
                          icon={CalendarDays}
                          label="موعد الدورة"
                          value={`${course.startDate} - ${course.endDate}`}
                        />

                        <MiniInfo
                          icon={Clock3}
                          label="عدد الساعات"
                          value={`${course.hours} ساعة`}
                        />
                      </div>

                      {/* CAPACITY */}

                      <div
                        className="
                          mt-[14px]

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
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <p
                              className="
                                m-0

                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              المقاعد المسجلة
                            </p>

                            <p
                              className="
                                m-0
                                mt-[2px]

                                text-[10px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {course.registered}
                              {" / "}
                              {course.capacity}
                            </p>
                          </div>

                          <strong
                            className="
                              text-[10px]
                              text-[#09379A]
                            "
                          >
                            {percentage}%
                          </strong>
                        </div>

                        <div
                          className="
                            mt-[8px]

                            h-[6px]

                            overflow-hidden

                            rounded-full

                            bg-[#E2E8F0]
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
                                percentage,
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        {course.waiting > 0 && (
                          <p
                            className="
                              m-0
                              mt-[6px]

                              text-[8px]
                              font-medium
                              text-[#C2410C]
                            "
                          >
                            {course.waiting} طالب
                            في قائمة الانتظار
                          </p>
                        )}
                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          mt-[14px]

                          flex
                          gap-[7px]

                          border-t
                          border-[#EEF2F7]

                          pt-[13px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openDetails(course)
                          }
                          className="
                            flex
                            min-h-[36px]
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
                          <Eye size={14} />

                          التفاصيل
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditCourse(course)
                          }
                          className="
                            flex
                            min-h-[36px]
                            flex-1
                            items-center
                            justify-center
                            gap-[5px]

                            rounded-[8px]

                            border
                            border-[#E2E8F0]

                            bg-white

                            text-[9px]
                            font-bold
                            text-[#475569]
                          "
                        >
                          <Edit3 size={14} />

                          تعديل
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </section>

            {filteredCourses.length === 0 && (
              <div
                className="
                  mt-[16px]

                  rounded-[14px]

                  border
                  border-dashed
                  border-[#D9E2EC]

                  bg-white

                  px-5
                  py-[50px]

                  text-center
                "
              >
                <BookOpen
                  size={28}
                  className="
                    mx-auto
                    text-[#94A3B8]
                  "
                />

                <h3
                  className="
                    m-0
                    mt-[10px]

                    text-[12px]
                    font-bold
                    text-[#334155]
                  "
                >
                  لا توجد دورات
                </h3>

                <p
                  className="
                    m-0
                    mt-[3px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  لا توجد دورات مطابقة
                  للفلاتر الحالية.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedCourse && (
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
                max-w-[650px]
                flex-col

                bg-white

                shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
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
                    تفاصيل الدورة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedCourse.code}
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

                        text-[16px]
                        font-bold
                        leading-[26px]
                        text-[#334155]
                      "
                    >
                      {selectedCourse.title}
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[3px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {selectedCourse.category}
                    </p>
                  </div>

                  <CourseStatusBadge
                    status={
                      selectedCourse.status
                    }
                  />
                </div>

                <SectionTitle>
                  وصف الدورة
                </SectionTitle>

                <TextBox>
                  {selectedCourse.description}
                </TextBox>

                <SectionTitle>
                  البيانات الأساسية
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
                      selectedCourse.trainer
                    }
                  />

                  <InfoBox
                    label="المكان"
                    value={
                      selectedCourse.location
                    }
                  />

                  <InfoBox
                    label="تاريخ البداية"
                    value={
                      selectedCourse.startDate
                    }
                  />

                  <InfoBox
                    label="تاريخ النهاية"
                    value={
                      selectedCourse.endDate
                    }
                  />

                  <InfoBox
                    label="عدد الساعات"
                    value={`${selectedCourse.hours} ساعة`}
                  />

                  <InfoBox
                    label="السعة"
                    value={`${selectedCourse.capacity} مقعد`}
                  />
                </div>

                <SectionTitle>
                  التسجيل
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="بداية التسجيل"
                    value={
                      selectedCourse.registrationStart
                    }
                  />

                  <InfoBox
                    label="نهاية التسجيل"
                    value={
                      selectedCourse.registrationEnd
                    }
                  />

                  <InfoBox
                    label="المسجلون"
                    value={
                      selectedCourse.registered
                    }
                  />

                  <InfoBox
                    label="قائمة الانتظار"
                    value={
                      selectedCourse.waiting
                    }
                  />
                </div>

                <SectionTitle>
                  الفئة المستهدفة
                </SectionTitle>

                <TagSection
                  title="الكليات"
                  items={
                    selectedCourse.targetColleges
                  }
                />

                <div className="mt-[8px]">
                  <TagSection
                    title="التخصصات"
                    items={
                      selectedCourse.targetMajors
                    }
                  />
                </div>

                <SectionTitle>
                  إعدادات الدورة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <BooleanBox
                    label="نظام الحضور"
                    enabled={
                      selectedCourse.attendanceEnabled
                    }
                  />

                  <BooleanBox
                    label="إصدار الشهادات"
                    enabled={
                      selectedCourse.certificateEnabled
                    }
                  />
                </div>

                <SectionTitle>
                  إدارة حالة الدورة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[7px]

                    sm:grid-cols-3
                  "
                >
                  {selectedCourse.status ===
                    "مسودة" && (
                    <StatusAction
                      label="فتح التسجيل"
                      onClick={() =>
                        updateCourseStatus(
                          selectedCourse.id,
                          "التسجيل مفتوح"
                        )
                      }
                    />
                  )}

                  {selectedCourse.status ===
                    "التسجيل مفتوح" && (
                    <>
                      <StatusAction
                        label="إغلاق التسجيل"
                        onClick={() =>
                          updateCourseStatus(
                            selectedCourse.id,
                            "التسجيل مغلق"
                          )
                        }
                      />

                      <StatusAction
                        label="المقاعد مكتملة"
                        onClick={() =>
                          updateCourseStatus(
                            selectedCourse.id,
                            "مكتملة المقاعد"
                          )
                        }
                      />
                    </>
                  )}

                  {(selectedCourse.status ===
                    "التسجيل مغلق" ||
                    selectedCourse.status ===
                      "مكتملة المقاعد") && (
                    <StatusAction
                      label="بدء الدورة"
                      onClick={() =>
                        updateCourseStatus(
                          selectedCourse.id,
                          "جارية"
                        )
                      }
                    />
                  )}

                  {selectedCourse.status ===
                    "جارية" && (
                    <StatusAction
                      label="إنهاء الدورة"
                      onClick={() =>
                        updateCourseStatus(
                          selectedCourse.id,
                          "منتهية"
                        )
                      }
                    />
                  )}
                </div>
              </div>

              {/* FOOTER */}

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
                    openEditCourse(
                      selectedCourse
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
                  <Edit3 size={14} />

                  تعديل بيانات الدورة
                </button>
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ADD / EDIT COURSE
      ====================================================== */}

      {showFormModal && (
        <div
          onClick={() =>
            setShowFormModal(false)
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
              max-h-[94dvh]
              w-full
              max-w-[850px]
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
                  {editingCourse
                    ? "تعديل الدورة"
                    : "إضافة دورة تدريبية"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  تعريف بيانات الدورة
                  والفئة المستهدفة
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFormModal(false)
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
              <FormSectionTitle>
                البيانات الأساسية
              </FormSectionTitle>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[13px]

                  sm:grid-cols-2
                "
              >
                <FormInput
                  label="اسم الدورة"
                  value={courseForm.title}
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        title: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="رمز الدورة"
                  value={courseForm.code}
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        code: value,
                      })
                    )
                  }
                />

                <FormSelect
                  label="التصنيف"
                  value={
                    courseForm.category
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        category: value,
                      })
                    )
                  }
                >
                  {categoryOptions.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </FormSelect>

                <FormSelect
                  label="حالة الدورة"
                  value={courseForm.status}
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        status: value,
                      })
                    )
                  }
                >
                  {statusOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </FormSelect>

                <FormInput
                  label="المدرب"
                  value={
                    courseForm.trainer
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        trainer: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="مكان التدريب"
                  value={
                    courseForm.location
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        location: value,
                      })
                    )
                  }
                />
              </div>

              <div className="mt-[13px]">
                <Label>
                  وصف الدورة
                </Label>

                <textarea
                  value={
                    courseForm.description
                  }
                  onChange={(event) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        description:
                          event.target.value,
                      })
                    )
                  }
                  rows={4}
                  placeholder="وصف مختصر لأهداف ومحتوى الدورة..."
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

              <FormSectionTitle>
                مواعيد الدورة
              </FormSectionTitle>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[13px]

                  sm:grid-cols-2
                "
              >
                <FormInput
                  label="بداية الدورة"
                  type="date"
                  value={
                    courseForm.startDate
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        startDate: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="نهاية الدورة"
                  type="date"
                  value={
                    courseForm.endDate
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        endDate: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="بداية التسجيل"
                  type="date"
                  value={
                    courseForm.registrationStart
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        registrationStart:
                          value,
                      })
                    )
                  }
                />

                <FormInput
                  label="نهاية التسجيل"
                  type="date"
                  value={
                    courseForm.registrationEnd
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        registrationEnd:
                          value,
                      })
                    )
                  }
                />

                <FormInput
                  label="عدد الساعات"
                  type="number"
                  value={courseForm.hours}
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        hours:
                          Number(value),
                      })
                    )
                  }
                />

                <FormInput
                  label="الطاقة الاستيعابية"
                  type="number"
                  value={
                    courseForm.capacity
                  }
                  onChange={(value) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        capacity:
                          Number(value),
                      })
                    )
                  }
                />
              </div>

              <FormSectionTitle>
                الكليات المستهدفة
              </FormSectionTitle>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[7px]

                  sm:grid-cols-2
                "
              >
                {collegeOptions.map(
                  (college) => (
                    <CheckOption
                      key={college}
                      label={college}
                      checked={courseForm.targetColleges.includes(
                        college
                      )}
                      onChange={() =>
                        toggleArrayValue(
                          "targetColleges",
                          college
                        )
                      }
                    />
                  )
                )}
              </div>

              <FormSectionTitle>
                التخصصات المستهدفة
              </FormSectionTitle>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-[7px]

                  md:grid-cols-3
                "
              >
                {majorOptions.map(
                  (major) => (
                    <CheckOption
                      key={major}
                      label={major}
                      checked={courseForm.targetMajors.includes(
                        major
                      )}
                      onChange={() =>
                        toggleArrayValue(
                          "targetMajors",
                          major
                        )
                      }
                    />
                  )
                )}
              </div>

              <FormSectionTitle>
                الإعدادات
              </FormSectionTitle>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[8px]

                  sm:grid-cols-2
                "
              >
                <CheckOption
                  label="تفعيل نظام الحضور"
                  checked={
                    courseForm.attendanceEnabled
                  }
                  onChange={() =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        attendanceEnabled:
                          !previous.attendanceEnabled,
                      })
                    )
                  }
                />

                <CheckOption
                  label="السماح بإصدار الشهادات"
                  checked={
                    courseForm.certificateEnabled
                  }
                  onChange={() =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,

                        certificateEnabled:
                          !previous.certificateEnabled,
                      })
                    )
                  }
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
                  setShowFormModal(false)
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
                onClick={saveCourse}
                className="
                  min-h-[40px]

                  rounded-[8px]

                  border-0

                  bg-[#09379A]

                  px-[18px]

                  text-[9px]
                  font-bold
                  text-white
                "
              >
                {editingCourse
                  ? "حفظ التعديلات"
                  : "إنشاء الدورة"}
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

function CourseStatusBadge({
  status,
}) {
  const styles = {
    مسودة:
      "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]",

    "التسجيل مفتوح":
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "مكتملة المقاعد":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "التسجيل مغلق":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    جارية:
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",

    منتهية:
      "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]",

    ملغاة:
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
          onChange(event.target.value)
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
  type = "text",
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
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
          onChange(event.target.value)
        }
        className={inputStyle}
      >
        {children}
      </select>
    </div>
  );
}

function MiniInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-[7px]

        rounded-[9px]

        bg-[#F8FAFC]

        px-[9px]
        py-[8px]
      "
    >
      <Icon
        size={14}
        className="
          mt-[2px]
          shrink-0
          text-[#64748B]
        "
      />

      <div className="min-w-0">
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
            leading-[16px]
            text-[#475569]
          "
        >
          {value}
        </p>
      </div>
    </div>
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

function BooleanBox({
  label,
  enabled,
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
      <span
        className="
          text-[9px]
          font-medium
          text-[#475569]
        "
      >
        {label}
      </span>

      <span
        className={`
          rounded-full

          px-[7px]
          py-[4px]

          text-[8px]
          font-bold

          ${
            enabled
              ? "bg-[#ECFDF3] text-[#15803D]"
              : "bg-[#F1F5F9] text-[#64748B]"
          }
        `}
      >
        {enabled
          ? "مفعل"
          : "غير مفعل"}
      </span>
    </div>
  );
}

function TagSection({
  title,
  items,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        p-[10px]
      "
    >
      <p
        className="
          m-0

          text-[8px]
          font-bold
          text-[#64748B]
        "
      >
        {title}
      </p>

      <div
        className="
          mt-[7px]

          flex
          flex-wrap
          gap-[5px]
        "
      >
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="
                rounded-full

                bg-[#EEF3FF]

                px-[8px]
                py-[4px]

                text-[8px]
                font-bold
                text-[#09379A]
              "
            >
              {item}
            </span>
          ))
        ) : (
          <span
            className="
              text-[8px]
              text-[#94A3B8]
            "
          >
            غير محدد
          </span>
        )}
      </div>
    </div>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}) {
  return (
    <label
      className={`
        flex
        cursor-pointer
        items-center
        gap-[8px]

        rounded-[9px]

        border

        px-[10px]
        py-[9px]

        transition

        ${
          checked
            ? "border-[#BFD2FF] bg-[#F6F9FF]"
            : "border-[#E2E8F0] bg-white"
        }
      `}
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

      <span
        className="
          text-[9px]
          font-medium
          text-[#475569]
        "
      >
        {label}
      </span>
    </label>
  );
}

function StatusAction({
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        min-h-[36px]

        rounded-[8px]

        border
        border-[#D7E5FF]

        bg-[#F6F9FF]

        px-[10px]

        text-[8px]
        font-bold
        text-[#09379A]
      "
    >
      {label}
    </button>
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

function FormSectionTitle({
  children,
}) {
  return (
    <h3
      className="
        m-0
        mb-[11px]
        mt-[22px]

        border-b
        border-[#EEF2F7]

        pb-[8px]

        text-[11px]
        font-bold
        text-[#334155]

        first:mt-0
      "
    >
      {children}
    </h3>
  );
}