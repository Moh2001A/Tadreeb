import { useMemo, useState } from "react";

import {
  Archive,
  ArchiveRestore,
  Building2,
  CalendarDays,
  Download,
  Eye,
  FileArchive as FileArchiveIcon,
  FileCheck2,
  FileText,
  FolderArchive,
  GraduationCap,
  HardDrive,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function FileArchive() {
  /* =========================================================
     STATE
  ========================================================= */

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [sourceFilter, setSourceFilter] =
    useState("الكل");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [showUploadModal, setShowUploadModal] =
    useState(false);

  const [files, setFiles] = useState([
    {
      id: 1,

      name: "طلب_التدريب_أحمد_خالد.pdf",

      type: "طلب تدريب",

      source: "التدريب الميداني",

      student: "أحمد خالد محمد",

      studentId: "20231045",

      organization:
        "شركة التقنية المتقدمة",

      relatedEntity:
        "طلب التدريب TR-2026-084",

      date: "2026/10/24",

      uploadedBy: "أ. محمد أحمد",

      size: "420 KB",

      extension: "PDF",

      status: "نشط",

      description:
        "نسخة طلب التدريب الميداني والمستندات المرتبطة به.",
    },

    {
      id: 2,

      name: "التقرير_النهائي_مريم_أحمد.pdf",

      type: "تقرير نهائي",

      source: "التدريب الميداني",

      student: "مريم أحمد علي",

      studentId: "20230765",

      organization:
        "مستشفى الشفاء",

      relatedEntity:
        "التقرير النهائي FR-2026-021",

      date: "2026/10/22",

      uploadedBy: "د. سارة خليل",

      size: "1.8 MB",

      extension: "PDF",

      status: "نشط",

      description:
        "التقرير النهائي المعتمد بعد استكمال التدريب السريري.",
    },

    {
      id: 3,

      name: "تقييم_المشرف_محمد_سامي.pdf",

      type: "تقييم",

      source: "التدريب الميداني",

      student: "محمد سامي حسن",

      studentId: "20231234",

      organization:
        "شركة الاتصالات الفلسطينية",

      relatedEntity:
        "التقييم EV-2026-041",

      date: "2026/10/20",

      uploadedBy: "م. خالد يوسف",

      size: "760 KB",

      extension: "PDF",

      status: "نشط",

      description:
        "تقييم المشرف الميداني لأداء الطالب خلال فترة التدريب.",
    },

    {
      id: 4,

      name: "شهادة_CPR_سارة_محمود.pdf",

      type: "شهادة",

      source: "الدورات التدريبية",

      student: "سارة محمود علي",

      studentId: "20230876",

      organization:
        "جامعة الأزهر - غزة",

      relatedEntity:
        "الدورة TR-C-101",

      date: "2026/10/18",

      uploadedBy: "النظام",

      size: "310 KB",

      extension: "PDF",

      status: "نشط",

      description:
        "شهادة اجتياز دورة الإنعاش القلبي الرئوي.",
    },

    {
      id: 5,

      name: "اتفاقية_بنك_فلسطين.pdf",

      type: "اتفاقية",

      source: "جهات التدريب",

      student: "—",

      studentId: "—",

      organization:
        "بنك فلسطين",

      relatedEntity:
        "جهة التدريب ORG-004",

      date: "2026/09/28",

      uploadedBy: "مدير النظام",

      size: "2.1 MB",

      extension: "PDF",

      status: "نشط",

      description:
        "اتفاقية التعاون والتدريب المعتمدة مع جهة التدريب.",
    },

    {
      id: 6,

      name: "مرفقات_طلب_قديم.zip",

      type: "مرفقات",

      source: "التدريب الميداني",

      student: "ريم أحمد يوسف",

      studentId: "20230987",

      organization:
        "مدرسة الأزهر النموذجية",

      relatedEntity:
        "طلب التدريب TR-2026-061",

      date: "2026/07/13",

      uploadedBy: "أ. محمد أحمد",

      size: "4.3 MB",

      extension: "ZIP",

      status: "مؤرشف",

      description:
        "مرفقات طلب تدريب سابق تم إغلاقه وأرشفته.",
    },

    {
      id: 7,

      name: "سجل_حضور_CPR.xlsx",

      type: "سجل حضور",

      source: "الدورات التدريبية",

      student: "—",

      studentId: "—",

      organization:
        "جامعة الأزهر - غزة",

      relatedEntity:
        "الدورة TR-C-101",

      date: "2026/10/15",

      uploadedBy: "د. أحمد خالد",

      size: "185 KB",

      extension: "XLSX",

      status: "نشط",

      description:
        "سجل حضور المتدربين في دورة الإنعاش القلبي الرئوي.",
    },

    {
      id: 8,

      name: "تقرير_زيارة_ميدانية.pdf",

      type: "تقرير زيارة",

      source: "التدريب الميداني",

      student: "أحمد خالد محمد",

      studentId: "20231045",

      organization:
        "شركة التقنية المتقدمة",

      relatedEntity:
        "الزيارة VIS-2026-014",

      date: "2026/10/12",

      uploadedBy: "د. سامر يوسف",

      size: "690 KB",

      extension: "PDF",

      status: "مؤرشف",

      description:
        "تقرير زيارة متابعة ميدانية للطالب أثناء التدريب.",
    },
  ]);

  /* =========================================================
     FILTERED FILES
  ========================================================= */

  const filteredFiles = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return files.filter((file) => {
      const matchesSearch =
        !normalizedSearch ||
        file.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        file.student
          .toLowerCase()
          .includes(normalizedSearch) ||
        file.organization
          .toLowerCase()
          .includes(normalizedSearch) ||
        file.relatedEntity
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        typeFilter === "الكل" ||
        file.type === typeFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        file.status === statusFilter;

      const matchesSource =
        sourceFilter === "الكل" ||
        file.source === sourceFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesSource
      );
    });
  }, [
    files,
    search,
    typeFilter,
    statusFilter,
    sourceFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const active = files.filter(
      (file) => file.status === "نشط"
    ).length;

    const archived = files.filter(
      (file) => file.status === "مؤرشف"
    ).length;

    const certificates = files.filter(
      (file) => file.type === "شهادة"
    ).length;

    return {
      total: files.length,
      active,
      archived,
      certificates,
    };
  }, [files]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const toggleArchive = (fileId) => {
    setFiles((previous) =>
      previous.map((file) =>
        file.id === fileId
          ? {
              ...file,

              status:
                file.status === "نشط"
                  ? "مؤرشف"
                  : "نشط",
            }
          : file
      )
    );

    setSelectedFile((previous) => {
      if (
        !previous ||
        previous.id !== fileId
      ) {
        return previous;
      }

      return {
        ...previous,

        status:
          previous.status === "نشط"
            ? "مؤرشف"
            : "نشط",
      };
    });
  };

  const deleteFile = (fileId) => {
    setFiles((previous) =>
      previous.filter(
        (file) => file.id !== fileId
      )
    );

    setSelectedFile(null);
  };

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("الكل");
    setStatusFilter("الكل");
    setSourceFilter("الكل");
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusStyle = (status) => {
    if (status === "نشط") {
      return `
        border-[#BBF7D0]
        bg-[#ECFDF3]
        text-[#15803D]
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

            <div
              className="
                flex
                flex-col
                gap-4

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
                    الملفات والأرشفة
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
                  الملفات والأرشفة
                </h1>

                <p
                  className="
                    m-0
                    mt-[4px]
                    max-w-[650px]
                    text-[11px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  إدارة المستندات الرسمية المرتبطة
                  بالتدريب الميداني والدورات التدريبية
                  والجهات والشهادات.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowUploadModal(true)
                }
                className="
                  flex
                  h-[40px]
                  w-fit
                  items-center
                  justify-center
                  gap-[7px]
                  rounded-[9px]
                  border-0
                  bg-[#09379A]
                  px-[15px]
                  text-[10px]
                  font-bold
                  text-white
                  transition

                  hover:bg-[#072E81]
                "
              >
                <Plus size={16} />

                رفع ملف جديد
              </button>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <section
              className="
                mt-[20px]
                grid
                grid-cols-1
                gap-[11px]

                sm:grid-cols-2

                xl:grid-cols-4
              "
            >
              <StatCard
                title="إجمالي الملفات"
                value={stats.total}
                description="جميع المستندات المسجلة"
                icon={FolderArchive}
                iconClass="bg-[#EEF3FF] text-[#09379A]"
              />

              <StatCard
                title="ملفات نشطة"
                value={stats.active}
                description="متاحة ضمن العمليات الحالية"
                icon={FileCheck2}
                iconClass="bg-[#ECFDF3] text-[#15803D]"
              />

              <StatCard
                title="ملفات مؤرشفة"
                value={stats.archived}
                description="ملفات من عمليات مكتملة"
                icon={Archive}
                iconClass="bg-[#F1F5F9] text-[#64748B]"
              />

              <StatCard
                title="شهادات محفوظة"
                value={stats.certificates}
                description="شهادات تدريب ودورات"
                icon={ShieldCheck}
                iconClass="bg-[#FFF7E6] text-[#C65D00]"
              />
            </section>

            {/* =================================================
                FILTERS
            ================================================== */}

            <section
              className="
                mt-[20px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[16px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                sm:p-[18px]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3

                  lg:flex-row
                  lg:items-end
                "
              >
                <div className="min-w-0 flex-1">
                  <label
                    className="
                      mb-[5px]
                      block
                      text-[9px]
                      font-bold
                      text-[#64748B]
                    "
                  >
                    البحث
                  </label>

                  <div
                    className="
                      flex
                      h-[40px]
                      items-center
                      gap-[8px]
                      rounded-[9px]
                      border
                      border-[#DCE5F0]
                      bg-white
                      px-[11px]
                    "
                  >
                    <Search
                      size={15}
                      className="text-[#94A3B8]"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="اسم الملف، الطالب، الجهة أو المرجع..."
                      className="
                        h-full
                        min-w-0
                        flex-1
                        border-0
                        bg-transparent
                        text-[10px]
                        text-[#334155]
                        outline-none
                        placeholder:text-[#94A3B8]
                      "
                    />
                  </div>
                </div>

                <SelectFilter
                  label="نوع الملف"
                  value={typeFilter}
                  onChange={
                    setTypeFilter
                  }
                  options={[
                    "الكل",
                    "طلب تدريب",
                    "تقرير نهائي",
                    "تقييم",
                    "شهادة",
                    "اتفاقية",
                    "مرفقات",
                    "سجل حضور",
                    "تقرير زيارة",
                  ]}
                />

                <SelectFilter
                  label="المصدر"
                  value={sourceFilter}
                  onChange={
                    setSourceFilter
                  }
                  options={[
                    "الكل",
                    "التدريب الميداني",
                    "الدورات التدريبية",
                    "جهات التدريب",
                  ]}
                />

                <SelectFilter
                  label="الحالة"
                  value={statusFilter}
                  onChange={
                    setStatusFilter
                  }
                  options={[
                    "الكل",
                    "نشط",
                    "مؤرشف",
                  ]}
                />

                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    h-[40px]
                    rounded-[9px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[13px]
                    text-[9px]
                    font-bold
                    text-[#64748B]
                    transition

                    hover:bg-[#F8FAFC]
                  "
                >
                  إعادة تعيين
                </button>
              </div>
            </section>

            {/* =================================================
                FILES LIST
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
                    سجل الملفات
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {filteredFiles.length} ملف مطابق للفلاتر الحالية
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-[34px]
                    items-center
                    gap-[7px]
                    rounded-[8px]
                    bg-[#F8FAFC]
                    px-[10px]
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  <HardDrive size={14} />

                  أرشيف النظام
                </div>
              </div>

              {/* DESKTOP TABLE */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <TableHead>
                        الملف
                      </TableHead>

                      <TableHead>
                        النوع
                      </TableHead>

                      <TableHead>
                        المصدر
                      </TableHead>

                      <TableHead>
                        مرتبط بـ
                      </TableHead>

                      <TableHead>
                        التاريخ
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
                    {filteredFiles.map(
                      (file) => (
                        <tr
                          key={file.id}
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
                              <FileTypeIcon
                                extension={
                                  file.extension
                                }
                              />

                              <div className="min-w-0">
                                <p
                                  className="
                                    m-0
                                    max-w-[220px]
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
                                    mt-[2px]
                                    block
                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {file.size} •{" "}
                                  {
                                    file.extension
                                  }
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                font-medium
                                text-[#475569]
                              "
                            >
                              {file.type}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                text-[9px]
                                text-[#64748B]
                              "
                            >
                              {file.source}
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
                                {file.student}
                              </p>

                              <span
                                className="
                                  mt-[1px]
                                  block
                                  max-w-[180px]
                                  truncate
                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {
                                  file.organization
                                }
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
                              {file.date}
                            </span>
                          </TableCell>

                          <TableCell>
                            <StatusBadge
                              status={
                                file.status
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
                                  setSelectedFile(
                                    file
                                  )
                                }
                              >
                                <Eye
                                  size={14}
                                />
                              </IconButton>

                              <IconButton title="تحميل">
                                <Download
                                  size={14}
                                />
                              </IconButton>

                              <IconButton
                                title={
                                  file.status ===
                                  "نشط"
                                    ? "أرشفة الملف"
                                    : "استعادة الملف"
                                }
                                onClick={() =>
                                  toggleArchive(
                                    file.id
                                  )
                                }
                              >
                                {file.status ===
                                "نشط" ? (
                                  <Archive
                                    size={14}
                                  />
                                ) : (
                                  <ArchiveRestore
                                    size={14}
                                  />
                                )}
                              </IconButton>
                            </div>
                          </TableCell>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET */}

              <div
                className="
                  flex
                  flex-col
                  gap-[10px]
                  p-[12px]

                  lg:hidden
                "
              >
                {filteredFiles.map(
                  (file) => (
                    <article
                      key={file.id}
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
                          <FileTypeIcon
                            extension={
                              file.extension
                            }
                          />

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
                              {file.name}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]
                                text-[9px]
                                text-[#64748B]
                              "
                            >
                              {file.type} •{" "}
                              {file.size}
                            </p>
                          </div>
                        </div>

                        <StatusBadge
                          status={
                            file.status
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
                          label="المصدر"
                          value={
                            file.source
                          }
                        />

                        <InfoItem
                          label="التاريخ"
                          value={
                            file.date
                          }
                        />

                        <InfoItem
                          label="الطالب"
                          value={
                            file.student
                          }
                        />

                        <InfoItem
                          label="الجهة"
                          value={
                            file.organization
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
                            setSelectedFile(
                              file
                            )
                          }
                          className="
                            flex
                            h-[35px]
                            flex-1
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
                          <Eye size={14} />

                          التفاصيل
                        </button>

                        <IconButton title="تحميل">
                          <Download
                            size={14}
                          />
                        </IconButton>

                        <IconButton
                          title={
                            file.status ===
                            "نشط"
                              ? "أرشفة"
                              : "استعادة"
                          }
                          onClick={() =>
                            toggleArchive(
                              file.id
                            )
                          }
                        >
                          {file.status ===
                          "نشط" ? (
                            <Archive
                              size={14}
                            />
                          ) : (
                            <ArchiveRestore
                              size={14}
                            />
                          )}
                        </IconButton>
                      </div>
                    </article>
                  )
                )}
              </div>

              {filteredFiles.length ===
                0 && (
                <EmptyState
                  onReset={resetFilters}
                />
              )}
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {selectedFile && (
        <>
          <button
            type="button"
            aria-label="إغلاق التفاصيل"
            onClick={() =>
              setSelectedFile(null)
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
            dir="rtl"
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
                  تفاصيل الملف
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[9px]
                    text-[#94A3B8]
                  "
                >
                  معلومات المستند والأرشفة
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFile(null)
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
                  flex
                  items-start
                  gap-[12px]
                  rounded-[12px]
                  border
                  border-[#DDE5EF]
                  bg-[#F8FAFC]
                  p-[14px]
                "
              >
                <FileTypeIcon
                  extension={
                    selectedFile.extension
                  }
                  large
                />

                <div className="min-w-0">
                  <h3
                    className="
                      m-0
                      break-words
                      text-[12px]
                      font-bold
                      leading-[20px]
                      text-[#334155]
                    "
                  >
                    {selectedFile.name}
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[3px]
                      text-[9px]
                      text-[#64748B]
                    "
                  >
                    {selectedFile.extension} •{" "}
                    {selectedFile.size}
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-[15px]
                  grid
                  grid-cols-2
                  gap-[10px]
                "
              >
                <DetailBox
                  label="نوع الملف"
                  value={selectedFile.type}
                />

                <DetailBox
                  label="المصدر"
                  value={
                    selectedFile.source
                  }
                />

                <DetailBox
                  label="الطالب"
                  value={
                    selectedFile.student
                  }
                />

                <DetailBox
                  label="الرقم الجامعي"
                  value={
                    selectedFile.studentId
                  }
                />

                <DetailBox
                  label="جهة التدريب"
                  value={
                    selectedFile.organization
                  }
                />

                <DetailBox
                  label="تاريخ الرفع"
                  value={
                    selectedFile.date
                  }
                />

                <DetailBox
                  label="تم الرفع بواسطة"
                  value={
                    selectedFile.uploadedBy
                  }
                />

                <DetailBox
                  label="الحالة"
                  value={
                    selectedFile.status
                  }
                />
              </div>

              <div
                className="
                  mt-[14px]
                  rounded-[10px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  p-[13px]
                "
              >
                <p
                  className="
                    m-0
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  المرجع المرتبط
                </p>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[10px]
                    font-medium
                    text-[#334155]
                  "
                >
                  {
                    selectedFile.relatedEntity
                  }
                </p>
              </div>

              <div
                className="
                  mt-[10px]
                  rounded-[10px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  p-[13px]
                "
              >
                <p
                  className="
                    m-0
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  وصف الملف
                </p>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[10px]
                    leading-[19px]
                    text-[#475569]
                  "
                >
                  {
                    selectedFile.description
                  }
                </p>
              </div>

              <div
                className="
                  mt-[16px]
                  flex
                  flex-wrap
                  gap-[7px]
                "
              >
                <button
                  type="button"
                  className="
                    flex
                    h-[38px]
                    flex-1
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    px-[12px]
                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  <Download size={14} />

                  تحميل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleArchive(
                      selectedFile.id
                    )
                  }
                  className="
                    flex
                    h-[38px]
                    flex-1
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[12px]
                    text-[9px]
                    font-bold
                    text-[#475569]
                  "
                >
                  {selectedFile.status ===
                  "نشط" ? (
                    <>
                      <Archive
                        size={14}
                      />

                      أرشفة
                    </>
                  ) : (
                    <>
                      <ArchiveRestore
                        size={14}
                      />

                      استعادة
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteFile(
                      selectedFile.id
                    )
                  }
                  className="
                    flex
                    h-[38px]
                    w-full
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border
                    border-[#FECDD3]
                    bg-[#FFF1F2]
                    px-[12px]
                    text-[9px]
                    font-bold
                    text-[#BE123C]
                  "
                >
                  <Trash2 size={14} />

                  حذف الملف
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          UPLOAD MODAL
      ====================================================== */}

      {showUploadModal && (
        <UploadFileModal
          onClose={() =>
            setShowUploadModal(false)
          }
          onSave={(newFile) => {
            setFiles((previous) => [
              {
                id:
                  Math.max(
                    ...previous.map(
                      (item) => item.id
                    ),
                    0
                  ) + 1,

                ...newFile,

                date: "2026/10/24",

                uploadedBy:
                  "مدير النظام",

                size: "640 KB",

                extension: "PDF",

                status: "نشط",
              },

              ...previous,
            ]);

            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-[13px]
        border
        border-[#DDE5EF]
        bg-white
        p-[15px]
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
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
              text-[9px]
              font-medium
              text-[#64748B]
            "
          >
            {title}
          </p>

          <strong
            className="
              mt-[5px]
              block
              text-[24px]
              font-bold
              leading-[30px]
              text-[#14213D]
            "
          >
            {value}
          </strong>

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
          className={`
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center
            rounded-[9px]

            ${iconClass}
          `}
        >
          <Icon
            size={18}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SELECT FILTER
========================================================= */

function SelectFilter({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="w-full lg:w-[155px]">
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
          h-[40px]
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
   FILE TYPE ICON
========================================================= */

function FileTypeIcon({
  extension,
  large = false,
}) {
  const isArchive =
    extension === "ZIP";

  const Icon = isArchive
    ? FileArchiveIcon
    : FileText;

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        rounded-[9px]

        ${
          large
            ? "h-[46px] w-[46px]"
            : "h-[36px] w-[36px]"
        }

        ${
          isArchive
            ? "bg-[#FFF7E6] text-[#C65D00]"
            : "bg-[#EEF3FF] text-[#09379A]"
        }
      `}
    >
      <Icon
        size={large ? 21 : 17}
        strokeWidth={1.8}
      />
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
        shrink-0
        items-center
        justify-center
        rounded-[7px]
        border
        border-[#DCE5F0]
        bg-white
        text-[#64748B]
        transition

        hover:border-[#B7C8E4]
        hover:bg-[#F8FAFC]
        hover:text-[#09379A]
      "
    >
      {children}
    </button>
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
        text-[8px]
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
        py-[11px]
        align-middle
      "
    >
      {children}
    </td>
  );
}

/* =========================================================
   INFO
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
        min-h-[260px]
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
          h-[48px]
          w-[48px]
          items-center
          justify-center
          rounded-[12px]
          bg-[#F1F5F9]
          text-[#64748B]
        "
      >
        <Search size={21} />
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
        لا توجد ملفات مطابقة
      </h3>

      <p
        className="
          m-0
          mt-[4px]
          text-[9px]
          text-[#94A3B8]
        "
      >
        جرّب تغيير البحث أو الفلاتر الحالية.
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
        إعادة تعيين الفلاتر
      </button>
    </div>
  );
}

/* =========================================================
   UPLOAD MODAL
========================================================= */

function UploadFileModal({
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",

    type: "طلب تدريب",

    source: "التدريب الميداني",

    student: "",

    studentId: "",

    organization: "",

    relatedEntity: "",

    description: "",
  });

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      return;
    }

    onSave(form);
  };

  return (
    <>
      <button
        type="button"
        aria-label="إغلاق نافذة رفع الملف"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[100]
          border-0
          bg-[#0F172A]/35
        "
      />

      <div
        dir="rtl"
        className="
          fixed
          left-1/2
          top-1/2
          z-[110]
          w-[calc(100%-24px)]
          max-w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[14px]
          bg-white
          shadow-[0_24px_70px_rgba(15,23,42,0.18)]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E2E8F0]
            px-[18px]
            py-[14px]
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
              رفع ملف جديد
            </h2>

            <p
              className="
                m-0
                mt-[2px]
                text-[9px]
                text-[#94A3B8]
              "
            >
              إضافة مستند إلى أرشيف النظام
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
              rounded-[8px]
              border
              border-[#E2E8F0]
              bg-white
              text-[#64748B]
            "
          >
            <X size={15} />
          </button>
        </div>

        <div
          className="
            max-h-[70vh]
            overflow-y-auto
            p-[18px]
          "
        >
          <div
            className="
              rounded-[10px]
              border
              border-dashed
              border-[#B7C8E4]
              bg-[#F8FAFC]
              p-[18px]
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-[10px]
                bg-[#EEF3FF]
                text-[#09379A]
              "
            >
              <Upload size={19} />
            </div>

            <p
              className="
                m-0
                mt-[8px]
                text-[10px]
                font-bold
                text-[#334155]
              "
            >
              اختر ملفًا من الجهاز
            </p>

            <p
              className="
                m-0
                mt-[2px]
                text-[8px]
                text-[#94A3B8]
              "
            >
              PDF، DOCX، XLSX، JPG، PNG أو ZIP
            </p>

            <input
              type="file"
              className="
                mt-[10px]
                max-w-full
                text-[9px]
                text-[#64748B]
              "
            />
          </div>

          <div
            className="
              mt-[15px]
              grid
              grid-cols-1
              gap-[11px]

              sm:grid-cols-2
            "
          >
            <FormInput
              label="اسم الملف"
              value={form.name}
              onChange={(value) =>
                updateField(
                  "name",
                  value
                )
              }
              placeholder="مثال: تقرير_نهائي.pdf"
            />

            <FormSelect
              label="نوع الملف"
              value={form.type}
              onChange={(value) =>
                updateField(
                  "type",
                  value
                )
              }
              options={[
                "طلب تدريب",
                "تقرير نهائي",
                "تقييم",
                "شهادة",
                "اتفاقية",
                "مرفقات",
                "سجل حضور",
                "تقرير زيارة",
              ]}
            />

            <FormSelect
              label="المصدر"
              value={form.source}
              onChange={(value) =>
                updateField(
                  "source",
                  value
                )
              }
              options={[
                "التدريب الميداني",
                "الدورات التدريبية",
                "جهات التدريب",
              ]}
            />

            <FormInput
              label="اسم الطالب"
              value={form.student}
              onChange={(value) =>
                updateField(
                  "student",
                  value
                )
              }
              placeholder="اختياري"
            />

            <FormInput
              label="الرقم الجامعي"
              value={form.studentId}
              onChange={(value) =>
                updateField(
                  "studentId",
                  value
                )
              }
              placeholder="اختياري"
            />

            <FormInput
              label="جهة التدريب"
              value={form.organization}
              onChange={(value) =>
                updateField(
                  "organization",
                  value
                )
              }
              placeholder="اسم الجهة"
            />

            <div className="sm:col-span-2">
              <FormInput
                label="المرجع المرتبط"
                value={
                  form.relatedEntity
                }
                onChange={(value) =>
                  updateField(
                    "relatedEntity",
                    value
                  )
                }
                placeholder="مثال: طلب التدريب TR-2026-084"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-bold
                  text-[#64748B]
                "
              >
                ملاحظات
              </label>

              <textarea
                value={
                  form.description
                }
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                rows={3}
                className="
                  w-full
                  resize-none
                  rounded-[9px]
                  border
                  border-[#DCE5F0]
                  bg-white
                  px-[11px]
                  py-[9px]
                  text-[9px]
                  text-[#475569]
                  outline-none
                "
              />
            </div>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            justify-end
            gap-[7px]
            border-t
            border-[#E2E8F0]
            px-[18px]
            py-[13px]
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-[37px]
              rounded-[8px]
              border
              border-[#DCE5F0]
              bg-white
              px-[14px]
              text-[9px]
              font-bold
              text-[#64748B]
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              flex
              h-[37px]
              items-center
              gap-[6px]
              rounded-[8px]
              border-0
              bg-[#09379A]
              px-[14px]
              text-[9px]
              font-bold
              text-white
            "
          >
            <Upload size={14} />

            حفظ الملف
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
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

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          h-[39px]
          w-full
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[11px]
          text-[9px]
          text-[#475569]
          outline-none
          placeholder:text-[#94A3B8]
        "
      />
    </div>
  );
}

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  value,
  onChange,
  options,
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
          px-[11px]
          text-[9px]
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