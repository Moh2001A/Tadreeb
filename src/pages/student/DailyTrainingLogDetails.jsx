import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Edit3,
  Eye,
  FileText,
  Info,
  ListChecks,
  Printer,
  Save,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function DailyTrainingLogDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logId = searchParams.get("id") || "1";

  const [isEditMode, setIsEditMode] =
    useState(false);

  /* =========================================================
     DAILY LOGS DATA
     كل id له بياناته الخاصة
  ========================================================= */

  const logsData = {
    1: {
      id: 1,

      day: "الأحد",

      date: "2025/10/05",

      hours: 6,

      organization:
        "شركة القدس للاتصالات",

      department:
        "قسم الصيانة والشبكات الميدانية • مقر غزة",

      supervisor:
        "م. عماد رضوان",

      academicSupervisor:
        "د. رامي شعبان",

      track:
        "مسار هندسة شبكات وأنظمة اتصالات",

      description:
        "تم العمل على متابعة تركيب الشبكات وتعلم آلية فحص الأجهزة الحديثة واختبار كفاءة خطوط التوصيل النحاسية والألياف الضوئية تحت إشراف مهندس القسم الميداني، بالإضافة إلى مراجعة تذاكر الدعم العالقة عبر البوابة الداخلية.",

      tasks: [
        {
          id: 1,
          title:
            "متابعة تركيب الشبكات",
          description:
            "تم التنفيذ الميداني مع الطاقم الفني",
          category:
            "المهمة الأساسية",
          completed: true,
        },

        {
          id: 2,
          title:
            "تجربة استخدام جهاز الفحص",
          description:
            "جهاز قياس إشارات OTDR والتأكد من نقاط المسار",
          category:
            "كفاءة تطبيقية",
          completed: true,
        },

        {
          id: 3,
          title:
            "الاطلاع على نظام الدعم الفني",
          description:
            "مجدولة للمتابعة الفنية في الأسبوع",
          category:
            "قيد المراجعة",
          completed: false,
        },
      ],

      photo:
        "/training-activity.jpg",

      photoCaption:
        "فحص الكابلات - غرفة الخوادم الرئيسية",

      attachment:
        "تقرير_الفحص_OTDR.pdf",
    },

    2: {
      id: 2,

      day: "الإثنين",

      date: "2025/10/06",

      hours: 5,

      organization:
        "شركة القدس للاتصالات",

      department:
        "قسم الدعم الفني وخدمة العملاء • مقر غزة",

      supervisor:
        "م. عماد رضوان",

      academicSupervisor:
        "د. رامي شعبان",

      track:
        "مسار هندسة شبكات وأنظمة اتصالات",

      description:
        "تمت المشاركة في متابعة عدد من طلبات الدعم الفني الواردة من العملاء، وفحص المشكلات المتعلقة بالاتصال بالشبكة، بالإضافة إلى التعرف على آلية تسجيل الأعطال وتحويلها إلى القسم الفني المختص.",

      tasks: [
        {
          id: 1,
          title:
            "متابعة طلبات الدعم الفني",
          description:
            "مراجعة البلاغات المسجلة من العملاء",
          category:
            "المهمة الأساسية",
          completed: true,
        },

        {
          id: 2,
          title:
            "تحليل أعطال الاتصال",
          description:
            "فحص أسباب انقطاع الخدمة ومشكلات الشبكة",
          category:
            "كفاءة تطبيقية",
          completed: true,
        },

        {
          id: 3,
          title:
            "إعداد ملخص الحالات",
          description:
            "توثيق أبرز الحالات التي تمت متابعتها",
          category:
            "قيد المراجعة",
          completed: false,
        },
      ],

      photo:
        "/training-activity.jpg",

      photoCaption:
        "متابعة الدعم الفني وخدمة العملاء",

      attachment:
        "تقرير_الدعم_الفني.pdf",
    },

    3: {
      id: 3,

      day: "الثلاثاء",

      date: "2025/10/07",

      hours: 4,

      organization:
        "شركة القدس للاتصالات",

      department:
        "قسم التقارير والمتابعة الفنية • مقر غزة",

      supervisor:
        "م. عماد رضوان",

      academicSupervisor:
        "د. رامي شعبان",

      track:
        "مسار هندسة شبكات وأنظمة اتصالات",

      description:
        "تم تجهيز التقارير الفنية الخاصة بالأعمال المنجزة خلال الأسبوع، وتنظيم البيانات المتعلقة بساعات التدريب والملاحظات الفنية، بالإضافة إلى مراجعة نماذج التقارير المعتمدة داخل المؤسسة.",

      tasks: [
        {
          id: 1,
          title:
            "تجهيز التقرير الأسبوعي",
          description:
            "جمع البيانات الخاصة بالأنشطة المنجزة",
          category:
            "المهمة الأساسية",
          completed: true,
        },

        {
          id: 2,
          title:
            "تنظيم بيانات التدريب",
          description:
            "ترتيب الساعات والملاحظات الفنية",
          category:
            "كفاءة تطبيقية",
          completed: true,
        },

        {
          id: 3,
          title:
            "مراجعة نموذج التقرير",
          description:
            "التأكد من مطابقة التقرير للنموذج المعتمد",
          category:
            "مكتمل",
          completed: true,
        },
      ],

      photo:
        "/training-activity.jpg",

      photoCaption:
        "إعداد التقارير الفنية الأسبوعية",

      attachment:
        "التقرير_الأسبوعي_الثلاثاء.pdf",
    },

    4: {
      id: 4,

      day: "الأربعاء",

      date: "2025/10/08",

      hours: 5,

      organization:
        "شركة القدس للاتصالات",

      department:
        "قسم الصيانة والأجهزة • مقر غزة",

      supervisor:
        "م. عماد رضوان",

      academicSupervisor:
        "د. رامي شعبان",

      track:
        "مسار هندسة شبكات وأنظمة اتصالات",

      description:
        "تمت المشاركة في أعمال صيانة عدد من أجهزة الشبكات وفحص التوصيلات الداخلية والتأكد من سلامة المعدات، بالإضافة إلى التعرف على خطوات الصيانة الوقائية المتبعة داخل القسم.",

      tasks: [
        {
          id: 1,
          title:
            "فحص أجهزة الشبكات",
          description:
            "التأكد من سلامة الأجهزة والتوصيلات",
          category:
            "المهمة الأساسية",
          completed: true,
        },

        {
          id: 2,
          title:
            "الصيانة الوقائية",
          description:
            "تنفيذ خطوات الصيانة الدورية للأجهزة",
          category:
            "كفاءة تطبيقية",
          completed: true,
        },

        {
          id: 3,
          title:
            "توثيق أعمال الصيانة",
          description:
            "إعداد ملاحظات حول الأجهزة التي تم فحصها",
          category:
            "قيد المراجعة",
          completed: false,
        },
      ],

      photo:
        "/training-activity.jpg",

      photoCaption:
        "صيانة أجهزة الشبكات والمعدات",

      attachment:
        "تقرير_صيانة_الأجهزة.pdf",
    },
  };

  /* =========================================================
     CURRENT LOG
  ========================================================= */

  const currentLog =
    logsData[logId] || logsData[1];

  /* =========================================================
     TASKS STATE
  ========================================================= */

  const [tasks, setTasks] = useState(
    currentLog.tasks
  );

  const toggleTask = (taskId) => {
    if (!isEditMode) return;

    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
  };

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

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
        <div className="relative shrink-0">
          <Header />
        </div>

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
            xl:pt-[14px]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1080px]
            "
          >
            {/* =================================================
                BREADCRUMB
            ================================================== */}

            <nav
              aria-label="مسار التنقل"
              className="
                flex
                flex-wrap
                items-center
                gap-[7px]
                text-[11px]
                font-medium
                leading-[20px]

                sm:text-[12px]

                xl:text-[13px]
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
                  transition

                  hover:text-[#09379A]
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
                  navigate(
                    "/student/training-profile"
                  )
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  transition

                  hover:text-[#09379A]
                "
              >
                ملفي التدريبي
              </button>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/daily-training-log"
                  )
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  transition

                  hover:text-[#09379A]
                "
              >
                السجل التدريبي اليومي
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
                تفاصيل السجل
              </span>
            </nav>

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <section
              className="
                mt-[7px]
                flex
                flex-col
                gap-4

                md:flex-row
                md:items-start
                md:justify-between
              "
            >
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
                      inline-flex
                      min-h-[25px]
                      items-center
                      rounded-full
                      bg-[#09379A]
                      px-[10px]
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    سجل رقم #{currentLog.id}
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-[#64748B]

                      sm:text-[11px]
                    "
                  >
                    {currentLog.track}
                  </span>
                </div>

                <div
                  className="
                    mt-[8px]
                    flex
                    items-center
                    gap-[9px]
                  "
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.8}
                    className="
                      shrink-0
                      text-[#2563EB]
                    "
                  />

                  <h1
                    className="
                      m-0
                      text-[24px]
                      font-bold
                      leading-[36px]
                      text-[#14213D]

                      sm:text-[26px]

                      xl:text-[28px]
                      xl:leading-[40px]
                    "
                  >
                    تفاصيل السجل التدريبي اليومي
                  </h1>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-[9px]

                  sm:flex-row
                  sm:flex-wrap
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsEditMode(
                      (previous) =>
                        !previous
                    )
                  }
                  className={`
                    flex
                    min-h-[38px]
                    items-center
                    justify-center
                    gap-[7px]
                    rounded-[8px]
                    border
                    px-[13px]
                    text-[10px]
                    font-bold
                    transition

                    sm:text-[11px]

                    ${
                      isEditMode
                        ? `
                          border-[#09379A]
                          bg-[#09379A]
                          text-white
                        `
                        : `
                          border-[#D9E2EC]
                          bg-white
                          text-[#334155]
                          hover:bg-[#F8FAFC]
                        `
                    }
                  `}
                >
                  <Edit3 size={14} />

                  {isEditMode
                    ? "وضع التعديل مفعل"
                    : "تعديل السجل"}
                </button>

                <button
                  type="button"
                  className="
                    flex
                    min-h-[38px]
                    items-center
                    justify-center
                    gap-[7px]
                    rounded-[8px]
                    border
                    border-[#BFD5FF]
                    bg-white
                    px-[13px]
                    text-[10px]
                    font-bold
                    text-[#09379A]
                    transition

                    hover:bg-[#F5F8FF]

                    sm:text-[11px]
                  "
                >
                  <Eye size={14} />

                  عرض السجل الموثق
                </button>
              </div>
            </section>

            {/* =================================================
                CONTENT GRID
            ================================================== */}

            <section
              dir="ltr"
              className="
                mt-5
                grid
                grid-cols-1
                items-start
                gap-5

                lg:grid-cols-[minmax(0,1fr)_320px]

                xl:mt-[24px]
                xl:grid-cols-[minmax(0,1fr)_330px]
                xl:gap-[22px]
              "
            >
              {/* =================================================
                  MAIN COLUMN
              ================================================== */}

              <div
                dir="rtl"
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-5
                "
              >
                {/* COMPANY CARD */}

                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    p-4

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[12px]
                      "
                    >
                      <div
                        className="
                          flex
                          h-[42px]
                          w-[42px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[9px]
                          bg-[#EEF3FF]
                          text-[#09379A]
                        "
                      >
                        <Building2
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <h2
                          className="
                            m-0
                            text-[17px]
                            font-bold
                            text-[#1E293B]

                            sm:text-[18px]
                          "
                        >
                          {currentLog.organization}
                        </h2>

                        <p
                          className="
                            m-0
                            mt-[3px]
                            text-[10px]
                            leading-[18px]
                            text-[#64748B]

                            sm:text-[11px]
                          "
                        >
                          {currentLog.department}
                        </p>
                      </div>
                    </div>

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
                          inline-flex
                          min-h-[27px]
                          items-center
                          rounded-full
                          border
                          border-[#AFC8FA]
                          bg-[#EFF5FF]
                          px-[10px]
                          text-[10px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        توقيع {currentLog.supervisor}
                      </span>

                      <span
                        className="
                          inline-flex
                          min-h-[27px]
                          items-center
                          gap-[5px]
                          rounded-full
                          border
                          border-[#AEE9CA]
                          bg-[#E9FFF2]
                          px-[10px]
                          text-[10px]
                          font-bold
                          text-[#16A34A]
                        "
                      >
                        <CheckCircle2
                          size={12}
                        />

                        معتمد وموثق
                      </span>
                    </div>
                  </div>

                  {/* INFO */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-1
                      gap-3
                      rounded-[10px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      p-3

                      sm:grid-cols-3
                      sm:p-4
                    "
                  >
                    <MiniInfo
                      icon={Clock3}
                      label="المدة التدريبية"
                      value={`${currentLog.hours} ساعات معتمدة`}
                    />

                    <MiniInfo
                      icon={CalendarDays}
                      label="اليوم"
                      value={currentLog.day}
                    />

                    <MiniInfo
                      icon={CalendarDays}
                      label="التاريخ"
                      value={currentLog.date}
                    />
                  </div>
                </section>

                {/* DAY DETAILS */}

                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    p-4

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <ListChecks
                        size={19}
                        className="text-[#2563EB]"
                      />

                      <h2
                        className="
                          m-0
                          text-[17px]
                          font-bold
                          text-[#1E293B]

                          sm:text-[18px]
                        "
                      >
                        تفاصيل اليوم
                      </h2>
                    </div>

                    <span
                      className="
                        w-fit
                        rounded-[7px]
                        bg-[#F1F5F9]
                        px-[9px]
                        py-[5px]
                        text-[10px]
                        text-[#64748B]
                      "
                    >
                      وصف الأنشطة الميدانية والمهام
                      المنفذة خلال اليوم
                    </span>
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-[10px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-4
                      py-4
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[12px]
                        leading-[23px]
                        text-[#475569]

                        sm:text-[13px]
                        sm:leading-[24px]
                      "
                    >
                      {currentLog.description}
                    </p>
                  </div>
                </section>

                {/* TASKS */}

                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    p-4

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <ListChecks
                        size={19}
                        className="text-[#2563EB]"
                      />

                      <h2
                        className="
                          m-0
                          text-[17px]
                          font-bold
                          text-[#1E293B]

                          sm:text-[18px]
                        "
                      >
                        المهام المنجزة
                      </h2>
                    </div>

                    <span
                      className="
                        inline-flex
                        min-h-[27px]
                        w-fit
                        items-center
                        rounded-full
                        bg-[#EEF4FF]
                        px-[10px]
                        text-[10px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      {completedTasks} من{" "}
                      {tasks.length} مكتملة
                    </span>
                  </div>

                  <div
                    className="
                      mt-4
                      flex
                      flex-col
                      gap-[10px]
                    "
                  >
                    {tasks.map((task) => (
                      <article
                        key={task.id}
                        className="
                          flex
                          flex-col
                          gap-3
                          rounded-[10px]
                          border
                          border-[#DDE5EF]
                          bg-white
                          px-[14px]
                          py-[13px]

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-start
                            gap-[12px]

                            sm:items-center
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              toggleTask(
                                task.id
                              )
                            }
                            disabled={
                              !isEditMode
                            }
                            className={`
                              flex
                              h-[21px]
                              w-[21px]
                              shrink-0
                              items-center
                              justify-center
                              rounded-[4px]
                              border

                              ${
                                task.completed
                                  ? `
                                    border-[#2563EB]
                                    bg-[#2563EB]
                                    text-white
                                  `
                                  : `
                                    border-[#CBD5E1]
                                    bg-white
                                    text-transparent
                                  `
                              }

                              ${
                                isEditMode
                                  ? "cursor-pointer"
                                  : "cursor-default"
                              }
                            `}
                          >
                            <Check
                              size={13}
                            />
                          </button>

                          <div className="min-w-0">
                            <h3
                              className="
                                m-0
                                text-[12px]
                                font-bold
                                text-[#1E293B]

                                sm:text-[13px]
                              "
                            >
                              {task.title}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[3px]
                                text-[10px]
                                leading-[18px]
                                text-[#64748B]

                                sm:text-[11px]
                              "
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className="
                            inline-flex
                            min-h-[26px]
                            w-fit
                            items-center
                            rounded-[7px]
                            bg-[#F1F5F9]
                            px-[9px]
                            text-[10px]
                            text-[#64748B]
                          "
                        >
                          {task.category}
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* =================================================
                  SIDE COLUMN
              ================================================== */}

              <aside
                dir="rtl"
                className="
                  flex
                  flex-col
                  gap-4
                "
              >
                {/* APPROVAL */}

                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <CheckCircle2
                      size={17}
                      className="text-[#2563EB]"
                    />

                    <h2
                      className="
                        m-0
                        text-[14px]
                        font-bold
                        text-[#1E293B]

                        sm:text-[15px]
                      "
                    >
                      الاعتماد الأكاديمي
                    </h2>
                  </div>

                  <div
                    className="
                      mt-3
                      rounded-[9px]
                      border
                      border-[#EEF2F7]
                      bg-[#F8FAFC]
                      p-3
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-[8px]
                      "
                    >
                      <strong
                        className="
                          text-[11px]
                          text-[#334155]
                        "
                      >
                        المشرف الأكاديمي:
                      </strong>

                      <span
                        className="
                          rounded-[5px]
                          bg-[#1E293B]
                          px-[8px]
                          py-[4px]
                          text-[9px]
                          text-white
                        "
                      >
                        {
                          currentLog.academicSupervisor
                        }
                      </span>
                    </div>

                    <p
                      className="
                        m-0
                        mt-[10px]
                        rounded-[7px]
                        border
                        border-[#E2E8F0]
                        bg-white
                        px-[10px]
                        py-[10px]
                        text-[10px]
                        leading-[19px]
                        text-[#64748B]

                        sm:text-[11px]
                      "
                    >
                      تمت مراجعة المهام المسجلة
                      وهي مطابقة للخطة التدريبية
                      المعتمدة.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-[10px]

                        sm:text-[11px]
                      "
                    >
                      <span className="text-[#64748B]">
                        إجمالي ساعات الأسبوع:
                      </span>

                      <strong className="text-[#1E293B]">
                        24 / 30 ساعة
                      </strong>
                    </div>

                    <div
                      className="
                        mt-[8px]
                        h-[7px]
                        overflow-hidden
                        rounded-full
                        bg-[#E7ECF3]
                      "
                    >
                      <div
                        className="
                          h-full
                          w-[80%]
                          rounded-full
                          bg-[#2563EB]
                        "
                      />
                    </div>

                    <p
                      className="
                        m-0
                        mt-[6px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      المتبقي لإتمام نصاب الأسبوع
                      الحالي: 6 ساعات
                    </p>
                  </div>
                </section>

                {/* DOCUMENTATION */}

                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    p-4
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
                        items-center
                        gap-[8px]
                      "
                    >
                      <Camera
                        size={17}
                        className="text-[#2563EB]"
                      />

                      <h2
                        className="
                          m-0
                          text-[14px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        توثيق النشاط الميداني
                      </h2>
                    </div>

                    <span
                      className="
                        rounded-[6px]
                        bg-[#F1F5F9]
                        px-[8px]
                        py-[4px]
                        text-[9px]
                        text-[#64748B]
                      "
                    >
                      مرفق 1
                    </span>
                  </div>

                  <div
                    className="
                      relative
                      mt-3
                      h-[170px]
                      overflow-hidden
                      rounded-[9px]
                      bg-[#E2E8F0]

                      lg:h-[150px]
                    "
                  >
                    <img
                      src={currentLog.photo}
                      alt="توثيق النشاط الميداني"
                      className="
                        h-full
                        w-full
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
                        inset-x-0
                        bottom-0
                        flex
                        items-center
                        justify-between
                        gap-2
                        bg-gradient-to-t
                        from-black/70
                        to-transparent
                        px-3
                        pb-2
                        pt-8
                        text-white
                      "
                    >
                      <span className="text-[9px]">
                        {
                          currentLog.photoCaption
                        }
                      </span>

                      <Eye size={14} />
                    </div>
                  </div>

                  <div
                    className="
                      mt-[10px]
                      flex
                      min-h-[38px]
                      items-center
                      justify-between
                      gap-[10px]
                      rounded-[8px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[10px]
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-[6px]
                      "
                    >
                      <FileText
                        size={14}
                        className="text-[#DC2626]"
                      />

                      <span
                        className="
                          truncate
                          text-[9px]
                          text-[#475569]
                        "
                      >
                        {currentLog.attachment}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        items-center
                        gap-[4px]
                        border-0
                        bg-transparent
                        p-0
                        text-[9px]
                        font-bold
                        text-[#2563EB]
                      "
                    >
                      <Download size={12} />

                      تحميل
                    </button>
                  </div>
                </section>

                {/* NOTICE */}

                <section
                  className="
                    flex
                    items-start
                    gap-[10px]
                    rounded-[12px]
                    bg-[#12395E]
                    px-4
                    py-4
                    text-white
                  "
                >
                  <Info
                    size={17}
                    className="
                      mt-[1px]
                      shrink-0
                      text-[#22D3EE]
                    "
                  />

                  <div>
                    <h3
                      className="
                        m-0
                        text-[11px]
                        font-bold
                        text-[#67E8F9]
                      "
                    >
                      تنويه التدريب الميداني
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[4px]
                        text-[10px]
                        leading-[18px]
                        text-white/80
                      "
                    >
                      يحق للطالب تعديل السجل
                      التدريبي خلال 48 ساعة فقط من
                      وقت الإدخال وقبل إغلاق
                      الاعتماد النهائي.
                    </p>
                  </div>
                </section>
              </aside>
            </section>

            {/* =================================================
                BOTTOM ACTIONS
            ================================================== */}

            <section
              className="
                mt-6
                flex
                flex-col
                gap-3
                border-t
                border-[#DDE5EF]
                pt-5

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-[9px]

                  sm:flex-row
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsEditMode(true)
                  }
                  className="
                    flex
                    min-h-[42px]
                    items-center
                    justify-center
                    gap-[8px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    px-[18px]
                    text-[11px]
                    font-bold
                    text-white

                    hover:bg-[#072E81]
                  "
                >
                  <Edit3 size={15} />

                  تعديل السجل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.print()
                  }
                  className="
                    flex
                    min-h-[42px]
                    items-center
                    justify-center
                    gap-[7px]
                    rounded-[8px]
                    border
                    border-[#D9E2EC]
                    bg-white
                    px-[16px]
                    text-[11px]
                    font-bold
                    text-[#475569]
                  "
                >
                  <Printer size={14} />

                  طباعة السجل
                </button>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={() =>
                      setIsEditMode(false)
                    }
                    className="
                      flex
                      min-h-[42px]
                      items-center
                      justify-center
                      gap-[7px]
                      rounded-[8px]
                      border
                      border-[#B7E3C8]
                      bg-[#F0FDF4]
                      px-[16px]
                      text-[11px]
                      font-bold
                      text-[#16A34A]
                    "
                  >
                    <Save size={14} />

                    حفظ التعديلات
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/daily-training-log"
                  )
                }
                className="
                  flex
                  min-h-[40px]
                  items-center
                  justify-center
                  gap-[7px]
                  rounded-[8px]
                  border
                  border-[#D9E2EC]
                  bg-white
                  px-[14px]
                  text-[11px]
                  font-bold
                  text-[#475569]

                  hover:bg-[#F8FAFC]
                "
              >
                <ArrowRight size={14} />

                رجوع
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   MINI INFO
========================================================= */

function MiniInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-[10px]
        rounded-[8px]
        bg-white
        px-3
        py-3

        sm:bg-transparent
        sm:px-0
        sm:py-0
      "
    >
      <div
        className="
          flex
          h-[34px]
          w-[34px]
          shrink-0
          items-center
          justify-center
          rounded-[8px]
          border
          border-[#E2E8F0]
          bg-white
          text-[#64748B]
        "
      >
        <Icon
          size={16}
          strokeWidth={1.7}
        />
      </div>

      <div className="min-w-0">
        <p
          className="
            m-0
            text-[9px]
            font-medium
            text-[#94A3B8]

            sm:text-[10px]
          "
        >
          {label}
        </p>

        <strong
          className="
            mt-[3px]
            block
            text-[11px]
            font-bold
            text-[#1E293B]

            sm:text-[12px]
          "
        >
          {value}
        </strong>
      </div>
    </div>
  );
}