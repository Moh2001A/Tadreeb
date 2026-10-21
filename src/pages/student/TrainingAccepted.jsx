import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Info,
  Mail,
  MapPin,
  Printer,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingAccepted() {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "توقيع اتفاقية التدريب",
      description: "تم الاعتماد والتوقيع الرسمي للطرفين",
      date: "2025/09/20",
      time: "11:24 ص",
      status: "completed",
    },
    {
      id: 2,
      title: "رفع المستندات المطلوبة",
      description: "تم تدقيق كشف العلامات والهوية الجامعية",
      date: "2025/09/22",
      time: "02:15 م",
      status: "completed",
    },
    {
      id: 3,
      title: "إعداد خطة التدريب",
      description:
        "بانتظار اعتماد خطة التدريب الميداني الموقع والمصادقة في الموعد المحدد",
      date: "2025/10/05",
      time: "",
      status: "current",
    },
    {
      id: 4,
      title: "مباشرة التدريب الميداني",
      description:
        "الموعد المجدول: 2025/10/01، تمام الساعة 08:30 صباحا بمقر الشركة.",
      date: "",
      time: "",
      status: "upcoming",
    },
  ];

  const hourDistribution = [
    {
      label: "التهيئة والتسجيل",
      hours: 30,
      width: "25%",
      color: "#163B8C",
    },
    {
      label: "المهام الميدانية",
      hours: 54,
      width: "45%",
      color: "#FF6B35",
    },
    {
      label: "المناقشة والتقييم",
      hours: 36,
      width: "30%",
      color: "#38BDF8",
    },
  ];

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
              onClick={() => navigate("/student/dashboard")}
              className="
                border-0
                bg-transparent
                p-0
                text-[#64748B]
                cursor-pointer
              "
            >
              الرئيسية
            </button>

            <span className="text-[#94A3B8]">›</span>

            <button
              type="button"
              onClick={() => navigate("/student/applications/status")}
              className="
                border-0
                bg-transparent
                p-0
                text-[#64748B]
                cursor-pointer
              "
            >
              طلباتي
            </button>

            <span className="text-[#94A3B8]">›</span>

            <span className="font-bold text-[#1E293B]">
              متابعة حالة الطلب
            </span>
          </div>

          {/* Header actions */}
          <div
            className="
              absolute
              top-0
              left-[165px]
              h-[72px]
              flex
              items-center
              gap-[10px]
            "
          >
            <button
              type="button"
              className="
                h-[34px]
                px-[12px]
                rounded-[8px]
                border
                border-[#D9E2EC]
                bg-white
                text-[#334155]
                flex
                items-center
                gap-[7px]
                text-[10px]
                font-bold
                hover:bg-[#F8FAFC]
              "
            >
              <Printer size={14} />
              طباعة الإشعار
            </button>

            <button
              type="button"
              className="
                h-[34px]
                px-[12px]
                rounded-[8px]
                border
                border-[#D9E2EC]
                bg-white
                text-[#334155]
                flex
                items-center
                gap-[7px]
                text-[10px]
                font-bold
                hover:bg-[#F8FAFC]
              "
            >
              <Download size={14} className="text-[#09379A]" />
              كتاب التنسيب (PDF)
            </button>
          </div>
        </div>

        {/* SCROLL CONTENT */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[24px]
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
              <div>
                <h1
                  className="
                    m-0
                    text-[28px]
                    leading-[40px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  قبول التدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[13px]
                    leading-[21px]
                    text-[#64748B]
                  "
                >
                  تهانينا! تم اعتماد وترشيح ملفك التدريبي رسميا لدى جهة التدريب
                  الشريكة.
                </p>
              </div>

              <div
                className="
                  mt-[4px]
                  flex
                  items-center
                  gap-[6px]
                  text-[9px]
                  text-[#64748B]
                "
              >
                <span
                  className="
                    w-[7px]
                    h-[7px]
                    rounded-full
                    bg-[#FF6B35]
                  "
                />

                إشعار رسمي معتمد
              </div>
            </section>

            {/* =====================================
                ACCEPTANCE BANNER
            ====================================== */}
            <section
              className="
                mt-[20px]
                rounded-[14px]
                border
                border-[#CFE0FB]
                bg-[#F5F9FF]
                px-[24px]
                py-[20px]
                flex
                items-center
                justify-between
                gap-[20px]
              "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
                    w-[46px]
                    h-[46px]
                    shrink-0
                    rounded-[10px]
                    bg-[#E4EEFF]
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShieldCheck size={23} strokeWidth={1.8} />
                </div>

                <div>
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-[10px]
                    "
                  >
                    <h2
                      className="
                        m-0
                        text-[18px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      تم قبولك في التدريب بنجاح
                    </h2>

                    <span
                      dir="ltr"
                      className="
                        h-[23px]
                        px-[8px]
                        rounded-[6px]
                        border
                        border-[#C7D7F7]
                        bg-[#EDF3FF]
                        text-[#2563EB]
                        flex
                        items-center
                        text-[9px]
                        font-medium
                      "
                    >
                      TRN-2025-0844
                    </span>
                  </div>

                  <p
                    className="
                      m-0
                      mt-[10px]
                      max-w-[620px]
                      text-[11px]
                      leading-[20px]
                      text-[#64748B]
                    "
                  >
                    تهانينا! تم قبولك في فرصة التدريب. يرجى الاطلاع على
                    التفاصيل التالية والبدء بإجراءات مباشرة التدريب المعتمدة
                    أكاديميا لمتابعة المهام في الموعد المحدد.
                  </p>
                </div>
              </div>

              <div
                className="
                  shrink-0
                  text-left
                "
              >
                <button
                  type="button"
                  className="
                    h-[35px]
                    px-[13px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    hover:bg-[#072E81]
                  "
                >
                  <ExternalLink size={14} />
                  معاينة التنسيب
                </button>

                <div
                  className="
                    mt-[7px]
                    flex
                    items-center
                    gap-[5px]
                    text-[8px]
                    font-bold
                    text-[#16A34A]
                  "
                >
                  <CheckCircle2 size={12} />
                  كتاب التنسيب معتمد وموقع رسميا
                </div>

                <p
                  dir="ltr"
                  className="
                    m-0
                    mt-[2px]
                    text-[7px]
                    text-[#94A3B8]
                  "
                >
                  REF: AXZ-844
                </p>
              </div>
            </section>

            {/* =====================================
                MAIN GRID
            ====================================== */}
            <section
              dir="ltr"
              className="
                mt-[22px]
                grid
                grid-cols-1
                lg:grid-cols-[315px_minmax(0,1fr)]
                gap-[22px]
                items-start
              "
            >
              {/* ===================================
                  LEFT COLUMN
              ==================================== */}
              <div
                dir="rtl"
                className="
                  flex
                  flex-col
                  gap-[20px]
                "
              >
                {/* NEXT STEPS */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[18px]
                    py-[18px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <h2
                        className="
                          m-0
                          text-[16px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        خطواتك القادمة
                      </h2>

                      <p
                        className="
                          m-0
                          mt-[2px]
                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        استكمل الإجراءات التالية لبدء تدريبك رسميا
                      </p>
                    </div>

                    <div
                      className="
                        w-[34px]
                        h-[34px]
                        rounded-[8px]
                        bg-[#F1F5F9]
                        flex
                        items-center
                        justify-center
                        text-[#64748B]
                      "
                    >
                      <FileText size={17} />
                    </div>
                  </div>

                  <div
                    className="
                      mt-[16px]
                      flex
                      flex-col
                      gap-[9px]
                    "
                  >
                    {steps.map((step) => (
                      <article
                        key={step.id}
                        className={`
                          rounded-[10px]
                          border
                          px-[12px]
                          py-[11px]
                          flex
                          items-start
                          gap-[10px]

                          ${
                            step.status === "completed"
                              ? `
                                border-[#D5E2F5]
                                bg-[#F8FBFF]
                              `
                              : step.status === "current"
                              ? `
                                border-[#FDBA74]
                                bg-[#FFF7ED]
                              `
                              : `
                                border-[#E2E8F0]
                                bg-[#F8FAFC]
                              `
                          }
                        `}
                      >
                        <div
                          className={`
                            w-[31px]
                            h-[31px]
                            shrink-0
                            rounded-full
                            flex
                            items-center
                            justify-center

                            ${
                              step.status === "completed"
                                ? `
                                  bg-[#0E4BB7]
                                  text-white
                                `
                                : step.status === "current"
                                ? `
                                  bg-[#FF6B35]
                                  text-white
                                `
                                : `
                                  bg-[#E2E8F0]
                                  text-[#94A3B8]
                                `
                            }
                          `}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle2 size={17} />
                          ) : step.status === "current" ? (
                            <RefreshCw size={16} />
                          ) : (
                            <Clock3 size={15} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-[8px]
                            "
                          >
                            <h3
                              className="
                                m-0
                                text-[11px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {step.id}. {step.title}
                            </h3>

                            <span
                              className={`
                                text-[8px]
                                font-bold
                                whitespace-nowrap

                                ${
                                  step.status === "completed"
                                    ? "text-[#2563EB]"
                                    : step.status === "current"
                                    ? "text-[#EA580C]"
                                    : "text-[#94A3B8]"
                                }
                              `}
                            >
                              {step.status === "completed"
                                ? "مكتمل"
                                : step.status === "current"
                                ? "قيد المتابعة"
                                : "قادم"}
                            </span>
                          </div>

                          <p
                            className="
                              m-0
                              mt-[3px]
                              text-[8px]
                              leading-[14px]
                              text-[#64748B]
                            "
                          >
                            {step.description}
                          </p>

                          {(step.date || step.time) && (
                            <p
                              dir="ltr"
                              className="
                                m-0
                                mt-[4px]
                                text-[7px]
                                text-[#94A3B8]
                                text-right
                              "
                            >
                              {step.date}
                              {step.time && ` • ${step.time}`}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* DIRECT ACTIONS */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[18px]
                    py-[18px]
                  "
                >
                  <span
                    className="
                      text-[8px]
                      text-[#94A3B8]
                    "
                  >
                    إجراء سريع
                  </span>

                  <h2
                    className="
                      m-0
                      mt-[4px]
                      text-[15px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    الإجراءات المباشرة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[8px]
                      text-[9px]
                      leading-[17px]
                      text-[#64748B]
                    "
                  >
                    الانتقال الفوري إلى بيئة العمل الميدانية
                    ومتابعة المهام المعتمدة والمتطلبات مع المشرف.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/student/training-profile")
                    }
                    className="
                      mt-[13px]
                      w-full
                      h-[42px]
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
                      shadow-[0_3px_7px_rgba(9,55,154,0.18)]
                      hover:bg-[#072E81]
                    "
                  >
                    الانتقال إلى ملف التدريب
                    <ArrowLeft size={15} />
                  </button>

                  <button
                    type="button"
                    className="
                      mt-[10px]
                      w-full
                      min-h-[42px]
                      rounded-[8px]
                      border
                      border-[#D9E2EC]
                      bg-white
                      text-[#334155]
                      flex
                      items-center
                      justify-center
                      gap-[8px]
                      px-[10px]
                      text-[10px]
                      font-bold
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <Download size={14} className="text-[#09379A]" />
                    تحميل كتاب القبول والتنسيب الرسمي (PDF)
                  </button>

                  <div
                    className="
                      mt-[11px]
                      rounded-[8px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[11px]
                      py-[10px]
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <Mail
                      size={15}
                      className="text-[#09379A] shrink-0"
                    />

                    <div className="min-w-0">
                      <p
                        className="
                          m-0
                          text-[8px]
                          text-[#64748B]
                        "
                      >
                        لأي استفسار تواصل مع منسق التدريب:
                      </p>

                      <p
                        dir="ltr"
                        className="
                          m-0
                          mt-[2px]
                          text-[9px]
                          font-bold
                          text-[#2563EB]
                          truncate
                        "
                      >
                        training@alazhar.edu.ps
                      </p>
                    </div>
                  </div>
                </section>

                {/* STUDENT INFO */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#CFE0FB]
                    bg-[#F3F8FF]
                    px-[17px]
                    py-[15px]
                    flex
                    items-center
                    justify-between
                    gap-[12px]
                  "
                >
                  <div>
                    <h3
                      className="
                        m-0
                        text-[12px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      أمل أحمد سعيد
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[3px]
                        text-[8px]
                        text-[#64748B]
                      "
                    >
                      الرقم الجامعي: 145892023 • علوم شبكات وتكنولوجيا
                    </p>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[8px]
                        text-[#09379A]
                      "
                    >
                      كلية الدراسات المتوسطة - جامعة الأزهر
                    </p>
                  </div>

                  <div
                    className="
                      w-[36px]
                      h-[36px]
                      shrink-0
                      rounded-full
                      bg-[#09379A]
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Info size={17} />
                  </div>
                </section>
              </div>

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
                {/* ORGANIZATION DETAILS */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[22px]
                    py-[20px]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-[20px]
                    "
                  >
                    <div className="flex items-start gap-[14px]">
                      <div
                        className="
                          w-[58px]
                          h-[58px]
                          rounded-[10px]
                          bg-[#F1F5F9]
                          border
                          border-[#E2E8F0]
                          flex
                          items-center
                          justify-center
                          text-[#09379A]
                          shrink-0
                        "
                      >
                        <Building2 size={25} />
                      </div>

                      <div>
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-[8px]
                          "
                        >
                          <span
                            className="
                              h-[23px]
                              px-[9px]
                              rounded-[10px]
                              bg-[#E7EEFF]
                              text-[#2563EB]
                              flex
                              items-center
                              text-[9px]
                              font-bold
                            "
                          >
                            هندسة شبكات
                          </span>

                          <span
                            className="
                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            الرمز التعريفي للمؤسسة:
                          </span>

                          <span
                            dir="ltr"
                            className="
                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            PAL-TEL-GZ-2025
                          </span>
                        </div>

                        <h2
                          className="
                            m-0
                            mt-[6px]
                            text-[20px]
                            font-bold
                            text-[#1E293B]
                          "
                        >
                          شركة القدس للاتصالات
                        </h2>

                        <p
                          className="
                            m-0
                            mt-[4px]
                            max-w-[560px]
                            text-[10px]
                            leading-[17px]
                            text-[#64748B]
                          "
                        >
                          تدريب ميداني متخصص في مجال هندسة الاتصالات
                          والبنية التحتية للشبكات السلكية واللاسلكية
                          وتقنيات الألياف الضوئية.
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                        h-[25px]
                        px-[10px]
                        rounded-[12px]
                        border
                        border-[#AFC8FA]
                        bg-[#EEF4FF]
                        text-[#09379A]
                        flex
                        items-center
                        gap-[5px]
                        text-[9px]
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      <span
                        className="
                          w-[6px]
                          h-[6px]
                          rounded-full
                          bg-[#2563EB]
                        "
                      />
                      مقبول ومثبت
                    </span>
                  </div>

                  {/* INFO GRID */}
                  <div
                    className="
                      mt-[20px]
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-[12px]
                    "
                  >
                    <InfoCard
                      icon={GraduationCap}
                      label="المشرف الأكاديمي"
                      value="د. أحمد محمود"
                      sub="كلية الدراسات المتوسطة"
                    />

                    <InfoCard
                      icon={Building2}
                      label="المشرف الميداني"
                      value="م. سمير خليل"
                      sub="رئيس قسم الشبكات والتقنية"
                    />

                    <InfoCard
                      icon={MapPin}
                      label="مكان التدريب"
                      value="غزة - الرمال"
                      sub="برج الأمل - ط 4"
                    />

                    <InfoCard
                      icon={CalendarDays}
                      label="تاريخ البدء"
                      value="2025/10/01"
                      sub="الأربعاء 08:30 ص"
                    />

                    <InfoCard
                      icon={CalendarDays}
                      label="تاريخ الانتهاء"
                      value="2025/12/01"
                      sub="التاريخ المتوقع للفصل"
                    />

                    <InfoCard
                      icon={Clock3}
                      label="مدة التدريب الإجمالية"
                      value="8 أسابيع"
                      sub="120 ساعة تدريبية"
                      accent
                    />
                  </div>

                  {/* LOCATION BAR */}
                  <div
                    className="
                      mt-[14px]
                      min-h-[52px]
                      rounded-[9px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[14px]
                      flex
                      items-center
                      justify-between
                      gap-[15px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-[8px]
                      "
                    >
                      <MapPin
                        size={16}
                        className="text-[#09379A] shrink-0 mt-[1px]"
                      />

                      <div>
                        <strong
                          className="
                            block
                            text-[10px]
                            text-[#334155]
                          "
                        >
                          مقر التدريب: شارع عمر المختار - مفترق الرمال
                        </strong>

                        <span
                          className="
                            block
                            mt-[2px]
                            text-[8px]
                            text-[#94A3B8]
                          "
                        >
                          مطلوب إبراز كتاب التنسيب الرسمي المعتمد عند بوابة
                          الشركة يوم المباشرة.
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="
                        border-0
                        bg-transparent
                        text-[#2563EB]
                        flex
                        items-center
                        gap-[5px]
                        text-[9px]
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      <ExternalLink size={13} />
                      عرض الخريطة التفاعلية
                    </button>
                  </div>
                </section>

                {/* HOURS DISTRIBUTION */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[22px]
                    py-[21px]
                  "
                >
                  <div
                    className="
                      flex
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
                      <div
                        className="
                          flex
                          items-end
                          gap-[3px]
                          h-[18px]
                        "
                      >
                        <span className="w-[3px] h-[7px] bg-[#09379A]" />
                        <span className="w-[3px] h-[12px] bg-[#09379A]" />
                        <span className="w-[3px] h-[17px] bg-[#09379A]" />
                      </div>

                      <h2
                        className="
                          m-0
                          text-[19px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        توزيع الساعات التدريبية
                      </h2>
                    </div>

                    <p
                      className="
                        m-0
                        text-[10px]
                        font-bold
                        text-[#64748B]
                      "
                    >
                      المستهدف: 120 ساعة
                      <span className="text-[#94A3B8]">
                        {" "}
                        (100%)
                      </span>
                    </p>
                  </div>

                  {/* BAR */}
                  <div
                    dir="ltr"
                    className="
                      mt-[22px]
                      w-full
                      h-[16px]
                      rounded-full
                      overflow-hidden
                      flex
                      bg-[#E2E8F0]
                    "
                  >
                    {hourDistribution.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          width: item.width,
                          backgroundColor: item.color,
                        }}
                        className="h-full"
                      />
                    ))}
                  </div>

                  {/* LEGEND */}
                  <div
                    className="
                      mt-[18px]
                      flex
                      flex-wrap
                      items-center
                      justify-around
                      gap-[12px]
                    "
                  >
                    {hourDistribution.map((item) => (
                      <div
                        key={item.label}
                        className="
                          flex
                          items-center
                          gap-[7px]
                          text-[10px]
                          text-[#64748B]
                        "
                      >
                        <span
                          style={{
                            backgroundColor: item.color,
                          }}
                          className="
                            w-[8px]
                            h-[8px]
                            rounded-full
                          "
                        />

                        <span>
                          {item.label} ({item.hours} س)
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================
   INFO CARD
========================================== */

function InfoCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}) {
  return (
    <div
      className="
        min-h-[86px]
        rounded-[10px]
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        px-[13px]
        py-[12px]
        flex
        items-center
        gap-[10px]
      "
    >
      <div
        className={`
          w-[34px]
          h-[34px]
          shrink-0
          rounded-[8px]
          flex
          items-center
          justify-center

          ${
            accent
              ? "bg-[#FFF2E8] text-[#FF6B35]"
              : "bg-[#EEF3FF] text-[#09379A]"
          }
        `}
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p
          className="
            m-0
            text-[8px]
            text-[#94A3B8]
          "
        >
          {label}
        </p>

        <strong
          className={`
            block
            mt-[3px]
            text-[11px]
            font-bold

            ${
              accent
                ? "text-[#FF6B35]"
                : "text-[#334155]"
            }
          `}
        >
          {value}
        </strong>

        <span
          className="
            block
            mt-[2px]
            text-[8px]
            text-[#64748B]
          "
        >
          {sub}
        </span>
      </div>
    </div>
  );
}