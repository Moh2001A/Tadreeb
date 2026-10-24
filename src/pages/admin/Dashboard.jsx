import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  FileCheck2,
  GraduationCap,
  MapPinned,
  Plus,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     SCROLL TO TASKS
  ========================================================= */

  useEffect(() => {
    if (location.hash === "#tasks") {
      const timer = setTimeout(() => {
        document
          .getElementById("tasks")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  /* =========================================================
     GENERAL STATISTICS
  ========================================================= */

  const statistics = [
    {
      title: "الطلبة في التدريب",
      value: "124",
      description: "طلبة نشطون حاليًا",
      icon: GraduationCap,
      iconBg: "bg-[#EEF3FF]",
      iconColor: "text-[#09379A]",
      path: "/admin/students",
      trend: "+8 هذا الشهر",
    },
    {
      title: "طلبات تحتاج إجراء",
      value: "18",
      description: "بانتظار المراجعة أو الموافقة",
      icon: ClipboardCheck,
      iconBg: "bg-[#FFF5E9]",
      iconColor: "text-[#EA580C]",
      path: "/admin/training-requests",
      trend: "تحتاج متابعة",
    },
    {
      title: "جهات التدريب",
      value: "24",
      description: "جهات تدريب معتمدة",
      icon: Building2,
      iconBg: "bg-[#ECFDF5]",
      iconColor: "text-[#059669]",
      path: "/admin/training-organizations",
      trend: "+3 جهات جديدة",
    },
    {
      title: "الدورات النشطة",
      value: "12",
      description: "دورات مفتوحة أو جارية",
      icon: BookOpen,
      iconBg: "bg-[#F3E8FF]",
      iconColor: "text-[#7E22CE]",
      path: "/admin/courses",
      trend: "24 دورة إجمالًا",
    },
  ];

  /* =========================================================
     ACTION ITEMS
  ========================================================= */

  const actionItems = [
    {
      title: "طلبات تدريب بانتظار المراجعة",
      description:
        "طلبات جديدة تحتاج مراجعة البيانات والمستندات",
      value: "12",
      icon: ClipboardList,
      color: "blue",
      path: "/admin/training-requests",
    },
    {
      title: "موافقات معلقة",
      description:
        "طلبات جاهزة لاتخاذ قرار الموافقة النهائي",
      value: "5",
      icon: ShieldCheck,
      color: "orange",
      path: "/admin/approvals",
    },
    {
      title: "طلبات تسجيل بالدورات",
      description:
        "طلبات تسجيل جديدة تحتاج قبول أو رفض",
      value: "10",
      icon: BookOpen,
      color: "purple",
      path: "/admin/courses/1/registration-requests",
    },
    {
      title: "حالات استثنائية",
      description:
        "حالات تدريب تحتاج مراجعة إدارية",
      value: "3",
      icon: CircleAlert,
      color: "red",
      path: "/admin/exceptions",
    },
  ];

  /* =========================================================
     TRAINING SUMMARY
  ========================================================= */

  const fieldTrainingSummary = [
    {
      label: "فرص التدريب المتاحة",
      value: "32",
      icon: BriefcaseBusiness,
      path: "/admin/training-opportunities",
    },
    {
      label: "مشرفون نشطون",
      value: "18",
      icon: UserRoundCheck,
      path: "/admin/supervisors",
    },
    {
      label: "زيارات ميدانية",
      value: "14",
      icon: MapPinned,
      path: "/admin/visits",
    },
    {
      label: "تقارير نهائية",
      value: "21",
      icon: FileCheck2,
      path: "/admin/final-reports",
    },
  ];

  /* =========================================================
     COURSE SUMMARY
  ========================================================= */

  const courseSummary = [
    {
      label: "إجمالي الدورات",
      value: "24",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      label: "المتدربون",
      value: "186",
      icon: Users,
      path: "/admin/courses",
    },
    {
      label: "بانتظار التسجيل",
      value: "10",
      icon: Clock3,
      path: "/admin/courses/1/registration-requests",
    },
    {
      label: "شهادات جاهزة",
      value: "36",
      icon: Award,
      path: "/admin/course-certificates",
    },
  ];

  /* =========================================================
     LATEST REQUESTS
  ========================================================= */

  const latestRequests = [
    {
      id: "TR-2026-084",
      student: "أحمد خالد محمد",
      college: "كلية الهندسة وتكنولوجيا المعلومات",
      major: "هندسة البرمجيات",
      organization: "شركة التقنية الحديثة",
      date: "2026/10/24",
      status: "قيد المراجعة",
    },
    {
      id: "TR-2026-083",
      student: "سارة محمود علي",
      college: "كلية الاقتصاد والعلوم الإدارية",
      major: "إدارة الأعمال",
      organization: "مؤسسة تطوير الأعمال",
      date: "2026/10/24",
      status: "بانتظار الموافقة",
    },
    {
      id: "TR-2026-082",
      student: "محمد سامي حسن",
      college: "كلية الهندسة وتكنولوجيا المعلومات",
      major: "نظم المعلومات",
      organization: "شركة الاتصالات الفلسطينية",
      date: "2026/10/23",
      status: "مقبول",
    },
    {
      id: "TR-2026-081",
      student: "ريم أحمد يوسف",
      college: "كلية التربية",
      major: "تعليم أساسي",
      organization: "مدرسة الأزهر النموذجية",
      date: "2026/10/23",
      status: "يحتاج تعديل",
    },
  ];

  /* =========================================================
     COLLEGE DISTRIBUTION
  ========================================================= */

  const collegeDistribution = [
    {
      name: "الهندسة وتكنولوجيا المعلومات",
      students: 42,
      percentage: 84,
    },
    {
      name: "الاقتصاد والعلوم الإدارية",
      students: 31,
      percentage: 62,
    },
    {
      name: "العلوم الطبية التطبيقية",
      students: 26,
      percentage: 52,
    },
    {
      name: "التربية",
      students: 17,
      percentage: 34,
    },
    {
      name: "كليات أخرى",
      students: 8,
      percentage: 16,
    },
  ];

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const quickActions = [
    {
      title: "إضافة جهة تدريب",
      description: "تسجيل جهة تدريب جديدة",
      icon: Building2,
      path: "/admin/training-organizations",
    },
    {
      title: "إضافة فرصة تدريب",
      description: "نشر فرصة جديدة للطلبة",
      icon: BriefcaseBusiness,
      path: "/admin/training-opportunities",
    },
    {
      title: "إضافة دورة",
      description: "إنشاء دورة تدريبية جديدة",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      title: "إضافة مشرف",
      description: "تسجيل مشرف جديد",
      icon: UserRoundCheck,
      path: "/admin/supervisors",
    },
  ];

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusStyle = (status) => {
    switch (status) {
      case "مقبول":
        return "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]";

      case "قيد المراجعة":
        return "bg-[#EEF4FF] text-[#09379A] border-[#D7E5FF]";

      case "بانتظار الموافقة":
        return "bg-[#FFF7E6] text-[#C65D00] border-[#FED7AA]";

      case "يحتاج تعديل":
        return "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]";

      default:
        return "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]";
    }
  };

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
        <Header />

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
            md:pb-8
            md:pt-7

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[30px]
          "
        >
          <div className="mx-auto w-full max-w-[1180px]">
            {/* =================================================
                WELCOME BANNER
            ================================================== */}

            <section
              className="
                relative
                overflow-hidden
                rounded-[16px]
                bg-[#09379A]
                px-5
                py-6
                text-white

                sm:px-6
                sm:py-7

                md:px-8

                xl:min-h-[154px]
                xl:px-[36px]
                xl:py-[28px]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -left-[65px]
                  -top-[95px]
                  h-[220px]
                  w-[220px]
                  rounded-full
                  bg-white/[0.05]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-[110px]
                  left-[100px]
                  h-[200px]
                  w-[200px]
                  rounded-full
                  bg-white/[0.04]
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  gap-5

                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div>
                  <p
                    className="
                      m-0
                      text-[11px]
                      font-semibold
                      text-white/75

                      sm:text-[12px]
                    "
                  >
                    لوحة إدارة بوابة التدريب
                  </p>

                  <h1
                    className="
                      m-0
                      mt-[5px]
                      text-[22px]
                      font-bold
                      leading-[34px]
                      text-white

                      sm:text-[24px]

                      lg:text-[26px]
                    "
                  >
                    مرحباً، أ. أحمد محمد
                  </h1>

                  <p
                    className="
                      m-0
                      mt-[6px]
                      max-w-[620px]
                      text-[12px]
                      font-medium
                      leading-[22px]
                      text-white/85

                      sm:text-[13px]
                    "
                  >
                    تابع التدريب الميداني والدورات التدريبية
                    والطلبات والإجراءات التي تحتاج إلى مراجعتك.
                  </p>
                </div>

                <div
                  className="
                    flex
                    w-fit
                    shrink-0
                    items-center
                    gap-[9px]
                    rounded-[10px]
                    border
                    border-white/15
                    bg-white/10
                    px-[14px]
                    py-[10px]
                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      flex
                      h-[34px]
                      w-[34px]
                      items-center
                      justify-center
                      rounded-[8px]
                      bg-white/15
                    "
                  >
                    <CalendarCheck2
                      size={18}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        m-0
                        text-[10px]
                        font-medium
                        text-white/70
                      "
                    >
                      الفصل الحالي
                    </p>

                    <p
                      className="
                        m-0
                        mt-[1px]
                        text-[12px]
                        font-bold
                        text-white
                      "
                    >
                      الفصل الأول 2026/2027
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                STATISTICS
            ================================================== */}

            <section
              className="
                mt-[20px]
                grid
                grid-cols-1
                gap-[12px]

                sm:grid-cols-2

                xl:grid-cols-4
              "
            >
              {statistics.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      navigate(item.path)
                    }
                    className="
                      group
                      min-h-[145px]
                      rounded-[14px]
                      border
                      border-[#DDE5EF]
                      bg-white
                      p-[17px]
                      text-right

                      shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                      transition-all
                      duration-200

                      hover:-translate-y-[2px]
                      hover:border-[#CBD7E7]
                      hover:shadow-[0_8px_22px_rgba(15,23,42,0.06)]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                            m-0
                            text-[11px]
                            font-medium
                            leading-[20px]
                            text-[#64748B]
                          "
                        >
                          {item.title}
                        </p>

                        <strong
                          className="
                            mt-[7px]
                            block
                            text-[28px]
                            font-bold
                            leading-[34px]
                            text-[#14213D]
                          "
                        >
                          {item.value}
                        </strong>

                        <p
                          className="
                            m-0
                            mt-[3px]
                            text-[10px]
                            leading-[18px]
                            text-[#94A3B8]
                          "
                        >
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`
                          flex
                          h-[42px]
                          w-[42px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[10px]

                          ${item.iconBg}
                          ${item.iconColor}
                        `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>

                    <div
                      className="
                        mt-[13px]
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#F1F5F9]
                        pt-[10px]
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        {item.trend}
                      </span>

                      <ChevronLeft
                        size={15}
                        className="
                          text-[#94A3B8]
                          transition-transform
                          group-hover:-translate-x-[2px]
                          group-hover:text-[#09379A]
                        "
                      />
                    </div>
                  </button>
                );
              })}
            </section>

            {/* =================================================
                TASKS
            ================================================== */}

            <section
              id="tasks"
              className="
                scroll-mt-[20px]
                mt-[22px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-4
                py-5
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:px-5

                lg:px-[22px]
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
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <div
                      className="
                        flex
                        h-[34px]
                        w-[34px]
                        items-center
                        justify-center
                        rounded-[8px]
                        bg-[#FFF3EB]
                        text-[#EA580C]
                      "
                    >
                      <ClipboardCheck
                        size={18}
                        strokeWidth={1.8}
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
                      مهام تحتاج إجراء
                    </h2>
                  </div>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[11px]
                      leading-[20px]
                      text-[#64748B]
                    "
                  >
                    الإجراءات المعلقة التي تحتاج إلى مراجعة
                    أو اتخاذ قرار.
                  </p>
                </div>

                <span
                  className="
                    inline-flex
                    min-h-[28px]
                    w-fit
                    items-center
                    rounded-full
                    bg-[#FFF3EB]
                    px-[10px]
                    text-[10px]
                    font-bold
                    text-[#EA580C]
                  "
                >
                  30 إجراء معلق
                </span>
              </div>

              <div
                className="
                  mt-[18px]
                  grid
                  grid-cols-1
                  gap-[10px]

                  sm:grid-cols-2

                  xl:grid-cols-4
                "
              >
                {actionItems.map((item) => (
                  <ActionCard
                    key={item.title}
                    {...item}
                    onClick={() =>
                      navigate(item.path)
                    }
                  />
                ))}
              </div>
            </section>

            {/* =================================================
                FIELD TRAINING + COURSES
            ================================================== */}

            <section
              className="
                mt-[22px]
                grid
                grid-cols-1
                gap-[16px]

                lg:grid-cols-2
              "
            >
              <OverviewCard
                title="التدريب الميداني"
                description="نظرة سريعة على عمليات التدريب الميداني"
                icon={BriefcaseBusiness}
                actionLabel="إدارة التدريب"
                onAction={() =>
                  navigate("/admin/training-requests")
                }
                items={fieldTrainingSummary}
                navigate={navigate}
              />

              <OverviewCard
                title="الدورات التدريبية"
                description="ملخص الدورات والتسجيل والشهادات"
                icon={BookOpen}
                actionLabel="إدارة الدورات"
                onAction={() =>
                  navigate("/admin/courses")
                }
                items={courseSummary}
                navigate={navigate}
              />
            </section>

            {/* =================================================
                LATEST REQUESTS + COLLEGE DISTRIBUTION
            ================================================== */}

            <section
              className="
                mt-[22px]
                grid
                grid-cols-1
                gap-[16px]

                xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.75fr)]
              "
            >
              <div
                className="
                  min-w-0
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[#EEF2F7]
                    px-4
                    py-[16px]

                    sm:px-[20px]
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
                      أحدث طلبات التدريب
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[3px]
                        text-[10px]
                        text-[#94A3B8]
                      "
                    >
                      آخر الطلبات التي وصلت للنظام
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/admin/training-requests"
                      )
                    }
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-[5px]
                      border-0
                      bg-transparent
                      text-[10px]
                      font-bold
                      text-[#09379A]
                      transition
                      hover:text-[#072E81]
                    "
                  >
                    عرض الكل
                    <ArrowLeft size={14} />
                  </button>
                </div>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC]">
                        <TableHead>
                          الطالب
                        </TableHead>

                        <TableHead>
                          التخصص
                        </TableHead>

                        <TableHead>
                          جهة التدريب
                        </TableHead>

                        <TableHead>
                          التاريخ
                        </TableHead>

                        <TableHead>
                          الحالة
                        </TableHead>

                        <TableHead>
                          الإجراء
                        </TableHead>
                      </tr>
                    </thead>

                    <tbody>
                      {latestRequests.map(
                        (request) => (
                          <tr
                            key={request.id}
                            className="
                              border-t
                              border-[#EEF2F7]
                              transition
                              hover:bg-[#FBFCFE]
                            "
                          >
                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0
                                    text-[11px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {request.student}
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block
                                    text-[9px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {request.id}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0
                                    max-w-[160px]
                                    text-[10px]
                                    font-medium
                                    leading-[18px]
                                    text-[#475569]
                                  "
                                >
                                  {request.major}
                                </p>

                                <span
                                  className="
                                    mt-[1px]
                                    block
                                    max-w-[170px]
                                    truncate
                                    text-[9px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {request.college}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  text-[10px]
                                  text-[#475569]
                                "
                              >
                                {request.organization}
                              </span>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  whitespace-nowrap
                                  text-[10px]
                                  text-[#64748B]
                                "
                              >
                                {request.date}
                              </span>
                            </TableCell>

                            <TableCell>
                              <span
                                className={`
                                  inline-flex
                                  min-h-[25px]
                                  items-center
                                  whitespace-nowrap
                                  rounded-full
                                  border
                                  px-[9px]
                                  text-[9px]
                                  font-bold

                                  ${getStatusStyle(
                                    request.status
                                  )}
                                `}
                              >
                                {request.status}
                              </span>
                            </TableCell>

                            <TableCell>
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    "/admin/training-requests"
                                  )
                                }
                                className="
                                  flex
                                  h-[32px]
                                  items-center
                                  gap-[5px]
                                  rounded-[7px]
                                  border
                                  border-[#DCE5F0]
                                  bg-white
                                  px-[9px]
                                  text-[9px]
                                  font-bold
                                  text-[#09379A]
                                  transition

                                  hover:border-[#B7C8E4]
                                  hover:bg-[#F8FAFC]
                                "
                              >
                                عرض
                                <ChevronLeft size={13} />
                              </button>
                            </TableCell>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div
                  className="
                    flex
                    flex-col
                    gap-[10px]
                    p-[12px]

                    md:hidden
                  "
                >
                  {latestRequests.map(
                    (request) => (
                      <article
                        key={request.id}
                        className="
                          rounded-[10px]
                          border
                          border-[#E7ECF2]
                          bg-[#FAFBFC]
                          p-[13px]
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div className="min-w-0">
                            <h3
                              className="
                                m-0
                                text-[12px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {request.student}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]
                                text-[10px]
                                text-[#64748B]
                              "
                            >
                              {request.major}
                            </p>
                          </div>

                          <span
                            className={`
                              inline-flex
                              min-h-[24px]
                              shrink-0
                              items-center
                              rounded-full
                              border
                              px-[8px]
                              text-[9px]
                              font-bold

                              ${getStatusStyle(
                                request.status
                              )}
                            `}
                          >
                            {request.status}
                          </span>
                        </div>

                        <div
                          className="
                            mt-[11px]
                            grid
                            grid-cols-2
                            gap-3
                            border-t
                            border-[#E7ECF2]
                            pt-[10px]
                          "
                        >
                          <MobileInfo
                            label="جهة التدريب"
                            value={
                              request.organization
                            }
                          />

                          <MobileInfo
                            label="التاريخ"
                            value={request.date}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              "/admin/training-requests"
                            )
                          }
                          className="
                            mt-[12px]
                            flex
                            h-[36px]
                            w-full
                            items-center
                            justify-center
                            gap-[6px]
                            rounded-[8px]
                            border
                            border-[#D7E5FF]
                            bg-[#F6F9FF]
                            text-[10px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          عرض الطلب
                          <ChevronLeft size={14} />
                        </button>
                      </article>
                    )
                  )}
                </div>
              </div>

              <div
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  p-[18px]
                  shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                  sm:p-[20px]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
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
                      الطلبة حسب الكلية
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[3px]
                        text-[10px]
                        text-[#94A3B8]
                      "
                    >
                      توزيع طلبة التدريب النشط
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-[36px]
                      w-[36px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                    "
                  >
                    <BarChart3
                      size={18}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-[20px]
                    flex
                    flex-col
                    gap-[16px]
                  "
                >
                  {collegeDistribution.map(
                    (college) => (
                      <div key={college.name}>
                        <div
                          className="
                            mb-[6px]
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <span
                            className="
                              truncate
                              text-[10px]
                              font-medium
                              text-[#475569]
                            "
                          >
                            {college.name}
                          </span>

                          <strong
                            className="
                              shrink-0
                              text-[11px]
                              text-[#1E293B]
                            "
                          >
                            {college.students}
                          </strong>
                        </div>

                        <div
                          className="
                            h-[7px]
                            w-full
                            overflow-hidden
                            rounded-full
                            bg-[#EEF2F7]
                          "
                        >
                          <div
                            className="
                              h-full
                              rounded-full
                              bg-[#09379A]
                            "
                            style={{
                              width: `${college.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div
                  className="
                    mt-[19px]
                    rounded-[9px]
                    border
                    border-[#D7E5FF]
                    bg-[#F6F9FF]
                    px-[12px]
                    py-[11px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[8px]
                    "
                  >
                    <TrendingUp
                      size={16}
                      className="text-[#09379A]"
                    />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      إجمالي الطلبة النشطين: 124 طالبًا
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                QUICK ACTIONS
            ================================================== */}

            <section
              className="
                mt-[22px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                px-4
                py-5
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:px-[20px]
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
                  إجراءات سريعة
                </h2>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  وصول سريع للعمليات الإدارية الأكثر استخدامًا
                </p>
              </div>

              <div
                className="
                  mt-[16px]
                  grid
                  grid-cols-1
                  gap-[10px]

                  sm:grid-cols-2

                  xl:grid-cols-4
                "
              >
                {quickActions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() =>
                        navigate(item.path)
                      }
                      className="
                        group
                        flex
                        min-h-[82px]
                        items-center
                        gap-[12px]
                        rounded-[10px]
                        border
                        border-[#E2E8F0]
                        bg-[#FAFBFC]
                        px-[14px]
                        py-[12px]
                        text-right
                        transition-all
                        duration-200

                        hover:border-[#C9D6E8]
                        hover:bg-white
                        hover:shadow-[0_5px_14px_rgba(15,23,42,0.05)]
                      "
                    >
                      <div
                        className="
                          flex
                          h-[38px]
                          w-[38px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[9px]
                          bg-[#EEF3FF]
                          text-[#09379A]
                        "
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            m-0
                            text-[11px]
                            font-bold
                            text-[#334155]
                          "
                        >
                          {item.title}
                        </p>

                        <span
                          className="
                            mt-[2px]
                            block
                            text-[9px]
                            leading-[17px]
                            text-[#94A3B8]
                          "
                        >
                          {item.description}
                        </span>
                      </div>

                      <Plus
                        size={15}
                        className="
                          shrink-0
                          text-[#94A3B8]
                          transition
                          group-hover:text-[#09379A]
                        "
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  title,
  description,
  value,
  icon: Icon,
  color,
  onClick,
}) {
  const styles = {
    blue: {
      icon: "bg-[#EEF3FF] text-[#09379A]",
      badge: "bg-[#EEF3FF] text-[#09379A]",
    },

    orange: {
      icon: "bg-[#FFF3EB] text-[#EA580C]",
      badge: "bg-[#FFF3EB] text-[#EA580C]",
    },

    purple: {
      icon: "bg-[#F3E8FF] text-[#7E22CE]",
      badge: "bg-[#F3E8FF] text-[#7E22CE]",
    },

    red: {
      icon: "bg-[#FFF1F2] text-[#BE123C]",
      badge: "bg-[#FFF1F2] text-[#BE123C]",
    },
  };

  const selected =
    styles[color] || styles.blue;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        rounded-[10px]
        border
        border-[#E7ECF2]
        bg-[#FAFBFC]
        p-[13px]
        text-right
        transition-all
        duration-200

        hover:border-[#CBD7E7]
        hover:bg-white
        hover:shadow-[0_5px_14px_rgba(15,23,42,0.05)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div
          className={`
            flex
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]

            ${selected.icon}
          `}
        >
          <Icon
            size={17}
            strokeWidth={1.8}
          />
        </div>

        <span
          className={`
            inline-flex
            min-h-[25px]
            min-w-[30px]
            items-center
            justify-center
            rounded-full
            px-[8px]
            text-[10px]
            font-bold

            ${selected.badge}
          `}
        >
          {value}
        </span>
      </div>

      <h3
        className="
          m-0
          mt-[11px]
          text-[11px]
          font-bold
          leading-[19px]
          text-[#334155]
        "
      >
        {title}
      </h3>

      <p
        className="
          m-0
          mt-[3px]
          text-[9px]
          leading-[17px]
          text-[#94A3B8]
        "
      >
        {description}
      </p>

      <div
        className="
          mt-[10px]
          flex
          items-center
          justify-end
          gap-[4px]
          text-[9px]
          font-bold
          text-[#09379A]
        "
      >
        مراجعة

        <ChevronLeft
          size={13}
          className="
            transition-transform
            group-hover:-translate-x-[2px]
          "
        />
      </div>
    </button>
  );
}

/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  items,
  navigate,
}) {
  return (
    <div
      className="
        rounded-[14px]
        border
        border-[#DDE5EF]
        bg-white
        p-[18px]
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]

        sm:p-[20px]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-start
            gap-[10px]
          "
        >
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center
              rounded-[9px]
              bg-[#EEF3FF]
              text-[#09379A]
            "
          >
            <Icon
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2
              className="
                m-0
                text-[15px]
                font-bold
                text-[#1E293B]
              "
            >
              {title}
            </h2>

            <p
              className="
                m-0
                mt-[2px]
                text-[9px]
                leading-[17px]
                text-[#94A3B8]
              "
            >
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAction}
          className="
            flex
            shrink-0
            items-center
            gap-[4px]
            border-0
            bg-transparent
            text-[9px]
            font-bold
            text-[#09379A]
          "
        >
          {actionLabel}

          <ChevronLeft size={13} />
        </button>
      </div>

      <div
        className="
          mt-[17px]
          grid
          grid-cols-2
          gap-[9px]
        "
      >
        {items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                navigate(item.path)
              }
              className="
                group
                flex
                min-h-[78px]
                items-center
                gap-[10px]
                rounded-[9px]
                border
                border-[#EEF2F7]
                bg-[#F8FAFC]
                px-[12px]
                py-[10px]
                text-right
                transition

                hover:border-[#D7E5FF]
                hover:bg-[#F6F9FF]
              "
            >
              <div
                className="
                  flex
                  h-[32px]
                  w-[32px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  bg-white
                  text-[#09379A]
                  shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                "
              >
                <ItemIcon
                  size={15}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <strong
                  className="
                    block
                    text-[18px]
                    leading-[22px]
                    text-[#14213D]
                  "
                >
                  {item.value}
                </strong>

                <span
                  className="
                    mt-[2px]
                    block
                    text-[9px]
                    leading-[16px]
                    text-[#64748B]
                  "
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   TABLE
========================================================= */

function TableHead({ children }) {
  return (
    <th
      className="
        whitespace-nowrap
        px-[14px]
        py-[11px]
        text-right
        text-[9px]
        font-bold
        text-[#64748B]
      "
    >
      {children}
    </th>
  );
}

function TableCell({ children }) {
  return (
    <td
      className="
        px-[14px]
        py-[12px]
        align-middle
      "
    >
      {children}
    </td>
  );
}

/* =========================================================
   MOBILE INFO
========================================================= */

function MobileInfo({
  label,
  value,
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

      <p
        className="
          m-0
          mt-[2px]
          text-[10px]
          font-medium
          leading-[18px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}