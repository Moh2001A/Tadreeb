import { useMemo, useState } from "react";

import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Download,
  Edit3,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

const initialOrganizations = [
  {
    id: 1,
    name: "شركة التقنية المتقدمة",
    type: "شركة خاصة",
    field: "تكنولوجيا المعلومات",
    specializations: [
      "هندسة البرمجيات",
      "نظم المعلومات",
      "الأمن السيبراني",
    ],
    city: "غزة",
    address: "شارع الوحدة - غزة",
    contactPerson: "م. أحمد صالح",
    phone: "0599123456",
    email: "info@advancedtech.ps",
    capacity: 20,
    currentStudents: 14,
    rating: 4.6,
    agreements: 1,
    status: "نشطة",
  },
  {
    id: 2,
    name: "مستشفى الشفاء",
    type: "مؤسسة صحية",
    field: "الصحة",
    specializations: [
      "التمريض",
      "المختبرات الطبية",
      "العلاج الطبيعي",
    ],
    city: "غزة",
    address: "مدينة غزة",
    contactPerson: "أ. محمد خليل",
    phone: "082865000",
    email: "training@hospital.ps",
    capacity: 35,
    currentStudents: 28,
    rating: 4.8,
    agreements: 2,
    status: "نشطة",
  },
  {
    id: 3,
    name: "بنك فلسطين",
    type: "مؤسسة مالية",
    field: "المال والأعمال",
    specializations: [
      "المحاسبة",
      "إدارة الأعمال",
      "التسويق",
    ],
    city: "غزة",
    address: "شارع عمر المختار",
    contactPerson: "أ. رامي حسن",
    phone: "082822222",
    email: "training@bankofpalestine.ps",
    capacity: 15,
    currentStudents: 11,
    rating: 4.4,
    agreements: 1,
    status: "نشطة",
  },
  {
    id: 4,
    name: "مدرسة الأزهر النموذجية",
    type: "مؤسسة تعليمية",
    field: "التعليم",
    specializations: [
      "تعليم أساسي",
      "اللغة العربية",
      "اللغة الإنجليزية",
    ],
    city: "غزة",
    address: "حي الرمال",
    contactPerson: "أ. خالد النجار",
    phone: "0598554455",
    email: "school@alazhar.ps",
    capacity: 25,
    currentStudents: 17,
    rating: 4.3,
    agreements: 1,
    status: "نشطة",
  },
  {
    id: 5,
    name: "مركز الإبداع الرقمي",
    type: "مركز تدريبي",
    field: "التقنية والإعلام",
    specializations: [
      "التصميم الجرافيكي",
      "الإعلام الرقمي",
    ],
    city: "غزة",
    address: "تل الهوى",
    contactPerson: "م. سارة محمود",
    phone: "0597663322",
    email: "info@digital.ps",
    capacity: 10,
    currentStudents: 0,
    rating: 3.9,
    agreements: 0,
    status: "غير نشطة",
  },
];

const emptyForm = {
  name: "",
  type: "شركة خاصة",
  field: "",
  specializations: "",
  city: "غزة",
  address: "",
  contactPerson: "",
  phone: "",
  email: "",
  capacity: "10",
  status: "نشطة",
};

export default function TrainingOrganizations() {
  const [organizations, setOrganizations] = useState(
    initialOrganizations
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("الكل");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [selectedOrganization, setSelectedOrganization] =
    useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState(null);

  const [formData, setFormData] = useState(emptyForm);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    const total = organizations.length;

    const active = organizations.filter(
      (item) => item.status === "نشطة"
    ).length;

    const students = organizations.reduce(
      (totalStudents, item) =>
        totalStudents + item.currentStudents,
      0
    );

    const capacity = organizations.reduce(
      (totalCapacity, item) =>
        totalCapacity + item.capacity,
      0
    );

    return [
      {
        title: "إجمالي الجهات",
        value: total,
        description: "جهات التدريب المسجلة",
        icon: Building2,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },
      {
        title: "الجهات النشطة",
        value: active,
        description: "متاحة لاستقبال الطلبة",
        icon: CheckCircle2,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },
      {
        title: "الطلبة المتدربون",
        value: students,
        description: "ضمن الجهات الحالية",
        icon: Users,
        iconBg: "bg-[#FFF3EB]",
        iconColor: "text-[#EA580C]",
      },
      {
        title: "الطاقة الاستيعابية",
        value: capacity,
        description: "إجمالي المقاعد المتاحة",
        icon: Users,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
    ];
  }, [organizations]);

  const fields = useMemo(
    () => [
      ...new Set(
        organizations.map((item) => item.field)
      ),
    ],
    [organizations]
  );

  const types = useMemo(
    () => [
      ...new Set(
        organizations.map((item) => item.type)
      ),
    ],
    [organizations]
  );

  const filteredOrganizations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return organizations.filter((organization) => {
      const matchesSearch =
        !query ||
        organization.name
          .toLowerCase()
          .includes(query) ||
        organization.field
          .toLowerCase()
          .includes(query) ||
        organization.city
          .toLowerCase()
          .includes(query) ||
        organization.specializations.some((item) =>
          item.toLowerCase().includes(query)
        );

      const matchesField =
        fieldFilter === "الكل" ||
        organization.field === fieldFilter;

      const matchesType =
        typeFilter === "الكل" ||
        organization.type === typeFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        organization.status === statusFilter;

      return (
        matchesSearch &&
        matchesField &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    organizations,
    searchTerm,
    fieldFilter,
    typeFilter,
    statusFilter,
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const openAddForm = () => {
    setEditingOrganization(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (organization) => {
    setEditingOrganization(organization);

    setFormData({
      name: organization.name,
      type: organization.type,
      field: organization.field,
      specializations:
        organization.specializations.join("، "),
      city: organization.city,
      address: organization.address,
      contactPerson: organization.contactPerson,
      phone: organization.phone,
      email: organization.email,
      capacity: String(organization.capacity),
      status: organization.status,
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

    const normalizedSpecializations =
      formData.specializations
        .split(/[،,]/)
        .map((item) => item.trim())
        .filter(Boolean);

    if (editingOrganization) {
      setOrganizations((previous) =>
        previous.map((item) =>
          item.id === editingOrganization.id
            ? {
                ...item,
                ...formData,
                capacity: Number(formData.capacity) || 0,
                specializations:
                  normalizedSpecializations,
              }
            : item
        )
      );
    } else {
      const newOrganization = {
        id:
          Math.max(
            ...organizations.map((item) => item.id),
            0
          ) + 1,

        ...formData,

        capacity: Number(formData.capacity) || 0,
        currentStudents: 0,
        rating: 0,
        agreements: 0,
        specializations:
          normalizedSpecializations,
      };

      setOrganizations((previous) => [
        newOrganization,
        ...previous,
      ]);
    }

    setShowForm(false);
    setEditingOrganization(null);
    setFormData(emptyForm);
  };

  const openDetails = (organization) => {
    setSelectedOrganization(organization);
    setShowDetails(true);
  };

  const toggleStatus = (id) => {
    setOrganizations((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "نشطة"
                  ? "غير نشطة"
                  : "نشطة",
            }
          : item
      )
    );

    setSelectedOrganization((previous) => {
      if (!previous || previous.id !== id) {
        return previous;
      }

      return {
        ...previous,
        status:
          previous.status === "نشطة"
            ? "غير نشطة"
            : "نشطة",
      };
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFieldFilter("الكل");
    setTypeFilter("الكل");
    setStatusFilter("الكل");
  };

  const hasFilters =
    searchTerm ||
    fieldFilter !== "الكل" ||
    typeFilter !== "الكل" ||
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
              <span>الرئيسية</span>
              <span className="text-[#94A3B8]">
                ›
              </span>
              <span>التدريب الميداني</span>
              <span className="text-[#94A3B8]">
                ›
              </span>
              <span className="font-bold text-[#09379A]">
                جهات التدريب
              </span>
            </div>

            {/* PAGE HEADER */}

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
                  جهات التدريب
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
                  إدارة المؤسسات والشركات والمستشفيات
                  والمدارس والجهات المعتمدة لاستقبال طلبة
                  التدريب في مختلف كليات الجامعة.
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
                  <Download size={16} />
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
                  <Plus size={16} strokeWidth={2} />
                  إضافة جهة تدريب
                </button>
              </div>
            </section>

            {/* STATISTICS */}

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
                        <p className="m-0 text-[11px] font-medium text-[#64748B]">
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
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* FILTERS */}

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
                  xl:grid-cols-[minmax(0,1fr)_180px_180px_160px]
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
                      className="shrink-0 text-[#94A3B8]"
                    />

                    <input
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(event.target.value)
                      }
                      placeholder="اسم الجهة، المجال، المدينة أو التخصص..."
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
                  label="المجال"
                  value={fieldFilter}
                  onChange={setFieldFilter}
                >
                  <option value="الكل">
                    كل المجالات
                  </option>

                  {fields.map((field) => (
                    <option
                      key={field}
                      value={field}
                    >
                      {field}
                    </option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="نوع الجهة"
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <option value="الكل">
                    كل الأنواع
                  </option>

                  {types.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="الحالة"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>
                  <option value="نشطة">
                    نشطة
                  </option>
                  <option value="غير نشطة">
                    غير نشطة
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
                <span className="text-[10px] text-[#64748B]">
                  تم العثور على{" "}
                  <strong className="text-[#1E293B]">
                    {filteredOrganizations.length}
                  </strong>{" "}
                  جهة تدريب
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

            {/* TABLE */}

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
                  border-b
                  border-[#EEF2F7]
                  px-4
                  py-[15px]

                  sm:px-[18px]
                "
              >
                <div>
                  <h2 className="m-0 text-[15px] font-bold text-[#1E293B]">
                    الجهات المسجلة
                  </h2>

                  <p className="m-0 mt-[2px] text-[10px] text-[#94A3B8]">
                    الجهات المتعاونة مع الجامعة في التدريب
                    الميداني والعملي
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
                  {filteredOrganizations.length} جهة
                </div>
              </div>

              {/* DESKTOP TABLE */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <TableHead>الجهة</TableHead>
                      <TableHead>المجال</TableHead>
                      <TableHead>التخصصات</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>الإشغال</TableHead>
                      <TableHead>التقييم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrganizations.map(
                      (organization) => {
                        const occupancy =
                          organization.capacity > 0
                            ? Math.round(
                                (organization.currentStudents /
                                  organization.capacity) *
                                  100
                              )
                            : 0;

                        return (
                          <tr
                            key={organization.id}
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
                                  min-w-[190px]
                                  items-center
                                  gap-[10px]
                                "
                              >
                                <OrganizationIcon />

                                <div>
                                  <p
                                    className="
                                      m-0
                                      text-[11px]
                                      font-bold
                                      text-[#334155]
                                    "
                                  >
                                    {organization.name}
                                  </p>

                                  <span
                                    className="
                                      mt-[2px]
                                      block
                                      text-[9px]
                                      text-[#94A3B8]
                                    "
                                  >
                                    {organization.type}
                                  </span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  text-[10px]
                                  font-medium
                                  text-[#475569]
                                "
                              >
                                {organization.field}
                              </span>
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  max-w-[210px]
                                  flex-wrap
                                  gap-[4px]
                                "
                              >
                                {organization.specializations
                                  .slice(0, 2)
                                  .map((item) => (
                                    <span
                                      key={item}
                                      className="
                                        rounded-full
                                        bg-[#F1F5F9]
                                        px-[7px]
                                        py-[3px]
                                        text-[8px]
                                        font-medium
                                        text-[#64748B]
                                      "
                                    >
                                      {item}
                                    </span>
                                  ))}

                                {organization.specializations
                                  .length > 2 && (
                                  <span
                                    className="
                                      rounded-full
                                      bg-[#EEF3FF]
                                      px-[7px]
                                      py-[3px]
                                      text-[8px]
                                      font-bold
                                      text-[#09379A]
                                    "
                                  >
                                    +
                                    {organization
                                      .specializations
                                      .length - 2}
                                  </span>
                                )}
                              </div>
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-[5px]
                                  text-[10px]
                                  text-[#64748B]
                                "
                              >
                                <MapPin size={13} />
                                {organization.city}
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[110px]">
                                <div
                                  className="
                                    mb-[5px]
                                    flex
                                    justify-between
                                    gap-3
                                    text-[9px]
                                  "
                                >
                                  <span className="text-[#64748B]">
                                    {
                                      organization.currentStudents
                                    }{" "}
                                    / {organization.capacity}
                                  </span>

                                  <strong className="text-[#334155]">
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
                                      width: `${Math.min(
                                        occupancy,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Rating
                                rating={
                                  organization.rating
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <StatusBadge
                                status={
                                  organization.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div className="flex gap-[6px]">
                                <IconButton
                                  title="عرض التفاصيل"
                                  onClick={() =>
                                    openDetails(
                                      organization
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                </IconButton>

                                <IconButton
                                  title="تعديل"
                                  onClick={() =>
                                    openEditForm(
                                      organization
                                    )
                                  }
                                >
                                  <Edit3 size={14} />
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

                {filteredOrganizations.length === 0 && (
                  <EmptyState />
                )}
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
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map(
                    (organization) => (
                      <article
                        key={organization.id}
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
                            <OrganizationIcon />

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
                                {organization.name}
                              </h3>

                              <p
                                className="
                                  m-0
                                  mt-[2px]
                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                {organization.type}
                              </p>
                            </div>
                          </div>

                          <StatusBadge
                            status={
                              organization.status
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
                            label="المجال"
                            value={
                              organization.field
                            }
                          />

                          <MobileInfo
                            label="المدينة"
                            value={
                              organization.city
                            }
                          />

                          <MobileInfo
                            label="الطلبة"
                            value={`${organization.currentStudents} / ${organization.capacity}`}
                          />

                          <MobileInfo
                            label="التقييم"
                            value={
                              organization.rating > 0
                                ? `${organization.rating} / 5`
                                : "لا يوجد"
                            }
                          />
                        </div>

                        <div className="mt-[12px] flex gap-[8px]">
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                organization
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
                                organization
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

            {/* INFORMATION NOTE */}

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
                الطاقة الاستيعابية تمثل الحد الأعلى
                المقترح لعدد الطلبة داخل جهة التدريب،
                ويمكن استخدامها لاحقًا في عملية توزيع
                الطلبة ومنع تجاوز المقاعد المتاحة.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* DETAILS DRAWER */}

      {showDetails && selectedOrganization && (
        <>
          <div
            onClick={() => setShowDetails(false)}
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
              max-w-[470px]
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
                <h2 className="m-0 text-[17px] font-bold text-[#1E293B]">
                  تفاصيل جهة التدريب
                </h2>

                <p className="m-0 mt-[2px] text-[10px] text-[#94A3B8]">
                  بيانات الجهة والتعاون الحالي
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails(false)}
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
              <div className="flex items-center gap-[13px]">
                <OrganizationIcon large />

                <div className="min-w-0">
                  <h3
                    className="
                      m-0
                      text-[17px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    {selectedOrganization.name}
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[11px]
                      text-[#64748B]
                    "
                  >
                    {selectedOrganization.field}
                  </p>

                  <div className="mt-[6px]">
                    <StatusBadge
                      status={
                        selectedOrganization.status
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-[20px]
                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <InfoCard
                  label="نوع الجهة"
                  value={
                    selectedOrganization.type
                  }
                />

                <InfoCard
                  label="المدينة"
                  value={
                    selectedOrganization.city
                  }
                />

                <InfoCard
                  label="الطاقة الاستيعابية"
                  value={`${selectedOrganization.capacity} طالبًا`}
                />

                <InfoCard
                  label="الطلبة الحاليون"
                  value={`${selectedOrganization.currentStudents} طالبًا`}
                />
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  التخصصات المقبولة
                </SectionTitle>

                <div className="flex flex-wrap gap-[6px]">
                  {selectedOrganization.specializations.map(
                    (item) => (
                      <span
                        key={item}
                        className="
                          rounded-full
                          border
                          border-[#D7E5FF]
                          bg-[#F6F9FF]
                          px-[9px]
                          py-[5px]
                          text-[9px]
                          font-bold
                          text-[#09379A]
                        "
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  معلومات التواصل
                </SectionTitle>

                <ContactRow
                  icon={Users}
                  label="مسؤول التواصل"
                  value={
                    selectedOrganization.contactPerson
                  }
                />

                <ContactRow
                  icon={Phone}
                  label="رقم الهاتف"
                  value={
                    selectedOrganization.phone
                  }
                />

                <ContactRow
                  icon={Mail}
                  label="البريد الإلكتروني"
                  value={
                    selectedOrganization.email
                  }
                />

                <ContactRow
                  icon={MapPin}
                  label="العنوان"
                  value={
                    selectedOrganization.address
                  }
                />
              </div>

              <div className="mt-[18px]">
                <SectionTitle>
                  مؤشرات التعاون
                </SectionTitle>

                <div className="grid grid-cols-3 gap-[8px]">
                  <MiniStat
                    label="طلبة حاليون"
                    value={
                      selectedOrganization.currentStudents
                    }
                  />

                  <MiniStat
                    label="الاتفاقيات"
                    value={
                      selectedOrganization.agreements
                    }
                  />

                  <MiniStat
                    label="التقييم"
                    value={
                      selectedOrganization.rating > 0
                        ? selectedOrganization.rating
                        : "—"
                    }
                  />
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
                      selectedOrganization
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
                    toggleStatus(
                      selectedOrganization.id
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
                      selectedOrganization.status ===
                      "نشطة"
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
                  {selectedOrganization.status ===
                  "نشطة"
                    ? "إيقاف الجهة"
                    : "إعادة تفعيل الجهة"}
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div
          onClick={() => setShowForm(false)}
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
              max-w-[780px]
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
                <h2 className="m-0 text-[17px] font-bold text-[#1E293B]">
                  {editingOrganization
                    ? "تعديل جهة التدريب"
                    : "إضافة جهة تدريب جديدة"}
                </h2>

                <p className="m-0 mt-[2px] text-[10px] text-[#94A3B8]">
                  أدخل البيانات الأساسية والتواصل والطاقة
                  الاستيعابية
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
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
              <FormInput
                label="اسم جهة التدريب"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="اسم المؤسسة أو الشركة"
                required
              />

              <FormSelect
                label="نوع الجهة"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="شركة خاصة">
                  شركة خاصة
                </option>
                <option value="مؤسسة صحية">
                  مؤسسة صحية
                </option>
                <option value="مؤسسة تعليمية">
                  مؤسسة تعليمية
                </option>
                <option value="مؤسسة مالية">
                  مؤسسة مالية
                </option>
                <option value="مؤسسة أهلية">
                  مؤسسة أهلية
                </option>
                <option value="مركز تدريبي">
                  مركز تدريبي
                </option>
                <option value="جهة حكومية">
                  جهة حكومية
                </option>
              </FormSelect>

              <FormInput
                label="مجال العمل"
                name="field"
                value={formData.field}
                onChange={handleFormChange}
                placeholder="مثال: تكنولوجيا المعلومات"
                required
              />

              <FormInput
                label="المدينة"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                placeholder="غزة"
                required
              />

              <div className="sm:col-span-2">
                <FormInput
                  label="التخصصات المقبولة"
                  name="specializations"
                  value={
                    formData.specializations
                  }
                  onChange={handleFormChange}
                  placeholder="هندسة البرمجيات، نظم المعلومات، الأمن السيبراني"
                  required
                />

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  افصل بين التخصصات بفاصلة.
                </p>
              </div>

              <div className="sm:col-span-2">
                <FormInput
                  label="العنوان"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="العنوان التفصيلي للجهة"
                  required
                />
              </div>

              <FormInput
                label="مسؤول التواصل"
                name="contactPerson"
                value={
                  formData.contactPerson
                }
                onChange={handleFormChange}
                placeholder="اسم مسؤول التدريب"
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
                type="email"
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="training@example.com"
                required
              />

              <FormInput
                type="number"
                label="الطاقة الاستيعابية"
                name="capacity"
                value={formData.capacity}
                onChange={handleFormChange}
                min="1"
                placeholder="10"
                required
              />

              <FormSelect
                label="حالة التعاون"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="نشطة">
                  نشطة
                </option>
                <option value="غير نشطة">
                  غير نشطة
                </option>
              </FormSelect>
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
                onClick={() => setShowForm(false)}
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
                <CheckCircle2 size={15} />

                {editingOrganization
                  ? "حفظ التعديلات"
                  : "إضافة الجهة"}
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

function OrganizationIcon({ large = false }) {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center

        rounded-[10px]

        border
        border-[#D7E5FF]

        bg-[#EEF3FF]

        text-[#09379A]

        ${
          large
            ? "h-[58px] w-[58px]"
            : "h-[38px] w-[38px]"
        }
      `}
    >
      <Building2
        size={large ? 24 : 17}
        strokeWidth={1.8}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "نشطة";

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

function Rating({ rating }) {
  if (!rating) {
    return (
      <span className="text-[9px] text-[#94A3B8]">
        لا يوجد
      </span>
    );
  }

  return (
    <div className="flex items-center gap-[4px]">
      <Star
        size={14}
        fill="currentColor"
        className="text-[#F59E0B]"
      />

      <span className="text-[10px] font-bold text-[#475569]">
        {rating}
      </span>
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
    <td className="px-[13px] py-[12px] align-middle">
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
      <p className="m-0 text-[9px] text-[#94A3B8]">
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
      <p className="m-0 text-[9px] text-[#94A3B8]">
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
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="m-0 text-[9px] text-[#94A3B8]">
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
          {value || "—"}
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
      <strong className="block text-[16px] text-[#14213D]">
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
        <Building2 size={21} />
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
        لا توجد جهات مطابقة
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