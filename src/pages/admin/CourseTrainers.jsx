import { useMemo, useState } from "react";

import {
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Edit3,
  Eye,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  Search,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialTrainers = [
  {
    id: 1,

    employeeId: "TR-001",

    name: "د. أحمد خالد",

    type: "مدرب داخلي",

    department: "العلوم الطبية",

    specialization: "الطوارئ والإنعاش",

    qualification: "دكتوراه في التمريض",

    phone: "0599001122",

    email: "ahmad.khaled@university.edu",

    status: "نشط",

    maxCourses: 3,

    assignedCourses: [
      {
        id: 1,
        code: "TR-C-101",
        title: "مهارات الإنعاش القلبي الرئوي",
        status: "التسجيل مفتوح",
      },
    ],

    expertise: [
      "الإنعاش القلبي الرئوي",
      "الإسعافات الأولية",
      "الطوارئ",
    ],

    notes:
      "مدرب معتمد في برامج الطوارئ والإنعاش.",
  },

  {
    id: 2,

    employeeId: "TR-002",

    name: "م. سامر يوسف",

    type: "مدرب داخلي",

    department:
      "الهندسة وتكنولوجيا المعلومات",

    specialization:
      "هندسة البرمجيات",

    qualification:
      "ماجستير هندسة البرمجيات",

    phone: "0599112233",

    email: "samer.yousef@university.edu",

    status: "نشط",

    maxCourses: 4,

    assignedCourses: [
      {
        id: 2,
        code: "TR-C-102",
        title: "تطوير تطبيقات الويب الحديثة",
        status: "التسجيل مفتوح",
      },
      {
        id: 6,
        code: "TR-C-109",
        title: "أساسيات Git و GitHub",
        status: "مسودة",
      },
    ],

    expertise: [
      "React",
      "JavaScript",
      "تطوير الويب",
    ],

    notes:
      "يشرف على مجموعة من الدورات التقنية.",
  },

  {
    id: 3,

    employeeId: "TR-003",

    name: "د. ليلى أحمد",

    type: "مدرب داخلي",

    department:
      "الاقتصاد والعلوم الإدارية",

    specialization:
      "إدارة الأعمال",

    qualification:
      "دكتوراه إدارة الأعمال",

    phone: "0599223344",

    email: "layla.ahmad@university.edu",

    status: "نشط",

    maxCourses: 3,

    assignedCourses: [
      {
        id: 3,
        code: "TR-C-103",
        title: "مهارات الاتصال المؤسسي",
        status: "مكتملة المقاعد",
      },
    ],

    expertise: [
      "الاتصال المؤسسي",
      "إدارة الموارد البشرية",
      "مهارات العمل",
    ],

    notes: "",
  },

  {
    id: 4,

    employeeId: "TR-004",

    name: "د. محمد حسن",

    type: "مدرب داخلي",

    department: "التعليم العام",

    specialization: "البحث العلمي",

    qualification: "دكتوراه",

    phone: "0599334455",

    email: "mohammad.hassan@university.edu",

    status: "نشط",

    maxCourses: 2,

    assignedCourses: [
      {
        id: 4,
        code: "TR-C-104",
        title: "أساسيات البحث العلمي",
        status: "جارية",
      },
    ],

    expertise: [
      "البحث العلمي",
      "المنهجية",
      "التحليل",
    ],

    notes:
      "متخصص في التدريب الأكاديمي والبحث العلمي.",
  },

  {
    id: 5,

    employeeId: "TR-005",

    name: "أ. خالد يوسف",

    type: "مدرب خارجي",

    department: "التدريب المهني",

    specialization:
      "التسويق الرقمي",

    qualification:
      "ماجستير إدارة وتسويق",

    phone: "0599445566",

    email: "khaled.training@example.com",

    status: "نشط",

    maxCourses: 2,

    assignedCourses: [
      {
        id: 5,
        code: "TR-C-105",
        title: "التسويق الرقمي",
        status: "منتهية",
      },
    ],

    expertise: [
      "التسويق الرقمي",
      "إدارة المحتوى",
      "الإعلانات الرقمية",
    ],

    notes:
      "مدرب خارجي متعاون مع الجامعة.",
  },

  {
    id: 6,

    employeeId: "TR-006",

    name: "أ. رامي محمود",

    type: "مدرب خارجي",

    department: "التدريب المهني",

    specialization:
      "القيادة والإدارة",

    qualification:
      "ماجستير إدارة أعمال",

    phone: "0599556677",

    email: "rami.training@example.com",

    status: "غير نشط",

    maxCourses: 2,

    assignedCourses: [],

    expertise: [
      "القيادة",
      "إدارة الفرق",
      "التخطيط",
    ],

    notes:
      "متوقف مؤقتًا عن تقديم الدورات.",
  },
];

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyTrainer = {
  employeeId: "",

  name: "",

  type: "مدرب داخلي",

  department: "",

  specialization: "",

  qualification: "",

  phone: "",

  email: "",

  status: "نشط",

  maxCourses: 2,

  assignedCourses: [],

  expertise: [],

  notes: "",
};

/* =========================================================
   PAGE
========================================================= */

export default function CourseTrainers() {
  const [trainers, setTrainers] =
    useState(initialTrainers);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [loadFilter, setLoadFilter] =
    useState("الكل");

  const [
    selectedTrainer,
    setSelectedTrainer,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showFormModal, setShowFormModal] =
    useState(false);

  const [editingTrainer, setEditingTrainer] =
    useState(null);

  const [trainerForm, setTrainerForm] =
    useState(emptyTrainer);

  const [expertiseInput, setExpertiseInput] =
    useState("");

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      trainers.length;

    const active =
      trainers.filter(
        (trainer) =>
          trainer.status === "نشط"
      ).length;

    const internal =
      trainers.filter(
        (trainer) =>
          trainer.type ===
          "مدرب داخلي"
      ).length;

    const overloaded =
      trainers.filter(
        (trainer) =>
          trainer.assignedCourses
            .length >=
          trainer.maxCourses
      ).length;

    return [
      {
        title: "إجمالي المدربين",
        value: total,
        description:
          "مدربون مسجلون بالنظام",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مدربون نشطون",
        value: active,
        description:
          "متاحون للإسناد",
        icon: UserRoundCheck,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "مدربون داخليون",
        value: internal,
        description:
          "من الجامعة",
        icon: GraduationCap,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "عند الحد الأقصى",
        value: overloaded,
        description:
          "وصلوا للعبء المحدد",
        icon: BriefcaseBusiness,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [trainers]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredTrainers =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return trainers.filter(
        (trainer) => {
          const assignedCount =
            trainer.assignedCourses
              .length;

          const matchesSearch =
            !query ||
            trainer.name
              .toLowerCase()
              .includes(query) ||
            trainer.employeeId
              .toLowerCase()
              .includes(query) ||
            trainer.specialization
              .toLowerCase()
              .includes(query) ||
            trainer.department
              .toLowerCase()
              .includes(query);

          const matchesType =
            typeFilter === "الكل" ||
            trainer.type === typeFilter;

          const matchesStatus =
            statusFilter === "الكل" ||
            trainer.status ===
              statusFilter;

          let matchesLoad = true;

          if (
            loadFilter ===
            "متاح للإسناد"
          ) {
            matchesLoad =
              assignedCount <
              trainer.maxCourses;
          }

          if (
            loadFilter ===
            "مكتمل العبء"
          ) {
            matchesLoad =
              assignedCount >=
              trainer.maxCourses;
          }

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesLoad
          );
        }
      );
    }, [
      trainers,
      searchTerm,
      typeFilter,
      statusFilter,
      loadFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (trainer) => {
    setSelectedTrainer(trainer);
    setShowDetails(true);
  };

  /* =========================================================
     ADD
  ========================================================= */

  const openAddTrainer = () => {
    setEditingTrainer(null);

    setTrainerForm({
      ...emptyTrainer,
    });

    setExpertiseInput("");

    setShowFormModal(true);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const openEditTrainer = (
    trainer
  ) => {
    setEditingTrainer(trainer);

    setTrainerForm({
      ...trainer,

      assignedCourses: [
        ...trainer.assignedCourses,
      ],

      expertise: [
        ...trainer.expertise,
      ],
    });

    setExpertiseInput("");

    setShowDetails(false);
    setShowFormModal(true);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const saveTrainer = () => {
    if (
      !trainerForm.name.trim() ||
      !trainerForm.employeeId.trim() ||
      !trainerForm.specialization.trim() ||
      !trainerForm.phone.trim()
    ) {
      return;
    }

    if (editingTrainer) {
      setTrainers((previous) =>
        previous.map((trainer) =>
          trainer.id ===
          editingTrainer.id
            ? {
                ...trainer,
                ...trainerForm,
              }
            : trainer
        )
      );
    } else {
      const nextId =
        Math.max(
          ...trainers.map(
            (trainer) =>
              trainer.id
          ),
          0
        ) + 1;

      setTrainers((previous) => [
        {
          id: nextId,
          ...trainerForm,
        },

        ...previous,
      ]);
    }

    setShowFormModal(false);
    setEditingTrainer(null);
    setExpertiseInput("");
  };

  /* =========================================================
     EXPERTISE
  ========================================================= */

  const addExpertise = () => {
    const value =
      expertiseInput.trim();

    if (!value) {
      return;
    }

    if (
      trainerForm.expertise.includes(
        value
      )
    ) {
      return;
    }

    setTrainerForm(
      (previous) => ({
        ...previous,

        expertise: [
          ...previous.expertise,
          value,
        ],
      })
    );

    setExpertiseInput("");
  };

  const removeExpertise = (
    value
  ) => {
    setTrainerForm(
      (previous) => ({
        ...previous,

        expertise:
          previous.expertise.filter(
            (item) =>
              item !== value
          ),
      })
    );
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const updateTrainerStatus = (
    trainerId,
    status
  ) => {
    setTrainers((previous) =>
      previous.map((trainer) =>
        trainer.id === trainerId
          ? {
              ...trainer,
              status,
            }
          : trainer
      )
    );

    setSelectedTrainer(
      (previous) =>
        previous?.id ===
        trainerId
          ? {
              ...previous,
              status,
            }
          : previous
    );
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
                المدربون
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
                  مدربو الدورات
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
                  إدارة المدربين الداخليين
                  والخارجيين وبياناتهم
                  وتخصصاتهم وعبئهم التدريبي
                  والدورات المسندة إليهم.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  openAddTrainer
                }
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

                إضافة مدرب
              </button>
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
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="الاسم، الرقم، القسم أو التخصص..."
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
                  label="نوع المدرب"
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>

                  <option value="مدرب داخلي">
                    مدرب داخلي
                  </option>

                  <option value="مدرب خارجي">
                    مدرب خارجي
                  </option>
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

                <FilterSelect
                  label="العبء التدريبي"
                  value={loadFilter}
                  onChange={setLoadFilter}
                >
                  <option value="الكل">
                    الكل
                  </option>

                  <option value="متاح للإسناد">
                    متاح للإسناد
                  </option>

                  <option value="مكتمل العبء">
                    مكتمل العبء
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
                    قائمة المدربين
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    بيانات المدرب والعبء
                    التدريبي والدورات الحالية
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
                    filteredTrainers.length
                  }{" "}
                  مدرب
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
                        المدرب
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        القسم
                      </TableHead>

                      <TableHead>
                        التخصص
                      </TableHead>

                      <TableHead>
                        العبء
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
                    {filteredTrainers.map(
                      (trainer) => {
                        const load =
                          trainer
                            .assignedCourses
                            .length;

                        return (
                          <tr
                            key={trainer.id}
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
                                  {trainer.name}
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
                                    trainer.employeeId
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <TrainerTypeBadge
                                type={
                                  trainer.type
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  text-[9px]
                                  text-[#475569]
                                "
                              >
                                {
                                  trainer.department
                                }
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
                                  trainer.specialization
                                }
                              </span>
                            </TableCell>

                            <TableCell>
                              <LoadBadge
                                current={load}
                                max={
                                  trainer.maxCourses
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <TrainerStatusBadge
                                status={
                                  trainer.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-[5px]
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    openDetails(
                                      trainer
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

                                <button
                                  type="button"
                                  onClick={() =>
                                    openEditTrainer(
                                      trainer
                                    )
                                  }
                                  className="
                                    flex
                                    h-[32px]
                                    items-center
                                    justify-center

                                    rounded-[7px]

                                    border
                                    border-[#E2E8F0]

                                    bg-white

                                    px-[8px]

                                    text-[#64748B]
                                  "
                                >
                                  <Edit3
                                    size={14}
                                  />
                                </button>
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
                {filteredTrainers.map(
                  (trainer) => (
                    <article
                      key={trainer.id}
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
                            {trainer.name}
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
                              trainer.employeeId
                            }
                            {" · "}
                            {
                              trainer.specialization
                            }
                          </span>
                        </div>

                        <TrainerStatusBadge
                          status={
                            trainer.status
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
                          label="النوع"
                          value={
                            trainer.type
                          }
                        />

                        <MobileInfo
                          label="القسم"
                          value={
                            trainer.department
                          }
                        />

                        <MobileInfo
                          label="الدورات"
                          value={`${trainer.assignedCourses.length}/${trainer.maxCourses}`}
                        />

                        <MobileInfo
                          label="المؤهل"
                          value={
                            trainer.qualification
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[11px]

                          grid
                          grid-cols-2
                          gap-[7px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              trainer
                            )
                          }
                          className="
                            flex
                            h-[35px]
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
                            openEditTrainer(
                              trainer
                            )
                          }
                          className="
                            flex
                            h-[35px]
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
        selectedTrainer && (
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
                    ملف المدرب
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
                      selectedTrainer.employeeId
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

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto

                  px-5
                  py-5
                "
              >
                {/* PROFILE */}

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
                        h-[46px]
                        w-[46px]
                        items-center
                        justify-center

                        rounded-[11px]

                        bg-[#EEF3FF]
                        text-[#09379A]
                      "
                    >
                      <GraduationCap
                        size={22}
                      />
                    </div>

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
                          selectedTrainer.name
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
                          selectedTrainer.specialization
                        }
                        {" · "}
                        {
                          selectedTrainer.type
                        }
                      </p>
                    </div>
                  </div>

                  <TrainerStatusBadge
                    status={
                      selectedTrainer.status
                    }
                  />
                </div>

                {/* BASIC INFO */}

                <SectionTitle>
                  البيانات المهنية
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="النوع"
                    value={
                      selectedTrainer.type
                    }
                  />

                  <InfoBox
                    label="القسم"
                    value={
                      selectedTrainer.department
                    }
                  />

                  <InfoBox
                    label="التخصص"
                    value={
                      selectedTrainer.specialization
                    }
                  />

                  <InfoBox
                    label="المؤهل العلمي"
                    value={
                      selectedTrainer.qualification
                    }
                  />
                </div>

                {/* CONTACT */}

                <SectionTitle>
                  بيانات التواصل
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  <ContactRow
                    icon={Phone}
                    label="رقم الجوال"
                    value={
                      selectedTrainer.phone
                    }
                  />

                  <ContactRow
                    icon={Mail}
                    label="البريد الإلكتروني"
                    value={
                      selectedTrainer.email
                    }
                  />
                </div>

                {/* WORKLOAD */}

                <SectionTitle>
                  العبء التدريبي
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
                        الدورات المسندة
                      </p>

                      <strong
                        className="
                          mt-[3px]
                          block

                          text-[22px]
                          text-[#09379A]
                        "
                      >
                        {
                          selectedTrainer
                            .assignedCourses
                            .length
                        }
                        /
                        {
                          selectedTrainer.maxCourses
                        }
                      </strong>
                    </div>

                    <LoadBadge
                      current={
                        selectedTrainer
                          .assignedCourses
                          .length
                      }
                      max={
                        selectedTrainer.maxCourses
                      }
                    />
                  </div>
                </div>

                {/* COURSES */}

                <SectionTitle>
                  الدورات المسندة
                </SectionTitle>

                {selectedTrainer
                  .assignedCourses.length >
                0 ? (
                  <div
                    className="
                      flex
                      flex-col
                      gap-[7px]
                    "
                  >
                    {selectedTrainer.assignedCourses.map(
                      (course) => (
                        <div
                          key={course.id}
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
                              gap-[8px]
                            "
                          >
                            <div
                              className="
                                flex
                                h-[30px]
                                w-[30px]
                                items-center
                                justify-center

                                rounded-[8px]

                                bg-[#EEF3FF]
                                text-[#09379A]
                              "
                            >
                              <BookOpen
                                size={14}
                              />
                            </div>

                            <div>
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-bold
                                  text-[#475569]
                                "
                              >
                                {course.title}
                              </p>

                              <span
                                className="
                                  mt-[1px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {course.code}
                              </span>
                            </div>
                          </div>

                          <CourseStatusBadge
                            status={
                              course.status
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <EmptyBox>
                    لا توجد دورات مسندة
                    للمدرب حاليًا.
                  </EmptyBox>
                )}

                {/* EXPERTISE */}

                <SectionTitle>
                  مجالات الخبرة
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-[6px]
                  "
                >
                  {selectedTrainer.expertise.map(
                    (item) => (
                      <span
                        key={item}
                        className="
                          rounded-full

                          bg-[#EEF3FF]

                          px-[9px]
                          py-[5px]

                          text-[8px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>

                {/* NOTES */}

                <SectionTitle>
                  ملاحظات
                </SectionTitle>

                <TextBox>
                  {selectedTrainer.notes ||
                    "لا توجد ملاحظات."}
                </TextBox>
              </div>

              {/* FOOTER */}

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
                <button
                  type="button"
                  onClick={() =>
                    openEditTrainer(
                      selectedTrainer
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

                    bg-[#09379A]

                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  <Edit3 size={14} />

                  تعديل البيانات
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateTrainerStatus(
                      selectedTrainer.id,
                      selectedTrainer.status ===
                        "نشط"
                        ? "غير نشط"
                        : "نشط"
                    )
                  }
                  className={`
                    min-h-[40px]
                    flex-1

                    rounded-[8px]

                    border

                    text-[9px]
                    font-bold

                    ${
                      selectedTrainer.status ===
                      "نشط"
                        ? "border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C]"
                        : "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]"
                    }
                  `}
                >
                  {selectedTrainer.status ===
                  "نشط"
                    ? "إيقاف المدرب"
                    : "تفعيل المدرب"}
                </button>
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ADD / EDIT MODAL
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
              max-w-[820px]
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
                  {editingTrainer
                    ? "تعديل بيانات المدرب"
                    : "إضافة مدرب"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  بيانات المدرب المهنية
                  والتدريبية
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
                  label="اسم المدرب"
                  value={
                    trainerForm.name
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        name: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="رقم المدرب"
                  value={
                    trainerForm.employeeId
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        employeeId:
                          value,
                      })
                    )
                  }
                />

                <FormSelect
                  label="نوع المدرب"
                  value={
                    trainerForm.type
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        type: value,
                      })
                    )
                  }
                >
                  <option value="مدرب داخلي">
                    مدرب داخلي
                  </option>

                  <option value="مدرب خارجي">
                    مدرب خارجي
                  </option>
                </FormSelect>

                <FormSelect
                  label="الحالة"
                  value={
                    trainerForm.status
                  }
                  onChange={(value) =>
                    setTrainerForm(
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

                <FormInput
                  label="القسم / الجهة"
                  value={
                    trainerForm.department
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        department:
                          value,
                      })
                    )
                  }
                />

                <FormInput
                  label="التخصص"
                  value={
                    trainerForm.specialization
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,

                        specialization:
                          value,
                      })
                    )
                  }
                />

                <FormInput
                  label="المؤهل العلمي"
                  value={
                    trainerForm.qualification
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,

                        qualification:
                          value,
                      })
                    )
                  }
                />

                <FormInput
                  label="الحد الأقصى للدورات"
                  type="number"
                  value={
                    trainerForm.maxCourses
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,

                        maxCourses:
                          Math.max(
                            Number(value),
                            1
                          ),
                      })
                    )
                  }
                />
              </div>

              <FormSectionTitle>
                بيانات التواصل
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
                  label="رقم الجوال"
                  value={
                    trainerForm.phone
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        phone: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="البريد الإلكتروني"
                  type="email"
                  value={
                    trainerForm.email
                  }
                  onChange={(value) =>
                    setTrainerForm(
                      (previous) => ({
                        ...previous,
                        email: value,
                      })
                    )
                  }
                />
              </div>

              <FormSectionTitle>
                مجالات الخبرة
              </FormSectionTitle>

              <div
                className="
                  flex
                  gap-[7px]
                "
              >
                <input
                  value={expertiseInput}
                  onChange={(event) =>
                    setExpertiseInput(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();
                      addExpertise();
                    }
                  }}
                  placeholder="مثال: React"
                  className={inputStyle}
                />

                <button
                  type="button"
                  onClick={addExpertise}
                  className="
                    min-w-[90px]

                    rounded-[8px]

                    border-0

                    bg-[#09379A]

                    px-[12px]

                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  إضافة
                </button>
              </div>

              <div
                className="
                  mt-[9px]

                  flex
                  flex-wrap
                  gap-[6px]
                "
              >
                {trainerForm.expertise.map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        removeExpertise(
                          item
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-[4px]

                        rounded-full

                        border-0

                        bg-[#EEF3FF]

                        px-[9px]
                        py-[5px]

                        text-[8px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      {item}

                      <X size={11} />
                    </button>
                  )
                )}
              </div>

              <FormSectionTitle>
                ملاحظات
              </FormSectionTitle>

              <textarea
                value={
                  trainerForm.notes
                }
                onChange={(event) =>
                  setTrainerForm(
                    (previous) => ({
                      ...previous,

                      notes:
                        event.target.value,
                    })
                  )
                }
                rows={4}
                placeholder="أي ملاحظات إضافية عن المدرب..."
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
                onClick={saveTrainer}
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
                {editingTrainer
                  ? "حفظ التعديلات"
                  : "إضافة المدرب"}
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

function TrainerStatusBadge({
  status,
}) {
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
          status === "نشط"
            ? "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]"
            : "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function TrainerTypeBadge({
  type,
}) {
  return (
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
          type ===
          "مدرب داخلي"
            ? "bg-[#EEF3FF] text-[#09379A]"
            : "bg-[#F3E8FF] text-[#7E22CE]"
        }
      `}
    >
      {type}
    </span>
  );
}

function LoadBadge({
  current,
  max,
}) {
  const isFull =
    current >= max;

  const percentage =
    max > 0
      ? Math.round(
          (current / max) * 100
        )
      : 0;

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
          isFull
            ? "bg-[#FFF7ED] text-[#C2410C]"
            : "bg-[#ECFDF3] text-[#15803D]"
        }
      `}
    >
      {current}/{max}
      {" · "}
      {percentage}%
    </span>
  );
}

function CourseStatusBadge({
  status,
}) {
  const styles = {
    مسودة:
      "bg-[#F1F5F9] text-[#64748B]",

    "التسجيل مفتوح":
      "bg-[#ECFDF3] text-[#15803D]",

    "مكتملة المقاعد":
      "bg-[#FFF7ED] text-[#C2410C]",

    جارية:
      "bg-[#EEF3FF] text-[#09379A]",

    منتهية:
      "bg-[#F3E8FF] text-[#7E22CE]",
  };

  return (
    <span
      className={`
        rounded-full

        px-[7px]
        py-[4px]

        text-[7px]
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

function ContactRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[9px]

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
          h-[30px]
          w-[30px]
          shrink-0
          items-center
          justify-center

          rounded-[8px]

          bg-[#EEF3FF]
          text-[#09379A]
        "
      >
        <Icon size={14} />
      </div>

      <div className="min-w-0">
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

            break-all

            text-[9px]
            font-bold
            text-[#475569]
          "
        >
          {value || "—"}
        </p>
      </div>
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

          break-words

          text-[9px]
          font-bold
          leading-[18px]
          text-[#475569]
        "
      >
        {value || "—"}
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

function EmptyBox({
  children,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-dashed
        border-[#D9E2EC]

        bg-[#FAFBFC]

        px-[12px]
        py-[18px]

        text-center

        text-[9px]
        text-[#94A3B8]
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