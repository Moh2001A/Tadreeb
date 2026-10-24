import { useMemo, useState } from "react";

import {
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Edit3,
  Eye,
  GraduationCap,
  Plus,
  Search,
  Settings2,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const collegeData = [
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

const initialRequirements = [
  {
    id: 1,

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    trainingCourse:
      "التدريب الميداني في هندسة البرمجيات",

    courseCode: "SE-490",

    requiredTrainingHours: 120,

    minimumAcademicHours: 90,

    minimumGpa: 2.0,

    prerequisiteCourses: [
      "هندسة البرمجيات",
      "قواعد البيانات",
      "تطوير تطبيقات الويب",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: true,

    allowPreviousTrainingHours: false,

    status: "نشط",
  },

  {
    id: 2,

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "نظم المعلومات",

    trainingCourse:
      "التدريب الميداني في نظم المعلومات",

    courseCode: "IS-490",

    requiredTrainingHours: 120,

    minimumAcademicHours: 90,

    minimumGpa: 2.0,

    prerequisiteCourses: [
      "تحليل وتصميم النظم",
      "قواعد البيانات",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: true,

    allowPreviousTrainingHours: false,

    status: "نشط",
  },

  {
    id: 3,

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    trainingCourse:
      "التدريب العملي في إدارة الأعمال",

    courseCode: "BUS-410",

    requiredTrainingHours: 120,

    minimumAcademicHours: 85,

    minimumGpa: 2.0,

    prerequisiteCourses: [
      "إدارة الموارد البشرية",
      "مبادئ الإدارة",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: false,

    allowPreviousTrainingHours: false,

    status: "نشط",
  },

  {
    id: 4,

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    trainingCourse:
      "التدريب السريري المتقدم",

    courseCode: "NUR-480",

    requiredTrainingHours: 160,

    minimumAcademicHours: 100,

    minimumGpa: 2.5,

    prerequisiteCourses: [
      "تمريض البالغين",
      "تمريض الأطفال",
      "تمريض صحة المجتمع",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: true,

    allowPreviousTrainingHours: false,

    status: "نشط",
  },

  {
    id: 5,

    college: "كلية التربية",

    major: "تعليم أساسي",

    trainingCourse:
      "التربية العملية",

    courseCode: "EDU-450",

    requiredTrainingHours: 150,

    minimumAcademicHours: 90,

    minimumGpa: 2.0,

    prerequisiteCourses: [
      "طرق التدريس",
      "علم النفس التربوي",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: false,

    allowPreviousTrainingHours: false,

    status: "نشط",
  },

  {
    id: 6,

    college:
      "كلية الآداب والعلوم الإنسانية",

    major: "الإعلام",

    trainingCourse:
      "التدريب الإعلامي",

    courseCode: "MEDIA-420",

    requiredTrainingHours: 100,

    minimumAcademicHours: 80,

    minimumGpa: 2.0,

    prerequisiteCourses: [
      "التحرير الصحفي",
      "الإنتاج الإعلامي",
    ],

    requireAcademicApproval: true,

    requireNoAcademicWarning: false,

    allowPreviousTrainingHours: true,

    status: "غير نشط",
  },
];

const emptyForm = {
  college: "",
  major: "",

  trainingCourse: "",
  courseCode: "",

  requiredTrainingHours: 120,

  minimumAcademicHours: 90,

  minimumGpa: 2,

  prerequisiteCourses: "",

  requireAcademicApproval: true,

  requireNoAcademicWarning: true,

  allowPreviousTrainingHours: false,

  status: "نشط",
};

/* =========================================================
   PAGE
========================================================= */

export default function TrainingRequirements() {
  const [
    requirements,
    setRequirements,
  ] = useState(initialRequirements);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [
    selectedRequirement,
    setSelectedRequirement,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [
    editingRequirement,
    setEditingRequirement,
  ] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      requirements.length;

    const active =
      requirements.filter(
        (item) =>
          item.status === "نشط"
      ).length;

    const totalTrainingHours =
      requirements.reduce(
        (sum, item) =>
          sum +
          item.requiredTrainingHours,
        0
      );

    const withAcademicApproval =
      requirements.filter(
        (item) =>
          item.requireAcademicApproval
      ).length;

    return [
      {
        title: "متطلبات التدريب",
        value: total,
        description:
          "إجمالي التخصصات المرتبطة بالتدريب",
        icon: BookOpenCheck,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },

      {
        title: "متطلبات نشطة",
        value: active,
        description:
          "مطبقة حاليًا على الطلبة",
        icon: CheckCircle2,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },

      {
        title: "ساعات التدريب",
        value: totalTrainingHours,
        description:
          "إجمالي الساعات المعرفة في الخطط",
        icon: GraduationCap,
        iconBg: "bg-[#FFF7ED]",
        iconColor: "text-[#C2410C]",
      },

      {
        title: "تتطلب اعتمادًا أكاديميًا",
        value: withAcademicApproval,
        description:
          "قبل بدء التدريب",
        icon: ClipboardCheck,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
    ];
  }, [requirements]);

  const colleges = useMemo(
    () => [
      ...new Set(
        requirements.map(
          (item) => item.college
        )
      ),
    ],
    [requirements]
  );

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredRequirements =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return requirements.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.major
              .toLowerCase()
              .includes(query) ||
            item.trainingCourse
              .toLowerCase()
              .includes(query) ||
            item.courseCode
              .toLowerCase()
              .includes(query) ||
            item.college
              .toLowerCase()
              .includes(query);

          const matchesCollege =
            collegeFilter ===
              "الكل" ||
            item.college ===
              collegeFilter;

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            item.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesCollege &&
            matchesStatus
          );
        }
      );
    }, [
      requirements,
      searchTerm,
      collegeFilter,
      statusFilter,
    ]);

  /* =========================================================
     FORM
  ========================================================= */

  const openAddModal = () => {
    setEditingRequirement(null);

    setFormData(
      emptyForm
    );

    setShowModal(true);
  };

  const openEditModal = (
    requirement
  ) => {
    setEditingRequirement(
      requirement
    );

    setFormData({
      ...requirement,

      prerequisiteCourses:
        requirement.prerequisiteCourses.join(
          "\n"
        ),
    });

    setShowDetails(false);
    setShowModal(true);
  };

  const availableMajors =
    collegeData.find(
      (college) =>
        college.name ===
        formData.college
    )?.majors || [];

  const handleCollegeChange = (
    value
  ) => {
    setFormData((previous) => ({
      ...previous,

      college: value,

      major: "",
    }));
  };

  const submitRequirement = () => {
    if (
      !formData.college ||
      !formData.major ||
      !formData.trainingCourse.trim() ||
      !formData.courseCode.trim()
    ) {
      return;
    }

    const normalized = {
      ...formData,

      requiredTrainingHours:
        Number(
          formData.requiredTrainingHours
        ),

      minimumAcademicHours:
        Number(
          formData.minimumAcademicHours
        ),

      minimumGpa:
        Number(
          formData.minimumGpa
        ),

      prerequisiteCourses:
        formData.prerequisiteCourses
          .split("\n")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean),
    };

    if (editingRequirement) {
      setRequirements(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
              editingRequirement.id
                ? {
                    ...item,
                    ...normalized,
                  }
                : item
          )
      );
    } else {
      const nextId =
        Math.max(
          ...requirements.map(
            (item) =>
              item.id
          ),
          0
        ) + 1;

      setRequirements(
        (previous) => [
          {
            id: nextId,
            ...normalized,
          },
          ...previous,
        ]
      );
    }

    setShowModal(false);
    setEditingRequirement(null);
  };

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    requirement
  ) => {
    setSelectedRequirement(
      requirement
    );

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
            {/* =============================================
                BREADCRUMB
            ============================================== */}

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
                متطلبات التدريب
              </span>
            </div>

            {/* =============================================
                HEADER
            ============================================== */}

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
                  متطلبات التدريب
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
                  تحديد شروط التدريب لكل
                  تخصص، بما يشمل الساعات
                  الأكاديمية، ساعات التدريب،
                  المتطلبات السابقة، والموافقة
                  الأكاديمية اللازمة قبل بدء
                  التدريب.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  openAddModal
                }
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

                  transition

                  hover:bg-[#072E81]

                  sm:w-auto
                "
              >
                <Plus size={16} />

                إضافة متطلب
              </button>
            </section>

            {/* =============================================
                STATS
            ============================================== */}

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
                      key={
                        item.title
                      }
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
                          gap-4
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
                            {
                              item.title
                            }
                          </p>

                          <strong
                            className="
                              mt-[8px]
                              block

                              text-[27px]
                              text-[#14213D]
                            "
                          >
                            {
                              item.value
                            }
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
                            shrink-0
                            items-center
                            justify-center

                            rounded-[10px]

                            ${item.iconBg}
                            ${item.iconColor}
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

            {/* =============================================
                FILTERS
            ============================================== */}

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
                      placeholder="التخصص، المساق أو رمز المساق..."
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
                  label="الحالة"
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

                  <option value="نشط">
                    نشط
                  </option>

                  <option value="غير نشط">
                    غير نشط
                  </option>
                </FilterSelect>
              </div>
            </section>

            {/* =============================================
                TABLE
            ============================================== */}

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
                    متطلبات التخصصات
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    القواعد المستخدمة في
                    تحديد أهلية الطالب
                    للتدريب
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
                    filteredRequirements.length
                  }{" "}
                  متطلب
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
                        التخصص
                      </TableHead>

                      <TableHead>
                        مساق التدريب
                      </TableHead>

                      <TableHead>
                        ساعات التدريب
                      </TableHead>

                      <TableHead>
                        الساعات الأكاديمية
                      </TableHead>

                      <TableHead>
                        المعدل
                      </TableHead>

                      <TableHead>
                        المتطلبات السابقة
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
                    {filteredRequirements.map(
                      (item) => (
                        <tr
                          key={
                            item.id
                          }
                          className="
                            border-t
                            border-[#EEF2F7]

                            hover:bg-[#FBFCFE]
                          "
                        >
                          <TableCell>
                            <div className="min-w-[170px]">
                              <p
                                className="
                                  m-0

                                  text-[10px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {
                                  item.major
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
                                  item.college
                                }
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
                                  item.trainingCourse
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
                                  item.courseCode
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <strong
                              className="
                                text-[10px]
                                text-[#334155]
                              "
                            >
                              {
                                item.requiredTrainingHours
                              }
                            </strong>

                            <span
                              className="
                                mr-[3px]

                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              ساعة
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              {
                                item.minimumAcademicHours
                              }{" "}
                              ساعة
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              ≥{" "}
                              {
                                item.minimumGpa
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                inline-flex
                                min-h-[23px]
                                items-center

                                rounded-full

                                bg-[#F1F5F9]

                                px-[8px]

                                text-[8px]
                                font-bold
                                text-[#64748B]
                              "
                            >
                              {
                                item.prerequisiteCourses.length
                              }{" "}
                              مواد
                            </span>
                          </TableCell>

                          <TableCell>
                            <StatusBadge
                              status={
                                item.status
                              }
                            />
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
                                size={
                                  14
                                }
                              />

                              عرض
                            </button>
                          </TableCell>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {filteredRequirements.length ===
                  0 && (
                  <EmptyState />
                )}
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
                {filteredRequirements.length >
                0 ? (
                  filteredRequirements.map(
                    (item) => (
                      <article
                        key={
                          item.id
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
                                item.major
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
                                item.courseCode
                              }
                            </span>
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
                            gap-[9px]

                            border-t
                            border-[#E7ECF2]

                            pt-[10px]
                          "
                        >
                          <MobileInfo
                            label="ساعات التدريب"
                            value={`${item.requiredTrainingHours} ساعة`}
                          />

                          <MobileInfo
                            label="الساعات الأكاديمية"
                            value={`${item.minimumAcademicHours} ساعة`}
                          />

                          <MobileInfo
                            label="الحد الأدنى للمعدل"
                            value={`${item.minimumGpa}`}
                          />

                          <MobileInfo
                            label="المواد السابقة"
                            value={`${item.prerequisiteCourses.length} مواد`}
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

                          عرض المتطلبات
                        </button>
                      </article>
                    )
                  )
                ) : (
                  <EmptyState />
                )}
              </div>
            </section>

            {/* NOTE */}

            <div
              className="
                mt-[14px]

                flex
                items-start
                gap-[8px]

                rounded-[10px]

                border
                border-[#D7E5FF]

                bg-[#F6F9FF]

                px-[13px]
                py-[11px]
              "
            >
              <Settings2
                size={16}
                className="
                  mt-[1px]
                  shrink-0
                  text-[#09379A]
                "
              />

              <p
                className="
                  m-0

                  text-[10px]
                  leading-[20px]
                  text-[#475569]
                "
              >
                هذه القواعد تمثل المصدر
                الأكاديمي لشروط الأهلية.
                لاحقًا يمكن لصفحة الأهلية
                مقارنة بيانات الطالب تلقائيًا
                مع متطلبات تخصصه بدل الاعتماد
                على شروط ثابتة.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedRequirement && (
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
                    متطلبات التدريب
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
                      selectedRequirement.courseCode
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
                      selectedRequirement.major
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
                      selectedRequirement.college
                    }
                  </p>

                  <div className="mt-[7px]">
                    <StatusBadge
                      status={
                        selectedRequirement.status
                      }
                    />
                  </div>
                </div>

                <SectionTitle>
                  المساق التدريبي
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[9px]
                  "
                >
                  <InfoBox
                    label="اسم المساق"
                    value={
                      selectedRequirement.trainingCourse
                    }
                  />

                  <InfoBox
                    label="رمز المساق"
                    value={
                      selectedRequirement.courseCode
                    }
                  />

                  <InfoBox
                    label="ساعات التدريب"
                    value={`${selectedRequirement.requiredTrainingHours} ساعة`}
                  />

                  <InfoBox
                    label="الحد الأدنى للساعات الأكاديمية"
                    value={`${selectedRequirement.minimumAcademicHours} ساعة`}
                  />

                  <InfoBox
                    label="الحد الأدنى للمعدل"
                    value={
                      selectedRequirement.minimumGpa
                    }
                  />

                  <InfoBox
                    label="اعتماد القسم"
                    value={
                      selectedRequirement.requireAcademicApproval
                        ? "مطلوب"
                        : "غير مطلوب"
                    }
                  />
                </div>

                <SectionTitle>
                  المساقات السابقة
                </SectionTitle>

                {selectedRequirement.prerequisiteCourses
                  .length > 0 ? (
                  <div
                    className="
                      flex
                      flex-col
                      gap-[7px]
                    "
                  >
                    {selectedRequirement.prerequisiteCourses.map(
                      (
                        course,
                        index
                      ) => (
                        <div
                          key={
                            course
                          }
                          className="
                            flex
                            items-center
                            gap-[8px]

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
                              h-[25px]
                              w-[25px]
                              items-center
                              justify-center

                              rounded-full

                              bg-[#EEF3FF]

                              text-[9px]
                              font-bold
                              text-[#09379A]
                            "
                          >
                            {index + 1}
                          </div>

                          <span
                            className="
                              text-[9px]
                              font-medium
                              text-[#475569]
                            "
                          >
                            {course}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <EmptyBox text="لا توجد مساقات سابقة مطلوبة." />
                )}

                <SectionTitle>
                  شروط إضافية
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  <RequirementRow
                    label="موافقة أكاديمية قبل التدريب"
                    active={
                      selectedRequirement.requireAcademicApproval
                    }
                  />

                  <RequirementRow
                    label="عدم وجود إنذار أكاديمي"
                    active={
                      selectedRequirement.requireNoAcademicWarning
                    }
                  />

                  <RequirementRow
                    label="السماح باحتساب تدريب سابق"
                    active={
                      selectedRequirement.allowPreviousTrainingHours
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
                    openEditModal(
                      selectedRequirement
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
                  <Edit3
                    size={14}
                  />

                  تعديل المتطلبات
                </button>
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

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
                  {editingRequirement
                    ? "تعديل متطلبات التدريب"
                    : "إضافة متطلبات تدريب"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  إعداد شروط أهلية
                  الطالب للتدريب
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(
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
                label="الكلية"
                value={
                  formData.college
                }
                onChange={
                  handleCollegeChange
                }
              >
                <option value="">
                  اختر الكلية
                </option>

                {collegeData.map(
                  (college) => (
                    <option
                      key={
                        college.name
                      }
                      value={
                        college.name
                      }
                    >
                      {college.name}
                    </option>
                  )
                )}
              </FormSelect>

              <FormSelect
                label="التخصص"
                value={
                  formData.major
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      major: value,
                    })
                  )
                }
              >
                <option value="">
                  اختر التخصص
                </option>

                {availableMajors.map(
                  (major) => (
                    <option
                      key={major}
                      value={major}
                    >
                      {major}
                    </option>
                  )
                )}
              </FormSelect>

              <FormInput
                label="اسم مساق التدريب"
                value={
                  formData.trainingCourse
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      trainingCourse:
                        value,
                    })
                  )
                }
              />

              <FormInput
                label="رمز المساق"
                value={
                  formData.courseCode
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      courseCode:
                        value,
                    })
                  )
                }
              />

              <FormNumber
                label="ساعات التدريب المطلوبة"
                value={
                  formData.requiredTrainingHours
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      requiredTrainingHours:
                        value,
                    })
                  )
                }
              />

              <FormNumber
                label="الحد الأدنى للساعات الأكاديمية"
                value={
                  formData.minimumAcademicHours
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      minimumAcademicHours:
                        value,
                    })
                  )
                }
              />

              <FormNumber
                label="الحد الأدنى للمعدل"
                value={
                  formData.minimumGpa
                }
                step="0.1"
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      minimumGpa:
                        value,
                    })
                  )
                }
              />

              <FormSelect
                label="حالة المتطلب"
                value={
                  formData.status
                }
                onChange={(
                  value
                ) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      status: value,
                    })
                  )
                }
              >
                <option value="نشط">
                  نشط
                </option>

                <option value="غير نشط">
                  غير نشط
                </option>
              </FormSelect>

              {/* PREREQUISITES */}

              <div className="sm:col-span-2">
                <Label>
                  المساقات السابقة المطلوبة
                </Label>

                <textarea
                  value={
                    formData.prerequisiteCourses
                  }
                  onChange={(
                    event
                  ) =>
                    setFormData(
                      (previous) => ({
                        ...previous,

                        prerequisiteCourses:
                          event.target
                            .value,
                      })
                    )
                  }
                  rows={5}
                  placeholder={`اكتب كل مساق في سطر منفصل
مثال:
قواعد البيانات
تحليل وتصميم النظم`}
                  className="
                    w-full

                    resize-none

                    rounded-[9px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[11px]
                    py-[10px]

                    font-['Cairo']

                    text-[10px]
                    leading-[20px]
                    text-[#334155]

                    outline-none

                    placeholder:text-[#94A3B8]

                    focus:border-[#09379A]
                    focus:ring-2
                    focus:ring-[#09379A]/10
                  "
                />
              </div>

              {/* OPTIONS */}

              <div className="sm:col-span-2">
                <Label>
                  شروط إضافية
                </Label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[8px]

                    md:grid-cols-3
                  "
                >
                  <CheckboxCard
                    label="يتطلب موافقة أكاديمية"
                    checked={
                      formData.requireAcademicApproval
                    }
                    onChange={() =>
                      setFormData(
                        (previous) => ({
                          ...previous,

                          requireAcademicApproval:
                            !previous.requireAcademicApproval,
                        })
                      )
                    }
                  />

                  <CheckboxCard
                    label="يشترط عدم وجود إنذار"
                    checked={
                      formData.requireNoAcademicWarning
                    }
                    onChange={() =>
                      setFormData(
                        (previous) => ({
                          ...previous,

                          requireNoAcademicWarning:
                            !previous.requireNoAcademicWarning,
                        })
                      )
                    }
                  />

                  <CheckboxCard
                    label="السماح باحتساب تدريب سابق"
                    checked={
                      formData.allowPreviousTrainingHours
                    }
                    onChange={() =>
                      setFormData(
                        (previous) => ({
                          ...previous,

                          allowPreviousTrainingHours:
                            !previous.allowPreviousTrainingHours,
                        })
                      )
                    }
                  />
                </div>
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
                  setShowModal(
                    false
                  )
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
                onClick={
                  submitRequirement
                }
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
                {editingRequirement
                  ? "حفظ التعديلات"
                  : "إضافة المتطلب"}
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
  const active =
    status === "نشط";

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        rounded-full

        border

        px-[8px]

        text-[8px]
        font-bold

        ${
          active
            ? `
              border-[#BBF7D0]
              bg-[#ECFDF3]
              text-[#15803D]
            `
            : `
              border-[#E2E8F0]
              bg-[#F8FAFC]
              text-[#64748B]
            `
        }
      `}
    >
      {status}
    </span>
  );
}

function RequirementRow({
  label,
  active,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[11px]
        py-[10px]
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
          inline-flex
          min-h-[22px]
          items-center

          rounded-full

          px-[7px]

          text-[8px]
          font-bold

          ${
            active
              ? "bg-[#ECFDF3] text-[#15803D]"
              : "bg-[#F1F5F9] text-[#64748B]"
          }
        `}
      >
        {active
          ? "مطبق"
          : "غير مطلوب"}
      </span>
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

function FormNumber({
  label,
  value,
  onChange,
  step = "1",
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type="number"
        min="0"
        step={step}
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

function CheckboxCard({
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
        py-[10px]

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

function EmptyBox({ text }) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-dashed
        border-[#D9E2EC]

        px-[12px]
        py-[20px]

        text-center

        text-[9px]
        text-[#94A3B8]
      "
    >
      {text}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center

        px-5
        py-8

        text-center
      "
    >
      <BookOpenCheck
        size={25}
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
        لا توجد متطلبات
      </h3>

      <p
        className="
          m-0
          mt-[3px]

          text-[9px]
          text-[#94A3B8]
        "
      >
        لا توجد متطلبات تدريب
        مطابقة للفلاتر الحالية.
      </p>
    </div>
  );
}