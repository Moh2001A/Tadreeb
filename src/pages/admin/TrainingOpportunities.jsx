import { useMemo, useState } from "react";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Download,
  Edit3,
  Eye,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

const initialOpportunities = [
  {
    id: 1,
    code: "OP-2026-031",
    title: "مطور برمجيات متدرب",
    organization: "شركة التقنية المتقدمة",
    field: "تكنولوجيا المعلومات",
    specialization: "هندسة البرمجيات",
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    location: "غزة",
    trainingType: "تدريب ميداني",
    mode: "حضوري",
    duration: "3 أشهر",
    hours: 120,
    capacity: 10,
    applicants: 18,
    accepted: 6,
    startDate: "2026-11-01",
    endDate: "2027-01-31",
    applyDeadline: "2026-10-28",
    supervisor: "م. محمد حمدي",
    description:
      "تدريب عملي لطلبة هندسة البرمجيات في تطوير تطبيقات الويب والعمل ضمن فريق برمجي.",
    status: "متاحة",
  },
  {
    id: 2,
    code: "OP-2026-030",
    title: "تدريب تمريض سريري",
    organization: "مستشفى الشفاء",
    field: "الصحة",
    specialization: "التمريض",
    college: "كلية العلوم الطبية التطبيقية",
    location: "غزة",
    trainingType: "تدريب عملي",
    mode: "حضوري",
    duration: "8 أسابيع",
    hours: 160,
    capacity: 20,
    applicants: 26,
    accepted: 17,
    startDate: "2026-11-05",
    endDate: "2026-12-31",
    applyDeadline: "2026-10-30",
    supervisor: "أ. محمد خليل",
    description:
      "تدريب سريري منظم للطلبة في أقسام الرعاية الصحية تحت إشراف ميداني.",
    status: "متاحة",
  },
  {
    id: 3,
    code: "OP-2026-029",
    title: "تدريب محاسبة وتدقيق",
    organization: "بنك فلسطين",
    field: "المال والأعمال",
    specialization: "المحاسبة",
    college: "كلية الاقتصاد والعلوم الإدارية",
    location: "غزة",
    trainingType: "تدريب ميداني",
    mode: "حضوري",
    duration: "3 أشهر",
    hours: 120,
    capacity: 8,
    applicants: 15,
    accepted: 8,
    startDate: "2026-10-10",
    endDate: "2027-01-10",
    applyDeadline: "2026-10-01",
    supervisor: "أ. رامي حسن",
    description:
      "تدريب تطبيقي في العمليات المحاسبية والتدقيق والعمليات المالية.",
    status: "مغلقة",
  },
  {
    id: 4,
    code: "OP-2026-028",
    title: "تدريب التربية العملية",
    organization: "مدرسة الأزهر النموذجية",
    field: "التعليم",
    specialization: "تعليم أساسي",
    college: "كلية التربية",
    location: "غزة",
    trainingType: "تدريب عملي",
    mode: "حضوري",
    duration: "10 أسابيع",
    hours: 150,
    capacity: 15,
    applicants: 12,
    accepted: 10,
    startDate: "2026-11-02",
    endDate: "2027-01-15",
    applyDeadline: "2026-10-27",
    supervisor: "أ. خالد النجار",
    description:
      "تدريب عملي لطلبة التربية داخل البيئة المدرسية ومتابعة الحصص والأنشطة.",
    status: "متاحة",
  },
  {
    id: 5,
    code: "OP-2026-027",
    title: "تصميم ومحتوى رقمي",
    organization: "مركز الإبداع الرقمي",
    field: "التقنية والإعلام",
    specialization: "التصميم الجرافيكي",
    college: "كلية الآداب والعلوم الإنسانية",
    location: "غزة",
    trainingType: "تدريب ميداني",
    mode: "هجين",
    duration: "2 شهر",
    hours: 100,
    capacity: 6,
    applicants: 9,
    accepted: 5,
    startDate: "2026-11-10",
    endDate: "2027-01-10",
    applyDeadline: "2026-11-02",
    supervisor: "م. سارة محمود",
    description:
      "فرصة تدريب في التصميم الرقمي وصناعة المحتوى وإدارة المشاريع الإبداعية.",
    status: "مسودة",
  },
];

const emptyForm = {
  title: "",
  organization: "",
  field: "",
  specialization: "",
  college: "",
  location: "غزة",
  trainingType: "تدريب ميداني",
  mode: "حضوري",
  duration: "",
  hours: "120",
  capacity: "10",
  startDate: "",
  endDate: "",
  applyDeadline: "",
  supervisor: "",
  description: "",
  status: "مسودة",
};

export default function TrainingOpportunities() {
  const [opportunities, setOpportunities] =
    useState(initialOpportunities);

  const [searchTerm, setSearchTerm] = useState("");
  const [organizationFilter, setOrganizationFilter] =
    useState("الكل");
  const [specializationFilter, setSpecializationFilter] =
    useState("الكل");
  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [showDetails, setShowDetails] =
    useState(false);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editingOpportunity, setEditingOpportunity] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const statistics = useMemo(() => {
    const total = opportunities.length;

    const active = opportunities.filter(
      (item) => item.status === "متاحة"
    ).length;

    const totalApplicants = opportunities.reduce(
      (sum, item) => sum + item.applicants,
      0
    );

    const totalCapacity = opportunities.reduce(
      (sum, item) => sum + item.capacity,
      0
    );

    return [
      {
        title: "إجمالي الفرص",
        value: total,
        description: "جميع فرص التدريب المسجلة",
        icon: BriefcaseBusiness,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },
      {
        title: "الفرص المتاحة",
        value: active,
        description: "متاحة للطلبة حاليًا",
        icon: CheckCircle2,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },
      {
        title: "طلبات التقديم",
        value: totalApplicants,
        description: "طلبات على جميع الفرص",
        icon: Users,
        iconBg: "bg-[#FFF3EB]",
        iconColor: "text-[#EA580C]",
      },
      {
        title: "إجمالي المقاعد",
        value: totalCapacity,
        description: "الطاقة الاستيعابية للفرص",
        icon: GraduationCap,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
    ];
  }, [opportunities]);

  const organizations = useMemo(
    () => [
      ...new Set(
        opportunities.map(
          (item) => item.organization
        )
      ),
    ],
    [opportunities]
  );

  const specializations = useMemo(
    () => [
      ...new Set(
        opportunities.map(
          (item) => item.specialization
        )
      ),
    ],
    [opportunities]
  );

  const filteredOpportunities = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return opportunities.filter((item) => {
      const matchesSearch =
        !query ||
        item.title
          .toLowerCase()
          .includes(query) ||
        item.organization
          .toLowerCase()
          .includes(query) ||
        item.specialization
          .toLowerCase()
          .includes(query) ||
        item.code
          .toLowerCase()
          .includes(query);

      const matchesOrganization =
        organizationFilter === "الكل" ||
        item.organization === organizationFilter;

      const matchesSpecialization =
        specializationFilter === "الكل" ||
        item.specialization ===
          specializationFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesOrganization &&
        matchesSpecialization &&
        matchesStatus
      );
    });
  }, [
    opportunities,
    searchTerm,
    organizationFilter,
    specializationFilter,
    statusFilter,
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const openAddForm = () => {
    setEditingOpportunity(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (opportunity) => {
    setEditingOpportunity(opportunity);

    setFormData({
      title: opportunity.title,
      organization: opportunity.organization,
      field: opportunity.field,
      specialization:
        opportunity.specialization,
      college: opportunity.college,
      location: opportunity.location,
      trainingType:
        opportunity.trainingType,
      mode: opportunity.mode,
      duration: opportunity.duration,
      hours: String(opportunity.hours),
      capacity: String(opportunity.capacity),
      startDate: opportunity.startDate,
      endDate: opportunity.endDate,
      applyDeadline:
        opportunity.applyDeadline,
      supervisor: opportunity.supervisor,
      description: opportunity.description,
      status: opportunity.status,
    });

    setShowDetails(false);
    setShowForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingOpportunity) {
      setOpportunities((previous) =>
        previous.map((item) =>
          item.id === editingOpportunity.id
            ? {
                ...item,
                ...formData,
                hours:
                  Number(formData.hours) || 0,
                capacity:
                  Number(formData.capacity) || 0,
              }
            : item
        )
      );
    } else {
      const nextId =
        Math.max(
          ...opportunities.map(
            (item) => item.id
          ),
          0
        ) + 1;

      const newOpportunity = {
        id: nextId,
        code: `OP-2026-${String(
          31 + nextId
        ).padStart(3, "0")}`,

        ...formData,

        hours:
          Number(formData.hours) || 0,

        capacity:
          Number(formData.capacity) || 0,

        applicants: 0,
        accepted: 0,
      };

      setOpportunities((previous) => [
        newOpportunity,
        ...previous,
      ]);
    }

    setShowForm(false);
    setEditingOpportunity(null);
    setFormData(emptyForm);
  };

  /* =========================================================
     DETAILS / STATUS
  ========================================================= */

  const openDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetails(true);
  };

  const changeStatus = (id, newStatus) => {
    setOpportunities((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    setSelectedOpportunity((previous) => {
      if (!previous || previous.id !== id) {
        return previous;
      }

      return {
        ...previous,
        status: newStatus,
      };
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setOrganizationFilter("الكل");
    setSpecializationFilter("الكل");
    setStatusFilter("الكل");
  };

  const hasFilters =
    searchTerm ||
    organizationFilter !== "الكل" ||
    specializationFilter !== "الكل" ||
    statusFilter !== "الكل";

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
                فرص التدريب
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
                  فرص التدريب
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
                  إنشاء وإدارة فرص التدريب وربطها بجهات
                  التدريب والكليات والتخصصات ومتابعة المقاعد
                  وطلبات التقديم.
                </p>
              </div>

              <div
                className="
                  flex
                  w-full
                  flex-col
                  gap-[8px]

                  sm:w-auto
                  sm:flex-row
                "
              >
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="
                    flex
                    min-h-[42px]
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
                  "
                >
                  <Download
                    size={16}
                    strokeWidth={1.8}
                  />

                  تصدير البيانات
                </button>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="
                    flex
                    min-h-[42px]
                    items-center
                    justify-center
                    gap-[7px]
                    rounded-[9px]
                    border-0
                    bg-[#09379A]
                    px-[16px]
                    text-[11px]
                    font-bold
                    text-white
                    shadow-[0_4px_12px_rgba(9,55,154,0.16)]
                    transition

                    hover:bg-[#072E81]
                  "
                >
                  <Plus
                    size={16}
                    strokeWidth={2}
                  />

                  إضافة فرصة تدريب
                </button>
              </div>
            </section>

            {/* =================================================
                STATISTICS
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
                  xl:grid-cols-[minmax(0,1fr)_210px_210px_160px]
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
                      placeholder="العنوان، الجهة، التخصص أو رقم الفرصة..."
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
                  label="الحالة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="متاحة">
                    متاحة
                  </option>

                  <option value="مغلقة">
                    مغلقة
                  </option>

                  <option value="مسودة">
                    مسودة
                  </option>
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
                    {
                      filteredOpportunities.length
                    }
                  </strong>{" "}
                  فرصة تدريب
                </span>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="
                      w-fit
                      border-0
                      bg-transparent
                      text-[10px]
                      font-bold
                      text-[#09379A]
                    "
                  >
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
                    قائمة فرص التدريب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    الفرص الحالية المرتبطة بجهات التدريب
                    والتخصصات الجامعية
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
                  {
                    filteredOpportunities.length
                  }{" "}
                  فرصة
                </div>
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
                        الفرصة
                      </TableHead>

                      <TableHead>
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        التخصص
                      </TableHead>

                      <TableHead>
                        المقاعد
                      </TableHead>

                      <TableHead>
                        التقديم
                      </TableHead>

                      <TableHead>
                        بداية التدريب
                      </TableHead>

                      <TableHead>
                        الحالة
                      </TableHead>

                      <TableHead>
                        الإجراءات
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOpportunities.map(
                      (opportunity) => {
                        const occupancy =
                          opportunity.capacity > 0
                            ? Math.min(
                                100,
                                Math.round(
                                  (opportunity.accepted /
                                    opportunity.capacity) *
                                    100
                                )
                              )
                            : 0;

                        return (
                          <tr
                            key={opportunity.id}
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
                                  min-w-[200px]
                                  items-center
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
                                    border
                                    border-[#D7E5FF]
                                    bg-[#EEF3FF]
                                    text-[#09379A]
                                  "
                                >
                                  <BriefcaseBusiness
                                    size={17}
                                    strokeWidth={1.8}
                                  />
                                </div>

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
                                      opportunity.title
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
                                      opportunity.code
                                    }
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
                                    opportunity.organization
                                  }
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    flex
                                    items-center
                                    gap-[4px]
                                    text-[9px]
                                    text-[#94A3B8]
                                  "
                                >
                                  <MapPin
                                    size={11}
                                  />
                                  {
                                    opportunity.location
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <p
                                className="
                                  m-0
                                  text-[10px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {
                                  opportunity.specialization
                                }
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block
                                  max-w-[170px]
                                  truncate
                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                {
                                  opportunity.college
                                }
                              </span>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[110px]">
                                <div
                                  className="
                                    mb-[5px]
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                  "
                                >
                                  <span
                                    className="
                                      text-[9px]
                                      text-[#64748B]
                                    "
                                  >
                                    {
                                      opportunity.accepted
                                    }{" "}
                                    /{" "}
                                    {
                                      opportunity.capacity
                                    }
                                  </span>

                                  <strong
                                    className="
                                      text-[9px]
                                      text-[#334155]
                                    "
                                  >
                                    {occupancy}%
                                  </strong>
                                </div>

                                <div
                                  className="
                                    h-[5px]
                                    overflow-hidden
                                    rounded-full
                                    bg-[#EEF2F7]
                                  "
                                >
                                  <div
                                    className={`
                                      h-full
                                      rounded-full

                                      ${
                                        occupancy >= 90
                                          ? "bg-[#EA580C]"
                                          : "bg-[#09379A]"
                                      }
                                    `}
                                    style={{
                                      width: `${occupancy}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0
                                    text-[10px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {
                                    opportunity.applicants
                                  }{" "}
                                  طلب
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block
                                    text-[9px]
                                    text-[#94A3B8]
                                  "
                                >
                                  حتى{" "}
                                  {
                                    opportunity.applyDeadline
                                  }
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-[5px]
                                  whitespace-nowrap
                                  text-[10px]
                                  text-[#64748B]
                                "
                              >
                                <CalendarDays
                                  size={13}
                                />

                                {
                                  opportunity.startDate
                                }
                              </div>
                            </TableCell>

                            <TableCell>
                              <OpportunityStatusBadge
                                status={
                                  opportunity.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div className="flex gap-[6px]">
                                <IconButton
                                  title="عرض التفاصيل"
                                  onClick={() =>
                                    openDetails(
                                      opportunity
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                </IconButton>

                                <IconButton
                                  title="تعديل"
                                  onClick={() =>
                                    openEditForm(
                                      opportunity
                                    )
                                  }
                                >
                                  <Edit3
                                    size={14}
                                  />
                                </IconButton>

                                <IconButton title="خيارات">
                                  <MoreHorizontal
                                    size={15}
                                  />
                                </IconButton>
                              </div>
                            </TableCell>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                {filteredOpportunities.length ===
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
                {filteredOpportunities.length >
                0 ? (
                  filteredOpportunities.map(
                    (opportunity) => (
                      <article
                        key={opportunity.id}
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
                          <div className="min-w-0">
                            <h3
                              className="
                                m-0
                                text-[12px]
                                font-bold
                                leading-[20px]
                                text-[#334155]
                              "
                            >
                              {
                                opportunity.title
                              }
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]
                                text-[9px]
                                text-[#94A3B8]
                              "
                            >
                              {
                                opportunity.code
                              }
                            </p>
                          </div>

                          <OpportunityStatusBadge
                            status={
                              opportunity.status
                            }
                          />
                        </div>

                        <div
                          className="
                            mt-[11px]
                            rounded-[9px]
                            bg-white
                            px-[10px]
                            py-[9px]
                          "
                        >
                          <p
                            className="
                              m-0
                              text-[10px]
                              font-bold
                              text-[#475569]
                            "
                          >
                            {
                              opportunity.organization
                            }
                          </p>

                          <p
                            className="
                              m-0
                              mt-[2px]
                              text-[9px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              opportunity.specialization
                            }
                          </p>
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
                            label="المقاعد"
                            value={`${opportunity.accepted} / ${opportunity.capacity}`}
                          />

                          <MobileInfo
                            label="طلبات التقديم"
                            value={
                              opportunity.applicants
                            }
                          />

                          <MobileInfo
                            label="المدة"
                            value={
                              opportunity.duration
                            }
                          />

                          <MobileInfo
                            label="الموقع"
                            value={
                              opportunity.location
                            }
                          />
                        </div>

                        <div
                          className="
                            mt-[12px]
                            flex
                            gap-[8px]
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                opportunity
                              )
                            }
                            className="
                              flex
                              h-[36px]
                              flex-1
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
                            التفاصيل
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(
                                opportunity
                              )
                            }
                            className="
                              flex
                              h-[36px]
                              flex-1
                              items-center
                              justify-center
                              gap-[6px]
                              rounded-[8px]
                              border
                              border-[#D9E2EC]
                              bg-white
                              text-[10px]
                              font-bold
                              text-[#475569]
                            "
                          >
                            <Edit3 size={13} />
                            تعديل
                          </button>
                        </div>
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
                ربط الفرصة بالكلية والتخصص والطاقة
                الاستيعابية يساعد لاحقًا في التحقق من أهلية
                الطالب ومنع التقديم على فرص غير مناسبة لمساره
                الأكاديمي.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails && selectedOpportunity && (
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
              max-w-[490px]
              flex-col

              bg-white

              shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
            "
          >
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
                  تفاصيل فرصة التدريب
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  بيانات الفرصة والتقديم والمقاعد
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
                  gap-[13px]
                "
              >
                <div
                  className="
                    flex
                    h-[58px]
                    w-[58px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    border
                    border-[#D7E5FF]
                    bg-[#EEF3FF]
                    text-[#09379A]
                  "
                >
                  <BriefcaseBusiness
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    className="
                      m-0
                      text-[17px]
                      font-bold
                      leading-[26px]
                      text-[#1E293B]
                    "
                  >
                    {
                      selectedOpportunity.title
                    }
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    {
                      selectedOpportunity.code
                    }
                  </p>

                  <div className="mt-[6px]">
                    <OpportunityStatusBadge
                      status={
                        selectedOpportunity.status
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-[18px]
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
                    gap-[8px]
                  "
                >
                  <Building2
                    size={16}
                    className="text-[#09379A]"
                  />

                  <p
                    className="
                      m-0
                      text-[11px]
                      font-bold
                      text-[#334155]
                    "
                  >
                    {
                      selectedOpportunity.organization
                    }
                  </p>
                </div>

                <div
                  className="
                    mt-[7px]
                    flex
                    items-center
                    gap-[5px]
                    text-[10px]
                    text-[#64748B]
                  "
                >
                  <MapPin size={13} />

                  {
                    selectedOpportunity.location
                  }
                </div>
              </div>

              <div
                className="
                  mt-[15px]
                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <InfoCard
                  label="التخصص"
                  value={
                    selectedOpportunity.specialization
                  }
                />

                <InfoCard
                  label="نوع التدريب"
                  value={
                    selectedOpportunity.trainingType
                  }
                />

                <InfoCard
                  label="نمط التدريب"
                  value={
                    selectedOpportunity.mode
                  }
                />

                <InfoCard
                  label="مدة التدريب"
                  value={
                    selectedOpportunity.duration
                  }
                />

                <InfoCard
                  label="الساعات"
                  value={`${selectedOpportunity.hours} ساعة`}
                />

                <InfoCard
                  label="المشرف"
                  value={
                    selectedOpportunity.supervisor
                  }
                />
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  الجدول الزمني
                </SectionTitle>

                <TimelineRow
                  label="آخر موعد للتقديم"
                  value={
                    selectedOpportunity.applyDeadline
                  }
                />

                <TimelineRow
                  label="بداية التدريب"
                  value={
                    selectedOpportunity.startDate
                  }
                />

                <TimelineRow
                  label="نهاية التدريب"
                  value={
                    selectedOpportunity.endDate
                  }
                />
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  المقاعد والتقديم
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-[8px]
                  "
                >
                  <MiniStat
                    label="المقاعد"
                    value={
                      selectedOpportunity.capacity
                    }
                  />

                  <MiniStat
                    label="المتقدمون"
                    value={
                      selectedOpportunity.applicants
                    }
                  />

                  <MiniStat
                    label="المقبولون"
                    value={
                      selectedOpportunity.accepted
                    }
                  />
                </div>
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  وصف الفرصة
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
                    {
                      selectedOpportunity.description
                    }
                  </p>
                </div>
              </div>
            </div>

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
              <div
                className="
                  flex
                  flex-col
                  gap-[8px]

                  sm:flex-row
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    openEditForm(
                      selectedOpportunity
                    )
                  }
                  className="
                    flex
                    min-h-[40px]
                    flex-1
                    items-center
                    justify-center
                    gap-[7px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    px-[14px]
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  <Edit3 size={14} />

                  تعديل الفرصة
                </button>

                {selectedOpportunity.status !==
                  "مغلقة" && (
                  <button
                    type="button"
                    onClick={() =>
                      changeStatus(
                        selectedOpportunity.id,
                        "مغلقة"
                      )
                    }
                    className="
                      min-h-[40px]
                      flex-1
                      rounded-[8px]
                      border
                      border-[#FED7AA]
                      bg-[#FFF7ED]
                      px-[14px]
                      text-[10px]
                      font-bold
                      text-[#C2410C]
                    "
                  >
                    إغلاق الفرصة
                  </button>
                )}

                {selectedOpportunity.status ===
                  "مغلقة" && (
                  <button
                    type="button"
                    onClick={() =>
                      changeStatus(
                        selectedOpportunity.id,
                        "متاحة"
                      )
                    }
                    className="
                      min-h-[40px]
                      flex-1
                      rounded-[8px]
                      border
                      border-[#BBF7D0]
                      bg-[#F0FDF4]
                      px-[14px]
                      text-[10px]
                      font-bold
                      text-[#15803D]
                    "
                  >
                    إعادة فتح الفرصة
                  </button>
                )}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {showForm && (
        <div
          onClick={() =>
            setShowForm(false)
          }
          className="
            fixed
            inset-0
            z-[110]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-[#0F172A]/45

            px-4
            py-6

            backdrop-blur-[2px]
          "
        >
          <form
            dir="rtl"
            onSubmit={handleSubmit}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              max-h-[92dvh]
              w-full
              max-w-[820px]
              overflow-y-auto

              rounded-[16px]

              border
              border-[#E2E8F0]

              bg-white

              shadow-[0_24px_70px_rgba(15,23,42,0.20)]
            "
          >
            <div
              className="
                sticky
                top-0
                z-10

                flex
                items-center
                justify-between
                gap-4

                border-b
                border-[#E2E8F0]

                bg-white

                px-5
                py-[16px]

                sm:px-6
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
                  {editingOpportunity
                    ? "تعديل فرصة التدريب"
                    : "إضافة فرصة تدريب جديدة"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  حدد جهة التدريب والتخصص والمقاعد
                  والفترة الزمنية للفرصة
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
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

            <div
              className="
                grid
                grid-cols-1
                gap-x-[16px]
                gap-y-[14px]

                px-5
                py-5

                sm:grid-cols-2
                sm:px-6
              "
            >
              <div className="sm:col-span-2">
                <FormInput
                  label="عنوان فرصة التدريب"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="مثال: مطور برمجيات متدرب"
                  required
                />
              </div>

              <FormInput
                label="جهة التدريب"
                name="organization"
                value={
                  formData.organization
                }
                onChange={handleFormChange}
                placeholder="اسم الجهة"
                required
              />

              <FormInput
                label="مجال التدريب"
                name="field"
                value={formData.field}
                onChange={handleFormChange}
                placeholder="تكنولوجيا المعلومات"
                required
              />

              <FormInput
                label="الكلية"
                name="college"
                value={formData.college}
                onChange={handleFormChange}
                placeholder="اسم الكلية"
                required
              />

              <FormInput
                label="التخصص المطلوب"
                name="specialization"
                value={
                  formData.specialization
                }
                onChange={handleFormChange}
                placeholder="هندسة البرمجيات"
                required
              />

              <FormSelect
                label="نوع التدريب"
                name="trainingType"
                value={
                  formData.trainingType
                }
                onChange={handleFormChange}
              >
                <option value="تدريب ميداني">
                  تدريب ميداني
                </option>

                <option value="تدريب عملي">
                  تدريب عملي
                </option>

                <option value="تدريب سريري">
                  تدريب سريري
                </option>
              </FormSelect>

              <FormSelect
                label="نمط التدريب"
                name="mode"
                value={formData.mode}
                onChange={handleFormChange}
              >
                <option value="حضوري">
                  حضوري
                </option>

                <option value="هجين">
                  هجين
                </option>

                <option value="عن بعد">
                  عن بعد
                </option>
              </FormSelect>

              <FormInput
                label="الموقع"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="غزة"
                required
              />

              <FormInput
                label="مدة التدريب"
                name="duration"
                value={formData.duration}
                onChange={handleFormChange}
                placeholder="مثال: 3 أشهر"
                required
              />

              <FormInput
                type="number"
                label="الساعات المطلوبة"
                name="hours"
                value={formData.hours}
                onChange={handleFormChange}
                min="1"
                required
              />

              <FormInput
                type="number"
                label="عدد المقاعد"
                name="capacity"
                value={formData.capacity}
                onChange={handleFormChange}
                min="1"
                required
              />

              <FormInput
                type="date"
                label="آخر موعد للتقديم"
                name="applyDeadline"
                value={
                  formData.applyDeadline
                }
                onChange={handleFormChange}
                required
              />

              <FormInput
                type="date"
                label="تاريخ بدء التدريب"
                name="startDate"
                value={formData.startDate}
                onChange={handleFormChange}
                required
              />

              <FormInput
                type="date"
                label="تاريخ انتهاء التدريب"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
                required
              />

              <FormInput
                label="المشرف الميداني"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleFormChange}
                placeholder="اسم المشرف"
              />

              <FormSelect
                label="حالة الفرصة"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="مسودة">
                  مسودة
                </option>

                <option value="متاحة">
                  متاحة
                </option>

                <option value="مغلقة">
                  مغلقة
                </option>
              </FormSelect>

              <div className="sm:col-span-2">
                <label
                  className="
                    mb-[6px]
                    block
                    text-[10px]
                    font-bold
                    text-[#475569]
                  "
                >
                  وصف فرصة التدريب
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="وصف مختصر لطبيعة التدريب والمهام..."
                  className="
                    w-full
                    resize-none
                    rounded-[8px]
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
            </div>

            <div
              className="
                sticky
                bottom-0

                flex
                flex-col-reverse
                gap-[8px]

                border-t
                border-[#E2E8F0]

                bg-white

                px-5
                py-[14px]

                sm:flex-row
                sm:justify-end
                sm:px-6
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
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
                type="submit"
                className="
                  flex
                  min-h-[40px]
                  items-center
                  justify-center
                  gap-[7px]
                  rounded-[8px]
                  border-0
                  bg-[#09379A]
                  px-[18px]
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                <CheckCircle2
                  size={15}
                />

                {editingOpportunity
                  ? "حفظ التعديلات"
                  : "إضافة الفرصة"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function OpportunityStatusBadge({
  status,
}) {
  let style =
    "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]";

  if (status === "متاحة") {
    style =
      "border-[#BBF7D0] bg-[#ECFDF3] text-[#15803D]";
  }

  if (status === "مغلقة") {
    style =
      "border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C]";
  }

  if (status === "مسودة") {
    style =
      "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]";
  }

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

        ${style}
      `}
    >
      <span
        className={`
          h-[6px]
          w-[6px]
          rounded-full

          ${
            status === "متاحة"
              ? "bg-[#22C55E]"
              : status === "مغلقة"
              ? "bg-[#E11D48]"
              : "bg-[#94A3B8]"
          }
        `}
      />

      {status}
    </span>
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

function IconButton({
  children,
  title,
  onClick,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="
        flex
        h-[31px]
        w-[31px]
        items-center
        justify-center
        rounded-[7px]
        border
        border-[#DCE5F0]
        bg-white
        text-[#64748B]
        transition

        hover:border-[#B7C8E4]
        hover:bg-[#F6F9FF]
        hover:text-[#09379A]
      "
    >
      {children}
    </button>
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

function TimelineRow({
  label,
  value,
}) {
  return (
    <div
      className="
        mb-[7px]
        flex
        items-center
        justify-between
        gap-4
        rounded-[9px]
        border
        border-[#E7ECF2]
        bg-[#FAFBFC]
        px-[11px]
        py-[10px]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[7px]
        "
      >
        <Clock3
          size={14}
          className="text-[#09379A]"
        />

        <span
          className="
            text-[10px]
            text-[#64748B]
          "
        >
          {label}
        </span>
      </div>

      <strong
        className="
          text-[10px]
          text-[#334155]
        "
      >
        {value}
      </strong>
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

function MiniStat({
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
        px-[8px]
        py-[10px]
        text-center
      "
    >
      <strong
        className="
          block
          text-[16px]
          text-[#14213D]
        "
      >
        {value}
      </strong>

      <span
        className="
          mt-[2px]
          block
          text-[8px]
          leading-[15px]
          text-[#64748B]
        "
      >
        {label}
      </span>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}) {
  return (
    <div>
      <label
        className="
          mb-[6px]
          block
          text-[10px]
          font-bold
          text-[#475569]
        "
      >
        {label}

        {required && (
          <span
            className="
              mr-[3px]
              text-[#DC2626]
            "
          >
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="
          h-[42px]
          w-full
          rounded-[8px]
          border
          border-[#D9E2EC]
          bg-white
          px-[11px]
          font-['Cairo']
          text-[11px]
          text-[#334155]
          outline-none

          placeholder:text-[#94A3B8]

          focus:border-[#09379A]
          focus:ring-2
          focus:ring-[#09379A]/10
        "
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <label
        className="
          mb-[6px]
          block
          text-[10px]
          font-bold
          text-[#475569]
        "
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          h-[42px]
          w-full
          rounded-[8px]
          border
          border-[#D9E2EC]
          bg-white
          px-[10px]
          font-['Cairo']
          text-[11px]
          text-[#334155]
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
        <BriefcaseBusiness
          size={21}
        />
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
        لا توجد فرص مطابقة
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