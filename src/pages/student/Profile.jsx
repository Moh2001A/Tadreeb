import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Edit3,
  IdCard,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName:
        "أمل أحمد صيام أبو زيد",

      studentId:
        "20231234",

      college:
        "كلية الدراسات المتوسطة",

      major:
        "تقنية المعلومات",

      email:
        "amal@example.com",

      phone:
        "0599123456",
    });

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleSave = () => {
    setIsEditing(false);

    console.log(
      "Saved profile data:",
      formData
    );
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
                الملف الشخصي
              </span>
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section
              className="
                mt-[6px]
              "
            >
              <h1
                className="
                  m-0
                  text-[30px]
                  leading-[42px]
                  font-bold
                  text-[#14213D]
                "
              >
                الملف الشخصي
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
                عرض بيانات الطالب الأكاديمية
                والشخصية المعتمدة
              </p>
            </section>

            {/* =====================================
                PROFILE HERO
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[220px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[24px]
                py-[26px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  relative
                "
              >
                <div
                  className="
                    w-[86px]
                    h-[86px]
                    rounded-full
                    border
                    border-[#DDE5EF]
                    bg-[#F8FAFC]
                    text-[#94A3B8]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <UserRound
                    size={42}
                    strokeWidth={1.5}
                  />
                </div>

                <div
                  className="
                    absolute
                    bottom-[2px]
                    left-[2px]
                    w-[24px]
                    h-[24px]
                    rounded-full
                    border-[3px]
                    border-white
                    bg-[#10B981]
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2
                    size={13}
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              <h2
                className="
                  m-0
                  mt-[14px]
                  text-[19px]
                  font-bold
                  text-[#1E293B]
                "
              >
                {formData.fullName}
              </h2>

              <div
                className="
                  mt-[10px]
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-[8px]
                "
              >
                <span
                  className="
                    h-[26px]
                    px-[10px]
                    rounded-[13px]
                    bg-[#F1F5F9]
                    text-[#64748B]
                    flex
                    items-center
                    gap-[6px]
                    text-[9px]
                  "
                >
                  الرقم الجامعي:

                  <strong
                    className="
                      text-[#334155]
                    "
                  >
                    {
                      formData.studentId
                    }
                  </strong>
                </span>

                <span
                  className="
                    h-[26px]
                    px-[10px]
                    rounded-[13px]
                    border
                    border-[#BAE6FD]
                    bg-[#EFFAFF]
                    text-[#0369A1]
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
                      bg-[#0EA5E9]
                    "
                  />

                  التخصص التقني:
                  {
                    formData.major
                  }
                </span>
              </div>
            </section>

            {/* =====================================
                BASIC INFORMATION
            ====================================== */}
            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[22px]
                py-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-[15px]
                  pb-[14px]
                  border-b
                  border-[#EEF2F7]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[9px]
                  "
                >
                  <div
                    className="
                      w-[31px]
                      h-[31px]
                      rounded-[7px]
                      bg-[#EEF4FF]
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <IdCard
                      size={16}
                    />
                  </div>

                  <h2
                    className="
                      m-0
                      text-[17px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    المعلومات الأساسية
                  </h2>
                </div>

                <span
                  className="
                    h-[23px]
                    px-[9px]
                    rounded-[6px]
                    bg-[#F1F5F9]
                    text-[#64748B]
                    flex
                    items-center
                    text-[8px]
                  "
                >
                  بيانات السجل الرسمي
                </span>
              </div>

              <div
                className="
                  mt-[18px]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-x-[38px]
                  gap-y-[22px]
                "
              >
                <ProfileField
                  label="الاسم الكامل"
                  value={
                    formData.fullName
                  }
                  name="fullName"
                  editable={
                    isEditing
                  }
                  onChange={
                    handleChange
                  }
                />

                <ProfileField
                  label="الرقم الجامعي"
                  value={
                    formData.studentId
                  }
                  icon={Lock}
                />

                <ProfileField
                  label="الكلية"
                  value={
                    formData.college
                  }
                />

                <ProfileField
                  label="التخصص / القسم"
                  value={
                    formData.major
                  }
                />

                <ProfileField
                  label="البريد الإلكتروني"
                  value={
                    formData.email
                  }
                  name="email"
                  editable={
                    isEditing
                  }
                  onChange={
                    handleChange
                  }
                  icon={Mail}
                  actionText={
                    !isEditing
                      ? "تعديل التواصل"
                      : null
                  }
                  onAction={() =>
                    setIsEditing(true)
                  }
                />

                <ProfileField
                  label="رقم الهاتف"
                  value={
                    formData.phone
                  }
                  name="phone"
                  editable={
                    isEditing
                  }
                  onChange={
                    handleChange
                  }
                  icon={Phone}
                  actionText={
                    !isEditing
                      ? "تعديل التواصل"
                      : null
                  }
                  onAction={() =>
                    setIsEditing(true)
                  }
                />
              </div>
            </section>

            {/* =====================================
                ACCOUNT INFORMATION
            ====================================== */}
            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[22px]
                py-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[9px]
                  pb-[14px]
                  border-b
                  border-[#EEF2F7]
                "
              >
                <div
                  className="
                    w-[31px]
                    h-[31px]
                    rounded-[7px]
                    bg-[#F2F0FF]
                    text-[#6366F1]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShieldCheck
                    size={16}
                  />
                </div>

                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  معلومات الحساب
                </h2>
              </div>

              <div
                className="
                  mt-[18px]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-[18px]
                  items-center
                "
              >
                <div>
                  <p
                    className="
                      m-0
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    حالة الحساب الأكاديمي
                  </p>

                  <div
                    className="
                      mt-[7px]
                      inline-flex
                      h-[30px]
                      px-[11px]
                      rounded-[7px]
                      border
                      border-[#A7E6C4]
                      bg-[#ECFDF5]
                      text-[#047857]
                      items-center
                      gap-[7px]
                      text-[9px]
                      font-bold
                    "
                  >
                    <CheckCircle2
                      size={14}
                    />

                    نشط ومؤهل للتدريب
                  </div>
                </div>

                <div
                  className="
                    min-h-[56px]
                    rounded-[9px]
                    border
                    border-[#DDE5EF]
                    bg-[#F8FAFC]
                    px-[14px]
                    flex
                    items-center
                    gap-[10px]
                  "
                >
                  <div
                    className="
                      w-[32px]
                      h-[32px]
                      rounded-[8px]
                      bg-[#E9FFF4]
                      text-[#10B981]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Building2
                      size={16}
                    />
                  </div>

                  <span
                    className="
                      text-[9px]
                      leading-[17px]
                      text-[#475569]
                    "
                  >
                    الحساب مرتبط بالنظام الأكاديمي
                    المركزي - تم التحقق من الهوية
                  </span>
                </div>
              </div>
            </section>

            {/* =====================================
                BOTTOM ACTIONS
            ====================================== */}
            <section
              className="
                mt-[90px]
                pt-[18px]
                border-t
                border-[#E2E8F0]
                flex
                flex-wrap
                items-center
                justify-between
                gap-[15px]
              "
            >
              <p
                className="
                  m-0
                  text-[9px]
                  leading-[17px]
                  text-[#94A3B8]
                "
              >
                * يسمح بتعديل بيانات التواصل فقط
                (البريد ورقم الهاتف)، أما البيانات
                الأكاديمية فمعتمدة مركزيا.
              </p>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() =>
                    setIsEditing(true)
                  }
                  className="
                    h-[42px]
                    px-[18px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-[8px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    shadow-[0_3px_8px_rgba(9,55,154,0.16)]
                    transition
                    hover:bg-[#072E81]
                  "
                >
                  <Edit3
                    size={15}
                  />

                  تعديل البيانات
                </button>
              ) : (
                <div
                  className="
                    flex
                    items-center
                    gap-[9px]
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setIsEditing(false)
                    }
                    className="
                      h-[40px]
                      px-[15px]
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
                    onClick={
                      handleSave
                    }
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
                      hover:bg-[#072E81]
                    "
                  >
                    <BadgeCheck
                      size={14}
                    />

                    حفظ التعديلات
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({
  label,
  value,
  name,
  editable = false,
  onChange,
  icon: Icon,
  actionText,
  onAction,
}) {
  return (
    <div>
      <p
        className="
          m-0
          text-[9px]
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      {editable ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="
            mt-[6px]
            w-full
            h-[40px]
            rounded-[7px]
            border
            border-[#D9E2EC]
            bg-white
            px-[11px]
            outline-none
            font-['Cairo']
            text-[10px]
            text-[#334155]
            transition
            focus:border-[#09379A]
            focus:ring-2
            focus:ring-[#09379A]/10
          "
        />
      ) : (
        <div
          className="
            mt-[6px]
            min-h-[26px]
            flex
            items-center
            justify-between
            gap-[12px]
          "
        >
          <div
            className="
              flex
              items-center
              gap-[7px]
              min-w-0
            "
          >
            {Icon && (
              <Icon
                size={13}
                className="
                  shrink-0
                  text-[#94A3B8]
                "
              />
            )}

            <strong
              className="
                text-[10px]
                text-[#334155]
                break-all
              "
            >
              {value}
            </strong>
          </div>

          {actionText && (
            <button
              type="button"
              onClick={onAction}
              className="
                border-0
                bg-transparent
                p-0
                text-[#09379A]
                text-[8px]
                font-bold
                cursor-pointer
                flex
                items-center
                gap-[4px]
                whitespace-nowrap
                hover:underline
              "
            >
              <Edit3
                size={11}
              />

              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}