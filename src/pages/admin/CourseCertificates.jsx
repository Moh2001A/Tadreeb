import { useMemo, useState } from "react";

import {
  Award,
  CheckCircle2,
  Eye,
  FileCheck2,
  GraduationCap,
  Printer,
  Search,
  ShieldCheck,
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

  certificateEnabled: true,
};

/* =========================================================
   DATA
========================================================= */

const initialCertificates = [
  {
    id: 1,

    studentId: "20230765",

    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    completedHours: 12,

    attendanceRate: 100,

    score: 97,

    grade: "ممتاز",

    passed: true,

    certificateEligible: true,

    status: "تم الإصدار",

    certificateNumber:
      "CRT-2026-00101",

    verificationCode:
      "AZU-C-26-0101",

    issuedAt:
      "2026-11-05",

    issuedBy:
      "إدارة التدريب",

    note:
      "تم إصدار الشهادة بعد استيفاء جميع متطلبات الدورة.",
  },

  {
    id: 2,

    studentId: "20231356",

    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    completedHours: 11,

    attendanceRate: 92,

    score: 84,

    grade: "جيد جدًا",

    passed: true,

    certificateEligible: true,

    status: "جاهزة للإصدار",

    certificateNumber: "",

    verificationCode: "",

    issuedAt: "",

    issuedBy: "",

    note:
      "استوفت المتدربة متطلبات إصدار الشهادة.",
  },

  {
    id: 3,

    studentId: "20231470",

    student: "نور أحمد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    completedHours: 8,

    attendanceRate: 67,

    score: null,

    grade: "—",

    passed: false,

    certificateEligible: false,

    status: "غير مؤهل",

    certificateNumber: "",

    verificationCode: "",

    issuedAt: "",

    issuedBy: "",

    note:
      "لم تستكمل المتدربة متطلبات الحضور والساعات.",
  },

  {
    id: 4,

    studentId: "20231618",

    student: "سلمى خالد يوسف",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    completedHours: 12,

    attendanceRate: 100,

    score: 88,

    grade: "جيد جدًا",

    passed: true,

    certificateEligible: true,

    status: "جاهزة للإصدار",

    certificateNumber: "",

    verificationCode: "",

    issuedAt: "",

    issuedBy: "",

    note:
      "المتدربة جاهزة لإصدار شهادة الدورة.",
  },

  {
    id: 5,

    studentId: "20231632",

    student: "يوسف رائد حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    completedHours: 12,

    attendanceRate: 100,

    score: 81,

    grade: "جيد جدًا",

    passed: true,

    certificateEligible: true,

    status: "تم الإصدار",

    certificateNumber:
      "CRT-2026-00105",

    verificationCode:
      "AZU-C-26-0105",

    issuedAt:
      "2026-11-05",

    issuedBy:
      "إدارة التدريب",

    note:
      "تم إصدار الشهادة بنجاح.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function generateCertificateNumber(id) {
  return `CRT-2026-${String(
    100 + id
  ).padStart(5, "0")}`;
}

function generateVerificationCode(id) {
  return `AZU-C-26-${String(
    100 + id
  ).padStart(4, "0")}`;
}

/* =========================================================
   PAGE
========================================================= */

export default function CourseCertificates() {
  const [
    certificates,
    setCertificates,
  ] = useState(initialCertificates);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("الكل");

  const [
    selectedCertificate,
    setSelectedCertificate,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [
    showIssueModal,
    setShowIssueModal,
  ] = useState(false);

  const [issueNote, setIssueNote] =
    useState("");

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      certificates.length;

    const eligible =
      certificates.filter(
        (item) =>
          item.certificateEligible
      ).length;

    const ready =
      certificates.filter(
        (item) =>
          item.status ===
          "جاهزة للإصدار"
      ).length;

    const issued =
      certificates.filter(
        (item) =>
          item.status ===
          "تم الإصدار"
      ).length;

    return [
      {
        title: "إجمالي المتدربين",
        value: total,
        description:
          "ضمن سجل الشهادات",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مؤهلون للشهادة",
        value: eligible,
        description:
          "استوفوا الشروط",
        icon: ShieldCheck,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "جاهزة للإصدار",
        value: ready,
        description:
          "بانتظار إنشاء الشهادة",
        icon: FileCheck2,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "تم إصدارها",
        value: issued,
        description:
          "شهادات صادرة",
        icon: Award,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, [certificates]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredCertificates =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return certificates.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.student
              .toLowerCase()
              .includes(query) ||
            item.studentId
              .toLowerCase()
              .includes(query) ||
            item.major
              .toLowerCase()
              .includes(query) ||
            item.certificateNumber
              .toLowerCase()
              .includes(query) ||
            item.verificationCode
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            item.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      certificates,
      searchTerm,
      statusFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (
    certificate
  ) => {
    setSelectedCertificate(
      certificate
    );

    setShowDetails(true);
  };

  /* =========================================================
     ISSUE
  ========================================================= */

  const openIssue = (
    certificate
  ) => {
    if (
      !certificate.certificateEligible ||
      certificate.status !==
        "جاهزة للإصدار"
    ) {
      return;
    }

    setSelectedCertificate(
      certificate
    );

    setIssueNote("");

    setShowDetails(false);

    setShowIssueModal(true);
  };

  const issueCertificate = () => {
    if (!selectedCertificate) {
      return;
    }

    if (
      !selectedCertificate
        .certificateEligible
    ) {
      return;
    }

    setCertificates(
      (previous) =>
        previous.map(
          (item) =>
            item.id ===
            selectedCertificate.id
              ? {
                  ...item,

                  status:
                    "تم الإصدار",

                  certificateNumber:
                    generateCertificateNumber(
                      item.id
                    ),

                  verificationCode:
                    generateVerificationCode(
                      item.id
                    ),

                  issuedAt:
                    "2026-11-05",

                  issuedBy:
                    "إدارة التدريب",

                  note:
                    issueNote.trim() ||
                    "تم إصدار شهادة إتمام الدورة بعد استيفاء المتطلبات.",
                }
              : item
        )
    );

    setShowIssueModal(false);

    setSelectedCertificate(
      null
    );

    setIssueNote("");
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    window.print();
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
                شهادات الدورات
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
                شهادات الدورة
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
                إصدار شهادات إتمام الدورة
                للمتدربين المستوفين للشروط،
                ومعاينة بيانات الشهادة ورقمها
                ورمز التحقق من نفس الشاشة.
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

                  <SummaryTag
                    label="الشهادات"
                    value={
                      courseInfo.certificateEnabled
                        ? "مفعلة"
                        : "غير مفعلة"
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

                  md:grid-cols-2
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
                      placeholder="الطالب، الرقم الجامعي، رقم الشهادة أو رمز التحقق..."
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
                  label="حالة الشهادة"
                  value={statusFilter}
                  onChange={
                    setStatusFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="جاهزة للإصدار">
                    جاهزة للإصدار
                  </option>

                  <option value="تم الإصدار">
                    تم الإصدار
                  </option>

                  <option value="غير مؤهل">
                    غير مؤهل
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
                    سجل الشهادات
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    الإصدار والمعاينة من
                    نفس الشاشة
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
                    filteredCertificates.length
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
                        الساعات
                      </TableHead>

                      <TableHead>
                        الحضور
                      </TableHead>

                      <TableHead>
                        النتيجة
                      </TableHead>

                      <TableHead>
                        رقم الشهادة
                      </TableHead>

                      <TableHead>
                        رمز التحقق
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
                    {filteredCertificates.map(
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
                                font-bold
                                text-[#475569]
                              "
                            >
                              {
                                item.completedHours
                              }
                              /
                              {
                                courseInfo.totalHours
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <AttendanceBadge
                              value={
                                item.attendanceRate
                              }
                            />
                          </TableCell>

                          <TableCell>
                            {item.score !==
                            null ? (
                              <div>
                                <strong
                                  className="
                                    text-[10px]
                                    text-[#09379A]
                                  "
                                >
                                  {item.score}%
                                </strong>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#64748B]
                                  "
                                >
                                  {item.grade}
                                </span>
                              </div>
                            ) : (
                              <span
                                className="
                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                —
                              </span>
                            )}
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-medium
                                text-[#475569]
                              "
                            >
                              {item.certificateNumber ||
                                "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[8px]
                                font-medium
                                text-[#64748B]
                              "
                            >
                              {item.verificationCode ||
                                "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            <CertificateStatusBadge
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
                {filteredCertificates.map(
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
                            {item.studentId}
                            {" · "}
                            {item.major}
                          </span>
                        </div>

                        <CertificateStatusBadge
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
                          label="الحضور"
                          value={`${item.attendanceRate}%`}
                        />

                        <MobileInfo
                          label="النتيجة"
                          value={
                            item.score !==
                            null
                              ? `${item.score}% - ${item.grade}`
                              : "—"
                          }
                        />

                        <MobileInfo
                          label="رقم الشهادة"
                          value={
                            item.certificateNumber ||
                            "—"
                          }
                        />

                        <MobileInfo
                          label="تاريخ الإصدار"
                          value={
                            item.issuedAt ||
                            "—"
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
                        عرض الشهادة
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
          DETAILS / PREVIEW DRAWER
      ====================================================== */}

      {showDetails &&
        selectedCertificate && (
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
                max-w-[680px]
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
                    شهادة الدورة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedCertificate.studentId}
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
                          selectedCertificate.student
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
                          selectedCertificate.major
                        }
                        {" · "}
                        {
                          selectedCertificate.college
                        }
                      </p>
                    </div>
                  </div>

                  <CertificateStatusBadge
                    status={
                      selectedCertificate.status
                    }
                  />
                </div>

                {/* ELIGIBILITY */}

                <SectionTitle>
                  أهلية الشهادة
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <EligibilityBox
                    label="الساعات"
                    value={`${selectedCertificate.completedHours}/${courseInfo.totalHours}`}
                    passed={
                      selectedCertificate.completedHours >=
                      courseInfo.totalHours
                    }
                  />

                  <EligibilityBox
                    label="الحضور"
                    value={`${selectedCertificate.attendanceRate}%`}
                    passed={
                      selectedCertificate.attendanceRate >=
                      75
                    }
                  />

                  <EligibilityBox
                    label="نتيجة الدورة"
                    value={
                      selectedCertificate.score !==
                      null
                        ? `${selectedCertificate.score}%`
                        : "غير مكتملة"
                    }
                    passed={
                      selectedCertificate.passed
                    }
                  />

                  <EligibilityBox
                    label="الأهلية"
                    value={
                      selectedCertificate.certificateEligible
                        ? "مؤهل"
                        : "غير مؤهل"
                    }
                    passed={
                      selectedCertificate.certificateEligible
                    }
                  />
                </div>

                {/* CERTIFICATE PREVIEW */}

                {selectedCertificate.status ===
                  "تم الإصدار" && (
                  <>
                    <SectionTitle>
                      معاينة الشهادة
                    </SectionTitle>

                    <div
                      className="
                        rounded-[14px]

                        border-2
                        border-[#D7E5FF]

                        bg-white

                        px-6
                        py-8

                        text-center
                      "
                    >
                      <Award
                        size={34}
                        className="
                          mx-auto
                          text-[#09379A]
                        "
                      />

                      <p
                        className="
                          m-0
                          mt-[14px]

                          text-[9px]
                          font-bold
                          text-[#64748B]
                        "
                      >
                        شهادة إتمام دورة تدريبية
                      </p>

                      <h3
                        className="
                          m-0
                          mt-[8px]

                          text-[19px]
                          font-bold
                          text-[#14213D]
                        "
                      >
                        {
                          selectedCertificate.student
                        }
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[8px]

                          text-[10px]
                          leading-[22px]
                          text-[#475569]
                        "
                      >
                        تشهد إدارة التدريب بأن
                        المتدرب/ة قد أتم/ت بنجاح
                        دورة
                      </p>

                      <strong
                        className="
                          mt-[5px]
                          block

                          text-[14px]
                          text-[#09379A]
                        "
                      >
                        {courseInfo.title}
                      </strong>

                      <p
                        className="
                          m-0
                          mt-[6px]

                          text-[9px]
                          text-[#64748B]
                        "
                      >
                        بواقع{" "}
                        {courseInfo.totalHours}{" "}
                        ساعة تدريبية
                      </p>

                      <div
                        className="
                          mt-[20px]

                          grid
                          grid-cols-2
                          gap-[8px]
                        "
                      >
                        <PreviewValue
                          label="الدرجة"
                          value={`${selectedCertificate.score}%`}
                        />

                        <PreviewValue
                          label="التقدير"
                          value={
                            selectedCertificate.grade
                          }
                        />

                        <PreviewValue
                          label="رقم الشهادة"
                          value={
                            selectedCertificate.certificateNumber
                          }
                        />

                        <PreviewValue
                          label="تاريخ الإصدار"
                          value={
                            selectedCertificate.issuedAt
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[17px]

                          rounded-[8px]

                          bg-[#F8FAFC]

                          px-[10px]
                          py-[8px]
                        "
                      >
                        <span
                          className="
                            text-[7px]
                            text-[#94A3B8]
                          "
                        >
                          رمز التحقق
                        </span>

                        <strong
                          className="
                            mr-[5px]

                            text-[9px]
                            text-[#334155]
                          "
                        >
                          {
                            selectedCertificate.verificationCode
                          }
                        </strong>
                      </div>
                    </div>

                    <SectionTitle>
                      بيانات الإصدار
                    </SectionTitle>

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-[8px]
                      "
                    >
                      <InfoBox
                        label="رقم الشهادة"
                        value={
                          selectedCertificate.certificateNumber
                        }
                      />

                      <InfoBox
                        label="رمز التحقق"
                        value={
                          selectedCertificate.verificationCode
                        }
                      />

                      <InfoBox
                        label="تاريخ الإصدار"
                        value={
                          selectedCertificate.issuedAt
                        }
                      />

                      <InfoBox
                        label="جهة الإصدار"
                        value={
                          selectedCertificate.issuedBy
                        }
                      />
                    </div>
                  </>
                )}

                <SectionTitle>
                  ملاحظات
                </SectionTitle>

                <TextBox>
                  {
                    selectedCertificate.note
                  }
                </TextBox>
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
                {selectedCertificate.status ===
                  "جاهزة للإصدار" && (
                  <button
                    type="button"
                    onClick={() =>
                      openIssue(
                        selectedCertificate
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
                    <Award size={15} />
                    إصدار الشهادة
                  </button>
                )}

                {selectedCertificate.status ===
                  "تم الإصدار" && (
                  <button
                    type="button"
                    onClick={handlePrint}
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
                    <Printer size={15} />
                    طباعة الشهادة
                  </button>
                )}

                {selectedCertificate.status ===
                  "غير مؤهل" && (
                  <div
                    className="
                      rounded-[9px]

                      bg-[#F8FAFC]

                      px-[11px]
                      py-[10px]

                      text-center

                      text-[9px]
                      text-[#64748B]
                    "
                  >
                    لا يمكن إصدار الشهادة
                    قبل استيفاء متطلبات
                    الدورة.
                  </div>
                )}
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ISSUE MODAL
      ====================================================== */}

      {showIssueModal &&
        selectedCertificate && (
          <div
            onClick={() =>
              setShowIssueModal(false)
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
                    إصدار الشهادة
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
                      selectedCertificate.student
                    }
                    {" · "}
                    {
                      selectedCertificate.studentId
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowIssueModal(false)
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
                <div
                  className="
                    flex
                    items-start
                    gap-[8px]

                    rounded-[10px]

                    border
                    border-[#BBF7D0]

                    bg-[#ECFDF3]

                    px-[11px]
                    py-[10px]
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="
                      mt-[1px]
                      shrink-0
                      text-[#15803D]
                    "
                  />

                  <div>
                    <p
                      className="
                        m-0

                        text-[9px]
                        font-bold
                        text-[#15803D]
                      "
                    >
                      المتدرب مؤهل للشهادة
                    </p>

                    <p
                      className="
                        m-0
                        mt-[3px]

                        text-[8px]
                        leading-[17px]
                        text-[#166534]
                      "
                    >
                      تم استكمال الساعات
                      والحضور واجتياز التقييم
                      النهائي.
                    </p>
                  </div>
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
                    label="الساعات"
                    value={`${selectedCertificate.completedHours}/${courseInfo.totalHours}`}
                  />

                  <InfoBox
                    label="الحضور"
                    value={`${selectedCertificate.attendanceRate}%`}
                  />

                  <InfoBox
                    label="الدرجة"
                    value={`${selectedCertificate.score}%`}
                  />

                  <InfoBox
                    label="التقدير"
                    value={
                      selectedCertificate.grade
                    }
                  />
                </div>

                <div className="mt-[14px]">
                  <Label>
                    ملاحظة الإصدار
                  </Label>

                  <textarea
                    value={issueNote}
                    onChange={(event) =>
                      setIssueNote(
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="ملاحظة اختيارية..."
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
                    mt-[12px]

                    rounded-[9px]

                    border
                    border-[#D7E5FF]

                    bg-[#F6F9FF]

                    px-[11px]
                    py-[10px]

                    text-[9px]
                    leading-[18px]
                    text-[#475569]
                  "
                >
                  سيقوم النظام بإنشاء رقم
                  شهادة ورمز تحقق وتاريخ إصدار
                  تلقائيًا عند التأكيد.
                </div>
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
                    setShowIssueModal(false)
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
                    issueCertificate
                  }
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
                  <Award size={14} />

                  تأكيد الإصدار
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

function CertificateStatusBadge({
  status,
}) {
  const styles = {
    "جاهزة للإصدار":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "تم الإصدار":
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "غير مؤهل":
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
            : value >= 75
            ? "bg-[#FFF7ED] text-[#C2410C]"
            : "bg-[#FFF1F2] text-[#BE123C]"
        }
      `}
    >
      {value}%
    </span>
  );
}

function EligibilityBox({
  label,
  value,
  passed,
}) {
  return (
    <div
      className={`
        rounded-[9px]

        border

        px-[10px]
        py-[9px]

        ${
          passed
            ? "border-[#BBF7D0] bg-[#ECFDF3]"
            : "border-[#FECDD3] bg-[#FFF1F2]"
        }
      `}
    >
      <p
        className="
          m-0

          text-[8px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[4px]

          flex
          items-center
          justify-between
          gap-2
        "
      >
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

        {passed ? (
          <CheckCircle2
            size={14}
            className="text-[#15803D]"
          />
        ) : (
          <X
            size={14}
            className="text-[#BE123C]"
          />
        )}
      </div>
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

function PreviewValue({
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
      "
    >
      <p
        className="
          m-0

          text-[7px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <strong
        className="
          mt-[2px]
          block

          text-[9px]
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