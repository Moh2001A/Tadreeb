import { useMemo, useState } from "react";

import {
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  GraduationCap,
  RotateCcw,
  Search,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialApprovals = [
  {
    id: 1,
    code: "AP-2026-041",

    studentId: "20230876",
    student: "سارة محمود علي",

    college: "كلية الاقتصاد والعلوم الإدارية",
    major: "إدارة الأعمال",

    type: "اعتماد تدريب",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    organization: "بنك فلسطين",
    opportunity: "تدريب إداري ومالي",

    requiredHours: 120,

    academicSupervisor:
      "د. ليلى أحمد",

    fieldSupervisor:
      "أ. رامي حسن",

    eligibilityStatus: "مؤهل",
    distributionStatus: "مكتمل",

    priority: "عادية",

    status: "بانتظار الموافقة",

    submittedAt: "2026-10-23",

    note:
      "تم استكمال الأهلية والتوزيع واعتماد جهة التدريب.",

    documents: [
      "نموذج طلب التدريب",
      "إثبات الأهلية",
      "اعتماد التوزيع",
    ],

    history: [
      {
        date: "2026-10-20",
        action: "تم اعتماد أهلية الطالب",
      },
      {
        date: "2026-10-22",
        action: "تم توزيع الطالب",
      },
      {
        date: "2026-10-23",
        action: "تم إرسال الطلب للاعتماد",
      },
    ],
  },

  {
    id: 2,
    code: "AP-2026-040",

    studentId: "20230987",
    student: "ريم أحمد يوسف",

    college: "كلية التربية",
    major: "تعليم أساسي",

    type: "اعتماد توزيع",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    organization:
      "مدرسة الأزهر النموذجية",

    opportunity: "التربية العملية",

    requiredHours: 150,

    academicSupervisor:
      "د. منى عبد الرحمن",

    fieldSupervisor:
      "أ. خالد النجار",

    eligibilityStatus: "مؤهل",
    distributionStatus: "مكتمل",

    priority: "عالية",

    status: "بانتظار الموافقة",

    submittedAt: "2026-10-23",

    note:
      "الطالبة مؤهلة وتم استكمال التوزيع الأكاديمي والميداني.",

    documents: [
      "قرار الأهلية",
      "اعتماد الجهة",
      "بيانات المشرفين",
    ],

    history: [
      {
        date: "2026-10-19",
        action: "تمت مراجعة الأهلية",
      },
      {
        date: "2026-10-22",
        action: "تم تنفيذ التوزيع",
      },
      {
        date: "2026-10-23",
        action: "تم إرسال الطلب للاعتماد",
      },
    ],
  },

  {
    id: 3,
    code: "AP-2026-039",

    studentId: "20231234",
    student: "محمد سامي حسن",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "نظم المعلومات",

    type: "اعتماد تدريب",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    organization:
      "شركة الاتصالات الفلسطينية",

    opportunity:
      "دعم الأنظمة والشبكات",

    requiredHours: 120,

    academicSupervisor:
      "د. أحمد نصار",

    fieldSupervisor:
      "م. خالد يوسف",

    eligibilityStatus: "مؤهل",
    distributionStatus: "مكتمل",

    priority: "عادية",

    status: "معتمد",

    submittedAt: "2026-10-18",
    decisionDate: "2026-10-19",

    note:
      "تمت الموافقة على بدء التدريب.",

    decisionNote:
      "الملف مكتمل ويستوفي جميع الشروط.",

    documents: [
      "نموذج الطلب",
      "الأهلية",
      "اعتماد التوزيع",
    ],

    history: [
      {
        date: "2026-10-17",
        action: "تم استكمال التوزيع",
      },
      {
        date: "2026-10-18",
        action: "تم إرسال الطلب للاعتماد",
      },
      {
        date: "2026-10-19",
        action: "تم اعتماد التدريب",
      },
    ],
  },

  {
    id: 4,
    code: "AP-2026-038",

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "هندسة البرمجيات",

    type: "اعتماد توزيع",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    organization:
      "شركة التقنية المتقدمة",

    opportunity:
      "مطور برمجيات متدرب",

    requiredHours: 120,

    academicSupervisor:
      "د. سامر يوسف",

    fieldSupervisor:
      "م. محمد حمدي",

    eligibilityStatus: "مؤهل",
    distributionStatus: "مكتمل",

    priority: "عادية",

    status: "أعيد للمراجعة",

    submittedAt: "2026-10-17",
    decisionDate: "2026-10-18",

    note:
      "تم إرسال التوزيع للاعتماد.",

    decisionNote:
      "يرجى مراجعة تاريخ بدء التدريب في خطاب الجهة.",

    documents: [
      "الأهلية",
      "التوزيع",
      "خطاب الجهة",
    ],

    history: [
      {
        date: "2026-10-16",
        action: "تم استكمال التوزيع",
      },
      {
        date: "2026-10-17",
        action: "تم إرسال الطلب للاعتماد",
      },
      {
        date: "2026-10-18",
        action: "أعيد الطلب للمراجعة",
      },
    ],
  },

  {
    id: 5,
    code: "AP-2026-037",

    studentId: "20231356",
    student: "لينا محمود حسن",

    college: "كلية العلوم الطبية التطبيقية",
    major: "المختبرات الطبية",

    type: "اعتماد تدريب",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    organization:
      "مركز المختبرات الطبية",

    opportunity:
      "التدريب السريري في المختبرات",

    requiredHours: 140,

    academicSupervisor:
      "د. خالد يوسف",

    fieldSupervisor:
      "أ. خالد إبراهيم",

    eligibilityStatus: "مؤهل",
    distributionStatus: "مكتمل",

    priority: "عالية",

    status: "مرفوض",

    submittedAt: "2026-10-15",
    decisionDate: "2026-10-16",

    note:
      "طلب اعتماد التدريب السريري.",

    decisionNote:
      "لا يوجد اعتماد ساري للجهة خلال الفترة الحالية.",

    documents: [
      "الأهلية",
      "التوزيع",
    ],

    history: [
      {
        date: "2026-10-14",
        action: "تم استكمال التوزيع",
      },
      {
        date: "2026-10-15",
        action: "تم إرسال الطلب للاعتماد",
      },
      {
        date: "2026-10-16",
        action: "تم رفض الطلب",
      },
    ],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Approvals() {
  const [approvals, setApprovals] =
    useState(initialApprovals);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [priorityFilter, setPriorityFilter] =
    useState("الكل");

  const [
    selectedApproval,
    setSelectedApproval,
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
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      approvals.length;

    const pending =
      approvals.filter(
        (item) =>
          item.status ===
          "بانتظار الموافقة"
      ).length;

    const approved =
      approvals.filter(
        (item) =>
          item.status ===
          "معتمد"
      ).length;

    const returned =
      approvals.filter(
        (item) =>
          item.status ===
          "أعيد للمراجعة"
      ).length;

    return [
      {
        title: "إجمالي المعاملات",
        value: total,
        description:
          "طلبات اعتماد التدريب والتوزيع",
        icon: FileCheck2,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "بانتظار الموافقة",
        value: pending,
        description:
          "تحتاج قرارًا رسميًا",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "تم اعتمادها",
        value: approved,
        description:
          "معاملات مكتملة",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "أعيدت للمراجعة",
        value: returned,
        description:
          "تحتاج استكمالًا أو تصحيحًا",
        icon: RotateCcw,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [approvals]);

  /* =========================================================
     FILTERS
  ========================================================= */

  const filteredApprovals =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return approvals.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.student
              .toLowerCase()
              .includes(query) ||
            item.studentId
              .toLowerCase()
              .includes(query) ||
            item.code
              .toLowerCase()
              .includes(query) ||
            item.organization
              .toLowerCase()
              .includes(query);

          const matchesType =
            typeFilter === "الكل" ||
            item.type === typeFilter;

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            item.status ===
              statusFilter;

          const matchesPriority =
            priorityFilter ===
              "الكل" ||
            item.priority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesPriority
          );
        }
      );
    }, [
      approvals,
      searchTerm,
      typeFilter,
      statusFilter,
      priorityFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (item) => {
    setSelectedApproval(item);
    setShowDetails(true);
  };

  /* =========================================================
     DECISION
  ========================================================= */

  const openDecision = (
    approval,
    type
  ) => {
    setSelectedApproval(approval);
    setDecisionType(type);
    setDecisionNote("");
    setShowDetails(false);
    setShowDecisionModal(true);
  };

  const saveDecision = () => {
    if (!selectedApproval) {
      return;
    }

    if (
      (decisionType === "رفض" ||
        decisionType ===
          "إعادة للمراجعة") &&
      !decisionNote.trim()
    ) {
      return;
    }

    let status =
      "بانتظار الموافقة";

    let action =
      "";

    if (decisionType === "اعتماد") {
      status = "معتمد";
      action =
        "تم اعتماد المعاملة";
    }

    if (
      decisionType ===
      "إعادة للمراجعة"
    ) {
      status =
        "أعيد للمراجعة";

      action =
        "أعيدت المعاملة للمراجعة";
    }

    if (decisionType === "رفض") {
      status = "مرفوض";
      action =
        "تم رفض المعاملة";
    }

    setApprovals((previous) =>
      previous.map((item) =>
        item.id ===
        selectedApproval.id
          ? {
              ...item,

              status,

              decisionDate:
                "2026-10-24",

              decisionNote:
                decisionNote.trim(),

              history: [
                ...item.history,

                {
                  date:
                    "2026-10-24",
                  action,
                },
              ],
            }
          : item
      )
    );

    setShowDecisionModal(false);
    setSelectedApproval(null);
    setDecisionType("");
    setDecisionNote("");
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
                الموافقات
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
                الموافقات
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
                الاعتماد الرسمي لطلبات
                التدريب والتوزيع بعد اكتمال
                الأهلية وتحديد جهة التدريب
                والمشرفين، وقبل بدء التدريب
                الفعلي.
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
                      placeholder="الطالب، الرقم، المعاملة أو الجهة..."
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
                  label="نوع المعاملة"
                  value={
                    typeFilter
                  }
                  onChange={
                    setTypeFilter
                  }
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>

                  <option value="اعتماد تدريب">
                    اعتماد تدريب
                  </option>

                  <option value="اعتماد توزيع">
                    اعتماد توزيع
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

                  <option value="بانتظار الموافقة">
                    بانتظار الموافقة
                  </option>

                  <option value="معتمد">
                    معتمد
                  </option>

                  <option value="أعيد للمراجعة">
                    أعيد للمراجعة
                  </option>

                  <option value="مرفوض">
                    مرفوض
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الأولوية"
                  value={
                    priorityFilter
                  }
                  onChange={
                    setPriorityFilter
                  }
                >
                  <option value="الكل">
                    كل الأولويات
                  </option>

                  <option value="عادية">
                    عادية
                  </option>

                  <option value="عالية">
                    عالية
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
                    معاملات الاعتماد
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    ملفات جاهزة للمراجعة
                    والقرار الرسمي
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
                    filteredApprovals.length
                  }{" "}
                  معاملة
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
                        المعاملة
                      </TableHead>

                      <TableHead>
                        الطالب
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        الجهة
                      </TableHead>

                      <TableHead>
                        الأهلية
                      </TableHead>

                      <TableHead>
                        الأولوية
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
                    {filteredApprovals.map(
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
                            <div>
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {item.code}
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
                                  item.submittedAt
                                }
                              </span>
                            </div>
                          </TableCell>

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
                                  item.student
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
                                  item.studentId
                                }
                                {" · "}
                                {
                                  item.major
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-medium
                                text-[#475569]
                              "
                            >
                              {
                                item.type
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="min-w-[150px]">
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {
                                  item.organization
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
                                  item.opportunity
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                rounded-full

                                bg-[#ECFDF3]

                                px-[8px]
                                py-[5px]

                                text-[8px]
                                font-bold
                                text-[#15803D]
                              "
                            >
                              {
                                item.eligibilityStatus
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <PriorityBadge
                              priority={
                                item.priority
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <ApprovalBadge
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
                                size={14}
                              />

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
                {filteredApprovals.map(
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
                            {
                              item.student
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
                            {item.code}
                            {" · "}
                            {item.type}
                          </span>
                        </div>

                        <ApprovalBadge
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
                          label="التخصص"
                          value={
                            item.major
                          }
                        />

                        <MobileInfo
                          label="جهة التدريب"
                          value={
                            item.organization
                          }
                        />

                        <MobileInfo
                          label="الأولوية"
                          value={
                            item.priority
                          }
                        />

                        <MobileInfo
                          label="تاريخ الإرسال"
                          value={
                            item.submittedAt
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
                        <Eye
                          size={14}
                        />

                        مراجعة المعاملة
                      </button>
                    </article>
                  )
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* DETAILS */}

      {showDetails &&
        selectedApproval && (
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
                max-w-[620px]
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
                    تفاصيل المعاملة
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
                      selectedApproval.code
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
                          selectedApproval.student
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
                          selectedApproval.studentId
                        }
                        {" · "}
                        {
                          selectedApproval.major
                        }
                      </p>
                    </div>
                  </div>

                  <ApprovalBadge
                    status={
                      selectedApproval.status
                    }
                  />
                </div>

                <SectionTitle>
                  بيانات المعاملة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="نوع المعاملة"
                    value={
                      selectedApproval.type
                    }
                  />

                  <InfoBox
                    label="الأولوية"
                    value={
                      selectedApproval.priority
                    }
                  />

                  <InfoBox
                    label="الفترة التدريبية"
                    value={
                      selectedApproval.trainingPeriod
                    }
                  />

                  <InfoBox
                    label="ساعات التدريب"
                    value={`${selectedApproval.requiredHours} ساعة`}
                  />
                </div>

                <SectionTitle>
                  حالة ما قبل الاعتماد
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <StatusCheck
                    label="الأهلية"
                    value={
                      selectedApproval.eligibilityStatus
                    }
                    passed={
                      selectedApproval.eligibilityStatus ===
                      "مؤهل"
                    }
                  />

                  <StatusCheck
                    label="التوزيع"
                    value={
                      selectedApproval.distributionStatus
                    }
                    passed={
                      selectedApproval.distributionStatus ===
                      "مكتمل"
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
                    label="جهة التدريب"
                    value={
                      selectedApproval.organization
                    }
                  />

                  <InfoBox
                    label="الفرصة"
                    value={
                      selectedApproval.opportunity
                    }
                  />

                  <InfoBox
                    label="المشرف الأكاديمي"
                    value={
                      selectedApproval.academicSupervisor
                    }
                  />

                  <InfoBox
                    label="مشرف الجهة"
                    value={
                      selectedApproval.fieldSupervisor
                    }
                  />
                </div>

                <SectionTitle>
                  المستندات
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {selectedApproval.documents.map(
                    (
                      document,
                      index
                    ) => (
                      <div
                        key={document}
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

                            bg-[#ECFDF3]

                            text-[#15803D]
                          "
                        >
                          <CheckCircle2
                            size={13}
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
                            {document}
                          </p>

                          <span
                            className="
                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            مستند{" "}
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <SectionTitle>
                  ملاحظات الطلب
                </SectionTitle>

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
                  {
                    selectedApproval.note ||
                    "لا توجد ملاحظات."
                  }
                </div>

                {selectedApproval.decisionNote && (
                  <>
                    <SectionTitle>
                      قرار الاعتماد
                    </SectionTitle>

                    <div
                      className="
                        rounded-[9px]

                        border
                        border-[#D7E5FF]

                        bg-[#F6F9FF]

                        px-[11px]
                        py-[10px]
                      "
                    >
                      <p
                        className="
                          m-0

                          text-[9px]
                          leading-[19px]
                          text-[#475569]
                        "
                      >
                        {
                          selectedApproval.decisionNote
                        }
                      </p>

                      {selectedApproval.decisionDate && (
                        <span
                          className="
                            mt-[6px]
                            block

                            text-[8px]
                            text-[#94A3B8]
                          "
                        >
                          تاريخ القرار:{" "}
                          {
                            selectedApproval.decisionDate
                          }
                        </span>
                      )}
                    </div>
                  </>
                )}

                <SectionTitle>
                  سجل المعاملة
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {selectedApproval.history.map(
                    (
                      historyItem,
                      index
                    ) => (
                      <div
                        key={`${historyItem.date}-${index}`}
                        className="
                          flex
                          items-start
                          gap-[8px]
                        "
                      >
                        <div
                          className="
                            mt-[2px]

                            h-[8px]
                            w-[8px]
                            shrink-0

                            rounded-full

                            bg-[#09379A]
                          "
                        />

                        <div>
                          <p
                            className="
                              m-0

                              text-[9px]
                              font-medium
                              text-[#475569]
                            "
                          >
                            {
                              historyItem.action
                            }
                          </p>

                          <span
                            className="
                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              historyItem.date
                            }
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {selectedApproval.status ===
                "بانتظار الموافقة" && (
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
                      openDecision(
                        selectedApproval,
                        "اعتماد"
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

                    اعتماد
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedApproval,
                        "إعادة للمراجعة"
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
                    <RotateCcw
                      size={14}
                    />

                    إعادة
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedApproval,
                        "رفض"
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
                      border-[#FECDD3]

                      bg-[#FFF1F2]

                      text-[9px]
                      font-bold
                      text-[#BE123C]
                    "
                  >
                    <XCircle
                      size={14}
                    />

                    رفض
                  </button>
                </div>
              )}
            </aside>
          </>
        )}

      {/* DECISION MODAL */}

      {showDecisionModal &&
        selectedApproval && (
          <div
            onClick={() =>
              setShowDecisionModal(
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
                max-w-[520px]

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
                    "اعتماد"
                      ? "اعتماد المعاملة"
                      : decisionType ===
                        "رفض"
                      ? "رفض المعاملة"
                      : "إعادة المعاملة للمراجعة"}
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
                      selectedApproval.code
                    }
                    {" · "}
                    {
                      selectedApproval.student
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDecisionModal(
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
                  ملاحظات القرار
                  {(decisionType ===
                    "رفض" ||
                    decisionType ===
                      "إعادة للمراجعة") &&
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
                    "اعتماد"
                      ? "يمكن إضافة ملاحظة اختيارية..."
                      : "اكتب سبب القرار بوضوح..."
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
                    setShowDecisionModal(
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
                    saveDecision
                  }
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
                      "اعتماد"
                        ? "bg-[#15803D]"
                        : decisionType ===
                          "رفض"
                        ? "bg-[#BE123C]"
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

function ApprovalBadge({
  status,
}) {
  const styles = {
    "بانتظار الموافقة":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    معتمد:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "أعيد للمراجعة":
      "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]",

    مرفوض:
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

function PriorityBadge({
  priority,
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
          priority === "عالية"
            ? "bg-[#FFF1F2] text-[#BE123C]"
            : "bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {priority}
    </span>
  );
}

function StatusCheck({
  label,
  value,
  passed,
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

      <div
        className="
          mt-[4px]

          flex
          items-center
          gap-[5px]
        "
      >
        {passed ? (
          <CheckCircle2
            size={13}
            className="text-[#15803D]"
          />
        ) : (
          <XCircle
            size={13}
            className="text-[#BE123C]"
          />
        )}

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