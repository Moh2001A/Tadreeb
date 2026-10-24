import { useMemo, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   COURSES
========================================================= */

const courses = [
  {
    id: 1,
    title: "مهارات الإنعاش القلبي الرئوي",
    code: "TR-C-101",
    capacity: 30,
  },
  {
    id: 2,
    title: "تطوير تطبيقات الويب الحديثة",
    code: "TR-C-102",
    capacity: 25,
  },
  {
    id: 3,
    title: "مهارات الاتصال المؤسسي",
    code: "TR-C-103",
    capacity: 40,
  },
];

/* =========================================================
   REQUESTS
========================================================= */

const initialRequests = [
  {
    id: 1,
    requestCode: "REG-2026-041",

    courseId: 1,
    course: "مهارات الإنعاش القلبي الرئوي",

    studentId: "20230765",
    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    academicLevel: "المستوى الرابع",

    gpa: 3.54,

    phone: "0599776655",

    submittedAt: "2026-10-23",

    status: "بانتظار المراجعة",

    priority: "عادية",

    eligibility: "مؤهل",

    note:
      "الطالبة ترغب بالالتحاق بالدورة لدعم مهاراتها العملية.",

    decisionNote: "",
  },

  {
    id: 2,
    requestCode: "REG-2026-040",

    courseId: 1,
    course: "مهارات الإنعاش القلبي الرئوي",

    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    academicLevel: "المستوى الرابع",

    gpa: 2.67,

    phone: "0599665544",

    submittedAt: "2026-10-23",

    status: "بانتظار المراجعة",

    priority: "عالية",

    eligibility: "مؤهل",

    note:
      "الطالبة مستوفية شروط التسجيل.",

    decisionNote: "",
  },

  {
    id: 3,
    requestCode: "REG-2026-039",

    courseId: 2,
    course: "تطوير تطبيقات الويب الحديثة",

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    academicLevel: "المستوى الرابع",

    gpa: 3.12,

    phone: "0599001122",

    submittedAt: "2026-10-22",

    status: "مقبول",

    priority: "عادية",

    eligibility: "مؤهل",

    note:
      "الطالب ضمن الفئة المستهدفة للدورة.",

    decisionNote:
      "تم قبول الطلب لوجود مقعد متاح.",
  },

  {
    id: 4,
    requestCode: "REG-2026-038",

    courseId: 3,
    course: "مهارات الاتصال المؤسسي",

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    academicLevel: "المستوى الثالث",

    gpa: 3.41,

    phone: "0599445566",

    submittedAt: "2026-10-21",

    status: "قائمة الانتظار",

    priority: "عادية",

    eligibility: "مؤهل",

    waitingPosition: 2,

    note:
      "تم نقل الطلب لقائمة الانتظار بسبب اكتمال المقاعد.",

    decisionNote:
      "لا يوجد مقعد متاح حاليًا.",
  },

  {
    id: 5,
    requestCode: "REG-2026-037",

    courseId: 3,
    course: "مهارات الاتصال المؤسسي",

    studentId: "20231587",
    student: "عمر يوسف سليمان",

    college:
      "كلية الآداب والعلوم الإنسانية",

    major: "الإعلام",

    academicLevel: "المستوى الثالث",

    gpa: 1.86,

    phone: "0599554433",

    submittedAt: "2026-10-20",

    status: "مرفوض",

    priority: "عادية",

    eligibility: "غير مؤهل",

    note:
      "الطالب لا يستوفي متطلبات الدورة.",

    decisionNote:
      "لم يتم استيفاء الحد الأدنى من شروط القبول.",
  },

  {
    id: 6,
    requestCode: "REG-2026-036",

    courseId: 1,
    course: "مهارات الإنعاش القلبي الرئوي",

    studentId: "20231470",
    student: "نور أحمد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    academicLevel: "المستوى الثالث",

    gpa: 3.02,

    phone: "0599123456",

    submittedAt: "2026-10-19",

    status: "قائمة الانتظار",

    priority: "عالية",

    eligibility: "مؤهل",

    waitingPosition: 1,

    note:
      "تم تحويل الطلب لقائمة الانتظار.",

    decisionNote:
      "بانتظار توفر مقعد.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function CourseRegistrationRequests() {
  const [requests, setRequests] =
    useState(initialRequests);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [courseFilter, setCourseFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [priorityFilter, setPriorityFilter] =
    useState("الكل");

  const [
    selectedRequest,
    setSelectedRequest,
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
     COUNTS
  ========================================================= */

  const courseCounts =
    useMemo(() => {
      return courses.reduce(
        (result, course) => {
          const accepted =
            requests.filter(
              (request) =>
                request.courseId ===
                  course.id &&
                request.status ===
                  "مقبول"
            ).length;

          const waiting =
            requests.filter(
              (request) =>
                request.courseId ===
                  course.id &&
                request.status ===
                  "قائمة الانتظار"
            ).length;

          result[course.id] = {
            accepted,
            waiting,
            available:
              course.capacity -
              accepted,
          };

          return result;
        },
        {}
      );
    }, [requests]);

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      requests.length;

    const pending =
      requests.filter(
        (item) =>
          item.status ===
          "بانتظار المراجعة"
      ).length;

    const accepted =
      requests.filter(
        (item) =>
          item.status === "مقبول"
      ).length;

    const waiting =
      requests.filter(
        (item) =>
          item.status ===
          "قائمة الانتظار"
      ).length;

    return [
      {
        title: "إجمالي الطلبات",
        value: total,
        description:
          "طلبات تسجيل الدورات",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "بانتظار المراجعة",
        value: pending,
        description:
          "تحتاج قرار تسجيل",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "طلبات مقبولة",
        value: accepted,
        description:
          "تم تثبيت مقاعدهم",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "قائمة الانتظار",
        value: waiting,
        description:
          "بانتظار توفر مقاعد",
        icon: AlertTriangle,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [requests]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredRequests =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return requests.filter(
        (request) => {
          const matchesSearch =
            !query ||
            request.student
              .toLowerCase()
              .includes(query) ||
            request.studentId
              .toLowerCase()
              .includes(query) ||
            request.requestCode
              .toLowerCase()
              .includes(query) ||
            request.course
              .toLowerCase()
              .includes(query);

          const matchesCourse =
            courseFilter ===
              "الكل" ||
            String(
              request.courseId
            ) === courseFilter;

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            request.status ===
              statusFilter;

          const matchesPriority =
            priorityFilter ===
              "الكل" ||
            request.priority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesCourse &&
            matchesStatus &&
            matchesPriority
          );
        }
      );
    }, [
      requests,
      searchTerm,
      courseFilter,
      statusFilter,
      priorityFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    request
  ) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  /* =========================================================
     DECISION
  ========================================================= */

  const openDecision = (
    request,
    type
  ) => {
    setSelectedRequest(request);
    setDecisionType(type);
    setDecisionNote("");
    setShowDetails(false);
    setShowDecisionModal(true);
  };

  const saveDecision = () => {
    if (!selectedRequest) {
      return;
    }

    if (
      decisionType === "رفض" &&
      !decisionNote.trim()
    ) {
      return;
    }

    const counts =
      courseCounts[
        selectedRequest.courseId
      ];

    let nextStatus =
      selectedRequest.status;

    if (
      decisionType ===
      "قبول"
    ) {
      if (
        !counts ||
        counts.available <= 0
      ) {
        nextStatus =
          "قائمة الانتظار";
      } else {
        nextStatus =
          "مقبول";
      }
    }

    if (
      decisionType ===
      "قائمة الانتظار"
    ) {
      nextStatus =
        "قائمة الانتظار";
    }

    if (
      decisionType === "رفض"
    ) {
      nextStatus =
        "مرفوض";
    }

    const waitingForCourse =
      requests.filter(
        (request) =>
          request.courseId ===
            selectedRequest.courseId &&
          request.status ===
            "قائمة الانتظار"
      ).length;

    setRequests(
      (previous) =>
        previous.map(
          (request) =>
            request.id ===
            selectedRequest.id
              ? {
                  ...request,

                  status:
                    nextStatus,

                  waitingPosition:
                    nextStatus ===
                    "قائمة الانتظار"
                      ? request.waitingPosition ||
                        waitingForCourse +
                          1
                      : undefined,

                  decisionNote:
                    decisionNote.trim() ||
                    (nextStatus ===
                    "مقبول"
                      ? "تم قبول الطلب وتثبيت المقعد."
                      : nextStatus ===
                        "قائمة الانتظار"
                      ? "تم تحويل الطلب إلى قائمة الانتظار."
                      : ""),
                }
              : request
        )
    );

    setShowDecisionModal(false);
    setSelectedRequest(null);
    setDecisionType("");
    setDecisionNote("");
  };

  /* =========================================================
     PROMOTE WAITING STUDENT
  ========================================================= */

  const promoteFromWaiting = (
    request
  ) => {
    const counts =
      courseCounts[
        request.courseId
      ];

    if (
      !counts ||
      counts.available <= 0
    ) {
      return;
    }

    setRequests(
      (previous) =>
        previous.map(
          (item) =>
            item.id === request.id
              ? {
                  ...item,

                  status:
                    "مقبول",

                  waitingPosition:
                    undefined,

                  decisionNote:
                    "تم توفير مقعد وتحويل الطالب من قائمة الانتظار إلى المقبولين.",
                }
              : item
        )
    );

    setShowDetails(false);
    setSelectedRequest(null);
  };

  /* =========================================================
     CANCEL ACCEPTANCE
  ========================================================= */

  const cancelAcceptance = (
    request
  ) => {
    setRequests(
      (previous) =>
        previous.map(
          (item) =>
            item.id === request.id
              ? {
                  ...item,

                  status:
                    "مرفوض",

                  decisionNote:
                    "تم إلغاء القبول الإداري للطلب.",
                }
              : item
        )
    );

    setShowDetails(false);
    setSelectedRequest(null);
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
                التسجيل والانتظار
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
                طلبات التسجيل
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
                مراجعة طلبات التسجيل
                واتخاذ قرار القبول أو الرفض
                أو التحويل لقائمة الانتظار،
                وإدارة المقاعد المتاحة من
                نفس الصفحة.
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
                }
              )}
            </section>

            {/* COURSE CAPACITY */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[10px]

                md:grid-cols-3
              "
            >
              {courses.map(
                (course) => {
                  const counts =
                    courseCounts[
                      course.id
                    ];

                  return (
                    <article
                      key={course.id}
                      className="
                        rounded-[12px]

                        border
                        border-[#DDE5EF]

                        bg-white

                        p-[13px]
                      "
                    >
                      <p
                        className="
                          m-0

                          text-[10px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        {course.title}
                      </p>

                      <span
                        className="
                          mt-[2px]
                          block

                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        {course.code}
                      </span>

                      <div
                        className="
                          mt-[10px]

                          grid
                          grid-cols-3
                          gap-[6px]
                        "
                      >
                        <CapacityValue
                          label="مقبول"
                          value={
                            counts?.accepted ||
                            0
                          }
                        />

                        <CapacityValue
                          label="متاح"
                          value={Math.max(
                            counts?.available ||
                              0,
                            0
                          )}
                        />

                        <CapacityValue
                          label="انتظار"
                          value={
                            counts?.waiting ||
                            0
                          }
                        />
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
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="اسم الطالب، الرقم أو رقم الطلب..."
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
                  label="الدورة"
                  value={
                    courseFilter
                  }
                  onChange={
                    setCourseFilter
                  }
                >
                  <option value="الكل">
                    كل الدورات
                  </option>

                  {courses.map(
                    (course) => (
                      <option
                        key={
                          course.id
                        }
                        value={
                          course.id
                        }
                      >
                        {course.title}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="حالة الطلب"
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

                  <option value="بانتظار المراجعة">
                    بانتظار المراجعة
                  </option>

                  <option value="مقبول">
                    مقبول
                  </option>

                  <option value="قائمة الانتظار">
                    قائمة الانتظار
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

                  <option value="عالية">
                    عالية
                  </option>

                  <option value="عادية">
                    عادية
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
                    طلبات الطلبة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    القبول وقائمة الانتظار
                    تداران من نفس الشاشة
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
                    filteredRequests.length
                  }{" "}
                  طلب
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
                        الدورة
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
                        الانتظار
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRequests.map(
                      (request) => (
                        <tr
                          key={request.id}
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
                                {
                                  request.requestCode
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
                                  request.submittedAt
                                }
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
                                {
                                  request.student
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
                                  request.studentId
                                }
                                {" · "}
                                {request.major}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="min-w-[155px]">
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {
                                  request.course
                                }
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <EligibilityBadge
                              status={
                                request.eligibility
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <PriorityBadge
                              priority={
                                request.priority
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <RequestStatusBadge
                              status={
                                request.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-bold
                                text-[#64748B]
                              "
                            >
                              {request.status ===
                              "قائمة الانتظار"
                                ? `#${request.waitingPosition}`
                                : "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  request
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
                {filteredRequests.map(
                  (request) => (
                    <article
                      key={request.id}
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
                              request.student
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
                              request.requestCode
                            }
                            {" · "}
                            {request.major}
                          </span>
                        </div>

                        <RequestStatusBadge
                          status={
                            request.status
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
                          label="الدورة"
                          value={
                            request.course
                          }
                        />

                        <MobileInfo
                          label="الأهلية"
                          value={
                            request.eligibility
                          }
                        />

                        <MobileInfo
                          label="الأولوية"
                          value={
                            request.priority
                          }
                        />

                        <MobileInfo
                          label="الانتظار"
                          value={
                            request.status ===
                            "قائمة الانتظار"
                              ? `#${request.waitingPosition}`
                              : "—"
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openDetails(
                            request
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

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedRequest && (
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
                    مراجعة طلب التسجيل
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
                      selectedRequest.requestCode
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
                        selectedRequest.student
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
                        selectedRequest.studentId
                      }
                      {" · "}
                      {
                        selectedRequest.major
                      }
                    </p>
                  </div>

                  <RequestStatusBadge
                    status={
                      selectedRequest.status
                    }
                  />
                </div>

                <SectionTitle>
                  بيانات الطالب
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="الكلية"
                    value={
                      selectedRequest.college
                    }
                  />

                  <InfoBox
                    label="التخصص"
                    value={
                      selectedRequest.major
                    }
                  />

                  <InfoBox
                    label="المستوى الأكاديمي"
                    value={
                      selectedRequest.academicLevel
                    }
                  />

                  <InfoBox
                    label="المعدل"
                    value={
                      selectedRequest.gpa
                    }
                  />

                  <InfoBox
                    label="رقم الجوال"
                    value={
                      selectedRequest.phone
                    }
                  />

                  <InfoBox
                    label="الأهلية"
                    value={
                      selectedRequest.eligibility
                    }
                  />
                </div>

                <SectionTitle>
                  بيانات الدورة
                </SectionTitle>

                <InfoBox
                  label="الدورة"
                  value={
                    selectedRequest.course
                  }
                />

                <div
                  className="
                    mt-[8px]

                    grid
                    grid-cols-3
                    gap-[7px]
                  "
                >
                  <CapacityValue
                    label="المقاعد"
                    value={
                      courses.find(
                        (course) =>
                          course.id ===
                          selectedRequest.courseId
                      )?.capacity || 0
                    }
                  />

                  <CapacityValue
                    label="المقبول"
                    value={
                      courseCounts[
                        selectedRequest.courseId
                      ]?.accepted || 0
                    }
                  />

                  <CapacityValue
                    label="المتاح"
                    value={Math.max(
                      courseCounts[
                        selectedRequest.courseId
                      ]?.available || 0,
                      0
                    )}
                  />
                </div>

                <SectionTitle>
                  ملاحظات الطلب
                </SectionTitle>

                <TextBox>
                  {selectedRequest.note}
                </TextBox>

                {selectedRequest.decisionNote && (
                  <>
                    <SectionTitle>
                      ملاحظات القرار
                    </SectionTitle>

                    <TextBox>
                      {
                        selectedRequest.decisionNote
                      }
                    </TextBox>
                  </>
                )}

                {selectedRequest.status ===
                  "قائمة الانتظار" && (
                  <>
                    <SectionTitle>
                      قائمة الانتظار
                    </SectionTitle>

                    <div
                      className="
                        rounded-[10px]

                        border
                        border-[#E9D5FF]

                        bg-[#F3E8FF]

                        px-[11px]
                        py-[10px]
                      "
                    >
                      <p
                        className="
                          m-0

                          text-[9px]
                          font-bold
                          text-[#7E22CE]
                        "
                      >
                        ترتيب الطالب الحالي:
                        {" "}
                        #
                        {
                          selectedRequest.waitingPosition
                        }
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* ACTIONS */}

              {selectedRequest.status ===
                "بانتظار المراجعة" && (
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
                        selectedRequest,
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
                        selectedRequest,
                        "قائمة الانتظار"
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
                      border-[#E9D5FF]

                      bg-[#F3E8FF]

                      text-[9px]
                      font-bold
                      text-[#7E22CE]
                    "
                  >
                    <Clock3 size={14} />

                    انتظار
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision(
                        selectedRequest,
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

              {selectedRequest.status ===
                "قائمة الانتظار" && (
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
                    disabled={
                      (courseCounts[
                        selectedRequest.courseId
                      ]?.available ||
                        0) <= 0
                    }
                    onClick={() =>
                      promoteFromWaiting(
                        selectedRequest
                      )
                    }
                    className={`
                      flex
                      min-h-[40px]
                      w-full
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border-0

                      text-[9px]
                      font-bold

                      ${
                        (courseCounts[
                          selectedRequest.courseId
                        ]?.available ||
                          0) > 0
                          ? "bg-[#09379A] text-white"
                          : "cursor-not-allowed bg-[#E2E8F0] text-[#94A3B8]"
                      }
                    `}
                  >
                    <UserCheck size={14} />

                    {(courseCounts[
                      selectedRequest.courseId
                    ]?.available ||
                      0) > 0
                      ? "تثبيت المقعد وقبول الطالب"
                      : "لا يوجد مقعد متاح"}
                  </button>
                </div>
              )}

              {selectedRequest.status ===
                "مقبول" && (
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
                      cancelAcceptance(
                        selectedRequest
                      )
                    }
                    className="
                      min-h-[40px]
                      w-full

                      rounded-[8px]

                      border
                      border-[#FECDD3]

                      bg-[#FFF1F2]

                      text-[9px]
                      font-bold
                      text-[#BE123C]
                    "
                  >
                    إلغاء القبول
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
        selectedRequest && (
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
                    "قبول"
                      ? "قبول طلب التسجيل"
                      : decisionType ===
                        "رفض"
                      ? "رفض طلب التسجيل"
                      : "إضافة لقائمة الانتظار"}
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
                      selectedRequest.student
                    }
                    {" · "}
                    {
                      selectedRequest.course
                    }
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
                  "قبول" &&
                  (courseCounts[
                    selectedRequest.courseId
                  ]?.available ||
                    0) <= 0 && (
                    <div
                      className="
                        mb-[14px]

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
                      المقاعد مكتملة. عند
                      التأكيد سيتم تحويل
                      الطالب تلقائيًا إلى
                      قائمة الانتظار.
                    </div>
                  )}

                <Label>
                  ملاحظة القرار
                  {decisionType ===
                    "رفض" && " *"}
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
                    "رفض"
                      ? "اكتب سبب رفض الطلب..."
                      : "ملاحظة اختيارية..."
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
                        : "bg-[#7E22CE]"
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

function RequestStatusBadge({
  status,
}) {
  const styles = {
    "بانتظار المراجعة":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    مقبول:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "قائمة الانتظار":
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

function EligibilityBadge({
  status,
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
          status === "مؤهل"
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#FFF1F2] text-[#BE123C]"
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

function CapacityValue({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[8px]

        bg-[#F8FAFC]

        px-[8px]
        py-[8px]

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

          text-[7px]
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