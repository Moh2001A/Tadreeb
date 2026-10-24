import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Download,
  FileCheck2,
  GraduationCap,
  Hash,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CourseCertificateVerify() {
  const navigate = useNavigate();

  /* =========================================================
     CERTIFICATES DATABASE
  ========================================================= */

  const certificates = [
    {
      certificateNumber: "CRT-CPR-2026-001",
      studentName: "مريم أحمد علي",
      studentId: "20230765",
      courseName: "الإنعاش القلبي الرئوي CPR",
      courseCode: "TR-C-101",
      trainer: "د. أحمد خالد",
      issueDate: "2026/10/18",
      completionDate: "2026/10/15",
      hours: 12,
      score: "95%",
      status: "صالحة",
      issuedBy: "مركز التدريب - جامعة الأزهر",
    },
    {
      certificateNumber: "CRT-COM-2026-014",
      studentName: "أحمد خالد محمد",
      studentId: "20231045",
      courseName: "مهارات التواصل المهني",
      courseCode: "TR-C-102",
      trainer: "أ. محمد حسن",
      issueDate: "2026/10/20",
      completionDate: "2026/10/19",
      hours: 8,
      score: "88%",
      status: "صالحة",
      issuedBy: "مركز التدريب - جامعة الأزهر",
    },
    {
      certificateNumber: "CRT-SAF-2026-008",
      studentName: "سارة محمود علي",
      studentId: "20230876",
      courseName: "السلامة والصحة المهنية",
      courseCode: "TR-C-103",
      trainer: "م. رامي أحمد",
      issueDate: "2026/09/25",
      completionDate: "2026/09/22",
      hours: 10,
      score: "91%",
      status: "ملغاة",
      issuedBy: "مركز التدريب - جامعة الأزهر",
    },
  ];

  /* =========================================================
     STATE
  ========================================================= */

  const [certificateNumber, setCertificateNumber] =
    useState("");

  const [verifiedCertificate, setVerifiedCertificate] =
    useState(null);

  const [verificationState, setVerificationState] =
    useState("idle");

  /* =========================================================
     RECENT VERIFICATIONS
  ========================================================= */

  const recentCertificates = useMemo(
    () => certificates.slice(0, 3),
    []
  );

  /* =========================================================
     VERIFY
  ========================================================= */

  const verifyCertificate = () => {
    const normalized =
      certificateNumber.trim().toUpperCase();

    if (!normalized) {
      setVerifiedCertificate(null);
      setVerificationState("empty");
      return;
    }

    const certificate = certificates.find(
      (item) =>
        item.certificateNumber.toUpperCase() === normalized
    );

    if (!certificate) {
      setVerifiedCertificate(null);
      setVerificationState("not-found");
      return;
    }

    setVerifiedCertificate(certificate);

    setVerificationState(
      certificate.status === "صالحة"
        ? "valid"
        : "invalid"
    );
  };

  const resetVerification = () => {
    setCertificateNumber("");
    setVerifiedCertificate(null);
    setVerificationState("idle");
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
          bg-[#F8FAFC]
        "
      >
        <Header />

        <main
          className="
            min-h-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            bg-[#F8FAFC]

            px-4
            pb-8
            pt-5

            sm:px-5
            sm:pt-6

            md:px-6
            md:pt-7

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[30px]
          "
        >
          <div className="mx-auto w-full max-w-[1050px]">
            {/* =================================================
                HEADER
            ================================================== */}

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
                <div
                  className="
                    flex
                    items-center
                    gap-[6px]
                    text-[10px]
                    font-medium
                    text-[#94A3B8]
                  "
                >
                  <span>الرئيسية</span>
                  <span>/</span>
                  <span>الدورات التدريبية</span>
                  <span>/</span>
                  <span className="text-[#64748B]">
                    التحقق من الشهادة
                  </span>
                </div>

                <h1
                  className="
                    m-0
                    mt-[5px]
                    text-[22px]
                    font-bold
                    text-[#14213D]

                    sm:text-[24px]
                  "
                >
                  التحقق من شهادة دورة
                </h1>

                <p
                  className="
                    m-0
                    mt-[4px]
                    max-w-[700px]
                    text-[11px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  أدخل رقم الشهادة للتأكد من صحة إصدارها
                  وعرض بيانات المتدرب والدورة المرتبطة بها.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/course-certificates")
                }
                className="
                  flex
                  h-[40px]
                  w-fit
                  items-center
                  gap-[6px]
                  rounded-[9px]
                  border
                  border-[#DCE5F0]
                  bg-white
                  px-[14px]
                  text-[9px]
                  font-bold
                  text-[#64748B]
                "
              >
                <ArrowRight size={15} />
                شهادات الدورات
              </button>
            </div>

            {/* =================================================
                VERIFY CARD
            ================================================== */}

            <section
              className="
                mt-[22px]
                overflow-hidden
                rounded-[16px]
                border
                border-[#DDE5EF]
                bg-white
                shadow-[0_4px_18px_rgba(15,23,42,0.04)]
              "
            >
              <div
                className="
                  bg-[#09379A]
                  px-[20px]
                  py-[22px]
                  text-white

                  sm:px-[24px]
                "
              >
                <div className="flex items-center gap-[10px]">
                  <div
                    className="
                      flex
                      h-[42px]
                      w-[42px]
                      items-center
                      justify-center
                      rounded-[10px]
                      bg-white/10
                    "
                  >
                    <ShieldCheck
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        m-0
                        text-[15px]
                        font-bold
                      "
                    >
                      التحقق من الشهادة
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[9px]
                        text-white/75
                      "
                    >
                      استخدم رقم الشهادة الرسمي للتحقق
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-[18px] sm:p-[22px]">
                <label
                  className="
                    mb-[6px]
                    block
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  رقم الشهادة
                </label>

                <div
                  className="
                    flex
                    flex-col
                    gap-[8px]

                    sm:flex-row
                  "
                >
                  <div
                    className="
                      flex
                      h-[44px]
                      min-w-0
                      flex-1
                      items-center
                      gap-[8px]
                      rounded-[9px]
                      border
                      border-[#CBD5E1]
                      bg-white
                      px-[11px]

                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <Hash
                      size={15}
                      className="text-[#94A3B8]"
                    />

                    <input
                      type="text"
                      value={certificateNumber}
                      onChange={(event) => {
                        setCertificateNumber(
                          event.target.value
                        );

                        if (
                          verificationState !== "idle"
                        ) {
                          setVerificationState("idle");
                          setVerifiedCertificate(null);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          verifyCertificate();
                        }
                      }}
                      placeholder="مثال: CRT-CPR-2026-001"
                      className="
                        h-full
                        min-w-0
                        flex-1
                        border-0
                        bg-transparent
                        text-left
                        text-[10px]
                        font-medium
                        tracking-[0.5px]
                        text-[#334155]
                        outline-none
                        placeholder:text-[#94A3B8]
                      "
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={verifyCertificate}
                    className="
                      flex
                      h-[44px]
                      items-center
                      justify-center
                      gap-[6px]
                      rounded-[9px]
                      border-0
                      bg-[#09379A]
                      px-[18px]
                      text-[9px]
                      font-bold
                      text-white
                      transition

                      hover:bg-[#072E81]
                    "
                  >
                    <Search size={15} />
                    تحقق
                  </button>
                </div>

                <p
                  className="
                    m-0
                    mt-[7px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  للتجربة استخدم: CRT-CPR-2026-001
                </p>
              </div>
            </section>

            {/* =================================================
                EMPTY ERROR
            ================================================== */}

            {verificationState === "empty" && (
              <MessageCard
                type="warning"
                title="أدخل رقم الشهادة"
                description="يجب إدخال رقم الشهادة قبل تنفيذ عملية التحقق."
              />
            )}

            {/* =================================================
                NOT FOUND
            ================================================== */}

            {verificationState === "not-found" && (
              <section
                className="
                  mt-[16px]
                  rounded-[14px]
                  border
                  border-[#FECDD3]
                  bg-[#FFF7F8]
                  p-[18px]
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    py-[18px]
                    text-center
                  "
                >
                  <div
                    className="
                      flex
                      h-[50px]
                      w-[50px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#FFF1F2]
                      text-[#BE123C]
                    "
                  >
                    <XCircle size={24} />
                  </div>

                  <h3
                    className="
                      m-0
                      mt-[11px]
                      text-[13px]
                      font-bold
                      text-[#BE123C]
                    "
                  >
                    الشهادة غير موجودة
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[4px]
                      max-w-[440px]
                      text-[9px]
                      leading-[18px]
                      text-[#64748B]
                    "
                  >
                    لم يتم العثور على شهادة بهذا الرقم.
                    تأكد من كتابة رقم الشهادة بالشكل الصحيح.
                  </p>

                  <button
                    type="button"
                    onClick={resetVerification}
                    className="
                      mt-[12px]
                      h-[35px]
                      rounded-[8px]
                      border
                      border-[#DCE5F0]
                      bg-white
                      px-[13px]
                      text-[8px]
                      font-bold
                      text-[#64748B]
                    "
                  >
                    محاولة جديدة
                  </button>
                </div>
              </section>
            )}

            {/* =================================================
                CERTIFICATE RESULT
            ================================================== */}

            {verifiedCertificate && (
              <section
                className="
                  mt-[16px]
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                "
              >
                {/* STATUS */}

                <div
                  className={`
                    flex
                    flex-col
                    gap-4
                    border-b
                    px-[18px]
                    py-[16px]

                    sm:flex-row
                    sm:items-center
                    sm:justify-between

                    ${
                      verificationState === "valid"
                        ? `
                            border-[#BBF7D0]
                            bg-[#F0FDF4]
                          `
                        : `
                            border-[#FECDD3]
                            bg-[#FFF7F8]
                          `
                    }
                  `}
                >
                  <div className="flex items-center gap-[10px]">
                    <div
                      className={`
                        flex
                        h-[42px]
                        w-[42px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full

                        ${
                          verificationState === "valid"
                            ? `
                                bg-[#DCFCE7]
                                text-[#15803D]
                              `
                            : `
                                bg-[#FFE4E6]
                                text-[#BE123C]
                              `
                        }
                      `}
                    >
                      {verificationState === "valid" ? (
                        <CheckCircle2 size={21} />
                      ) : (
                        <XCircle size={21} />
                      )}
                    </div>

                    <div>
                      <h2
                        className={`
                          m-0
                          text-[14px]
                          font-bold

                          ${
                            verificationState === "valid"
                              ? "text-[#15803D]"
                              : "text-[#BE123C]"
                          }
                        `}
                      >
                        {verificationState === "valid"
                          ? "شهادة صحيحة ومعتمدة"
                          : "الشهادة ملغاة"}
                      </h2>

                      <p
                        className="
                          m-0
                          mt-[2px]
                          text-[8px]
                          text-[#64748B]
                        "
                      >
                        تم العثور على الشهادة في سجلات النظام
                      </p>
                    </div>
                  </div>

                  <div
                    className={`
                      w-fit
                      rounded-full
                      border
                      px-[10px]
                      py-[5px]
                      text-[8px]
                      font-bold

                      ${
                        verificationState === "valid"
                          ? `
                              border-[#BBF7D0]
                              bg-white
                              text-[#15803D]
                            `
                          : `
                              border-[#FECDD3]
                              bg-white
                              text-[#BE123C]
                            `
                      }
                    `}
                  >
                    {verifiedCertificate.status}
                  </div>
                </div>

                <div className="p-[18px] sm:p-[20px]">
                  {/* CERT NUMBER */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      rounded-[11px]
                      border
                      border-[#D7E5FF]
                      bg-[#F6F9FF]
                      p-[14px]

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          m-0
                          text-[8px]
                          font-bold
                          text-[#64748B]
                        "
                      >
                        رقم الشهادة
                      </p>

                      <p
                        className="
                          m-0
                          mt-[3px]
                          text-[12px]
                          font-bold
                          tracking-[0.6px]
                          text-[#09379A]
                        "
                        dir="ltr"
                      >
                        {
                          verifiedCertificate.certificateNumber
                        }
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-[38px]
                        w-[38px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-white
                        text-[#09379A]
                      "
                    >
                      <Award size={18} />
                    </div>
                  </div>

                  {/* STUDENT */}

                  <SectionTitle
                    title="بيانات المتدرب"
                    icon={UserRound}
                  />

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-[9px]

                      sm:grid-cols-2
                    "
                  >
                    <DetailBox
                      label="اسم المتدرب"
                      value={
                        verifiedCertificate.studentName
                      }
                    />

                    <DetailBox
                      label="الرقم الجامعي"
                      value={
                        verifiedCertificate.studentId
                      }
                    />
                  </div>

                  {/* COURSE */}

                  <SectionTitle
                    title="بيانات الدورة"
                    icon={GraduationCap}
                  />

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-[9px]

                      sm:grid-cols-2
                    "
                  >
                    <DetailBox
                      label="اسم الدورة"
                      value={
                        verifiedCertificate.courseName
                      }
                    />

                    <DetailBox
                      label="رمز الدورة"
                      value={
                        verifiedCertificate.courseCode
                      }
                    />

                    <DetailBox
                      label="المدرب"
                      value={
                        verifiedCertificate.trainer
                      }
                    />

                    <DetailBox
                      label="عدد الساعات"
                      value={`${verifiedCertificate.hours} ساعة`}
                    />

                    <DetailBox
                      label="تاريخ الإكمال"
                      value={
                        verifiedCertificate.completionDate
                      }
                    />

                    <DetailBox
                      label="النتيجة"
                      value={
                        verifiedCertificate.score
                      }
                    />
                  </div>

                  {/* ISSUE */}

                  <SectionTitle
                    title="بيانات الإصدار"
                    icon={FileCheck2}
                  />

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-[9px]

                      sm:grid-cols-2
                    "
                  >
                    <DetailBox
                      label="تاريخ الإصدار"
                      value={
                        verifiedCertificate.issueDate
                      }
                    />

                    <DetailBox
                      label="جهة الإصدار"
                      value={
                        verifiedCertificate.issuedBy
                      }
                    />
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      mt-[17px]
                      flex
                      flex-col
                      gap-[7px]
                      border-t
                      border-[#EEF2F7]
                      pt-[14px]

                      sm:flex-row
                    "
                  >
                    <button
                      type="button"
                      className="
                        flex
                        h-[38px]
                        flex-1
                        items-center
                        justify-center
                        gap-[6px]
                        rounded-[8px]
                        border-0
                        bg-[#09379A]
                        text-[8px]
                        font-bold
                        text-white
                      "
                    >
                      <Download size={14} />

                      تحميل الشهادة
                    </button>

                    <button
                      type="button"
                      onClick={resetVerification}
                      className="
                        flex
                        h-[38px]
                        flex-1
                        items-center
                        justify-center
                        gap-[6px]
                        rounded-[8px]
                        border
                        border-[#DCE5F0]
                        bg-white
                        text-[8px]
                        font-bold
                        text-[#64748B]
                      "
                    >
                      <Search size={14} />

                      التحقق من شهادة أخرى
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* =================================================
                RECENT CERTIFICATES
            ================================================== */}

            {verificationState === "idle" && (
              <section
                className="
                  mt-[18px]
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  p-[16px]
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
                    شهادات للتجربة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[8px]
                      text-[#94A3B8]
                    "
                  >
                    اضغط على أي شهادة لتعبئة رقمها تلقائيًا
                  </p>
                </div>

                <div
                  className="
                    mt-[13px]
                    grid
                    grid-cols-1
                    gap-[9px]

                    md:grid-cols-3
                  "
                >
                  {recentCertificates.map(
                    (certificate) => (
                      <button
                        key={
                          certificate.certificateNumber
                        }
                        type="button"
                        onClick={() => {
                          setCertificateNumber(
                            certificate.certificateNumber
                          );

                          setVerificationState("idle");
                          setVerifiedCertificate(null);
                        }}
                        className="
                          rounded-[10px]
                          border
                          border-[#E2E8F0]
                          bg-[#FAFBFC]
                          p-[12px]
                          text-right
                          transition

                          hover:border-[#B7C8E4]
                          hover:bg-[#F6F9FF]
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
                          <div
                            className="
                              flex
                              h-[32px]
                              w-[32px]
                              items-center
                              justify-center
                              rounded-[8px]
                              bg-[#EEF3FF]
                              text-[#09379A]
                            "
                          >
                            <Award size={15} />
                          </div>

                          <span
                            className={`
                              rounded-full
                              border
                              px-[7px]
                              py-[3px]
                              text-[7px]
                              font-bold

                              ${
                                certificate.status === "صالحة"
                                  ? `
                                      border-[#BBF7D0]
                                      bg-[#ECFDF3]
                                      text-[#15803D]
                                    `
                                  : `
                                      border-[#FECDD3]
                                      bg-[#FFF1F2]
                                      text-[#BE123C]
                                    `
                              }
                            `}
                          >
                            {certificate.status}
                          </span>
                        </div>

                        <h3
                          className="
                            m-0
                            mt-[9px]
                            text-[10px]
                            font-bold
                            text-[#334155]
                          "
                        >
                          {certificate.studentName}
                        </h3>

                        <p
                          className="
                            m-0
                            mt-[2px]
                            truncate
                            text-[8px]
                            text-[#64748B]
                          "
                        >
                          {certificate.courseName}
                        </p>

                        <p
                          className="
                            m-0
                            mt-[7px]
                            text-left
                            text-[8px]
                            font-bold
                            tracking-[0.4px]
                            text-[#09379A]
                          "
                          dir="ltr"
                        >
                          {certificate.certificateNumber}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                NOTE
            ================================================== */}

            <div
              className="
                mt-[16px]
                flex
                items-start
                gap-[9px]
                rounded-[11px]
                border
                border-[#D7E5FF]
                bg-[#F6F9FF]
                p-[13px]
              "
            >
              <div
                className="
                  flex
                  h-[31px]
                  w-[31px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  bg-white
                  text-[#09379A]
                "
              >
                <ShieldCheck size={14} />
              </div>

              <div>
                <p
                  className="
                    m-0
                    text-[9px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  التحقق الإلكتروني
                </p>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[8px]
                    leading-[17px]
                    text-[#64748B]
                  "
                >
                  عند ربط النظام بالـBackend يجب تنفيذ التحقق
                  من قاعدة البيانات باستخدام رقم شهادة فريد،
                  ويمكن لاحقًا ربط نفس الصفحة مع QR Code الموجود
                  على الشهادة.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  icon: Icon,
}) {
  return (
    <div
      className="
        mb-[9px]
        mt-[17px]
        flex
        items-center
        gap-[7px]
      "
    >
      <div
        className="
          flex
          h-[29px]
          w-[29px]
          items-center
          justify-center
          rounded-[7px]
          bg-[#EEF3FF]
          text-[#09379A]
        "
      >
        <Icon size={13} />
      </div>

      <h3
        className="
          m-0
          text-[11px]
          font-bold
          text-[#334155]
        "
      >
        {title}
      </h3>
    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        p-[11px]
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
          leading-[17px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MESSAGE CARD
========================================================= */

function MessageCard({
  title,
  description,
}) {
  return (
    <section
      className="
        mt-[16px]
        rounded-[12px]
        border
        border-[#FED7AA]
        bg-[#FFF7E6]
        p-[14px]
      "
    >
      <div className="flex items-start gap-[9px]">
        <div
          className="
            flex
            h-[32px]
            w-[32px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]
            bg-white
            text-[#C65D00]
          "
        >
          <CalendarDays size={14} />
        </div>

        <div>
          <p
            className="
              m-0
              text-[9px]
              font-bold
              text-[#C65D00]
            "
          >
            {title}
          </p>

          <p
            className="
              m-0
              mt-[2px]
              text-[8px]
              leading-[17px]
              text-[#64748B]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}