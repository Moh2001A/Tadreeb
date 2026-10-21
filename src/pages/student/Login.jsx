import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // في تصميم Figma مربع "تذكرني" ظاهر باللون الأزرق،
  // لذلك نبدأه مفعلاً.
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    studentId: "20220845",
    password: "123456789012",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // لاحقاً عند ربط الـ Backend سيتم التحقق من البيانات هنا.
    navigate("/student/dashboard");
  };

  return (
    <>
      <div
        dir="rtl"
        className="
          login-page
          w-full
          h-screen
          bg-white
          text-[#1E293B]
          font-['Cairo']
          overflow-y-auto
          lg:overflow-hidden
        "
      >
        <div className="h-full lg:grid lg:grid-cols-2">
          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <section
            className="
              relative
              h-full
              min-h-[650px]
              lg:min-h-0
              bg-white
              overflow-hidden
            "
          >
            {/* ================= LOGIN FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="login-form-shell absolute"
            >
              {/* WELCOME */}
              <div className="absolute top-0 right-0 w-full text-right">
                <h1
                  className="
                    m-0
                    text-[32px]
                    font-semibold
                    leading-[39px]
                    text-black
                  "
                >
                  مرحباً بك مجدداً
                </h1>

                <p
                  className="
                    absolute
                    top-[49px]
                    right-0
                    m-0
                    text-[16px]
                    font-normal
                    leading-[29px]
                    text-[#A1A1A1]
                  "
                >
                  سجل دخولك إلى حسابك للاستمرار
                </p>
              </div>

              {/* ================= STUDENT NUMBER ================= */}
              <div className="absolute top-[96px] right-0 w-full">
                <label
                  htmlFor="studentId"
                  className="
                    flex
                    items-center
                    justify-start
                    gap-[3px]
                    h-[26px]
                    text-[16px]
                    font-bold
                    text-black
                  "
                >
                  <span>رقم الطالب</span>
                  <span className="text-[#EB0909]">*</span>
                </label>

                <div className="absolute top-[40px] right-0 w-full">
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={handleChange}
                    autoComplete="username"
                    className="
                      w-full
                      h-[48px]
                      rounded-[6px]
                      border
                      border-[#09379A]
                      bg-white
                      pr-[45px]
                      pl-[17px]
                      text-[14px]
                      font-medium
                      text-[#1E293B]
                      text-right
                      outline-none
                      transition
                      focus:ring-[3px]
                      focus:ring-[#09379A]/10
                    "
                  />

                  <span
                    className="
                      absolute
                      right-[14px]
                      top-[14px]
                      w-[20px]
                      h-[20px]
                      text-[#09379A]
                      pointer-events-none
                    "
                  >
                    <UserIcon />
                  </span>
                </div>
              </div>

              {/* ================= PASSWORD ================= */}
              <div className="absolute top-[202px] right-0 w-full">
                <label
                  htmlFor="password"
                  className="
                    flex
                    items-center
                    justify-start
                    gap-[3px]
                    h-[26px]
                    text-[16px]
                    font-bold
                    text-black
                  "
                >
                  <span>كلمة المرور</span>
                  <span className="text-[#EB0909]">*</span>
                </label>

                <div className="absolute top-[40px] right-0 w-full">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className="
                      w-full
                      h-[48px]
                      rounded-[6px]
                      border
                      border-[#E2E8F0]
                      bg-white
                      px-[45px]
                      text-[14px]
                      font-normal
                      text-[#1E293B]
                      text-right
                      outline-none
                      transition
                      focus:border-[#09379A]
                      focus:ring-[3px]
                      focus:ring-[#09379A]/10
                    "
                  />

                  <span
                    className="
                      absolute
                      right-[14px]
                      top-[14px]
                      w-[20px]
                      h-[20px]
                      text-[#64748B]
                      pointer-events-none
                    "
                  >
                    <LockIcon />
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword
                        ? "إخفاء كلمة المرور"
                        : "إظهار كلمة المرور"
                    }
                    className="
                      absolute
                      left-[14px]
                      top-[14px]
                      w-[20px]
                      h-[20px]
                      p-0
                      border-0
                      bg-transparent
                      text-[#64748B]
                      cursor-pointer
                      transition
                      hover:text-[#09379A]
                    "
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* ================= REMEMBER / FORGOT ================= */}
              <div
                className="
                  absolute
                  top-[300px]
                  right-0
                  w-full
                  h-[28px]
                "
              >
                <label
                  className="
                    absolute
                    right-0
                    top-0
                    flex
                    items-center
                    gap-[8px]
                    h-[28px]
                    text-[14px]
                    font-normal
                    text-[#1E293B]
                    cursor-pointer
                    select-none
                  "
                >
                  <CustomCheckbox
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                  />

                  <span>تذكرني</span>
                </label>

                <button
                  type="button"
                  className="
                    absolute
                    left-0
                    top-0
                    h-[28px]
                    border-0
                    bg-transparent
                    p-0
                    text-[14px]
                    font-normal
                    text-[#09379A]
                    cursor-pointer
                    hover:underline
                  "
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              {/* ================= LOGIN BUTTON ================= */}
              <button
                type="submit"
                dir="ltr"
                className="
                  absolute
                  top-[350px]
                  right-0
                  w-full
                  h-[48px]
                  rounded-[10px]
                  border-0
                  bg-[#09379A]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[14px]
                  font-bold
                  shadow-[0_1px_1px_rgba(0,0,0,0.05)]
                  cursor-pointer
                  transition
                  hover:bg-[#072F86]
                  active:scale-[0.995]
                "
              >
                <ArrowLeftIcon />

                <span dir="rtl">
                  تسجيل الدخول
                </span>
              </button>

              {/* ================= DIVIDER ================= */}
              <div
                className="
                  absolute
                  top-[421px]
                  right-0
                  w-full
                  h-[16px]
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-1/2
                    h-px
                    bg-[#E2E8F0]
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    bg-white
                    px-[12px]
                    text-[12px]
                    leading-[16px]
                    font-medium
                    text-[#94A3B8]
                  "
                >
                  أو
                </span>
              </div>

              {/* ================= UNIVERSITY LOGIN ================= */}
              <button
                type="button"
                dir="ltr"
                className="
                  absolute
                  top-[453px]
                  right-0
                  w-full
                  h-[48px]
                  rounded-[10px]
                  border
                  border-[#09379A]
                  bg-white
                  text-[#09379A]
                  flex
                  items-center
                  justify-center
                  gap-[10px]
                  text-[14px]
                  font-bold
                  cursor-pointer
                  transition
                  hover:bg-[#F8FAFC]
                  active:scale-[0.995]
                "
              >
                <span dir="rtl">
                  تسجيل الدخول عبر حساب الجامعة
                </span>

                <GraduationIcon />
              </button>
            </form>

            {/* ================= COPYRIGHT ================= */}
            <p
              className="
                login-copyright
                absolute
                m-0
                text-[12px]
                leading-[16px]
                font-normal
                text-[#94A3B8]
                text-center
                whitespace-nowrap
              "
            >
              © 2027 كلية الدراسات المتوسطة - جامعة الأزهر. جميع الحقوق محفوظة.
            </p>
          </section>

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <section
            className="
              relative
              hidden
              lg:block
              h-full
              bg-[#09379A]
              text-white
              overflow-hidden
            "
          >
            {/* ================= BRAND ================= */}
            <div
              className="
                login-brand
                absolute
                left-1/2
                -translate-x-1/2
                flex
                flex-col
                items-center
                text-center
                whitespace-nowrap
              "
            >
              <img
                src="/logo.svg"
                alt="شعار بوابة التدريب الميداني"
                className="
                  block
                  w-[120px]
                  h-[120px]
                  object-contain
                "
              />

              <h2
                className="
                  mt-[17px]
                  mb-0
                  text-[32px]
                  leading-[normal]
                  font-bold
                  text-white
                "
              >
                بوابة التدريب الميداني
              </h2>

              <p
                className="
                  mt-[3px]
                  mb-0
                  text-[20px]
                  leading-[normal]
                  font-medium
                  text-white
                "
              >
                كلية الدراسات المتوسطة - الأزهر
              </p>

              <p
                className="
                  mt-[8px]
                  mb-0
                  text-[16px]
                  leading-[23px]
                  font-normal
                  text-white
                "
              >
                “معاً نحو مستقبل مهني أفضل”
              </p>
            </div>

            {/* ================= FEATURES ================= */}
            <div
              className="
                login-features
                absolute
                left-[54px]
                right-[54px]
                border-t
                border-white/15
              "
            >
              <div
                className="
                  grid
                  grid-cols-3
                  gap-[16px]
                  pt-[33px]
                "
              >
                <Feature
                  icon={<CheckCircleIcon />}
                  text="متابعة مستمرة لحالة طلبك"
                />

                <Feature
                  icon={<BriefcaseIcon />}
                  text="فرص تدريبية متنوعة"
                />

                <Feature
                  icon={<StarIcon />}
                  text="تجربة تدريبية متميزة"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================
          RESPONSIVE HEIGHT RULES
      ====================================================== */}
      <style>
        {`
          /*
            Figma reference:
            1440 × 1024
          */

          .login-form-shell {
            width: 440px;
            height: 501px;
            top: 140px;
            right: clamp(24px, 5.555vw, 80px);
          }

          .login-copyright {
            top: 792px;
            right: clamp(24px, 5.555vw, 80px);
            width: 440px;
          }

          .login-brand {
            top: 145px;
          }

          .login-features {
            top: 870px;
          }

          /*
            فقط عندما يكون ارتفاع شاشة اللابتوب أقل من تصميم Figma،
            نقلل الفراغات الرأسية حتى لا يظهر Scroll.
            التصميم الأساسي 1440×1024 لا يتأثر.
          */
          @media (min-width: 1024px) and (max-height: 979px) {
            .login-form-shell {
              top: clamp(32px, 6vh, 80px);
            }

            .login-copyright {
              top: auto;
              bottom: 18px;
            }

            .login-brand {
              top: clamp(30px, 7vh, 70px);
            }

            .login-features {
              top: auto;
              bottom: 16px;
            }

            .login-features > div {
              padding-top: 18px;
            }
          }

          /*
            على الشاشات الأقصر جداً نحافظ على نفس المقاسات،
            ونضغط فقط المسافات الخارجية.
          */
          @media (min-width: 1024px) and (max-height: 650px) {
            .login-form-shell {
              top: 24px;
            }

            .login-copyright {
              bottom: 10px;
            }

            .login-brand {
              top: 22px;
            }

            .login-features {
              bottom: 8px;
            }

            .login-features > div {
              padding-top: 12px;
            }
          }

          @media (max-width: 1023px) {
            .login-form-shell {
              position: relative;
              top: auto;
              right: auto;
              width: min(440px, calc(100% - 48px));
              height: 501px;
              margin: 60px auto 0;
            }

            .login-copyright {
              position: relative;
              top: auto;
              right: auto;
              bottom: auto;
              width: auto;
              margin: 70px 24px 24px;
              white-space: normal;
            }
          }
        `}
      </style>
    </>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon, text }) {
  return (
    <div
      className="
        min-w-0
        flex
        flex-col
        items-center
        gap-[10px]
        text-center
      "
    >
      <div
        className="
          w-[44px]
          h-[44px]
          shrink-0
          rounded-[12px]
          bg-white/10
          flex
          items-center
          justify-center
          text-white
        "
      >
        {icon}
      </div>

      <p
        className="
          m-0
          text-[12px]
          leading-[15px]
          font-medium
          text-white/95
          whitespace-nowrap
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   CHECKBOX
========================================================= */

function CustomCheckbox({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`
        w-[16px]
        h-[16px]
        shrink-0
        rounded-[2.5px]
        border
        flex
        items-center
        justify-center
        p-0
        cursor-pointer
        transition
        ${
          checked
            ? "bg-[#09379A] border-[#09379A] text-white"
            : "bg-white border-[#CBD5E1] text-transparent"
        }
      `}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.2 6.2L4.7 8.5L9.8 3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* =========================================================
   ICONS
========================================================= */

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a17.5 17.5 0 0 1-3 4.1" />
      <path d="M6.6 6.6C3.5 8.5 2 12 2 12s3.5 8 10 8a10.6 10.6 0 0 0 4.2-.9" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2 10 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}