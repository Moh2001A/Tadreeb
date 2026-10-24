import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  RefreshCw,
  Save,
  Settings2,
  Table2,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function CustomReport() {
  const navigate = useNavigate();

  /* =========================================================
     REPORT TYPES
  ========================================================= */

  const reportTypes = [
    {
      id: "students",
      title: "تقرير الطلبة",
      description:
        "بيانات الطلبة وحالة التدريب والأهلية والساعات.",
      icon: GraduationCap,
    },
    {
      id: "training",
      title: "التدريب الميداني",
      description:
        "الطلبات والتوزيع والجهات والإتمام.",
      icon: FileText,
    },
    {
      id: "courses",
      title: "الدورات التدريبية",
      description:
        "الدورات والتسجيل والحضور والتقييم.",
      icon: BarChart3,
    },
    {
      id: "evaluations",
      title: "التقييمات",
      description:
        "نتائج تقييم الطلبة والمشرفين.",
      icon: CheckCircle2,
    },
  ];

  /* =========================================================
     AVAILABLE COLUMNS
  ========================================================= */

  const columnsByType = {
    students: [
      {
        id: "studentId",
        label: "الرقم الجامعي",
      },
      {
        id: "studentName",
        label: "اسم الطالب",
      },
      {
        id: "college",
        label: "الكلية",
      },
      {
        id: "major",
        label: "التخصص",
      },
      {
        id: "status",
        label: "حالة التدريب",
      },
      {
        id: "organization",
        label: "جهة التدريب",
      },
      {
        id: "hours",
        label: "الساعات المكتملة",
      },
    ],

    training: [
      {
        id: "requestId",
        label: "رقم الطلب",
      },
      {
        id: "studentName",
        label: "اسم الطالب",
      },
      {
        id: "college",
        label: "الكلية",
      },
      {
        id: "organization",
        label: "جهة التدريب",
      },
      {
        id: "supervisor",
        label: "المشرف الأكاديمي",
      },
      {
        id: "startDate",
        label: "تاريخ البداية",
      },
      {
        id: "hours",
        label: "الساعات",
      },
      {
        id: "status",
        label: "الحالة",
      },
    ],

    courses: [
      {
        id: "courseId",
        label: "رمز الدورة",
      },
      {
        id: "courseName",
        label: "اسم الدورة",
      },
      {
        id: "trainer",
        label: "المدرب",
      },
      {
        id: "registered",
        label: "عدد المسجلين",
      },
      {
        id: "attendance",
        label: "نسبة الحضور",
      },
      {
        id: "status",
        label: "الحالة",
      },
    ],

    evaluations: [
      {
        id: "studentId",
        label: "الرقم الجامعي",
      },
      {
        id: "studentName",
        label: "اسم الطالب",
      },
      {
        id: "organization",
        label: "جهة التدريب",
      },
      {
        id: "academicScore",
        label: "تقييم أكاديمي",
      },
      {
        id: "fieldScore",
        label: "تقييم ميداني",
      },
      {
        id: "finalScore",
        label: "النتيجة النهائية",
      },
      {
        id: "status",
        label: "الحالة",
      },
    ],
  };

  /* =========================================================
     SAMPLE DATA
  ========================================================= */

  const dataByType = {
    students: [
      {
        studentId: "20231045",
        studentName: "أحمد خالد محمد",
        college:
          "كلية الهندسة وتكنولوجيا المعلومات",
        major: "هندسة البرمجيات",
        status: "في التدريب",
        organization:
          "شركة التقنية المتقدمة",
        hours: "86 / 120",
      },
      {
        studentId: "20230765",
        studentName: "مريم أحمد علي",
        college:
          "كلية العلوم الطبية التطبيقية",
        major: "التمريض",
        status: "مكتمل",
        organization:
          "مستشفى الشفاء",
        hours: "160 / 160",
      },
      {
        studentId: "20230876",
        studentName: "سارة محمود علي",
        college:
          "كلية الاقتصاد والعلوم الإدارية",
        major: "إدارة الأعمال",
        status: "في التدريب",
        organization:
          "بنك فلسطين",
        hours: "72 / 120",
      },
      {
        studentId: "20231234",
        studentName: "محمد سامي حسن",
        college:
          "كلية الهندسة وتكنولوجيا المعلومات",
        major: "نظم المعلومات",
        status: "بانتظار التوزيع",
        organization: "—",
        hours: "0 / 120",
      },
    ],

    training: [
      {
        requestId: "TR-2026-084",
        studentName: "أحمد خالد محمد",
        college:
          "كلية الهندسة وتكنولوجيا المعلومات",
        organization:
          "شركة التقنية المتقدمة",
        supervisor: "د. سامر يوسف",
        startDate: "2026/10/01",
        hours: "86",
        status: "نشط",
      },
      {
        requestId: "TR-2026-078",
        studentName: "مريم أحمد علي",
        college:
          "كلية العلوم الطبية التطبيقية",
        organization:
          "مستشفى الشفاء",
        supervisor: "د. سارة خليل",
        startDate: "2026/08/15",
        hours: "160",
        status: "مكتمل",
      },
      {
        requestId: "TR-2026-083",
        studentName: "سارة محمود علي",
        college:
          "كلية الاقتصاد والعلوم الإدارية",
        organization:
          "بنك فلسطين",
        supervisor: "د. ليلى أحمد",
        startDate: "2026/10/05",
        hours: "72",
        status: "نشط",
      },
    ],

    courses: [
      {
        courseId: "TR-C-101",
        courseName:
          "الإنعاش القلبي الرئوي CPR",
        trainer: "د. أحمد خالد",
        registered: "26",
        attendance: "94%",
        status: "منتهية",
      },
      {
        courseId: "TR-C-102",
        courseName:
          "مهارات التواصل المهني",
        trainer: "أ. محمد حسن",
        registered: "34",
        attendance: "88%",
        status: "جارية",
      },
      {
        courseId: "TR-C-103",
        courseName:
          "السلامة والصحة المهنية",
        trainer: "م. رامي أحمد",
        registered: "18",
        attendance: "—",
        status: "مفتوحة",
      },
    ],

    evaluations: [
      {
        studentId: "20230765",
        studentName: "مريم أحمد علي",
        organization:
          "مستشفى الشفاء",
        academicScore: "47 / 50",
        fieldScore: "48 / 50",
        finalScore: "95 / 100",
        status: "معتمد",
      },
      {
        studentId: "20231045",
        studentName: "أحمد خالد محمد",
        organization:
          "شركة التقنية المتقدمة",
        academicScore: "43 / 50",
        fieldScore: "45 / 50",
        finalScore: "88 / 100",
        status: "مكتمل",
      },
      {
        studentId: "20230876",
        studentName: "سارة محمود علي",
        organization:
          "بنك فلسطين",
        academicScore: "—",
        fieldScore: "44 / 50",
        finalScore: "—",
        status: "قيد التقييم",
      },
    ],
  };

  /* =========================================================
     STATE
  ========================================================= */

  const [reportType, setReportType] =
    useState("students");

  const [filters, setFilters] = useState({
    college: "الكل",
    semester: "الفصل الأول 2026/2027",
    status: "الكل",
    fromDate: "",
    toDate: "",
  });

  const [selectedColumns, setSelectedColumns] =
    useState(
      columnsByType.students.map(
        (column) => column.id
      )
    );

  const [reportTitle, setReportTitle] =
    useState("تقرير الطلبة");

  const [generated, setGenerated] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  /* =========================================================
     CURRENT CONFIG
  ========================================================= */

  const currentColumns =
    columnsByType[reportType];

  const currentData =
    dataByType[reportType];

  /* =========================================================
     CHANGE TYPE
  ========================================================= */

  const handleReportType = (type) => {
    setReportType(type);

    const selected =
      reportTypes.find(
        (item) => item.id === type
      );

    setReportTitle(
      selected?.title || "تقرير مخصص"
    );

    setSelectedColumns(
      columnsByType[type].map(
        (column) => column.id
      )
    );

    setGenerated(false);
    setSaved(false);
  };

  /* =========================================================
     COLUMN TOGGLE
  ========================================================= */

  const toggleColumn = (columnId) => {
    setSelectedColumns(
      (previous) =>
        previous.includes(columnId)
          ? previous.filter(
              (id) => id !== columnId
            )
          : [...previous, columnId]
    );

    setGenerated(false);
    setSaved(false);
  };

  const selectAllColumns = () => {
    setSelectedColumns(
      currentColumns.map(
        (column) => column.id
      )
    );

    setGenerated(false);
  };

  /* =========================================================
     FILTERED DATA
  ========================================================= */

  const previewData = useMemo(() => {
    return currentData.filter((row) => {
      const matchesCollege =
        filters.college === "الكل" ||
        !row.college ||
        row.college ===
          filters.college;

      const matchesStatus =
        filters.status === "الكل" ||
        row.status ===
          filters.status;

      return (
        matchesCollege &&
        matchesStatus
      );
    });
  }, [
    currentData,
    filters.college,
    filters.status,
  ]);

  /* =========================================================
     GENERATE
  ========================================================= */

  const generateReport = () => {
    if (
      selectedColumns.length === 0
    ) {
      return;
    }

    setGenerated(true);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetReport = () => {
    setFilters({
      college: "الكل",
      semester:
        "الفصل الأول 2026/2027",
      status: "الكل",
      fromDate: "",
      toDate: "",
    });

    setSelectedColumns(
      currentColumns.map(
        (column) => column.id
      )
    );

    setGenerated(false);
    setSaved(false);
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
                HEADER
            ================================================== */}

            <div
              className="
                flex
                flex-col
                gap-4

                md:flex-row
                md:items-center
                md:justify-between
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

                  <span>التقارير</span>

                  <span>/</span>

                  <span className="text-[#64748B]">
                    تقرير مخصص
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
                  إنشاء تقرير مخصص
                </h1>

                <p
                  className="
                    m-0
                    mt-[4px]
                    max-w-[720px]
                    text-[11px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  حدد نوع البيانات
                  والفلاتر والأعمدة التي
                  تريد تضمينها ثم عاين
                  التقرير قبل التصدير.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/reports"
                  )
                }
                className="
                  flex
                  h-[40px]
                  w-fit
                  items-center
                  gap-[6px]
                  rounded-[9px]
                  border
                  border-[#DCE5F0]
                  bg-white
                  px-[14px]
                  text-[9px]
                  font-bold
                  text-[#64748B]
                "
              >
                <ArrowRight size={15} />

                العودة للتقارير
              </button>
            </div>

            {/* =================================================
                REPORT TYPES
            ================================================== */}

            <section
              className="
                mt-[20px]
                grid
                grid-cols-1
                gap-[10px]

                sm:grid-cols-2

                xl:grid-cols-4
              "
            >
              {reportTypes.map(
                (type) => {
                  const Icon =
                    type.icon;

                  const active =
                    reportType ===
                    type.id;

                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        handleReportType(
                          type.id
                        )
                      }
                      className={`
                        rounded-[13px]
                        border
                        p-[14px]
                        text-right
                        transition-all

                        ${
                          active
                            ? `
                                border-[#9DB7E5]
                                bg-[#F6F9FF]
                                shadow-[0_5px_16px_rgba(9,55,154,0.07)]
                              `
                            : `
                                border-[#DDE5EF]
                                bg-white
                                hover:border-[#C9D6E8]
                              `
                        }
                      `}
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
                            h-[38px]
                            w-[38px]
                            items-center
                            justify-center
                            rounded-[9px]
                            bg-[#EEF3FF]
                            text-[#09379A]
                          "
                        >
                          <Icon
                            size={18}
                            strokeWidth={
                              1.8
                            }
                          />
                        </div>

                        {active && (
                          <span
                            className="
                              flex
                              h-[24px]
                              w-[24px]
                              items-center
                              justify-center
                              rounded-full
                              bg-[#09379A]
                              text-white
                            "
                          >
                            <Check
                              size={12}
                            />
                          </span>
                        )}
                      </div>

                      <h3
                        className="
                          m-0
                          mt-[10px]
                          text-[11px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        {type.title}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[3px]
                          text-[8px]
                          leading-[17px]
                          text-[#94A3B8]
                        "
                      >
                        {
                          type.description
                        }
                      </p>
                    </button>
                  );
                }
              )}
            </section>

            {/* =================================================
                REPORT TITLE
            ================================================== */}

            <section
              className="
                mt-[16px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[16px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <label
                className="
                  mb-[6px]
                  block
                  text-[9px]
                  font-bold
                  text-[#64748B]
                "
              >
                اسم التقرير
              </label>

              <input
                type="text"
                value={reportTitle}
                onChange={(event) => {
                  setReportTitle(
                    event.target.value
                  );

                  setGenerated(false);
                }}
                className="
                  h-[42px]
                  w-full
                  rounded-[9px]
                  border
                  border-[#DCE5F0]
                  bg-white
                  px-[12px]
                  text-[10px]
                  font-medium
                  text-[#334155]
                  outline-none
                "
              />
            </section>

            {/* =================================================
                CONFIG
            ================================================== */}

            <section
              className="
                mt-[16px]
                grid
                grid-cols-1
                gap-[14px]

                xl:grid-cols-[minmax(0,1fr)_350px]
              "
            >
              {/* FILTERS */}

              <div
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  p-[16px]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-[9px]
                  "
                >
                  <div
                    className="
                      flex
                      h-[35px]
                      w-[35px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[8px]
                      bg-[#EEF3FF]
                      text-[#09379A]
                    "
                  >
                    <Filter size={16} />
                  </div>

                  <div>
                    <h2
                      className="
                        m-0
                        text-[13px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      فلاتر التقرير
                    </h2>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      حدد نطاق البيانات
                      التي تريد عرضها.
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-[15px]
                    grid
                    grid-cols-1
                    gap-[10px]

                    sm:grid-cols-2
                  "
                >
                  <FormSelect
                    label="الكلية"
                    value={
                      filters.college
                    }
                    onChange={(value) =>
                      setFilters(
                        (previous) => ({
                          ...previous,
                          college: value,
                        })
                      )
                    }
                    options={[
                      "الكل",
                      "كلية الهندسة وتكنولوجيا المعلومات",
                      "كلية العلوم الطبية التطبيقية",
                      "كلية الاقتصاد والعلوم الإدارية",
                      "كلية التربية",
                    ]}
                  />

                  <FormSelect
                    label="الفصل / الفترة"
                    value={
                      filters.semester
                    }
                    onChange={(value) =>
                      setFilters(
                        (previous) => ({
                          ...previous,
                          semester: value,
                        })
                      )
                    }
                    options={[
                      "الفصل الأول 2026/2027",
                      "الفصل الثاني 2025/2026",
                      "الفصل الأول 2025/2026",
                    ]}
                  />

                  <FormSelect
                    label="الحالة"
                    value={
                      filters.status
                    }
                    onChange={(value) =>
                      setFilters(
                        (previous) => ({
                          ...previous,
                          status: value,
                        })
                      )
                    }
                    options={[
                      "الكل",
                      "في التدريب",
                      "بانتظار التوزيع",
                      "نشط",
                      "مكتمل",
                      "معتمد",
                      "قيد التقييم",
                      "جارية",
                      "منتهية",
                      "مفتوحة",
                    ]}
                  />

                  <DateInput
                    label="من تاريخ"
                    value={
                      filters.fromDate
                    }
                    onChange={(value) =>
                      setFilters(
                        (previous) => ({
                          ...previous,
                          fromDate: value,
                        })
                      )
                    }
                  />

                  <DateInput
                    label="إلى تاريخ"
                    value={
                      filters.toDate
                    }
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
              </div>

              {/* COLUMNS */}

              <div
                className="
                  rounded-[14px]
                  border
                  border-[#DDE5EF]
                  bg-white
                  p-[16px]
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
                      items-start
                      gap-[9px]
                    "
                  >
                    <div
                      className="
                        flex
                        h-[35px]
                        w-[35px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[8px]
                        bg-[#EEF3FF]
                        text-[#09379A]
                      "
                    >
                      <Table2 size={16} />
                    </div>

                    <div>
                      <h2
                        className="
                          m-0
                          text-[13px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        أعمدة التقرير
                      </h2>

                      <p
                        className="
                          m-0
                          mt-[2px]
                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        اختر البيانات
                        التي تريد ظهورها.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={
                      selectAllColumns
                    }
                    className="
                      border-0
                      bg-transparent
                      text-[8px]
                      font-bold
                      text-[#09379A]
                    "
                  >
                    تحديد الكل
                  </button>
                </div>

                <div
                  className="
                    mt-[14px]
                    flex
                    flex-col
                    gap-[6px]
                  "
                >
                  {currentColumns.map(
                    (column) => {
                      const checked =
                        selectedColumns.includes(
                          column.id
                        );

                      return (
                        <button
                          key={
                            column.id
                          }
                          type="button"
                          onClick={() =>
                            toggleColumn(
                              column.id
                            )
                          }
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-[8px]
                            border
                            border-[#E7ECF2]
                            bg-[#FAFBFC]
                            px-[10px]
                            py-[9px]
                            text-right
                          "
                        >
                          <span
                            className="
                              text-[9px]
                              font-medium
                              text-[#475569]
                            "
                          >
                            {
                              column.label
                            }
                          </span>

                          <span
                            className={`
                              flex
                              h-[18px]
                              w-[18px]
                              items-center
                              justify-center
                              rounded-[5px]
                              border

                              ${
                                checked
                                  ? `
                                      border-[#09379A]
                                      bg-[#09379A]
                                      text-white
                                    `
                                  : `
                                      border-[#CBD5E1]
                                      bg-white
                                    `
                              }
                            `}
                          >
                            {checked && (
                              <Check
                                size={11}
                              />
                            )}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                <p
                  className="
                    m-0
                    mt-[10px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  تم اختيار{" "}
                  {selectedColumns.length}{" "}
                  من{" "}
                  {
                    currentColumns.length
                  }{" "}
                  أعمدة.
                </p>
              </div>
            </section>

            {/* =================================================
                ACTIONS
            ================================================== */}

            <section
              className="
                mt-[16px]
                flex
                flex-col
                gap-3
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[14px]

                sm:flex-row
                sm:items-center
                sm:justify-between
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
                <Settings2
                  size={15}
                />

                التقرير يحتوي حاليًا
                على{" "}
                {previewData.length}{" "}
                سجل و{" "}
                {
                  selectedColumns.length
                }{" "}
                أعمدة.
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-[6px]
                "
              >
                <button
                  type="button"
                  onClick={
                    resetReport
                  }
                  className="
                    flex
                    h-[36px]
                    items-center
                    gap-[5px]
                    rounded-[8px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[12px]
                    text-[8px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  <RefreshCw
                    size={13}
                  />

                  إعادة تعيين
                </button>

                <button
                  type="button"
                  onClick={
                    generateReport
                  }
                  className="
                    flex
                    h-[36px]
                    items-center
                    gap-[5px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    px-[13px]
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  <Eye size={13} />

                  إنشاء المعاينة
                </button>
              </div>
            </section>

            {/* =================================================
                PREVIEW
            ================================================== */}

            {generated && (
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
                    flex-col
                    gap-3
                    border-b
                    border-[#EEF2F7]
                    px-[16px]
                    py-[14px]

                    sm:flex-row
                    sm:items-center
                    sm:justify-between

                    sm:px-[20px]
                  "
                >
                  <div>
                    <div
                      className="
                        flex
                        items-center
                        gap-[7px]
                      "
                    >
                      <div
                        className="
                          flex
                          h-[33px]
                          w-[33px]
                          items-center
                          justify-center
                          rounded-[8px]
                          bg-[#EEF3FF]
                          text-[#09379A]
                        "
                      >
                        <FileText
                          size={15}
                        />
                      </div>

                      <div>
                        <h2
                          className="
                            m-0
                            text-[14px]
                            font-bold
                            text-[#1E293B]
                          "
                        >
                          {reportTitle}
                        </h2>

                        <p
                          className="
                            m-0
                            mt-[2px]
                            text-[8px]
                            text-[#94A3B8]
                          "
                        >
                          معاينة التقرير قبل
                          التصدير
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-[6px]
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSaved(true)
                      }
                      className="
                        flex
                        h-[35px]
                        items-center
                        gap-[5px]
                        rounded-[8px]
                        border
                        border-[#DCE5F0]
                        bg-white
                        px-[11px]
                        text-[8px]
                        font-bold
                        text-[#64748B]
                      "
                    >
                      {saved ? (
                        <CheckCircle2
                          size={13}
                          className="text-[#15803D]"
                        />
                      ) : (
                        <Save
                          size={13}
                        />
                      )}

                      {saved
                        ? "تم الحفظ"
                        : "حفظ الإعداد"}
                    </button>

                    <button
                      type="button"
                      className="
                        flex
                        h-[35px]
                        items-center
                        gap-[5px]
                        rounded-[8px]
                        border
                        border-[#D7E5FF]
                        bg-[#F6F9FF]
                        px-[11px]
                        text-[8px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      <FileSpreadsheet
                        size={13}
                      />

                      Excel
                    </button>

                    <button
                      type="button"
                      className="
                        flex
                        h-[35px]
                        items-center
                        gap-[5px]
                        rounded-[8px]
                        border-0
                        bg-[#09379A]
                        px-[11px]
                        text-[8px]
                        font-bold
                        text-white
                      "
                    >
                      <Download
                        size={13}
                      />

                      PDF
                    </button>
                  </div>
                </div>

                {/* REPORT SUMMARY */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                    border-b
                    border-[#EEF2F7]
                    bg-[#FBFCFE]
                    px-[16px]
                    py-[12px]

                    md:grid-cols-4

                    sm:px-[20px]
                  "
                >
                  <SummaryItem
                    label="نوع التقرير"
                    value={
                      reportTypes.find(
                        (item) =>
                          item.id ===
                          reportType
                      )?.title
                    }
                  />

                  <SummaryItem
                    label="الفصل"
                    value={
                      filters.semester
                    }
                  />

                  <SummaryItem
                    label="عدد السجلات"
                    value={
                      previewData.length
                    }
                  />

                  <SummaryItem
                    label="عدد الأعمدة"
                    value={
                      selectedColumns.length
                    }
                  />
                </div>

                {/* TABLE */}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC]">
                        {currentColumns
                          .filter(
                            (column) =>
                              selectedColumns.includes(
                                column.id
                              )
                          )
                          .map(
                            (column) => (
                              <TableHead
                                key={
                                  column.id
                                }
                              >
                                {
                                  column.label
                                }
                              </TableHead>
                            )
                          )}
                      </tr>
                    </thead>

                    <tbody>
                      {previewData.map(
                        (row, index) => (
                          <tr
                            key={index}
                            className="
                              border-t
                              border-[#EEF2F7]
                              transition
                              hover:bg-[#FBFCFE]
                            "
                          >
                            {currentColumns
                              .filter(
                                (column) =>
                                  selectedColumns.includes(
                                    column.id
                                  )
                              )
                              .map(
                                (
                                  column
                                ) => (
                                  <TableCell
                                    key={
                                      column.id
                                    }
                                  >
                                    {
                                      row[
                                        column
                                          .id
                                      ]
                                    }
                                  </TableCell>
                                )
                              )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {previewData.length ===
                  0 && (
                  <div
                    className="
                      flex
                      min-h-[180px]
                      items-center
                      justify-center
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    لا توجد بيانات مطابقة
                    للفلاتر الحالية.
                  </div>
                )}
              </section>
            )}

            {!generated && (
              <section
                className="
                  mt-[16px]
                  flex
                  min-h-[220px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[14px]
                  border
                  border-dashed
                  border-[#CBD5E1]
                  bg-white
                  px-5
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
                    bg-[#EEF3FF]
                    text-[#09379A]
                  "
                >
                  <Table2 size={21} />
                </div>

                <h3
                  className="
                    m-0
                    mt-[11px]
                    text-[11px]
                    font-bold
                    text-[#334155]
                  "
                >
                  التقرير جاهز للإعداد
                </h3>

                <p
                  className="
                    m-0
                    mt-[4px]
                    max-w-[420px]
                    text-[8px]
                    leading-[17px]
                    text-[#94A3B8]
                  "
                >
                  اختر نوع التقرير
                  والفلاتر والأعمدة ثم
                  اضغط "إنشاء المعاينة".
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
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
   DATE INPUT
========================================================= */

function DateInput({
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
   SUMMARY
========================================================= */

function SummaryItem({
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
          font-bold
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
        whitespace-nowrap
        px-[13px]
        py-[11px]
        text-[9px]
        text-[#475569]
      "
    >
      {children ?? "—"}
    </td>
  );
}