import { useEffect, useState } from "react";

import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  Megaphone,
  BookOpen,
  ClipboardList,
  Users,
  CalendarDays,
  UserRoundCog,
  GraduationCap,
  Award,
  BriefcaseBusiness,
  Building2,
  MapPinned,
  UserRoundCheck,
  Route,
  ShieldCheck,
  Star,
  BarChart3,
  FileCheck2,
  TriangleAlert,
  FolderArchive,
  Search,
  Settings,
  LogOut,
  X,
  BookOpenCheck,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] =
    useState(false);

  /* =========================================================
     MENU GROUPS
  ========================================================= */

  const menuGroups = [
    /* =====================================================
       MAIN
    ===================================================== */

    {
      title: "الرئيسية",

      items: [
        {
          name: "لوحة التحكم",

          icon: LayoutDashboard,

          path: "/admin/dashboard",

          activePath: "/admin/dashboard",

          exactHash: "",
        },

        {
          name: "المهام التي تحتاج إجراء",

          icon: ClipboardCheck,

          path: "/admin/dashboard#tasks",

          activePath: "/admin/dashboard",

          exactHash: "#tasks",
        },

        {
          name: "الإعلانات والإشعارات",

          icon: Megaphone,

          path: "/admin/announcements",

          activePatterns: [
            "/admin/announcements",
          ],
        },
      ],
    },

    /* =====================================================
       ACADEMIC SETUP
    ===================================================== */

    {
      title: "الإعداد الأكاديمي",

      items: [
        {
          name: "الكليات والتخصصات",

          icon: Building2,

          path: "/admin/academic-structure",

          activePatterns: [
            "/admin/academic-structure",
          ],
        },

        {
          name: "الفصول والفترات التدريبية",

          icon: CalendarDays,

          path: "/admin/training-periods",

          activePatterns: [
            "/admin/training-periods",
          ],
        },

        {
          name: "متطلبات التدريب",

          icon: BookOpenCheck,

          path: "/admin/training-requirements",

          activePatterns: [
            "/admin/training-requirements",
          ],
        },
      ],
    },

    /* =====================================================
       TRAINING COURSES
    ===================================================== */

    {
      title: "الدورات التدريبية",

      items: [
        {
          name: "إدارة الدورات",

          icon: BookOpen,

          path: "/admin/courses",

          activePatterns: [
            "/admin/courses",
          ],
        },

        {
          name: "طلبات التسجيل",

          icon: ClipboardList,

          path: "/admin/courses/1/registration-requests",

          activePatterns: [
            "/admin/courses/:id/registration-requests",
          ],
        },

        {
          name: "المتدربون والحضور",

          icon: Users,

          path: "/admin/courses/1/trainees",

          activePatterns: [
            "/admin/courses/:id/trainees",
          ],
        },

        {
          name: "مدربو الدورات",

          icon: UserRoundCog,

          path: "/admin/course-trainers",

          activePatterns: [
            "/admin/course-trainers",
          ],
        },

        {
          name: "التقييم والنتائج",

          icon: Star,

          path: "/admin/courses/1/evaluations",

          activePatterns: [
            "/admin/courses/:id/evaluations",
          ],
        },

        {
          name: "شهادات الدورات",

          icon: Award,

          path: "/admin/course-certificates",

          activePatterns: [
            "/admin/course-certificates",
          ],
        },

        {
          name: "التحقق من الشهادة",

          icon: ShieldCheck,

          path: "/admin/course-certificates/verify",

          activePatterns: [
            "/admin/course-certificates/verify",
          ],
        },
      ],
    },

    /* =====================================================
       FIELD TRAINING
    ===================================================== */

    {
      title: "التدريب الميداني",

      items: [
        {
          name: "طلبات التدريب",

          icon: ClipboardList,

          path: "/admin/training-requests",

          activePatterns: [
            "/admin/training-requests",
          ],
        },

        {
          name: "الطلبة",

          icon: GraduationCap,

          path: "/admin/students",

          activePatterns: [
            "/admin/students",
          ],
        },

        {
          name: "الأهلية للتدريب",

          icon: BookOpenCheck,

          path: "/admin/students/eligibility",

          activePatterns: [
            "/admin/students/eligibility",
          ],
        },

        {
          name: "جهات التدريب",

          icon: Building2,

          path: "/admin/training-organizations",

          activePatterns: [
            "/admin/training-organizations",
          ],
        },

        {
          name: "فرص التدريب",

          icon: BriefcaseBusiness,

          path: "/admin/training-opportunities",

          activePatterns: [
            "/admin/training-opportunities",
          ],
        },

        {
          name: "توزيع الطلبة",

          icon: Route,

          path: "/admin/student-distribution",

          activePatterns: [
            "/admin/student-distribution",
          ],
        },

        {
          name: "الموافقات",

          icon: ShieldCheck,

          path: "/admin/approvals",

          activePatterns: [
            "/admin/approvals",
          ],
        },

        {
          name: "المشرفون",

          icon: UserRoundCheck,

          path: "/admin/supervisors",

          activePatterns: [
            "/admin/supervisors",
          ],
        },

        {
          name: "الزيارات والمتابعة",

          icon: MapPinned,

          path: "/admin/visits",

          activePatterns: [
            "/admin/visits",
          ],
        },

        {
          name: "التقييمات",

          icon: Star,

          path: "/admin/evaluations",

          activePatterns: [
            "/admin/evaluations",
          ],
        },

        {
          name: "التقرير النهائي والإتمام",

          icon: FileCheck2,

          path: "/admin/final-reports",

          activePatterns: [
            "/admin/final-reports",
          ],
        },

        {
          name: "الشهادات",

          icon: Award,

          path: "/admin/certificates",

          activePatterns: [
            "/admin/certificates",
          ],
        },

        {
          name: "الحالات الاستثنائية",

          icon: TriangleAlert,

          path: "/admin/exceptions",

          activePatterns: [
            "/admin/exceptions",
          ],
        },
      ],
    },

    /* =====================================================
       REPORTS
    ===================================================== */

    {
      title: "التقارير",

      items: [
        {
          name: "التقارير والإحصائيات",

          icon: BarChart3,

          path: "/admin/reports",

          activePatterns: [
            "/admin/reports",
          ],
        },
      ],
    },

    /* =====================================================
       GENERAL MANAGEMENT
    ===================================================== */

    {
      title: "الإدارة العامة",

      items: [
        {
          name: "الملفات والأرشفة",

          icon: FolderArchive,

          path: "/admin/files",

          activePatterns: [
            "/admin/files",
          ],
        },

        {
          name: "البحث المتقدم",

          icon: Search,

          path: "/admin/advanced-search",

          activePatterns: [
            "/admin/advanced-search",
          ],
        },

        {
          name: "المستخدمون والصلاحيات",

          icon: Settings,

          path: "/admin/users",

          activePatterns: [
            "/admin/users",
            "/admin/users/permissions",
          ],
        },
      ],
    },
  ];

  /* =========================================================
     MOBILE SIDEBAR EVENT
  ========================================================= */

  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsMobileOpen(
        (previous) => !previous
      );
    };

    window.addEventListener(
      "toggle-admin-sidebar",
      handleToggleSidebar
    );

    return () => {
      window.removeEventListener(
        "toggle-admin-sidebar",
        handleToggleSidebar
      );
    };
  }, []);

  /* =========================================================
     CLOSE SIDEBAR WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setIsMobileOpen(false);
  }, [
    location.pathname,
    location.hash,
  ]);

  /* =========================================================
     ESCAPE + BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* =========================================================
     ACTIVE ITEM
  ========================================================= */

  const isItemActive = (item) => {
    if (
      item.exactHash !== undefined
    ) {
      return (
        location.pathname ===
          item.activePath &&
        location.hash === item.exactHash
      );
    }

    if (item.activePath) {
      return (
        location.pathname ===
          item.activePath &&
        location.hash === ""
      );
    }

    if (item.activePatterns) {
      return item.activePatterns.some(
        (pattern) =>
          Boolean(
            matchPath(
              {
                path: pattern,
                end: true,
              },

              location.pathname
            )
          )
      );
    }

    return false;
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    setIsMobileOpen(false);

    navigate("/");
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        aria-hidden="true"
        onClick={closeMobileSidebar}
        className={`
          fixed
          inset-0
          z-40

          bg-[#0F172A]/45

          backdrop-blur-[1px]

          transition-opacity
          duration-300

          lg:hidden

          ${
            isMobileOpen
              ? `
                  pointer-events-auto
                  opacity-100
                `
              : `
                  pointer-events-none
                  opacity-0
                `
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        dir="rtl"
        aria-label="القائمة الرئيسية للإدارة"
        className={`
          fixed
          right-0
          top-0
          z-50

          flex
          h-dvh
          w-[280px]
          shrink-0
          flex-col

          overflow-hidden

          bg-[#09379A]

          font-['Cairo']
          text-white

          shadow-[-8px_0_30px_rgba(15,23,42,0.08)]

          transition-transform
          duration-300
          ease-out

          lg:static
          lg:z-auto
          lg:translate-x-0
          lg:shadow-none
          lg:transition-none

          ${
            isMobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =================================================
            BRAND
        ================================================== */}

        <div
          className="
            relative

            flex
            h-[112px]
            shrink-0
            items-center

            px-[18px]
            pt-[26px]

            lg:h-[96px]
            lg:pt-0
          "
        >
          <img
            src="/logo.svg"
            alt="شعار بوابة التدريب"
            className="
              h-[48px]
              w-[48px]
              shrink-0

              object-contain
            "
          />

          <div
            className="
              mr-[10px]
              min-w-0
              text-right
            "
          >
            <h2
              className="
                m-0

                whitespace-nowrap

                text-[16px]
                font-bold
                leading-[20px]
                tracking-[2px]

                text-white
              "
            >
              بــوابة التدريــب
            </h2>

            <p
              className="
                m-0
                mt-[2px]

                whitespace-nowrap

                text-[11px]
                font-medium
                leading-[17px]

                text-white/80
              "
            >
              لوحة إدارة النظام
            </p>
          </div>

          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={
              closeMobileSidebar
            }
            className="
              absolute
              left-[14px]
              top-[14px]

              hidden
              h-[32px]
              w-[32px]

              items-center
              justify-center

              rounded-[8px]

              border
              border-white/15

              bg-white/10

              text-white

              transition-all
              duration-200

              hover:bg-white/20

              active:scale-[0.96]

              max-lg:flex
            "
          >
            <X
              size={18}
              strokeWidth={1.9}
            />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <div
          className="
            admin-sidebar-scroll

            min-h-0
            flex-1

            overflow-x-hidden
            overflow-y-auto

            overscroll-contain
          "
        >
          <nav
            className="
              px-[9px]
              pb-[20px]
              pt-[8px]
            "
          >
            {menuGroups.map(
              (
                group,
                groupIndex
              ) => (
                <div
                  key={group.title}
                  className={
                    groupIndex === 0
                      ? ""
                      : "mt-[18px]"
                  }
                >
                  <div
                    className="
                      mb-[6px]
                      px-[16px]

                      text-[11px]
                      font-bold
                      leading-[20px]

                      text-white/55
                    "
                  >
                    {group.title}
                  </div>

                  <div
                    className="
                      flex
                      flex-col
                      gap-[4px]
                    "
                  >
                    {group.items.map(
                      (item) => {
                        const active =
                          isItemActive(
                            item
                          );

                        const Icon =
                          item.icon;

                        return (
                          <Link
                            key={
                              item.name
                            }
                            to={item.path}
                            onClick={
                              closeMobileSidebar
                            }
                            className={`
                              flex
                              min-h-[44px]
                              w-full
                              items-center

                              gap-[12px]

                              rounded-[10px]

                              px-[16px]
                              py-[10px]

                              text-[13px]
                              leading-[20px]

                              transition-all
                              duration-200

                              ${
                                active
                                  ? `
                                      bg-white

                                      font-bold
                                      text-[#09379A]

                                      shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                                    `
                                  : `
                                      bg-transparent

                                      font-medium
                                      text-white/90

                                      hover:bg-white/10
                                      hover:text-white
                                    `
                              }
                            `}
                          >
                            <Icon
                              size={19}
                              strokeWidth={
                                1.8
                              }
                              className="shrink-0"
                            />

                            <span
                              className="
                                min-w-0
                                flex-1

                                whitespace-nowrap
                              "
                            >
                              {item.name}
                            </span>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            )}
          </nav>
        </div>

        {/* =================================================
            BOTTOM
        ================================================== */}

        <div
          className="
            shrink-0

            border-t
            border-white/10

            bg-[#09379A]

            pt-[8px]
          "
        >
          <div
            className="
              px-[12px]
              pb-[8px]
            "
          >
            <div
              className="
                rounded-[10px]

                border
                border-white/10

                bg-white/[0.07]

                px-[14px]
                py-[11px]
              "
            >
              <p
                className="
                  m-0

                  text-[10px]
                  font-medium
                  leading-[18px]

                  text-white/60
                "
              >
                نوع الحساب
              </p>

              <div
                className="
                  mt-[3px]

                  flex
                  items-center
                  gap-[7px]
                "
              >
                <span
                  className="
                    h-[7px]
                    w-[7px]

                    rounded-full

                    bg-[#34D399]
                  "
                />

                <p
                  className="
                    m-0

                    text-[12px]
                    font-bold
                    leading-[19px]

                    text-white
                  "
                >
                  مدير النظام
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              px-[12px]
              pb-[14px]
            "
          >
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                h-[44px]
                w-full
                items-center

                gap-[12px]

                rounded-[10px]

                border-0

                bg-transparent

                px-[16px]

                text-[13px]
                font-medium
                leading-[20px]

                text-white/90

                transition-all
                duration-200

                hover:bg-white/10
                hover:text-white
              "
            >
              <LogOut
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>
                تسجيل الخروج
              </span>
            </button>
          </div>
        </div>

        {/* =================================================
            SCROLLBAR
        ================================================== */}

        <style>{`
          .admin-sidebar-scroll {
            scrollbar-width: thin;
            scrollbar-color:
              rgba(255, 255, 255, 0.22)
              transparent;
          }

          .admin-sidebar-scroll::-webkit-scrollbar {
            width: 5px;
          }

          .admin-sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
            margin-top: 4px;
            margin-bottom: 4px;
          }

          .admin-sidebar-scroll::-webkit-scrollbar-thumb {
            background-color:
              rgba(255, 255, 255, 0.22);

            border-radius: 999px;

            border: 1px solid transparent;

            background-clip: padding-box;
          }

          .admin-sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background-color:
              rgba(255, 255, 255, 0.38);
          }

          .admin-sidebar-scroll::-webkit-scrollbar-thumb:active {
            background-color:
              rgba(255, 255, 255, 0.48);
          }
        `}</style>
      </aside>
    </>
  );
}