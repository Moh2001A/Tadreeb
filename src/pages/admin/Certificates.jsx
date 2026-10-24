import { useMemo, useState } from "react";

import {
  Award,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  GraduationCap,
  Printer,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialCertificates = [
  {
    id: 1,

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    organization:
      "شركة التقنية المتقدمة",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    evaluationScore: 89,
    evaluationGrade: "جيد جدًا",

    completionApproved: true,

    completionDate: "2026-10-24",

    status: "جاهزة للإصدار",

    certificateNumber: "",

    issuedAt: "",

    issuedBy: "",

    verificationCode: "",

    note:
      "تم اعتماد إتمام جميع متطلبات التدريب.",
  },

  {
    id: 2,

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    organization: "بنك فلسطين",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 120,

    evaluationScore: 97,
    evaluationGrade: "ممتاز",

    completionApproved: true,

    completionDate: "2026-10-23",

    status: "تم الإصدار",

    certificateNumber:
      "TR-2026-00012",

    issuedAt: "2026-10-23",

    issuedBy: "إدارة التدريب",

    verificationCode:
      "AZU-TR-26-0012",

    note:
      "تم إصدار شهادة التدريب بعد اعتماد الإتمام.",
  },

  {
    id: 3,

    studentId: "20231234",
    student: "محمد سامي حسن",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "نظم المعلومات",

    organization:
      "شركة الاتصالات الفلسطينية",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    requiredHours: 120,
    completedHours: 110,

    evaluationScore: null,
    evaluationGrade: "—",

    completionApproved: false,

    completionDate: "",

    status: "غير مؤهل للإصدار",

    certificateNumber: "",

    issuedAt: "",

    issuedBy: "",

    verificationCode: "",

    note:
      "لم يتم اعتماد إتمام التدريب بعد.",
  },

  {
    id: 4,

    studentId: "20230765",
    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    organization:
      "مستشفى الشفاء",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 160,
    completedHours: 160,

    evaluationScore: 97,
    evaluationGrade: "ممتاز",

    completionApproved: true,

    completionDate: "2026-10-21",

    status: "تم الإصدار",

    certificateNumber:
      "TR-2026-00008",

    issuedAt: "2026-10-21",

    issuedBy: "إدارة التدريب",

    verificationCode:
      "AZU-TR-26-0008",

    note:
      "تم إصدار شهادة التدريب السريري.",
  },

  {
    id: 5,

    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    organization:
      "مركز المختبرات الطبية",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    requiredHours: 140,
    completedHours: 140,

    evaluationScore: 83,
    evaluationGrade: "جيد جدًا",

    completionApproved: true,

    completionDate: "2026-10-24",

    status: "جاهزة للإصدار",

    certificateNumber: "",

    issuedAt: "",

    issuedBy: "",

    verificationCode: "",

    note:
      "تم اعتماد إتمام التدريب وجاهزة لإصدار الشهادة.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function generateCertificateNumber(id) {
  return `TR-2026-${String(
    20 + id
  ).padStart(5, "0")}`;
}

function generateVerificationCode(id) {
  return `AZU-TR-26-${String(
    20 + id
  ).padStart(4, "0")}`;
}

/* =========================================================
   PAGE
========================================================= */

export default function Certificates() {
  const [
    certificates,
    setCertificates,
  ] = useState(initialCertificates);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [periodFilter, setPeriodFilter] =
    useState("الكل");

  const [
    selectedCertificate,
    setSelectedCertificate,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showIssueModal, setShowIssueModal] =
    useState(false);

  const [issueNote, setIssueNote] =
    useState("");

  /* =========================================================
     PERIODS
  ========================================================= */

  const periods = useMemo(
    () => [
      ...new Set(
        certificates.map(
          (item) =>
            item.trainingPeriod
        )
      ),
    ],
    [certificates]
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      certificates.length;

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

    const unavailable =
      certificates.filter(
        (item) =>
          item.status ===
          "غير مؤهل للإصدار"
      ).length;

    return [
      {
        title: "إجمالي الملفات",
        value: total,
        description:
          "ملفات شهادات التدريب",
        icon: FileCheck2,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "جاهزة للإصدار",
        value: ready,
        description:
          "تم اعتماد الإتمام",
        icon: Clock3,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "شهادات صادرة",
        value: issued,
        description:
          "تم إصدارها واعتمادها",
        icon: Award,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "غير مؤهلة",
        value: unavailable,
        description:
          "لم يكتمل التدريب بعد",
        icon: ShieldCheck,
        bg: "bg-[#F1F5F9]",
        color: "text-[#64748B]",
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
            item.organization
              .toLowerCase()
              .includes(query) ||
            item.certificateNumber
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            item.status ===
              statusFilter;

          const matchesPeriod =
            periodFilter ===
              "الكل" ||
            item.trainingPeriod ===
              periodFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesPeriod
          );
        }
      );
    }, [
      certificates,
      searchTerm,
      statusFilter,
      periodFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (item) => {
    setSelectedCertificate(
      item
    );

    setShowDetails(true);
  };

  /* =========================================================
     ISSUE
  ========================================================= */

  const openIssue = (item) => {
    if (
      item.status !==
        "جاهزة للإصدار" ||
      !item.completionApproved
    ) {
      return;
    }

    setSelectedCertificate(
      item
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
      !selectedCertificate.completionApproved
    ) {
      return;
    }

    setCertificates((previous) =>
      previous.map((item) =>
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
                "2026-10-24",

              issuedBy:
                "إدارة التدريب",

              note:
                issueNote.trim() ||
                "تم إصدار شهادة التدريب بعد اعتماد جميع المتطلبات.",
            }
          : item
      )
    );

    setShowIssueModal(false);
    setSelectedCertificate(null);
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
                الشهادات
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
                شهادات التدريب
              </h1>

              <p
                className="
                  m-0
                  mt-[3px]

                  max-w-[860px]

                  text-[11px]
                  leading-[21px]
                  text-[#64748B]

                  sm:text-[12px]
                "
              >
                إصدار واعتماد شهادات التدريب
                للطلبة الذين تم اعتماد إتمام
                تدريبهم رسميًا، مع رقم شهادة
                ورمز تحقق لكل شهادة صادرة.
              </p>
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
                      placeholder="الطالب، الرقم الجامعي أو رقم الشهادة..."
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
                  label="الفترة التدريبية"
                  value={periodFilter}
                  onChange={setPeriodFilter}
                >
                  <option value="الكل">
                    كل الفترات
                  </option>

                  {periods.map((period) => (
                    <option
                      key={period}
                      value={period}
                    >
                      {period}
                    </option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="حالة الشهادة"
                  value={statusFilter}
                  onChange={setStatusFilter}
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

                  <option value="غير مؤهل للإصدار">
                    غير مؤهل للإصدار
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
                    ملفات الشهادات
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    لا يمكن إصدار الشهادة قبل
                    اعتماد إنهاء التدريب
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
                  ملف
                </span>
              </div>

              {/* =================================================
                  DESKTOP TABLE
              ================================================== */}

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
                        الطالب
                      </TableHead>

                      <TableHead>
                        التخصص
                      </TableHead>

                      <TableHead>
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        التقييم
                      </TableHead>

                      <TableHead>
                        الإتمام
                      </TableHead>

                      <TableHead>
                        رقم الشهادة
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
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              {item.major}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              {item.organization}
                            </span>
                          </TableCell>

                          <TableCell>
                            {item.evaluationScore !==
                            null ? (
                              <div>
                                <strong
                                  className="
                                    text-[10px]
                                    text-[#09379A]
                                  "
                                >
                                  {item.evaluationScore}%
                                </strong>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#64748B]
                                  "
                                >
                                  {item.evaluationGrade}
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
                            <CompletionBadge
                              approved={
                                item.completionApproved
                              }
                            />
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

              {/* =================================================
                  MOBILE
              ================================================== */}

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
                          status={item.status}
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
                          label="التقييم"
                          value={
                            item.evaluationScore !==
                            null
                              ? `${item.evaluationScore}% - ${item.evaluationGrade}`
                              : "غير مكتمل"
                          }
                        />

                        <MobileInfo
                          label="الساعات"
                          value={`${item.completedHours}/${item.requiredHours}`}
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
                          openDetails(item)
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

                        عرض ملف الشهادة
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
                max-w-[640px]
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
                    ملف الشهادة
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
                {/* STUDENT */}

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
                        {selectedCertificate.student}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[3px]

                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        {selectedCertificate.major}
                        {" · "}
                        {selectedCertificate.college}
                      </p>
                    </div>
                  </div>

                  <CertificateStatusBadge
                    status={
                      selectedCertificate.status
                    }
                  />
                </div>

                {/* TRAINING */}

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
                      selectedCertificate.organization
                    }
                  />

                  <InfoBox
                    label="الفترة التدريبية"
                    value={
                      selectedCertificate.trainingPeriod
                    }
                  />

                  <InfoBox
                    label="الساعات المطلوبة"
                    value={`${selectedCertificate.requiredHours} ساعة`}
                  />

                  <InfoBox
                    label="الساعات المنجزة"
                    value={`${selectedCertificate.completedHours} ساعة`}
                  />
                </div>

                {/* EVALUATION */}

                <SectionTitle>
                  نتيجة التدريب
                </SectionTitle>

                <div
                  className="
                    rounded-[12px]

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
                        الدرجة النهائية
                      </p>

                      <strong
                        className="
                          mt-[4px]
                          block

                          text-[26px]
                          text-[#09379A]
                        "
                      >
                        {selectedCertificate.evaluationScore !==
                        null
                          ? `${selectedCertificate.evaluationScore}%`
                          : "—"}
                      </strong>
                    </div>

                    <div className="text-left">
                      <Award
                        size={26}
                        className="text-[#09379A]"
                      />

                      <p
                        className="
                          m-0
                          mt-[4px]

                          text-[11px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        {
                          selectedCertificate.evaluationGrade
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* COMPLETION */}

                <SectionTitle>
                  اعتماد الإتمام
                </SectionTitle>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3

                    rounded-[10px]

                    border
                    border-[#E7ECF2]

                    bg-[#FAFBFC]

                    px-[11px]
                    py-[10px]
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
                      حالة إنهاء التدريب
                    </p>

                    <span
                      className="
                        mt-[2px]
                        block

                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      {selectedCertificate.completionDate ||
                        "لم يتم الاعتماد"}
                    </span>
                  </div>

                  <CompletionBadge
                    approved={
                      selectedCertificate.completionApproved
                    }
                  />
                </div>

                {/* CERTIFICATE DETAILS */}

                {selectedCertificate.status ===
                  "تم الإصدار" && (
                  <>
                    <SectionTitle>
                      بيانات الشهادة
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

                      <InfoBox
                        label="رمز التحقق"
                        value={
                          selectedCertificate.verificationCode
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-[12px]

                        rounded-[10px]

                        border
                        border-[#BBF7D0]

                        bg-[#ECFDF3]

                        px-[11px]
                        py-[10px]
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-[7px]
                        "
                      >
                        <CheckCircle2
                          size={15}
                          className="text-[#15803D]"
                        />

                        <p
                          className="
                            m-0

                            text-[9px]
                            font-bold
                            text-[#15803D]
                          "
                        >
                          شهادة تدريب صادرة
                          ومعتمدة
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* NOTE */}

                <SectionTitle>
                  ملاحظات
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
                  {selectedCertificate.note}
                </div>

                {selectedCertificate.status ===
                  "غير مؤهل للإصدار" && (
                  <div
                    className="
                      mt-[15px]

                      rounded-[10px]

                      border
                      border-[#E2E8F0]

                      bg-[#F8FAFC]

                      px-[11px]
                      py-[10px]

                      text-[9px]
                      leading-[18px]
                      text-[#64748B]
                    "
                  >
                    لن يتم فتح خيار إصدار
                    الشهادة حتى يتم اعتماد
                    إتمام التدريب من صفحة
                    التقرير النهائي والإتمام.
                  </div>
                )}
              </div>

              {/* ACTIONS */}

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
              {/* HEADER */}

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
                    إصدار شهادة التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedCertificate.student}
                    {" · "}
                    {selectedCertificate.studentId}
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

              {/* BODY */}

              <div
                className="
                  px-5
                  py-5
                "
              >
                <div
                  className="
                    rounded-[10px]

                    border
                    border-[#BBF7D0]

                    bg-[#ECFDF3]

                    px-[11px]
                    py-[10px]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-[8px]
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
                        الطالب مؤهل لإصدار الشهادة
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
                        تم اعتماد إتمام التدريب
                        واستيفاء جميع المتطلبات.
                      </p>
                    </div>
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
                    label="ساعات التدريب"
                    value={`${selectedCertificate.completedHours} ساعة`}
                  />

                  <InfoBox
                    label="النتيجة"
                    value={`${selectedCertificate.evaluationScore}% - ${selectedCertificate.evaluationGrade}`}
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
                    placeholder="ملاحظة اختيارية تظهر في سجل إصدار الشهادة..."
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
                  عند التأكيد سيتم إنشاء
                  رقم شهادة ورمز تحقق وتسجيل
                  تاريخ الإصدار تلقائيًا.
                </div>
              </div>

              {/* FOOTER */}

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
                  onClick={issueCertificate}
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

    "غير مؤهل للإصدار":
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

function CompletionBadge({
  approved,
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
          approved
            ? "bg-[#ECFDF3] text-[#15803D]"
            : "bg-[#F1F5F9] text-[#64748B]"
        }
      `}
    >
      {approved
        ? "معتمد"
        : "غير معتمد"}
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

function TableHead({ children }) {
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

function TableCell({ children }) {
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