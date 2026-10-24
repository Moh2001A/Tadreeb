import { useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPinned,
  Plus,
  Search,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   DATA
========================================================= */

const initialVisits = [
  {
    id: 1,
    code: "VIS-2026-041",

    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    organization:
      "شركة التقنية المتقدمة",

    opportunity:
      "مطور برمجيات متدرب",

    academicSupervisor:
      "د. سامر يوسف",

    fieldSupervisor:
      "م. محمد حمدي",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    visitType: "زيارة دورية",

    scheduledDate: "2026-10-28",

    scheduledTime: "10:00",

    status: "مجدولة",

    location:
      "مقر شركة التقنية المتقدمة",

    visitReport: "",

    attendanceConfirmed: false,

    supervisorFeedback: "",

    studentProgress: "",

    recommendations: "",

    createdAt: "2026-10-22",
  },

  {
    id: 2,
    code: "VIS-2026-040",

    studentId: "20231234",
    student: "محمد سامي حسن",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "نظم المعلومات",

    organization:
      "شركة الاتصالات الفلسطينية",

    opportunity:
      "دعم الأنظمة والشبكات",

    academicSupervisor:
      "د. أحمد نصار",

    fieldSupervisor:
      "م. خالد يوسف",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    visitType: "زيارة دورية",

    scheduledDate: "2026-10-25",

    scheduledTime: "11:30",

    status: "بانتظار التقرير",

    location:
      "مقر شركة الاتصالات الفلسطينية",

    visitReport: "",

    attendanceConfirmed: true,

    supervisorFeedback:
      "الطالب ملتزم ويظهر تقدمًا جيدًا في المهام.",

    studentProgress:
      "أنجز المهام المطلوبة حتى الآن بصورة جيدة.",

    recommendations:
      "الاستمرار في منحه مهام تحليل الأنظمة.",

    createdAt: "2026-10-20",
  },

  {
    id: 3,
    code: "VIS-2026-039",

    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    organization: "بنك فلسطين",

    opportunity:
      "تدريب إداري ومالي",

    academicSupervisor:
      "د. ليلى أحمد",

    fieldSupervisor:
      "أ. رامي حسن",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",

    visitType: "زيارة تقييم",

    scheduledDate: "2026-10-24",

    scheduledTime: "09:30",

    status: "مكتملة",

    location:
      "فرع بنك فلسطين الرئيسي",

    visitReport:
      "تمت زيارة الطالبة ومراجعة تقدمها في المهام الإدارية والمالية، وتبين التزامها بالحضور وأداء المهام المطلوبة بشكل جيد.",

    attendanceConfirmed: true,

    supervisorFeedback:
      "الطالبة متعاونة ومنضبطة وتتعلم بسرعة.",

    studentProgress:
      "تقدّم جيد في مهارات التعامل مع العملاء والإجراءات الإدارية.",

    recommendations:
      "زيادة مشاركتها في المهام المالية تحت الإشراف.",

    createdAt: "2026-10-18",
  },

  {
    id: 4,
    code: "VIS-2026-038",

    studentId: "20230765",
    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    organization:
      "مستشفى الشفاء",

    opportunity:
      "التدريب السريري",

    academicSupervisor:
      "د. سارة خليل",

    fieldSupervisor:
      "أ. محمود حسن",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    visitType: "زيارة نهائية",

    scheduledDate: "2026-10-20",

    scheduledTime: "12:00",

    status: "مكتملة",

    location:
      "قسم التدريب السريري - مستشفى الشفاء",

    visitReport:
      "تمت الزيارة النهائية ومراجعة السجل السريري والساعات المكتملة وملاحظات المشرف الميداني.",

    attendanceConfirmed: true,

    supervisorFeedback:
      "أداء ممتاز والتزام واضح بمعايير الممارسة المهنية.",

    studentProgress:
      "استوفت الطالبة جميع متطلبات التدريب السريري.",

    recommendations:
      "اعتماد استكمال التدريب والانتقال إلى التقييم النهائي.",

    createdAt: "2026-10-15",
  },

  {
    id: 5,
    code: "VIS-2026-037",

    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    organization:
      "مركز المختبرات الطبية",

    opportunity:
      "التدريب السريري في المختبرات",

    academicSupervisor:
      "د. خالد يوسف",

    fieldSupervisor:
      "أ. خالد إبراهيم",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",

    visitType: "زيارة متابعة",

    scheduledDate: "2026-10-27",

    scheduledTime: "10:30",

    status: "مؤجلة",

    location:
      "مركز المختبرات الطبية",

    visitReport: "",

    attendanceConfirmed: false,

    supervisorFeedback: "",

    studentProgress: "",

    recommendations:
      "تم تأجيل الزيارة بسبب تعذر حضور المشرف الميداني.",

    createdAt: "2026-10-19",
  },
];

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyVisitForm = {
  studentId: "",
  student: "",

  college: "",
  major: "",

  organization: "",
  opportunity: "",

  academicSupervisor: "",
  fieldSupervisor: "",

  trainingPeriod: "",

  visitType: "زيارة دورية",

  scheduledDate: "",
  scheduledTime: "",

  location: "",

  status: "مجدولة",
};

/* =========================================================
   STUDENTS FOR NEW VISIT
========================================================= */

const trainingStudents = [
  {
    studentId: "20231045",
    student: "أحمد خالد محمد",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "هندسة البرمجيات",

    organization:
      "شركة التقنية المتقدمة",

    opportunity:
      "مطور برمجيات متدرب",

    academicSupervisor:
      "د. سامر يوسف",

    fieldSupervisor:
      "م. محمد حمدي",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",
  },

  {
    studentId: "20231234",
    student: "محمد سامي حسن",

    college:
      "كلية الهندسة وتكنولوجيا المعلومات",

    major: "نظم المعلومات",

    organization:
      "شركة الاتصالات الفلسطينية",

    opportunity:
      "دعم الأنظمة والشبكات",

    academicSupervisor:
      "د. أحمد نصار",

    fieldSupervisor:
      "م. خالد يوسف",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",
  },

  {
    studentId: "20230876",
    student: "سارة محمود علي",

    college:
      "كلية الاقتصاد والعلوم الإدارية",

    major: "إدارة الأعمال",

    organization:
      "بنك فلسطين",

    opportunity:
      "تدريب إداري ومالي",

    academicSupervisor:
      "د. ليلى أحمد",

    fieldSupervisor:
      "أ. رامي حسن",

    trainingPeriod:
      "فترة التدريب الميداني - الفصل الأول",
  },

  {
    studentId: "20230765",
    student: "مريم أحمد علي",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "التمريض",

    organization:
      "مستشفى الشفاء",

    opportunity:
      "التدريب السريري",

    academicSupervisor:
      "د. سارة خليل",

    fieldSupervisor:
      "أ. محمود حسن",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",
  },

  {
    studentId: "20231356",
    student: "لينا محمود حسن",

    college:
      "كلية العلوم الطبية التطبيقية",

    major: "المختبرات الطبية",

    organization:
      "مركز المختبرات الطبية",

    opportunity:
      "التدريب السريري في المختبرات",

    academicSupervisor:
      "د. خالد يوسف",

    fieldSupervisor:
      "أ. خالد إبراهيم",

    trainingPeriod:
      "فترة التدريب السريري - الفصل الأول",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Visits() {
  const [visits, setVisits] =
    useState(initialVisits);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [typeFilter, setTypeFilter] =
    useState("الكل");

  const [periodFilter, setPeriodFilter] =
    useState("الكل");

  const [
    selectedVisit,
    setSelectedVisit,
  ] = useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showVisitModal, setShowVisitModal] =
    useState(false);

  const [showReportModal, setShowReportModal] =
    useState(false);

  const [editingVisit, setEditingVisit] =
    useState(null);

  const [visitForm, setVisitForm] =
    useState(emptyVisitForm);

  const [reportForm, setReportForm] =
    useState({
      attendanceConfirmed: false,
      supervisorFeedback: "",
      studentProgress: "",
      recommendations: "",
      visitReport: "",
    });

  /* =========================================================
     OPTIONS
  ========================================================= */

  const periods = useMemo(
    () => [
      ...new Set(
        visits.map(
          (visit) =>
            visit.trainingPeriod
        )
      ),
    ],
    [visits]
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      visits.length;

    const scheduled =
      visits.filter(
        (visit) =>
          visit.status ===
          "مجدولة"
      ).length;

    const waitingReport =
      visits.filter(
        (visit) =>
          visit.status ===
          "بانتظار التقرير"
      ).length;

    const completed =
      visits.filter(
        (visit) =>
          visit.status ===
          "مكتملة"
      ).length;

    return [
      {
        title: "إجمالي الزيارات",
        value: total,
        description:
          "زيارات متابعة مسجلة",
        icon: MapPinned,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "زيارات مجدولة",
        value: scheduled,
        description:
          "لم يتم تنفيذها بعد",
        icon: CalendarDays,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "بانتظار التقرير",
        value: waitingReport,
        description:
          "تمت الزيارة ولم يعتمد التقرير",
        icon: FileText,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },

      {
        title: "زيارات مكتملة",
        value: completed,
        description:
          "تم اعتماد تقاريرها",
        icon: CheckCircle2,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },
    ];
  }, [visits]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredVisits =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return visits.filter(
        (visit) => {
          const matchesSearch =
            !query ||
            visit.student
              .toLowerCase()
              .includes(query) ||
            visit.studentId
              .toLowerCase()
              .includes(query) ||
            visit.code
              .toLowerCase()
              .includes(query) ||
            visit.organization
              .toLowerCase()
              .includes(query) ||
            visit.academicSupervisor
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "الكل" ||
            visit.status ===
              statusFilter;

          const matchesType =
            typeFilter ===
              "الكل" ||
            visit.visitType ===
              typeFilter;

          const matchesPeriod =
            periodFilter ===
              "الكل" ||
            visit.trainingPeriod ===
              periodFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesType &&
            matchesPeriod
          );
        }
      );
    }, [
      visits,
      searchTerm,
      statusFilter,
      typeFilter,
      periodFilter,
    ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (visit) => {
    setSelectedVisit(visit);
    setShowDetails(true);
  };

  /* =========================================================
     ADD / EDIT VISIT
  ========================================================= */

  const openAddVisit = () => {
    setEditingVisit(null);

    setVisitForm(
      emptyVisitForm
    );

    setShowVisitModal(true);
  };

  const openEditVisit = (visit) => {
    setEditingVisit(visit);

    setVisitForm({
      studentId:
        visit.studentId,

      student:
        visit.student,

      college:
        visit.college,

      major:
        visit.major,

      organization:
        visit.organization,

      opportunity:
        visit.opportunity,

      academicSupervisor:
        visit.academicSupervisor,

      fieldSupervisor:
        visit.fieldSupervisor,

      trainingPeriod:
        visit.trainingPeriod,

      visitType:
        visit.visitType,

      scheduledDate:
        visit.scheduledDate,

      scheduledTime:
        visit.scheduledTime,

      location:
        visit.location,

      status:
        visit.status,
    });

    setShowDetails(false);
    setShowVisitModal(true);
  };

  const handleStudentChange = (
    studentId
  ) => {
    const student =
      trainingStudents.find(
        (item) =>
          item.studentId ===
          studentId
      );

    if (!student) {
      setVisitForm(
        emptyVisitForm
      );

      return;
    }

    setVisitForm(
      (previous) => ({
        ...previous,
        ...student,
      })
    );
  };

  const saveVisit = () => {
    if (
      !visitForm.studentId ||
      !visitForm.scheduledDate ||
      !visitForm.scheduledTime ||
      !visitForm.location.trim()
    ) {
      return;
    }

    if (editingVisit) {
      setVisits((previous) =>
        previous.map((visit) =>
          visit.id ===
          editingVisit.id
            ? {
                ...visit,
                ...visitForm,
              }
            : visit
        )
      );
    } else {
      const nextId =
        Math.max(
          ...visits.map(
            (visit) => visit.id
          ),
          0
        ) + 1;

      setVisits((previous) => [
        {
          id: nextId,

          code: `VIS-2026-${String(
            40 + nextId
          ).padStart(
            3,
            "0"
          )}`,

          ...visitForm,

          visitReport: "",

          attendanceConfirmed: false,

          supervisorFeedback: "",

          studentProgress: "",

          recommendations: "",

          createdAt:
            "2026-10-24",
        },

        ...previous,
      ]);
    }

    setShowVisitModal(false);
    setEditingVisit(null);
  };

  /* =========================================================
     REPORT
  ========================================================= */

  const openReport = (visit) => {
    setSelectedVisit(visit);

    setReportForm({
      attendanceConfirmed:
        visit.attendanceConfirmed,

      supervisorFeedback:
        visit.supervisorFeedback ||
        "",

      studentProgress:
        visit.studentProgress ||
        "",

      recommendations:
        visit.recommendations ||
        "",

      visitReport:
        visit.visitReport || "",
    });

    setShowDetails(false);

    setShowReportModal(true);
  };

  const saveVisitReport = () => {
    if (!selectedVisit) {
      return;
    }

    if (
      !reportForm.visitReport.trim()
    ) {
      return;
    }

    if (
      !reportForm.attendanceConfirmed
    ) {
      return;
    }

    setVisits((previous) =>
      previous.map((visit) =>
        visit.id ===
        selectedVisit.id
          ? {
              ...visit,

              ...reportForm,

              status:
                "مكتملة",
            }
          : visit
      )
    );

    setShowReportModal(false);
    setSelectedVisit(null);
  };

  /* =========================================================
     MARK AS VISITED
  ========================================================= */

  const markAsVisited = (
    visit
  ) => {
    setVisits((previous) =>
      previous.map((item) =>
        item.id === visit.id
          ? {
              ...item,
              status:
                "بانتظار التقرير",
            }
          : item
      )
    );

    setShowDetails(false);
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
        "
      >
        <Header />

        <main
          className="
            min-h-0
            flex-1

            overflow-x-hidden
            overflow-y-auto

            px-4
            pb-8
            pt-5

            sm:px-5
            md:px-6

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[26px]
          "
        >
          <div className="mx-auto w-full max-w-[1180px]">
            {/* BREADCRUMB */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-[7px]

                text-[11px]
                font-medium
                text-[#64748B]
              "
            >
              <span>
                الرئيسية
              </span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span>
                التدريب الميداني
              </span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                الزيارات والمتابعة
              </span>
            </div>

            {/* HEADER */}

            <section
              className="
                mt-[5px]

                flex
                flex-col
                gap-4

                md:flex-row
                md:items-end
                md:justify-between
              "
            >
              <div>
                <h1
                  className="
                    m-0

                    text-[25px]
                    font-bold
                    leading-[38px]
                    text-[#14213D]

                    sm:text-[27px]
                  "
                >
                  الزيارات والمتابعة
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]

                    max-w-[850px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  جدولة ومتابعة الزيارات
                  الميدانية للطلبة بعد اعتماد
                  التدريب، وتوثيق نتائج الزيارة
                  وملاحظات المشرفين قبل اعتمادها
                  كزيارة مكتملة.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  openAddVisit
                }
                className="
                  flex
                  min-h-[42px]
                  w-full
                  items-center
                  justify-center
                  gap-[6px]

                  rounded-[9px]

                  border-0

                  bg-[#09379A]

                  px-[16px]

                  text-[10px]
                  font-bold
                  text-white

                  sm:w-auto
                "
              >
                <Plus size={16} />

                جدولة زيارة
              </button>
            </section>

            {/* STATS */}

            <section
              className="
                mt-[22px]

                grid
                grid-cols-1
                gap-[12px]

                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {statistics.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <article
                      key={item.title}
                      className="
                        min-h-[128px]

                        rounded-[14px]

                        border
                        border-[#DDE5EF]

                        bg-white

                        p-[17px]
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
                        <div>
                          <p
                            className="
                              m-0

                              text-[10px]
                              text-[#64748B]
                            "
                          >
                            {item.title}
                          </p>

                          <strong
                            className="
                              mt-[8px]
                              block

                              text-[27px]
                              text-[#14213D]
                            "
                          >
                            {item.value}
                          </strong>

                          <p
                            className="
                              m-0
                              mt-[5px]

                              text-[9px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <div
                          className={`
                            flex
                            h-[42px]
                            w-[42px]
                            items-center
                            justify-center

                            rounded-[10px]

                            ${item.bg}
                            ${item.color}
                          `}
                        >
                          <Icon
                            size={20}
                          />
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </section>

            {/* FILTERS */}

            <section
              className="
                mt-[18px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                p-[15px]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-2
                  xl:grid-cols-4
                "
              >
                <div>
                  <Label>
                    البحث
                  </Label>

                  <div
                    className="
                      flex
                      h-[42px]
                      items-center
                      gap-[8px]

                      rounded-[9px]

                      border
                      border-[#D9E2EC]

                      px-[11px]
                    "
                  >
                    <Search
                      size={16}
                      className="text-[#94A3B8]"
                    />

                    <input
                      value={
                        searchTerm
                      }
                      onChange={(
                        event
                      ) =>
                        setSearchTerm(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="الطالب، الجهة، المشرف أو رقم الزيارة..."
                      className="
                        min-w-0
                        flex-1

                        border-0
                        bg-transparent

                        font-['Cairo']

                        text-[10px]

                        outline-none
                      "
                    />
                  </div>
                </div>

                <FilterSelect
                  label="نوع الزيارة"
                  value={
                    typeFilter
                  }
                  onChange={
                    setTypeFilter
                  }
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>

                  <option value="زيارة دورية">
                    زيارة دورية
                  </option>

                  <option value="زيارة متابعة">
                    زيارة متابعة
                  </option>

                  <option value="زيارة تقييم">
                    زيارة تقييم
                  </option>

                  <option value="زيارة نهائية">
                    زيارة نهائية
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الفترة التدريبية"
                  value={
                    periodFilter
                  }
                  onChange={
                    setPeriodFilter
                  }
                >
                  <option value="الكل">
                    كل الفترات
                  </option>

                  {periods.map(
                    (period) => (
                      <option
                        key={period}
                        value={period}
                      >
                        {period}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="الحالة"
                  value={
                    statusFilter
                  }
                  onChange={
                    setStatusFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="مجدولة">
                    مجدولة
                  </option>

                  <option value="بانتظار التقرير">
                    بانتظار التقرير
                  </option>

                  <option value="مكتملة">
                    مكتملة
                  </option>

                  <option value="مؤجلة">
                    مؤجلة
                  </option>
                </FilterSelect>
              </div>
            </section>

            {/* TABLE */}

            <section
              className="
                mt-[16px]

                overflow-hidden

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#EEF2F7]

                  px-[18px]
                  py-[15px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[14px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    زيارات التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    الزيارة لا تعتمد كمكتملة
                    إلا بعد إدخال تقريرها
                  </p>
                </div>

                <span
                  className="
                    rounded-[8px]

                    bg-[#F8FAFC]

                    px-[10px]
                    py-[7px]

                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  {
                    filteredVisits.length
                  }{" "}
                  زيارة
                </span>
              </div>

              {/* DESKTOP */}

              <div
                className="
                  hidden
                  overflow-x-auto

                  md:block
                "
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <TableHead>
                        الزيارة
                      </TableHead>

                      <TableHead>
                        الطالب
                      </TableHead>

                      <TableHead>
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        المشرف الأكاديمي
                      </TableHead>

                      <TableHead>
                        الموعد
                      </TableHead>

                      <TableHead>
                        النوع
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
                    {filteredVisits.map(
                      (visit) => (
                        <tr
                          key={visit.id}
                          className="
                            border-t
                            border-[#EEF2F7]

                            hover:bg-[#FBFCFE]
                          "
                        >
                          <TableCell>
                            <div>
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {visit.code}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {visit.location}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="min-w-[145px]">
                              <p
                                className="
                                  m-0

                                  text-[10px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {visit.student}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {visit.studentId}
                                {" · "}
                                {visit.major}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="min-w-[150px]">
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {visit.organization}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {visit.fieldSupervisor}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              {
                                visit.academicSupervisor
                              }
                            </span>
                          </TableCell>

                          <TableCell>
                            <div>
                              <p
                                className="
                                  m-0

                                  text-[9px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {
                                  visit.scheduledDate
                                }
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {
                                  visit.scheduledTime
                                }
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#475569]
                              "
                            >
                              {visit.visitType}
                            </span>
                          </TableCell>

                          <TableCell>
                            <VisitBadge
                              status={
                                visit.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  visit
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
                              "
                            >
                              <Eye size={14} />

                              عرض
                            </button>
                          </TableCell>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div
                className="
                  flex
                  flex-col
                  gap-[9px]

                  p-[12px]

                  md:hidden
                "
              >
                {filteredVisits.map(
                  (visit) => (
                    <article
                      key={visit.id}
                      className="
                        rounded-[11px]

                        border
                        border-[#E7ECF2]

                        bg-[#FAFBFC]

                        p-[12px]
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
                          <p
                            className="
                              m-0

                              text-[11px]
                              font-bold
                              text-[#334155]
                            "
                          >
                            {visit.student}
                          </p>

                          <span
                            className="
                              mt-[2px]
                              block

                              text-[8px]
                              text-[#94A3B8]
                            "
                          >
                            {visit.code}
                            {" · "}
                            {visit.major}
                          </span>
                        </div>

                        <VisitBadge
                          status={
                            visit.status
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[10px]

                          grid
                          grid-cols-2
                          gap-[9px]

                          border-t
                          border-[#E7ECF2]

                          pt-[10px]
                        "
                      >
                        <MobileInfo
                          label="جهة التدريب"
                          value={
                            visit.organization
                          }
                        />

                        <MobileInfo
                          label="نوع الزيارة"
                          value={
                            visit.visitType
                          }
                        />

                        <MobileInfo
                          label="التاريخ"
                          value={
                            visit.scheduledDate
                          }
                        />

                        <MobileInfo
                          label="الوقت"
                          value={
                            visit.scheduledTime
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openDetails(
                            visit
                          )
                        }
                        className="
                          mt-[11px]

                          flex
                          h-[35px]
                          w-full
                          items-center
                          justify-center
                          gap-[5px]

                          rounded-[8px]

                          border
                          border-[#D7E5FF]

                          bg-[#F6F9FF]

                          text-[9px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        <Eye size={14} />

                        عرض تفاصيل الزيارة
                      </button>
                    </article>
                  )
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedVisit && (
          <>
            <div
              onClick={() =>
                setShowDetails(false)
              }
              className="
                fixed
                inset-0
                z-[90]

                bg-[#0F172A]/35
              "
            />

            <aside
              dir="rtl"
              className="
                fixed
                bottom-0
                right-0
                top-0
                z-[100]

                flex
                w-full
                max-w-[620px]
                flex-col

                bg-white
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#E2E8F0]

                  px-5
                  py-[17px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[17px]
                      font-bold
                    "
                  >
                    تفاصيل الزيارة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedVisit.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(
                      false
                    )
                  }
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center

                    rounded-[8px]

                    border-0

                    bg-[#F8FAFC]
                  "
                >
                  <X size={17} />
                </button>
              </div>

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto

                  px-5
                  py-5
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
                  <div>
                    <h3
                      className="
                        m-0

                        text-[15px]
                        font-bold
                        text-[#334155]
                      "
                    >
                      {selectedVisit.student}
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[3px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      {selectedVisit.studentId}
                      {" · "}
                      {selectedVisit.major}
                    </p>
                  </div>

                  <VisitBadge
                    status={
                      selectedVisit.status
                    }
                  />
                </div>

                <SectionTitle>
                  الموعد
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="التاريخ"
                    value={
                      selectedVisit.scheduledDate
                    }
                  />

                  <InfoBox
                    label="الوقت"
                    value={
                      selectedVisit.scheduledTime
                    }
                  />

                  <InfoBox
                    label="نوع الزيارة"
                    value={
                      selectedVisit.visitType
                    }
                  />

                  <InfoBox
                    label="الموقع"
                    value={
                      selectedVisit.location
                    }
                  />
                </div>

                <SectionTitle>
                  بيانات التدريب
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="جهة التدريب"
                    value={
                      selectedVisit.organization
                    }
                  />

                  <InfoBox
                    label="الفرصة"
                    value={
                      selectedVisit.opportunity
                    }
                  />

                  <InfoBox
                    label="المشرف الأكاديمي"
                    value={
                      selectedVisit.academicSupervisor
                    }
                  />

                  <InfoBox
                    label="مشرف الجهة"
                    value={
                      selectedVisit.fieldSupervisor
                    }
                  />
                </div>

                <SectionTitle>
                  الفترة التدريبية
                </SectionTitle>

                <TextBox>
                  {
                    selectedVisit.trainingPeriod
                  }
                </TextBox>

                {selectedVisit.status ===
                  "مكتملة" && (
                  <>
                    <SectionTitle>
                      تقرير الزيارة
                    </SectionTitle>

                    <TextBox>
                      {
                        selectedVisit.visitReport
                      }
                    </TextBox>

                    <SectionTitle>
                      ملاحظات المتابعة
                    </SectionTitle>

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-[8px]
                      "
                    >
                      <InfoBox
                        label="ملاحظات مشرف الجهة"
                        value={
                          selectedVisit.supervisorFeedback
                        }
                      />

                      <InfoBox
                        label="تقدم الطالب"
                        value={
                          selectedVisit.studentProgress
                        }
                      />

                      <InfoBox
                        label="التوصيات"
                        value={
                          selectedVisit.recommendations
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-[12px]

                        flex
                        items-center
                        gap-[7px]

                        rounded-[9px]

                        border
                        border-[#BBF7D0]

                        bg-[#ECFDF3]

                        px-[11px]
                        py-[9px]
                      "
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[#15803D]"
                      />

                      <span
                        className="
                          text-[9px]
                          font-bold
                          text-[#15803D]
                        "
                      >
                        تم تأكيد حضور الطالب
                        واعتماد تقرير الزيارة
                      </span>
                    </div>
                  </>
                )}

                {selectedVisit.status ===
                  "بانتظار التقرير" && (
                  <div
                    className="
                      mt-[18px]

                      rounded-[10px]

                      border
                      border-[#E9D5FF]

                      bg-[#F3E8FF]

                      px-[12px]
                      py-[11px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-[7px]
                      "
                    >
                      <FileText
                        size={16}
                        className="
                          mt-[1px]
                          shrink-0
                          text-[#7E22CE]
                        "
                      />

                      <p
                        className="
                          m-0

                          text-[9px]
                          leading-[18px]
                          text-[#6B21A8]
                        "
                      >
                        تم تنفيذ الزيارة،
                        لكنها لن تعتبر مكتملة
                        حتى يتم إدخال تقرير
                        الزيارة وتأكيد حضور
                        الطالب.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIONS */}

              <div
                className="
                  flex
                  flex-col
                  gap-[7px]

                  border-t
                  border-[#E2E8F0]

                  px-5
                  py-[14px]

                  sm:flex-row
                "
              >
                {(selectedVisit.status ===
                  "مجدولة" ||
                  selectedVisit.status ===
                    "مؤجلة") && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        openEditVisit(
                          selectedVisit
                        )
                      }
                      className="
                        min-h-[40px]
                        flex-1

                        rounded-[8px]

                        border
                        border-[#D7E5FF]

                        bg-[#F6F9FF]

                        text-[9px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      تعديل الموعد
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        markAsVisited(
                          selectedVisit
                        )
                      }
                      className="
                        flex
                        min-h-[40px]
                        flex-1
                        items-center
                        justify-center
                        gap-[5px]

                        rounded-[8px]

                        border-0

                        bg-[#09379A]

                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      <CheckCircle2
                        size={14}
                      />

                      تم تنفيذ الزيارة
                    </button>
                  </>
                )}

                {selectedVisit.status ===
                  "بانتظار التقرير" && (
                  <button
                    type="button"
                    onClick={() =>
                      openReport(
                        selectedVisit
                      )
                    }
                    className="
                      flex
                      min-h-[40px]
                      w-full
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border-0

                      bg-[#09379A]

                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    <FileText
                      size={14}
                    />

                    إدخال تقرير الزيارة
                  </button>
                )}

                {selectedVisit.status ===
                  "مكتملة" && (
                  <button
                    type="button"
                    onClick={() =>
                      openReport(
                        selectedVisit
                      )
                    }
                    className="
                      flex
                      min-h-[40px]
                      w-full
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border
                      border-[#D7E5FF]

                      bg-[#F6F9FF]

                      text-[9px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    <FileText
                      size={14}
                    />

                    تعديل التقرير
                  </button>
                )}
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          ADD / EDIT VISIT
      ====================================================== */}

      {showVisitModal && (
        <div
          onClick={() =>
            setShowVisitModal(false)
          }
          className="
            fixed
            inset-0
            z-[120]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-[#0F172A]/45

            px-4
            py-6
          "
        >
          <div
            dir="rtl"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              max-h-[92dvh]
              w-full
              max-w-[760px]
              overflow-y-auto

              rounded-[16px]

              bg-white
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-[#E2E8F0]

                px-5
                py-[16px]
              "
            >
              <div>
                <h2
                  className="
                    m-0

                    text-[16px]
                    font-bold
                  "
                >
                  {editingVisit
                    ? "تعديل الزيارة"
                    : "جدولة زيارة جديدة"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  ربط الزيارة بالطالب
                  والتدريب المعتمد
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowVisitModal(
                    false
                  )
                }
                className="
                  flex
                  h-[32px]
                  w-[32px]
                  items-center
                  justify-center

                  rounded-[8px]

                  border-0

                  bg-[#F8FAFC]
                "
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-[14px]

                px-5
                py-5

                sm:grid-cols-2
              "
            >
              <FormSelect
                label="الطالب"
                value={
                  visitForm.studentId
                }
                onChange={
                  handleStudentChange
                }
              >
                <option value="">
                  اختر الطالب
                </option>

                {trainingStudents.map(
                  (student) => (
                    <option
                      key={
                        student.studentId
                      }
                      value={
                        student.studentId
                      }
                    >
                      {student.student}
                      {" - "}
                      {student.major}
                    </option>
                  )
                )}
              </FormSelect>

              <FormSelect
                label="نوع الزيارة"
                value={
                  visitForm.visitType
                }
                onChange={(value) =>
                  setVisitForm(
                    (previous) => ({
                      ...previous,
                      visitType: value,
                    })
                  )
                }
              >
                <option value="زيارة دورية">
                  زيارة دورية
                </option>

                <option value="زيارة متابعة">
                  زيارة متابعة
                </option>

                <option value="زيارة تقييم">
                  زيارة تقييم
                </option>

                <option value="زيارة نهائية">
                  زيارة نهائية
                </option>
              </FormSelect>

              <FormInput
                label="تاريخ الزيارة"
                type="date"
                value={
                  visitForm.scheduledDate
                }
                onChange={(value) =>
                  setVisitForm(
                    (previous) => ({
                      ...previous,

                      scheduledDate:
                        value,
                    })
                  )
                }
              />

              <FormInput
                label="وقت الزيارة"
                type="time"
                value={
                  visitForm.scheduledTime
                }
                onChange={(value) =>
                  setVisitForm(
                    (previous) => ({
                      ...previous,

                      scheduledTime:
                        value,
                    })
                  )
                }
              />

              <div className="sm:col-span-2">
                <FormInput
                  label="مكان الزيارة"
                  value={
                    visitForm.location
                  }
                  onChange={(value) =>
                    setVisitForm(
                      (previous) => ({
                        ...previous,

                        location:
                          value,
                      })
                    )
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <SectionLabel>
                  بيانات التدريب
                </SectionLabel>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <ReadonlyBox
                    label="جهة التدريب"
                    value={
                      visitForm.organization ||
                      "—"
                    }
                  />

                  <ReadonlyBox
                    label="الفرصة"
                    value={
                      visitForm.opportunity ||
                      "—"
                    }
                  />

                  <ReadonlyBox
                    label="المشرف الأكاديمي"
                    value={
                      visitForm.academicSupervisor ||
                      "—"
                    }
                  />

                  <ReadonlyBox
                    label="مشرف الجهة"
                    value={
                      visitForm.fieldSupervisor ||
                      "—"
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className="
                flex
                flex-col-reverse
                gap-[8px]

                border-t
                border-[#E2E8F0]

                px-5
                py-[14px]

                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowVisitModal(
                    false
                  )
                }
                className="
                  min-h-[40px]

                  rounded-[8px]

                  border
                  border-[#D9E2EC]

                  bg-white

                  px-[15px]

                  text-[9px]
                  font-bold
                "
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={saveVisit}
                className="
                  min-h-[40px]

                  rounded-[8px]

                  border-0

                  bg-[#09379A]

                  px-[18px]

                  text-[9px]
                  font-bold
                  text-white
                "
              >
                {editingVisit
                  ? "حفظ التعديلات"
                  : "جدولة الزيارة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          REPORT MODAL
      ====================================================== */}

      {showReportModal &&
        selectedVisit && (
          <div
            onClick={() =>
              setShowReportModal(false)
            }
            className="
              fixed
              inset-0
              z-[130]

              flex
              items-center
              justify-center

              overflow-y-auto

              bg-[#0F172A]/45

              px-4
              py-6
            "
          >
            <div
              dir="rtl"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                max-h-[92dvh]
                w-full
                max-w-[760px]
                overflow-y-auto

                rounded-[16px]

                bg-white
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-[#E2E8F0]

                  px-5
                  py-[16px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[16px]
                      font-bold
                    "
                  >
                    تقرير الزيارة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedVisit.student}
                    {" · "}
                    {selectedVisit.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowReportModal(
                      false
                    )
                  }
                  className="
                    flex
                    h-[32px]
                    w-[32px]
                    items-center
                    justify-center

                    rounded-[8px]

                    border-0

                    bg-[#F8FAFC]
                  "
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="
                  px-5
                  py-5
                "
              >
                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-[8px]

                    rounded-[9px]

                    border
                    border-[#E2E8F0]

                    bg-[#FAFBFC]

                    px-[11px]
                    py-[10px]

                    text-[9px]
                    font-bold
                    text-[#475569]
                  "
                >
                  <input
                    type="checkbox"
                    checked={
                      reportForm.attendanceConfirmed
                    }
                    onChange={() =>
                      setReportForm(
                        (previous) => ({
                          ...previous,

                          attendanceConfirmed:
                            !previous.attendanceConfirmed,
                        })
                      )
                    }
                    className="
                      h-[15px]
                      w-[15px]

                      accent-[#09379A]
                    "
                  />

                  تأكيد حضور الطالب أثناء
                  الزيارة
                </label>

                <div
                  className="
                    mt-[14px]

                    grid
                    grid-cols-1
                    gap-[14px]
                  "
                >
                  <TextAreaField
                    label="ملخص تقرير الزيارة"
                    value={
                      reportForm.visitReport
                    }
                    onChange={(value) =>
                      setReportForm(
                        (previous) => ({
                          ...previous,

                          visitReport:
                            value,
                        })
                      )
                    }
                    placeholder="اكتب ملخص الزيارة وما تم التحقق منه..."
                  />

                  <TextAreaField
                    label="ملاحظات مشرف جهة التدريب"
                    value={
                      reportForm.supervisorFeedback
                    }
                    onChange={(value) =>
                      setReportForm(
                        (previous) => ({
                          ...previous,

                          supervisorFeedback:
                            value,
                        })
                      )
                    }
                    placeholder="ملاحظات المشرف الميداني عن أداء الطالب..."
                  />

                  <TextAreaField
                    label="تقدم الطالب"
                    value={
                      reportForm.studentProgress
                    }
                    onChange={(value) =>
                      setReportForm(
                        (previous) => ({
                          ...previous,

                          studentProgress:
                            value,
                        })
                      )
                    }
                    placeholder="صف مستوى التقدم في التدريب..."
                  />

                  <TextAreaField
                    label="التوصيات"
                    value={
                      reportForm.recommendations
                    }
                    onChange={(value) =>
                      setReportForm(
                        (previous) => ({
                          ...previous,

                          recommendations:
                            value,
                        })
                      )
                    }
                    placeholder="أي توصيات للطالب أو جهة التدريب..."
                  />
                </div>

                <div
                  className="
                    mt-[14px]

                    rounded-[9px]

                    border
                    border-[#D7E5FF]

                    bg-[#F6F9FF]

                    px-[11px]
                    py-[10px]

                    text-[9px]
                    leading-[18px]
                    text-[#475569]
                  "
                >
                  لا يمكن اعتماد الزيارة
                  كمكتملة بدون تأكيد حضور
                  الطالب وكتابة ملخص تقرير
                  الزيارة.
                </div>
              </div>

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-[8px]

                  border-t
                  border-[#E2E8F0]

                  px-5
                  py-[14px]

                  sm:flex-row
                  sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowReportModal(
                      false
                    )
                  }
                  className="
                    min-h-[40px]

                    rounded-[8px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[15px]

                    text-[9px]
                    font-bold
                  "
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={
                    saveVisitReport
                  }
                  className="
                    flex
                    min-h-[40px]
                    items-center
                    justify-center
                    gap-[5px]

                    rounded-[8px]

                    border-0

                    bg-[#09379A]

                    px-[18px]

                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  <FileText
                    size={14}
                  />

                  اعتماد التقرير
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

const inputStyle = `
  h-[42px]
  w-full

  rounded-[9px]

  border
  border-[#D9E2EC]

  bg-white

  px-[11px]

  font-['Cairo']

  text-[10px]
  text-[#334155]

  outline-none

  focus:border-[#09379A]
  focus:ring-2
  focus:ring-[#09379A]/10
`;

function VisitBadge({
  status,
}) {
  const styles = {
    مجدولة:
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",

    "بانتظار التقرير":
      "bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]",

    مكتملة:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    مؤجلة:
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        whitespace-nowrap

        rounded-full

        border

        px-[8px]

        text-[8px]
        font-bold

        ${
          styles[status] ||
          "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function Label({
  children,
}) {
  return (
    <label
      className="
        mb-[6px]
        block

        text-[10px]
        font-bold
        text-[#475569]
      "
    >
      {children}
    </label>
  );
}

function SectionLabel({
  children,
}) {
  return (
    <p
      className="
        m-0
        mb-[8px]

        text-[10px]
        font-bold
        text-[#475569]
      "
    >
      {children}
    </p>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={inputStyle}
      >
        {children}
      </select>
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={inputStyle}
      >
        {children}
      </select>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={inputStyle}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        rows={4}
        placeholder={placeholder}
        className="
          w-full

          resize-none

          rounded-[9px]

          border
          border-[#D9E2EC]

          px-[11px]
          py-[10px]

          font-['Cairo']

          text-[10px]
          leading-[20px]
          text-[#334155]

          outline-none

          focus:border-[#09379A]
          focus:ring-2
          focus:ring-[#09379A]/10
        "
      />
    </div>
  );
}

function TableHead({
  children,
}) {
  return (
    <th
      className="
        whitespace-nowrap

        px-[13px]
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

function TableCell({
  children,
}) {
  return (
    <td
      className="
        px-[13px]
        py-[12px]

        align-middle
      "
    >
      {children}
    </td>
  );
}

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[10px]
        py-[9px]
      "
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

      <p
        className="
          m-0
          mt-[3px]

          text-[9px]
          font-bold
          leading-[18px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

function ReadonlyBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#F8FAFC]

        px-[10px]
        py-[9px]
      "
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

      <p
        className="
          m-0
          mt-[3px]

          text-[9px]
          font-bold
          leading-[18px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

function MobileInfo({
  label,
  value,
}) {
  return (
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

      <p
        className="
          m-0
          mt-[2px]

          text-[9px]
          font-medium
          leading-[17px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

function TextBox({
  children,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[11px]
        py-[10px]

        text-[9px]
        leading-[19px]
        text-[#475569]
      "
    >
      {children}
    </div>
  );
}

function SectionTitle({
  children,
}) {
  return (
    <h4
      className="
        m-0
        mb-[9px]
        mt-[20px]

        text-[11px]
        font-bold
        text-[#334155]
      "
    >
      {children}
    </h4>
  );
}