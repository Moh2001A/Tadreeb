import { useMemo, useState } from "react";

import {
  CheckCircle2,
  Clock3,
  Eye,
  GraduationCap,
  Search,
  UserCheck,
  Users,
  X,
  XCircle,
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

  startDate: "2026-11-02",

  endDate: "2026-11-04",

  totalHours: 12,

  sessions: [
    {
      id: 1,
      title: "اليوم الأول",
      date: "2026-11-02",
    },

    {
      id: 2,
      title: "اليوم الثاني",
      date: "2026-11-03",
    },

    {
      id: 3,
      title: "اليوم الثالث",
      date: "2026-11-04",
    },
  ],
};

/* =========================================================
   TRAINEES
========================================================= */

const initialTrainees = [
  {
    id: 1,

    studentId: "20230765",

    name: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    academicLevel: "المستوى الرابع",

    phone: "0599776655",

    email: "mariam@student.edu",

    registrationDate:
      "2026-10-23",

    status: "نشط",

    attendance: {
      1: "حاضر",
      2: "حاضر",
      3: "حاضر",
    },

    completedHours: 12,

    evaluationStatus:
      "تم التقييم",

    finalScore: 96,

    certificateStatus:
      "جاهزة للإصدار",
  },

  {
    id: 2,

    studentId: "20231356",

    name: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    academicLevel: "المستوى الرابع",

    phone: "0599665544",

    email: "lina@student.edu",

    registrationDate:
      "2026-10-23",

    status: "نشط",

    attendance: {
      1: "حاضر",
      2: "متأخر",
      3: "حاضر",
    },

    completedHours: 11,

    evaluationStatus:
      "بانتظار التقييم",

    finalScore: null,

    certificateStatus:
      "غير متاحة",
  },

  {
    id: 3,

    studentId: "20231470",

    name: "نور أحمد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    academicLevel: "المستوى الثالث",

    phone: "0599123456",

    email: "noor@student.edu",

    registrationDate:
      "2026-10-25",

    status: "نشط",

    attendance: {
      1: "حاضر",
      2: "غائب",
      3: "حاضر",
    },

    completedHours: 8,

    evaluationStatus:
      "غير جاهز",

    finalScore: null,

    certificateStatus:
      "غير متاحة",
  },

  {
    id: 4,

    studentId: "20231601",

    name: "رامي خالد محمود",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    academicLevel: "المستوى الرابع",

    phone: "0599345678",

    email: "rami@student.edu",

    registrationDate:
      "2026-10-24",

    status: "منسحب",

    attendance: {
      1: "حاضر",
      2: "غائب",
      3: "غائب",
    },

    completedHours: 4,

    evaluationStatus:
      "ملغي",

    finalScore: null,

    certificateStatus:
      "غير متاحة",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function calculateAttendanceRate(
  trainee
) {
  const sessions =
    courseInfo.sessions;

  if (!sessions.length) {
    return 0;
  }

  let score = 0;

  sessions.forEach((session) => {
    const value =
      trainee.attendance[
        session.id
      ];

    if (value === "حاضر") {
      score += 1;
    }

    if (value === "متأخر") {
      score += 0.75;
    }
  });

  return Math.round(
    (score / sessions.length) *
      100
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function CourseTrainees() {
  const [trainees, setTrainees] =
    useState(initialTrainees);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [
    attendanceFilter,
    setAttendanceFilter,
  ] = useState("الكل");

  const [
    selectedTrainee,
    setSelectedTrainee,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [
    showAttendanceModal,
    setShowAttendanceModal,
  ] = useState(false);

  const [
    selectedSession,
    setSelectedSession,
  ] = useState(
    courseInfo.sessions[0]?.id || 1
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      trainees.length;

    const active =
      trainees.filter(
        (trainee) =>
          trainee.status === "نشط"
      ).length;

    const completed =
      trainees.filter(
        (trainee) =>
          trainee.completedHours >=
          courseInfo.totalHours
      ).length;

    const attendanceAverage =
      trainees.length
        ? Math.round(
            trainees.reduce(
              (totalValue, trainee) =>
                totalValue +
                calculateAttendanceRate(
                  trainee
                ),
              0
            ) / trainees.length
          )
        : 0;

    return [
      {
        title: "إجمالي المتدربين",
        value: total,
        description:
          "مسجلون في الدورة",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "متدربون نشطون",
        value: active,
        description:
          "مستمرون في الدورة",
        icon: UserCheck,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "أكملوا الساعات",
        value: completed,
        description:
          "استوفوا ساعات الدورة",
        icon: CheckCircle2,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "متوسط الحضور",
        value: `${attendanceAverage}%`,
        description:
          "لكافة المتدربين",
        icon: Clock3,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [trainees]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredTrainees =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return trainees.filter(
        (trainee) => {
          const attendanceRate =
            calculateAttendanceRate(
              trainee
            );

          const matchesSearch =
            !query ||
            trainee.name
              .toLowerCase()
              .includes(query) ||
            trainee.studentId
              .toLowerCase()
              .includes(query) ||
            trainee.major
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            trainee.status ===
              statusFilter;

          let matchesAttendance =
            true;

          if (
            attendanceFilter ===
            "منتظم"
          ) {
            matchesAttendance =
              attendanceRate >= 85;
          }

          if (
            attendanceFilter ===
            "يحتاج متابعة"
          ) {
            matchesAttendance =
              attendanceRate < 85;
          }

          return (
            matchesSearch &&
            matchesStatus &&
            matchesAttendance
          );
        }
      );
    }, [
      trainees,
      searchTerm,
      statusFilter,
      attendanceFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    trainee
  ) => {
    setSelectedTrainee(
      trainee
    );

    setShowDetails(true);
  };

  /* =========================================================
     ATTENDANCE
  ========================================================= */

  const openAttendance = () => {
    setShowAttendanceModal(
      true
    );
  };

  const updateAttendance = (
    traineeId,
    status
  ) => {
    setTrainees(
      (previous) =>
        previous.map(
          (trainee) =>
            trainee.id ===
            traineeId
              ? {
                  ...trainee,

                  attendance: {
                    ...trainee.attendance,

                    [selectedSession]:
                      status,
                  },
                }
              : trainee
        )
    );
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const updateTraineeStatus = (
    traineeId,
    status
  ) => {
    setTrainees(
      (previous) =>
        previous.map(
          (trainee) =>
            trainee.id ===
            traineeId
              ? {
                  ...trainee,
                  status,
                }
              : trainee
        )
    );

    setSelectedTrainee(
      (previous) =>
        previous?.id === traineeId
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
                المتدربون والحضور
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
                  المتدربون والحضور
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
                  إدارة المتدربين المسجلين
                  في الدورة ومتابعة الحضور
                  والساعات وحالة كل متدرب
                  من شاشة تشغيلية واحدة.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  openAttendance
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
                <CheckCircle2
                  size={16}
                />

                تسجيل الحضور
              </button>
            </section>

            {/* COURSE SUMMARY */}

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
                    label="الجلسات"
                    value={`${courseInfo.sessions.length}`}
                  />

                  <SummaryTag
                    label="الفترة"
                    value={`${courseInfo.startDate} - ${courseInfo.endDate}`}
                  />
                </div>
              </div>
            </section>

            {/* STATS */}

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
                        min-h-[125px]

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
                      placeholder="اسم المتدرب أو الرقم الجامعي..."
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
                  label="حالة المتدرب"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="نشط">
                    نشط
                  </option>

                  <option value="منسحب">
                    منسحب
                  </option>

                  <option value="مكتمل">
                    مكتمل
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الانتظام بالحضور"
                  value={attendanceFilter}
                  onChange={
                    setAttendanceFilter
                  }
                >
                  <option value="الكل">
                    الكل
                  </option>

                  <option value="منتظم">
                    منتظم
                  </option>

                  <option value="يحتاج متابعة">
                    يحتاج متابعة
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
                    قائمة المتدربين
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    بيانات المتدرب والحضور
                    والتقدم في الدورة
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
                    filteredTrainees.length
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
                        التخصص
                      </TableHead>

                      <TableHead>
                        الحالة
                      </TableHead>

                      <TableHead>
                        الحضور
                      </TableHead>

                      <TableHead>
                        الساعات
                      </TableHead>

                      <TableHead>
                        التقييم
                      </TableHead>

                      <TableHead>
                        الشهادة
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTrainees.map(
                      (trainee) => {
                        const attendance =
                          calculateAttendanceRate(
                            trainee
                          );

                        return (
                          <tr
                            key={trainee.id}
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
                                  {trainee.name}
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
                                    trainee.studentId
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    font-medium
                                    text-[#475569]
                                  "
                                >
                                  {trainee.major}
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
                                    trainee.academicLevel
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <TraineeStatusBadge
                                status={
                                  trainee.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <AttendanceBadge
                                value={
                                  attendance
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
                                  trainee.completedHours
                                }
                                /
                                {
                                  courseInfo.totalHours
                                }
                              </span>
                            </TableCell>

                            <TableCell>
                              <EvaluationBadge
                                status={
                                  trainee.evaluationStatus
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <CertificateBadge
                                status={
                                  trainee.certificateStatus
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <button
                                type="button"
                                onClick={() =>
                                  openDetails(
                                    trainee
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
                {filteredTrainees.map(
                  (trainee) => {
                    const attendance =
                      calculateAttendanceRate(
                        trainee
                      );

                    return (
                      <article
                        key={trainee.id}
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
                              {trainee.name}
                            </p>

                            <span
                              className="
                                mt-[2px]
                                block

                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              {trainee.studentId}
                              {" · "}
                              {trainee.major}
                            </span>
                          </div>

                          <TraineeStatusBadge
                            status={
                              trainee.status
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
                            value={`${attendance}%`}
                          />

                          <MobileInfo
                            label="الساعات"
                            value={`${trainee.completedHours}/${courseInfo.totalHours}`}
                          />

                          <MobileInfo
                            label="التقييم"
                            value={
                              trainee.evaluationStatus
                            }
                          />

                          <MobileInfo
                            label="الشهادة"
                            value={
                              trainee.certificateStatus
                            }
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              trainee
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

                          ملف المتدرب
                        </button>
                      </article>
                    );
                  }
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
        selectedTrainee && (
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
                    ملف المتدرب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedTrainee.studentId}
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
                        {selectedTrainee.name}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[2px]

                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        {selectedTrainee.major}
                        {" · "}
                        {selectedTrainee.academicLevel}
                      </p>
                    </div>
                  </div>

                  <TraineeStatusBadge
                    status={
                      selectedTrainee.status
                    }
                  />
                </div>

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
                    label="الكلية"
                    value={
                      selectedTrainee.college
                    }
                  />

                  <InfoBox
                    label="التخصص"
                    value={
                      selectedTrainee.major
                    }
                  />

                  <InfoBox
                    label="رقم الجوال"
                    value={
                      selectedTrainee.phone
                    }
                  />

                  <InfoBox
                    label="البريد الإلكتروني"
                    value={
                      selectedTrainee.email
                    }
                  />

                  <InfoBox
                    label="تاريخ التسجيل"
                    value={
                      selectedTrainee.registrationDate
                    }
                  />

                  <InfoBox
                    label="الساعات المنجزة"
                    value={`${selectedTrainee.completedHours}/${courseInfo.totalHours}`}
                  />
                </div>

                <SectionTitle>
                  سجل الحضور
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {courseInfo.sessions.map(
                    (session) => (
                      <div
                        key={
                          session.id
                        }
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
                        <div>
                          <p
                            className="
                              m-0

                              text-[9px]
                              font-bold
                              text-[#475569]
                            "
                          >
                            {session.title}
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {session.date}
                          </span>
                        </div>

                        <AttendanceStatusBadge
                          status={
                            selectedTrainee
                              .attendance[
                              session.id
                            ] || "غير مسجل"
                          }
                        />
                      </div>
                    )
                  )}
                </div>

                <SectionTitle>
                  ملخص الحضور
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
                        نسبة الحضور
                      </p>

                      <strong
                        className="
                          mt-[3px]
                          block

                          text-[24px]
                          text-[#09379A]
                        "
                      >
                        {calculateAttendanceRate(
                          selectedTrainee
                        )}
                        %
                      </strong>
                    </div>

                    <AttendanceBadge
                      value={calculateAttendanceRate(
                        selectedTrainee
                      )}
                    />
                  </div>
                </div>

                <SectionTitle>
                  التقييم والشهادة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="حالة التقييم"
                    value={
                      selectedTrainee.evaluationStatus
                    }
                  />

                  <InfoBox
                    label="الدرجة"
                    value={
                      selectedTrainee.finalScore !==
                      null
                        ? `${selectedTrainee.finalScore}%`
                        : "—"
                    }
                  />

                  <InfoBox
                    label="حالة الشهادة"
                    value={
                      selectedTrainee.certificateStatus
                    }
                  />
                </div>
              </div>

              {/* STATUS ACTION */}

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
                {selectedTrainee.status ===
                  "نشط" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        updateTraineeStatus(
                          selectedTrainee.id,
                          "مكتمل"
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

                      إنهاء الدورة
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateTraineeStatus(
                          selectedTrainee.id,
                          "منسحب"
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

                      انسحاب
                    </button>
                  </>
                )}
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ATTENDANCE MODAL
      ====================================================== */}

      {showAttendanceModal && (
        <div
          onClick={() =>
            setShowAttendanceModal(false)
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
                  تسجيل الحضور
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  {courseInfo.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAttendanceModal(
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

            {/* SESSION */}

            <div
              className="
                border-b
                border-[#EEF2F7]

                px-5
                py-[14px]
              "
            >
              <Label>
                الجلسة
              </Label>

              <select
                value={
                  selectedSession
                }
                onChange={(event) =>
                  setSelectedSession(
                    Number(
                      event.target.value
                    )
                  )
                }
                className={inputStyle}
              >
                {courseInfo.sessions.map(
                  (session) => (
                    <option
                      key={session.id}
                      value={session.id}
                    >
                      {session.title}
                      {" - "}
                      {session.date}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* ATTENDANCE LIST */}

            <div
              className="
                flex
                flex-col
                gap-[8px]

                px-5
                py-5
              "
            >
              {trainees
                .filter(
                  (trainee) =>
                    trainee.status !==
                    "منسحب"
                )
                .map(
                  (trainee) => {
                    const currentStatus =
                      trainee.attendance[
                        selectedSession
                      ] ||
                      "غير مسجل";

                    return (
                      <div
                        key={
                          trainee.id
                        }
                        className="
                          flex
                          flex-col
                          gap-[10px]

                          rounded-[10px]

                          border
                          border-[#E7ECF2]

                          bg-[#FAFBFC]

                          p-[11px]

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div>
                          <p
                            className="
                              m-0

                              text-[10px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {trainee.name}
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {trainee.studentId}
                            {" · "}
                            {trainee.major}
                          </span>
                        </div>

                        <div
                          className="
                            grid
                            grid-cols-3
                            gap-[6px]
                          "
                        >
                          <AttendanceButton
                            label="حاضر"
                            active={
                              currentStatus ===
                              "حاضر"
                            }
                            type="success"
                            onClick={() =>
                              updateAttendance(
                                trainee.id,
                                "حاضر"
                              )
                            }
                          />

                          <AttendanceButton
                            label="متأخر"
                            active={
                              currentStatus ===
                              "متأخر"
                            }
                            type="warning"
                            onClick={() =>
                              updateAttendance(
                                trainee.id,
                                "متأخر"
                              )
                            }
                          />

                          <AttendanceButton
                            label="غائب"
                            active={
                              currentStatus ===
                              "غائب"
                            }
                            type="danger"
                            onClick={() =>
                              updateAttendance(
                                trainee.id,
                                "غائب"
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                )}
            </div>

            {/* FOOTER */}

            <div
              className="
                sticky
                bottom-0

                flex
                justify-end

                border-t
                border-[#E2E8F0]

                bg-white

                px-5
                py-[14px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowAttendanceModal(
                    false
                  )
                }
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
                حفظ الحضور
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

function TraineeStatusBadge({
  status,
}) {
  const styles = {
    نشط:
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",

    مكتمل:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    منسحب:
      "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
  };

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
          styles[status] ||
          "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function AttendanceBadge({
  value,
}) {
  const style =
    value >= 85
      ? "bg-[#ECFDF3] text-[#15803D]"
      : value >= 70
      ? "bg-[#FFF7ED] text-[#C2410C]"
      : "bg-[#FFF1F2] text-[#BE123C]";

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

        ${style}
      `}
    >
      {value}%
    </span>
  );
}

function AttendanceStatusBadge({
  status,
}) {
  const styles = {
    حاضر:
      "bg-[#ECFDF3] text-[#15803D]",

    متأخر:
      "bg-[#FFF7ED] text-[#C2410C]",

    غائب:
      "bg-[#FFF1F2] text-[#BE123C]",

    "غير مسجل":
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
          styles["غير مسجل"]
        }
      `}
    >
      {status}
    </span>
  );
}

function EvaluationBadge({
  status,
}) {
  const styles = {
    "تم التقييم":
      "bg-[#ECFDF3] text-[#15803D]",

    "بانتظار التقييم":
      "bg-[#FFF7ED] text-[#C2410C]",

    "غير جاهز":
      "bg-[#F1F5F9] text-[#64748B]",

    ملغي:
      "bg-[#FFF1F2] text-[#BE123C]",
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

function CertificateBadge({
  status,
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
          status ===
          "جاهزة للإصدار"
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function AttendanceButton({
  label,
  active,
  type,
  onClick,
}) {
  const styles = {
    success: active
      ? "border-[#15803D] bg-[#ECFDF3] text-[#15803D]"
      : "border-[#DDE5EF] bg-white text-[#64748B]",

    warning: active
      ? "border-[#C2410C] bg-[#FFF7ED] text-[#C2410C]"
      : "border-[#DDE5EF] bg-white text-[#64748B]",

    danger: active
      ? "border-[#BE123C] bg-[#FFF1F2] text-[#BE123C]"
      : "border-[#DDE5EF] bg-white text-[#64748B]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        min-h-[34px]

        rounded-[7px]

        border

        px-[10px]

        text-[8px]
        font-bold

        ${styles[type]}
      `}
    >
      {label}
    </button>
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

          break-words

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