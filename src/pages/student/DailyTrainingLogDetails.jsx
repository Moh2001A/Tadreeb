import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  UserRound,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function DailyTrainingLogDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logId = searchParams.get("id") || "1042";

  const [isEditMode, setIsEditMode] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "متابعة تركيب الشبكات",
      description: "تم التنفيذ الميداني مع الطاقم الفني",
      category: "المهمة الأساسية",
      completed: true,
    },
    {
      id: 2,
      title: "تجربة استخدام جهاز الفحص",
      description: "جهاز قياس إشارات OTDR والتأكد من نقاط المسار",
      category: "كفاءة تطبيقية",
      completed: true,
    },
    {
      id: 3,
      title: "الاطلاع على نظام الدعم الفني",
      description: "مجدولة للمتابعة الفنية في الأسبوع",
      category: "قيد المراجعة",
      completed: false,
    },
  ]);

  const toggleTask = (taskId) => {
    if (!isEditMode) return;

    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

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
                  navigate("/student/daily-training-log")
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
                  hover:text-[#09379A]
                "
              >
                طلباتي
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
                متابعة حالة الطلب
              </span>
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section
              className="
                mt-[7px]
                flex
                items-start
                justify-between
                gap-[20px]
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-[9px]
                    flex-wrap
                  "
                >
                  <span
                    className="
                      h-[24px]
                      px-[9px]
                      rounded-[12px]
                      bg-[#09379A]
                      text-white
                      flex
                      items-center
                      text-[9px]
                      font-bold
                    "
                  >
                    سجل رقم #{logId}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-[#64748B]
                    "
                  >
                    مسار هندسة شبكات وأنظمة اتصالات
                  </span>
                </div>

                <div
                  className="
                    mt-[7px]
                    flex
                    items-center
                    gap-[9px]
                  "
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#2563EB]"
                  />

                  <h1
                    className="
                      m-0
                      text-[28px]
                      leading-[40px]
                      font-bold
                      text-[#14213D]
                    "
                  >
                    تفاصيل السجل التدريبي اليومي
                  </h1>
                </div>
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
                  onClick={() =>
                    setIsEditMode((previous) => !previous)
                  }
                  className={`
                    h-[36px]
                    px-[13px]
                    rounded-[8px]
                    border
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    transition

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
                    : "معاينة وضع التعديل (Edit Mode)"}
                </button>

                <button
                  type="button"
                  className="
                    h-[36px]
                    px-[13px]
                    rounded-[8px]
                    border
                    border-[#BFD5FF]
                    bg-white
                    text-[#09379A]
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    hover:bg-[#F5F8FF]
                  "
                >
                  <Eye size={14} />

                  عرض السجل الموثق
                </button>
              </div>
            </section>

            {/* =====================================
                TWO COLUMN LAYOUT
            ====================================== */}
            <section
              dir="ltr"
              className="
                mt-[24px]
                grid
                grid-cols-1
                lg:grid-cols-[minmax(0,1fr)_330px]
                gap-[22px]
                items-start
              "
            >
              {/* =================================
                  MAIN DETAILS COLUMN
              ================================== */}
              <div
                dir="rtl"
                className="
                  min-w-0
                  flex
                  flex-col
                  gap-[20px]
                "
              >
                {/* COMPANY CARD */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
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
                      gap-[18px]
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
                          w-[42px]
                          h-[42px]
                          rounded-[9px]
                          bg-[#EEF3FF]
                          text-[#09379A]
                          flex
                          items-center
                          justify-center
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
                            text-[18px]
                            font-bold
                            text-[#1E293B]
                          "
                        >
                          شركة القدس للاتصالات
                        </h2>

                        <p
                          className="
                            m-0
                            mt-[2px]
                            text-[9px]
                            text-[#94A3B8]
                          "
                        >
                          قسم الصيانة والشبكات الميدانية • مقر غزة
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                        flex-wrap
                      "
                    >
                      <span
                        className="
                          h-[25px]
                          px-[9px]
                          rounded-[12px]
                          border
                          border-[#AFC8FA]
                          bg-[#EFF5FF]
                          text-[#09379A]
                          flex
                          items-center
                          gap-[5px]
                          text-[9px]
                          font-bold
                        "
                      >
                        توقيع م. عماد رضوان
                      </span>

                      <span
                        className="
                          h-[25px]
                          px-[9px]
                          rounded-[12px]
                          border
                          border-[#AEE9CA]
                          bg-[#E9FFF2]
                          text-[#16A34A]
                          flex
                          items-center
                          gap-[5px]
                          text-[9px]
                          font-bold
                        "
                      >
                        <CheckCircle2 size={12} />
                        معتمد وموثق
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                      mt-[18px]
                      rounded-[10px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[18px]
                      py-[16px]
                      grid
                      grid-cols-3
                      gap-[16px]
                    "
                  >
                    <MiniInfo
                      icon={Clock3}
                      label="المدة التدريبية"
                      value="6 ساعات معتمدة"
                    />

                    <MiniInfo
                      icon={CalendarDays}
                      label="اليوم"
                      value="الأحد"
                    />

                    <MiniInfo
                      icon={CalendarDays}
                      label="التاريخ"
                      value="2025/10/05"
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
                    px-[22px]
                    py-[20px]
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
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <ListChecks
                        size={19}
                        strokeWidth={1.8}
                        className="text-[#2563EB]"
                      />

                      <h2
                        className="
                          m-0
                          text-[18px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        تفاصيل اليوم
                      </h2>
                    </div>

                    <span
                      className="
                        h-[25px]
                        px-[9px]
                        rounded-[6px]
                        bg-[#F1F5F9]
                        text-[#64748B]
                        flex
                        items-center
                        text-[9px]
                      "
                    >
                      وصف الأنشطة الميدانية والمهام المنفذة خلال اليوم
                    </span>
                  </div>

                  <div
                    className="
                      mt-[16px]
                      rounded-[10px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[18px]
                      py-[17px]
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[12px]
                        leading-[23px]
                        text-[#475569]
                      "
                    >
                      تم العمل على متابعة تركيب الشبكات وتعلم آلية فحص
                      الأجهزة الحديثة واختبار كفاءة خطوط التوصيل النحاسية
                      والألياف الضوئية تحت إشراف مهندس القسم الميداني،
                      بالإضافة إلى مراجعة تذاكر الدعم العالقة عبر البوابة
                      الداخلية.
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
                    px-[22px]
                    py-[20px]
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
                        gap-[8px]
                      "
                    >
                      <ListChecks
                        size={19}
                        strokeWidth={1.8}
                        className="text-[#2563EB]"
                      />

                      <h2
                        className="
                          m-0
                          text-[18px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        المهام المنجزة
                      </h2>
                    </div>

                    <span
                      className="
                        h-[25px]
                        px-[9px]
                        rounded-[12px]
                        bg-[#EEF4FF]
                        text-[#09379A]
                        flex
                        items-center
                        text-[9px]
                        font-bold
                      "
                    >
                      {completedTasks} من {tasks.length} مكتملة
                    </span>
                  </div>

                  <div
                    className="
                      mt-[15px]
                      flex
                      flex-col
                      gap-[10px]
                    "
                  >
                    {tasks.map((task) => (
                      <article
                        key={task.id}
                        className="
                          min-h-[66px]
                          rounded-[9px]
                          border
                          border-[#DDE5EF]
                          bg-white
                          px-[14px]
                          py-[12px]
                          flex
                          items-center
                          justify-between
                          gap-[14px]
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-[12px]
                            min-w-0
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              toggleTask(task.id)
                            }
                            disabled={!isEditMode}
                            className={`
                              w-[20px]
                              h-[20px]
                              rounded-[4px]
                              border
                              flex
                              items-center
                              justify-center
                              shrink-0

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
                              strokeWidth={2}
                            />
                          </button>

                          <div className="min-w-0">
                            <h3
                              className="
                                m-0
                                text-[11px]
                                font-bold
                                text-[#1E293B]
                              "
                            >
                              {task.title}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]
                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className="
                            h-[24px]
                            px-[9px]
                            rounded-[6px]
                            bg-[#F1F5F9]
                            text-[#64748B]
                            flex
                            items-center
                            text-[8px]
                            whitespace-nowrap
                          "
                        >
                          {task.category}
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* =================================
                  SIDE COLUMN
              ================================== */}
              <aside
                dir="rtl"
                className="
                  flex
                  flex-col
                  gap-[18px]
                "
              >
                {/* ACADEMIC APPROVAL */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    px-[16px]
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
                    <CheckCircle2
                      size={16}
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
                      الاعتماد الأكاديمي
                    </h2>
                  </div>

                  <div
                    className="
                      mt-[13px]
                      rounded-[8px]
                      bg-[#F8FAFC]
                      border
                      border-[#EEF2F7]
                      px-[12px]
                      py-[12px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <strong
                        className="
                          text-[10px]
                          text-[#334155]
                        "
                      >
                        المشرف الأكاديمي:
                      </strong>

                      <span
                        className="
                          h-[22px]
                          px-[8px]
                          rounded-[5px]
                          bg-[#1E293B]
                          text-white
                          flex
                          items-center
                          text-[8px]
                        "
                      >
                        د. رامي شعبان
                      </span>
                    </div>

                    <p
                      className="
                        m-0
                        mt-[10px]
                        rounded-[6px]
                        border
                        border-[#E2E8F0]
                        bg-white
                        px-[10px]
                        py-[9px]
                        text-[9px]
                        leading-[17px]
                        text-[#64748B]
                      "
                    >
                      تمت مراجعة المهام المسجلة وهي مطابقة للخطة التدريبية
                      المعتمدة لقسم الشبكات لشهر أكتوبر.
                    </p>

                    <p
                      dir="ltr"
                      className="
                        m-0
                        mt-[7px]
                        text-[7px]
                        text-[#94A3B8]
                        text-right
                      "
                    >
                      تاريخ المراجعة: 2025/10/06 - 09:30 ص
                    </p>
                  </div>

                  <div
                    className="
                      mt-[14px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        text-[9px]
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
                        rounded-full
                        bg-[#E7ECF3]
                        overflow-hidden
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
                        mt-[5px]
                        text-[7px]
                        text-[#94A3B8]
                      "
                    >
                      المتبقي لإتمام نصاب الأسبوع الحالي: 6 ساعات
                    </p>
                  </div>
                </section>

                {/* ACTIVITY DOCUMENTATION */}
                <section
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    px-[16px]
                    py-[17px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
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
                        h-[21px]
                        px-[7px]
                        rounded-[6px]
                        bg-[#F1F5F9]
                        text-[#64748B]
                        flex
                        items-center
                        text-[8px]
                      "
                    >
                      مرفق 1
                    </span>
                  </div>

                  <div
                    className="
                      mt-[13px]
                      relative
                      w-full
                      h-[150px]
                      rounded-[8px]
                      overflow-hidden
                      bg-[#E2E8F0]
                    "
                  >
                    <img
                      src="/training-activity.jpg"
                      alt="توثيق النشاط الميداني"
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
                        left-[8px]
                        flex
                        items-center
                        justify-between
                        text-white
                      "
                    >
                      <span
                        className="
                          text-[8px]
                          bg-black/45
                          px-[7px]
                          py-[4px]
                          rounded-[5px]
                        "
                      >
                        فحص الكابلات - غرفة الخوادم الرئيسية
                      </span>

                      <Eye size={14} />
                    </div>
                  </div>

                  <div
                    className="
                      mt-[10px]
                      h-[34px]
                      rounded-[7px]
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-[10px]
                      flex
                      items-center
                      justify-between
                      gap-[10px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[6px]
                        min-w-0
                      "
                    >
                      <FileText
                        size={14}
                        className="text-[#DC2626]"
                      />

                      <span
                        dir="ltr"
                        className="
                          text-[8px]
                          text-[#475569]
                          truncate
                        "
                      >
                        تقرير_الفحص_OTDR.pdf
                      </span>
                    </div>

                    <button
                      type="button"
                      className="
                        border-0
                        bg-transparent
                        p-0
                        text-[#2563EB]
                        text-[8px]
                        font-bold
                        cursor-pointer
                      "
                    >
                      تحميل
                    </button>
                  </div>
                </section>

                {/* NOTICE */}
                <section
                  className="
                    rounded-[12px]
                    bg-[#12395E]
                    px-[16px]
                    py-[15px]
                    text-white
                    flex
                    items-start
                    gap-[10px]
                  "
                >
                  <Info
                    size={17}
                    className="
                      text-[#22D3EE]
                      shrink-0
                      mt-[1px]
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
                        text-[8px]
                        leading-[15px]
                        text-white/80
                      "
                    >
                      يحق للطالب تعديل السجل التدريبي خلال 48 ساعة فقط من
                      وقت الإدخال وقبل إغلاق الاعتماد النهائي من إدارة
                      الكلية.
                    </p>
                  </div>
                </section>
              </aside>
            </section>

            {/* =====================================
                BOTTOM ACTIONS
            ====================================== */}
            <section
              className="
                mt-[24px]
                pt-[18px]
                border-t
                border-[#DDE5EF]
                flex
                items-center
                justify-between
                gap-[16px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[10px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsEditMode(true)
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
                    gap-[8px]
                    text-[11px]
                    font-bold
                    cursor-pointer
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
                    h-[42px]
                    px-[16px]
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
                      h-[42px]
                      px-[16px]
                      rounded-[8px]
                      border
                      border-[#B7E3C8]
                      bg-[#F0FDF4]
                      text-[#16A34A]
                      flex
                      items-center
                      gap-[7px]
                      text-[10px]
                      font-bold
                      cursor-pointer
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
                  navigate("/student/daily-training-log")
                }
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
        items-center
        gap-[10px]
      "
    >
      <div
        className="
          w-[34px]
          h-[34px]
          rounded-[8px]
          border
          border-[#E2E8F0]
          bg-white
          text-[#64748B]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon
          size={16}
          strokeWidth={1.7}
        />
      </div>

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

        <strong
          className="
            block
            mt-[3px]
            text-[11px]
            text-[#1E293B]
          "
        >
          {value}
        </strong>
      </div>
    </div>
  );
}