import {
  Link,
  matchPath,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuGroups = [
    {
      title: "الرئيسية",
      items: [
        {
          name: "لوحة التحكم",
          icon: "⌂",
          path: "/admin/dashboard",
          activePath: "/admin/dashboard",
          exactHash: "",
        },
        {
          name: "المهام التي تحتاج إجراء",
          icon: "♧",
          path: "/admin/dashboard#tasks",
          activePath: "/admin/dashboard",
          exactHash: "#tasks",
        },
      ],
    },

    {
      title: "الدورات التدريبية",
      items: [
        {
          name: "قائمة الدورات",
          icon: "♙",
          path: "/admin/courses",
          activePath: "/admin/courses",
        },

        {
          name: "طلبات التسجيل",
          icon: "▤",

          // تحتاج اختيار دورة أولاً
          path: "/admin/courses",

          activePatterns: [
            "/admin/courses/:id/registration-requests",
            "/admin/courses/:id/registration-requests/:requestId",
            "/admin/courses/:id/registration-requests/:requestId/decision",
          ],
        },

        {
          name: "قائمة الانتظار",
          icon: "◷",

          // تحتاج اختيار دورة أولاً
          path: "/admin/courses",

          activePatterns: [
            "/admin/courses/:id/waiting-list",
            "/admin/courses/:id/waiting-list/:studentId/review-seat",
          ],
        },

        {
          name: "المتدربون",
          icon: "♟",

          // تحتاج اختيار دورة أولاً
          path: "/admin/courses",

          activePatterns: [
            "/admin/courses/:id/trainees",
            "/admin/courses/:id/trainees/:studentId",
          ],
        },

        {
          name: "الحضور والغياب",
          icon: "▣",

          // تحتاج اختيار دورة أولاً
          path: "/admin/courses",

          activePatterns: [
            "/admin/courses/:id/attendance",
          ],
        },

        {
          name: "مدربو الدورات",
          icon: "♙",
          path: "/admin/course-trainers",

          activePatterns: [
            "/admin/course-trainers",
            "/admin/course-trainers/add",
            "/admin/course-trainers/:trainerId",
            "/admin/course-trainers/:trainerId/edit",
          ],
        },

        {
          name: "التقييم والنتائج",
          icon: "☆",

          // تحتاج اختيار دورة أولاً
          path: "/admin/courses",

          activePatterns: [
            "/admin/courses/:id/evaluations",
            "/admin/courses/:id/evaluations/results",
          ],
        },

        {
          name: "شهادات الدورات",
          icon: "♕",
          path: "/admin/course-certificates",

          activePatterns: [
            "/admin/course-certificates",
            "/admin/course-certificates/:certificateId/preview",
            "/admin/course-certificates/verify",
          ],
        },

        {
          name: "تقارير الدورات",
          icon: "▥",
          path: "/admin/course-reports",

          activePatterns: [
            "/admin/course-reports",
          ],
        },
      ],
    },

    {
      title: "التدريب الميداني",
      items: [
        {
          name: "طلبات التدريب",
          icon: "▤",
          path: "/admin/training-requests",

          activePatterns: [
            "/admin/training-requests",
            "/admin/training-requests/:id",
          ],
        },

        {
          name: "الطلبة",
          icon: "♙",
          path: "/admin/students",

          activePatterns: [
            "/admin/students",
          ],
        },

        {
          name: "جهات التدريب",
          icon: "▦",
          path: "/admin/training-organizations",

          activePatterns: [
            "/admin/training-organizations",
            "/admin/training-organizations/add",
            "/admin/training-organizations/:id",
          ],
        },

        {
          name: "فرص التدريب",
          icon: "▣",
          path: "/admin/training-opportunities",

          activePatterns: [
            "/admin/training-opportunities",
            "/admin/training-opportunities/add",
            "/admin/training-opportunities/:id",
          ],
        },

        {
          name: "توزيع الطلبة",
          icon: "♟",
          path: "/admin/student-distribution",

          activePatterns: [
            "/admin/student-distribution",
            "/admin/student-distribution/process",
          ],
        },

        {
          name: "الموافقات",
          icon: "✓",
          path: "/admin/approvals",

          activePatterns: [
            "/admin/approvals",
            "/admin/approvals/:id",
          ],
        },

        {
          name: "المشرفون",
          icon: "♙",
          path: "/admin/supervisors",

          activePatterns: [
            "/admin/supervisors",
            "/admin/supervisors/add",
            "/admin/supervisors/:id",
          ],
        },

        {
          name: "الزيارات والمتابعة",
          icon: "⌖",
          path: "/admin/visits",

          activePatterns: [
            "/admin/visits",
            "/admin/visits/add",
          ],
        },

        {
          name: "التقييمات",
          icon: "☆",
          path: "/admin/evaluations",

          activePatterns: [
            "/admin/evaluations",
            "/admin/evaluations/add",
            "/admin/evaluations/:id",
          ],
        },

        {
          name: "التقارير والإحصائيات",
          icon: "▥",
          path: "/admin/reports",

          activePatterns: [
            "/admin/reports",
            "/admin/reports/custom",
          ],
        },

        {
          name: "الشهادات",
          icon: "♕",
          path: "/admin/certificates",

          activePatterns: [
            "/admin/certificates",
            "/admin/certificates/issue",
            "/admin/certificates/:id",
          ],
        },

        {
          name: "التقرير النهائي والإتمام",
          icon: "□",
          path: "/admin/final-reports",

          activePatterns: [
            "/admin/final-reports",
          ],
        },

        {
          name: "الحالات الاستثنائية",
          icon: "⚠",
          path: "/admin/exceptions",

          activePatterns: [
            "/admin/exceptions",
          ],
        },
      ],
    },

    {
      title: "الإدارة العامة",
      items: [
        {
          name: "الملفات والأرشفة",
          icon: "▱",
          path: "/admin/files",

          activePatterns: [
            "/admin/files",
          ],
        },

        {
          name: "الإعلانات والإشعارات",
          icon: "◁",
          path: "/admin/announcements",

          activePatterns: [
            "/admin/announcements",
          ],
        },

        {
          name: "البحث المتقدم",
          icon: "⌕",
          path: "/admin/advanced-search",

          activePatterns: [
            "/admin/advanced-search",
          ],
        },

        {
          name: "المستخدمون والصلاحيات",
          icon: "⚙",
          path: "/admin/users",

          activePatterns: [
            "/admin/users",
            "/admin/users/permissions",
          ],
        },
      ],
    },
  ];

  const isItemActive = (item) => {
    // المهام التي تحتاج إجراء
    if (item.exactHash !== undefined) {
      return (
        location.pathname === item.activePath &&
        location.hash === item.exactHash
      );
    }

    // مسار مفرد
    if (item.activePath) {
      return (
        location.pathname === item.activePath &&
        location.hash === ""
      );
    }

    // مجموعة مسارات
    if (item.activePatterns) {
      return item.activePatterns.some((pattern) =>
        matchPath(
          {
            path: pattern,
            end: true,
          },
          location.pathname
        )
      );
    }

    return false;
  };

  return (
    <aside
      dir="rtl"
      className="
        w-[256px]
        min-h-[calc(100vh-64px)]
        bg-[#fafbfc]
        border-l
        border-[#dfe3ea]
        shrink-0
        px-[10px]
        py-[6px]
        overflow-y-auto
      "
    >
      <nav>
        {menuGroups.map((group) => (
          <div
            key={group.title}
            className="mb-[8px]"
          >
            {/* ================= GROUP TITLE ================= */}
            <div
              className="
                px-[12px]
                py-[7px]
                text-[11px]
                font-bold
                text-[#7a8393]
              "
            >
              {group.title}
            </div>

            {/* ================= GROUP ITEMS ================= */}
            <div>
              {group.items.map((item) => {
                const active = isItemActive(item);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      min-h-[31px]
                      px-[12px]
                      mb-[1px]
                      rounded-[8px]
                      flex
                      items-center
                      gap-[11px]
                      text-[12px]
                      transition
                      ${
                        active
                          ? "bg-[#e1e6ee] text-[#1b2430] font-bold"
                          : "text-[#4a5465] hover:bg-[#eef0f4]"
                      }
                    `}
                  >
                    <span
                      className="
                        w-[18px]
                        text-center
                        text-[14px]
                        shrink-0
                      "
                    >
                      {item.icon}
                    </span>

                    <span>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}