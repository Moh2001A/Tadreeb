import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  Send,
  UserRound,
  Users,
  Award,
  XCircle,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingDetails() {
  const navigate = useNavigate();

  /*
    حالات التقديم:

    available = التقديم متاح
    applied   = تم التقديم مسبقاً
    closed    = انتهى موعد التقديم
  */
  const applicationStatus = "available";

  const requirements = [
    "اجتياز ما لا يقل عن 36 ساعة دراسية",
    "حصول الطالب على موافقة المشرف الأكاديمي",
    "الالتزام بساعات الحضور والغياب المقررة",
  ];

  const skills = [
    "العمل الجماعي",
    "التفكير التحليلي",
    "إجادة استخدام الحاسوب",
    "التواصل الفعال",
  ];

  const applicationState = {
    available: {
      text: "التقديم على التدريب",
      disabled: false,
      icon: Send,
      className: `
        bg-[#09379A]
        text-white
        border-[#09379A]
        shadow-[0_3px_7px_rgba(9,55,154,0.20)]
        hover:bg-[#072E81]
      `,
    },

    applied: {
      text: "تم التقديم على التدريب",
      disabled: true,
      icon: CheckCircle2,
      className: `
        bg-[#ECFDF3]
        text-[#16A34A]
        border-[#BBE8C9]
        cursor-default
      `,
    },

    closed: {
      text: "انتهى موعد التقديم",
      disabled: true,
      icon: XCircle,
      className: `
        bg-[#F8FAFC]
        text-[#94A3B8]
        border-[#E2E8F0]
        cursor-not-allowed
      `,
    },
  };

  const currentApplicationState =
    applicationState[applicationStatus] ||
    applicationState.available;

  const ApplicationIcon = currentApplicationState.icon;

  const handleApply = () => {
    if (applicationStatus !== "available") {
      return;
    }

    navigate("/student/apply-training");
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
          bg-white
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}
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

            <span className="text-[#94A3B8]">
              ›
            </span>

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
            pt-[34px]
            pb-[40px]
          "
        >
          <div className="w-full max-w-[1080px] mx-auto">
            {/* =====================================
                PAGE HEADING
            ====================================== */}
            <section
              className="
                flex
                items-start
                justify-between
                gap-[24px]
              "
            >
              <div className="text-right">
                <h1
                  className="
                    m-0
                    text-[28px]
                    leading-[40px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  تفاصيل فرصة التدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[14px]
                    leading-[23px]
                    font-normal
                    text-[#64748B]
                  "
                >
                  استعراض كافة متطلبات البرنامج التدريبي
                  وتفاصيل الاعتماد الأكاديمي للجهة الشريكة
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/student/opportunities")
                }
                className="
                  h-[42px]
                  px-[14px]
                  shrink-0
                  border-0
                  bg-transparent
                  text-[#09379A]
                  flex
                  items-center
                  gap-[8px]
                  text-[14px]
                  font-bold
                  cursor-pointer
                  hover:bg-[#F8FAFC]
                  rounded-[9px]
                  transition
                "
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                />

                <span>
                  العودة إلى فرص التدريب
                </span>
              </button>
            </section>

            {/* =====================================
                TWO COLUMN LAYOUT
            ====================================== */}
            <section
              dir="ltr"
              className="
                mt-[24px]
                w-full
                grid
                grid-cols-1
                lg:grid-cols-[330px_minmax(0,1fr)]
                gap-[24px]
                items-start
              "
            >
              {/* ===================================
                  LEFT COLUMN
              ==================================== */}
              <aside
                dir="rtl"
                className="
                  w-full
                  rounded-[14px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-[24px]
                  py-[24px]
                "
              >
                {/* Supervision heading */}
                <div
                  className="
                    pb-[15px]
                    border-b
                    border-[#E2E8F0]
                    flex
                    items-center
                    justify-start
                    gap-[10px]
                  "
                >
                  <Building2
                    size={21}
                    strokeWidth={1.8}
                    className="
                      text-[#09379A]
                      shrink-0
                    "
                  />

                  <h2
                    className="
                      m-0
                      text-[18px]
                      leading-[26px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    الإشراف الكلية
                  </h2>
                </div>

                {/* Supervisor */}
                <div
                  className="
                    mt-[16px]
                    min-h-[118px]
                    rounded-[12px]
                    border
                    border-[#C9D7FF]
                    bg-[#EEF3FF]
                    px-[16px]
                    py-[18px]
                    flex
                    items-center
                  "
                >
                  <div
                    className="
                      w-[42px]
                      h-[42px]
                      shrink-0
                      rounded-full
                      bg-[#09379A]
                      flex
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    <UserRound
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="mr-[12px] text-right">
                    <p
                      className="
                        m-0
                        text-[11px]
                        leading-[17px]
                        text-[#64748B]
                      "
                    >
                      المشرف الأكاديمي للقسم:
                    </p>

                    <h3
                      className="
                        m-0
                        mt-[3px]
                        text-[14px]
                        leading-[21px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      د. سمير مصطفى خليل
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[11px]
                        leading-[17px]
                        text-[#64748B]
                      "
                    >
                      قسم تكنولوجيا المعلومات
                    </p>

                    <p
                      className="
                        m-0
                        text-[11px]
                        leading-[17px]
                        text-[#64748B]
                      "
                    >
                      والوسائط المتعددة
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-[20px]">
                  <h3
                    className="
                      m-0
                      text-[13px]
                      leading-[20px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    متطلبات القبول بالبرنامج:
                  </h3>

                  <div
                    className="
                      mt-[11px]
                      flex
                      flex-col
                      gap-[10px]
                    "
                  >
                    {requirements.map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-start
                          gap-[8px]
                        "
                      >
                        <CheckCircle2
                          size={17}
                          strokeWidth={1.8}
                          className="
                            mt-[1px]
                            shrink-0
                            text-[#10B981]
                          "
                        />

                        <p
                          className="
                            m-0
                            text-[11px]
                            leading-[19px]
                            text-[#64748B]
                          "
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="mt-[20px]">
                  <p
                    className="
                      m-0
                      mb-[7px]
                      text-[11px]
                      text-[#94A3B8]
                    "
                  >
                    مقر التدريب:
                  </p>

                  <div
                    className="
                      relative
                      w-full
                      h-[108px]
                      rounded-[10px]
                      overflow-hidden
                      bg-[#E8EDF3]
                    "
                  >
                    <img
                      src="/training-map.jpg"
                      alt="موقع مقر التدريب"
                      className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                      "
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        bottom-[10px]
                        right-[12px]
                        left-[12px]
                        flex
                        items-center
                        gap-[6px]
                        text-white
                      "
                    >
                      <MapPin
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#FBBF24]"
                      />

                      <span
                        className="
                          text-[11px]
                          leading-[17px]
                          font-medium
                        "
                      >
                        غزة، شارع الرمال، عمارة الأمل
                      </span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* ===================================
                  RIGHT COLUMN
              ==================================== */}
              <div
                dir="rtl"
                className="
                  min-w-0
                  flex
                  flex-col
                  gap-[22px]
                "
              >
                {/* =================================
                    MAIN OPPORTUNITY CARD
                ================================== */}
                <section
                  className="
                    w-full
                    min-h-[194px]
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[24px]
                    py-[24px]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-[22px]
                    "
                  >
                    {/* Image */}
                    <div
                      className="
                        relative
                        w-[214px]
                        h-[136px]
                        shrink-0
                        rounded-[10px]
                        overflow-hidden
                        bg-[#F1F5F9]
                      "
                    >
                      <img
                        src="/training-company.jpg"
                        alt="مقر شركة التقنية الحديثة"
                        className="
                          absolute
                          inset-0
                          w-full
                          h-full
                          object-cover
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <div
                        className="
                          absolute
                          bottom-[8px]
                          right-[8px]
                          h-[22px]
                          px-[9px]
                          rounded-[5px]
                          bg-black/60
                          text-white
                          flex
                          items-center
                          text-[10px]
                        "
                      >
                        مقر الشركة
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          justify-start
                          gap-[7px]
                        "
                      >
                        {/* Approved */}
                        <span
                          className="
                            h-[25px]
                            px-[10px]
                            rounded-[10px]
                            border
                            border-[#AFE8C7]
                            bg-[#DCFCE7]
                            text-[#16844C]
                            flex
                            items-center
                            gap-[5px]
                            text-[11px]
                          "
                        >
                          <CheckCircle2 size={13} />

                          معتمدة
                        </span>

                        {/* Attendance */}
                        <span
                          className="
                            h-[25px]
                            px-[10px]
                            rounded-[10px]
                            border
                            border-[#A5E3F4]
                            bg-[#E4F7FC]
                            text-[#287E8C]
                            flex
                            items-center
                            gap-[4px]
                            text-[11px]
                          "
                        >
                          <Building2 size={13} />

                          حضوري
                        </span>

                        {/* Partnership Code */}
                        <span
                          className="
                            h-[25px]
                            px-[9px]
                            rounded-[8px]
                            bg-[#E6ECFA]
                            text-[#64748B]
                            flex
                            items-center
                            text-[10px]
                          "
                        >
                          رمز الشراكة: ACT-2025-04
                        </span>
                      </div>

                      <h2
                        className="
                          m-0
                          mt-[12px]
                          text-[21px]
                          leading-[30px]
                          font-bold
                          text-[#172033]
                        "
                      >
                        تدريب في شركة التقنية الحديثة
                      </h2>

                      <div
                        className="
                          mt-[13px]
                          pt-[11px]
                          border-t
                          border-[#E2E8F0]
                          flex
                          flex-wrap
                          items-center
                          gap-x-[28px]
                          gap-y-[8px]
                          text-[11px]
                          text-[#475569]
                        "
                      >
                        <div className="flex items-center gap-[5px]">
                          <Clock3
                            size={16}
                            strokeWidth={1.8}
                            className="text-[#09379A]"
                          />

                          <span>
                            <strong>120</strong>{" "}
                            ساعة تدريبية
                          </span>
                        </div>

                        <div className="flex items-center gap-[5px]">
                          <CalendarDays
                            size={16}
                            strokeWidth={1.8}
                            className="text-[#09379A]"
                          />

                          <span>
                            تاريخ البدء:{" "}
                            <strong>
                              15 أكتوبر 2025
                            </strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-[5px]">
                          <MapPin
                            size={16}
                            strokeWidth={1.8}
                            className="text-[#09379A]"
                          />

                          <span>
                            غزة - الرمال
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* =================================
                    ABOUT
                ================================== */}
                <section
                  className="
                    w-full
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[24px]
                    py-[25px]
                  "
                >
                  <div className="flex items-center gap-[10px]">
                    <span
                      className="
                        w-[4px]
                        h-[24px]
                        rounded-full
                        bg-[#09379A]
                      "
                    />

                    <h2
                      className="
                        m-0
                        text-[18px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      نبذة عن الجهة
                    </h2>
                  </div>

                  <p
                    className="
                      m-0
                      mt-[17px]
                      text-[13px]
                      leading-[26px]
                      text-[#64748B]
                    "
                  >
                    شركة التقنية الحديثة شركة رائدة في
                    مجال تطوير البرمجيات والحلول التقنية،
                    وتقدم فرص تدريبية للطلبة لبناء
                    مهاراتهم واكتساب الخبرة في بيئة عمل
                    احترافية بإشراف مهندسين مختصين، مع
                    متابعة مستمرة لتقييم المخرجات
                    الأكاديمية والمهنية بما يلائم سوق
                    العمل الفلسطيني والإقليمي.
                  </p>

                  {/* Stats */}
                  <div
                    className="
                      mt-[21px]
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-[15px]
                    "
                  >
                    {/* Seats */}
                    <div
                      className="
                        min-h-[122px]
                        rounded-[12px]
                        border
                        border-[#DCE5F5]
                        bg-[#EEF3FF]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        px-[12px]
                      "
                    >
                      <div
                        className="
                          w-[40px]
                          h-[40px]
                          rounded-full
                          bg-[#DDE7FB]
                          flex
                          items-center
                          justify-center
                          text-[#09379A]
                        "
                      >
                        <Users
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>

                      <p
                        className="
                          m-0
                          mt-[8px]
                          text-[11px]
                          text-[#64748B]
                        "
                      >
                        عدد المقاعد
                      </p>

                      <h3
                        className="
                          m-0
                          mt-[4px]
                          text-[17px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        5 مقاعد متاحة
                      </h3>
                    </div>

                    {/* Qualification */}
                    <div
                      className="
                        min-h-[122px]
                        rounded-[12px]
                        border
                        border-[#DCE5F5]
                        bg-[#EEF3FF]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        px-[12px]
                      "
                    >
                      <div
                        className="
                          w-[40px]
                          h-[40px]
                          rounded-full
                          bg-[#DDE7FB]
                          flex
                          items-center
                          justify-center
                          text-[#09379A]
                        "
                      >
                        <Award
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>

                      <p
                        className="
                          m-0
                          mt-[8px]
                          text-[11px]
                          text-[#64748B]
                        "
                      >
                        المؤهل المطلوب
                      </p>

                      <h3
                        className="
                          m-0
                          mt-[4px]
                          text-[17px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        طالب في الكلية
                      </h3>
                    </div>

                    {/* Majors */}
                    <div
                      className="
                        min-h-[122px]
                        rounded-[12px]
                        border
                        border-[#DCE5F5]
                        bg-[#EEF3FF]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        px-[12px]
                      "
                    >
                      <div
                        className="
                          w-[40px]
                          h-[40px]
                          rounded-full
                          bg-[#DDE7FB]
                          flex
                          items-center
                          justify-center
                          text-[#09379A]
                        "
                      >
                        <GraduationCap
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>

                      <p
                        className="
                          m-0
                          mt-[8px]
                          text-[11px]
                          text-[#64748B]
                        "
                      >
                        التخصصات المطلوبة
                      </p>

                      <h3
                        className="
                          m-0
                          mt-[4px]
                          text-[17px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        تقنية المعلومات
                      </h3>
                    </div>
                  </div>
                </section>

                {/* =================================
                    REQUIRED SKILLS
                ================================== */}
                <section
                  className="
                    w-full
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[24px]
                    py-[25px]
                  "
                >
                  <div className="flex items-center gap-[10px]">
                    <span
                      className="
                        w-[4px]
                        h-[24px]
                        rounded-full
                        bg-[#09379A]
                      "
                    />

                    <h2
                      className="
                        m-0
                        text-[18px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      المهارات المطلوبة
                    </h2>
                  </div>

                  <p
                    className="
                      m-0
                      mt-[14px]
                      text-[12px]
                      leading-[21px]
                      text-[#64748B]
                    "
                  >
                    المهارات الأساسية اللازمة لاجتياز
                    المقابلة التأهيلية وبدء البرنامج
                    الميداني المعتمد:
                  </p>

                  <div
                    className="
                      mt-[17px]
                      flex
                      flex-wrap
                      gap-[12px]
                    "
                  >
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="
                          h-[45px]
                          px-[17px]
                          rounded-[9px]
                          border
                          border-[#AFC7FF]
                          bg-[#EDF3FF]
                          flex
                          items-center
                          gap-[8px]
                          text-[13px]
                          font-medium
                          text-[#09379A]
                        "
                      >
                        <CheckCircle2
                          size={16}
                          strokeWidth={1.8}
                        />

                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* =================================
                    APPLICATION ACTION
                ================================== */}
                <section
                  className="
                    w-full
                    min-h-[98px]
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[24px]
                    py-[20px]
                    flex
                    items-center
                    justify-between
                    gap-[20px]
                  "
                >
                  {/* Application Button */}
                  <button
                    type="button"
                    disabled={
                      currentApplicationState.disabled
                    }
                    onClick={handleApply}
                    className={`
                      min-w-[235px]
                      h-[52px]
                      px-[24px]

                      rounded-[9px]

                      border

                      flex
                      items-center
                      justify-center
                      gap-[10px]

                      text-[16px]
                      font-bold

                      transition-all
                      duration-200

                      ${currentApplicationState.className}
                    `}
                  >
                    <ApplicationIcon
                      size={18}
                      strokeWidth={1.8}
                    />

                    <span>
                      {currentApplicationState.text}
                    </span>
                  </button>

                  {/* Back */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/opportunities"
                      )
                    }
                    className="
                      h-[44px]
                      px-[12px]
                      border-0
                      bg-transparent
                      text-[#09379A]
                      flex
                      items-center
                      gap-[8px]
                      text-[14px]
                      font-bold
                      cursor-pointer
                      rounded-[9px]
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <span>
                      العودة إلى القائمة
                    </span>

                    <ArrowLeft
                      size={18}
                      strokeWidth={1.8}
                    />
                  </button>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}