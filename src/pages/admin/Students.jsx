
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  Search,
  Plus,
  SlidersHorizontal,
  ArrowDownUp,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  RotateCcw,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

// =====================================================
// DATA
// =====================================================

const DELETED_STUDENTS_KEY = "cis-deleted-student-ids-v1";

const INITIAL_STUDENTS = [
  {
    id: "20231234",
    name: "أمل أحمد صيام",
    major: "البرمجيات وقواعد البيانات",
    organization: "شركة القدس للاتصالات",
    status: "قيد التدريب",
    supervisor: "د. سامر يوسف",
    startDate: "2025/12/01",
  },
  {
    id: "20231045",
    name: "محمود إبراهيم رضوان",
    major: "تكنولوجيا علم البيانات",
    organization: "شركة المشرق الرقمية",
    status: "قيد التدريب",
    supervisor: "د. سامر يوسف",
    startDate: "2025/12/01",
  },
  {
    id: "20231188",
    name: "سارة عبد الرحمن",
    major: "الاتصالات وإنترنت الأشياء",
    organization: "شركة جوال",
    status: "بانتظار الاعتماد",
    supervisor: "د. سامر يوسف",
    startDate: "—",
  },
  {
    id: "20231302",
    name: "أنس كمال البيطار",
    major: "إلكترونيات صناعية وتحكم",
    organization: "شركة الأمل للأنظمة الصناعية",
    status: "منتهٍ",
    supervisor: "د. سامر يوسف",
    startDate: "2025/09/15",
  },
  {
    id: "20231450",
    name: "هدى يوسف شهر",
    major: "التصميم الجرافيكي والفنون الرقمية",
    organization: "استوديو بيكسل للتصميم",
    status: "لم يبدأ",
    supervisor: "د. سامر يوسف",
    startDate: "2026/01/10",
  },
  {
    id: "20231533",
    name: "بلال مصطفى الشيخ",
    major: "صيانة الحاسب الآلي",
    organization: "—",
    status: "مرفوض",
    supervisor: "د. سامر يوسف",
    startDate: "—",
  },
  {
    id: "20231601",
    name: "محمد خالد العطار",
    major: "البرمجيات وقواعد البيانات",
    organization: "شركة التقنية الحديثة",
    status: "قيد التدريب",
    supervisor: "د. سامر يوسف",
    startDate: "2026/01/15",
  },
  {
    id: "20231628",
    name: "نور أحمد خليل",
    major: "تكنولوجيا علم البيانات",
    organization: "شركة المشرق الرقمية",
    status: "لم يبدأ",
    supervisor: "د. سامر يوسف",
    startDate: "—",
  },
  {
    id: "20231712",
    name: "ياسمين محمود",
    major: "التصميم الجرافيكي والفنون الرقمية",
    organization: "استوديو بيكسل للتصميم",
    status: "منتهٍ",
    supervisor: "د. سامر يوسف",
    startDate: "2025/08/20",
  },
  {
    id: "20231744",
    name: "أحمد سامي ناصر",
    major: "إلكترونيات صناعية وتحكم",
    organization: "—",
    status: "بانتظار الاعتماد",
    supervisor: "د. سامر يوسف",
    startDate: "—",
  },
  {
    id: "20231805",
    name: "رنا محمد علي",
    major: "الاتصالات وإنترنت الأشياء",
    organization: "شركة جوال",
    status: "قيد التدريب",
    supervisor: "د. سامر يوسف",
    startDate: "2026/01/05",
  },
  {
    id: "20231840",
    name: "خالد عادل حسن",
    major: "صيانة الحاسب الآلي",
    organization: "شركة التقنية الحديثة",
    status: "مرفوض",
    supervisor: "د. سامر يوسف",
    startDate: "—",
  },
];

const STATUS_OPTIONS = [
  "الكل",
  "قيد التدريب",
  "لم يبدأ",
  "بانتظار الاعتماد",
  "منتهٍ",
  "مرفوض",
];

const STATUS_STYLES = {
  "قيد التدريب": "bg-[#DDF6FF] text-[#08759B]",
  "بانتظار الاعتماد": "bg-[#FFE5D9] text-[#B54708]",
  "منتهٍ": "bg-[#DCFCE7] text-[#15803D]",
  "لم يبدأ": "bg-[#F1F5F9] text-[#475569]",
  "مرفوض": "bg-[#FEE2E2] text-[#DC2626]",
};

const SORT_OPTIONS = [
  { value: "name", label: "حسب اسم الطالب" },
  { value: "id", label: "حسب الرقم الجامعي" },
  { value: "date", label: "حسب تاريخ البدء" },
];

const PAGE_SIZE = 6;

// =====================================================
// LOCAL STORAGE
// =====================================================

function getDeletedStudentIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(DELETED_STUDENTS_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved.map(String) : [];
  } catch {
    return [];
  }
}

function readStudents() {
  const deletedIds = new Set(getDeletedStudentIds());

  return INITIAL_STUDENTS.filter(
    (student) => !deletedIds.has(String(student.id))
  );
}

function saveDeletedStudent(studentId) {
  try {
    const ids = new Set(getDeletedStudentIds());
    ids.add(String(studentId));

    localStorage.setItem(
      DELETED_STUDENTS_KEY,
      JSON.stringify([...ids])
    );

    return true;
  } catch {
    return false;
  }
}

// =====================================================
// MAIN PAGE
// =====================================================

export default function Students() {
  const navigate = useNavigate();
  const location = useLocation();

  const [students, setStudents] = useState(readStudents);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedMajor, setSelectedMajor] = useState("الكل");
  const [sortOrder, setSortOrder] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // DELETE MODAL
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Refresh if data was changed in another tab
  useEffect(() => {
    const refreshStudents = () => {
      setStudents(readStudents());
    };

    window.addEventListener("storage", refreshStudents);

    return () => {
      window.removeEventListener("storage", refreshStudents);
    };
  }, []);

  // Refresh on returning to this route
  useEffect(() => {
    setStudents(readStudents());
  }, [location.key]);

  // Close delete modal with Escape
  useEffect(() => {
    if (!studentToDelete) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setStudentToDelete(null);
        setDeleteError("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [studentToDelete]);

  // =====================================================
  // FILTER & SORT
  // =====================================================

  const majors = useMemo(
    () => [
      ...new Set(
        students.map((student) => student.major).filter(Boolean)
      ),
    ],
    [students]
  );

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = students.filter((student) => {
      const matchesSearch =
        !query ||
        [
          student.name,
          student.id,
          student.major,
          student.organization,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query)
        );

      const matchesStatus =
        selectedStatus === "الكل" ||
        student.status === selectedStatus;

      const matchesMajor =
        selectedMajor === "الكل" ||
        student.major === selectedMajor;

      return matchesSearch && matchesStatus && matchesMajor;
    });

    return [...result].sort((a, b) => {
      if (sortOrder === "id") {
        return String(a.id).localeCompare(String(b.id));
      }

      if (sortOrder === "date") {
        return String(b.startDate).localeCompare(
          String(a.startDate)
        );
      }

      return String(a.name).localeCompare(
        String(b.name),
        "ar"
      );
    });
  }, [
    students,
    search,
    selectedStatus,
    selectedMajor,
    sortOrder,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleStudents = filteredStudents.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // =====================================================
  // ACTIONS
  // =====================================================

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-admin-sidebar")
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedStatus("الكل");
    setSelectedMajor("الكل");
    setSortOrder("name");
    setCurrentPage(1);
    setShowFilters(false);
    setShowSort(false);
  };

  const updateSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAddStudent = () => {
    navigate("/admin/add-student");
  };

  const handleViewStudent = (student) => {
    navigate(
      `/admin/students/${encodeURIComponent(student.id)}`,
      {
        state: {
          student: { ...student },
        },
      }
    );
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteError("");
    setShowFilters(false);
    setShowSort(false);
  };

  const closeDeleteModal = () => {
    setStudentToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = () => {
    if (!studentToDelete) return;

    const student = studentToDelete;

    const saved = saveDeletedStudent(student.id);

    if (!saved) {
      setDeleteError(
        "تعذر حفظ عملية الحذف، يرجى المحاولة مرة أخرى."
      );
      return;
    }

    setStudents((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(student.id)
      )
    );

    setStudentToDelete(null);
    setDeleteError("");

    setSuccessMessage(
      `تم حذف الطالب ${student.name} من قائمة الطلاب بنجاح.`
    );
  };

  // =====================================================
  // EXPORT CSV
  // =====================================================

  const exportCSV = () => {
    const headers = [
      "اسم الطالب",
      "الرقم الجامعي",
      "التخصص",
      "جهة التدريب",
      "حالة التدريب",
      "المشرف الأكاديمي",
      "تاريخ البدء",
    ];

    const rows = filteredStudents.map((student) => [
      student.name,
      student.id,
      student.major,
      student.organization,
      student.status,
      student.supervisor,
      student.startDate,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "students.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const inputClass =
    "h-[40px] w-full rounded-[8px] border border-[#E0E7F2] bg-white px-3 text-[12px] outline-none focus:border-[#09379A]";

  const toolButtonClass =
    "inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-[#E0E7F2] bg-white px-4 text-[12px] transition hover:border-[#B9C9E8]";

  // =====================================================
  // PAGE JSX
  // =====================================================

  return (
    <div
      dir="rtl"
      className="flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-['Cairo'] text-[#111C2D]"
    >
      <Sidebar />

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <header className="z-30 flex h-[72px] w-full shrink-0 items-center justify-between border-b border-[#E6EBF5] bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="فتح القائمة"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] text-[#09379A] hover:bg-[#F1F5F9] lg:hidden"
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/announcements")
              }
              aria-label="الإشعارات"
              className="relative flex h-[38px] w-[38px] items-center justify-center rounded-[8px] hover:bg-[#F8FAFC]"
            >
              <Bell size={20} />
              <span className="absolute right-[6px] top-[5px] h-[7px] w-[7px] rounded-full bg-[#FF6B35]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-2 text-right"
          >
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E6EBF5] text-[12px] font-bold text-[#09379A]">
              سم
            </div>

            <div>
              <p className="m-0 text-[12px] font-bold">
                د. سامر يوسف
              </p>
              <p className="m-0 text-[10px] text-[#64748B]">
                مشرف أكاديمي
              </p>
            </div>
          </button>
        </header>

        {/* MAIN CONTENT */}
        <main className="w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-6 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full min-w-0 max-w-[1450px]">

            {/* BREADCRUMB */}
            <div className="mb-2 flex items-center gap-2 text-[12px] text-[#64748B]">
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/dashboard")
                }
                className="hover:text-[#09379A]"
              >
                الرئيسية
              </button>

              <ChevronLeft size={15} />

              <span className="font-semibold text-[#111C2D]">
                الطلاب
              </span>
            </div>

            {/* PAGE TITLE */}
            <section className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="m-0 text-[23px] font-bold leading-9 text-[#111C2D] sm:text-[26px]">
                  إدارة الطلاب
                </h1>

                <p className="m-0 mt-1 text-[13px] leading-6 text-[#64748B]">
                  قائمة الطلاب المتدربين ومتابعة حالتهم
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddStudent}
                className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-[9px] bg-[#FF6534] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#E95526]"
              >
                <Plus size={18} />
                إضافة طالب
              </button>
            </section>

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div
                role="status"
                className="mb-5 flex items-center justify-between gap-3 rounded-[9px] border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-[12px] text-[#15803D]"
              >
                <span>{successMessage}</span>

                <button
                  type="button"
                  aria-label="إغلاق رسالة النجاح"
                  onClick={() => setSuccessMessage("")}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* SEARCH & TOOLS */}
            <section className="mb-5 flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center">

              {/* SEARCH */}
              <div className="relative min-w-0 flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    updateSearch(event.target.value)
                  }
                  placeholder="ابحث بالاسم أو الرقم الجامعي..."
                  aria-label="البحث عن طالب"
                  className="h-[44px] w-full min-w-0 rounded-[8px] border border-[#E0E7F2] bg-white pl-10 pr-11 text-[13px] outline-none focus:border-[#09379A] focus:ring-2 focus:ring-[#09379A]/10"
                />

                {search && (
                  <button
                    type="button"
                    aria-label="مسح البحث"
                    onClick={() => updateSearch("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#64748B] hover:bg-[#F1F5F9]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* TOOLS */}
              <div className="flex flex-wrap items-center gap-2">

                {/* FILTER */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFilters((value) => !value);
                      setShowSort(false);
                    }}
                    className={`${toolButtonClass} ${
                      showFilters
                        ? "border-[#09379A] bg-[#EEF4FF] text-[#09379A]"
                        : ""
                    }`}
                  >
                    <SlidersHorizontal size={17} />
                    تصفية
                  </button>

                  {showFilters && (
                    <div className="absolute right-0 top-[50px] z-20 w-[260px] max-w-[calc(100vw-32px)] rounded-[12px] border border-[#E0E7F2] bg-white p-4 shadow-lg">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="m-0 text-[13px] font-bold">
                          تصفية الطلاب
                        </h3>

                        <button
                          type="button"
                          aria-label="إغلاق التصفية"
                          onClick={() => setShowFilters(false)}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
                        حالة التدريب
                      </label>

                      <select
                        value={selectedStatus}
                        onChange={(event) => {
                          setSelectedStatus(event.target.value);
                          setCurrentPage(1);
                        }}
                        className={`${inputClass} mb-4`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
                        التخصص
                      </label>

                      <select
                        value={selectedMajor}
                        onChange={(event) => {
                          setSelectedMajor(event.target.value);
                          setCurrentPage(1);
                        }}
                        className={`${inputClass} mb-4`}
                      >
                        <option value="الكل">
                          كل التخصصات
                        </option>

                        {majors.map((major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex h-[36px] flex-1 items-center justify-center gap-1 rounded-[7px] border border-[#E0E7F2] text-[11px]"
                        >
                          <RotateCcw size={13} />
                          إعادة ضبط
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowFilters(false)}
                          className="h-[36px] flex-1 rounded-[7px] bg-[#09379A] text-[11px] font-semibold text-white"
                        >
                          تطبيق
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* SORT */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSort((value) => !value);
                      setShowFilters(false);
                    }}
                    className={toolButtonClass}
                  >
                    <ArrowDownUp size={17} />
                    ترتيب
                  </button>

                  {showSort && (
                    <div className="absolute left-0 top-[50px] z-20 w-[190px] rounded-[10px] border border-[#E0E7F2] bg-white p-2 shadow-lg">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortOrder(option.value);
                            setShowSort(false);
                          }}
                          className={`w-full rounded-[7px] px-3 py-2 text-right text-[12px] ${
                            sortOrder === option.value
                              ? "bg-[#EEF4FF] font-semibold text-[#09379A]"
                              : "hover:bg-[#F8FAFC]"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* EXPORT */}
                <button
                  type="button"
                  onClick={exportCSV}
                  className={toolButtonClass}
                >
                  <Download size={16} />
                  تصدير
                </button>
              </div>
            </section>

            {/* STATUS FILTERS */}
            <section className="mb-6 flex min-w-0 flex-wrap items-center gap-2">
              {STATUS_OPTIONS.map((status) => {
                const active = selectedStatus === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(status);
                      setCurrentPage(1);
                    }}
                    className={`inline-flex h-[36px] items-center gap-2 rounded-full border px-4 text-[11px] transition ${
                      active
                        ? "border-[#09379A] bg-[#09379A] font-semibold text-white"
                        : "border-[#E0E7F2] bg-white text-[#475569] hover:border-[#B9C9E8]"
                    }`}
                  >
                    {status}
                    {status === "الكل" && ` ${students.length}`}
                  </button>
                );
              })}
            </section>

            {/* =============================================
                STUDENTS TABLE - NO HORIZONTAL SCROLL
            ============================================= */}
            <section className="w-full min-w-0 rounded-[12px] border border-[#E0E7F2] bg-white p-2 sm:p-4 xl:p-5">

              <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="m-0 text-[15px] font-bold text-[#062569]">
                    قائمة الطلاب
                  </h2>

                  <p className="m-0 mt-1 text-[11px] text-[#64748B]">
                    بيانات الطلاب وحالة التدريب الحالية
                  </p>
                </div>

                <span className="text-[11px] text-[#64748B]">
                  {filteredStudents.length} طالبًا
                </span>
              </div>

              {/* IMPORTANT: NO overflow-x-auto */}
              <div className="w-full min-w-0 overflow-hidden rounded-[9px] border border-[#E0E7F2]">

                <table className="w-full table-fixed border-collapse text-right">

                  {/* COLUMN WIDTHS */}
                  <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "11%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "13%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "16%" }} />
                  </colgroup>

                  {/* TABLE HEADER */}
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[9px] font-semibold text-[#475569] lg:text-[10px] xl:text-[11px]">
                      <th className="break-words px-1 py-4 sm:px-2">
                        اسم الطالب
                      </th>

                      <th className="break-words px-1 py-4 sm:px-2">
                        الرقم الجامعي
                      </th>

                      <th className="break-words px-1 py-4 sm:px-2">
                        التخصص
                      </th>

                      <th className="break-words px-1 py-4 sm:px-2">
                        جهة التدريب
                      </th>

                      <th className="break-words px-1 py-4 sm:px-2">
                        حالة التدريب
                      </th>

                      <th className="break-words px-1 py-4 sm:px-2">
                        المشرف الأكاديمي
                      </th>

                      <th className="break-words px-1 py-4 text-center sm:px-2">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody>
                    {visibleStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-t border-[#E6EBF5] text-[9px] transition-colors hover:bg-[#FAFBFE] lg:text-[10px] xl:text-[11px]"
                      >
                        {/* NAME */}
                        <td className="break-words px-1 py-4 font-semibold leading-5 sm:px-2">
                          {student.name}
                        </td>

                        {/* STUDENT ID */}
                        <td className="px-0.5 py-4 text-center sm:px-1">
                          <span
                            dir="ltr"
                            className="inline-block max-w-full break-all text-[8px] sm:text-[9px] lg:text-[10px]"
                          >
                            {student.id}
                          </span>
                        </td>

                        {/* MAJOR */}
                        <td className="break-words px-1 py-4 leading-5 sm:px-2">
                          {student.major}
                        </td>

                        {/* ORGANIZATION */}
                        <td className="break-words px-1 py-4 leading-5 sm:px-2">
                          {student.organization}
                        </td>

                        {/* STATUS */}
                        <td className="px-0.5 py-4 sm:px-1">
                          <StatusBadge status={student.status} />
                        </td>

                        {/* SUPERVISOR */}
                        <td className="break-words px-1 py-4 leading-5 sm:px-2">
                          {student.supervisor}
                        </td>

                        {/* VIEW + DELETE */}
                        <td className="px-0.5 py-4 text-center align-middle sm:px-1">
                          <div className="flex flex-wrap items-center justify-center gap-1">

                            <button
                              type="button"
                              onClick={() =>
                                handleViewStudent(student)
                              }
                              className="inline-flex min-h-[29px] min-w-0 items-center justify-center gap-1 rounded-[7px] border border-[#E0E7F2] bg-white px-1.5 py-1 text-[9px] transition hover:border-[#09379A] hover:text-[#09379A] sm:px-2 lg:text-[10px]"
                              aria-label={`عرض تفاصيل ${student.name}`}
                            >
                              <Eye
                                size={13}
                                className="hidden shrink-0 sm:block"
                              />
                              عرض
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteClick(student)
                              }
                              className="inline-flex min-h-[29px] min-w-0 items-center justify-center gap-1 rounded-[7px] border border-[#FECACA] bg-white px-1.5 py-1 text-[9px] text-[#DC2626] transition hover:bg-[#FEF2F2] sm:px-2 lg:text-[10px]"
                              aria-label={`حذف الطالب ${student.name}`}
                            >
                              <Trash2
                                size={12}
                                className="hidden shrink-0 sm:block"
                              />
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* EMPTY STATE */}
                    {visibleStudents.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-3 py-14 text-center"
                        >
                          <div className="mx-auto flex max-w-[300px] flex-col items-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]">
                              <Search size={21} />
                            </div>

                            <p className="m-0 text-[13px] font-semibold text-[#334155]">
                              لا توجد نتائج مطابقة
                            </p>

                            <p className="m-0 mt-1 text-[11px] text-[#64748B]">
                              جرّب تعديل البحث أو معايير التصفية.
                            </p>

                            <button
                              type="button"
                              onClick={resetFilters}
                              className="mt-4 text-[11px] font-semibold text-[#09379A] hover:underline"
                            >
                              مسح عوامل التصفية
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="mt-4 flex min-w-0 flex-wrap items-center justify-between gap-4">
                <p className="m-0 text-[11px] text-[#64748B]">
                  عرض{" "}
                  {filteredStudents.length === 0
                    ? 0
                    : (safePage - 1) * PAGE_SIZE + 1}
                  {" - "}
                  {Math.min(
                    safePage * PAGE_SIZE,
                    filteredStudents.length
                  )}
                  {" من "}
                  {filteredStudents.length} طالبًا
                </p>

                <div className="flex max-w-full flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    className="inline-flex h-[35px] items-center gap-1 rounded-full border border-[#E0E7F2] px-3 text-[11px] disabled:opacity-40"
                  >
                    <ChevronRight size={14} />
                    السابق
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-[35px] min-w-[35px] rounded-full border text-[11px] ${
                        safePage === page
                          ? "border-[#09379A] bg-[#09379A] font-semibold text-white"
                          : "border-[#E0E7F2] bg-white hover:border-[#09379A]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    className="inline-flex h-[35px] items-center gap-1 rounded-full border border-[#E0E7F2] px-3 text-[11px] disabled:opacity-40"
                  >
                    التالي
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-8 flex min-w-0 flex-wrap items-center justify-between gap-3 pb-2 text-[11px] text-[#64748B]">
              <p className="m-0 leading-5">
                جميع الحقوق محفوظة © 2025 كلية الدراسات المتوسطة -
                جامعة الأزهر - غزة
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/admin/settings")}
                  className="text-[#09379A] hover:underline"
                >
                  الدعم الفني والأكاديمي
                </button>

                <span>•</span>

                <button
                  type="button"
                  onClick={() => navigate("/admin/settings")}
                  className="text-[#09379A] hover:underline"
                >
                  دليل بوابة التدريب الميداني
                </button>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {studentToDelete && (
        <DeleteStudentModal
          student={studentToDelete}
          error={deleteError}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

// =====================================================
// DELETE STUDENT MODAL
// =====================================================


function DeleteStudentModal({
  student,
  error,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      dir="rtl"
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-[#0F172A]/55
        p-4
        font-['Cairo']
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-student-title"
        aria-describedby="delete-student-description"
        className="
          w-full max-w-[520px]
          rounded-[12px]
          bg-white
          px-[28px] py-[28px]
          shadow-[0_20px_60px_rgba(15,23,42,0.18)]
          sm:px-[28px]
        "
      >
        {/* DELETE ICON */}
        <div
          className="
            mb-[20px]
            flex h-[56px] w-[56px]
            items-center justify-center
            rounded-full
            bg-[#FEE2E2]
            text-[#DC2626]
          "
        >
          <Trash2 size={25} strokeWidth={2} />
        </div>

        {/* TITLE */}
        <h2
          id="delete-student-title"
          className="
            m-0
            text-right
            text-[20px]
            font-bold
            leading-[32px]
            text-[#111C2D]
          "
        >
          حذف الطالب
        </h2>

        {/* DESCRIPTION */}
        <p
          id="delete-student-description"
          className="
            mb-0 mt-[13px]
            text-right
            text-[13px]
            leading-[26px]
            text-[#64748B]
          "
        >
          سيتم حذف الطالب بشكل نهائي من سجل تدريبه، لا يمكن
          التراجع عن هذا الإجراء.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <p
            role="alert"
            className="
              mb-0 mt-3
              text-right text-[12px]
              text-[#DC2626]
            "
          >
            {error}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-[17px] flex flex-wrap items-center gap-[12px]">
          {/* CONFIRM */}
          <button
            type="button"
            onClick={onConfirm}
            className="
              inline-flex h-[44px]
              items-center justify-center gap-[10px]
              rounded-[8px]
              bg-[#09379A]
              px-[21px]
              text-[12px]
              font-bold
              text-white
              transition-colors
              hover:bg-[#072E81]
            "
          >
            <Trash2 size={16} strokeWidth={1.9} />
            تأكيد الحذف
          </button>

          {/* CANCEL */}
          <button
            type="button"
            onClick={onCancel}
            className="
              inline-flex h-[44px]
              items-center justify-center
              rounded-[8px]
              border border-[#E0E7F2]
              bg-white
              px-[20px]
              text-[12px]
              font-semibold
              text-[#111C2D]
              transition-colors
              hover:bg-[#F8FAFC]
            "
          >
            إلغاء
          </button>
        </div>
      </section>
    </div>
  );
}


// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 rounded-full px-1 py-1 text-[8px] font-semibold leading-4 sm:px-2 sm:text-[9px] lg:text-[10px] ${
        STATUS_STYLES[status] ||
        "bg-[#F1F5F9] text-[#475569]"
      }`}
    >
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-current" />
      <span className="min-w-0 break-words">{status}</span>
    </span>
  );
}
