import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Printer,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function ApplicationStatus() {
  const navigate = useNavigate();

  /*
    الحالات الممكنة:

    waiting  = قيد الانتظار
    accepted = تم القبول
    revision = مطلوب تعديل
  */
  const requestStatus = "waiting";

  const timeline = [
    {
      number: 1,
      title: "تقديم الطلب",
      date: "2025/09/10",
      state: "completed",
    },
    {
      number: 2,
      title: "قيد المراجعة",
      date: "2025/09/12",
      state: "completed",
    },
    {
      number: 3,
      title: "قيد الانتظار",
      date: "2025/09/14",
      state: "current",
    },
    {
      number: 4,
      title: "تم القبول",
      date: "",
      state: "pending",
    },
  ];

  const auditRows = [
    {
      date: "2025/09/10",
      action: "تقديم الطلب الأولي وتعبئة البيانات والمستندات",
      details:
        "تم رفع الطلبات عبر البوابة الطلابية الإلكترونية واستيفاء الساعات الأكاديمية المطلوبة.",
      owner: "الطالب (أمل أحمد)",
      icon: GraduationCap,
      status: "مكتمل",
      type: "complete",
    },
    {
      date: "2025/09/12",
      action: "مراجعة وتدقيق المستندات وكشف العلامات",
      details:
        "تم التحقق من المعدل التراكمي وتطابق خطة المساقات المنجزة مع شروط التدريب الميداني.",
      owner: "مسؤول التدريب الميداني (أ. رامي محمود)",
      icon: Users,
      status: "مكتمل",
      type: "complete",
    },
    {
      date: "2025/09/14",
      action: "قيد الانتظار لموافقة رئيس القسم الأكاديمي والجهة",
      details:
        "المعاملة حاليا لدى المصادقة وتوقيع كتاب التنسيب الميداني المشترك.",
      owner: "رئيس القسم الأكاديمي (د. سمير خليل)",
      icon: Building2,
      status: "قيد الانتظار",
      type: "waiting",
    },
  ];

  const finalStates = {
    waiting: {
      label: "بانتظار القرار النهائي",
      title: "طلبك لا يزال قيد الاعتماد النهائي",
      description:
        "تم الانتهاء من المراجعة والتدقيق، والطلب حاليا بانتظار المصادقة النهائية من القسم الأكاديمي والجهة المستضيفة.",
      icon: Clock3,
      accent: "#D97706",
      background: "#FFF8ED",
      border: "#F8DDB6",
    },

    accepted: {
      label: "تم القبول النهائي",
      title: "تهانينا! تم قبول طلب تدريبك رسميا لدى شركة القدس للاتصالات",
      description:
        "يرجى تحميل كتاب التنسيب الميداني الرسمي وتسليمه لمشرف التدريب بالشركة في موعد أقصاه 20/09/2025 لبدء فترة التدريب المقررة.",
      icon: CheckCircle2,
      accent: "#16A34A",
      background: "#F0FDF4",
      border: "#BBF7D0",
    },

    revision: {
      label: "مطلوب مراجعة",
      title: "طلبك بحاجة لتعديل المرفقات الرسمية قبل المتابعة",
      description:
        "يرجى إعادة رفع المستند المطلوب بصورة واضحة ومختومة حتى تتمكن لجنة التدريب الميداني من استكمال إجراءات الاعتماد.",
      icon: XCircle,
      accent: "#DC2626",
      background: "#FFF1F2",
      border: "#FECDD3",
    },
  };

  const currentDecision =
    finalStates[requestStatus] || finalStates.waiting;

  const DecisionIcon = currentDecision.icon;

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
      <Sidebar />

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
        {/* HEADER */}
        <div className="relative shrink-0">
          <Header />

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

            <span className="font-bold text-[#09379A]">
              متابعة حالة الطلب
            </span>
          </div>
        </div>

        {/* CONTENT */}
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
                TRACKING TIMELINE
            ====================================== */}
            <section
              className="
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                px-[28px]
                py-[25px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-[16px]
                "
              >
                <h1
                  className="
                    m-0
                    text-[25px]
                    leading-[36px]
                    font-bold
                    text-[#14213D]
                  "
                >
                  مسار مراحل الاعتماد والتدقيق
                </h1>

                <span
                  className="
                    h-[25px]
                    px-[10px]
                    rounded-[12px]
                    bg-[#FFF2E8]
                    text-[#F97316]
                    flex
                    items-center
                    gap-[6px]
                    text-[10px]
                    font-medium
                  "
                >
                  <span
                    className="
                      w-[6px]
                      h-[6px]
                      rounded-full
                      bg-[#F97316]
                    "
                  />

                  الطلب قيد الانتظار الآن
                </span>
              </div>

              <div className="mt-[27px] relative">
                <div
                  className="
                    absolute
                    top-[20px]
                    right-[12%]
                    left-[12%]
                    h-[3px]
                    bg-[#DCE5F2]
                  "
                />

                <div
                  className="
                    absolute
                    top-[20px]
                    right-[12%]
                    w-[51%]
                    h-[3px]
                    bg-[#09379A]
                  "
                />

                <div
                  className="
                    relative
                    grid
                    grid-cols-4
                  "
                >
                  {timeline.map((step) => (
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
                          w-[42px]
                          h-[42px]
                          rounded-full
                          flex
                          items-center
                          justify-center
                          relative
                          z-10
                          text-[13px]
                          font-bold

                          ${
                            step.state === "completed"
                              ? `
                                bg-[#09379A]
                                text-white
                                border-[4px]
                                border-[#EEF3FF]
                              `
                              : step.state === "current"
                              ? `
                                bg-white
                                text-[#09379A]
                                border-[5px]
                                border-[#C5D6F7]
                                shadow-[0_0_0_2px_#09379A]
                              `
                              : `
                                bg-white
                                text-[#94A3B8]
                                border-2
                                border-[#CBD5E1]
                              `
                          }
                        `}
                      >
                        {step.state === "completed" ? (
                          <Check size={18} strokeWidth={2.2} />
                        ) : (
                          step.number
                        )}
                      </div>

                      <h3
                        className={`
                          m-0
                          mt-[8px]
                          text-[12px]
                          font-bold

                          ${
                            step.state === "current"
                              ? "text-[#09379A]"
                              : "text-[#475569]"
                          }
                        `}
                      >
                        {step.title}
                      </h3>

                      {step.date && (
                        <span
                          dir="ltr"
                          className="
                            mt-[2px]
                            text-[9px]
                            text-[#94A3B8]
                          "
                        >
                          {step.date}
                        </span>
                      )}

                      {step.state === "completed" && (
                        <span
                          className="
                            mt-[4px]
                            h-[20px]
                            px-[8px]
                            rounded-[10px]
                            bg-[#EDF3FF]
                            text-[#09379A]
                            flex
                            items-center
                            text-[9px]
                            font-bold
                          "
                        >
                          مكتمل
                        </span>
                      )}

                      {step.state === "current" && (
                        <span
                          className="
                            mt-[4px]
                            h-[20px]
                            px-[8px]
                            rounded-[10px]
                            bg-[#FFF0E7]
                            text-[#F97316]
                            flex
                            items-center
                            text-[9px]
                            font-bold
                          "
                        >
                          المرحلة الحالية
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =====================================
                PAGE TITLE / ACTIONS
            ====================================== */}
            <section
              className="
                mt-[28px]
                flex
                items-start
                justify-between
                gap-[18px]
              "
            >
              <div>
                <h2
                  className="
                    m-0
                    text-[24px]
                    leading-[34px]
                    font-bold
                    text-[#14213D]
                  "
                >
                  متابعة حالة الطلب
                </h2>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[11px]
                    text-[#64748B]
                  "
                >
                  تتبع مسار طلب التدريب الميداني والاعتمادات
                  الأكاديمية والمؤسسية في الوقت الفعلي
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
                    h-[36px]
                    px-[13px]
                    rounded-[8px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    text-[#334155]
                    flex
                    items-center
                    gap-[7px]
                    text-[11px]
                    font-bold
                    hover:bg-[#F8FAFC]
                  "
                >
                  <Printer size={15} />
                  طباعة الإشعار
                </button>

                <button
                  type="button"
                  className="
                    h-[36px]
                    px-[13px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-white
                    flex
                    items-center
                    gap-[7px]
                    text-[11px]
                    font-bold
                    hover:bg-[#072E81]
                  "
                >
                  <HelpCircle size={15} />
                  تواصل مع المشرف
                </button>
              </div>
            </section>

            {/* =====================================
                DETAILS GRID
            ====================================== */}
            <section
              dir="ltr"
              className="
                mt-[18px]
                grid
                grid-cols-1
                lg:grid-cols-[320px_minmax(0,1fr)]
                gap-[20px]
                items-start
              "
            >
              {/* LEFT COLUMN */}
              <div
                dir="rtl"
                className="
                  flex
                  flex-col
                  gap-[16px]
                "
              >
                {/* Organization */}
                <article
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
                      items-start
                      gap-[11px]
                    "
                  >
                    <div
                      className="
                        w-[42px]
                        h-[42px]
                        shrink-0
                        rounded-[8px]
                        bg-[#EDF3FF]
                        text-[#09379A]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Building2 size={21} />
                    </div>

                    <div>
                      <h3
                        className="
                          m-0
                          text-[15px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        شركة القدس للاتصالات
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[2px]
                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        الشريك الأكاديمي المعتمد
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-[16px]
                      flex
                      flex-col
                      gap-[10px]
                      text-[10px]
                    "
                  >
                    <div
                      className="
                        flex
                        justify-between
                        gap-[10px]
                      "
                    >
                      <span className="text-[#64748B]">
                        المدينة / المقر
                      </span>

                      <strong className="text-[#334155]">
                        غزة - الرمال الجنوبي
                      </strong>
                    </div>

                    <div
                      className="
                        flex
                        justify-between
                        gap-[10px]
                      "
                    >
                      <span className="text-[#64748B]">
                        ساعات التدريب
                      </span>

                      <strong className="text-[#09379A]">
                        120 ساعة تدريبية
                      </strong>
                    </div>

                    <div
                      className="
                        flex
                        justify-between
                        gap-[10px]
                      "
                    >
                      <span className="text-[#64748B]">
                        طبيعة الدوام
                      </span>

                      <strong className="text-[#334155]">
                        وجاهي (أيام الدوام الرسمي)
                      </strong>
                    </div>
                  </div>

                  <div
                    className="
                      mt-[15px]
                      h-[45px]
                      rounded-[8px]
                      bg-[#EFF4FF]
                      px-[12px]
                      flex
                      items-center
                      gap-[10px]
                    "
                  >
                    <div
                      className="
                        w-[29px]
                        h-[29px]
                        rounded-full
                        bg-[#09379A]
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <UserRound size={14} />
                    </div>

                    <div>
                      <span
                        className="
                          block
                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        المشرف الميداني المعتمد
                      </span>

                      <strong
                        className="
                          block
                          mt-[1px]
                          text-[10px]
                          text-[#1E293B]
                        "
                      >
                        م. إياد النجار
                      </strong>
                    </div>
                  </div>
                </article>

                {/* Attachments */}
                <article
                  className="
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-[18px]
                    py-[17px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <ClipboardCheck
                      size={17}
                      className="text-[#09379A]"
                    />

                    <h3
                      className="
                        m-0
                        text-[13px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      المستندات المرفقة بالطلب
                    </h3>
                  </div>

                  <div
                    className="
                      mt-[12px]
                      flex
                      flex-col
                      gap-[7px]
                    "
                  >
                    <button
                      type="button"
                      className="
                        h-[32px]
                        px-[10px]
                        rounded-[6px]
                        bg-[#F8FAFC]
                        border
                        border-[#EEF2F7]
                        flex
                        items-center
                        justify-between
                        text-[9px]
                        text-[#334155]
                      "
                    >
                      <span className="flex items-center gap-[6px]">
                        <FileText
                          size={13}
                          className="text-[#09379A]"
                        />

                        كشف العلامات الأكاديمي.pdf
                      </span>

                      <CheckCircle2
                        size={13}
                        className="text-[#F97316]"
                      />
                    </button>

                    <button
                      type="button"
                      className="
                        h-[32px]
                        px-[10px]
                        rounded-[6px]
                        bg-[#F8FAFC]
                        border
                        border-[#EEF2F7]
                        flex
                        items-center
                        justify-between
                        text-[9px]
                        text-[#334155]
                      "
                    >
                      <span className="flex items-center gap-[6px]">
                        <FileText
                          size={13}
                          className="text-[#09379A]"
                        />

                        السيرة الذاتية (CV).pdf
                      </span>

                      <CheckCircle2
                        size={13}
                        className="text-[#F97316]"
                      />
                    </button>
                  </div>
                </article>
              </div>

              {/* RIGHT DETAILS */}
              <article
                dir="rtl"
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
                    gap-[12px]
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
                        w-[36px]
                        h-[36px]
                        rounded-[8px]
                        bg-[#EEF3FF]
                        text-[#09379A]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <ClipboardCheck size={18} />
                    </div>

                    <h3
                      className="
                        m-0
                        text-[17px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      تفاصيل الطلب الأكاديمي
                    </h3>
                  </div>

                  <span
                    dir="ltr"
                    className="
                      h-[23px]
                      px-[8px]
                      rounded-[6px]
                      bg-[#EFF4FF]
                      text-[#09379A]
                      flex
                      items-center
                      text-[9px]
                      font-bold
                    "
                  >
                    #TR-2025-045
                  </span>
                </div>

                <div
                  className="
                    mt-[20px]
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-[12px]
                  "
                >
                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      رقم الطلب
                    </p>

                    <strong
                      dir="ltr"
                      className="
                        block
                        mt-[6px]
                        text-[11px]
                        text-[#334155]
                      "
                    >
                      #TR-2025-045
                    </strong>
                  </div>

                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      حالة الطلب الحالية
                    </p>

                    <span
                      className="
                        mt-[5px]
                        inline-flex
                        h-[22px]
                        px-[8px]
                        rounded-[10px]
                        bg-[#DFF8FE]
                        text-[#0E7490]
                        items-center
                        gap-[5px]
                        text-[9px]
                        font-bold
                      "
                    >
                      <span
                        className="
                          w-[5px]
                          h-[5px]
                          rounded-full
                          bg-[#06B6D4]
                        "
                      />

                      قيد المراجعة والتدقيق
                    </span>
                  </div>

                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      تاريخ التقديم
                    </p>

                    <strong
                      dir="ltr"
                      className="
                        block
                        mt-[6px]
                        text-[11px]
                        text-[#334155]
                      "
                    >
                      2025/09/10
                    </strong>
                  </div>
                </div>

                <div
                  className="
                    mt-[12px]
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-[12px]
                  "
                >
                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p className="m-0 text-[9px] text-[#94A3B8]">
                      اسم الفرصة التدريبية
                    </p>

                    <strong
                      className="
                        block
                        mt-[6px]
                        text-[11px]
                        text-[#334155]
                      "
                    >
                      تدريب في شركة القدس للاتصالات
                    </strong>
                  </div>

                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p className="m-0 text-[9px] text-[#94A3B8]">
                      جهة التدريب المستضيفة
                    </p>

                    <strong
                      className="
                        block
                        mt-[6px]
                        text-[11px]
                        text-[#334155]
                      "
                    >
                      شركة القدس للاتصالات (Paltel)
                    </strong>
                  </div>

                  <div
                    className="
                      rounded-[9px]
                      bg-[#F8FAFC]
                      px-[13px]
                      py-[12px]
                    "
                  >
                    <p className="m-0 text-[9px] text-[#94A3B8]">
                      التخصص الأكاديمي والمسار
                    </p>

                    <span
                      className="
                        mt-[5px]
                        inline-flex
                        h-[24px]
                        px-[8px]
                        rounded-[7px]
                        bg-[#DFF8FE]
                        text-[#0E7490]
                        items-center
                        gap-[5px]
                        text-[9px]
                        font-bold
                      "
                    >
                      <GraduationCap size={12} />
                      هندسة الاتصالات وشبكات الحاسوب
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-[13px]
                    rounded-[9px]
                    bg-[#F7F9FC]
                    px-[15px]
                    py-[14px]
                  "
                >
                  <p
                    className="
                      m-0
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    الملاحظات الموجهة من المشرف الميداني
                  </p>

                  <p
                    className="
                      m-0
                      mt-[6px]
                      text-[10px]
                      leading-[19px]
                      text-[#475569]
                    "
                  >
                    الطالب مكتمل المتطلبات المبدئية، بانتظار
                    ترشيحه كتاب التنسيب النهائي المشترك بين قسم
                    تكنولوجيا المعلومات وإدارة التدريب في شركة
                    القدس للاتصالات.
                  </p>
                </div>
              </article>
            </section>

            {/* =====================================
                AUDIT TABLE
            ====================================== */}
            <section
              className="
                mt-[22px]
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
                      w-[35px]
                      h-[35px]
                      rounded-[8px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <h2
                      className="
                        m-0
                        text-[17px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      جدول المراجعات وسجل التدقيق
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      السجل الزمني لكافة الموافقات الرسمية
                      والإجراءات المنجزة
                    </p>
                  </div>
                </div>

                <span
                  className="
                    h-[21px]
                    px-[8px]
                    rounded-[10px]
                    bg-[#F1F5F9]
                    text-[#64748B]
                    flex
                    items-center
                    text-[9px]
                  "
                >
                  3 سجلات تدقيق
                </span>
              </div>

              <div
                className="
                  mt-[16px]
                  overflow-x-auto
                "
              >
                <table
                  className="
                    w-full
                    min-w-[760px]
                    border-collapse
                  "
                >
                  <thead>
                    <tr className="bg-[#EFF3FB]">
                      <th
                        className="
                          px-[12px]
                          py-[10px]
                          text-right
                          text-[9px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        التاريخ
                      </th>

                      <th
                        className="
                          px-[12px]
                          py-[10px]
                          text-right
                          text-[9px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        الإجراء والبيان التدقيقي
                      </th>

                      <th
                        className="
                          px-[12px]
                          py-[10px]
                          text-right
                          text-[9px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        المسؤول عن الاعتماد
                      </th>

                      <th
                        className="
                          px-[12px]
                          py-[10px]
                          text-right
                          text-[9px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        حالة الإجراء
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {auditRows.map((row) => {
                      const RowIcon = row.icon;

                      return (
                        <tr
                          key={row.date + row.action}
                          className="
                            border-b
                            border-[#EEF2F7]
                            last:border-b-0
                          "
                        >
                          <td
                            dir="ltr"
                            className="
                              px-[12px]
                              py-[14px]
                              text-[9px]
                              text-[#64748B]
                            "
                          >
                            {row.date}
                          </td>

                          <td className="px-[12px] py-[14px]">
                            <strong
                              className="
                                block
                                text-[10px]
                                text-[#334155]
                              "
                            >
                              {row.action}
                            </strong>

                            <span
                              className="
                                block
                                mt-[3px]
                                max-w-[350px]
                                text-[8px]
                                leading-[15px]
                                text-[#94A3B8]
                              "
                            >
                              {row.details}
                            </span>
                          </td>

                          <td
                            className="
                              px-[12px]
                              py-[14px]
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-[6px]
                                text-[9px]
                                text-[#334155]
                              "
                            >
                              <RowIcon
                                size={13}
                                className="text-[#09379A]"
                              />

                              {row.owner}
                            </div>
                          </td>

                          <td
                            className="
                              px-[12px]
                              py-[14px]
                            "
                          >
                            <span
                              className={`
                                inline-flex
                                h-[22px]
                                px-[9px]
                                rounded-[11px]
                                items-center
                                gap-[5px]
                                text-[9px]
                                font-bold

                                ${
                                  row.type === "complete"
                                    ? `
                                      bg-[#FFF0E7]
                                      text-[#C2410C]
                                    `
                                    : `
                                      bg-[#FFF0E7]
                                      text-[#D97706]
                                    `
                                }
                              `}
                            >
                              {row.type === "complete" ? (
                                <CheckCircle2 size={11} />
                              ) : (
                                <Clock3 size={11} />
                              )}

                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* =====================================
                ACTUAL FINAL DECISION STATE
                بدل Showcase
            ====================================== */}
            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                px-[22px]
                py-[20px]
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
                حالة القرار النهائي
              </h2>

              <p
                className="
                  m-0
                  mt-[2px]
                  text-[9px]
                  text-[#94A3B8]
                "
              >
                تظهر هنا الحالة الفعلية للطلب بحسب نتيجة
                المراجعة والاعتماد
              </p>

              <div
                style={{
                  backgroundColor: currentDecision.background,
                  borderColor: currentDecision.border,
                }}
                className="
                  mt-[16px]
                  rounded-[12px]
                  border
                  px-[20px]
                  py-[20px]
                  flex
                  items-start
                  gap-[15px]
                "
              >
                <div
                  style={{
                    backgroundColor: currentDecision.accent,
                  }}
                  className="
                    w-[45px]
                    h-[45px]
                    shrink-0
                    rounded-full
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <DecisionIcon size={21} />
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    style={{
                      color: currentDecision.accent,
                    }}
                    className="
                      inline-flex
                      h-[22px]
                      px-[8px]
                      rounded-[10px]
                      bg-white/70
                      items-center
                      text-[9px]
                      font-bold
                    "
                  >
                    {currentDecision.label}
                  </span>

                  <h3
                    className="
                      m-0
                      mt-[7px]
                      text-[15px]
                      leading-[24px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    {currentDecision.title}
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[10px]
                      leading-[19px]
                      text-[#64748B]
                    "
                  >
                    {currentDecision.description}
                  </p>

                  {/* ACCEPTED ACTIONS */}
                  {requestStatus === "accepted" && (
                    <div
                      className="
                        mt-[13px]
                        flex
                        flex-wrap
                        items-center
                        gap-[9px]
                      "
                    >
                      <button
                        type="button"
                        className="
                          h-[36px]
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
                        "
                      >
                        <Download size={14} />
                        تحميل كتاب التنسيب
                      </button>

                      <button
                        type="button"
                        className="
                          h-[36px]
                          px-[13px]
                          rounded-[8px]
                          border
                          border-[#D7DEE9]
                          bg-white
                          text-[#334155]
                          flex
                          items-center
                          gap-[7px]
                          text-[10px]
                          font-bold
                        "
                      >
                        <CalendarDays size={14} />
                        الجدول الزمني
                      </button>
                    </div>
                  )}

                  {/* REVISION ACTIONS */}
                  {requestStatus === "revision" && (
                    <div
                      className="
                        mt-[13px]
                        flex
                        flex-wrap
                        items-center
                        gap-[9px]
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/student/apply-training/documents"
                          )
                        }
                        className="
                          h-[36px]
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
                        "
                      >
                        <RefreshCw size={14} />
                        إعادة رفع المستند
                      </button>

                      <button
                        type="button"
                        className="
                          h-[36px]
                          px-[13px]
                          rounded-[8px]
                          border
                          border-[#D7DEE9]
                          bg-white
                          text-[#334155]
                          flex
                          items-center
                          gap-[7px]
                          text-[10px]
                          font-bold
                        "
                      >
                        <Info size={14} />
                        استفسار
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* =====================================
                HELP BAR
            ====================================== */}
            <section
              className="
                mt-[22px]
                min-h-[58px]
                rounded-[10px]
                bg-[#09379A]
                px-[18px]
                py-[10px]
                flex
                items-center
                justify-between
                gap-[15px]
                text-white
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
                    w-[30px]
                    h-[30px]
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Info size={16} />
                </div>

                <div>
                  <h3
                    className="
                      m-0
                      text-[11px]
                      font-bold
                    "
                  >
                    هل لديك استفسار بخصوص مراحل الاعتماد والفرز؟
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[8px]
                      text-white/70
                    "
                  >
                    قسم التدريب الميداني متاح يوميا من 8:00
                    صباحا حتى 2:00 ظهرا لمراجعة المعاملات
                    المتعثرة.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  h-[32px]
                  px-[12px]
                  rounded-[7px]
                  border-0
                  bg-white
                  text-[#09379A]
                  flex
                  items-center
                  gap-[6px]
                  text-[9px]
                  font-bold
                  shrink-0
                "
              >
                <MessageCircle size={13} />
                دليل الطالب الميداني
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}