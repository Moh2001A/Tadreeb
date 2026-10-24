import { useMemo, useState } from "react";

import {
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  GraduationCap,
  Plus,
  Search,
  Settings2,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   MOCK DATA
========================================================= */

const initialColleges = [
  {
    id: 1,
    name: "كلية الهندسة وتكنولوجيا المعلومات",
    code: "ENG-IT",
    status: "نشطة",
    majors: [
      {
        id: 101,
        name: "هندسة البرمجيات",
        code: "SE",
        trainingRequired: true,
        requiredHours: 120,
        minimumAcademicHours: 90,
        status: "نشط",
      },
      {
        id: 102,
        name: "نظم المعلومات",
        code: "IS",
        trainingRequired: true,
        requiredHours: 120,
        minimumAcademicHours: 90,
        status: "نشط",
      },
      {
        id: 103,
        name: "علوم الحاسوب",
        code: "CS",
        trainingRequired: true,
        requiredHours: 120,
        minimumAcademicHours: 90,
        status: "نشط",
      },
    ],
  },

  {
    id: 2,
    name: "كلية الاقتصاد والعلوم الإدارية",
    code: "BUS",
    status: "نشطة",
    majors: [
      {
        id: 201,
        name: "إدارة الأعمال",
        code: "BA",
        trainingRequired: true,
        requiredHours: 120,
        minimumAcademicHours: 85,
        status: "نشط",
      },
      {
        id: 202,
        name: "المحاسبة",
        code: "ACC",
        trainingRequired: true,
        requiredHours: 120,
        minimumAcademicHours: 85,
        status: "نشط",
      },
    ],
  },

  {
    id: 3,
    name: "كلية العلوم الطبية التطبيقية",
    code: "AMS",
    status: "نشطة",
    majors: [
      {
        id: 301,
        name: "التمريض",
        code: "NUR",
        trainingRequired: true,
        requiredHours: 160,
        minimumAcademicHours: 100,
        status: "نشط",
      },
      {
        id: 302,
        name: "المختبرات الطبية",
        code: "MLT",
        trainingRequired: true,
        requiredHours: 140,
        minimumAcademicHours: 100,
        status: "نشط",
      },
    ],
  },

  {
    id: 4,
    name: "كلية التربية",
    code: "EDU",
    status: "نشطة",
    majors: [
      {
        id: 401,
        name: "تعليم أساسي",
        code: "BED",
        trainingRequired: true,
        requiredHours: 150,
        minimumAcademicHours: 90,
        status: "نشط",
      },
    ],
  },

  {
    id: 5,
    name: "كلية الآداب والعلوم الإنسانية",
    code: "ART",
    status: "نشطة",
    majors: [
      {
        id: 501,
        name: "الإعلام",
        code: "MEDIA",
        trainingRequired: true,
        requiredHours: 100,
        minimumAcademicHours: 80,
        status: "نشط",
      },
    ],
  },
];

const emptyCollegeForm = {
  name: "",
  code: "",
  status: "نشطة",
};

const emptyMajorForm = {
  name: "",
  code: "",
  trainingRequired: true,
  requiredHours: 120,
  minimumAcademicHours: 90,
  status: "نشط",
};

/* =========================================================
   PAGE
========================================================= */

export default function AcademicStructure() {
  const [colleges, setColleges] =
    useState(initialColleges);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [selectedCollege, setSelectedCollege] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showCollegeModal, setShowCollegeModal] =
    useState(false);

  const [showMajorModal, setShowMajorModal] =
    useState(false);

  const [editingCollege, setEditingCollege] =
    useState(null);

  const [editingMajor, setEditingMajor] =
    useState(null);

  const [collegeForm, setCollegeForm] =
    useState(emptyCollegeForm);

  const [majorForm, setMajorForm] =
    useState(emptyMajorForm);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    const totalColleges =
      colleges.length;

    const activeColleges =
      colleges.filter(
        (college) =>
          college.status === "نشطة"
      ).length;

    const totalMajors =
      colleges.reduce(
        (sum, college) =>
          sum + college.majors.length,
        0
      );

    const trainingMajors =
      colleges.reduce(
        (sum, college) =>
          sum +
          college.majors.filter(
            (major) =>
              major.trainingRequired
          ).length,
        0
      );

    return [
      {
        title: "الكليات",
        value: totalColleges,
        description: "إجمالي الكليات المسجلة",
        icon: Building2,
        iconBg: "bg-[#EEF3FF]",
        iconColor: "text-[#09379A]",
      },
      {
        title: "الكليات النشطة",
        value: activeColleges,
        description: "متاحة في النظام حاليًا",
        icon: CheckCircle2,
        iconBg: "bg-[#ECFDF3]",
        iconColor: "text-[#15803D]",
      },
      {
        title: "التخصصات",
        value: totalMajors,
        description: "إجمالي التخصصات الأكاديمية",
        icon: GraduationCap,
        iconBg: "bg-[#FFF7ED]",
        iconColor: "text-[#C2410C]",
      },
      {
        title: "تخصصات تتطلب تدريبًا",
        value: trainingMajors,
        description: "مرتبطة بمتطلبات تدريب",
        icon: Settings2,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7E22CE]",
      },
    ];
  }, [colleges]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredColleges = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return colleges.filter((college) => {
      const matchesSearch =
        !query ||
        college.name
          .toLowerCase()
          .includes(query) ||
        college.code
          .toLowerCase()
          .includes(query) ||
        college.majors.some((major) =>
          major.name
            .toLowerCase()
            .includes(query)
        );

      const matchesStatus =
        statusFilter === "الكل" ||
        college.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    colleges,
    searchTerm,
    statusFilter,
  ]);

  /* =========================================================
     COLLEGE ACTIONS
  ========================================================= */

  const openAddCollege = () => {
    setEditingCollege(null);
    setCollegeForm(emptyCollegeForm);
    setShowCollegeModal(true);
  };

  const openEditCollege = (college) => {
    setEditingCollege(college);

    setCollegeForm({
      name: college.name,
      code: college.code,
      status: college.status,
    });

    setShowDetails(false);
    setShowCollegeModal(true);
  };

  const submitCollege = () => {
    if (
      !collegeForm.name.trim() ||
      !collegeForm.code.trim()
    ) {
      return;
    }

    if (editingCollege) {
      setColleges((previous) =>
        previous.map((college) =>
          college.id === editingCollege.id
            ? {
                ...college,
                ...collegeForm,
              }
            : college
        )
      );
    } else {
      const nextId =
        Math.max(
          ...colleges.map(
            (college) => college.id
          ),
          0
        ) + 1;

      setColleges((previous) => [
        ...previous,
        {
          id: nextId,
          ...collegeForm,
          majors: [],
        },
      ]);
    }

    setShowCollegeModal(false);
    setEditingCollege(null);
  };

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (college) => {
    setSelectedCollege(college);
    setShowDetails(true);
  };

  /* =========================================================
     MAJORS
  ========================================================= */

  const openAddMajor = () => {
    setEditingMajor(null);
    setMajorForm(emptyMajorForm);
    setShowMajorModal(true);
  };

  const openEditMajor = (major) => {
    setEditingMajor(major);

    setMajorForm({
      name: major.name,
      code: major.code,
      trainingRequired:
        major.trainingRequired,
      requiredHours:
        major.requiredHours,
      minimumAcademicHours:
        major.minimumAcademicHours,
      status: major.status,
    });

    setShowMajorModal(true);
  };

  const submitMajor = () => {
    if (
      !selectedCollege ||
      !majorForm.name.trim() ||
      !majorForm.code.trim()
    ) {
      return;
    }

    const updatedColleges =
      colleges.map((college) => {
        if (
          college.id !==
          selectedCollege.id
        ) {
          return college;
        }

        if (editingMajor) {
          return {
            ...college,
            majors: college.majors.map(
              (major) =>
                major.id ===
                editingMajor.id
                  ? {
                      ...major,
                      ...majorForm,
                    }
                  : major
            ),
          };
        }

        const allMajorIds =
          colleges.flatMap(
            (item) =>
              item.majors.map(
                (major) => major.id
              )
          );

        const nextMajorId =
          Math.max(
            ...allMajorIds,
            0
          ) + 1;

        return {
          ...college,
          majors: [
            ...college.majors,
            {
              id: nextMajorId,
              ...majorForm,
            },
          ],
        };
      });

    setColleges(updatedColleges);

    const updatedSelected =
      updatedColleges.find(
        (college) =>
          college.id ===
          selectedCollege.id
      );

    setSelectedCollege(
      updatedSelected
    );

    setShowMajorModal(false);
    setEditingMajor(null);
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

              <span>
                الإعداد الأكاديمي
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
                الكليات والتخصصات
              </span>
            </div>

            {/* =================================================
                HEADER
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
                  الكليات والتخصصات
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]

                    max-w-[800px]

                    text-[11px]
                    leading-[21px]
                    text-[#64748B]

                    sm:text-[12px]
                  "
                >
                  إدارة الهيكل الأكاديمي المرتبط
                  بالتدريب وتحديد متطلبات كل تخصص
                  من حيث الساعات الأكاديمية وساعات
                  التدريب المطلوبة.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddCollege}
                className="
                  flex
                  min-h-[42px]
                  w-full
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

                  transition

                  hover:bg-[#072E81]

                  sm:w-auto
                "
              >
                <Plus size={16} />
                إضافة كلية
              </button>
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

                sm:p-[16px]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-[minmax(0,1fr)_210px]
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
                      placeholder="اسم الكلية، رمز الكلية أو اسم التخصص..."
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

                <div>
                  <FilterLabel>
                    حالة الكلية
                  </FilterLabel>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value
                      )
                    }
                    className={inputStyle}
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
                  </select>
                </div>
              </div>
            </section>

            {/* =================================================
                COLLEGES GRID
            ================================================== */}

            <section
              className="
                mt-[16px]

                grid
                grid-cols-1
                gap-[13px]

                lg:grid-cols-2
              "
            >
              {filteredColleges.map(
                (college) => {
                  const trainingMajors =
                    college.majors.filter(
                      (major) =>
                        major.trainingRequired
                    ).length;

                  return (
                    <article
                      key={college.id}
                      className="
                        rounded-[14px]

                        border
                        border-[#DDE5EF]

                        bg-white

                        p-[16px]

                        transition

                        hover:border-[#C7D4E6]
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
                            min-w-0
                            items-start
                            gap-[11px]
                          "
                        >
                          <div
                            className="
                              flex
                              h-[42px]
                              w-[42px]
                              shrink-0
                              items-center
                              justify-center

                              rounded-[10px]

                              bg-[#EEF3FF]

                              text-[#09379A]
                            "
                          >
                            <Building2 size={20} />
                          </div>

                          <div className="min-w-0">
                            <h3
                              className="
                                m-0

                                text-[13px]
                                font-bold
                                leading-[21px]
                                text-[#334155]
                              "
                            >
                              {college.name}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]

                                text-[9px]
                                text-[#94A3B8]
                              "
                            >
                              رمز الكلية:{" "}
                              <span
                                className="
                                  font-bold
                                  text-[#64748B]
                                "
                              >
                                {college.code}
                              </span>
                            </p>
                          </div>
                        </div>

                        <StatusBadge
                          status={
                            college.status
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[15px]

                          grid
                          grid-cols-3
                          gap-[8px]
                        "
                      >
                        <MiniStat
                          label="التخصصات"
                          value={
                            college.majors.length
                          }
                        />

                        <MiniStat
                          label="تتطلب تدريبًا"
                          value={
                            trainingMajors
                          }
                        />

                        <MiniStat
                          label="الحالة"
                          value={
                            college.status
                          }
                          text
                        />
                      </div>

                      <div
                        className="
                          mt-[14px]

                          flex
                          flex-wrap
                          gap-[6px]
                        "
                      >
                        {college.majors
                          .slice(0, 4)
                          .map((major) => (
                            <span
                              key={major.id}
                              className="
                                rounded-full

                                bg-[#F1F5F9]

                                px-[8px]
                                py-[5px]

                                text-[8px]
                                font-medium
                                text-[#64748B]
                              "
                            >
                              {major.name}
                            </span>
                          ))}

                        {college.majors.length >
                          4 && (
                          <span
                            className="
                              rounded-full

                              bg-[#EEF3FF]

                              px-[8px]
                              py-[5px]

                              text-[8px]
                              font-bold
                              text-[#09379A]
                            "
                          >
                            +
                            {college.majors
                              .length - 4}
                          </span>
                        )}
                      </div>

                      <div
                        className="
                          mt-[14px]

                          flex
                          gap-[8px]

                          border-t
                          border-[#EEF2F7]

                          pt-[12px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              college
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

                            text-[9px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          <Eye size={14} />
                          عرض وإدارة التخصصات
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditCollege(
                              college
                            )
                          }
                          className="
                            flex
                            h-[36px]
                            w-[42px]
                            items-center
                            justify-center

                            rounded-[8px]

                            border
                            border-[#DCE5F0]

                            bg-white

                            text-[#64748B]

                            hover:text-[#09379A]
                          "
                        >
                          <Edit3 size={14} />
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </section>

            {filteredColleges.length ===
              0 && <EmptyState />}
          </div>
        </main>
      </div>

      {/* =====================================================
          COLLEGE DETAILS DRAWER
      ====================================================== */}

      {showDetails &&
        selectedCollege && (
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
                max-w-[610px]
                flex-col

                bg-white

                shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
              "
            >
              {/* HEADER */}

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
                    {selectedCollege.name}
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[10px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedCollege.code}
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

              {/* BODY */}

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
                      التخصصات الأكاديمية
                    </p>

                    <p
                      className="
                        m-0
                        mt-[2px]

                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      إدارة متطلبات التدريب لكل تخصص
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openAddMajor}
                    className="
                      flex
                      h-[36px]
                      items-center
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
                    <Plus size={14} />
                    إضافة تخصص
                  </button>
                </div>

                <div
                  className="
                    mt-[14px]

                    flex
                    flex-col
                    gap-[10px]
                  "
                >
                  {selectedCollege.majors.map(
                    (major) => (
                      <article
                        key={major.id}
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
                            gap-4
                          "
                        >
                          <div>
                            <h3
                              className="
                                m-0

                                text-[11px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {major.name}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]

                                text-[9px]
                                text-[#94A3B8]
                              "
                            >
                              الرمز: {major.code}
                            </p>
                          </div>

                          <StatusBadge
                            status={major.status}
                          />
                        </div>

                        <div
                          className="
                            mt-[11px]

                            grid
                            grid-cols-2
                            gap-[8px]

                            sm:grid-cols-3
                          "
                        >
                          <InfoBox
                            label="التدريب مطلوب"
                            value={
                              major.trainingRequired
                                ? "نعم"
                                : "لا"
                            }
                          />

                          <InfoBox
                            label="ساعات التدريب"
                            value={
                              major.trainingRequired
                                ? `${major.requiredHours} ساعة`
                                : "لا ينطبق"
                            }
                          />

                          <InfoBox
                            label="الحد الأدنى الأكاديمي"
                            value={`${major.minimumAcademicHours} ساعة`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openEditMajor(major)
                          }
                          className="
                            mt-[11px]

                            flex
                            h-[34px]
                            w-full
                            items-center
                            justify-center
                            gap-[6px]

                            rounded-[8px]

                            border
                            border-[#DCE5F0]

                            bg-white

                            text-[9px]
                            font-bold
                            text-[#64748B]

                            hover:text-[#09379A]
                          "
                        >
                          <Edit3 size={13} />
                          تعديل بيانات التخصص
                        </button>
                      </article>
                    )
                  )}

                  {selectedCollege.majors.length ===
                    0 && (
                    <div
                      className="
                        rounded-[10px]

                        border
                        border-dashed
                        border-[#D9E2EC]

                        py-[30px]

                        text-center

                        text-[10px]
                        text-[#94A3B8]
                      "
                    >
                      لا توجد تخصصات في هذه الكلية بعد.
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  shrink-0

                  border-t
                  border-[#E2E8F0]

                  px-5
                  py-[14px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    openEditCollege(
                      selectedCollege
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

                    text-[10px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  <Edit3 size={14} />
                  تعديل بيانات الكلية
                </button>
              </div>
            </aside>
          </>
        )}

      {/* =====================================================
          COLLEGE MODAL
      ====================================================== */}

      {showCollegeModal && (
        <ModalOverlay
          onClose={() =>
            setShowCollegeModal(false)
          }
        >
          <div
            dir="rtl"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              w-full
              max-w-[520px]

              rounded-[16px]

              border
              border-[#E2E8F0]

              bg-white
            "
          >
            <ModalHeader
              title={
                editingCollege
                  ? "تعديل الكلية"
                  : "إضافة كلية جديدة"
              }
              subtitle="بيانات الهيكل الأكاديمي"
              onClose={() =>
                setShowCollegeModal(false)
              }
            />

            <div
              className="
                grid
                gap-[14px]

                px-5
                py-5
              "
            >
              <FormInput
                label="اسم الكلية"
                value={collegeForm.name}
                onChange={(value) =>
                  setCollegeForm(
                    (previous) => ({
                      ...previous,
                      name: value,
                    })
                  )
                }
              />

              <FormInput
                label="رمز الكلية"
                value={collegeForm.code}
                onChange={(value) =>
                  setCollegeForm(
                    (previous) => ({
                      ...previous,
                      code: value,
                    })
                  )
                }
              />

              <FormSelect
                label="الحالة"
                value={
                  collegeForm.status
                }
                onChange={(value) =>
                  setCollegeForm(
                    (previous) => ({
                      ...previous,
                      status: value,
                    })
                  )
                }
              >
                <option value="نشطة">
                  نشطة
                </option>

                <option value="غير نشطة">
                  غير نشطة
                </option>
              </FormSelect>
            </div>

            <ModalFooter
              onCancel={() =>
                setShowCollegeModal(false)
              }
              onSubmit={submitCollege}
              submitLabel={
                editingCollege
                  ? "حفظ التعديلات"
                  : "إضافة الكلية"
              }
            />
          </div>
        </ModalOverlay>
      )}

      {/* =====================================================
          MAJOR MODAL
      ====================================================== */}

      {showMajorModal &&
        selectedCollege && (
          <ModalOverlay
            onClose={() =>
              setShowMajorModal(false)
            }
          >
            <div
              dir="rtl"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                max-h-[92dvh]
                w-full
                max-w-[620px]
                overflow-y-auto

                rounded-[16px]

                border
                border-[#E2E8F0]

                bg-white
              "
            >
              <ModalHeader
                title={
                  editingMajor
                    ? "تعديل التخصص"
                    : "إضافة تخصص"
                }
                subtitle={
                  selectedCollege.name
                }
                onClose={() =>
                  setShowMajorModal(false)
                }
              />

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
                <FormInput
                  label="اسم التخصص"
                  value={majorForm.name}
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        name: value,
                      })
                    )
                  }
                />

                <FormInput
                  label="رمز التخصص"
                  value={majorForm.code}
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        code: value,
                      })
                    )
                  }
                />

                <FormSelect
                  label="هل التدريب مطلوب؟"
                  value={
                    majorForm.trainingRequired
                      ? "نعم"
                      : "لا"
                  }
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        trainingRequired:
                          value === "نعم",
                      })
                    )
                  }
                >
                  <option value="نعم">
                    نعم
                  </option>

                  <option value="لا">
                    لا
                  </option>
                </FormSelect>

                <FormSelect
                  label="الحالة"
                  value={majorForm.status}
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        status: value,
                      })
                    )
                  }
                >
                  <option value="نشط">
                    نشط
                  </option>

                  <option value="غير نشط">
                    غير نشط
                  </option>
                </FormSelect>

                <FormNumber
                  label="ساعات التدريب المطلوبة"
                  value={
                    majorForm.requiredHours
                  }
                  disabled={
                    !majorForm.trainingRequired
                  }
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        requiredHours:
                          Number(value),
                      })
                    )
                  }
                />

                <FormNumber
                  label="الحد الأدنى للساعات الأكاديمية"
                  value={
                    majorForm.minimumAcademicHours
                  }
                  onChange={(value) =>
                    setMajorForm(
                      (previous) => ({
                        ...previous,
                        minimumAcademicHours:
                          Number(value),
                      })
                    )
                  }
                />
              </div>

              <ModalFooter
                onCancel={() =>
                  setShowMajorModal(false)
                }
                onSubmit={submitMajor}
                submitLabel={
                  editingMajor
                    ? "حفظ التعديلات"
                    : "إضافة التخصص"
                }
              />
            </div>
          </ModalOverlay>
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

  text-[11px]
  text-[#334155]

  outline-none

  focus:border-[#09379A]
  focus:ring-2
  focus:ring-[#09379A]/10
`;

function StatusBadge({ status }) {
  const active =
    status === "نشطة" ||
    status === "نشط";

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
              bg-[#F8FAFC]
              text-[#64748B]
            `
        }
      `}
    >
      {status}
    </span>
  );
}

function MiniStat({
  label,
  value,
  text = false,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-[#E7ECF2]

        bg-[#FAFBFC]

        px-[9px]
        py-[9px]

        text-center
      "
    >
      <strong
        className={`
          block

          font-bold
          text-[#334155]

          ${
            text
              ? "text-[9px]"
              : "text-[14px]"
          }
        `}
      >
        {value}
      </strong>

      <span
        className="
          mt-[2px]
          block

          text-[8px]
          text-[#94A3B8]
        "
      >
        {label}
      </span>
    </div>
  );
}

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[8px]

        border
        border-[#E7ECF2]

        bg-white

        px-[9px]
        py-[8px]
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

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <div
      onClick={onClose}
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

        backdrop-blur-[2px]
      "
    >
      {children}
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
  onClose,
}) {
  return (
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
          {title}
        </h2>

        <p
          className="
            m-0
            mt-[3px]

            text-[10px]
            text-[#94A3B8]
          "
        >
          {subtitle}
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

          border-0

          bg-[#F8FAFC]

          text-[#64748B]
        "
      >
        <X size={16} />
      </button>
    </div>
  );
}

function ModalFooter({
  onCancel,
  onSubmit,
  submitLabel,
}) {
  return (
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
        onClick={onCancel}
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
        onClick={onSubmit}
        className="
          min-h-[40px]

          rounded-[8px]

          border-0

          bg-[#09379A]

          px-[18px]

          text-[10px]
          font-bold
          text-white
        "
      >
        {submitLabel}
      </button>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
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

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputStyle}
      />
    </div>
  );
}

function FormNumber({
  label,
  value,
  onChange,
  disabled = false,
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

      <input
        type="number"
        min="0"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`
          ${inputStyle}

          ${
            disabled
              ? "cursor-not-allowed bg-[#F8FAFC] text-[#94A3B8]"
              : ""
          }
        `}
      />
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
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputStyle}
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
        mt-[16px]

        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center

        rounded-[14px]

        border
        border-[#DDE5EF]

        bg-white

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
        لا توجد كليات
      </h3>

      <p
        className="
          m-0
          mt-[3px]

          text-[10px]
          text-[#94A3B8]
        "
      >
        لا توجد كليات مطابقة للفلاتر الحالية.
      </p>
    </div>
  );
}