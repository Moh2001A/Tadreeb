import { useMemo, useState } from "react";

import {
  AlertTriangle,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Eye,
  GraduationCap,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

/* =========================================================
   TRAINING REQUIREMENTS
========================================================= */

const trainingRequirements = {
  "هندسة البرمجيات": {
    courseCode: "SE-490",
    trainingCourse: "التدريب الميداني في هندسة البرمجيات",
    minimumAcademicHours: 90,
    requiredTrainingHours: 120,
    minimumGpa: 2.0,
  },

  "نظم المعلومات": {
    courseCode: "IS-490",
    trainingCourse: "التدريب الميداني في نظم المعلومات",
    minimumAcademicHours: 90,
    requiredTrainingHours: 120,
    minimumGpa: 2.0,
  },

  "إدارة الأعمال": {
    courseCode: "BUS-410",
    trainingCourse: "التدريب العملي في إدارة الأعمال",
    minimumAcademicHours: 85,
    requiredTrainingHours: 120,
    minimumGpa: 2.0,
  },

  المحاسبة: {
    courseCode: "ACC-410",
    trainingCourse: "التدريب العملي في المحاسبة",
    minimumAcademicHours: 85,
    requiredTrainingHours: 120,
    minimumGpa: 2.0,
  },

  التمريض: {
    courseCode: "NUR-480",
    trainingCourse: "التدريب السريري المتقدم",
    minimumAcademicHours: 100,
    requiredTrainingHours: 160,
    minimumGpa: 2.5,
  },

  "المختبرات الطبية": {
    courseCode: "MLT-470",
    trainingCourse: "التدريب السريري في المختبرات",
    minimumAcademicHours: 100,
    requiredTrainingHours: 140,
    minimumGpa: 2.5,
  },

  "تعليم أساسي": {
    courseCode: "EDU-450",
    trainingCourse: "التربية العملية",
    minimumAcademicHours: 90,
    requiredTrainingHours: 150,
    minimumGpa: 2.0,
  },

  الإعلام: {
    courseCode: "MEDIA-420",
    trainingCourse: "التدريب الإعلامي",
    minimumAcademicHours: 80,
    requiredTrainingHours: 100,
    minimumGpa: 2.0,
  },
};

/* =========================================================
   STUDENTS
========================================================= */

const studentsData = [
  {
    id: 1,
    studentId: "20231045",
    name: "أحمد خالد محمد",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "هندسة البرمجيات",

    academicHours: 104,
    gpa: 3.12,

    phone: "0599001122",
    email: "ahmad@student.edu",

    eligibility: "مؤهل",

    trainingStatus: "يتدرب حاليًا",

    organization: "شركة التقنية المتقدمة",

    opportunity: "مطور برمجيات متدرب",

    academicSupervisor: "د. سامر يوسف",
    fieldSupervisor: "م. محمد حمدي",

    requiredHours: 120,
    completedHours: 78,
  },

  {
    id: 2,
    studentId: "20230876",
    name: "سارة محمود علي",

    college: "كلية الاقتصاد والعلوم الإدارية",
    major: "إدارة الأعمال",

    academicHours: 96,
    gpa: 3.41,

    phone: "0599445566",
    email: "sara@student.edu",

    eligibility: "مؤهل",

    trainingStatus: "بانتظار البدء",

    organization: "بنك فلسطين",

    opportunity: "تدريب إداري ومالي",

    academicSupervisor: "د. ليلى أحمد",
    fieldSupervisor: "أ. رامي حسن",

    requiredHours: 120,
    completedHours: 0,
  },

  {
    id: 3,
    studentId: "20231234",
    name: "محمد سامي حسن",

    college: "كلية الهندسة وتكنولوجيا المعلومات",
    major: "نظم المعلومات",

    academicHours: 94,
    gpa: 2.73,

    phone: "0599332211",
    email: "mohammad@student.edu",

    eligibility: "مؤهل",

    trainingStatus: "يتدرب حاليًا",

    organization: "شركة الاتصالات الفلسطينية",

    opportunity: "دعم الأنظمة والشبكات",

    academicSupervisor: "د. أحمد نصار",
    fieldSupervisor: "م. خالد يوسف",

    requiredHours: 120,
    completedHours: 90,
  },

  {
    id: 4,
    studentId: "20230987",
    name: "ريم أحمد يوسف",

    college: "كلية التربية",
    major: "تعليم أساسي",

    academicHours: 88,
    gpa: 2.91,

    phone: "0599887766",
    email: "reem@student.edu",

    eligibility: "غير مؤهل",

    trainingStatus: "لم يبدأ",

    organization: "—",

    opportunity: "—",

    academicSupervisor: "د. منى عبد الرحمن",
    fieldSupervisor: "—",

    requiredHours: 150,
    completedHours: 0,
  },

  {
    id: 5,
    studentId: "20230765",
    name: "مريم أحمد علي",

    college: "كلية العلوم الطبية التطبيقية",
    major: "التمريض",

    academicHours: 118,
    gpa: 3.54,

    phone: "0599776655",
    email: "mariam@student.edu",

    eligibility: "مكتمل التدريب",

    trainingStatus: "مكتمل",

    organization: "مستشفى الشفاء",

    opportunity: "تدريب سريري",

    academicSupervisor: "د. سارة خليل",
    fieldSupervisor: "أ. محمود حسن",

    requiredHours: 160,
    completedHours: 160,
  },

  {
    id: 6,
    studentId: "20231356",
    name: "لينا محمود حسن",

    college: "كلية العلوم الطبية التطبيقية",
    major: "المختبرات الطبية",

    academicHours: 103,
    gpa: 2.67,

    phone: "0599665544",
    email: "lina@student.edu",

    eligibility: "يحتاج مراجعة",

    trainingStatus: "لم يبدأ",

    organization: "—",

    opportunity: "—",

    academicSupervisor: "د. خالد يوسف",
    fieldSupervisor: "—",

    requiredHours: 140,
    completedHours: 0,
  },

  {
    id: 7,
    studentId: "20231587",
    name: "عمر يوسف سليمان",

    college: "كلية الآداب والعلوم الإنسانية",
    major: "الإعلام",

    academicHours: 84,
    gpa: 1.86,

    phone: "0599554433",
    email: "omar@student.edu",

    eligibility: "غير مؤهل",

    trainingStatus: "غير متاح",

    organization: "—",

    opportunity: "—",

    academicSupervisor: "د. خالد حسن",
    fieldSupervisor: "—",

    requiredHours: 100,
    completedHours: 0,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Students() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [collegeFilter, setCollegeFilter] =
    useState("الكل");

  const [eligibilityFilter, setEligibilityFilter] =
    useState("الكل");

  const [trainingFilter, setTrainingFilter] =
    useState("الكل");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  /* =========================================================
     OPTIONS
  ========================================================= */

  const colleges = useMemo(
    () => [
      ...new Set(
        studentsData.map(
          (student) => student.college
        )
      ),
    ],
    []
  );

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const total =
      studentsData.length;

    const eligible =
      studentsData.filter(
        (student) =>
          student.eligibility === "مؤهل"
      ).length;

    const training =
      studentsData.filter(
        (student) =>
          student.trainingStatus ===
          "يتدرب حاليًا"
      ).length;

    const completed =
      studentsData.filter(
        (student) =>
          student.trainingStatus ===
          "مكتمل"
      ).length;

    return [
      {
        title: "إجمالي الطلبة",
        value: total,
        description: "طلبة مرتبطون بالتدريب",
        icon: Users,
        bg: "bg-[#EEF3FF]",
        color: "text-[#09379A]",
      },

      {
        title: "مؤهلون للتدريب",
        value: eligible,
        description: "استوفوا المتطلبات الأكاديمية",
        icon: UserCheck,
        bg: "bg-[#ECFDF3]",
        color: "text-[#15803D]",
      },

      {
        title: "يتدربون حاليًا",
        value: training,
        description: "لديهم تدريب نشط",
        icon: GraduationCap,
        bg: "bg-[#FFF7ED]",
        color: "text-[#C2410C]",
      },

      {
        title: "أكملوا التدريب",
        value: completed,
        description: "تم إنهاء متطلبات التدريب",
        icon: CheckCircle2,
        bg: "bg-[#F3E8FF]",
        color: "text-[#7E22CE]",
      },
    ];
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return studentsData.filter(
      (student) => {
        const matchesSearch =
          !query ||
          student.name
            .toLowerCase()
            .includes(query) ||
          student.studentId
            .toLowerCase()
            .includes(query) ||
          student.major
            .toLowerCase()
            .includes(query);

        const matchesCollege =
          collegeFilter === "الكل" ||
          student.college ===
            collegeFilter;

        const matchesEligibility =
          eligibilityFilter === "الكل" ||
          student.eligibility ===
            eligibilityFilter;

        const matchesTraining =
          trainingFilter === "الكل" ||
          student.trainingStatus ===
            trainingFilter;

        return (
          matchesSearch &&
          matchesCollege &&
          matchesEligibility &&
          matchesTraining
        );
      }
    );
  }, [
    searchTerm,
    collegeFilter,
    eligibilityFilter,
    trainingFilter,
  ]);

  /* =========================================================
     DETAILS
  ========================================================= */

  const openDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
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
              <span>
                الرئيسية
              </span>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span>
                إدارة الطلبة
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
                الطلبة
              </span>
            </div>

            {/* =================================================
                HEADER
            ================================================== */}

            <section className="mt-[5px]">
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
                الطلبة
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
                متابعة ملفات طلبة التدريب
                وحالتهم الأكاديمية والأهلية
                والتوزيع والتقدم في الساعات
                التدريبية.
              </p>
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
                          {item.description}
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
                        <Icon size={20} />
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

                      focus-within:border-[#09379A]
                      focus-within:ring-2
                      focus-within:ring-[#09379A]/10
                    "
                  >
                    <Search
                      size={16}
                      className="text-[#94A3B8]"
                    />

                    <input
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      placeholder="الاسم، الرقم الجامعي أو التخصص..."
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
                  label="الكلية"
                  value={collegeFilter}
                  onChange={setCollegeFilter}
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

                <FilterSelect
                  label="الأهلية"
                  value={eligibilityFilter}
                  onChange={
                    setEligibilityFilter
                  }
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="مؤهل">
                    مؤهل
                  </option>

                  <option value="غير مؤهل">
                    غير مؤهل
                  </option>

                  <option value="يحتاج مراجعة">
                    يحتاج مراجعة
                  </option>

                  <option value="مكتمل التدريب">
                    مكتمل التدريب
                  </option>
                </FilterSelect>

                <FilterSelect
                  label="حالة التدريب"
                  value={trainingFilter}
                  onChange={setTrainingFilter}
                >
                  <option value="الكل">
                    كل الحالات
                  </option>

                  <option value="يتدرب حاليًا">
                    يتدرب حاليًا
                  </option>

                  <option value="بانتظار البدء">
                    بانتظار البدء
                  </option>

                  <option value="لم يبدأ">
                    لم يبدأ
                  </option>

                  <option value="مكتمل">
                    مكتمل
                  </option>

                  <option value="غير متاح">
                    غير متاح
                  </option>
                </FilterSelect>
              </div>
            </section>

            {/* =================================================
                STUDENTS TABLE
            ================================================== */}

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
                    قائمة الطلبة
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    عرض حالة الطالب الأكاديمية
                    والتدريبية
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
                  {filteredStudents.length} طالب
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
                        الطالب
                      </TableHead>

                      <TableHead>
                        التخصص
                      </TableHead>

                      <TableHead>
                        الأهلية
                      </TableHead>

                      <TableHead>
                        حالة التدريب
                      </TableHead>

                      <TableHead>
                        الساعات
                      </TableHead>

                      <TableHead>
                        جهة التدريب
                      </TableHead>

                      <TableHead>
                        الإجراء
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map(
                      (student) => {
                        const percentage =
                          student.requiredHours > 0
                            ? Math.round(
                                (student.completedHours /
                                  student.requiredHours) *
                                  100
                              )
                            : 0;

                        return (
                          <tr
                            key={student.id}
                            className="
                              border-t
                              border-[#EEF2F7]

                              hover:bg-[#FBFCFE]
                            "
                          >
                            <TableCell>
                              <div className="min-w-[150px]">
                                <p
                                  className="
                                    m-0

                                    text-[10px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {student.name}
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {student.studentId}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[145px]">
                                <p
                                  className="
                                    m-0

                                    text-[9px]
                                    font-medium
                                    text-[#475569]
                                  "
                                >
                                  {student.major}
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block

                                    max-w-[180px]

                                    text-[8px]
                                    leading-[15px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {student.college}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <EligibilityBadge
                                status={
                                  student.eligibility
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <TrainingBadge
                                status={
                                  student.trainingStatus
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <div className="min-w-[110px]">
                                <div
                                  className="
                                    mb-[5px]

                                    flex
                                    items-center
                                    justify-between

                                    text-[8px]
                                  "
                                >
                                  <span className="text-[#64748B]">
                                    {
                                      student.completedHours
                                    }
                                    /
                                    {
                                      student.requiredHours
                                    }
                                  </span>

                                  <strong className="text-[#09379A]">
                                    {percentage}%
                                  </strong>
                                </div>

                                <div
                                  className="
                                    h-[5px]
                                    overflow-hidden
                                    rounded-full
                                    bg-[#E2E8F0]
                                  "
                                >
                                  <div
                                    className="
                                      h-full
                                      rounded-full
                                      bg-[#09379A]
                                    "
                                    style={{
                                      width: `${Math.min(
                                        percentage,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className="
                                  max-w-[170px]

                                  text-[9px]
                                  leading-[17px]
                                  text-[#475569]
                                "
                              >
                                {student.organization}
                              </span>
                            </TableCell>

                            <TableCell>
                              <button
                                type="button"
                                onClick={() =>
                                  openDetails(student)
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
                        );
                      }
                    )}
                  </tbody>
                </table>

                {filteredStudents.length ===
                  0 && <EmptyState />}
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
                {filteredStudents.length >
                0 ? (
                  filteredStudents.map(
                    (student) => {
                      const percentage =
                        student.requiredHours > 0
                          ? Math.round(
                              (student.completedHours /
                                student.requiredHours) *
                                100
                            )
                          : 0;

                      return (
                        <article
                          key={student.id}
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
                                {student.name}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block

                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {student.studentId}
                                {" · "}
                                {student.major}
                              </span>
                            </div>

                            <EligibilityBadge
                              status={
                                student.eligibility
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
                              label="حالة التدريب"
                              value={
                                student.trainingStatus
                              }
                            />

                            <MobileInfo
                              label="جهة التدريب"
                              value={
                                student.organization
                              }
                            />

                            <MobileInfo
                              label="الساعات"
                              value={`${student.completedHours}/${student.requiredHours}`}
                            />

                            <MobileInfo
                              label="نسبة الإنجاز"
                              value={`${percentage}%`}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openDetails(student)
                            }
                            className="
                              mt-[11px]

                              flex
                              h-[35px]
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
                            <Eye size={14} />
                            عرض ملف الطالب
                          </button>
                        </article>
                      );
                    }
                  )
                ) : (
                  <EmptyState />
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
        selectedStudent && (
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

                shadow-[-18px_0_50px_rgba(15,23,42,0.14)]
              "
            >
              {/* HEADER */}

              <div
                className="
                  flex
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
                    ملف الطالب
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]

                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {selectedStudent.studentId}
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
                {/* STUDENT */}

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
                      items-center
                      gap-[11px]
                    "
                  >
                    <div
                      className="
                        flex
                        h-[46px]
                        w-[46px]
                        shrink-0
                        items-center
                        justify-center

                        rounded-[12px]

                        bg-[#EEF3FF]

                        text-[#09379A]
                      "
                    >
                      <GraduationCap
                        size={22}
                      />
                    </div>

                    <div>
                      <h3
                        className="
                          m-0

                          text-[15px]
                          font-bold
                          text-[#334155]
                        "
                      >
                        {selectedStudent.name}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-[2px]

                          text-[9px]
                          text-[#94A3B8]
                        "
                      >
                        {selectedStudent.major}
                      </p>
                    </div>
                  </div>

                  <EligibilityBadge
                    status={
                      selectedStudent.eligibility
                    }
                  />
                </div>

                {/* BASIC */}

                <SectionTitle>
                  البيانات الأكاديمية
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="الكلية"
                    value={
                      selectedStudent.college
                    }
                  />

                  <InfoBox
                    label="التخصص"
                    value={
                      selectedStudent.major
                    }
                  />

                  <InfoBox
                    label="الساعات الأكاديمية"
                    value={`${selectedStudent.academicHours} ساعة`}
                  />

                  <InfoBox
                    label="المعدل التراكمي"
                    value={
                      selectedStudent.gpa
                    }
                  />
                </div>

                {/* REQUIREMENT */}

                <SectionTitle>
                  متطلبات التدريب
                </SectionTitle>

                {trainingRequirements[
                  selectedStudent.major
                ] ? (
                  <div
                    className="
                      rounded-[11px]

                      border
                      border-[#D7E5FF]

                      bg-[#F6F9FF]

                      p-[13px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-[9px]
                      "
                    >
                      <BookOpenCheck
                        size={18}
                        className="
                          mt-[2px]
                          shrink-0
                          text-[#09379A]
                        "
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            m-0

                            text-[10px]
                            font-bold
                            text-[#334155]
                          "
                        >
                          {
                            trainingRequirements[
                              selectedStudent
                                .major
                            ].trainingCourse
                          }
                        </p>

                        <p
                          className="
                            m-0
                            mt-[2px]

                            text-[8px]
                            text-[#64748B]
                          "
                        >
                          {
                            trainingRequirements[
                              selectedStudent
                                .major
                            ].courseCode
                          }
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        mt-[11px]

                        grid
                        grid-cols-3
                        gap-[7px]
                      "
                    >
                      <RequirementValue
                        label="ساعات أكاديمية"
                        value={
                          trainingRequirements[
                            selectedStudent
                              .major
                          ]
                            .minimumAcademicHours
                        }
                      />

                      <RequirementValue
                        label="ساعات تدريب"
                        value={
                          trainingRequirements[
                            selectedStudent
                              .major
                          ]
                            .requiredTrainingHours
                        }
                      />

                      <RequirementValue
                        label="أدنى معدل"
                        value={
                          trainingRequirements[
                            selectedStudent
                              .major
                          ].minimumGpa
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <EmptyBox
                    text="لا توجد متطلبات تدريب معرفة لهذا التخصص."
                  />
                )}

                {/* ELIGIBILITY */}

                <SectionTitle>
                  حالة الأهلية
                </SectionTitle>

                <div
                  className="
                    rounded-[11px]

                    border
                    border-[#E2E8F0]

                    bg-[#FAFBFC]

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

                          text-[9px]
                          font-bold
                          text-[#475569]
                        "
                      >
                        نتيجة التحقق
                      </p>

                      <p
                        className="
                          m-0
                          mt-[3px]

                          text-[8px]
                          text-[#94A3B8]
                        "
                      >
                        وفق متطلبات التخصص
                      </p>
                    </div>

                    <EligibilityBadge
                      status={
                        selectedStudent.eligibility
                      }
                    />
                  </div>

                  {selectedStudent.eligibility ===
                    "غير مؤهل" && (
                    <div
                      className="
                        mt-[11px]

                        flex
                        items-start
                        gap-[7px]

                        rounded-[8px]

                        bg-[#FFF1F2]

                        px-[10px]
                        py-[9px]
                      "
                    >
                      <AlertTriangle
                        size={14}
                        className="
                          mt-[1px]
                          shrink-0
                          text-[#BE123C]
                        "
                      />

                      <p
                        className="
                          m-0

                          text-[8px]
                          leading-[17px]
                          text-[#9F1239]
                        "
                      >
                        الطالب لا يستوفي
                        حاليًا جميع متطلبات
                        تخصصه للتدريب.
                      </p>
                    </div>
                  )}
                </div>

                {/* TRAINING */}

                <SectionTitle>
                  التدريب الحالي
                </SectionTitle>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3

                    rounded-[11px]

                    border
                    border-[#E7ECF2]

                    bg-[#FAFBFC]

                    p-[12px]
                  "
                >
                  <div>
                    <p
                      className="
                        m-0

                        text-[9px]
                        font-bold
                        text-[#334155]
                      "
                    >
                      حالة التدريب
                    </p>

                    <p
                      className="
                        m-0
                        mt-[3px]

                        text-[8px]
                        text-[#94A3B8]
                      "
                    >
                      حالة الملف الحالية
                    </p>
                  </div>

                  <TrainingBadge
                    status={
                      selectedStudent.trainingStatus
                    }
                  />
                </div>

                <div
                  className="
                    mt-[8px]

                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="جهة التدريب"
                    value={
                      selectedStudent.organization
                    }
                  />

                  <InfoBox
                    label="الفرصة"
                    value={
                      selectedStudent.opportunity
                    }
                  />

                  <InfoBox
                    label="المشرف الأكاديمي"
                    value={
                      selectedStudent.academicSupervisor
                    }
                  />

                  <InfoBox
                    label="مشرف الجهة"
                    value={
                      selectedStudent.fieldSupervisor
                    }
                  />
                </div>

                {/* HOURS */}

                <SectionTitle>
                  الساعات التدريبية
                </SectionTitle>

                <TrainingProgress
                  completed={
                    selectedStudent.completedHours
                  }
                  required={
                    selectedStudent.requiredHours
                  }
                />

                {/* CONTACT */}

                <SectionTitle>
                  بيانات التواصل
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-[8px]
                  "
                >
                  <InfoBox
                    label="رقم الجوال"
                    value={
                      selectedStudent.phone
                    }
                  />

                  <InfoBox
                    label="البريد الإلكتروني"
                    value={
                      selectedStudent.email
                    }
                  />
                </div>
              </div>
            </aside>
          </>
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

function EligibilityBadge({
  status,
}) {
  const styles = {
    مؤهل:
      "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",

    "غير مؤهل":
      "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",

    "يحتاج مراجعة":
      "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",

    "مكتمل التدريب":
      "bg-[#EEF3FF] text-[#09379A] border-[#D7E5FF]",
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

function TrainingBadge({
  status,
}) {
  const styles = {
    "يتدرب حاليًا":
      "bg-[#EEF3FF] text-[#09379A]",

    "بانتظار البدء":
      "bg-[#FFF7ED] text-[#C2410C]",

    "لم يبدأ":
      "bg-[#F1F5F9] text-[#64748B]",

    مكتمل:
      "bg-[#ECFDF3] text-[#15803D]",

    "غير متاح":
      "bg-[#FFF1F2] text-[#BE123C]",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[23px]
        items-center

        whitespace-nowrap

        rounded-full

        px-[8px]

        text-[8px]
        font-bold

        ${
          styles[status] ||
          "bg-[#F8FAFC] text-[#64748B]"
        }
      `}
    >
      {status}
    </span>
  );
}

function TrainingProgress({
  completed,
  required,
}) {
  const percentage =
    required > 0
      ? Math.round(
          (completed / required) *
            100
        )
      : 0;

  return (
    <div
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
          items-end
          justify-between
          gap-3
        "
      >
        <div>
          <span
            className="
              text-[8px]
              text-[#94A3B8]
            "
          >
            الساعات المنجزة
          </span>

          <p
            className="
              m-0
              mt-[2px]

              text-[15px]
              font-bold
              text-[#334155]
            "
          >
            {completed}
            <span
              className="
                mr-[3px]

                text-[9px]
                font-medium
                text-[#94A3B8]
              "
            >
              / {required} ساعة
            </span>
          </p>
        </div>

        <strong
          className="
            text-[12px]
            text-[#09379A]
          "
        >
          {percentage}%
        </strong>
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
          className="
            h-full
            rounded-full
            bg-[#09379A]
          "
          style={{
            width: `${Math.min(
              percentage,
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function RequirementValue({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[8px]

        bg-white

        px-[8px]
        py-[8px]

        text-center
      "
    >
      <strong
        className="
          block

          text-[12px]
          text-[#09379A]
        "
      >
        {value}
      </strong>

      <span
        className="
          mt-[2px]
          block

          text-[7px]
          text-[#94A3B8]
        "
      >
        {label}
      </span>
    </div>
  );
}

function Label({ children }) {
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
          onChange(event.target.value)
        }
        className={inputStyle}
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

          break-words

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

function EmptyBox({
  text,
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-dashed
        border-[#D9E2EC]

        px-[12px]
        py-[20px]

        text-center

        text-[9px]
        text-[#94A3B8]
      "
    >
      {text}
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
      <Users
        size={26}
        className="text-[#94A3B8]"
      />

      <h3
        className="
          m-0
          mt-[9px]

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

          text-[9px]
          text-[#94A3B8]
        "
      >
        لا يوجد طلبة مطابقون للفلاتر الحالية.
      </p>
    </div>
  );
}