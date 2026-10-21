import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Check,
  CheckCircle2,
  GraduationCap,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Evaluation() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("student");

  const [ratings, setRatings] = useState({
    content: 4.5,
    trainer: 4,
    practical: 4,
    attendance: 5,
  });

  const [notes, setNotes] = useState("");

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const maxNotesLength = 900;

  const trainerEvaluation = {
    score: 4,
    max: 5,
    percentage: 80,
    supervisor: "م. سارة خليل",
    organization: "شركة القدس للاتصالات",
    note:
      "أظهر الطالب التزاما جيدا واهتماما بالتعلم، يحتاج إلى المزيد من التدريب العملي في إدارة السيرفرات الميدانية.",
  };

  const studentAverage = useMemo(() => {
    const values = Object.values(ratings);

    const sum = values.reduce(
      (total, current) => total + current,
      0
    );

    return (sum / values.length).toFixed(1);
  }, [ratings]);

  const evaluationItems = [
    {
      key: "content",
      title: "محتوى الدورة",
      description:
        "ملاءمة العناصر النظرية والتطبيق العملي للمهمة",
    },
    {
      key: "trainer",
      title: "أسلوب المدرب",
      description:
        "وضوح الشرح، التوجيه المستمر، والتفاعل الإيجابي",
    },
    {
      key: "practical",
      title: "التطبيق العملي",
      description:
        "وفرة المعدات، المختبرات والتجربة الميدانية الحقيقية",
    },
    {
      key: "attendance",
      title: "الالتزام والحضور",
      description:
        "انضباط مواعيد الورش وتوافر الكادر الإشرافي",
    },
  ];

  const handleRatingChange = (key, value) => {
    if (isSubmitted) return;

    setRatings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleConfirmSubmit = () => {
    setIsSubmitted(true);
    setShowConfirmModal(false);

    console.log({
      ratings,
      notes,
      average: studentAverage,
      status: "submitted",
    });
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
        <Header />

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
          <div className="w-full max-w-[1080px] mx-auto">

            {/* =========================
                BREADCRUMB
            ========================== */}
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
                التقييم
              </span>
            </div>

            {/* =========================
                PAGE HEADER
            ========================== */}
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
                <div
                  className="
                    flex
                    items-center
                    gap-[10px]
                    flex-wrap
                  "
                >
                  <h1
                    className="
                      m-0
                      text-[29px]
                      leading-[40px]
                      font-bold
                      text-[#14213D]
                    "
                  >
                    التقييم الأكاديمي والميداني
                  </h1>

                  <span
                    className="
                      h-[25px]
                      px-[10px]
                      rounded-[12px]
                      border
                      border-[#BAE6FD]
                      bg-[#EFFAFF]
                      text-[#0369A1]
                      flex
                      items-center
                      text-[9px]
                      font-bold
                    "
                  >
                    الفصل الأول 2025/2026
                  </span>
                </div>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[12px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  استعراض تقييم المشرف الميداني المعتمد
                  وتقديم التقييم النهائي للدورة التدريبية
                </p>
              </div>

              <div
                className="
                  h-[34px]
                  px-[12px]
                  rounded-[8px]
                  border
                  border-[#BFDBFE]
                  bg-[#F8FBFF]
                  text-[#09379A]
                  flex
                  items-center
                  gap-[7px]
                  text-[9px]
                  font-bold
                "
              >
                <CheckCircle2
                  size={14}
                  strokeWidth={1.8}
                />

                {isSubmitted
                  ? "تم اعتماد التقييم"
                  : "السجل الأكاديمي مكتمل جزئيا"}
              </div>
            </section>

            {/* =========================
                TRAINING SUMMARY
            ========================== */}
            <section
              className="
                mt-[24px]
                min-h-[115px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-[22px]
                py-[18px]
                flex
                items-center
                justify-between
                gap-[20px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[14px]
                  min-w-0
                "
              >
                <div
                  className="
                    w-[50px]
                    h-[50px]
                    rounded-[10px]
                    bg-[#EEF3FF]
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Building2
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                      flex-wrap
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
                      شركة القدس للاتصالات
                    </h2>

                    <span
                      className="
                        h-[23px]
                        px-[8px]
                        rounded-[6px]
                        bg-[#EEF4FF]
                        text-[#2563EB]
                        flex
                        items-center
                        text-[8px]
                        font-medium
                      "
                    >
                      هندسة الاتصالات
                    </span>
                  </div>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    برنامج التدريب العملي المعتمد لدى كلية
                    الدراسات المتوسطة
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-stretch
                  gap-[10px]
                "
              >
                <SummaryBlock
                  label="الفترة التدريبية"
                  value="2025/10/01 — 2025/12/01"
                />

                <SummaryBlock
                  label="الساعات المنجزة"
                  value="120 / 120 ساعة"
                  highlighted
                />

                <div
                  className={`
                    min-w-[100px]
                    rounded-[9px]
                    px-[13px]
                    py-[12px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    border

                    ${
                      isSubmitted
                        ? `
                          border-[#A7E6C4]
                          bg-[#F0FDF4]
                        `
                        : `
                          border-[#F7D58B]
                          bg-[#FFFBEB]
                        `
                    }
                  `}
                >
                  <span
                    className={`
                      w-[7px]
                      h-[7px]
                      rounded-full

                      ${
                        isSubmitted
                          ? "bg-[#10B981]"
                          : "bg-[#F59E0B]"
                      }
                    `}
                  />

                  <strong
                    className={`
                      mt-[5px]
                      text-[10px]

                      ${
                        isSubmitted
                          ? "text-[#15803D]"
                          : "text-[#D97706]"
                      }
                    `}
                  >
                    {isSubmitted
                      ? "تم التقييم"
                      : "جاهز للتقييم"}
                  </strong>
                </div>
              </div>
            </section>

            {/* =========================
                TABS
            ========================== */}
            <section
              className="
                mt-[20px]
                border-b
                border-[#DDE5EF]
                flex
                items-end
                gap-[28px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  setActiveTab("student")
                }
                className={`
                  pb-[12px]
                  border-0
                  border-b-[2px]
                  bg-transparent
                  flex
                  items-center
                  gap-[7px]
                  text-[12px]
                  font-bold
                  cursor-pointer
                  transition

                  ${
                    activeTab === "student"
                      ? "border-[#09379A] text-[#1E293B]"
                      : "border-transparent text-[#64748B]"
                  }
                `}
              >
                <GraduationCap
                  size={15}
                  strokeWidth={1.8}
                />

                تقييم الطالب للدورة

                <span
                  className={`
                    h-[21px]
                    px-[7px]
                    rounded-[10px]
                    flex
                    items-center
                    text-[8px]

                    ${
                      isSubmitted
                        ? `
                          bg-[#E9FFF4]
                          text-[#16A34A]
                        `
                        : `
                          bg-[#09379A]
                          text-white
                        `
                    }
                  `}
                >
                  {isSubmitted
                    ? "تم الاعتماد"
                    : "مطلوب منك"}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab("trainer")
                }
                className={`
                  pb-[12px]
                  border-0
                  border-b-[2px]
                  bg-transparent
                  flex
                  items-center
                  gap-[7px]
                  text-[12px]
                  font-bold
                  cursor-pointer
                  transition

                  ${
                    activeTab === "trainer"
                      ? "border-[#09379A] text-[#1E293B]"
                      : "border-transparent text-[#64748B]"
                  }
                `}
              >
                <Check
                  size={15}
                  strokeWidth={2}
                  className="text-[#10B981]"
                />

                تقييم المدرب الميداني

                <span
                  className="
                    h-[20px]
                    px-[7px]
                    rounded-[10px]
                    bg-[#F1F5F9]
                    text-[#64748B]
                    flex
                    items-center
                    text-[8px]
                  "
                >
                  معتمد
                </span>
              </button>
            </section>

            {/* =========================
                STUDENT TAB
            ========================== */}
            {activeTab === "student" ? (
              <section
                dir="ltr"
                className="
                  mt-[22px]
                  grid
                  grid-cols-1
                  lg:grid-cols-[310px_minmax(0,1fr)]
                  gap-[22px]
                  items-start
                "
              >
                {/* TRAINER SUMMARY */}
                <aside
                  dir="rtl"
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    px-[20px]
                    py-[20px]
                    shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-[10px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <ShieldCheck
                        size={18}
                        className="text-[#09379A]"
                      />

                      <h2
                        className="
                          m-0
                          text-[15px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        تقييم المدرب الميداني
                      </h2>
                    </div>

                    <span
                      className="
                        h-[26px]
                        px-[9px]
                        rounded-[12px]
                        border
                        border-[#BFDBFE]
                        bg-[#EFF6FF]
                        text-[#09379A]
                        flex
                        items-center
                        text-[8px]
                        font-bold
                      "
                    >
                      معتمد أكاديميا
                    </span>
                  </div>

                  <div
                    className="
                      mt-[18px]
                      rounded-[10px]
                      bg-[#F8FAFC]
                      border
                      border-[#EEF2F7]
                      px-[16px]
                      py-[18px]
                      text-center
                    "
                  >
                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#64748B]
                      "
                    >
                      الدرجة العامة للتقييم الميداني
                    </p>

                    <div
                      className="
                        mt-[11px]
                        flex
                        items-end
                        justify-center
                        gap-[4px]
                      "
                    >
                      <strong
                        className="
                          text-[35px]
                          leading-[36px]
                          text-[#14213D]
                        "
                      >
                        {trainerEvaluation.score.toFixed(1)}
                      </strong>

                      <span
                        className="
                          mb-[4px]
                          text-[11px]
                          text-[#94A3B8]
                        "
                      >
                        / {trainerEvaluation.max.toFixed(1)}
                      </span>
                    </div>

                    <ReadOnlyStars
                      value={trainerEvaluation.score}
                      size={16}
                    />

                    <span
                      className="
                        inline-flex
                        mt-[9px]
                        h-[22px]
                        px-[9px]
                        rounded-[11px]
                        bg-[#EEF4FF]
                        text-[#09379A]
                        items-center
                        text-[8px]
                        font-bold
                      "
                    >
                      مستوى الأداء: جيد جدا ({trainerEvaluation.percentage}%)
                    </span>
                  </div>

                  <div
                    className="
                      mt-[15px]
                      rounded-[9px]
                      border
                      border-[#D9E7FC]
                      bg-[#F8FBFF]
                      px-[12px]
                      py-[12px]
                      flex
                      items-center
                      gap-[10px]
                    "
                  >
                    <div
                      className="
                        w-[38px]
                        h-[38px]
                        rounded-full
                        bg-[#09379A]
                        text-white
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p
                        className="
                          m-0
                          text-[9px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        المشرف الميداني:{" "}
                        {trainerEvaluation.supervisor}
                      </p>

                      <span
                        className="
                          block
                          mt-[2px]
                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        رئيس قسم هندسة الاتصالات - غزة
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                      mt-[15px]
                      rounded-[9px]
                      bg-[#F8FAFC]
                      border
                      border-[#EEF2F7]
                      px-[13px]
                      py-[13px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-[7px]
                      "
                    >
                      <MessageSquareQuote
                        size={16}
                        className="text-[#09379A]"
                      />

                      <strong
                        className="
                          text-[10px]
                          text-[#09379A]
                        "
                      >
                        ملاحظات المدرب الميداني
                      </strong>
                    </div>

                    <p
                      className="
                        m-0
                        mt-[8px]
                        text-[9px]
                        leading-[18px]
                        text-[#475569]
                      "
                    >
                      "{trainerEvaluation.note}"
                    </p>
                  </div>
                </aside>

                {/* STUDENT EVALUATION */}
                <section
                  dir="rtl"
                  className="
                    rounded-[14px]
                    border
                    border-[#DDE5EF]
                    bg-white
                    px-[22px]
                    py-[22px]
                    shadow-[0_1px_2px_rgba(15,23,42,0.03)]
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
                        gap-[8px]
                      "
                    >
                      <Star
                        size={20}
                        fill="#F59E0B"
                        className="text-[#F59E0B]"
                      />

                      <h2
                        className="
                          m-0
                          text-[18px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        تقييم الطالب للدورة
                      </h2>
                    </div>

                    <p
                      className="
                        m-0
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {isSubmitted
                        ? "تم اعتماد التقييم النهائي"
                        : "يمكنك التقييم بنصف نجمة من 0.5 إلى 5"}
                    </p>
                  </div>

                  {/* SUBMITTED STATE */}
                  {isSubmitted && (
                    <div
                      className="
                        mt-[18px]
                        rounded-[10px]
                        border
                        border-[#A7E6C4]
                        bg-[#F0FDF4]
                        px-[16px]
                        py-[14px]
                        flex
                        items-start
                        gap-[10px]
                      "
                    >
                      <div
                        className="
                          w-[32px]
                          h-[32px]
                          rounded-full
                          bg-[#16A34A]
                          text-white
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <Check
                          size={17}
                          strokeWidth={2.2}
                        />
                      </div>

                      <div>
                        <h3
                          className="
                            m-0
                            text-[12px]
                            font-bold
                            text-[#15803D]
                          "
                        >
                          تم إرسال التقييم النهائي واعتماده
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
                          تم حفظ تقييمك بنجاح. بعد الاعتماد
                          النهائي لا يمكن تعديل الدرجات أو
                          الملاحظات.
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className="
                      mt-[20px]
                      flex
                      flex-col
                      gap-[12px]
                    "
                  >
                    {evaluationItems.map(
                      (item) => (
                        <EvaluationRow
                          key={item.key}
                          title={item.title}
                          description={item.description}
                          value={ratings[item.key]}
                          disabled={isSubmitted}
                          onChange={(value) =>
                            handleRatingChange(
                              item.key,
                              value
                            )
                          }
                        />
                      )
                    )}
                  </div>

                  {/* AVERAGE */}
                  <div
                    className="
                      mt-[16px]
                      rounded-[9px]
                      border
                      border-[#E7ECF2]
                      bg-[#F8FAFC]
                      px-[16px]
                      py-[13px]
                      flex
                      items-center
                      justify-between
                      gap-[15px]
                    "
                  >
                    <div>
                      <p
                        className="
                          m-0
                          text-[9px]
                          text-[#64748B]
                        "
                      >
                        متوسط تقييمك
                      </p>

                      <strong
                        className="
                          block
                          mt-[3px]
                          text-[18px]
                          text-[#1E293B]
                        "
                      >
                        {studentAverage}

                        <span
                          className="
                            mr-[4px]
                            text-[9px]
                            text-[#94A3B8]
                          "
                        >
                          / 5
                        </span>
                      </strong>
                    </div>

                    <ReadOnlyStars
                      value={Number(studentAverage)}
                      size={18}
                      color="#FBBF24"
                    />
                  </div>

                  {/* NOTES */}
                  <div className="mt-[18px]">
                    <div
                      className="
                        mb-[7px]
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <label
                        className="
                          text-[10px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        ملاحظات إضافية
                      </label>

                      <span
                        className="
                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        {notes.length} / {maxNotesLength}
                      </span>
                    </div>

                    <textarea
                      value={notes}
                      disabled={isSubmitted}
                      onChange={(event) => {
                        if (
                          event.target.value.length <=
                          maxNotesLength
                        ) {
                          setNotes(event.target.value);
                        }
                      }}
                      placeholder="اكتب ملاحظاتك أو مقترحاتك حول بيئة ومحتوى التدريب..."
                      className={`
                        w-full
                        min-h-[105px]
                        resize-none
                        rounded-[8px]
                        border
                        px-[13px]
                        py-[11px]
                        outline-none
                        font-['Cairo']
                        text-[10px]
                        leading-[19px]
                        transition

                        ${
                          isSubmitted
                            ? `
                              border-[#E2E8F0]
                              bg-[#F8FAFC]
                              text-[#64748B]
                              cursor-not-allowed
                            `
                            : `
                              border-[#D9E2EC]
                              bg-white
                              text-[#334155]
                              focus:border-[#09379A]
                              focus:ring-2
                              focus:ring-[#09379A]/10
                            `
                        }
                      `}
                    />
                  </div>

                  {/* ACTIONS */}
                  <div
                    className="
                      mt-[22px]
                      pt-[17px]
                      border-t
                      border-[#EEF2F7]
                    "
                  >
                    {!isSubmitted ? (
                      <div
                        className="
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
                            gap-[8px]
                            text-[8px]
                            text-[#64748B]
                          "
                        >
                          <span
                            className="
                              w-[7px]
                              h-[7px]
                              rounded-full
                              bg-[#10B981]
                            "
                          />

                          حالة المسودة: محفوظة تلقائيا
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
                            onClick={() => {
                              setRatings({
                                content: 0,
                                trainer: 0,
                                practical: 0,
                                attendance: 0,
                              });

                              setNotes("");
                            }}
                            className="
                              h-[40px]
                              px-[14px]
                              border-0
                              bg-transparent
                              text-[#64748B]
                              text-[10px]
                              font-medium
                              cursor-pointer
                              transition
                              hover:text-[#09379A]
                            "
                          >
                            إعادة تعيين التقييم
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmModal(true)
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
                              shadow-[0_3px_7px_rgba(9,55,154,0.15)]
                              transition
                              hover:bg-[#072E81]
                            "
                          >
                            <Check
                              size={15}
                              strokeWidth={2}
                            />

                            إرسال التقييم النهائي واعتماده
                          </button>
                        </div>
                      </div>
                    ) : (
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
                            text-[9px]
                            font-medium
                            text-[#15803D]
                          "
                        >
                          <CheckCircle2
                            size={15}
                          />

                          تم اعتماد تقييمك النهائي بنجاح
                        </div>

                        <span
                          className="
                            text-[8px]
                            text-[#94A3B8]
                          "
                        >
                          حالة التقييم: معتمد
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              </section>
            ) : (
              /* =========================
                  TRAINER TAB
              ========================== */
              <section
                className="
                  mt-[22px]
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  px-[24px]
                  py-[24px]
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
                    size={19}
                    className="text-[#09379A]"
                  />

                  <h2
                    className="
                      m-0
                      text-[17px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    تقييم المدرب الميداني
                  </h2>
                </div>

                <p
                  className="
                    m-0
                    mt-[8px]
                    text-[10px]
                    text-[#64748B]
                  "
                >
                  تم اعتماد تقييم المدرب الميداني وإرساله
                  إلى منسق الكلية الأكاديمي.
                </p>

                <div
                  className="
                    mt-[20px]
                    max-w-[420px]
                    rounded-[10px]
                    border
                    border-[#EEF2F7]
                    bg-[#F8FAFC]
                    px-[18px]
                    py-[18px]
                  "
                >
                  <p
                    className="
                      m-0
                      text-[9px]
                      text-[#64748B]
                    "
                  >
                    الدرجة النهائية
                  </p>

                  <strong
                    className="
                      block
                      mt-[7px]
                      text-[28px]
                      text-[#14213D]
                    "
                  >
                    {trainerEvaluation.score.toFixed(1)}

                    <span
                      className="
                        mr-[4px]
                        text-[11px]
                        text-[#94A3B8]
                      "
                    >
                      / 5
                    </span>
                  </strong>

                  <div className="mt-[10px]">
                    <ReadOnlyStars
                      value={trainerEvaluation.score}
                      size={18}
                      color="#09379A"
                    />
                  </div>

                  <p
                    className="
                      m-0
                      mt-[12px]
                      text-[9px]
                      leading-[18px]
                      text-[#475569]
                    "
                  >
                    {trainerEvaluation.note}
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* =========================
          CONFIRMATION MODAL
      ========================== */}
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
              max-w-[430px]
              rounded-[16px]
              bg-white
              border
              border-[#E2E8F0]
              shadow-[0_20px_60px_rgba(15,23,42,0.18)]
              p-[22px]
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
                  items-start
                  gap-[11px]
                "
              >
                <div
                  className="
                    w-[38px]
                    h-[38px]
                    rounded-[10px]
                    bg-[#EEF4FF]
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <CheckCircle2
                    size={19}
                  />
                </div>

                <div>
                  <h3
                    className="
                      m-0
                      text-[16px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    تأكيد إرسال التقييم
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[4px]
                      text-[10px]
                      leading-[18px]
                      text-[#64748B]
                    "
                  >
                    هل أنت متأكد من إرسال التقييم
                    النهائي واعتماده؟
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowConfirmModal(false)
                }
                className="
                  w-[30px]
                  h-[30px]
                  rounded-[7px]
                  border-0
                  bg-[#F8FAFC]
                  text-[#64748B]
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:bg-[#EEF2F7]
                "
              >
                <X size={15} />
              </button>
            </div>

            <div
              className="
                mt-[18px]
                rounded-[9px]
                border
                border-[#F6D58A]
                bg-[#FFFBEB]
                px-[13px]
                py-[11px]
              "
            >
              <p
                className="
                  m-0
                  text-[9px]
                  leading-[17px]
                  text-[#92400E]
                "
              >
                بعد الإرسال النهائي لن تتمكن من تعديل
                التقييم أو الملاحظات.
              </p>
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
                onClick={handleConfirmSubmit}
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

                تأكيد الإرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SUMMARY BLOCK
========================================================= */

function SummaryBlock({
  label,
  value,
  highlighted = false,
}) {
  return (
    <div
      className={`
        min-w-[140px]
        rounded-[9px]
        px-[14px]
        py-[12px]

        ${
          highlighted
            ? `
              border
              border-[#D7E5FF]
              bg-[#F6F9FF]
            `
            : `
              bg-[#F8FAFC]
              border
              border-[#EEF2F7]
            `
        }
      `}
    >
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
          mt-[5px]
          text-[10px]

          ${
            highlighted
              ? "text-[#09379A]"
              : "text-[#334155]"
          }
        `}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   EVALUATION ROW
========================================================= */

function EvaluationRow({
  title,
  description,
  value,
  onChange,
  disabled = false,
}) {
  const [hoverValue, setHoverValue] =
    useState(null);

  const visibleValue =
    !disabled && hoverValue !== null
      ? hoverValue
      : value;

  return (
    <div
      className={`
        min-h-[70px]
        rounded-[9px]
        border
        border-[#E7ECF2]
        px-[16px]
        py-[13px]
        flex
        items-center
        justify-between
        gap-[20px]

        ${
          disabled
            ? "bg-[#F8FAFC]"
            : "bg-[#FAFBFC]"
        }
      `}
    >
      <div>
        <h3
          className="
            m-0
            text-[12px]
            font-bold
            text-[#334155]
          "
        >
          {title}
        </h3>

        <p
          className="
            m-0
            mt-[3px]
            text-[8px]
            text-[#94A3B8]
          "
        >
          {description}
        </p>
      </div>

      <div
        dir="ltr"
        className="
          flex
          items-center
          gap-[10px]
          shrink-0
        "
      >
        <div
          className="
            flex
            items-center
            gap-[3px]
          "
          onMouseLeave={() => {
            if (!disabled) {
              setHoverValue(null);
            }
          }}
        >
          {[1, 2, 3, 4, 5].map(
            (starNumber) => (
              <HalfStarInput
                key={starNumber}
                starNumber={starNumber}
                value={visibleValue}
                disabled={disabled}
                onHover={setHoverValue}
                onChange={onChange}
              />
            )
          )}
        </div>

        <span
          className="
            min-w-[40px]
            h-[28px]
            rounded-[5px]
            border
            border-[#DDE5EF]
            bg-white
            flex
            items-center
            justify-center
            text-[9px]
            font-bold
            text-[#475569]
          "
        >
          {Number(visibleValue).toFixed(1)}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   HALF STAR INPUT
========================================================= */

function HalfStarInput({
  starNumber,
  value,
  onHover,
  onChange,
  disabled,
}) {
  const fullValue = starNumber;
  const halfValue = starNumber - 0.5;

  const isFull =
    value >= fullValue;

  const isHalf =
    value >= halfValue &&
    value < fullValue;

  return (
    <div
      className="
        relative
        w-[22px]
        h-[22px]
      "
    >
      <Star
        size={22}
        strokeWidth={1.5}
        fill="#CBD5E1"
        className="
          absolute
          inset-0
          text-[#CBD5E1]
        "
      />

      {isFull && (
        <Star
          size={22}
          strokeWidth={1.5}
          fill="#FBBF24"
          className="
            absolute
            inset-0
            text-[#FBBF24]
          "
        />
      )}

      {isHalf && (
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            w-1/2
          "
        >
          <Star
            size={22}
            strokeWidth={1.5}
            fill="#FBBF24"
            className="
              text-[#FBBF24]
              max-w-none
            "
          />
        </div>
      )}

      {!disabled && (
        <>
          <button
            type="button"
            aria-label={`${halfValue} نجمة`}
            onMouseEnter={() =>
              onHover(halfValue)
            }
            onFocus={() =>
              onHover(halfValue)
            }
            onClick={() =>
              onChange(halfValue)
            }
            className="
              absolute
              left-0
              top-0
              z-10
              w-1/2
              h-full
              border-0
              bg-transparent
              p-0
              cursor-pointer
            "
          />

          <button
            type="button"
            aria-label={`${fullValue} نجوم`}
            onMouseEnter={() =>
              onHover(fullValue)
            }
            onFocus={() =>
              onHover(fullValue)
            }
            onClick={() =>
              onChange(fullValue)
            }
            className="
              absolute
              right-0
              top-0
              z-10
              w-1/2
              h-full
              border-0
              bg-transparent
              p-0
              cursor-pointer
            "
          />
        </>
      )}
    </div>
  );
}

/* =========================================================
   READ ONLY STARS
========================================================= */

function ReadOnlyStars({
  value,
  size = 16,
  color = "#09379A",
}) {
  return (
    <div
      dir="ltr"
      className="
        flex
        items-center
        justify-center
        gap-[2px]
      "
    >
      {[1, 2, 3, 4, 5].map(
        (starNumber) => {
          const fullValue = starNumber;
          const halfValue =
            starNumber - 0.5;

          const isFull =
            value >= fullValue;

          const isHalf =
            value >= halfValue &&
            value < fullValue;

          return (
            <div
              key={starNumber}
              className="relative"
              style={{
                width: size,
                height: size,
              }}
            >
              <Star
                size={size}
                strokeWidth={1.5}
                fill="#E2E8F0"
                className="
                  absolute
                  inset-0
                  text-[#E2E8F0]
                "
              />

              {isFull && (
                <Star
                  size={size}
                  strokeWidth={1.5}
                  fill={color}
                  className="
                    absolute
                    inset-0
                  "
                  style={{
                    color,
                  }}
                />
              )}

              {isHalf && (
                <div
                  className="
                    absolute
                    inset-0
                    overflow-hidden
                    w-1/2
                  "
                >
                  <Star
                    size={size}
                    strokeWidth={1.5}
                    fill={color}
                    className="max-w-none"
                    style={{
                      color,
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}