import { useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Download,
  Edit3,
  Eye,
  Filter,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

const initialSupervisors = [
  {
    id: 1,
    employeeId: "EMP-10235",
    name: "د. أحمد محمد",
    type: "أكاديمي",
    college: "كلية الهندسة وتكنولوجيا المعلومات",
    department: "هندسة البرمجيات",
    specialization: "هندسة البرمجيات",
    organization: "جامعة الأزهر - غزة",
    email: "ahmad.m@alazhar.edu.ps",
    phone: "0599123456",
    students: 8,
    capacity: 10,
    status: "نشط",
  },
  {
    id: 2,
    employeeId: "EMP-10241",
    name: "د. سارة علي",
    type: "أكاديمي",
    college: "كلية الاقتصاد والعلوم الإدارية",
    department: "المحاسبة",
    specialization: "المحاسبة",
    organization: "جامعة الأزهر - غزة",
    email: "sara.a@alazhar.edu.ps",
    phone: "0598765432",
    students: 6,
    capacity: 8,
    status: "نشط",
  },
  {
    id: 3,
    employeeId: "FS-2031",
    name: "م. محمد حمدي",
    type: "ميداني",
    college: "—",
    department: "قسم تقنية المعلومات",
    specialization: "هندسة البرمجيات",
    organization: "شركة التقنية الحديثة",
    email: "m.hamdi@tech.ps",
    phone: "0569123456",
    students: 5,
    capacity: 6,
    status: "نشط",
  },
  {
    id: 4,
    employeeId: "FS-2037",
    name: "م. ليلى حسن",
    type: "ميداني",
    college: "—",
    department: "قسم التصميم",
    specialization: "التصميم الجرافيكي",
    organization: "مؤسسة الإبداع",
    email: "l.hassan@creative.ps",
    phone: "0597654321",
    students: 7,
    capacity: 8,
    status: "نشط",
  },
  {
    id: 5,
    employeeId: "EMP-10258",
    name: "د. خالد يوسف",
    type: "أكاديمي",
    college: "كلية الآداب والعلوم الإنسانية",
    department: "اللغة الإنجليزية",
    specialization: "اللغة الإنجليزية",
    organization: "جامعة الأزهر - غزة",
    email: "khaled.y@alazhar.edu.ps",
    phone: "0595554321",
    students: 4,
    capacity: 8,
    status: "موقوف",
  },
  {
    id: 6,
    employeeId: "EMP-10267",
    name: "د. منى عبد الرحمن",
    type: "أكاديمي",
    college: "كلية التربية",
    department: "التربية العملية",
    specialization: "مناهج وطرق تدريس",
    organization: "جامعة الأزهر - غزة",
    email: "mona.a@alazhar.edu.ps",
    phone: "0597321456",
    students: 9,
    capacity: 10,
    status: "نشط",
  },
];

const emptyForm = {
  name: "",
  employeeId: "",
  type: "أكاديمي",
  college: "",
  department: "",
  specialization: "",
  organization: "",
  email: "",
  phone: "",
  capacity: "8",
  status: "نشط",
};

export default function Supervisors() {
  const [supervisors, setSupervisors] =
    useState(initialSupervisors);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] =
    useState("الكل");
  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [selectedSupervisor, setSelectedSupervisor] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingSupervisor, setEditingSupervisor] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const statistics = useMemo(() => {
    const total = supervisors.length;

    const active = supervisors.filter(
      (item) => item.status === "نشط"
    ).length;

    const academic = supervisors.filter(
      (item) => item.type === "أكاديمي"
    ).length;

    const field = supervisors.filter(
      (item) => item.type === "ميداني"
    ).length;

    return [
      {
        title: "إجمالي المشرفين",
        value: total,
        description: "جميع المشرفين المسجلين",
        icon: Users,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },
      {
        title: "المشرفون النشطون",
        value: active,
        description: "متاحون للإشراف حاليًا",
        icon: UserRoundCheck,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },
      {
        title: "المشرفون الأكاديميون",
        value: academic,
        description: "من كليات الجامعة",
        icon: GraduationCap,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
      {
        title: "المشرفون الميدانيون",
        value: field,
        description: "من جهات التدريب",
        icon: ShieldCheck,
        iconBg: "bg-[#FFF3EB]",
        iconColor: "text-[#EA580C]",
      },
    ];
  }, [supervisors]);

  const colleges = useMemo(
    () =>
      [
        ...new Set(
          supervisors
            .map((item) => item.college)
            .filter(
              (item) =>
                item &&
                item !== "—"
            )
        ),
      ],
    [supervisors]
  );

  const filteredSupervisors = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return supervisors.filter((supervisor) => {
      const matchesSearch =
        !query ||
        supervisor.name
          .toLowerCase()
          .includes(query) ||
        supervisor.employeeId
          .toLowerCase()
          .includes(query) ||
        supervisor.specialization
          .toLowerCase()
          .includes(query) ||
        supervisor.organization
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "الكل" ||
        supervisor.type === typeFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        supervisor.status === statusFilter;

      const matchesCollege =
        collegeFilter === "الكل" ||
        supervisor.college === collegeFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesCollege
      );
    });
  }, [
    supervisors,
    searchTerm,
    typeFilter,
    statusFilter,
    collegeFilter,
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const handleOpenAdd = () => {
    setEditingSupervisor(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleOpenEdit = (supervisor) => {
    setEditingSupervisor(supervisor);

    setFormData({
      name: supervisor.name,
      employeeId: supervisor.employeeId,
      type: supervisor.type,
      college:
        supervisor.college === "—"
          ? ""
          : supervisor.college,
      department: supervisor.department,
      specialization:
        supervisor.specialization,
      organization: supervisor.organization,
      email: supervisor.email,
      phone: supervisor.phone,
      capacity: String(supervisor.capacity),
      status: supervisor.status,
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

    if (editingSupervisor) {
      setSupervisors((previous) =>
        previous.map((item) =>
          item.id === editingSupervisor.id
            ? {
                ...item,
                ...formData,
                college:
                  formData.type === "ميداني"
                    ? "—"
                    : formData.college,
                capacity:
                  Number(formData.capacity) || 0,
              }
            : item
        )
      );
    } else {
      const newSupervisor = {
        id:
          Math.max(
            ...supervisors.map(
              (item) => item.id
            ),
            0
          ) + 1,

        ...formData,

        college:
          formData.type === "ميداني"
            ? "—"
            : formData.college,

        capacity:
          Number(formData.capacity) || 0,

        students: 0,
      };

      setSupervisors((previous) => [
        newSupervisor,
        ...previous,
      ]);
    }

    setShowForm(false);
    setEditingSupervisor(null);
    setFormData(emptyForm);
  };

  /* =========================================================
     DETAILS
  ========================================================= */

  const handleViewDetails = (supervisor) => {
    setSelectedSupervisor(supervisor);
    setShowDetails(true);
  };

  const handleToggleStatus = (id) => {
    setSupervisors((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "نشط"
                  ? "موقوف"
                  : "نشط",
            }
          : item
      )
    );

    setSelectedSupervisor((previous) => {
      if (!previous || previous.id !== id) {
        return previous;
      }

      return {
        ...previous,
        status:
          previous.status === "نشط"
            ? "موقوف"
            : "نشط",
      };
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("الكل");
    setStatusFilter("الكل");
    setCollegeFilter("الكل");
  };

  const hasActiveFilters =
    searchTerm ||
    typeFilter !== "الكل" ||
    statusFilter !== "الكل" ||
    collegeFilter !== "الكل";

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
            md:pt-6

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

                sm:text-[12px]
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
                المشرفون
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
                  إدارة المشرفين
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]
                    max-w-[680px]
                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  إدارة المشرفين الأكاديميين
                  والميدانيين ومتابعة عبء الإشراف
                  والطلبة المكلفين لكل مشرف.
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
                  onClick={() =>
                    window.print()
                  }
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
                  onClick={handleOpenAdd}
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

                  إضافة مشرف
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
                      min-h-[132px]
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
                            text-[28px]
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
                SEARCH / FILTERS
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
                  flex
                  flex-col
                  gap-[10px]

                  xl:flex-row
                  xl:items-end
                "
              >
                {/* SEARCH */}

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <FilterLabel>
                    بحث عن مشرف
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
                      transition

                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <Search
                      size={17}
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
                      placeholder="الاسم، الرقم الوظيفي، التخصص أو الجهة..."
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
                  label="نوع المشرف"
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>
                  <option value="أكاديمي">
                    أكاديمي
                  </option>
                  <option value="ميداني">
                    ميداني
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الحالة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>
                  <option value="نشط">
                    نشط
                  </option>
                  <option value="موقوف">
                    موقوف
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="الكلية"
                  value={collegeFilter}
                  onChange={setCollegeFilter}
                  wide
                >
                  <option value="الكل">
                    كل الكليات
                  </option>

                  {colleges.map((college) => (
                    <option
                      key={college}
                      value={college}
                    >
                      {college}
                    </option>
                  ))}
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
                <div
                  className="
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    text-[#64748B]
                  "
                >
                  <SlidersHorizontal
                    size={14}
                  />

                  تم العثور على{" "}
                  <strong className="text-[#1E293B]">
                    {filteredSupervisors.length}
                  </strong>{" "}
                  مشرف
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="
                      w-fit
                      border-0
                      bg-transparent
                      p-0
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
                    قائمة المشرفين
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    المشرفون الأكاديميون
                    والميدانيون المسجلون في النظام
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-[34px]
                    items-center
                    gap-[6px]
                    rounded-[8px]
                    bg-[#F8FAFC]
                    px-[10px]
                    text-[10px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  <Filter size={14} />
                  {filteredSupervisors.length}
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
                        المشرف
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        التخصص / القسم
                      </TableHead>

                      <TableHead>
                        الجهة
                      </TableHead>

                      <TableHead>
                        عبء الإشراف
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
                    {filteredSupervisors.map(
                      (supervisor) => {
                        const workload =
                          supervisor.capacity > 0
                            ? Math.min(
                                100,
                                Math.round(
                                  (supervisor.students /
                                    supervisor.capacity) *
                                    100
                                )
                              )
                            : 0;

                        return (
                          <tr
                            key={supervisor.id}
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
                                  items-center
                                  gap-[10px]
                                "
                              >
                                <SupervisorAvatar
                                  name={
                                    supervisor.name
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
                                      supervisor.name
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
                                      supervisor.employeeId
                                    }
                                  </span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <TypeBadge
                                type={
                                  supervisor.type
                                }
                              />
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
                                  supervisor.specialization
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
                                  supervisor.department
                                }
                              </span>
                            </TableCell>

                            <TableCell>
                              <p
                                className="
                                  m-0
                                  max-w-[190px]
                                  text-[10px]
                                  leading-[18px]
                                  text-[#475569]
                                "
                              >
                                {
                                  supervisor.organization
                                }
                              </p>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[120px]">
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
                                      supervisor.students
                                    }{" "}
                                    من{" "}
                                    {
                                      supervisor.capacity
                                    }
                                  </span>

                                  <span
                                    className="
                                      text-[9px]
                                      font-bold
                                      text-[#334155]
                                    "
                                  >
                                    {workload}%
                                  </span>
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
                                        workload >= 90
                                          ? "bg-[#EA580C]"
                                          : "bg-[#09379A]"
                                      }
                                    `}
                                    style={{
                                      width: `${workload}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <StatusBadge
                                status={
                                  supervisor.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-[6px]
                                "
                              >
                                <IconButton
                                  title="عرض التفاصيل"
                                  onClick={() =>
                                    handleViewDetails(
                                      supervisor
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                </IconButton>

                                <IconButton
                                  title="تعديل"
                                  onClick={() =>
                                    handleOpenEdit(
                                      supervisor
                                    )
                                  }
                                >
                                  <Edit3
                                    size={14}
                                  />
                                </IconButton>

                                <IconButton
                                  title="خيارات"
                                >
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

                {filteredSupervisors.length ===
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
                {filteredSupervisors.length >
                0 ? (
                  filteredSupervisors.map(
                    (supervisor) => (
                      <article
                        key={supervisor.id}
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
                            <SupervisorAvatar
                              name={
                                supervisor.name
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
                                {supervisor.name}
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
                                  supervisor.employeeId
                                }
                              </p>
                            </div>
                          </div>

                          <StatusBadge
                            status={
                              supervisor.status
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
                            label="النوع"
                            value={supervisor.type}
                          />

                          <MobileInfo
                            label="التخصص"
                            value={
                              supervisor.specialization
                            }
                          />

                          <MobileInfo
                            label="الجهة"
                            value={
                              supervisor.organization
                            }
                          />

                          <MobileInfo
                            label="الطلبة"
                            value={`${supervisor.students} / ${supervisor.capacity}`}
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
                              handleViewDetails(
                                supervisor
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
                              handleOpenEdit(
                                supervisor
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
                يوضح عبء الإشراف عدد الطلبة
                المكلف بهم المشرف مقارنة بالحد
                الأعلى المحدد له، ويساعد منسق
                التدريب على توزيع الطلبة بصورة
                متوازنة.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {showDetails && selectedSupervisor && (
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
              max-w-[460px]
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
                  تفاصيل المشرف
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  المعلومات والتكليفات الحالية
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
              <div
                className="
                  flex
                  items-center
                  gap-[13px]
                "
              >
                <SupervisorAvatar
                  name={
                    selectedSupervisor.name
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
                    {selectedSupervisor.name}
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[11px]
                      text-[#64748B]
                    "
                  >
                    {
                      selectedSupervisor.specialization
                    }
                  </p>

                  <div
                    className="
                      mt-[6px]
                      flex
                      flex-wrap
                      gap-[6px]
                    "
                  >
                    <TypeBadge
                      type={
                        selectedSupervisor.type
                      }
                    />

                    <StatusBadge
                      status={
                        selectedSupervisor.status
                      }
                    />
                  </div>
                </div>
              </div>

              {/* CONTACT */}

              <div
                className="
                  mt-[20px]
                  grid
                  grid-cols-1
                  gap-[9px]

                  sm:grid-cols-2
                "
              >
                <InfoCard
                  label="الرقم الوظيفي"
                  value={
                    selectedSupervisor.employeeId
                  }
                />

                <InfoCard
                  label="عدد الطلبة"
                  value={`${selectedSupervisor.students} / ${selectedSupervisor.capacity}`}
                />

                <InfoCard
                  label="الكلية"
                  value={
                    selectedSupervisor.college
                  }
                />

                <InfoCard
                  label="القسم"
                  value={
                    selectedSupervisor.department
                  }
                />
              </div>

              <div
                className="
                  mt-[14px]
                  rounded-[11px]
                  border
                  border-[#E7ECF2]
                  bg-[#F8FAFC]
                  p-[13px]
                "
              >
                <p
                  className="
                    m-0
                    text-[10px]
                    font-bold
                    text-[#334155]
                  "
                >
                  جهة العمل
                </p>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[11px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  {selectedSupervisor.organization}
                </p>
              </div>

              {/* CONTACT DETAILS */}

              <div className="mt-[18px]">
                <SectionTitle>
                  معلومات التواصل
                </SectionTitle>

                <ContactRow
                  icon={Mail}
                  label="البريد الإلكتروني"
                  value={
                    selectedSupervisor.email
                  }
                />

                <ContactRow
                  icon={Phone}
                  label="رقم الهاتف"
                  value={
                    selectedSupervisor.phone
                  }
                />
              </div>

              {/* WORKLOAD */}

              <div className="mt-[18px]">
                <SectionTitle>
                  عبء الإشراف الحالي
                </SectionTitle>

                <WorkloadCard
                  students={
                    selectedSupervisor.students
                  }
                  capacity={
                    selectedSupervisor.capacity
                  }
                />
              </div>

              {/* ASSIGNMENTS */}

              <div className="mt-[18px]">
                <SectionTitle>
                  ملخص التكليفات
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-[8px]
                  "
                >
                  <MiniStat
                    label="طلبة نشطون"
                    value={
                      selectedSupervisor.students
                    }
                  />

                  <MiniStat
                    label="زيارات"
                    value="3"
                  />

                  <MiniStat
                    label="تقييمات"
                    value="6"
                  />
                </div>
              </div>
            </div>

            {/* DRAWER ACTIONS */}

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
                    handleOpenEdit(
                      selectedSupervisor
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
                  تعديل البيانات
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleToggleStatus(
                      selectedSupervisor.id
                    )
                  }
                  className={`
                    min-h-[40px]
                    flex-1
                    rounded-[8px]
                    border
                    px-[14px]
                    text-[10px]
                    font-bold

                    ${
                      selectedSupervisor.status ===
                      "نشط"
                        ? `
                          border-[#FED7AA]
                          bg-[#FFF7ED]
                          text-[#C2410C]
                        `
                        : `
                          border-[#BBF7D0]
                          bg-[#F0FDF4]
                          text-[#15803D]
                        `
                    }
                  `}
                >
                  {selectedSupervisor.status ===
                  "نشط"
                    ? "إيقاف المشرف"
                    : "إعادة تفعيل المشرف"}
                </button>
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
          onClick={() =>
            setShowForm(false)
          }
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
              max-w-[760px]
              overflow-y-auto
              rounded-[16px]
              border
              border-[#E2E8F0]
              bg-white
              shadow-[0_24px_70px_rgba(15,23,42,0.20)]
            "
          >
            {/* MODAL HEADER */}

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
                  {editingSupervisor
                    ? "تعديل بيانات المشرف"
                    : "إضافة مشرف جديد"}
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[10px]
                    text-[#94A3B8]
                  "
                >
                  أدخل بيانات المشرف
                  الأكاديمية أو الميدانية
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

            {/* FORM */}

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
              <FormInput
                label="اسم المشرف"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="مثال: د. أحمد محمد"
                required
              />

              <FormInput
                label="الرقم الوظيفي / التعريفي"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleFormChange}
                placeholder="EMP-10235"
                required
              />

              <FormSelect
                label="نوع المشرف"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="أكاديمي">
                  مشرف أكاديمي
                </option>

                <option value="ميداني">
                  مشرف ميداني
                </option>
              </FormSelect>

              <FormSelect
                label="الحالة"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="نشط">
                  نشط
                </option>

                <option value="موقوف">
                  موقوف
                </option>
              </FormSelect>

              {formData.type ===
                "أكاديمي" && (
                <FormInput
                  label="الكلية"
                  name="college"
                  value={formData.college}
                  onChange={
                    handleFormChange
                  }
                  placeholder="كلية الهندسة وتكنولوجيا المعلومات"
                  required
                />
              )}

              <FormInput
                label="القسم"
                name="department"
                value={
                  formData.department
                }
                onChange={handleFormChange}
                placeholder="اسم القسم"
                required
              />

              <FormInput
                label="التخصص"
                name="specialization"
                value={
                  formData.specialization
                }
                onChange={handleFormChange}
                placeholder="التخصص"
                required
              />

              <FormInput
                label={
                  formData.type ===
                  "أكاديمي"
                    ? "جهة العمل"
                    : "جهة التدريب"
                }
                name="organization"
                value={
                  formData.organization
                }
                onChange={handleFormChange}
                placeholder={
                  formData.type ===
                  "أكاديمي"
                    ? "جامعة الأزهر - غزة"
                    : "اسم المؤسسة أو الشركة"
                }
                required
              />

              <FormInput
                type="email"
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="name@example.com"
                required
              />

              <FormInput
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="0590000000"
                required
              />

              <FormInput
                type="number"
                label="الحد الأعلى لعدد الطلبة"
                name="capacity"
                value={formData.capacity}
                onChange={handleFormChange}
                min="1"
                placeholder="8"
                required
              />
            </div>

            {/* MODAL FOOTER */}

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

                {editingSupervisor
                  ? "حفظ التعديلات"
                  : "إضافة المشرف"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  children,
  wide = false,
}) {
  return (
    <div
      className={
        wide
          ? "w-full xl:w-[230px]"
          : "w-full xl:w-[150px]"
      }
    >
      <FilterLabel>{label}</FilterLabel>

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
          transition

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

/* =========================================================
   BADGES
========================================================= */

function StatusBadge({ status }) {
  const active = status === "نشط";

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
          active
            ? `
              border-[#BBF7D0]
              bg-[#ECFDF3]
              text-[#15803D]
            `
            : `
              border-[#E2E8F0]
              bg-[#F1F5F9]
              text-[#64748B]
            `
        }
      `}
    >
      <span
        className={`
          h-[6px]
          w-[6px]
          rounded-full

          ${
            active
              ? "bg-[#22C55E]"
              : "bg-[#94A3B8]"
          }
        `}
      />

      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const academic =
    type === "أكاديمي";

  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
        items-center
        rounded-full
        px-[8px]
        text-[9px]
        font-bold

        ${
          academic
            ? `
              bg-[#EEF3FF]
              text-[#09379A]
            `
            : `
              bg-[#FFF3EB]
              text-[#C2410C]
            `
        }
      `}
    >
      {academic
        ? "مشرف أكاديمي"
        : "مشرف ميداني"}
    </span>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function SupervisorAvatar({
  name,
  large = false,
}) {
  const cleanName = name
    .replace("د.", "")
    .replace("م.", "")
    .trim();

  const parts = cleanName.split(" ");

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
            ? `
              h-[58px]
              w-[58px]
              text-[15px]
            `
            : `
              h-[38px]
              w-[38px]
              text-[11px]
            `
        }
      `}
    >
      {initials || (
        <UserRound size={17} />
      )}
    </div>
  );
}

/* =========================================================
   WORKLOAD
========================================================= */

function WorkloadCard({
  students,
  capacity,
}) {
  const percentage =
    capacity > 0
      ? Math.min(
          100,
          Math.round(
            (students / capacity) * 100
          )
        )
      : 0;

  return (
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
          gap-3
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
            الطلبة المكلفون
          </p>

          <strong
            className="
              mt-[3px]
              block
              text-[19px]
              text-[#1E293B]
            "
          >
            {students}

            <span
              className="
                mr-[4px]
                text-[10px]
                font-medium
                text-[#94A3B8]
              "
            >
              / {capacity}
            </span>
          </strong>
        </div>

        <span
          className={`
            text-[11px]
            font-bold

            ${
              percentage >= 90
                ? "text-[#EA580C]"
                : "text-[#09379A]"
            }
          `}
        >
          {percentage}%
        </span>
      </div>

      <div
        className="
          mt-[10px]
          h-[7px]
          overflow-hidden
          rounded-full
          bg-[#E2E8F0]
        "
      >
        <div
          className={`
            h-full
            rounded-full

            ${
              percentage >= 90
                ? "bg-[#EA580C]"
                : "bg-[#09379A]"
            }
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   INFORMATION
========================================================= */

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

function ContactRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        mb-[8px]
        flex
        items-center
        gap-[10px]
        rounded-[9px]
        border
        border-[#E7ECF2]
        px-[11px]
        py-[10px]
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
          bg-[#EEF3FF]
          text-[#09379A]
        "
      >
        <Icon
          size={15}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
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
            mt-[1px]
            break-all
            text-[10px]
            font-medium
            text-[#475569]
          "
        >
          {value}
        </p>
      </div>
    </div>
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

/* =========================================================
   TABLE
========================================================= */

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

/* =========================================================
   FORM
========================================================= */

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
          <span className="mr-[3px] text-[#DC2626]">
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
          transition

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

/* =========================================================
   EMPTY
========================================================= */

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
        لا توجد نتائج
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
        جرّب تغيير البحث أو الفلاتر
        المستخدمة.
      </p>
    </div>
  );
}