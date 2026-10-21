import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "أمل أحمد ضياء أبو زيد",
    studentId: "20231234",
    major: "تقنية المعلومات (Information Technology)",
    academicYear: "السنة الثالثة (مستوفية للشروط)",
    phone: "0599123456",
    email: "amal@example.com",
    motivation:
      "أرغب في تعزيز مهاراتي العملية واكتساب الخبرة في مجال تقنية المعلومات.",
  });

  const [errors, setErrors] = useState({});

  const maxMotivationLength = 500;

  const steps = [
    {
      number: 1,
      title: "البيانات الأساسية",
      subtitle: "الخطوة الحالية",
      active: true,
    },
    {
      number: 2,
      title: "المستندات",
      subtitle: "المرفقات والشهادات",
      active: false,
    },
    {
      number: 3,
      title: "تأكيد الطلب",
      subtitle: "المراجعة والإرسال",
      active: false,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "motivation" &&
      value.length > maxMotivationLength
    ) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.major.trim()) {
      newErrors.major = "يرجى اختيار التخصص الدراسي";
    }

    if (!formData.academicYear.trim()) {
      newErrors.academicYear = "يرجى اختيار السنة الدراسية";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = "يرجى إدخال رقم هاتف صحيح";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = "يرجى كتابة سبب التقديم";
    } else if (formData.motivation.trim().length < 20) {
      newErrors.motivation =
        "يرجى كتابة سبب أوضح للتقديم";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    navigate("/student/apply-training/documents");
  };

  const handleCancel = () => {
    navigate("/student/opportunities/details");
  };

  return (
    <div
      dir="rtl"
      className="
        h-screen
        w-full
        flex
        overflow-hidden
        bg-white
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
          bg-white
        "
      >
        {/* HEADER */}
        <div className="relative shrink-0">
          <Header />

          {/* Breadcrumb */}
          <div
            className="
              absolute
              top-0
              right-[40px]
              h-[72px]
              flex
              items-center
              gap-[8px]
              text-[13px]
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
                font-medium
                cursor-pointer
              "
            >
              الرئيسية
            </button>

            <span className="text-[#94A3B8]">›</span>

            <button
              type="button"
              onClick={() =>
                navigate("/student/opportunities")
              }
              className="
                border-0
                bg-transparent
                p-0
                text-[#09379A]
                font-bold
                cursor-pointer
              "
            >
              فرص التدريب
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[28px]
            pb-[40px]
          "
        >
          <div className="w-full max-w-[1080px] mx-auto">
            {/* =====================================
                PAGE TITLE
            ====================================== */}
            <section
              className="
                flex
                items-start
                justify-between
                gap-[20px]
              "
            >
              <div className="text-right">
                <h1
                  className="
                    m-0
                    text-[28px]
                    leading-[40px]
                    font-bold
                    text-[#14213D]
                  "
                >
                  استمارة التقديم على التدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[14px]
                    leading-[22px]
                    font-normal
                    text-[#64748B]
                  "
                >
                  يرجى تعبئة البيانات التالية للتقديم على
                  فرصة التدريب الميداني
                </p>
              </div>

              <div
                className="
                  h-[28px]
                  px-[12px]
                  rounded-[14px]
                  border
                  border-[#B8D0FF]
                  bg-[#EFF5FF]
                  flex
                  items-center
                  gap-[7px]
                  text-[11px]
                  font-bold
                  text-[#09379A]
                  whitespace-nowrap
                "
              >
                <span
                  className="
                    w-[7px]
                    h-[7px]
                    rounded-full
                    bg-[#2563EB]
                  "
                />

                التقديم الأكاديمي المباشر - الفصل الدراسي
                الثاني 2024/2025
              </div>
            </section>

            {/* =====================================
                STEPPER
            ====================================== */}
            <section className="mt-[38px]">
              <div className="relative">
                <div
                  className="
                    absolute
                    top-[19px]
                    right-[17%]
                    left-[17%]
                    h-[4px]
                    rounded-full
                    bg-[#E2E8F0]
                  "
                />

                <div
                  className="
                    relative
                    grid
                    grid-cols-3
                    items-start
                  "
                >
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className="
                        flex
                        flex-col
                        items-center
                        text-center
                      "
                    >
                      <div
                        className={`
                          w-[40px]
                          h-[40px]
                          rounded-full
                          border-[2px]
                          flex
                          items-center
                          justify-center
                          text-[14px]
                          font-bold
                          relative
                          z-10

                          ${
                            step.active
                              ? `
                                border-[#D5E3FF]
                                bg-[#09379A]
                                text-white
                                shadow-[0_0_0_4px_#EDF3FF]
                              `
                              : `
                                border-[#CBD5E1]
                                bg-white
                                text-[#94A3B8]
                              `
                          }
                        `}
                      >
                        {step.number}
                      </div>

                      <h3
                        className={`
                          m-0
                          mt-[8px]
                          text-[13px]
                          leading-[20px]
                          font-bold

                          ${
                            step.active
                              ? "text-[#09379A]"
                              : "text-[#64748B]"
                          }
                        `}
                      >
                        {step.title}
                      </h3>

                      <span
                        className="
                          mt-[1px]
                          text-[10px]
                          leading-[15px]
                          text-[#94A3B8]
                        "
                      >
                        {step.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =====================================
                MAIN FORM CARD
            ====================================== */}
            <section
              className="
                mt-[14px]
                w-full
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[28px]
                py-[26px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              {/* Card Header */}
              <div
                className="
                  pb-[20px]
                  border-b
                  border-[#E2E8F0]
                  flex
                  items-start
                  justify-between
                  gap-[20px]
                "
              >
                <div className="flex items-start gap-[12px]">
                  <div
                    className="
                      w-[38px]
                      h-[38px]
                      shrink-0
                      rounded-[8px]
                      bg-[#EEF3FF]
                      flex
                      items-center
                      justify-center
                      text-[#09379A]
                    "
                  >
                    <ClipboardList
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        m-0
                        text-[18px]
                        leading-[26px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      البيانات الأساسية
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[11px]
                        leading-[18px]
                        text-[#64748B]
                      "
                    >
                      البيانات المسترجعة من عمادة القبول
                      والتسجيل مع التحقق الميداني
                    </p>
                  </div>
                </div>

                <div
                  className="
                    h-[28px]
                    px-[10px]
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-[#F8FAFC]
                    flex
                    items-center
                    gap-[6px]
                    text-[10px]
                    text-[#64748B]
                    whitespace-nowrap
                  "
                >
                  <LockKeyhole
                    size={13}
                    strokeWidth={1.7}
                  />

                  الحقول الموثقة مسترجعة تلقائيا
                </div>
              </div>

              {/* =================================
                  FORM GRID
              ================================== */}
              <div
                className="
                  mt-[24px]
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-x-[24px]
                  gap-y-[22px]
                "
              >
                {/* Full Name */}
                <div>
                  <div
                    className="
                      mb-[6px]
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <label
                      className="
                        text-[12px]
                        font-bold
                        text-[#334155]
                      "
                    >
                      الاسم الرباعي
                    </label>

                    <span
                      className="
                        h-[22px]
                        px-[8px]
                        rounded-[6px]
                        bg-[#E7F8EE]
                        text-[#16844C]
                        flex
                        items-center
                        gap-[4px]
                        text-[10px]
                        font-medium
                      "
                    >
                      <Check size={12} />
                      موثق
                    </span>
                  </div>

                  <div
                    className="
                      h-[42px]
                      rounded-[7px]
                      border
                      border-[#D9E2EC]
                      bg-[#F8FAFC]
                      px-[12px]
                      flex
                      items-center
                    "
                  >
                    <UserRound
                      size={16}
                      className="
                        ml-[9px]
                        shrink-0
                        text-[#94A3B8]
                      "
                    />

                    <input
                      type="text"
                      value={formData.fullName}
                      readOnly
                      className="
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[12px]
                        font-medium
                        text-[#475569]
                      "
                    />
                  </div>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[9px]
                      leading-[15px]
                      text-[#94A3B8]
                    "
                  >
                    تم التحقق من تطابق الاسم مع السجل
                    المدني الأكاديمي
                  </p>
                </div>

                {/* Student ID */}
                <div>
                  <div
                    className="
                      mb-[6px]
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <label
                      className="
                        text-[12px]
                        font-bold
                        text-[#334155]
                      "
                    >
                      رقم الطالب
                    </label>

                    <span
                      className="
                        h-[22px]
                        px-[8px]
                        rounded-[6px]
                        bg-[#F1F5F9]
                        text-[#64748B]
                        flex
                        items-center
                        gap-[4px]
                        text-[10px]
                      "
                    >
                      <LockKeyhole size={11} />
                      بيان رسمي
                    </span>
                  </div>

                  <div
                    className="
                      h-[42px]
                      rounded-[7px]
                      border
                      border-[#D9E2EC]
                      bg-[#F8FAFC]
                      px-[12px]
                      flex
                      items-center
                    "
                  >
                    <span
                      className="
                        ml-[8px]
                        text-[#94A3B8]
                        font-bold
                      "
                    >
                      #
                    </span>

                    <input
                      type="text"
                      value={formData.studentId}
                      readOnly
                      dir="ltr"
                      className="
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[12px]
                        font-bold
                        text-[#475569]
                        text-right
                      "
                    />
                  </div>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[9px]
                      leading-[15px]
                      text-[#94A3B8]
                    "
                  >
                    الرقم الجامعي المعتمد لدى كلية الدراسات
                    المتوسطة.
                  </p>
                </div>

                {/* Major */}
                <div>
                  <label
                    className="
                      mb-[6px]
                      block
                      text-[12px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    التخصص الدراسي
                    <span className="text-[#DC2626]">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className={`
                        w-full
                        h-[42px]
                        appearance-none
                        rounded-[7px]
                        border
                        bg-white
                        px-[12px]
                        pl-[36px]
                        outline-none
                        font-['Cairo']
                        text-[12px]
                        text-[#334155]
                        transition

                        ${
                          errors.major
                            ? "border-[#DC2626]"
                            : "border-[#D9E2EC] focus:border-[#09379A] focus:ring-2 focus:ring-[#09379A]/10"
                        }
                      `}
                    >
                      <option value="تقنية المعلومات (Information Technology)">
                        تقنية المعلومات (Information Technology)
                      </option>

                      <option value="إدارة الأعمال">
                        إدارة الأعمال
                      </option>

                      <option value="الوسائط المتعددة">
                        الوسائط المتعددة
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        left-[12px]
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#64748B]
                      "
                    />
                  </div>

                  {errors.major ? (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#DC2626]
                      "
                    >
                      {errors.major}
                    </p>
                  ) : (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      التخصص المسجل في الخطة التدريبية
                      المعتمدة
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="
                      mb-[6px]
                      block
                      text-[12px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    رقم الهاتف للتواصل
                    <span className="text-[#DC2626]">
                      {" "}
                      *
                    </span>
                  </label>

                  <div
                    className={`
                      h-[42px]
                      rounded-[7px]
                      border
                      bg-white
                      px-[12px]
                      flex
                      items-center
                      transition

                      ${
                        errors.phone
                          ? "border-[#DC2626]"
                          : "border-[#D9E2EC] focus-within:border-[#09379A] focus-within:ring-2 focus-within:ring-[#09379A]/10"
                      }
                    `}
                  >
                    <Phone
                      size={16}
                      className="
                        ml-[9px]
                        shrink-0
                        text-[#94A3B8]
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      dir="ltr"
                      className="
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[12px]
                        text-[#334155]
                        text-right
                      "
                    />
                  </div>

                  {errors.phone ? (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#DC2626]
                      "
                    >
                      {errors.phone}
                    </p>
                  ) : (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      سيتم إرسال إشعار الترشيح والتعليمات عبر
                      رسائل SMS.
                    </p>
                  )}
                </div>

                {/* Academic Year */}
                <div>
                  <label
                    className="
                      mb-[6px]
                      block
                      text-[12px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    السنة الدراسية
                    <span className="text-[#DC2626]">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      className={`
                        w-full
                        h-[42px]
                        appearance-none
                        rounded-[7px]
                        border
                        bg-white
                        px-[12px]
                        pl-[36px]
                        outline-none
                        font-['Cairo']
                        text-[12px]
                        text-[#334155]

                        ${
                          errors.academicYear
                            ? "border-[#DC2626]"
                            : "border-[#D9E2EC] focus:border-[#09379A] focus:ring-2 focus:ring-[#09379A]/10"
                        }
                      `}
                    >
                      <option value="السنة الثالثة (مستوفية للشروط)">
                        السنة الثالثة (مستوفية للشروط)
                      </option>

                      <option value="السنة الثانية">
                        السنة الثانية
                      </option>

                      <option value="السنة الرابعة">
                        السنة الرابعة
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        left-[12px]
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#64748B]
                      "
                    />
                  </div>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    يشترط إنهاء ما لا يقل عن 60 ساعة معتمدة
                    للتدريب.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="
                      mb-[6px]
                      block
                      text-[12px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    البريد الإلكتروني
                    <span className="text-[#DC2626]">
                      {" "}
                      *
                    </span>
                  </label>

                  <div
                    className={`
                      h-[42px]
                      rounded-[7px]
                      border
                      bg-white
                      px-[12px]
                      flex
                      items-center

                      ${
                        errors.email
                          ? "border-[#DC2626]"
                          : "border-[#D9E2EC] focus-within:border-[#09379A] focus-within:ring-2 focus-within:ring-[#09379A]/10"
                      }
                    `}
                  >
                    <Mail
                      size={16}
                      className="
                        ml-[9px]
                        shrink-0
                        text-[#94A3B8]
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      dir="ltr"
                      className="
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        font-['Cairo']
                        text-[12px]
                        text-[#334155]
                        text-right
                      "
                    />
                  </div>

                  {errors.email ? (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#DC2626]
                      "
                    >
                      {errors.email}
                    </p>
                  ) : (
                    <p
                      className="
                        m-0
                        mt-[5px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      لتلقي خطابات التنسيب الأكاديمي والتحديثات
                      الرسمية.
                    </p>
                  )}
                </div>
              </div>

              {/* =================================
                  MOTIVATION
              ================================== */}
              <div className="mt-[24px]">
                <label
                  className="
                    mb-[6px]
                    block
                    text-[12px]
                    font-bold
                    text-[#334155]
                  "
                >
                  سبب التقديم والهدف من التدريب
                  <span className="text-[#DC2626]">
                    {" "}
                    *
                  </span>
                </label>

                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className={`
                    w-full
                    min-h-[82px]
                    resize-none
                    rounded-[7px]
                    border
                    bg-white
                    px-[14px]
                    py-[11px]
                    outline-none
                    font-['Cairo']
                    text-[12px]
                    leading-[22px]
                    text-[#334155]

                    ${
                      errors.motivation
                        ? "border-[#DC2626]"
                        : "border-[#D9E2EC] focus:border-[#09379A] focus:ring-2 focus:ring-[#09379A]/10"
                    }
                  `}
                />

                <div
                  className="
                    mt-[5px]
                    flex
                    items-center
                    justify-between
                  "
                >
                  {errors.motivation ? (
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#DC2626]
                      "
                    >
                      {errors.motivation}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span
                    dir="ltr"
                    className="
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {formData.motivation.length} /{" "}
                    {maxMotivationLength} حرف
                  </span>
                </div>
              </div>

              {/* =================================
                  ACTIONS
              ================================== */}
              <div
                className="
                  mt-[22px]
                  pt-[20px]
                  border-t
                  border-[#E2E8F0]
                  flex
                  items-center
                  justify-between
                  gap-[16px]
                "
              >
                <button
                  type="button"
                  onClick={handleNext}
                  className="
                    min-w-[180px]
                    h-[44px]
                    px-[18px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    text-[13px]
                    font-bold
                    shadow-[0_3px_7px_rgba(9,55,154,0.18)]
                    cursor-pointer
                    transition
                    hover:bg-[#072E81]
                  "
                >
                  <span>التالي: رفع المستندات</span>

                  <ArrowLeft
                    size={17}
                    strokeWidth={1.8}
                  />
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="
                    h-[38px]
                    px-[15px]
                    rounded-[7px]
                    border
                    border-[#B9D0FF]
                    bg-white
                    text-[#2563EB]
                    flex
                    items-center
                    justify-center
                    gap-[7px]
                    text-[12px]
                    font-bold
                    cursor-pointer
                    transition
                    hover:bg-[#F5F8FF]
                  "
                >
                  <span>إلغاء والعودة للفرصة</span>

                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}