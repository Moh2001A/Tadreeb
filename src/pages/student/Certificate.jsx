import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Download,
  FileCheck2,
  GraduationCap,
  QrCode,
  Share2,
  ShieldCheck,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Certificate() {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const certificate = {
    studentName: "أمل أحمد",

    organization:
      "شركة القدس للاتصالات",

    startDate: "2025/10/01",

    endDate: "2025/12/01",

    hours: 120,

    documentNumber:
      "CIS-FT-2025-0842",

    issueDate:
      "2025/12/05",

    finalScore: 4.5,

    maxScore: 5.0,

    grade:
      "ممتاز",

    signer:
      "د. محمد الأسطل",

    signerTitle:
      "رئيس قسم التدريب الميداني",
  };

  const handleDownloadCertificate = () => {
    console.log(
      "Download certificate PDF"
    );
  };

  const handleShareCertificate = async () => {
    const shareData = {
      title:
        "شهادة التدريب الميداني",
      text: `شهادة إتمام التدريب الميداني - ${certificate.studentName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(
          shareData
        );
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      dir="rtl"
      className="
        h-screen
        w-full
        flex
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* =========================================
          SIDEBAR
      ========================================== */}
      <Sidebar />

      {/* =========================================
          MAIN AREA
      ========================================== */}
      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}
        <Header />

        {/* =========================================
            CONTENT
        ========================================== */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[18px]
            pb-[40px]
          "
        >
          <div
            className="
              w-full
              max-w-[1080px]
              mx-auto
            "
          >
            {/* =====================================
                BREADCRUMB
            ====================================== */}
            <div
              className="
                flex
                items-center
                gap-[7px]
                text-[13px]
                leading-[20px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/dashboard"
                  )
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
                  transition
                  hover:text-[#09379A]
                "
              >
                الرئيسية
              </button>

              <span
                className="
                  text-[#94A3B8]
                "
              >
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                الشهادة
              </span>
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section
              className="
                mt-[6px]
                flex
                items-start
                justify-between
                gap-[20px]
              "
            >
              {/* Title */}
              <div>
                <h1
                  className="
                    m-0
                    text-[30px]
                    leading-[42px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  الشهادة الرسمية للتدريب الميداني
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]
                    max-w-[700px]
                    text-[12px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  معاينة وتحميل الوثيقة الرسمية لإتمام
                  متطلبات التدريب الميداني المعتمدة
                  أكاديميا من كلية الدراسات المتوسطة
                </p>
              </div>

              {/* Certificate State */}
              <div
                className="
                  min-w-[230px]
                  rounded-[10px]
                  border
                  border-[#D9E2EC]
                  bg-white
                  px-[14px]
                  py-[10px]
                  flex
                  items-center
                  justify-between
                  gap-[14px]
                "
              >
                <div
                  className="
                    text-right
                  "
                >
                  <p
                    className="
                      m-0
                      text-[8px]
                      text-[#94A3B8]
                    "
                  >
                    محاكاة الحالة:
                  </p>
                </div>

                <div
                  className="
                    min-w-[140px]
                    rounded-[7px]
                    border
                    border-[#BFDBFE]
                    bg-[#EFF6FF]
                    px-[10px]
                    py-[7px]
                    flex
                    items-center
                    justify-center
                    gap-[7px]
                    text-[9px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  <BadgeCheck
                    size={14}
                  />

                  الشهادة معتمدة وجاهزة
                </div>
              </div>
            </section>

            {/* =====================================
                CERTIFICATE
            ====================================== */}
            <section
              className="
                mt-[24px]
                rounded-[16px]
                border-[2px]
                border-[#0B4DBB]
                bg-white
                px-[44px]
                py-[44px]
                relative
                overflow-hidden
                shadow-[0_2px_4px_rgba(15,23,42,0.03)]
              "
            >
              {/* Background watermark */}
              <div
                className="
                  absolute
                  left-1/2
                  top-[53%]
                  -translate-x-1/2
                  -translate-y-1/2
                  opacity-[0.035]
                  pointer-events-none
                "
              >
                <GraduationCap
                  size={320}
                  strokeWidth={0.9}
                  className="
                    text-[#09379A]
                  "
                />
              </div>

              <div
                className="
                  relative
                  z-10
                  text-center
                "
              >
                {/* College */}
                <h2
                  className="
                    m-0
                    text-[27px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  كلية الدراسات المتوسطة - الأزهر
                </h2>

                <p
                  className="
                    m-0
                    mt-[5px]
                    text-[11px]
                    text-[#64748B]
                  "
                >
                  قسم التدريب الميداني والتطوير الأكاديمي
                </p>

                {/* Certificate title */}
                <h3
                  className="
                    m-0
                    mt-[34px]
                    text-[38px]
                    leading-[48px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  شهادة إتمام تدريب
                </h3>

                <p
                  className="
                    m-0
                    mt-[16px]
                    text-[13px]
                    text-[#64748B]
                  "
                >
                  تمنح هذه الشهادة للطالبة
                </p>

                {/* Student Name */}
                <div
                  className="
                    mt-[8px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      min-w-[200px]
                      border-b
                      border-[#BFDBFE]
                      pb-[4px]
                    "
                  >
                    <strong
                      className="
                        text-[31px]
                        leading-[38px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      {certificate.studentName}
                    </strong>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="
                    m-0
                    mt-[26px]
                    max-w-[690px]
                    mx-auto
                    text-[12px]
                    leading-[24px]
                    text-[#475569]
                  "
                >
                  وذلك لإتمامها برنامج التدريب الميداني
                  المعتمد في{" "}

                  <strong
                    className="
                      text-[#1E293B]
                    "
                  >
                    {certificate.organization}
                  </strong>

                  {" "}
                  خلال الفترة من{" "}

                  <strong
                    dir="ltr"
                    className="
                      inline-block
                      text-[#1E293B]
                    "
                  >
                    {certificate.startDate}
                  </strong>

                  {" "}
                  إلى{" "}

                  <strong
                    dir="ltr"
                    className="
                      inline-block
                      text-[#1E293B]
                    "
                  >
                    {certificate.endDate}
                  </strong>

                  ، بمجموع ساعات تدريبية معتمدة{" "}

                  <strong
                    className="
                      text-[#1E293B]
                    "
                  >
                    ({certificate.hours}) ساعة
                  </strong>
                  .
                </p>

                {/* Document Details */}
                <div
                  className="
                    mt-[30px]
                    max-w-[760px]
                    mx-auto
                    min-h-[52px]
                    rounded-[9px]
                    border
                    border-[#E2E8F0]
                    bg-[#F8FAFC]
                    px-[16px]
                    py-[10px]
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-[10px]
                    items-center
                  "
                >
                  <CertificateMeta
                    label="رقم الوثيقة"
                    value={
                      certificate.documentNumber
                    }
                  />

                  <CertificateMeta
                    label="تاريخ الإصدار"
                    value={
                      certificate.issueDate
                    }
                  />

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-[7px]
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      التقدير العام:
                    </span>

                    <span
                      className="
                        h-[25px]
                        px-[9px]
                        rounded-[6px]
                        border
                        border-[#A7E6C4]
                        bg-[#ECFDF5]
                        text-[#047857]
                        flex
                        items-center
                        text-[9px]
                        font-bold
                      "
                    >
                      {certificate.grade}
                      {" "}
                      (
                      {certificate.finalScore}
                      /
                      {certificate.maxScore}
                      )
                    </span>
                  </div>
                </div>

                {/* Bottom Certificate Info */}
                <div
                  className="
                    mt-[48px]
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-[30px]
                    items-end
                  "
                >
                  {/* QR */}
                  <div
                    className="
                      flex
                      justify-center
                      md:justify-start
                    "
                  >
                    <div>
                      <div
                        className="
                          w-[82px]
                          h-[82px]
                          rounded-[8px]
                          border
                          border-[#CBD5E1]
                          bg-white
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FakeQRCode />
                      </div>

                      <p
                        className="
                          m-0
                          mt-[7px]
                          text-[8px]
                          text-[#64748B]
                        "
                      >
                        التحقق من صحة الشهادة
                      </p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div
                    className="
                      flex
                      justify-center
                      md:justify-end
                    "
                  >
                    <div
                      className="
                        text-center
                        min-w-[190px]
                      "
                    >
                      <p
                        className="
                          m-0
                          text-[9px]
                          text-[#64748B]
                        "
                      >
                        {certificate.signerTitle}
                      </p>

                      <div
                        className="
                          mt-[14px]
                          h-[38px]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <span
                          className="
                            text-[29px]
                            italic
                            font-serif
                            text-[#09379A]
                            rotate-[-7deg]
                          "
                        >
                          مـحـمـد
                        </span>
                      </div>

                      <strong
                        className="
                          block
                          mt-[4px]
                          text-[11px]
                          text-[#1E293B]
                        "
                      >
                        {certificate.signer}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================
                ACTION BUTTONS
            ====================================== */}
            <section
              className="
                mt-[24px]
                flex
                flex-wrap
                items-center
                justify-center
                gap-[12px]
              "
            >
              <button
                type="button"
                onClick={
                  handleShareCertificate
                }
                className="
                  h-[44px]
                  px-[20px]
                  rounded-[8px]
                  border-0
                  bg-[#FF6B35]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[11px]
                  font-bold
                  cursor-pointer
                  shadow-[0_3px_8px_rgba(255,107,53,0.16)]
                  transition
                  hover:bg-[#EA5A28]
                "
              >
                <Share2
                  size={16}
                  strokeWidth={1.8}
                />

                {copied
                  ? "تم نسخ الرابط"
                  : "مشاركة الشهادة"}
              </button>

              <button
                type="button"
                onClick={
                  handleDownloadCertificate
                }
                className="
                  h-[44px]
                  px-[20px]
                  rounded-[8px]
                  border
                  border-[#D5DFEA]
                  bg-white
                  text-[#1E293B]
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[11px]
                  font-bold
                  cursor-pointer
                  transition
                  hover:bg-[#F8FAFC]
                  hover:border-[#B7C8DA]
                "
              >
                <Download
                  size={16}
                  strokeWidth={1.8}
                  className="
                    text-[#09379A]
                  "
                />

                تحميل الشهادة (PDF)
              </button>
            </section>

            {/* =====================================
                VALIDITY NOTICE
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[56px]
                rounded-[11px]
                border
                border-[#DDE5EF]
                bg-white
                px-[18px]
                py-[13px]
                flex
                flex-wrap
                items-center
                justify-between
                gap-[15px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[9px]
                "
              >
                <ShieldCheck
                  size={17}
                  className="
                    text-[#09379A]
                    shrink-0
                  "
                />

                <p
                  className="
                    m-0
                    text-[9px]
                    leading-[17px]
                    text-[#64748B]
                  "
                >
                  هذه الوثيقة مشفرة رقميا ومسجلة في
                  السجل الأكاديمي المركزي بجامعة الأزهر
                  تحت كود الاعتماد المباشر.
                </p>
              </div>

              <div
                className="
                  h-[25px]
                  px-[10px]
                  rounded-[12px]
                  border
                  border-[#A7E6C4]
                  bg-[#ECFDF5]
                  text-[#047857]
                  flex
                  items-center
                  gap-[6px]
                  text-[8px]
                  font-bold
                "
              >
                <span
                  className="
                    w-[6px]
                    h-[6px]
                    rounded-full
                    bg-[#10B981]
                  "
                />

                شهادة سارية ومعتمدة
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   CERTIFICATE META
========================================================= */

function CertificateMeta({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-[6px]
      "
    >
      <span
        className="
          text-[8px]
          text-[#94A3B8]
        "
      >
        {label}:
      </span>

      <strong
        dir="ltr"
        className="
          text-[9px]
          text-[#1E293B]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   SIMPLE FRONTEND QR PLACEHOLDER
   Replace later with a real QR generated from certificate ID
========================================================= */

function FakeQRCode() {
  const cells = [
    1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 1, 0,
    1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 1, 1, 0, 1,
    0, 1, 0, 0, 1, 1, 0,
    1, 0, 1, 1, 0, 1, 1,
  ];

  return (
    <div
      dir="ltr"
      className="
        grid
        grid-cols-7
        gap-[2px]
        w-[56px]
        h-[56px]
      "
    >
      {cells.map((cell, index) => (
        <span
          key={index}
          className={`
            rounded-[1px]

            ${
              cell
                ? "bg-[#1E293B]"
                : "bg-transparent"
            }
          `}
        />
      ))}
    </div>
  );
}