import { useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  RotateCcw,
  Search,
  Send,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

const initialRequests = [
  {
    id: 1,
    code: "TR-2026-084",
    student: "أحمد خالد محمد",
    studentId: "20231045",
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    specialization: "هندسة البرمجيات",
    level: "الرابع",
    email: "ahmad.khaled@alazhar.edu.ps",
    phone: "0599123456",

    organization: "شركة التقنية المتقدمة",
    opportunity: "مطور برمجيات متدرب",
    trainingType: "تدريب ميداني",
    academicSupervisor: "د. سامر يوسف",
    fieldSupervisor: "م. محمد حمدي",

    startDate: "2026-11-01",
    endDate: "2027-01-31",
    hours: 120,

    date: "2026-10-24",
    status: "قيد المراجعة",

    notes:
      "الطالب مستوفٍ للساعات الأكاديمية المطلوبة، ويحتاج الطلب إلى مراجعة المستندات قبل التحويل للموافقة.",

    attachments: [
      {
        name: "السيرة الذاتية.pdf",
        type: "PDF",
      },
      {
        name: "خطاب التدريب.pdf",
        type: "PDF",
      },
    ],

    timeline: [
      {
        title: "تم تقديم الطلب",
        date: "2026-10-24",
        status: "done",
      },
      {
        title: "قيد مراجعة منسق التدريب",
        date: "2026-10-24",
        status: "current",
      },
      {
        title: "الموافقة الأكاديمية",
        date: "",
        status: "todo",
      },
      {
        title: "اعتماد التدريب",
        date: "",
        status: "todo",
      },
    ],
  },

  {
    id: 2,
    code: "TR-2026-083",
    student: "سارة محمود علي",
    studentId: "20230876",
    college: "كلية الاقتصاد والعلوم الإدارية",
    specialization: "إدارة الأعمال",
    level: "الرابع",
    email: "sara.mahmoud@alazhar.edu.ps",
    phone: "0598456123",

    organization: "بنك فلسطين",
    opportunity: "تدريب إداري ومالي",
    trainingType: "تدريب ميداني",
    academicSupervisor: "د. ليلى أحمد",
    fieldSupervisor: "أ. رامي حسن",

    startDate: "2026-11-05",
    endDate: "2027-02-05",
    hours: 120,

    date: "2026-10-23",
    status: "بانتظار الموافقة",

    notes:
      "تمت مراجعة الطلب والمستندات، والطلب جاهز لاتخاذ قرار الموافقة النهائي.",

    attachments: [
      {
        name: "السيرة الذاتية.pdf",
        type: "PDF",
      },
      {
        name: "إفادة الطالب.pdf",
        type: "PDF",
      },
    ],

    timeline: [
      {
        title: "تم تقديم الطلب",
        date: "2026-10-23",
        status: "done",
      },
      {
        title: "تمت مراجعة الطلب",
        date: "2026-10-23",
        status: "done",
      },
      {
        title: "بانتظار الموافقة",
        date: "2026-10-24",
        status: "current",
      },
      {
        title: "اعتماد التدريب",
        date: "",
        status: "todo",
      },
    ],
  },

  {
    id: 3,
    code: "TR-2026-082",
    student: "محمد سامي حسن",
    studentId: "20231234",
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    specialization: "نظم المعلومات",
    level: "الرابع",
    email: "mohammed.sami@alazhar.edu.ps",
    phone: "0597771234",

    organization: "شركة الاتصالات الفلسطينية",
    opportunity: "دعم الأنظمة والشبكات",
    trainingType: "تدريب ميداني",
    academicSupervisor: "د. أحمد نصار",
    fieldSupervisor: "م. خالد يوسف",

    startDate: "2026-10-27",
    endDate: "2027-01-27",
    hours: 120,

    date: "2026-10-22",
    status: "مقبول",

    notes:
      "تم اعتماد الطلب واستكمال جميع متطلبات بدء التدريب.",

    attachments: [
      {
        name: "السيرة الذاتية.pdf",
        type: "PDF",
      },
    ],

    timeline: [
      {
        title: "تم تقديم الطلب",
        date: "2026-10-22",
        status: "done",
      },
      {
        title: "تمت المراجعة",
        date: "2026-10-22",
        status: "done",
      },
      {
        title: "تمت الموافقة",
        date: "2026-10-23",
        status: "done",
      },
      {
        title: "تم اعتماد التدريب",
        date: "2026-10-23",
        status: "done",
      },
    ],
  },

  {
    id: 4,
    code: "TR-2026-081",
    student: "ريم أحمد يوسف",
    studentId: "20230987",
    college: "كلية التربية",
    specialization: "تعليم أساسي",
    level: "الرابع",
    email: "reem.ahmad@alazhar.edu.ps",
    phone: "0598123456",

    organization: "مدرسة الأزهر النموذجية",
    opportunity: "التربية العملية",
    trainingType: "تدريب عملي",
    academicSupervisor: "د. منى عبد الرحمن",
    fieldSupervisor: "أ. خالد النجار",

    startDate: "2026-11-02",
    endDate: "2027-01-15",
    hours: 150,

    date: "2026-10-21",
    status: "يحتاج تعديل",

    notes:
      "الطلب يحتاج تحديث خطاب التدريب وإعادة رفع المستند قبل استكمال المراجعة.",

    attachments: [
      {
        name: "خطاب تدريب قديم.pdf",
        type: "PDF",
      },
    ],

    timeline: [
      {
        title: "تم تقديم الطلب",
        date: "2026-10-21",
        status: "done",
      },
      {
        title: "تمت مراجعة البيانات",
        date: "2026-10-22",
        status: "done",
      },
      {
        title: "طلب تعديل المستندات",
        date: "2026-10-22",
        status: "current",
      },
      {
        title: "بانتظار إعادة التقديم",
        date: "",
        status: "todo",
      },
    ],
  },

  {
    id: 5,
    code: "TR-2026-080",
    student: "عمر يوسف سليمان",
    studentId: "20231109",
    college: "كلية الآداب والعلوم الإنسانية",
    specialization: "الإعلام",
    level: "الرابع",
    email: "omar.yousef@alazhar.edu.ps",
    phone: "0599008877",

    organization: "مؤسسة الإبداع الرقمي",
    opportunity: "إنتاج المحتوى الرقمي",
    trainingType: "تدريب ميداني",
    academicSupervisor: "د. خالد حسن",
    fieldSupervisor: "م. سارة محمود",

    startDate: "2026-11-10",
    endDate: "2027-01-10",
    hours: 100,

    date: "2026-10-20",
    status: "مرفوض",

    notes:
      "تم رفض الطلب لعدم استيفاء الطالب المتطلب الأكاديمي السابق للتدريب.",

    attachments: [
      {
        name: "السيرة الذاتية.pdf",
        type: "PDF",
      },
    ],

    timeline: [
      {
        title: "تم تقديم الطلب",
        date: "2026-10-20",
        status: "done",
      },
      {
        title: "تمت مراجعة الأهلية",
        date: "2026-10-20",
        status: "done",
      },
      {
        title: "تم رفض الطلب",
        date: "2026-10-21",
        status: "rejected",
      },
    ],
  },
];

export default function TrainingRequests() {
  const [requests, setRequests] =
    useState(initialRequests);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("الكل");
  const [specializationFilter, setSpecializationFilter] =
    useState("الكل");
  const [organizationFilter, setOrganizationFilter] =
    useState("الكل");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showDecisionModal, setShowDecisionModal] =
    useState(false);

  const [decisionType, setDecisionType] =
    useState("");

  const [decisionNote, setDecisionNote] =
    useState("");

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    const total = requests.length;

    const review = requests.filter(
      (item) =>
        item.status === "قيد المراجعة"
    ).length;

    const waiting = requests.filter(
      (item) =>
        item.status === "بانتظار الموافقة"
    ).length;

    const approved = requests.filter(
      (item) => item.status === "مقبول"
    ).length;

    return [
      {
        title: "إجمالي الطلبات",
        value: total,
        description: "جميع طلبات التدريب",
        icon: FileText,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },
      {
        title: "قيد المراجعة",
        value: review,
        description: "تحتاج مراجعة البيانات",
        icon: Clock3,
        iconBg: "bg-[#FFF7E6]",
        iconColor: "text-[#C65D00]",
      },
      {
        title: "بانتظار الموافقة",
        value: waiting,
        description: "جاهزة لاتخاذ القرار",
        icon: Send,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
      {
        title: "طلبات مقبولة",
        value: approved,
        description: "تم اعتماد التدريب",
        icon: CheckCircle2,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },
    ];
  }, [requests]);

  const specializations = useMemo(
    () => [
      ...new Set(
        requests.map(
          (item) => item.specialization
        )
      ),
    ],
    [requests]
  );

  const organizations = useMemo(
    () => [
      ...new Set(
        requests.map(
          (item) => item.organization
        )
      ),
    ],
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !query ||
        request.student
          .toLowerCase()
          .includes(query) ||
        request.studentId
          .toLowerCase()
          .includes(query) ||
        request.code
          .toLowerCase()
          .includes(query) ||
        request.organization
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "الكل" ||
        request.status === statusFilter;

      const matchesSpecialization =
        specializationFilter === "الكل" ||
        request.specialization ===
          specializationFilter;

      const matchesOrganization =
        organizationFilter === "الكل" ||
        request.organization ===
          organizationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSpecialization &&
        matchesOrganization
      );
    });
  }, [
    requests,
    searchTerm,
    statusFilter,
    specializationFilter,
    organizationFilter,
  ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("الكل");
    setSpecializationFilter("الكل");
    setOrganizationFilter("الكل");
  };

  const hasFilters =
    searchTerm ||
    statusFilter !== "الكل" ||
    specializationFilter !== "الكل" ||
    organizationFilter !== "الكل";

  /* =========================================================
     DECISION
  ========================================================= */

  const openDecision = (type) => {
    setDecisionType(type);
    setDecisionNote("");
    setShowDecisionModal(true);
  };

  const submitDecision = () => {
    if (!selectedRequest) {
      return;
    }

    let newStatus = selectedRequest.status;

    if (decisionType === "approve") {
      newStatus = "مقبول";
    }

    if (decisionType === "reject") {
      newStatus = "مرفوض";
    }

    if (decisionType === "revision") {
      newStatus = "يحتاج تعديل";
    }

    if (decisionType === "forward") {
      newStatus = "بانتظار الموافقة";
    }

    setRequests((previous) =>
      previous.map((item) =>
        item.id === selectedRequest.id
          ? {
              ...item,
              status: newStatus,
              notes:
                decisionNote.trim() ||
                item.notes,
            }
          : item
      )
    );

    setSelectedRequest((previous) => ({
      ...previous,
      status: newStatus,
      notes:
        decisionNote.trim() ||
        previous.notes,
    }));

    setShowDecisionModal(false);
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
            {/* =================================================
                BREADCRUMB
            ================================================== */}

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
              <span>الرئيسية</span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span>التدريب الميداني</span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                طلبات التدريب
              </span>
            </div>

            {/* =================================================
                PAGE HEADER
            ================================================== */}

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
                  طلبات التدريب
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]
                    max-w-[720px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  مراجعة طلبات الطلبة والتحقق من الأهلية
                  والمستندات وجهة التدريب قبل اتخاذ قرار
                  الاعتماد أو طلب التعديل.
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="
                  flex
                  min-h-[42px]
                  w-full
                  items-center
                  justify-center
                  gap-[7px]

                  rounded-[9px]

                  border
                  border-[#D9E2EC]

                  bg-white

                  px-[14px]

                  text-[11px]
                  font-bold
                  text-[#475569]

                  transition

                  hover:bg-[#F8FAFC]

                  sm:w-auto
                "
              >
                <Download
                  size={16}
                  strokeWidth={1.8}
                />

                تصدير الطلبات
              </button>
            </section>

            {/* =================================================
                STATS
            ================================================== */}

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
              {statistics.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="
                      min-h-[130px]

                      rounded-[14px]

                      border
                      border-[#DDE5EF]

                      bg-white

                      p-[17px]

                      shadow-[0_1px_2px_rgba(15,23,42,0.03)]
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
                            text-[11px]
                            font-medium
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
                            font-bold
                            leading-[32px]

                            text-[#14213D]
                          "
                        >
                          {item.value}
                        </strong>

                        <p
                          className="
                            m-0
                            mt-[5px]

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
                  </article>
                );
              })}
            </section>

            {/* =================================================
                FILTERS
            ================================================== */}

            <section
              className="
                mt-[18px]

                rounded-[14px]

                border
                border-[#DDE5EF]

                bg-white

                p-[14px]

                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:p-[16px]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-2

                  xl:grid-cols-[minmax(0,1fr)_180px_220px_220px]
                "
              >
                <div>
                  <FilterLabel>
                    البحث
                  </FilterLabel>

                  <div
                    className="
                      flex
                      h-[42px]
                      items-center
                      gap-[9px]

                      rounded-[9px]

                      border
                      border-[#D9E2EC]

                      bg-white

                      px-[12px]

                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <Search
                      size={17}
                      strokeWidth={1.8}
                      className="
                        shrink-0
                        text-[#94A3B8]
                      "
                    />

                    <input
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="اسم الطالب، الرقم الجامعي، الجهة أو رقم الطلب..."
                      className="
                        h-full
                        min-w-0
                        flex-1

                        border-0
                        bg-transparent

                        font-['Cairo']

                        text-[11px]
                        text-[#334155]

                        outline-none

                        placeholder:text-[#94A3B8]
                      "
                    />
                  </div>
                </div>

                <FilterSelect
                  label="الحالة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="قيد المراجعة">
                    قيد المراجعة
                  </option>

                  <option value="بانتظار الموافقة">
                    بانتظار الموافقة
                  </option>

                  <option value="مقبول">
                    مقبول
                  </option>

                  <option value="يحتاج تعديل">
                    يحتاج تعديل
                  </option>

                  <option value="مرفوض">
                    مرفوض
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="التخصص"
                  value={specializationFilter}
                  onChange={
                    setSpecializationFilter
                  }
                >
                  <option value="الكل">
                    كل التخصصات
                  </option>

                  {specializations.map(
                    (specialization) => (
                      <option
                        key={specialization}
                        value={specialization}
                      >
                        {specialization}
                      </option>
                    )
                  )}
                </FilterSelect>

                <FilterSelect
                  label="جهة التدريب"
                  value={organizationFilter}
                  onChange={
                    setOrganizationFilter
                  }
                >
                  <option value="الكل">
                    كل الجهات
                  </option>

                  {organizations.map(
                    (organization) => (
                      <option
                        key={organization}
                        value={organization}
                      >
                        {organization}
                      </option>
                    )
                  )}
                </FilterSelect>
              </div>

              <div
                className="
                  mt-[12px]

                  flex
                  flex-col
                  gap-2

                  border-t
                  border-[#EEF2F7]

                  pt-[11px]

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <span
                  className="
                    text-[10px]
                    text-[#64748B]
                  "
                >
                  تم العثور على{" "}
                  <strong className="text-[#1E293B]">
                    {filteredRequests.length}
                  </strong>{" "}
                  طلب
                </span>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="
                      flex
                      w-fit
                      items-center
                      gap-[5px]

                      border-0
                      bg-transparent

                      text-[10px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    <RotateCcw size={13} />
                    إعادة تعيين الفلاتر
                  </button>
                )}
              </div>
            </section>

            {/* =================================================
                TABLE
            ================================================== */}

            <section
              className="
                mt-[16px]

                overflow-hidden

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
                  py-[15px]

                  sm:px-[18px]
                "
              >
                <div>
                  <h2
                    className="
                      m-0

                      text-[15px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    قائمة الطلبات
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    آخر طلبات التدريب المقدمة من الطلبة
                  </p>
                </div>

                <div
                  className="
                    rounded-[8px]

                    bg-[#F8FAFC]

                    px-[10px]
                    py-[7px]

                    text-[10px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  {filteredRequests.length} طلب
                </div>
              </div>

              {/* DESKTOP TABLE */}

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
                        الطالب
                      </TableHead>

                      <TableHead>
                        التخصص
                      </TableHead>

                      <TableHead>
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        الفرصة
                      </TableHead>

                      <TableHead>
                        تاريخ الطلب
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
                    {filteredRequests.map(
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
                            <div
                              className="
                                flex
                                min-w-[180px]
                                items-center
                                gap-[10px]
                              "
                            >
                              <StudentAvatar
                                name={
                                  request.student
                                }
                              />

                              <div>
                                <p
                                  className="
                                    m-0

                                    text-[11px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {
                                    request.student
                                  }
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[9px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {
                                    request.studentId
                                  }
                                  {" · "}
                                  {request.code}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div>
                              <p
                                className="
                                  m-0

                                  text-[10px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {
                                  request.specialization
                                }
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block
                                  max-w-[180px]
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
                            <p
                              className="
                                m-0
                                max-w-[170px]

                                text-[10px]
                                leading-[18px]
                                text-[#475569]
                              "
                            >
                              {
                                request.organization
                              }
                            </p>
                          </TableCell>

                          <TableCell>
                            <p
                              className="
                                m-0
                                max-w-[170px]

                                text-[10px]
                                leading-[18px]
                                text-[#475569]
                              "
                            >
                              {
                                request.opportunity
                              }
                            </p>
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
                            <RequestStatusBadge
                              status={
                                request.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  request
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
                              <Eye size={14} />
                              عرض
                            </button>
                          </TableCell>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {filteredRequests.length ===
                  0 && <EmptyState />}
              </div>

              {/* MOBILE */}

              <div
                className="
                  flex
                  flex-col
                  gap-[10px]

                  p-[12px]

                  md:hidden
                "
              >
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(
                    (request) => (
                      <article
                        key={request.id}
                        className="
                          rounded-[11px]

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
                          <div
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-[9px]
                            "
                          >
                            <StudentAvatar
                              name={
                                request.student
                              }
                            />

                            <div className="min-w-0">
                              <h3
                                className="
                                  m-0
                                  truncate

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

                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                {request.studentId}
                              </p>
                            </div>
                          </div>

                          <RequestStatusBadge
                            status={
                              request.status
                            }
                          />
                        </div>

                        <div
                          className="
                            mt-[12px]

                            grid
                            grid-cols-2
                            gap-3

                            border-t
                            border-[#E7ECF2]

                            pt-[11px]
                          "
                        >
                          <MobileInfo
                            label="التخصص"
                            value={
                              request.specialization
                            }
                          />

                          <MobileInfo
                            label="جهة التدريب"
                            value={
                              request.organization
                            }
                          />

                          <MobileInfo
                            label="الفرصة"
                            value={
                              request.opportunity
                            }
                          />

                          <MobileInfo
                            label="تاريخ الطلب"
                            value={request.date}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openDetails(request)
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
                          <Eye size={14} />
                          عرض تفاصيل الطلب
                        </button>
                      </article>
                    )
                  )
                ) : (
                  <EmptyState />
                )}
              </div>
            </section>

            {/* =================================================
                NOTE
            ================================================== */}

            <div
              className="
                mt-[14px]

                flex
                items-start
                gap-[8px]

                rounded-[10px]

                border
                border-[#D7E5FF]

                bg-[#F6F9FF]

                px-[13px]
                py-[11px]
              "
            >
              <CircleAlert
                size={16}
                className="
                  mt-[1px]
                  shrink-0
                  text-[#09379A]
                "
              />

              <p
                className="
                  m-0

                  text-[10px]
                  leading-[20px]
                  text-[#475569]
                "
              >
                قبل اعتماد الطلب يجب التحقق من أهلية الطالب
                للتدريب، ومتطلبات المساق، والمستندات، وتوفر
                مقعد داخل جهة التدريب.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          REQUEST DETAILS DRAWER
      ====================================================== */}

      {showDetails && selectedRequest && (
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

              backdrop-blur-[1px]
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
              max-w-[560px]
              flex-col

              bg-white

              shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
            "
          >
            {/* DRAWER HEADER */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                gap-4

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
                    text-[#1E293B]
                  "
                >
                  تفاصيل طلب التدريب
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]

                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  {selectedRequest.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDetails(false)
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

                  text-[#64748B]
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* DRAWER BODY */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto

                px-5
                py-5
              "
            >
              {/* STUDENT */}

              <div
                className="
                  flex
                  items-center
                  gap-[13px]
                "
              >
                <StudentAvatar
                  name={
                    selectedRequest.student
                  }
                  large
                />

                <div className="min-w-0">
                  <h3
                    className="
                      m-0

                      text-[17px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    {selectedRequest.student}
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[10px]
                      text-[#64748B]
                    "
                  >
                    {selectedRequest.studentId}
                    {" · "}
                    {selectedRequest.specialization}
                  </p>

                  <div className="mt-[6px]">
                    <RequestStatusBadge
                      status={
                        selectedRequest.status
                      }
                    />
                  </div>
                </div>
              </div>

              {/* STUDENT INFO */}

              <div
                className="
                  mt-[18px]

                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <InfoCard
                  label="الكلية"
                  value={
                    selectedRequest.college
                  }
                />

                <InfoCard
                  label="المستوى"
                  value={
                    selectedRequest.level
                  }
                />

                <InfoCard
                  label="البريد الإلكتروني"
                  value={
                    selectedRequest.email
                  }
                />

                <InfoCard
                  label="رقم الهاتف"
                  value={
                    selectedRequest.phone
                  }
                />
              </div>

              {/* TRAINING DATA */}

              <div className="mt-[20px]">
                <SectionTitle>
                  بيانات التدريب
                </SectionTitle>

                <div
                  className="
                    rounded-[11px]

                    border
                    border-[#E7ECF2]

                    bg-[#F8FAFC]

                    p-[13px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
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
                        {
                          selectedRequest.opportunity
                        }
                      </p>

                      <p
                        className="
                          m-0
                          mt-[3px]

                          text-[10px]
                          text-[#64748B]
                        "
                      >
                        {
                          selectedRequest.organization
                        }
                      </p>
                    </div>

                    <GraduationCap
                      size={19}
                      className="text-[#09379A]"
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-[9px]

                    grid
                    grid-cols-2
                    gap-[9px]
                  "
                >
                  <InfoCard
                    label="نوع التدريب"
                    value={
                      selectedRequest.trainingType
                    }
                  />

                  <InfoCard
                    label="الساعات"
                    value={`${selectedRequest.hours} ساعة`}
                  />

                  <InfoCard
                    label="تاريخ البداية"
                    value={
                      selectedRequest.startDate
                    }
                  />

                  <InfoCard
                    label="تاريخ النهاية"
                    value={
                      selectedRequest.endDate
                    }
                  />

                  <InfoCard
                    label="المشرف الأكاديمي"
                    value={
                      selectedRequest.academicSupervisor
                    }
                  />

                  <InfoCard
                    label="المشرف الميداني"
                    value={
                      selectedRequest.fieldSupervisor
                    }
                  />
                </div>
              </div>

              {/* ATTACHMENTS */}

              <div className="mt-[20px]">
                <SectionTitle>
                  المرفقات
                </SectionTitle>

                <div
                  className="
                    flex
                    flex-col
                    gap-[7px]
                  "
                >
                  {selectedRequest.attachments.map(
                    (file) => (
                      <button
                        key={file.name}
                        type="button"
                        className="
                          flex
                          min-h-[46px]
                          items-center
                          justify-between
                          gap-3

                          rounded-[9px]

                          border
                          border-[#E7ECF2]

                          bg-white

                          px-[11px]

                          text-right

                          transition

                          hover:bg-[#F8FAFC]
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-[9px]
                          "
                        >
                          <div
                            className="
                              flex
                              h-[30px]
                              w-[30px]
                              shrink-0
                              items-center
                              justify-center

                              rounded-[7px]

                              bg-[#EEF3FF]

                              text-[#09379A]
                            "
                          >
                            <FileText size={14} />
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                m-0
                                truncate

                                text-[10px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {file.name}
                            </p>

                            <span
                              className="
                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              {file.type}
                            </span>
                          </div>
                        </div>

                        <ChevronLeft
                          size={14}
                          className="text-[#94A3B8]"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* NOTES */}

              <div className="mt-[20px]">
                <SectionTitle>
                  ملاحظات المراجعة
                </SectionTitle>

                <div
                  className="
                    rounded-[10px]

                    border
                    border-[#E7ECF2]

                    bg-[#FAFBFC]

                    px-[12px]
                    py-[11px]
                  "
                >
                  <p
                    className="
                      m-0

                      text-[10px]
                      leading-[21px]
                      text-[#64748B]
                    "
                  >
                    {selectedRequest.notes}
                  </p>
                </div>
              </div>

              {/* TIMELINE */}

              <div className="mt-[20px]">
                <SectionTitle>
                  سجل الطلب
                </SectionTitle>

                <div>
                  {selectedRequest.timeline.map(
                    (item, index) => (
                      <TimelineItem
                        key={`${item.title}-${index}`}
                        item={item}
                        last={
                          index ===
                          selectedRequest.timeline
                            .length -
                            1
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* ACTIONS */}

            <div
              className="
                shrink-0

                border-t
                border-[#E2E8F0]

                bg-white

                px-5
                py-[14px]
              "
            >
              {selectedRequest.status ===
                "قيد المراجعة" && (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[8px]

                    sm:grid-cols-2
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      openDecision("forward")
                    }
                    className="
                      flex
                      min-h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border-0

                      bg-[#09379A]

                      px-[12px]

                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    <Send size={14} />
                    تحويل للموافقة
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision("revision")
                    }
                    className="
                      flex
                      min-h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border
                      border-[#FED7AA]

                      bg-[#FFF7ED]

                      px-[12px]

                      text-[10px]
                      font-bold
                      text-[#C2410C]
                    "
                  >
                    <CircleAlert size={14} />
                    طلب تعديل
                  </button>
                </div>
              )}

              {selectedRequest.status ===
                "بانتظار الموافقة" && (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[8px]

                    sm:grid-cols-2
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      openDecision("approve")
                    }
                    className="
                      flex
                      min-h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border-0

                      bg-[#15803D]

                      px-[12px]

                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    <CheckCircle2 size={14} />
                    اعتماد الطلب
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDecision("reject")
                    }
                    className="
                      flex
                      min-h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border
                      border-[#FECDD3]

                      bg-[#FFF1F2]

                      px-[12px]

                      text-[10px]
                      font-bold
                      text-[#BE123C]
                    "
                  >
                    <XCircle size={14} />
                    رفض الطلب
                  </button>
                </div>
              )}

              {[
                "مقبول",
                "مرفوض",
                "يحتاج تعديل",
              ].includes(
                selectedRequest.status
              ) && (
                <div
                  className="
                    flex
                    min-h-[42px]
                    items-center
                    justify-center

                    rounded-[9px]

                    bg-[#F8FAFC]

                    px-[12px]

                    text-[10px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  تم اتخاذ إجراء على هذا الطلب
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          DECISION MODAL
      ====================================================== */}

      {showDecisionModal &&
        selectedRequest && (
          <div
            onClick={() =>
              setShowDecisionModal(false)
            }
            className="
              fixed
              inset-0
              z-[120]

              flex
              items-center
              justify-center

              bg-[#0F172A]/45

              px-4

              backdrop-blur-[2px]
            "
          >
            <div
              dir="rtl"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                w-full
                max-w-[480px]

                rounded-[16px]

                border
                border-[#E2E8F0]

                bg-white

                shadow-[0_24px_70px_rgba(15,23,42,0.20)]
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4

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
                      text-[#1E293B]
                    "
                  >
                    {getDecisionTitle(
                      decisionType
                    )}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[3px]

                      text-[10px]
                      leading-[18px]
                      text-[#94A3B8]
                    "
                  >
                    الطلب:{" "}
                    {selectedRequest.code}
                    {" · "}
                    {selectedRequest.student}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDecisionModal(false)
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

                    text-[#64748B]
                  "
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 py-5">
                <label
                  className="
                    mb-[6px]
                    block

                    text-[10px]
                    font-bold
                    text-[#475569]
                  "
                >
                  ملاحظة القرار
                </label>

                <textarea
                  value={decisionNote}
                  onChange={(event) =>
                    setDecisionNote(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="اكتب ملاحظة واضحة للطالب أو للجهة المسؤولة..."
                  className="
                    w-full
                    resize-none

                    rounded-[9px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[11px]
                    py-[10px]

                    font-['Cairo']

                    text-[11px]
                    leading-[20px]
                    text-[#334155]

                    outline-none

                    placeholder:text-[#94A3B8]

                    focus:border-[#09379A]
                    focus:ring-2
                    focus:ring-[#09379A]/10
                  "
                />
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
                    setShowDecisionModal(false)
                  }
                  className="
                    min-h-[40px]

                    rounded-[8px]

                    border
                    border-[#D9E2EC]

                    bg-white

                    px-[16px]

                    text-[10px]
                    font-bold
                    text-[#475569]
                  "
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={submitDecision}
                  className={`
                    min-h-[40px]

                    rounded-[8px]

                    border-0

                    px-[18px]

                    text-[10px]
                    font-bold
                    text-white

                    ${
                      decisionType ===
                      "reject"
                        ? "bg-[#BE123C]"
                        : decisionType ===
                          "revision"
                        ? "bg-[#EA580C]"
                        : decisionType ===
                          "approve"
                        ? "bg-[#15803D]"
                        : "bg-[#09379A]"
                    }
                  `}
                >
                  تأكيد الإجراء
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

function RequestStatusBadge({ status }) {
  const styles = {
    "قيد المراجعة":
      "border-[#D7E5FF] bg-[#EEF4FF] text-[#09379A]",

    "بانتظار الموافقة":
      "border-[#FED7AA] bg-[#FFF7E6] text-[#C65D00]",

    مقبول:
      "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]",

    "يحتاج تعديل":
      "border-[#FDBA74] bg-[#FFF7ED] text-[#C2410C]",

    مرفوض:
      "border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
        items-center
        gap-[5px]

        whitespace-nowrap

        rounded-full

        border

        px-[8px]

        text-[9px]
        font-bold

        ${
          styles[status] ||
          "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      <span
        className={`
          h-[6px]
          w-[6px]

          rounded-full

          ${
            status === "مقبول"
              ? "bg-[#22C55E]"
              : status === "مرفوض"
              ? "bg-[#E11D48]"
              : status ===
                "يحتاج تعديل"
              ? "bg-[#F97316]"
              : status ===
                "بانتظار الموافقة"
              ? "bg-[#F59E0B]"
              : "bg-[#3B82F6]"
          }
        `}
      />

      {status}
    </span>
  );
}

function StudentAvatar({
  name,
  large = false,
}) {
  const parts = name
    .trim()
    .split(" ")
    .filter(Boolean);

  const initials = `${parts[0]?.[0] || ""}${
    parts[1]?.[0] || ""
  }`;

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center

        rounded-full

        border
        border-[#D7E5FF]

        bg-[#EEF3FF]

        font-bold
        text-[#09379A]

        ${
          large
            ? "h-[58px] w-[58px] text-[15px]"
            : "h-[38px] w-[38px] text-[11px]"
        }
      `}
    >
      {initials || (
        <UserRound size={17} />
      )}
    </div>
  );
}

function FilterLabel({ children }) {
  return (
    <label
      className="
        mb-[5px]
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

function FilterSelect({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <FilterLabel>
        {label}
      </FilterLabel>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[42px]
          w-full

          rounded-[9px]

          border
          border-[#D9E2EC]

          bg-white

          px-[10px]

          font-['Cairo']

          text-[10px]
          text-[#475569]

          outline-none

          focus:border-[#09379A]
          focus:ring-2
          focus:ring-[#09379A]/10
        "
      >
        {children}
      </select>
    </div>
  );
}

function TableHead({ children }) {
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

function TableCell({ children }) {
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

function InfoCard({
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

        px-[11px]
        py-[10px]
      "
    >
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
          mt-[3px]

          break-words

          text-[10px]
          font-bold
          leading-[18px]
          text-[#334155]
        "
      >
        {value || "—"}
      </p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h4
      className="
        m-0
        mb-[9px]

        text-[11px]
        font-bold
        text-[#334155]
      "
    >
      {children}
    </h4>
  );
}

function TimelineItem({
  item,
  last,
}) {
  return (
    <div
      className="
        relative
        flex
        gap-[11px]
        pb-[14px]

        last:pb-0
      "
    >
      {!last && (
        <span
          className="
            absolute
            right-[8px]
            top-[18px]
            bottom-0

            w-[2px]

            bg-[#E2E8F0]
          "
        />
      )}

      <div
        className={`
          relative
          z-[1]

          mt-[1px]

          flex
          h-[18px]
          w-[18px]
          shrink-0
          items-center
          justify-center

          rounded-full

          border

          ${
            item.status === "done"
              ? "border-[#09379A] bg-[#09379A] text-white"
              : item.status ===
                "current"
              ? "border-[#09379A] bg-white shadow-[0_0_0_3px_#EEF3FF]"
              : item.status ===
                "rejected"
              ? "border-[#E11D48] bg-[#E11D48] text-white"
              : "border-[#CBD5E1] bg-white"
          }
        `}
      >
        {item.status === "done" && (
          <CheckCircle2 size={11} />
        )}

        {item.status ===
          "rejected" && (
          <XCircle size={11} />
        )}
      </div>

      <div>
        <p
          className={`
            m-0

            text-[10px]
            leading-[18px]

            ${
              item.status === "todo"
                ? "text-[#94A3B8]"
                : "font-bold text-[#334155]"
            }
          `}
        >
          {item.title}
        </p>

        {item.date && (
          <p
            className="
              m-0
              mt-[1px]

              text-[9px]
              text-[#94A3B8]
            "
          >
            {item.date}
          </p>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center

        px-5
        py-8

        text-center
      "
    >
      <div
        className="
          flex
          h-[48px]
          w-[48px]
          items-center
          justify-center

          rounded-full

          bg-[#F1F5F9]

          text-[#94A3B8]
        "
      >
        <Users size={21} />
      </div>

      <h3
        className="
          m-0
          mt-[11px]

          text-[12px]
          font-bold
          text-[#334155]
        "
      >
        لا توجد طلبات مطابقة
      </h3>

      <p
        className="
          m-0
          mt-[3px]

          text-[10px]
          leading-[18px]
          text-[#94A3B8]
        "
      >
        جرّب تغيير البحث أو الفلاتر المستخدمة.
      </p>
    </div>
  );
}

function getDecisionTitle(type) {
  if (type === "approve") {
    return "اعتماد طلب التدريب";
  }

  if (type === "reject") {
    return "رفض طلب التدريب";
  }

  if (type === "revision") {
    return "طلب تعديل من الطالب";
  }

  return "تحويل الطلب للموافقة";
}