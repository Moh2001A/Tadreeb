import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  GraduationCap,
  LockKeyhole,
  Save,
  Shield,
  ShieldCheck,
  UserRoundCog,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Permissions() {
  const navigate = useNavigate();

  /* =========================================================
     ROLES
  ========================================================= */

  const roles = [
    {
      id: "admin",

      name: "مدير النظام",

      description:
        "صلاحيات كاملة لإدارة النظام والعمليات والمستخدمين.",

      users: 2,

      icon: ShieldCheck,

      color:
        "bg-[#EEF3FF] text-[#09379A]",

      locked: true,
    },

    {
      id: "coordinator",

      name: "منسق التدريب",

      description:
        "إدارة طلبة الكلية والتدريب والتوزيع والموافقات.",

      users: 6,

      icon: UserRoundCog,

      color:
        "bg-[#F3E8FF] text-[#7E22CE]",

      locked: false,
    },

    {
      id: "academic-supervisor",

      name: "مشرف أكاديمي",

      description:
        "متابعة الطلبة والزيارات والسجلات والتقييم الأكاديمي.",

      users: 18,

      icon: GraduationCap,

      color:
        "bg-[#ECFDF3] text-[#15803D]",

      locked: false,
    },

    {
      id: "field-supervisor",

      name: "مشرف ميداني",

      description:
        "متابعة حضور الطالب وتقييم أدائه داخل جهة التدريب.",

      users: 24,

      icon: Users,

      color:
        "bg-[#FFF7E6] text-[#C65D00]",

      locked: false,
    },
  ];

  /* =========================================================
     PERMISSION GROUPS
  ========================================================= */

  const permissionGroups = [
    {
      id: "dashboard",

      title: "لوحة التحكم",

      description:
        "الوصول للوحة الرئيسية والإحصائيات.",

      permissions: [
        {
          id: "dashboard.view",
          label: "عرض لوحة التحكم",
        },

        {
          id: "dashboard.tasks",
          label: "عرض المهام المعلقة",
        },
      ],
    },

    {
      id: "academic",

      title: "الإعداد الأكاديمي",

      description:
        "الكليات والتخصصات وفترات ومتطلبات التدريب.",

      permissions: [
        {
          id: "academic.view",
          label: "عرض الإعداد الأكاديمي",
        },

        {
          id: "academic.manage",
          label: "إضافة وتعديل الإعدادات الأكاديمية",
        },

        {
          id: "periods.manage",
          label: "إدارة فترات التدريب",
        },

        {
          id: "requirements.manage",
          label: "إدارة متطلبات التدريب",
        },
      ],
    },

    {
      id: "students",

      title: "الطلبة والأهلية",

      description:
        "بيانات الطلبة وفحص أهلية التدريب.",

      permissions: [
        {
          id: "students.view",
          label: "عرض الطلبة",
        },

        {
          id: "eligibility.view",
          label: "عرض الأهلية",
        },

        {
          id: "eligibility.override",
          label: "تعديل قرار الأهلية يدويًا",
        },
      ],
    },

    {
      id: "requests",

      title: "طلبات التدريب",

      description:
        "مراجعة طلبات التدريب واتخاذ القرارات.",

      permissions: [
        {
          id: "requests.view",
          label: "عرض الطلبات",
        },

        {
          id: "requests.review",
          label: "مراجعة الطلبات",
        },

        {
          id: "requests.decision",
          label: "قبول أو رفض الطلبات",
        },
      ],
    },

    {
      id: "organizations",

      title: "جهات وفرص التدريب",

      description:
        "إدارة الجهات والفرص التدريبية.",

      permissions: [
        {
          id: "organizations.view",
          label: "عرض جهات التدريب",
        },

        {
          id: "organizations.manage",
          label: "إضافة وتعديل الجهات",
        },

        {
          id: "opportunities.view",
          label: "عرض فرص التدريب",
        },

        {
          id: "opportunities.manage",
          label: "إضافة وتعديل الفرص",
        },
      ],
    },

    {
      id: "distribution",

      title: "التوزيع والموافقات",

      description:
        "توزيع الطلبة واعتماد قرارات التدريب.",

      permissions: [
        {
          id: "distribution.view",
          label: "عرض توزيع الطلبة",
        },

        {
          id: "distribution.manage",
          label: "توزيع وتعديل توزيع الطلبة",
        },

        {
          id: "approvals.view",
          label: "عرض الموافقات",
        },

        {
          id: "approvals.decision",
          label: "اعتماد أو إعادة أو رفض الطلب",
        },
      ],
    },

    {
      id: "monitoring",

      title: "المتابعة الميدانية",

      description:
        "الزيارات والحضور والمتابعة أثناء التدريب.",

      permissions: [
        {
          id: "visits.view",
          label: "عرض الزيارات",
        },

        {
          id: "visits.manage",
          label: "جدولة وتسجيل الزيارات",
        },

        {
          id: "attendance.view",
          label: "عرض الحضور والساعات",
        },

        {
          id: "attendance.manage",
          label: "تأكيد الحضور والساعات",
        },
      ],
    },

    {
      id: "evaluations",

      title: "التقييم والإتمام",

      description:
        "التقييم النهائي والتقرير والإتمام.",

      permissions: [
        {
          id: "evaluations.view",
          label: "عرض التقييمات",
        },

        {
          id: "evaluations.manage",
          label: "إدخال واعتماد التقييم",
        },

        {
          id: "finalReports.view",
          label: "عرض التقارير النهائية",
        },

        {
          id: "finalReports.approve",
          label: "اعتماد الإتمام النهائي",
        },
      ],
    },

    {
      id: "courses",

      title: "الدورات التدريبية",

      description:
        "إدارة الدورات والمتدربين والمدربين والتقييمات.",

      permissions: [
        {
          id: "courses.view",
          label: "عرض الدورات",
        },

        {
          id: "courses.manage",
          label: "إضافة وتعديل الدورات",
        },

        {
          id: "courseRegistrations.manage",
          label: "إدارة طلبات التسجيل",
        },

        {
          id: "courseAttendance.manage",
          label: "إدارة حضور الدورات",
        },

        {
          id: "courseEvaluations.manage",
          label: "إدارة تقييمات الدورات",
        },

        {
          id: "courseCertificates.issue",
          label: "إصدار شهادات الدورات",
        },
      ],
    },

    {
      id: "reports",

      title: "التقارير والشهادات",

      description:
        "التقارير والإحصائيات والشهادات.",

      permissions: [
        {
          id: "reports.view",
          label: "عرض التقارير والإحصائيات",
        },

        {
          id: "reports.export",
          label: "تصدير التقارير",
        },

        {
          id: "certificates.view",
          label: "عرض الشهادات",
        },

        {
          id: "certificates.issue",
          label: "إصدار واعتماد الشهادات",
        },
      ],
    },

    {
      id: "general",

      title: "الإدارة العامة",

      description:
        "المستخدمون والملفات والبحث والإعلانات.",

      permissions: [
        {
          id: "files.view",
          label: "عرض الملفات والأرشيف",
        },

        {
          id: "files.manage",
          label: "رفع وأرشفة وحذف الملفات",
        },

        {
          id: "search.use",
          label: "استخدام البحث المتقدم",
        },

        {
          id: "announcements.manage",
          label: "إدارة الإعلانات والإشعارات",
        },

        {
          id: "users.view",
          label: "عرض المستخدمين",
        },

        {
          id: "users.manage",
          label: "إضافة وتعديل المستخدمين",
        },

        {
          id: "permissions.manage",
          label: "إدارة الأدوار والصلاحيات",
        },
      ],
    },
  ];

  /* =========================================================
     DEFAULT PERMISSIONS
  ========================================================= */

  const allPermissions =
    permissionGroups.flatMap((group) =>
      group.permissions.map(
        (permission) => permission.id
      )
    );

  const [
    permissionsByRole,
    setPermissionsByRole,
  ] = useState({
    admin: allPermissions,

    coordinator: [
      "dashboard.view",
      "dashboard.tasks",

      "academic.view",

      "students.view",
      "eligibility.view",
      "eligibility.override",

      "requests.view",
      "requests.review",
      "requests.decision",

      "organizations.view",
      "organizations.manage",

      "opportunities.view",
      "opportunities.manage",

      "distribution.view",
      "distribution.manage",

      "approvals.view",
      "approvals.decision",

      "visits.view",
      "visits.manage",

      "attendance.view",

      "evaluations.view",
      "finalReports.view",

      "courses.view",
      "courseRegistrations.manage",

      "reports.view",
      "reports.export",

      "certificates.view",

      "files.view",
      "search.use",
      "announcements.manage",
    ],

    "academic-supervisor": [
      "dashboard.view",

      "students.view",

      "requests.view",

      "organizations.view",
      "opportunities.view",

      "distribution.view",

      "visits.view",
      "visits.manage",

      "attendance.view",

      "evaluations.view",
      "evaluations.manage",

      "finalReports.view",

      "reports.view",

      "files.view",
      "search.use",
    ],

    "field-supervisor": [
      "dashboard.view",

      "students.view",

      "attendance.view",
      "attendance.manage",

      "evaluations.view",
      "evaluations.manage",

      "files.view",
    ],
  });

  /* =========================================================
     STATE
  ========================================================= */

  const [activeRole, setActiveRole] =
    useState("admin");

  const [search, setSearch] =
    useState("");

  const [saved, setSaved] =
    useState(true);

  const [showConfirmReset, setShowConfirmReset] =
    useState(false);

  /* =========================================================
     CURRENT ROLE
  ========================================================= */

  const selectedRole =
    roles.find(
      (role) =>
        role.id === activeRole
    ) || roles[0];

  const selectedPermissions =
    permissionsByRole[activeRole] || [];

  /* =========================================================
     FILTER PERMISSIONS
  ========================================================= */

  const filteredGroups = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return permissionGroups;
    }

    return permissionGroups
      .map((group) => {
        const filteredPermissions =
          group.permissions.filter(
            (permission) =>
              permission.label
                .toLowerCase()
                .includes(query) ||
              group.title
                .toLowerCase()
                .includes(query)
          );

        return {
          ...group,
          permissions:
            filteredPermissions,
        };
      })
      .filter(
        (group) =>
          group.permissions.length > 0
      );
  }, [search]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const roleStats = useMemo(() => {
    const total =
      allPermissions.length;

    const enabled =
      selectedPermissions.length;

    const percentage =
      total === 0
        ? 0
        : Math.round(
            (enabled / total) * 100
          );

    return {
      total,
      enabled,
      disabled: total - enabled,
      percentage,
    };
  }, [
    selectedPermissions,
    allPermissions.length,
  ]);

  /* =========================================================
     TOGGLE PERMISSION
  ========================================================= */

  const togglePermission = (
    permissionId
  ) => {
    if (selectedRole.locked) {
      return;
    }

    setPermissionsByRole(
      (previous) => {
        const current =
          previous[activeRole] || [];

        const exists =
          current.includes(
            permissionId
          );

        return {
          ...previous,

          [activeRole]: exists
            ? current.filter(
                (item) =>
                  item !==
                  permissionId
              )
            : [
                ...current,
                permissionId,
              ],
        };
      }
    );

    setSaved(false);
  };

  /* =========================================================
     GROUP TOGGLE
  ========================================================= */

  const toggleGroup = (group) => {
    if (selectedRole.locked) {
      return;
    }

    const groupPermissionIds =
      group.permissions.map(
        (permission) =>
          permission.id
      );

    const allEnabled =
      groupPermissionIds.every(
        (permissionId) =>
          selectedPermissions.includes(
            permissionId
          )
      );

    setPermissionsByRole(
      (previous) => {
        const current =
          previous[activeRole] || [];

        if (allEnabled) {
          return {
            ...previous,

            [activeRole]:
              current.filter(
                (permissionId) =>
                  !groupPermissionIds.includes(
                    permissionId
                  )
              ),
          };
        }

        return {
          ...previous,

          [activeRole]: Array.from(
            new Set([
              ...current,
              ...groupPermissionIds,
            ])
          ),
        };
      }
    );

    setSaved(false);
  };

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const enableAll = () => {
    if (selectedRole.locked) {
      return;
    }

    setPermissionsByRole(
      (previous) => ({
        ...previous,

        [activeRole]:
          allPermissions,
      })
    );

    setSaved(false);
  };

  const disableAll = () => {
    if (selectedRole.locked) {
      return;
    }

    setPermissionsByRole(
      (previous) => ({
        ...previous,

        [activeRole]: [],
      })
    );

    setSaved(false);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = () => {
    setSaved(true);
  };

  /* =========================================================
     RESET ROLE
  ========================================================= */

  const resetCurrentRole = () => {
    if (
      selectedRole.locked
    ) {
      return;
    }

    const defaults = {
      coordinator: [
        "dashboard.view",
        "dashboard.tasks",

        "academic.view",

        "students.view",
        "eligibility.view",
        "eligibility.override",

        "requests.view",
        "requests.review",
        "requests.decision",

        "organizations.view",
        "organizations.manage",

        "opportunities.view",
        "opportunities.manage",

        "distribution.view",
        "distribution.manage",

        "approvals.view",
        "approvals.decision",

        "visits.view",
        "visits.manage",

        "attendance.view",

        "evaluations.view",
        "finalReports.view",

        "courses.view",
        "courseRegistrations.manage",

        "reports.view",
        "reports.export",

        "certificates.view",

        "files.view",
        "search.use",
        "announcements.manage",
      ],

      "academic-supervisor": [
        "dashboard.view",

        "students.view",

        "requests.view",

        "organizations.view",
        "opportunities.view",

        "distribution.view",

        "visits.view",
        "visits.manage",

        "attendance.view",

        "evaluations.view",
        "evaluations.manage",

        "finalReports.view",

        "reports.view",

        "files.view",
        "search.use",
      ],

      "field-supervisor": [
        "dashboard.view",

        "students.view",

        "attendance.view",
        "attendance.manage",

        "evaluations.view",
        "evaluations.manage",

        "files.view",
      ],
    };

    setPermissionsByRole(
      (previous) => ({
        ...previous,

        [activeRole]:
          defaults[activeRole] || [],
      })
    );

    setSaved(false);
    setShowConfirmReset(false);
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
                  <span>
                    الرئيسية
                  </span>

                  <span>/</span>

                  <span>
                    الإدارة العامة
                  </span>

                  <span>/</span>

                  <span className="text-[#64748B]">
                    الأدوار والصلاحيات
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
                  الأدوار والصلاحيات
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
                  تحديد الصفحات
                  والعمليات التي يمكن لكل
                  نوع من مستخدمي النظام
                  الوصول إليها وتنفيذها.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-[7px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/admin/users"
                    )
                  }
                  className="
                    flex
                    h-[40px]
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
                    transition

                    hover:bg-[#F8FAFC]
                  "
                >
                  <ArrowRight
                    size={15}
                  />

                  المستخدمون
                </button>

                <button
                  type="button"
                  onClick={
                    handleSave
                  }
                  disabled={saved}
                  className={`
                    flex
                    h-[40px]
                    items-center
                    gap-[6px]
                    rounded-[9px]
                    border-0
                    px-[14px]
                    text-[9px]
                    font-bold
                    transition

                    ${
                      saved
                        ? `
                            cursor-default
                            bg-[#E2E8F0]
                            text-[#94A3B8]
                          `
                        : `
                            bg-[#09379A]
                            text-white
                            hover:bg-[#072E81]
                          `
                    }
                  `}
                >
                  {saved ? (
                    <CheckCircle2
                      size={15}
                    />
                  ) : (
                    <Save
                      size={15}
                    />
                  )}

                  {saved
                    ? "تم حفظ الصلاحيات"
                    : "حفظ التغييرات"}
                </button>
              </div>
            </div>

            {/* =================================================
                ROLE CARDS
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
              {roles.map((role) => {
                const Icon =
                  role.icon;

                const active =
                  role.id ===
                  activeRole;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setActiveRole(
                        role.id
                      );

                      setSearch("");
                    }}
                    className={`
                      rounded-[13px]
                      border
                      p-[14px]
                      text-right
                      transition-all
                      duration-200

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
                        className={`
                          flex
                          h-[38px]
                          w-[38px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[9px]

                          ${role.color}
                        `}
                      >
                        <Icon
                          size={18}
                          strokeWidth={
                            1.8
                          }
                        />
                      </div>

                      {role.locked && (
                        <div
                          className="
                            flex
                            h-[25px]
                            items-center
                            gap-[4px]
                            rounded-full
                            bg-[#F1F5F9]
                            px-[8px]
                            text-[8px]
                            font-bold
                            text-[#64748B]
                          "
                        >
                          <LockKeyhole
                            size={11}
                          />

                          ثابت
                        </div>
                      )}
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
                      {role.name}
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[3px]
                        min-h-[34px]
                        text-[8px]
                        leading-[17px]
                        text-[#94A3B8]
                      "
                    >
                      {
                        role.description
                      }
                    </p>

                    <div
                      className="
                        mt-[10px]
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#EEF2F7]
                        pt-[9px]
                      "
                    >
                      <span
                        className="
                          text-[8px]
                          font-medium
                          text-[#64748B]
                        "
                      >
                        {role.users} مستخدم
                      </span>

                      {active && (
                        <span
                          className="
                            flex
                            items-center
                            gap-[3px]
                            text-[8px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          <Check
                            size={11}
                          />

                          محدد
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </section>

            {/* =================================================
                ROLE OVERVIEW
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

                sm:p-[18px]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4

                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-[11px]
                  "
                >
                  <div
                    className={`
                      flex
                      h-[42px]
                      w-[42px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[10px]

                      ${
                        selectedRole.color
                      }
                    `}
                  >
                    <selectedRole.icon
                      size={20}
                    />
                  </div>

                  <div>
                    <div
                      className="
                        flex
                        items-center
                        gap-[7px]
                      "
                    >
                      <h2
                        className="
                          m-0
                          text-[15px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        {
                          selectedRole.name
                        }
                      </h2>

                      {selectedRole.locked && (
                        <span
                          className="
                            rounded-full
                            bg-[#F1F5F9]
                            px-[7px]
                            py-[3px]
                            text-[7px]
                            font-bold
                            text-[#64748B]
                          "
                        >
                          صلاحيات كاملة
                        </span>
                      )}
                    </div>

                    <p
                      className="
                        m-0
                        mt-[3px]
                        text-[9px]
                        leading-[17px]
                        text-[#94A3B8]
                      "
                    >
                      {
                        selectedRole.description
                      }
                    </p>
                  </div>
                </div>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-[8px]
                  "
                >
                  <MiniStat
                    label="مفعّلة"
                    value={
                      roleStats.enabled
                    }
                    className="text-[#15803D]"
                  />

                  <MiniStat
                    label="معطلة"
                    value={
                      roleStats.disabled
                    }
                    className="text-[#BE123C]"
                  />

                  <MiniStat
                    label="النسبة"
                    value={`${roleStats.percentage}%`}
                    className="text-[#09379A]"
                  />
                </div>
              </div>

              <div
                className="
                  mt-[14px]
                  h-[7px]
                  overflow-hidden
                  rounded-full
                  bg-[#EEF2F7]
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#09379A]
                    transition-all
                    duration-300
                  "
                  style={{
                    width: `${roleStats.percentage}%`,
                  }}
                />
              </div>
            </section>

            {/* =================================================
                TOOLBAR
            ================================================== */}

            <section
              className="
                mt-[16px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[14px]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3

                  md:flex-row
                  md:items-end
                  md:justify-between
                "
              >
                <div className="w-full max-w-[430px]">
                  <label
                    className="
                      mb-[5px]
                      block
                      text-[9px]
                      font-bold
                      text-[#64748B]
                    "
                  >
                    البحث في الصلاحيات
                  </label>

                  <div
                    className="
                      flex
                      h-[39px]
                      items-center
                      gap-[8px]
                      rounded-[9px]
                      border
                      border-[#DCE5F0]
                      bg-white
                      px-[10px]
                    "
                  >
                    <Eye
                      size={14}
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
                      placeholder="ابحث باسم الصفحة أو العملية..."
                      className="
                        h-full
                        min-w-0
                        flex-1
                        border-0
                        bg-transparent
                        text-[9px]
                        text-[#334155]
                        outline-none
                        placeholder:text-[#94A3B8]
                      "
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearch("")
                        }
                        className="
                          flex
                          h-[26px]
                          w-[26px]
                          items-center
                          justify-center
                          rounded-[6px]
                          border-0
                          bg-[#F1F5F9]
                          text-[#64748B]
                        "
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {!selectedRole.locked && (
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
                        enableAll
                      }
                      className="
                        h-[35px]
                        rounded-[8px]
                        border
                        border-[#BBF7D0]
                        bg-[#ECFDF3]
                        px-[11px]
                        text-[8px]
                        font-bold
                        text-[#15803D]
                      "
                    >
                      تفعيل الكل
                    </button>

                    <button
                      type="button"
                      onClick={
                        disableAll
                      }
                      className="
                        h-[35px]
                        rounded-[8px]
                        border
                        border-[#FECDD3]
                        bg-[#FFF1F2]
                        px-[11px]
                        text-[8px]
                        font-bold
                        text-[#BE123C]
                      "
                    >
                      تعطيل الكل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmReset(
                          true
                        )
                      }
                      className="
                        h-[35px]
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
                      الإعداد الافتراضي
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================
                PERMISSIONS
            ================================================== */}

            <section
              className="
                mt-[16px]
                grid
                grid-cols-1
                gap-[11px]

                xl:grid-cols-2
              "
            >
              {filteredGroups.map(
                (group) => {
                  const ids =
                    group.permissions.map(
                      (permission) =>
                        permission.id
                    );

                  const enabledCount =
                    ids.filter(
                      (permissionId) =>
                        selectedPermissions.includes(
                          permissionId
                        )
                    ).length;

                  const allEnabled =
                    enabledCount ===
                      ids.length &&
                    ids.length > 0;

                  return (
                    <div
                      key={group.id}
                      className="
                        overflow-hidden
                        rounded-[13px]
                        border
                        border-[#DDE5EF]
                        bg-white
                        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                          border-b
                          border-[#EEF2F7]
                          bg-[#FBFCFE]
                          px-[14px]
                          py-[12px]
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
                            {
                              group.title
                            }
                          </h3>

                          <p
                            className="
                              m-0
                              mt-[2px]
                              text-[8px]
                              leading-[16px]
                              text-[#94A3B8]
                            "
                          >
                            {
                              group.description
                            }
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={
                            selectedRole.locked
                          }
                          onClick={() =>
                            toggleGroup(
                              group
                            )
                          }
                          className={`
                            flex
                            min-h-[28px]
                            shrink-0
                            items-center
                            gap-[5px]
                            rounded-[7px]
                            border
                            px-[8px]
                            text-[7px]
                            font-bold

                            ${
                              allEnabled
                                ? `
                                    border-[#BBF7D0]
                                    bg-[#ECFDF3]
                                    text-[#15803D]
                                  `
                                : `
                                    border-[#DCE5F0]
                                    bg-white
                                    text-[#64748B]
                                  `
                            }

                            ${
                              selectedRole.locked
                                ? "cursor-default opacity-70"
                                : ""
                            }
                          `}
                        >
                          {allEnabled && (
                            <Check
                              size={10}
                            />
                          )}

                          {enabledCount}/
                          {
                            ids.length
                          }
                        </button>
                      </div>

                      <div className="p-[10px]">
                        {group.permissions.map(
                          (
                            permission
                          ) => {
                            const active =
                              selectedPermissions.includes(
                                permission.id
                              );

                            return (
                              <button
                                key={
                                  permission.id
                                }
                                type="button"
                                disabled={
                                  selectedRole.locked
                                }
                                onClick={() =>
                                  togglePermission(
                                    permission.id
                                  )
                                }
                                className="
                                  flex
                                  w-full
                                  items-center
                                  justify-between
                                  gap-3
                                  rounded-[8px]
                                  border-0
                                  bg-transparent
                                  px-[8px]
                                  py-[9px]
                                  text-right
                                  transition

                                  hover:bg-[#F8FAFC]

                                  disabled:cursor-default
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
                                    permission.label
                                  }
                                </span>

                                <PermissionSwitch
                                  active={
                                    active
                                  }
                                  disabled={
                                    selectedRole.locked
                                  }
                                />
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </section>

            {filteredGroups.length ===
              0 && (
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
                  text-center
                "
              >
                <Shield
                  size={28}
                  className="text-[#94A3B8]"
                />

                <h3
                  className="
                    m-0
                    mt-[10px]
                    text-[11px]
                    font-bold
                    text-[#334155]
                  "
                >
                  لا توجد صلاحيات
                  مطابقة
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="
                    mt-[10px]
                    h-[33px]
                    rounded-[8px]
                    border
                    border-[#D7E5FF]
                    bg-[#F6F9FF]
                    px-[12px]
                    text-[8px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  عرض جميع الصلاحيات
                </button>
              </div>
            )}

            {/* =================================================
                NOTE
            ================================================== */}

            <div
              className="
                mt-[16px]
                flex
                items-start
                gap-[9px]
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
                  h-[31px]
                  w-[31px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  bg-white
                  text-[#09379A]
                "
              >
                <LockKeyhole
                  size={14}
                />
              </div>

              <div>
                <p
                  className="
                    m-0
                    text-[9px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  ملاحظة حول الصلاحيات
                </p>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[8px]
                    leading-[17px]
                    text-[#64748B]
                  "
                >
                  صلاحيات مدير النظام
                  ثابتة وكاملة. عند ربط
                  النظام بالـBackend يجب
                  أيضًا تطبيق هذه
                  الصلاحيات على مستوى
                  الـAPI وليس إخفاء
                  عناصر الواجهة فقط.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          RESET CONFIRMATION
      ====================================================== */}

      {showConfirmReset && (
        <ConfirmModal
          roleName={
            selectedRole.name
          }
          onClose={() =>
            setShowConfirmReset(
              false
            )
          }
          onConfirm={
            resetCurrentRole
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   PERMISSION SWITCH
========================================================= */

function PermissionSwitch({
  active,
  disabled,
}) {
  return (
    <span
      className={`
        relative
        block
        h-[22px]
        w-[40px]
        shrink-0
        rounded-full
        transition-all
        duration-200

        ${
          active
            ? "bg-[#09379A]"
            : "bg-[#CBD5E1]"
        }

        ${
          disabled
            ? "opacity-80"
            : ""
        }
      `}
    >
      <span
        className={`
          absolute
          top-[3px]
          h-[16px]
          w-[16px]
          rounded-full
          bg-white
          shadow-sm
          transition-all
          duration-200

          ${
            active
              ? "right-[21px]"
              : "right-[3px]"
          }
        `}
      />
    </span>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  className,
}) {
  return (
    <div
      className="
        min-w-[72px]
        rounded-[9px]
        bg-[#F8FAFC]
        px-[10px]
        py-[8px]
        text-center
      "
    >
      <strong
        className={`
          block
          text-[14px]
          font-bold

          ${className}
        `}
      >
        {value}
      </strong>

      <span
        className="
          mt-[1px]
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

/* =========================================================
   CONFIRM MODAL
========================================================= */

function ConfirmModal({
  roleName,
  onClose,
  onConfirm,
}) {
  return (
    <>
      <button
        type="button"
        aria-label="إغلاق"
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
          max-w-[430px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[14px]
          bg-white
          p-[18px]
          shadow-[0_24px_70px_rgba(15,23,42,0.18)]
        "
      >
        <div
          className="
            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            rounded-[10px]
            bg-[#FFF7E6]
            text-[#C65D00]
          "
        >
          <ShieldCheck
            size={20}
          />
        </div>

        <h2
          className="
            m-0
            mt-[12px]
            text-[14px]
            font-bold
            text-[#1E293B]
          "
        >
          استعادة الصلاحيات
          الافتراضية؟
        </h2>

        <p
          className="
            m-0
            mt-[5px]
            text-[9px]
            leading-[18px]
            text-[#64748B]
          "
        >
          سيتم إعادة صلاحيات دور
          <strong>
            {" "}
            {roleName}{" "}
          </strong>
          إلى الإعدادات الافتراضية
          المقترحة للنظام.
        </p>

        <div
          className="
            mt-[16px]
            flex
            justify-end
            gap-[7px]
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-[36px]
              rounded-[8px]
              border
              border-[#DCE5F0]
              bg-white
              px-[13px]
              text-[8px]
              font-bold
              text-[#64748B]
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              h-[36px]
              rounded-[8px]
              border-0
              bg-[#09379A]
              px-[13px]
              text-[8px]
              font-bold
              text-white
            "
          >
            استعادة الإعدادات
          </button>
        </div>
      </div>
    </>
  );
}