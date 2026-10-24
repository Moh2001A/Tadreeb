import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  MapPinned,
  Search,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AdvancedSearch() {
  const navigate = useNavigate();

  /* =========================================================
     FILTERS
  ========================================================= */

  const [filters, setFilters] = useState({
    search: "",
    category: "الكل",
    college: "الكل",
    status: "الكل",
    fromDate: "",
    toDate: "",
  });

  const [selectedResult, setSelectedResult] =
    useState(null);

  /* =========================================================
     DATA
  ========================================================= */

  const results = [
    {
      id: 1,

      type: "طالب",
      title: "أحمد خالد محمد",
      code: "20231045",

      subtitle:
        "هندسة البرمجيات - كلية الهندسة وتكنولوجيا المعلومات",

      college:
        "كلية الهندسة وتكنولوجيا المعلومات",

      status: "في التدريب",

      date: "2026/10/24",

      meta:
        "شركة التقنية المتقدمة",

      description:
        "طالب مؤهل وموزع حاليًا على جهة تدريب معتمدة.",

      route: "/admin/students",

      icon: GraduationCap,
    },

    {
      id: 2,

      type: "طلب تدريب",
      title: "طلب تدريب - أحمد خالد محمد",
      code: "TR-2026-084",

      subtitle:
        "هندسة البرمجيات",

      college:
        "كلية الهندسة وتكنولوجيا المعلومات",

      status: "قيد المراجعة",

      date: "2026/10/24",

      meta:
        "شركة التقنية المتقدمة",

      description:
        "طلب تدريب ميداني جديد يحتاج إلى مراجعة واعتماد البيانات.",

      route: "/admin/training-requests",

      icon: ClipboardList,
    },

    {
      id: 3,

      type: "جهة تدريب",
      title: "شركة التقنية المتقدمة",
      code: "ORG-001",

      subtitle:
        "شركة تكنولوجيا وبرمجيات",

      college: "الكل",

      status: "نشطة",

      date: "2026/10/20",

      meta:
        "6 طلبة حاليًا",

      description:
        "جهة تدريب معتمدة تستقبل طلبة هندسة البرمجيات ونظم المعلومات.",

      route:
        "/admin/training-organizations",

      icon: Building2,
    },

    {
      id: 4,

      type: "فرصة تدريب",
      title: "مطور برمجيات متدرب",
      code: "OPP-2026-018",

      subtitle:
        "شركة التقنية المتقدمة",

      college:
        "كلية الهندسة وتكنولوجيا المعلومات",

      status: "متاحة",

      date: "2026/10/19",

      meta:
        "4 مقاعد متاحة",

      description:
        "فرصة تدريب مخصصة لطلبة هندسة البرمجيات خلال الفصل الأول.",

      route:
        "/admin/training-opportunities",

      icon: BriefcaseBusiness,
    },

    {
      id: 5,

      type: "مشرف",
      title: "د. سامر يوسف",
      code: "SUP-018",

      subtitle:
        "مشرف أكاديمي - هندسة البرمجيات",

      college:
        "كلية الهندسة وتكنولوجيا المعلومات",

      status: "نشط",

      date: "2026/10/18",

      meta:
        "8 طلبة تحت الإشراف",

      description:
        "مشرف أكاديمي معتمد لمتابعة طلبة التدريب الميداني.",

      route: "/admin/supervisors",

      icon: UserRoundCheck,
    },

    {
      id: 6,

      type: "زيارة",
      title: "زيارة متابعة - أحمد خالد محمد",
      code: "VIS-2026-014",

      subtitle:
        "شركة التقنية المتقدمة",

      college:
        "كلية الهندسة وتكنولوجيا المعلومات",

      status: "مكتملة",

      date: "2026/10/17",

      meta:
        "د. سامر يوسف",

      description:
        "زيارة متابعة ميدانية تم توثيق تقريرها وتأكيد حضور الطالب.",

      route: "/admin/visits",

      icon: MapPinned,
    },

    {
      id: 7,

      type: "تقييم",
      title: "التقييم النهائي - مريم أحمد علي",
      code: "EV-2026-041",

      subtitle:
        "تمريض - مستشفى الشفاء",

      college:
        "كلية العلوم الطبية التطبيقية",

      status: "تم التقييم",

      date: "2026/10/16",

      meta:
        "97 / 100",

      description:
        "التقييم النهائي للطالب بعد استيفاء متطلبات التدريب.",

      route: "/admin/evaluations",

      icon: FileCheck2,
    },

    {
      id: 8,

      type: "تقرير",
      title: "التقرير النهائي - مريم أحمد علي",
      code: "FR-2026-021",

      subtitle:
        "التدريب السريري",

      college:
        "كلية العلوم الطبية التطبيقية",

      status: "معتمد",

      date: "2026/10/15",

      meta:
        "160 ساعة مكتملة",

      description:
        "تقرير الإتمام النهائي المعتمد قبل إصدار شهادة التدريب.",

      route: "/admin/final-reports",

      icon: BarChart3,
    },

    {
      id: 9,

      type: "شهادة",
      title: "شهادة تدريب - مريم أحمد علي",
      code: "CERT-2026-009",

      subtitle:
        "التدريب السريري",

      college:
        "كلية العلوم الطبية التطبيقية",

      status: "تم الإصدار",

      date: "2026/10/14",

      meta:
        "شهادة تدريب ميداني",

      description:
        "شهادة إتمام التدريب بعد اعتماد جميع المتطلبات.",

      route: "/admin/certificates",

      icon: Award,
    },

    {
      id: 10,

      type: "دورة تدريبية",
      title: "الإنعاش القلبي الرئوي CPR",
      code: "TR-C-101",

      subtitle:
        "دورة صحية",

      college: "الكل",

      status: "منتهية",

      date: "2026/10/13",

      meta:
        "26 متدربًا",

      description:
        "دورة تدريبية مكتملة تتضمن حضورًا وتقييمًا وشهادات.",

      route: "/admin/courses",

      icon: ShieldCheck,
    },
  ];

  /* =========================================================
     OPTIONS
  ========================================================= */

  const categories = [
    "الكل",
    "طالب",
    "طلب تدريب",
    "جهة تدريب",
    "فرصة تدريب",
    "مشرف",
    "زيارة",
    "تقييم",
    "تقرير",
    "شهادة",
    "دورة تدريبية",
  ];

  const colleges = [
    "الكل",

    "كلية الهندسة وتكنولوجيا المعلومات",

    "كلية الاقتصاد والعلوم الإدارية",

    "كلية العلوم الطبية التطبيقية",

    "كلية التربية",

    "كلية الآداب",
  ];

  const statuses = [
    "الكل",
    "في التدريب",
    "قيد المراجعة",
    "نشطة",
    "نشط",
    "متاحة",
    "مكتملة",
    "تم التقييم",
    "معتمد",
    "تم الإصدار",
    "منتهية",
  ];

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredResults = useMemo(() => {
    const query =
      filters.search
        .trim()
        .toLowerCase();

    return results.filter((item) => {
      const searchableText = `
        ${item.title}
        ${item.code}
        ${item.subtitle}
        ${item.meta}
        ${item.type}
      `.toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      const matchesCategory =
        filters.category === "الكل" ||
        item.type === filters.category;

      const matchesCollege =
        filters.college === "الكل" ||
        item.college === filters.college ||
        item.college === "الكل";

      const matchesStatus =
        filters.status === "الكل" ||
        item.status === filters.status;

      const matchesFromDate =
        !filters.fromDate ||
        normalizeDate(item.date) >=
          filters.fromDate;

      const matchesToDate =
        !filters.toDate ||
        normalizeDate(item.date) <=
          filters.toDate;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCollege &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [filters]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const students =
      filteredResults.filter(
        (item) =>
          item.type === "طالب"
      ).length;

    const requests =
      filteredResults.filter(
        (item) =>
          item.type === "طلب تدريب"
      ).length;

    const organizations =
      filteredResults.filter(
        (item) =>
          item.type === "جهة تدريب"
      ).length;

    const documents =
      filteredResults.filter(
        (item) =>
          [
            "تقرير",
            "شهادة",
            "تقييم",
          ].includes(item.type)
      ).length;

    return {
      total: filteredResults.length,
      students,
      requests,
      organizations,
      documents,
    };
  }, [filteredResults]);

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "الكل",
      college: "الكل",
      status: "الكل",
      fromDate: "",
      toDate: "",
    });
  };

  /* =========================================================
     STATUS STYLE
  ========================================================= */

  const getStatusStyle = (
    status
  ) => {
    const greenStatuses = [
      "نشطة",
      "نشط",
      "متاحة",
      "مكتملة",
      "معتمد",
      "تم التقييم",
      "تم الإصدار",
    ];

    const blueStatuses = [
      "في التدريب",
    ];

    const orangeStatuses = [
      "قيد المراجعة",
    ];

    const grayStatuses = [
      "منتهية",
    ];

    if (
      greenStatuses.includes(status)
    ) {
      return `
        border-[#BBF7D0]
        bg-[#ECFDF3]
        text-[#15803D]
      `;
    }

    if (
      blueStatuses.includes(status)
    ) {
      return `
        border-[#D7E5FF]
        bg-[#EEF4FF]
        text-[#09379A]
      `;
    }

    if (
      orangeStatuses.includes(status)
    ) {
      return `
        border-[#FED7AA]
        bg-[#FFF7E6]
        text-[#C65D00]
      `;
    }

    if (
      grayStatuses.includes(status)
    ) {
      return `
        border-[#E2E8F0]
        bg-[#F8FAFC]
        text-[#64748B]
      `;
    }

    return `
      border-[#E2E8F0]
      bg-[#F8FAFC]
      text-[#64748B]
    `;
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
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

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
            md:pt-7

            xl:px-[40px]
            xl:pb-[40px]
            xl:pt-[30px]
          "
        >
          <div className="mx-auto w-full max-w-[1180px]">
            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-[6px]
                  text-[10px]
                  font-medium
                  text-[#94A3B8]
                "
              >
                <span>الرئيسية</span>

                <span>/</span>

                <span>
                  الإدارة العامة
                </span>

                <span>/</span>

                <span className="text-[#64748B]">
                  البحث المتقدم
                </span>
              </div>

              <h1
                className="
                  m-0
                  mt-[5px]
                  text-[22px]
                  font-bold
                  text-[#14213D]

                  sm:text-[24px]
                "
              >
                البحث المتقدم
              </h1>

              <p
                className="
                  m-0
                  mt-[4px]
                  max-w-[700px]
                  text-[11px]
                  leading-[20px]
                  text-[#64748B]
                "
              >
                ابحث في مختلف بيانات النظام
                والوصول السريع للطلاب والطلبات
                والجهات والمشرفين والتقييمات
                والتقارير والشهادات.
              </p>
            </div>

            {/* =================================================
                SEARCH
            ================================================== */}

            <section
              className="
                mt-[20px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[17px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:p-[20px]
              "
            >
              <div>
                <label
                  className="
                    mb-[6px]
                    block
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  البحث في النظام
                </label>

                <div
                  className="
                    flex
                    h-[46px]
                    items-center
                    gap-[9px]
                    rounded-[10px]
                    border
                    border-[#C9D5E5]
                    bg-white
                    px-[13px]

                    focus-within:border-[#09379A]
                    focus-within:ring-2
                    focus-within:ring-[#09379A]/10
                  "
                >
                  <Search
                    size={18}
                    className="shrink-0 text-[#94A3B8]"
                  />

                  <input
                    type="text"
                    value={
                      filters.search
                    }
                    onChange={(event) =>
                      setFilters(
                        (previous) => ({
                          ...previous,
                          search:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="ابحث بالاسم، الرقم الجامعي، رقم الطلب، اسم الجهة، المشرف..."
                    className="
                      h-full
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      text-[11px]
                      font-medium
                      text-[#334155]
                      outline-none
                      placeholder:text-[#94A3B8]
                    "
                  />

                  {filters.search && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters(
                          (previous) => ({
                            ...previous,
                            search: "",
                          })
                        )
                      }
                      className="
                        flex
                        h-[28px]
                        w-[28px]
                        items-center
                        justify-center
                        rounded-[7px]
                        border-0
                        bg-[#F1F5F9]
                        text-[#64748B]
                      "
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* FILTERS */}

              <div
                className="
                  mt-[14px]
                  grid
                  grid-cols-1
                  gap-[10px]

                  sm:grid-cols-2

                  xl:grid-cols-5
                "
              >
                <SelectFilter
                  label="نوع البيانات"
                  value={
                    filters.category
                  }
                  options={categories}
                  onChange={(value) =>
                    setFilters(
                      (previous) => ({
                        ...previous,
                        category: value,
                      })
                    )
                  }
                />

                <SelectFilter
                  label="الكلية"
                  value={filters.college}
                  options={colleges}
                  onChange={(value) =>
                    setFilters(
                      (previous) => ({
                        ...previous,
                        college: value,
                      })
                    )
                  }
                />

                <SelectFilter
                  label="الحالة"
                  value={filters.status}
                  options={statuses}
                  onChange={(value) =>
                    setFilters(
                      (previous) => ({
                        ...previous,
                        status: value,
                      })
                    )
                  }
                />

                <DateFilter
                  label="من تاريخ"
                  value={filters.fromDate}
                  onChange={(value) =>
                    setFilters(
                      (previous) => ({
                        ...previous,
                        fromDate: value,
                      })
                    )
                  }
                />

                <DateFilter
                  label="إلى تاريخ"
                  value={filters.toDate}
                  onChange={(value) =>
                    setFilters(
                      (previous) => ({
                        ...previous,
                        toDate: value,
                      })
                    )
                  }
                />
              </div>

              <div
                className="
                  mt-[13px]
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                  border-t
                  border-[#EEF2F7]
                  pt-[12px]
                "
              >
                <p
                  className="
                    m-0
                    text-[9px]
                    text-[#64748B]
                  "
                >
                  يمكنك الجمع بين أكثر من
                  فلتر للوصول إلى نتائج
                  أدق.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    h-[34px]
                    rounded-[8px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[12px]
                    text-[9px]
                    font-bold
                    text-[#64748B]
                    transition

                    hover:bg-[#F8FAFC]
                  "
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            </section>

            {/* =================================================
                STATS
            ================================================== */}

            <section
              className="
                mt-[16px]
                grid
                grid-cols-2
                gap-[10px]

                md:grid-cols-5
              "
            >
              <StatCard
                title="النتائج"
                value={stats.total}
                icon={Search}
                iconClass="bg-[#EEF3FF] text-[#09379A]"
              />

              <StatCard
                title="الطلبة"
                value={stats.students}
                icon={GraduationCap}
                iconClass="bg-[#ECFDF3] text-[#15803D]"
              />

              <StatCard
                title="طلبات التدريب"
                value={stats.requests}
                icon={ClipboardList}
                iconClass="bg-[#FFF7E6] text-[#C65D00]"
              />

              <StatCard
                title="جهات التدريب"
                value={
                  stats.organizations
                }
                icon={Building2}
                iconClass="bg-[#F3E8FF] text-[#7E22CE]"
              />

              <StatCard
                title="تقارير ووثائق"
                value={stats.documents}
                icon={FileText}
                iconClass="bg-[#F1F5F9] text-[#475569]"
              />
            </section>

            {/* =================================================
                RESULTS
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
                  px-[16px]
                  py-[14px]

                  sm:px-[20px]
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
                    نتائج البحث
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    تم العثور على{" "}
                    {filteredResults.length}{" "}
                    نتيجة
                  </p>
                </div>

                <div
                  className="
                    hidden
                    items-center
                    gap-[6px]
                    rounded-[8px]
                    bg-[#F8FAFC]
                    px-[10px]
                    py-[7px]
                    text-[9px]
                    font-bold
                    text-[#64748B]

                    sm:flex
                  "
                >
                  <ShieldCheck
                    size={14}
                  />

                  بحث شامل
                </div>
              </div>

              {/* DESKTOP */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <TableHead>
                        النتيجة
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        التفاصيل
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
                    {filteredResults.map(
                      (item) => {
                        const Icon =
                          item.icon;

                        return (
                          <tr
                            key={item.id}
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
                                  <Icon
                                    size={16}
                                    strokeWidth={
                                      1.8
                                    }
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p
                                    className="
                                      m-0
                                      max-w-[230px]
                                      truncate
                                      text-[10px]
                                      font-bold
                                      text-[#334155]
                                    "
                                  >
                                    {
                                      item.title
                                    }
                                  </p>

                                  <span
                                    className="
                                      mt-[2px]
                                      block
                                      text-[8px]
                                      font-medium
                                      text-[#94A3B8]
                                    "
                                  >
                                    {item.code}
                                  </span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  inline-flex
                                  rounded-full
                                  bg-[#F1F5F9]
                                  px-[8px]
                                  py-[4px]
                                  text-[8px]
                                  font-bold
                                  text-[#475569]
                                "
                              >
                                {item.type}
                              </span>
                            </TableCell>

                            <TableCell>
                              <div>
                                <p
                                  className="
                                    m-0
                                    max-w-[220px]
                                    truncate
                                    text-[9px]
                                    font-medium
                                    text-[#475569]
                                  "
                                >
                                  {
                                    item.subtitle
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
                                  {item.meta}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  whitespace-nowrap
                                  text-[9px]
                                  text-[#64748B]
                                "
                              >
                                {item.date}
                              </span>
                            </TableCell>

                            <TableCell>
                              <StatusBadge
                                status={
                                  item.status
                                }
                                getStatusStyle={
                                  getStatusStyle
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-[5px]
                                "
                              >
                                <IconButton
                                  title="عرض التفاصيل"
                                  onClick={() =>
                                    setSelectedResult(
                                      item
                                    )
                                  }
                                >
                                  <Eye
                                    size={14}
                                  />
                                </IconButton>

                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      item.route
                                    )
                                  }
                                  className="
                                    h-[31px]
                                    rounded-[7px]
                                    border
                                    border-[#D7E5FF]
                                    bg-[#F6F9FF]
                                    px-[9px]
                                    text-[8px]
                                    font-bold
                                    text-[#09379A]
                                  "
                                >
                                  فتح
                                </button>
                              </div>
                            </TableCell>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div
                className="
                  flex
                  flex-col
                  gap-[10px]
                  p-[12px]

                  lg:hidden
                "
              >
                {filteredResults.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <article
                        key={item.id}
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
                              <Icon
                                size={16}
                              />
                            </div>

                            <div className="min-w-0">
                              <h3
                                className="
                                  m-0
                                  truncate
                                  text-[11px]
                                  font-bold
                                  text-[#334155]
                                "
                              >
                                {item.title}
                              </h3>

                              <p
                                className="
                                  m-0
                                  mt-[2px]
                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {item.code} •{" "}
                                {item.type}
                              </p>
                            </div>
                          </div>

                          <StatusBadge
                            status={
                              item.status
                            }
                            getStatusStyle={
                              getStatusStyle
                            }
                          />
                        </div>

                        <div
                          className="
                            mt-[11px]
                            grid
                            grid-cols-2
                            gap-[10px]
                            border-t
                            border-[#E7ECF2]
                            pt-[10px]
                          "
                        >
                          <InfoItem
                            label="التفاصيل"
                            value={
                              item.subtitle
                            }
                          />

                          <InfoItem
                            label="التاريخ"
                            value={
                              item.date
                            }
                          />

                          <InfoItem
                            label="معلومات إضافية"
                            value={
                              item.meta
                            }
                          />

                          <InfoItem
                            label="الكلية"
                            value={
                              item.college
                            }
                          />
                        </div>

                        <div
                          className="
                            mt-[11px]
                            flex
                            gap-[6px]
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedResult(
                                item
                              )
                            }
                            className="
                              flex
                              h-[35px]
                              flex-1
                              items-center
                              justify-center
                              gap-[5px]
                              rounded-[8px]
                              border
                              border-[#DCE5F0]
                              bg-white
                              text-[9px]
                              font-bold
                              text-[#475569]
                            "
                          >
                            <Eye size={13} />

                            التفاصيل
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                item.route
                              )
                            }
                            className="
                              flex
                              h-[35px]
                              flex-1
                              items-center
                              justify-center
                              rounded-[8px]
                              border-0
                              bg-[#09379A]
                              text-[9px]
                              font-bold
                              text-white
                            "
                          >
                            فتح الصفحة
                          </button>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              {filteredResults.length ===
                0 && (
                <EmptyState
                  onReset={
                    resetFilters
                  }
                />
              )}
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          RESULT DRAWER
      ====================================================== */}

      {selectedResult && (
        <>
          <button
            type="button"
            aria-label="إغلاق التفاصيل"
            onClick={() =>
              setSelectedResult(null)
            }
            className="
              fixed
              inset-0
              z-[80]
              border-0
              bg-[#0F172A]/30
            "
          />

          <aside
            dir="rtl"
            className="
              fixed
              bottom-0
              left-0
              top-0
              z-[90]
              w-full
              max-w-[430px]
              overflow-y-auto
              bg-white
              shadow-[12px_0_35px_rgba(15,23,42,0.12)]
            "
          >
            <div
              className="
                flex
                min-h-[72px]
                items-center
                justify-between
                border-b
                border-[#E2E8F0]
                px-[18px]
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
                  تفاصيل نتيجة البحث
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  {
                    selectedResult.code
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedResult(null)
                }
                className="
                  flex
                  h-[34px]
                  w-[34px]
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  text-[#64748B]
                "
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-[18px]">
              <div
                className="
                  rounded-[12px]
                  border
                  border-[#D7E5FF]
                  bg-[#F6F9FF]
                  p-[15px]
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
                    <span
                      className="
                        text-[8px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      {
                        selectedResult.type
                      }
                    </span>

                    <h3
                      className="
                        m-0
                        mt-[4px]
                        text-[13px]
                        font-bold
                        leading-[21px]
                        text-[#1E293B]
                      "
                    >
                      {
                        selectedResult.title
                      }
                    </h3>
                  </div>

                  <StatusBadge
                    status={
                      selectedResult.status
                    }
                    getStatusStyle={
                      getStatusStyle
                    }
                  />
                </div>

                <p
                  className="
                    m-0
                    mt-[8px]
                    text-[9px]
                    leading-[18px]
                    text-[#64748B]
                  "
                >
                  {
                    selectedResult.description
                  }
                </p>
              </div>

              <div
                className="
                  mt-[14px]
                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <DetailBox
                  label="الرمز / الرقم"
                  value={
                    selectedResult.code
                  }
                />

                <DetailBox
                  label="الحالة"
                  value={
                    selectedResult.status
                  }
                />

                <DetailBox
                  label="الكلية"
                  value={
                    selectedResult.college
                  }
                />

                <DetailBox
                  label="التاريخ"
                  value={
                    selectedResult.date
                  }
                />

                <DetailBox
                  label="التفاصيل"
                  value={
                    selectedResult.subtitle
                  }
                />

                <DetailBox
                  label="معلومات إضافية"
                  value={
                    selectedResult.meta
                  }
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    selectedResult.route
                  )
                }
                className="
                  mt-[16px]
                  flex
                  h-[40px]
                  w-full
                  items-center
                  justify-center
                  gap-[7px]
                  rounded-[9px]
                  border-0
                  bg-[#09379A]
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                فتح الصفحة المرتبطة
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function normalizeDate(date) {
  return date.replaceAll("/", "-");
}

/* =========================================================
   SELECT FILTER
========================================================= */

function SelectFilter({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-[5px]
          block
          text-[9px]
          font-bold
          text-[#64748B]
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[39px]
          w-full
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[10px]
          text-[9px]
          font-medium
          text-[#475569]
          outline-none
        "
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   DATE FILTER
========================================================= */

function DateFilter({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-[5px]
          block
          text-[9px]
          font-bold
          text-[#64748B]
        "
      >
        {label}
      </label>

      <div
        className="
          flex
          h-[39px]
          items-center
          gap-[7px]
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[9px]
        "
      >
        <CalendarDays
          size={14}
          className="text-[#94A3B8]"
        />

        <input
          type="date"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="
            min-w-0
            flex-1
            border-0
            bg-transparent
            text-[8px]
            text-[#475569]
            outline-none
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-[12px]
        border
        border-[#DDE5EF]
        bg-white
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
              text-[8px]
              font-medium
              text-[#64748B]
            "
          >
            {title}
          </p>

          <strong
            className="
              mt-[4px]
              block
              text-[21px]
              font-bold
              text-[#14213D]
            "
          >
            {value}
          </strong>
        </div>

        <div
          className={`
            flex
            h-[34px]
            w-[34px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]

            ${iconClass}
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
  getStatusStyle,
}) {
  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
        items-center
        whitespace-nowrap
        rounded-full
        border
        px-[8px]
        text-[8px]
        font-bold

        ${getStatusStyle(status)}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   TABLE
========================================================= */

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
        text-[8px]
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
        py-[11px]
        align-middle
      "
    >
      {children}
    </td>
  );
}

/* =========================================================
   ICON BUTTON
========================================================= */

function IconButton({
  title,
  children,
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
        hover:text-[#09379A]
      "
    >
      {children}
    </button>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
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

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        p-[11px]
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
          break-words
          text-[9px]
          font-bold
          leading-[17px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  onReset,
}) {
  return (
    <div
      className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        px-5
        py-10
        text-center
      "
    >
      <div
        className="
          flex
          h-[50px]
          w-[50px]
          items-center
          justify-center
          rounded-[12px]
          bg-[#F1F5F9]
          text-[#64748B]
        "
      >
        <Search size={22} />
      </div>

      <h3
        className="
          m-0
          mt-[12px]
          text-[12px]
          font-bold
          text-[#334155]
        "
      >
        لا توجد نتائج مطابقة
      </h3>

      <p
        className="
          m-0
          mt-[4px]
          text-[9px]
          text-[#94A3B8]
        "
      >
        جرّب تغيير كلمات البحث أو
        إزالة بعض الفلاتر.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="
          mt-[12px]
          h-[34px]
          rounded-[8px]
          border
          border-[#D7E5FF]
          bg-[#F6F9FF]
          px-[12px]
          text-[9px]
          font-bold
          text-[#09379A]
        "
      >
        عرض جميع النتائج
      </button>
    </div>
  );
}