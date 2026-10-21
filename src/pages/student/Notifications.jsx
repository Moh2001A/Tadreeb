import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Megaphone,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Notifications() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "تحديث حالة طلب التدريب",
      description:
        'تم تحديث حالة طلبك لفرصة التدريب في "شركة القدس للاتصالات والتكنولوجيا" إلى "مقبول مبدئيا".',
      category: "طلب ميداني",
      time: "اليوم — 10:30 ص",
      unread: true,
      target: "/student/applications/status",
    },
    {
      id: 2,
      type: "training",
      title: "تحديث متعلق بالتدريب",
      description:
        "يوجد تحديث جديد في ملف تدريبك الميداني تم إضافته بواسطة المشرف الأكاديمي د. محمد الأسطل.",
      category: "ملف السجل اليومي",
      time: "أمس — 12:00 م",
      unread: true,
      target: "/student/training-profile",
    },
    {
      id: 3,
      type: "report",
      title: "تنبيه بخصوص التقرير",
      description:
        "يرجى مراجعة حالة التقرير الأسبوعي الرابع؛ تم اعتماد التقرير بنجاح مع إضافة ملاحظات توجيهية هامة للتطوير المهني.",
      category: "التقارير",
      time: "من يومين — 09:15 ص",
      unread: false,
      target: "/student/reports",
    },
    {
      id: 4,
      type: "announcement",
      title: "إعلان تدريبي جديد",
      description:
        'تفاصيل الإعلان: ورشة عمل إرشادية حول "أخلاقيات العمل الميداني وإعداد التقرير النهائي"، يوم الأحد القادم عبر القاعة الافتراضية.',
      category: "إعلانات عامة",
      time: "2025/11/28 — 02:00 م",
      unread: false,
      target: "/student/dashboard",
    },
  ]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => notification.unread
      ).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (notification) => notification.unread
      );
    }

    return notifications;
  }, [filter, notifications]);

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const openNotification = (notification) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );

    if (notification.target) {
      navigate(notification.target);
    }
  };

  return (
    <div
      dir="rtl"
      className="
        h-screen
        w-full
        flex
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#1E293B]
      "
    >
      <Sidebar />

      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
        "
      >
        <Header />

        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[18px]
            pb-[40px]
          "
        >
          <div
            className="
              w-full
              max-w-[1080px]
              mx-auto
            "
          >
            {/* =====================================
                BREADCRUMB
            ====================================== */}
            <div
              className="
                flex
                items-center
                gap-[7px]
                text-[13px]
                leading-[20px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate("/student/dashboard")
                }
                className="
                  border-0
                  bg-transparent
                  p-0
                  text-[#64748B]
                  cursor-pointer
                  hover:text-[#09379A]
                "
              >
                الرئيسية
              </button>

              <span className="text-[#94A3B8]">
                ›
              </span>

              <span
                className="
                  font-bold
                  text-[#09379A]
                "
              >
                الإشعارات
              </span>
            </div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}
            <section
              className="
                mt-[6px]
                flex
                items-start
                justify-between
                gap-[20px]
              "
            >
              <div>
                <h1
                  className="
                    m-0
                    text-[30px]
                    leading-[42px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  الإشعارات
                </h1>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[12px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  تابع آخر التحديثات والإعلانات المتعلقة
                  بمسارك في التدريب الميداني
                </p>
              </div>
            </section>

            {/* =====================================
                FILTER BAR
            ====================================== */}
            <section
              className="
                mt-[22px]
                pb-[16px]
                border-b
                border-[#E2E8F0]
                flex
                items-center
                justify-between
                gap-[20px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[8px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setFilter("all")
                  }
                  className={`
                    h-[38px]
                    px-[18px]
                    rounded-[8px]
                    border
                    text-[10px]
                    font-bold
                    cursor-pointer
                    transition

                    ${
                      filter === "all"
                        ? `
                          border-[#09379A]
                          bg-[#09379A]
                          text-white
                        `
                        : `
                          border-[#D9E2EC]
                          bg-white
                          text-[#475569]
                          hover:bg-[#F8FAFC]
                        `
                    }
                  `}
                >
                  الكل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFilter("unread")
                  }
                  className={`
                    h-[38px]
                    px-[14px]
                    rounded-[8px]
                    border
                    flex
                    items-center
                    gap-[7px]
                    text-[10px]
                    font-bold
                    cursor-pointer
                    transition

                    ${
                      filter === "unread"
                        ? `
                          border-[#09379A]
                          bg-[#EEF4FF]
                          text-[#09379A]
                        `
                        : `
                          border-[#D9E2EC]
                          bg-white
                          text-[#475569]
                          hover:bg-[#F8FAFC]
                        `
                    }
                  `}
                >
                  غير مقروءة

                  {unreadCount > 0 && (
                    <span
                      className="
                        min-w-[21px]
                        h-[21px]
                        px-[6px]
                        rounded-full
                        bg-[#FF6B35]
                        text-white
                        flex
                        items-center
                        justify-center
                        text-[8px]
                        font-bold
                      "
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className={`
                  border-0
                  bg-transparent
                  p-0
                  flex
                  items-center
                  gap-[6px]
                  text-[9px]
                  font-bold
                  transition

                  ${
                    unreadCount > 0
                      ? `
                        text-[#09379A]
                        cursor-pointer
                        hover:underline
                      `
                      : `
                        text-[#94A3B8]
                        cursor-default
                      `
                  }
                `}
              >
                <Check
                  size={13}
                  strokeWidth={2}
                />

                تحديد الكل كمقروء
              </button>
            </section>

            {/* =====================================
                NOTIFICATIONS LIST
            ====================================== */}
            <section
              className="
                mt-[28px]
                flex
                flex-col
                gap-[16px]
              "
            >
              {visibleNotifications.length > 0 ? (
                visibleNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() =>
                      openNotification(notification)
                    }
                  />
                ))
              ) : (
                <EmptyNotifications />
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({
  notification,
  onClick,
}) {
  const config = {
    application: {
      icon: ClipboardCheck,
      iconBox:
        "bg-[#EEF4FF] text-[#09379A]",
    },

    training: {
      icon: BookOpen,
      iconBox:
        "bg-[#ECFEFF] text-[#0891B2]",
    },

    report: {
      icon: FileText,
      iconBox:
        "bg-[#F8FAFC] text-[#475569]",
    },

    announcement: {
      icon: Megaphone,
      iconBox:
        "bg-[#EFFAFF] text-[#0284C7]",
    },
  };

  const {
    icon: Icon,
    iconBox,
  } =
    config[notification.type] ||
    config.report;

  return (
    <article
      className={`
        min-h-[116px]
        rounded-[14px]
        border
        px-[20px]
        py-[18px]
        flex
        items-center
        justify-between
        gap-[20px]
        transition

        ${
          notification.unread
            ? `
              border-[#D8E4F5]
              bg-white
              shadow-[0_2px_6px_rgba(15,23,42,0.04)]
            `
            : `
              border-[#E2E8F0]
              bg-white
            `
        }
      `}
    >
      <div
        className="
          flex
          items-start
          gap-[14px]
          min-w-0
          flex-1
        "
      >
        {/* Icon */}
        <div
          className={`
            w-[48px]
            h-[48px]
            rounded-[10px]
            flex
            items-center
            justify-center
            shrink-0
            ${iconBox}
          `}
        >
          <Icon
            size={22}
            strokeWidth={1.7}
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              gap-[7px]
              flex-wrap
            "
          >
            {notification.unread && (
              <span
                className="
                  w-[8px]
                  h-[8px]
                  rounded-full
                  bg-[#FF6B35]
                  ring-[4px]
                  ring-[#FFF0E9]
                "
              />
            )}

            <h2
              className="
                m-0
                text-[14px]
                font-bold
                text-[#1E293B]
              "
            >
              {notification.title}
            </h2>
          </div>

          <p
            className="
              m-0
              mt-[5px]
              text-[10px]
              leading-[20px]
              text-[#64748B]
            "
          >
            {notification.description}
          </p>

          <div
            className="
              mt-[9px]
              flex
              items-center
              gap-[10px]
              flex-wrap
            "
          >
            <span
              className="
                h-[23px]
                px-[9px]
                rounded-[6px]
                bg-[#EEF4FF]
                text-[#2563EB]
                flex
                items-center
                text-[8px]
                font-bold
              "
            >
              {notification.category}
            </span>

            <span
              className="
                text-[8px]
                text-[#94A3B8]
              "
            >
              {notification.time}
            </span>
          </div>
        </div>
      </div>

      {/* Open */}
      <button
        type="button"
        onClick={onClick}
        aria-label={`فتح ${notification.title}`}
        className="
          w-[36px]
          h-[36px]
          shrink-0
          rounded-full
          border-0
          bg-transparent
          text-[#94A3B8]
          flex
          items-center
          justify-center
          cursor-pointer
          transition
          hover:bg-[#F1F5F9]
          hover:text-[#09379A]
        "
      >
        <ArrowLeft
          size={18}
          strokeWidth={1.7}
        />
      </button>
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyNotifications() {
  return (
    <div
      className="
        min-h-[320px]
        rounded-[14px]
        border
        border-[#DDE5EF]
        bg-white
        px-[24px]
        py-[40px]
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <div
        className="
          w-[56px]
          h-[56px]
          rounded-full
          bg-[#EEF4FF]
          text-[#09379A]
          flex
          items-center
          justify-center
        "
      >
        <Bell
          size={25}
          strokeWidth={1.7}
        />
      </div>

      <h3
        className="
          m-0
          mt-[14px]
          text-[15px]
          font-bold
          text-[#1E293B]
        "
      >
        لا توجد إشعارات
      </h3>

      <p
        className="
          m-0
          mt-[5px]
          max-w-[320px]
          text-[10px]
          leading-[18px]
          text-[#64748B]
        "
      >
        لا توجد إشعارات مطابقة للحالة المحددة حاليا.
        ستظهر هنا أي تحديثات جديدة تخص تدريبك الميداني.
      </p>
    </div>
  );
}