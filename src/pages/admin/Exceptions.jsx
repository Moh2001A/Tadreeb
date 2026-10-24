import { useMemo, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  X,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialExceptions = [
  {
    id: 1,
    code: "EX-2026-021",

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    type: "تغيير جهة التدريب",

    currentStage: "التوزيع",

    returnStage: "التوزيع",

    status: "قيد المراجعة",

    priority: "عالية",

    submittedAt: "2026-10-23",

    title: "طلب تغيير جهة التدريب",

    reason:
      "تعارض مواعيد التدريب الحالية مع الجدول الأكاديمي للطالب.",

    currentOrganization:
      "شركة التقنية المتقدمة",

    requestedOrganization:
      "شركة الاتصالات الفلسطينية",

    attachments: [
      "طلب تغيير الجهة",
      "الجدول الأكاديمي",
    ],

    decisionNote: "",

    history: [
      {
        date: "2026-10-23",
        action: "تم إنشاء طلب الاستثناء",
      },
    ],
  },

  {
    id: 2,
    code: "EX-2026-020",

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    type: "تمديد فترة التدريب",

    currentStage: "المتابعة",

    returnStage: "المتابعة",

    status: "بانتظار القرار",

    priority: "عادية",

    submittedAt: "2026-10-22",

    title: "طلب تمديد فترة التدريب",

    reason:
      "توقف التدريب لعدة أيام بسبب ظروف جهة التدريب والحاجة لاستكمال الساعات.",

    currentOrganization:
      "بنك فلسطين",

    requestedOrganization:
      "بنك فلسطين",

    attachments: [
      "طلب التمديد",
      "إفادة جهة التدريب",
    ],

    decisionNote: "",

    history: [
      {
        date: "2026-10-22",
        action: "تم رفع طلب التمديد",
      },
      {
        date: "2026-10-23",
        action: "تمت مراجعة المستندات",
      },
    ],
  },

  {
    id: 3,
    code: "EX-2026-019",

    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    type: "استثناء أكاديمي",

    currentStage: "الأهلية",

    returnStage: "الأهلية",

    status: "يحتاج استكمال",

    priority: "عالية",

    submittedAt: "2026-10-21",

    title: "طلب استثناء من أحد المتطلبات",

    reason:
      "الطالبة أتمت جميع المتطلبات باستثناء مساق واحد وتطلب مراجعة الحالة أكاديميًا.",

    currentOrganization: "—",

    requestedOrganization: "—",

    attachments: [
      "كشف العلامات",
    ],

    missingRequirements: [
      "موافقة رئيس القسم",
    ],

    decisionNote:
      "يجب إرفاق موافقة رئيس القسم قبل اتخاذ القرار.",

    history: [
      {
        date: "2026-10-21",
        action: "تم إنشاء الطلب",
      },
      {
        date: "2026-10-22",
        action: "تم طلب مستند إضافي",
      },
    ],
  },

  {
    id: 4,
    code: "EX-2026-018",

    studentId: "20231234",
    student: "محمد سامي حسن",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "نظم المعلومات",

    type: "تعارض ساعات",

    currentStage: "المتابعة",

    returnStage: "المتابعة",

    status: "مقبول",

    priority: "عادية",

    submittedAt: "2026-10-19",

    decisionDate: "2026-10-20",

    title: "معالجة تعارض ساعات التدريب",

    reason:
      "وجود تعارض بين موعد التدريب ومحاضرة جامعية واحدة أسبوعيًا.",

    currentOrganization:
      "شركة الاتصالات الفلسطينية",

    requestedOrganization:
      "شركة الاتصالات الفلسطينية",

    attachments: [
      "الجدول الأكاديمي",
      "جدول التدريب",
    ],

    decisionNote:
      "تمت الموافقة على تعديل الجدول مع الحفاظ على الساعات المطلوبة.",

    history: [
      {
        date: "2026-10-19",
        action: "تم إنشاء طلب الاستثناء",
      },
      {
        date: "2026-10-20",
        action: "تم قبول الطلب",
      },
      {
        date: "2026-10-20",
        action: "أعيدت الحالة إلى مرحلة المتابعة",
      },
    ],
  },

  {
    id: 5,
    code: "EX-2026-017",

    studentId: "20231587",
    student: "عمر يوسف سليمان",

    college:
      "كلية الآداب والعلوم الإنسانية",

    major: "الإعلام",

    type: "انسحاب من التدريب",

    currentStage: "التوزيع",

    returnStage: "التوزيع",

    status: "مرفوض",

    priority: "عادية",

    submittedAt: "2026-10-18",

    decisionDate: "2026-10-19",

    title: "طلب انسحاب من التدريب الحالي",

    reason:
      "طلب الطالب الانسحاب من الجهة الحالية والانتظار لفترة تدريب قادمة.",

    currentOrganization:
      "مؤسسة الإبداع الرقمي",

    requestedOrganization: "—",

    attachments: [
      "طلب الانسحاب",
    ],

    decisionNote:
      "لم يتم اعتماد الانسحاب لعدم اكتمال الإجراءات المطلوبة.",

    history: [
      {
        date: "2026-10-18",
        action: "تم إنشاء الطلب",
      },
      {
        date: "2026-10-19",
        action: "تم رفض الطلب",
      },
    ],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Exceptions() {
  const [exceptions, setExceptions] =
    useState(initialExceptions);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [stageFilter, setStageFilter] =
    useState("الكل");

  const [
    selectedException,
    setSelectedException,
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

  const [returnStage, setReturnStage] =
    useState("");

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      exceptions.length;

    const active =
      exceptions.filter(
        (item) =>
          item.status ===
            "قيد المراجعة" ||
          item.status ===
            "بانتظار القرار"
      ).length;

    const incomplete =
      exceptions.filter(
        (item) =>
          item.status ===
          "يحتاج استكمال"
      ).length;

    const accepted =
      exceptions.filter(
        (item) =>
          item.status === "مقبول"
      ).length;

    return [
      {
        title: "إجمالي الحالات",
        value: total,
        description:
          "الطلبات الاستثنائية المسجلة",
        icon: ShieldAlert,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "تحت المعالجة",
        value: active,
        description:
          "قيد المراجعة أو القرار",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "تحتاج استكمال",
        value: incomplete,
        description:
          "مستندات أو موافقات ناقصة",
        icon: AlertTriangle,
        bg: "bg-[#FFF1F2]",
        color: "text-[#BE123C]",
      },

      {
        title: "طلبات مقبولة",
        value: accepted,
        description:
          "تمت معالجة الاستثناء",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },
    ];
  }, [exceptions]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredExceptions =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return exceptions.filter(
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
            item.title
              .toLowerCase()
              .includes(query);

          const matchesType =
            typeFilter === "الكل" ||
            item.type === typeFilter;

          const matchesStatus =
            statusFilter === "الكل" ||
            item.status ===
              statusFilter;

          const matchesStage =
            stageFilter === "الكل" ||
            item.currentStage ===
              stageFilter;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesStage
          );
        }
      );
    }, [
      exceptions,
      searchTerm,
      typeFilter,
      statusFilter,
      stageFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (item) => {
    setSelectedException(item);
    setShowDetails(true);
  };

  /* =========================================================
     DECISION
  ========================================================= */

  const openDecision = (
    item,
    type
  ) => {
    setSelectedException(item);

    setDecisionType(type);

    setDecisionNote("");

    setReturnStage(
      item.returnStage ||
        item.currentStage
    );

    setShowDetails(false);

    setShowDecisionModal(true);
  };

  const saveDecision = () => {
    if (!selectedException) {
      return;
    }

    if (
      (decisionType === "رفض" ||
        decisionType ===
          "يحتاج استكمال") &&
      !decisionNote.trim()
    ) {
      return;
    }

    let newStatus =
      selectedException.status;

    let historyAction = "";

    if (decisionType === "قبول") {
      newStatus = "مقبول";

      historyAction =
        `تم قبول الاستثناء وإعادة الحالة إلى مرحلة ${returnStage}`;
    }

    if (decisionType === "رفض") {
      newStatus = "مرفوض";

      historyAction =
        "تم رفض طلب الاستثناء";
    }

    if (
      decisionType ===
      "يحتاج استكمال"
    ) {
      newStatus =
        "يحتاج استكمال";

      historyAction =
        "تم طلب استكمال بيانات أو مستندات";
    }

    setExceptions((previous) =>
      previous.map((item) =>
        item.id ===
        selectedException.id
          ? {
              ...item,

              status: newStatus,

              returnStage:
                decisionType ===
                "قبول"
                  ? returnStage
                  : item.returnStage,

              decisionDate:
                decisionType ===
                "يحتاج استكمال"
                  ? item.decisionDate
                  : "2026-10-24",

              decisionNote:
                decisionNote.trim(),

              history: [
                ...item.history,
                {
                  date:
                    "2026-10-24",
                  action:
                    historyAction,
                },
              ],
            }
          : item
      )
    );

    setShowDecisionModal(false);
    setSelectedException(null);
    setDecisionType("");
    setDecisionNote("");
    setReturnStage("");
  };

  /* =========================================================
     REOPEN INCOMPLETE CASE
  ========================================================= */

  const reopenException = (
    exceptionItem
  ) => {
    setExceptions((previous) =>
      previous.map((item) =>
        item.id ===
        exceptionItem.id
          ? {
              ...item,

              status:
                "قيد المراجعة",

              history: [
                ...item.history,
                {
                  date:
                    "2026-10-24",
                  action:
                    "تم استكمال البيانات وإعادة الطلب للمراجعة",
                },
              ],
            }
          : item
      )
    );

    setShowDetails(false);
    setSelectedException(null);
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
                الحالات الاستثنائية
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
                الحالات الاستثنائية
              </h1>

              <p
                className="
                  m-0
                  mt-[3px]

                  max-w-[870px]

                  text-[11px]
                  leading-[21px]
                  text-[#64748B]

                  sm:text-[12px]
                "
              >
                معالجة الحالات التي تحتاج
                قرارًا خارج المسار الطبيعي،
                مع تحديد المرحلة التي تعود
                إليها المعاملة بعد قبول
                الاستثناء.
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
                      placeholder="اسم الطالب أو رقم الطلب..."
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
                  label="نوع الاستثناء"
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>

                  <option value="تغيير جهة التدريب">
                    تغيير جهة التدريب
                  </option>

                  <option value="تمديد فترة التدريب">
                    تمديد فترة التدريب
                  </option>

                  <option value="تعارض ساعات">
                    تعارض ساعات
                  </option>

                  <option value="انسحاب من التدريب">
                    انسحاب من التدريب
                  </option>

                  <option value="استثناء أكاديمي">
                    استثناء أكاديمي
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="المرحلة"
                  value={stageFilter}
                  onChange={setStageFilter}
                >
                  <option value="الكل">
                    كل المراحل
                  </option>

                  <option value="الأهلية">
                    الأهلية
                  </option>

                  <option value="التوزيع">
                    التوزيع
                  </option>

                  <option value="الموافقات">
                    الموافقات
                  </option>

                  <option value="المتابعة">
                    المتابعة
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الحالة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="قيد المراجعة">
                    قيد المراجعة
                  </option>

                  <option value="بانتظار القرار">
                    بانتظار القرار
                  </option>

                  <option value="يحتاج استكمال">
                    يحتاج استكمال
                  </option>

                  <option value="مقبول">
                    مقبول
                  </option>

                  <option value="مرفوض">
                    مرفوض
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
                    طلبات الاستثناء
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    الحالات التي تحتاج
                    معالجة خاصة
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
                    filteredExceptions.length
                  }{" "}
                  حالة
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
                        الطلب
                      </TableHead>

                      <TableHead>
                        الطالب
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        المرحلة
                      </TableHead>

                      <TableHead>
                        الأولوية
                      </TableHead>

                      <TableHead>
                        الحالة
                      </TableHead>

                      <TableHead>
                        تاريخ الطلب
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredExceptions.map(
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
                                {item.title}
                              </span>
                            </div>
                          </TableCell>

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
                            <span
                              className="
                                text-[9px]
                                font-medium
                                text-[#475569]
                              "
                            >
                              {item.type}
                            </span>
                          </TableCell>

                          <TableCell>
                            <StageBadge
                              stage={
                                item.currentStage
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <PriorityBadge
                              priority={
                                item.priority
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <ExceptionBadge
                              status={
                                item.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#64748B]
                              "
                            >
                              {item.submittedAt}
                            </span>
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
                {filteredExceptions.map(
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
                            {item.code}
                            {" · "}
                            {item.type}
                          </span>
                        </div>

                        <ExceptionBadge
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
                          label="المرحلة"
                          value={
                            item.currentStage
                          }
                        />

                        <MobileInfo
                          label="الأولوية"
                          value={
                            item.priority
                          }
                        />

                        <MobileInfo
                          label="التخصص"
                          value={
                            item.major
                          }
                        />

                        <MobileInfo
                          label="تاريخ الطلب"
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
                        <Eye size={14} />
                        مراجعة الطلب
                      </button>
                    </article>
                  )
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* DETAILS DRAWER */}

      {showDetails &&
        selectedException && (
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
                    تفاصيل الاستثناء
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedException.code}
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
                      {selectedException.student}
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[3px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {selectedException.studentId}
                      {" · "}
                      {selectedException.major}
                    </p>
                  </div>

                  <ExceptionBadge
                    status={
                      selectedException.status
                    }
                  />
                </div>

                <SectionTitle>
                  بيانات الطلب
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="نوع الاستثناء"
                    value={
                      selectedException.type
                    }
                  />

                  <InfoBox
                    label="الأولوية"
                    value={
                      selectedException.priority
                    }
                  />

                  <InfoBox
                    label="المرحلة الحالية"
                    value={
                      selectedException.currentStage
                    }
                  />

                  <InfoBox
                    label="تاريخ الطلب"
                    value={
                      selectedException.submittedAt
                    }
                  />
                </div>

                <SectionTitle>
                  سبب الطلب
                </SectionTitle>

                <TextBox>
                  {selectedException.reason}
                </TextBox>

                {(selectedException.currentOrganization !==
                  "—" ||
                  selectedException.requestedOrganization !==
                    "—") && (
                  <>
                    <SectionTitle>
                      جهات التدريب
                    </SectionTitle>

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      <InfoBox
                        label="الجهة الحالية"
                        value={
                          selectedException.currentOrganization
                        }
                      />

                      <InfoBox
                        label="الجهة المطلوبة"
                        value={
                          selectedException.requestedOrganization
                        }
                      />
                    </div>
                  </>
                )}

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
                  {selectedException.attachments.map(
                    (attachment) => (
                      <div
                        key={attachment}
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
                        <CheckCircle2
                          size={14}
                          className="text-[#15803D]"
                        />

                        <span
                          className="
                            text-[9px]
                            font-medium
                            text-[#475569]
                          "
                        >
                          {attachment}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {selectedException
                  .missingRequirements
                  ?.length > 0 && (
                  <>
                    <SectionTitle>
                      عناصر تحتاج استكمال
                    </SectionTitle>

                    <div
                      className="
                        flex
                        flex-col
                        gap-[7px]
                      "
                    >
                      {selectedException.missingRequirements.map(
                        (requirement) => (
                          <div
                            key={requirement}
                            className="
                              flex
                              items-center
                              gap-[8px]

                              rounded-[9px]

                              border
                              border-[#FED7AA]

                              bg-[#FFF7ED]

                              px-[10px]
                              py-[9px]
                            "
                          >
                            <AlertTriangle
                              size={14}
                              className="text-[#C2410C]"
                            />

                            <span
                              className="
                                text-[9px]
                                font-medium
                                text-[#9A3412]
                              "
                            >
                              {requirement}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                {selectedException.decisionNote && (
                  <>
                    <SectionTitle>
                      ملاحظات القرار
                    </SectionTitle>

                    <TextBox>
                      {selectedException.decisionNote}
                    </TextBox>
                  </>
                )}

                {selectedException.status ===
                  "مقبول" && (
                  <>
                    <SectionTitle>
                      المرحلة التالية
                    </SectionTitle>

                    <div
                      className="
                        rounded-[10px]

                        border
                        border-[#BBF7D0]

                        bg-[#ECFDF3]

                        px-[12px]
                        py-[11px]
                      "
                    >
                      <p
                        className="
                          m-0

                          text-[9px]
                          font-bold
                          text-[#15803D]
                        "
                      >
                        تمت إعادة الحالة إلى:
                        {" "}
                        {selectedException.returnStage}
                      </p>
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
                    gap-[8px]
                  "
                >
                  {selectedException.history.map(
                    (entry, index) => (
                      <div
                        key={`${entry.date}-${index}`}
                        className="
                          flex
                          items-start
                          gap-[8px]
                        "
                      >
                        <div
                          className="
                            mt-[3px]

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
                            {entry.action}
                          </p>

                          <span
                            className="
                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ACTIONS */}

              {(selectedException.status ===
                "قيد المراجعة" ||
                selectedException.status ===
                  "بانتظار القرار") && (
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
                        selectedException,
                        "قبول"
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
                    قبول
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedException,
                        "يحتاج استكمال"
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
                    <RotateCcw size={14} />
                    استكمال
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedException,
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
                    <XCircle size={14} />
                    رفض
                  </button>
                </div>
              )}

              {selectedException.status ===
                "يحتاج استكمال" && (
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
                      reopenException(
                        selectedException
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

                      text-[9px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    <RefreshCcw
                      size={14}
                    />

                    تم الاستكمال وإعادة للمراجعة
                  </button>
                </div>
              )}
            </aside>
          </>
        )}

      {/* DECISION MODAL */}

      {showDecisionModal &&
        selectedException && (
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
                    "قبول"
                      ? "قبول الاستثناء"
                      : decisionType ===
                        "رفض"
                      ? "رفض الاستثناء"
                      : "طلب استكمال"}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedException.code}
                    {" · "}
                    {selectedException.student}
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
                  "قبول" && (
                  <div className="mb-[14px]">
                    <Label>
                      إعادة المعاملة إلى
                    </Label>

                    <select
                      value={returnStage}
                      onChange={(event) =>
                        setReturnStage(
                          event.target.value
                        )
                      }
                      className={inputStyle}
                    >
                      <option value="الأهلية">
                        الأهلية
                      </option>

                      <option value="التوزيع">
                        التوزيع
                      </option>

                      <option value="الموافقات">
                        الموافقات
                      </option>

                      <option value="المتابعة">
                        المتابعة
                      </option>
                    </select>
                  </div>
                )}

                <Label>
                  ملاحظات القرار
                  {(decisionType ===
                    "رفض" ||
                    decisionType ===
                      "يحتاج استكمال") &&
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
                    "قبول"
                      ? "يمكن إضافة تفاصيل القرار..."
                      : "اكتب سبب القرار أو المطلوب استكماله..."
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
                      "قبول"
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

function ExceptionBadge({
  status,
}) {
  const styles = {
    "قيد المراجعة":
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",

    "بانتظار القرار":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "يحتاج استكمال":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    مقبول:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

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

function StageBadge({
  stage,
}) {
  const styles = {
    الأهلية:
      "bg-[#F3E8FF] text-[#7E22CE]",

    التوزيع:
      "bg-[#EEF3FF] text-[#09379A]",

    الموافقات:
      "bg-[#FFF7ED] text-[#C2410C]",

    المتابعة:
      "bg-[#ECFDF3] text-[#15803D]",
  };

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
          styles[stage] ||
          "bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {stage}
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