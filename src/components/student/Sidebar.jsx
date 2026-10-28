
import { useEffect, useState } from "react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Home,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  CalendarDays,
  Star,
  CircleCheck,
  GraduationCap,
  Bell,
  UserRound,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "الرئيسية",
      icon: Home,
      path: "/student/dashboard",
    },
    {
      name: "فرص التدريب",
      icon: BriefcaseBusiness,
      path: "/student/opportunities",
    },
    {
      name: "طلباتي",
      icon: ClipboardList,
      path: "/student/applications",
    },
    {
      name: "ملفي التدريبي",
      icon: FileText,
      path: "/student/training-profile",
    },
    {
      name: "الحضور والغياب",
      icon: CalendarDays,
      path: "/student/attendance",
    },
    {
      name: "التقارير",
      icon: FileText,
      path: "/student/reports",
    },
    {
      name: "التقييم",
      icon: Star,
      path: "/student/evaluation",
    },
    {
      name: "إنهاء التدريب",
      icon: CircleCheck,
      path: "/student/finish-training",
    },
    {
      name: "الشهادة",
      icon: GraduationCap,
      path: "/student/certificate",
    },
    {
      name: "الإشعارات",
      icon: Bell,
      path: "/student/notifications",
    },
    {
      name: "الملف الشخصي",
      icon: UserRound,
      path: "/student/profile",
    },

    // NEW: STUDENT SETTINGS
    {
      name: "الإعدادات",
      icon: Settings,
      path: "/student/settings",
    },
  ];

  // MOBILE SIDEBAR TOGGLE
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsMobileOpen((prev) => !prev);
    };

    window.addEventListener(
      "toggle-student-sidebar",
      handleToggleSidebar
    );

    return () => {
      window.removeEventListener(
        "toggle-student-sidebar",
        handleToggleSidebar
      );
    };
  }, []);

  // CLOSE SIDEBAR AFTER NAVIGATION
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // ESCAPE KEY & BODY SCROLL
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    setIsMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* OVERLAY */}
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
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        dir="rtl"
        aria-label="القائمة الرئيسية"
        className={`
          w-[280px]
          h-screen
          shrink-0
          flex
          flex-col
          overflow-hidden
          bg-[#09379A]
          text-white
          font-['Cairo']

          fixed
          top-0
          right-0
          z-50

          transition-transform
          duration-300
          ease-out

          lg:static
          lg:translate-x-0
          lg:z-auto
          lg:transition-none

          ${
            isMobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* BRAND */}
        <div
          className="
            relative
            h-[112px]
            lg:h-[96px]
            shrink-0
            flex
            items-center
            px-[18px]
            pt-[26px]
            lg:pt-0
          "
        >
          <img
            src="/logo.svg"
            alt="شعار بوابة التدريب الميداني"
            className="
              w-[48px]
              h-[48px]
              shrink-0
              object-contain
            "
          />

          <div
            className="
              mr-[10px]
              min-w-0
              text-right
              font-['Cairo']
            "
          >
            <h2
              className="
                m-0
                text-[16px]
                leading-[20px]
                font-bold
                text-white
                whitespace-nowrap
                tracking-[3px]
              "
            >
              بــوابة التدريــب الميدانــي
            </h2>

            <p
              className="
                m-0
                mt-[1px]
                text-[12px]
                leading-[17px]
                font-medium
                text-white
                whitespace-nowrap
              "
            >
              كليــة الدراســات المتوسطــة - الأزهــر
            </p>
          </div>

          {/* CLOSE BUTTON - MOBILE ONLY */}
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={closeMobileSidebar}
            className="
              absolute
              top-[14px]
              left-[14px]
              w-[32px]
              h-[32px]
              rounded-[8px]
              border
              border-white/15
              bg-white/10
              text-white
              hidden
              max-lg:flex
              items-center
              justify-center
              cursor-pointer
              transition-all
              duration-200
              hover:bg-white/20
              active:scale-[0.96]
            "
          >
            <X size={18} strokeWidth={1.9} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div
          className="
            sidebar-scroll
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
          "
        >
          <nav
            className="
              px-[9px]
              pt-[20px]
              pb-[16px]
            "
          >
            <div className="flex flex-col gap-[4px]">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={({ isActive }) => `
                      w-full
                      h-[44px]
                      px-[16px]
                      rounded-[10px]
                      flex
                      items-center
                      gap-[12px]
                      text-[14px]
                      leading-[20px]
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                              bg-white
                              text-[#09379A]
                              font-bold
                              shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                            `
                          : `
                              bg-transparent
                              text-white/90
                              font-medium
                              hover:bg-white/10
                              hover:text-white
                            `
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="shrink-0"
                    />

                    <span className="whitespace-nowrap">
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>

        {/* FIXED BOTTOM */}
        <div
          className="
            shrink-0
            bg-[#09379A]
            pt-[8px]
          "
        >
          {/* LOGOUT */}
          <div
            className="
              px-[25px]
              pb-[12px]
            "
          >
            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                h-[44px]
                rounded-[10px]
                px-[8px]
                flex
                items-center
                gap-[12px]
                border-0
                bg-transparent
                text-[14px]
                leading-[20px]
                font-medium
                text-white/90
                cursor-pointer
                transition-all
                duration-200
                hover:bg-white/10
                hover:text-white
              "
            >
              <LogOut
                size={21}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span className="whitespace-nowrap">
                تسجيل الخروج
              </span>
            </button>
          </div>

          {/* SEMESTER INFO */}
          <div
            className="
              px-[12px]
              pb-[16px]
            "
          >
            <div
              className="
                w-full
                min-h-[68px]
                rounded-[10px]
                border
                border-white/10
                bg-white/[0.05]
                px-[15px]
                py-[12px]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <p
                className="
                  m-0
                  text-[11px]
                  leading-[16px]
                  font-normal
                  text-white/70
                  whitespace-nowrap
                "
              >
                الفصل الدراسي الثاني 2024 / 2025
              </p>

              <p
                className="
                  m-0
                  mt-[2px]
                  text-[11px]
                  leading-[16px]
                  font-bold
                  text-[#00B4D8]
                  whitespace-nowrap
                "
              >
                الدبلوم المتوسط - تكنولوجيا المعلومات
              </p>
            </div>
          </div>
        </div>

        {/* SCROLLBAR STYLE */}
        <style>{`
          .sidebar-scroll {
            scrollbar-width: thin;
            scrollbar-color:
              rgba(255, 255, 255, 0.24)
              transparent;
          }

          .sidebar-scroll::-webkit-scrollbar {
            width: 5px;
          }

          .sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .sidebar-scroll::-webkit-scrollbar-thumb {
            background:
              rgba(255, 255, 255, 0.24);
            border-radius: 999px;
          }

          .sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background:
              rgba(255, 255, 255, 0.4);
          }
        `}</style>
      </aside>
    </>
  );
}
