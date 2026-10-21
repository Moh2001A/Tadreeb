import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function FinishTraining() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] =
    useState("confirmation");

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  const trainingSummary = {
    organization:
      "شركة القدس للاتصالات والتكنولوجيا",

    period:
      "2025/10/01 - 2025/12/01",

    hours: 120,

    finalEvaluation: 4.5,

    academicSupervisor:
      "د. محمد السالم",

    fieldSupervisor:
      "م. رامي أحمد",

    semester:
      "دبلوم خريف 2025",
  };

  const steps = [
    {
      id: "review",
      title: "مراجعة الملفات",
      subtitle: "مكتمل",
    },
    {
      id: "confirmation",
      title: "التأكيد النهائي",
      subtitle: "الخطوة الحالية",
    },
    {
      id: "certificate",
      title: "إصدار الشهادة",
      subtitle: "قيد الانتظار",
    },
  ];

  const handleFinalConfirmation = () => {
    setShowConfirmModal(false);
    setCurrentStep("certificate");
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
            SCROLLABLE CONTENT
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
                  navigate("/student/dashboard")
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

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                إنهاء التدريب
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
              <div>
                <h1
                  className="
                    m-0
                    text-[30px]
                    leading-[42px]
                    font-bold
                    text-[#14213D]
                  "
                >
                  إنهاء التدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[12px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  الخطوة الإجرائية الختامية لإغلاق
                  السجل التدريبي وطلب الشهادة الرسمية
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-[10px]
                "
              >
                <button
                  type="button"
                  className="
                    h-[38px]
                    px-[14px]
                    rounded-[8px]
                    border
                    border-[#D9E2EC]
                    bg-white
                    text-[#475569]
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    hover:bg-[#F8FAFC]
                  "
                >
                  معاينة حالة التقديم
                </button>

                <button
                  type="button"
                  className="
                    h-[38px]
                    px-[14px]
                    rounded-[8px]
                    border
                    border-[#BFDBFE]
                    bg-[#F8FBFF]
                    text-[#09379A]
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    hover:bg-[#EEF4FF]
                  "
                >
                  تعديل أو إلغاء الطلب
                </button>
              </div>
            </section>

            {/* =====================================
                STEPPER
            ====================================== */}
            <section
              className="
                mt-[24px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[32px]
                py-[24px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  grid
                  grid-cols-[1fr_auto_1fr_auto_1fr]
                  items-start
                  gap-[14px]
                "
              >
                {/* STEP 1 */}
                <StepItem
                  status={
                    currentStep === "review"
                      ? "current"
                      : "done"
                  }
                  number={1}
                  title="مراجعة الملفات"
                  subtitle="مكتمل"
                />

                <StepLine active />

                {/* STEP 2 */}
                <StepItem
                  status={
                    currentStep === "confirmation"
                      ? "current"
                      : currentStep === "certificate"
                      ? "done"
                      : "upcoming"
                  }
                  number={2}
                  title="التأكيد النهائي"
                  subtitle={
                    currentStep === "confirmation"
                      ? "الخطوة الحالية"
                      : "مكتمل"
                  }
                />

                <StepLine
                  active={
                    currentStep === "certificate"
                  }
                />

                {/* STEP 3 */}
                <StepItem
                  status={
                    currentStep === "certificate"
                      ? "current"
                      : "upcoming"
                  }
                  number={3}
                  title="إصدار الشهادة"
                  subtitle={
                    currentStep === "certificate"
                      ? "قيد المعالجة"
                      : "قيد الانتظار"
                  }
                />
              </div>
            </section>

            {/* =====================================
                SUCCESS / CONFIRMATION CARD
            ====================================== */}
            <section
              className="
                mt-[24px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[24px]
                py-[30px]
                text-center
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  w-[58px]
                  h-[58px]
                  mx-auto
                  rounded-full
                  bg-[#E8FFF5]
                  text-[#10B981]
                  flex
                  items-center
                  justify-center
                  ring-[8px]
                  ring-[#F1FFF8]
                "
              >
                <Check
                  size={29}
                  strokeWidth={2.4}
                />
              </div>

              <h2
                className="
                  m-0
                  mt-[24px]
                  text-[22px]
                  font-bold
                  text-[#14213D]
                "
              >
                تم استكمال جميع متطلبات التدريب بنجاح
              </h2>

              <p
                className="
                  m-0
                  mt-[6px]
                  text-[11px]
                  leading-[20px]
                  text-[#64748B]
                "
              >
                يمكنك الآن إنهاء التدريب وإصدار الشهادة
                بعد اعتماد المشرفين الأكاديمي والميداني
              </p>

              <div
                className="
                  mt-[24px]
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-[10px]
                "
              >
                <CompletionBadge>
                  ساعات التدريب: 120/120 ساعة
                </CompletionBadge>

                <CompletionBadge>
                  التقييم الأكاديمي: معتمد
                </CompletionBadge>

                <CompletionBadge>
                  الفترة التدريبية: مكتملة بالكامل (10/10)
                </CompletionBadge>
              </div>
            </section>

            {/* =====================================
                TRAINING SUMMARY
            ====================================== */}
            <section
              className="
                mt-[24px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[22px]
                py-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-[15px]
                  pb-[15px]
                  border-b
                  border-[#EEF2F7]
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
                      w-[30px]
                      h-[30px]
                      rounded-[7px]
                      bg-[#EEF4FF]
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FileText
                      size={15}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h2
                    className="
                      m-0
                      text-[16px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    ملخص التدريب المكتمل
                  </h2>
                </div>

                <span
                  className="
                    h-[23px]
                    px-[9px]
                    rounded-[11px]
                    bg-[#EEF4FF]
                    text-[#09379A]
                    flex
                    items-center
                    text-[8px]
                    font-bold
                  "
                >
                  {trainingSummary.semester}
                </span>
              </div>

              {/* Grid */}
              <div
                className="
                  mt-[18px]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-[14px]
                "
              >
                <SummaryItem
                  icon={Building2}
                  label="جهة التدريب"
                  value={trainingSummary.organization}
                />

                <SummaryItem
                  icon={CalendarDays}
                  label="الفترة الزمنية"
                  value={trainingSummary.period}
                />

                <SummaryItem
                  icon={Star}
                  label="التقييم النهائي التراكمي"
                  value={`${trainingSummary.finalEvaluation} / 5.0`}
                  badge="ممتاز"
                  accent="yellow"
                />

                <SummaryItem
                  icon={Clock3}
                  label="عدد الساعات المنجزة"
                  value={`${trainingSummary.hours} ساعة معتمدة`}
                />
              </div>

              {/* Supervisors */}
              <div
                className="
                  mt-[16px]
                  pt-[14px]
                  border-t
                  border-[#EEF2F7]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-[12px]
                  text-[9px]
                  text-[#64748B]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[7px]
                  "
                >
                  <ShieldCheck
                    size={14}
                    className="text-[#09379A]"
                  />

                  <span>
                    المشرف الأكاديمي:
                    <strong
                      className="
                        mr-[4px]
                        text-[#334155]
                      "
                    >
                      {trainingSummary.academicSupervisor}
                    </strong>
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-[7px]
                  "
                >
                  <Building2
                    size={14}
                    className="text-[#64748B]"
                  />

                  <span>
                    مشرف جهة التدريب:
                    <strong
                      className="
                        mr-[4px]
                        text-[#334155]
                      "
                    >
                      {trainingSummary.fieldSupervisor}
                    </strong>
                  </span>
                </div>
              </div>
            </section>

            {/* =====================================
                FINAL ACTION
            ====================================== */}
            {currentStep === "confirmation" && (
              <section
                className="
                  mt-[22px]
                  flex
                  items-center
                  justify-end
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmModal(true)
                  }
                  className="
                    h-[44px]
                    px-[20px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    text-[11px]
                    font-bold
                    cursor-pointer
                    shadow-[0_3px_8px_rgba(9,55,154,0.16)]
                    transition
                    hover:bg-[#072E81]
                  "
                >
                  <CheckCircle2
                    size={16}
                    strokeWidth={2}
                  />

                  تأكيد إنهاء التدريب
                </button>
              </section>
            )}

            {/* =====================================
                CERTIFICATE PROCESSING STATE
            ====================================== */}
            {currentStep === "certificate" && (
              <section
                className="
                  mt-[22px]
                  rounded-[12px]
                  border
                  border-[#BFDBFE]
                  bg-[#F8FBFF]
                  px-[18px]
                  py-[16px]
                  flex
                  items-start
                  gap-[11px]
                "
              >
                <div
                  className="
                    w-[34px]
                    h-[34px]
                    rounded-[8px]
                    bg-[#EEF4FF]
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <GraduationCap
                    size={18}
                  />
                </div>

                <div>
                  <h3
                    className="
                      m-0
                      text-[12px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    تم إنهاء التدريب بنجاح
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      text-[9px]
                      leading-[17px]
                      text-[#64748B]
                    "
                  >
                    تم إغلاق السجل التدريبي وإرسال طلب إصدار
                    الشهادة. يمكنك متابعة حالة الشهادة من صفحة
                    الشهادة.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/student/certificate")
                    }
                    className="
                      mt-[11px]
                      h-[36px]
                      px-[14px]
                      rounded-[7px]
                      border-0
                      bg-[#09379A]
                      text-white
                      text-[9px]
                      font-bold
                      cursor-pointer
                      hover:bg-[#072E81]
                    "
                  >
                    متابعة حالة الشهادة
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* =========================================
          CONFIRMATION MODAL
      ========================================== */}
      {showConfirmModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#0F172A]/40
            backdrop-blur-[2px]
            flex
            items-center
            justify-center
            px-[20px]
          "
          onClick={() =>
            setShowConfirmModal(false)
          }
        >
          <div
            dir="rtl"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              w-full
              max-w-[440px]
              rounded-[16px]
              border
              border-[#E2E8F0]
              bg-white
              p-[22px]
              shadow-[0_20px_60px_rgba(15,23,42,0.18)]
            "
          >
            <div
              className="
                w-[42px]
                h-[42px]
                rounded-[10px]
                bg-[#EEF4FF]
                text-[#09379A]
                flex
                items-center
                justify-center
              "
            >
              <FileCheck2
                size={21}
              />
            </div>

            <h3
              className="
                m-0
                mt-[14px]
                text-[17px]
                font-bold
                text-[#1E293B]
              "
            >
              تأكيد إنهاء التدريب
            </h3>

            <p
              className="
                m-0
                mt-[6px]
                text-[10px]
                leading-[19px]
                text-[#64748B]
              "
            >
              بعد تأكيد إنهاء التدريب سيتم إغلاق السجل
              التدريبي وإرسال طلب إصدار الشهادة الرسمية.
            </p>

            <div
              className="
                mt-[16px]
                rounded-[9px]
                border
                border-[#F6D58A]
                bg-[#FFFBEB]
                px-[13px]
                py-[11px]
                text-[9px]
                leading-[17px]
                text-[#92400E]
              "
            >
              تأكد من صحة جميع البيانات والتقييمات قبل
              المتابعة، لأن بعض البيانات قد تصبح غير قابلة
              للتعديل بعد الإنهاء النهائي.
            </div>

            <div
              className="
                mt-[20px]
                flex
                items-center
                justify-end
                gap-[9px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowConfirmModal(false)
                }
                className="
                  h-[40px]
                  px-[16px]
                  rounded-[8px]
                  border
                  border-[#D9E2EC]
                  bg-white
                  text-[#475569]
                  text-[10px]
                  font-bold
                  cursor-pointer
                  hover:bg-[#F8FAFC]
                "
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleFinalConfirmation}
                className="
                  h-[40px]
                  px-[17px]
                  rounded-[8px]
                  border-0
                  bg-[#09379A]
                  text-white
                  flex
                  items-center
                  gap-[7px]
                  text-[10px]
                  font-bold
                  cursor-pointer
                  transition
                  hover:bg-[#072E81]
                "
              >
                <Check
                  size={14}
                  strokeWidth={2}
                />

                تأكيد الإنهاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STEP ITEM
========================================================= */

function StepItem({
  status,
  number,
  title,
  subtitle,
}) {
  const isDone =
    status === "done";

  const isCurrent =
    status === "current";

  return (
    <div
      className="
        flex
        flex-col
        items-center
        text-center
        min-w-[140px]
      "
    >
      <div
        className={`
          w-[44px]
          h-[44px]
          rounded-full
          flex
          items-center
          justify-center
          border-[5px]

          ${
            isDone
              ? `
                bg-[#10B981]
                border-[#DDF9EE]
                text-white
              `
              : isCurrent
              ? `
                bg-[#09379A]
                border-[#E5ECFA]
                text-white
              `
              : `
                bg-[#F8FAFC]
                border-[#EEF2F7]
                text-[#94A3B8]
              `
          }
        `}
      >
        {isDone ? (
          <Check
            size={20}
            strokeWidth={2.2}
          />
        ) : (
          <span
            className="
              text-[12px]
              font-bold
            "
          >
            {number}
          </span>
        )}
      </div>

      <strong
        className={`
          mt-[8px]
          text-[11px]

          ${
            isCurrent
              ? "text-[#09379A]"
              : isDone
              ? "text-[#1E293B]"
              : "text-[#94A3B8]"
          }
        `}
      >
        {title}
      </strong>

      <span
        className={`
          mt-[2px]
          text-[8px]

          ${
            isDone
              ? "text-[#10B981]"
              : isCurrent
              ? "text-[#2563EB]"
              : "text-[#CBD5E1]"
          }
        `}
      >
        {subtitle}
      </span>
    </div>
  );
}

/* =========================================================
   STEP LINE
========================================================= */

function StepLine({
  active = false,
}) {
  return (
    <div
      className="
        pt-[21px]
        w-full
      "
    >
      <div
        className={`
          h-[2px]
          w-full
          rounded-full

          ${
            active
              ? "bg-[#10B981]"
              : "bg-[#E2E8F0]"
          }
        `}
      />
    </div>
  );
}

/* =========================================================
   COMPLETION BADGE
========================================================= */

function CompletionBadge({
  children,
}) {
  return (
    <div
      className="
        h-[28px]
        px-[12px]
        rounded-[14px]
        border
        border-[#B8EED5]
        bg-[#ECFDF5]
        text-[#047857]
        flex
        items-center
        gap-[6px]
        text-[9px]
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

      {children}
    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  icon: Icon,
  label,
  value,
  badge,
  accent,
}) {
  const isYellow =
    accent === "yellow";

  return (
    <div
      className="
        min-h-[70px]
        rounded-[9px]
        border
        border-[#E7ECF2]
        bg-[#F8FAFC]
        px-[14px]
        py-[12px]
        flex
        items-center
        justify-between
        gap-[12px]
      "
    >
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

        <div
          className="
            mt-[5px]
            flex
            items-center
            gap-[7px]
          "
        >
          <strong
            className="
              text-[10px]
              text-[#334155]
            "
          >
            {value}
          </strong>

          {badge && (
            <span
              className="
                h-[20px]
                px-[7px]
                rounded-[9px]
                bg-[#E9FFF4]
                text-[#16A34A]
                flex
                items-center
                text-[8px]
                font-bold
              "
            >
              {badge}
            </span>
          )}
        </div>
      </div>

      <div
        className={`
          w-[34px]
          h-[34px]
          rounded-[8px]
          flex
          items-center
          justify-center
          shrink-0

          ${
            isYellow
              ? `
                bg-[#FFF8E6]
                text-[#F59E0B]
              `
              : `
                bg-[#EEF4FF]
                text-[#09379A]
              `
          }
        `}
      >
        <Icon
          size={16}
          strokeWidth={1.8}
          fill={
            isYellow
              ? "#F59E0B"
              : "none"
          }
        />
      </div>
    </div>
  );
}