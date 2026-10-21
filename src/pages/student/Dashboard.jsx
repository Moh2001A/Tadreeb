import { useNavigate } from "react-router-dom";

import {
  Clock3,
  BriefcaseBusiness,
  ClipboardList,
  Compass,
  ChevronLeft,
  Code2,
  BarChart3,
  Heart,
  Bell,
  BellOff,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const statistics = [
    {
      title: "إجمالي الساعات",
      value: "120",
      icon: Clock3,
    },
    {
      title: "تدريبي الحالي",
      value: "1",
      icon: BriefcaseBusiness,
    },
    {
      title: "طلباتي الحالية",
      value: "2",
      icon: ClipboardList,
    },
    {
      title: "فرص تدريب متاحة",
      value: "12",
      icon: Compass,
    },
  ];

  const opportunities = [
    {
      title: "تدريب في شركة التقنية الحديثة",
      field: "تقنية المعلومات",
      type: "حضوري",
      icon: Code2,
      iconBg: "#E5F8FC",
      iconBorder: "#AAE7F2",
      chipBg: "rgba(0, 180, 216, 0.15)",
      chipDot: "#00B4D8",
    },
    {
      title: "تدريب في مركز فلسطين للتطوير",
      field: "إدارة أعمال",
      type: "عن بعد",
      icon: BarChart3,
      iconBg: "#FFF5E5",
      iconBorder: "#FCD89B",
      chipBg: "rgba(245, 158, 11, 0.15)",
      chipDot: "#F59E0B",
    },
    {
      title: "تدريب في مستشفى الشهيد الأزهر",
      field: "خدمات طبية",
      type: "حضوري",
      icon: Heart,
      iconBg: "#E9FBF5",
      iconBorder: "#AFE9D6",
      chipBg: "rgba(16, 185, 129, 0.15)",
      chipDot: "#10B981",
    },
  ];

  const notifications = [
    {
      title: "فتح باب التسجيل في دورات تدريبية جديدة",
      date: "2025/10/01",
      unread: true,
    },
    {
      title: "إعلان عن فرص تدريب ميداني في عدة جهات",
      date: "2025/09/28",
      unread: true,
    },
    {
      title: "تحديث سياسة التدريب الميداني",
      date: "2025/09/25",
      unread: false,
    },
  ];

  return (
    <div
      dir="rtl"
      className="
        h-screen
        w-full
        flex
        overflow-hidden
        bg-white
        font-['Cairo']
        text-[#1E293B]
      "
    >
      {/* =====================================================
          SIDEBAR
          ثابت خارج منطقة الـ Scroll
      ====================================================== */}
      <Sidebar />

      {/* =====================================================
          RIGHT / MAIN SIDE
      ====================================================== */}
      <div
        className="
          flex-1
          min-w-0
          h-screen
          flex
          flex-col
          overflow-hidden
          bg-white
        "
      >
        {/* =====================================================
            HEADER
            ثابت كذلك
        ====================================================== */}
        <Header />

        {/* =====================================================
            SCROLLABLE CONTENT ONLY
        ====================================================== */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[32px]
            pb-[30px]
          "
        >
          {/* ===================================================
              CONTENT CONTAINER
              1080px عند عرض Figma
          ==================================================== */}
          <div className="w-full max-w-[1080px] mx-auto">
            {/* =================================================
                WELCOME BANNER
            ================================================== */}
            <section
              className="
                w-full
                h-[148px]
                rounded-[16px]
                bg-[#09379A]
                px-[40px]
                flex
                items-center
                text-white
              "
            >
              <div className="w-full text-right">
                <h1
                  className="
                    m-0
                    text-[24px]
                    leading-[30px]
                    font-bold
                    text-white
                  "
                >
                  مرحباً أمل
                </h1>

                <p
                  className="
                    m-0
                    mt-[8px]
                    text-[14px]
                    leading-[18px]
                    font-medium
                    text-white
                  "
                >
                  نتمنى لك رحلة تدريبية مليئة بالنجاح والتميز
                </p>
              </div>
            </section>

            {/* =================================================
                STATISTICS
            ================================================== */}
            <section
              className="
                mt-[24px]
                w-full
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-[24px]
              "
            >
              {statistics.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="
                      w-full
                      h-[93px]
                      min-w-0
                      rounded-[14px]
                      border
                      border-[#E2E8F0]
                      bg-white
                      shadow-[0_1px_1.5px_rgba(0,0,0,0.03)]
                      px-[21px]
                      flex
                      items-center
                    "
                  >
                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        shrink-0
                        rounded-[10px]
                        border
                        border-[#E2E8F0]/60
                        bg-[#F8FAFC]
                        flex
                        items-center
                        justify-center
                        text-[#09379A]
                      "
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <div
                      className="
                        mr-[16px]
                        flex-1
                        min-w-0
                        text-right
                      "
                    >
                      <p
                        className="
                          m-0
                          text-[14px]
                          leading-[18px]
                          font-medium
                          text-[#64748B]
                          whitespace-nowrap
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          m-0
                          mt-[3px]
                          text-[24px]
                          leading-[32px]
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* =================================================
                LOWER CARDS
                Notifications = Left
                Opportunities = Right
            ================================================== */}
            <section
              dir="ltr"
              className="
                mt-[24px]
                w-full
                grid
                grid-cols-1
                lg:grid-cols-[440fr_616fr]
                gap-[24px]
                items-start
              "
            >
              {/* =================================================
                  NOTIFICATIONS
              ================================================== */}
              <section
                dir="rtl"
                className="
                  w-full
                  h-[376px]
                  min-w-0
                  rounded-[14px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  shadow-[0_1px_1.5px_rgba(0,0,0,0.03)]
                  px-[24px]
                  pt-[24px]
                  overflow-hidden
                "
              >
                {/* HEADER */}
                <div
                  className="
                    h-[52px]
                    border-b
                    border-[#E2E8F0]
                    flex
                    items-start
                    justify-between
                  "
                >
                  <h2
                    className="
                      m-0
                      text-[18px]
                      leading-[26px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    آخر الإشعارات
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/student/notifications")
                    }
                    className="
                      h-[36px]
                      px-[16px]
                      rounded-[10px]
                      border
                      border-[#09379A]
                      bg-white
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                      gap-[6px]
                      text-[14px]
                      font-normal
                      transition
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <span>عرض الكل</span>

                    <ChevronLeft
                      size={16}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>

                {/* CONTENT */}
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(
                      (notification, index) => (
                        <button
                          type="button"
                          key={notification.title}
                          onClick={() =>
                            navigate(
                              "/student/notifications"
                            )
                          }
                          className={`
                            w-full
                            h-[72px]
                            px-[8px]
                            bg-white
                            flex
                            items-center
                            text-right
                            transition
                            hover:bg-[#F8FAFC]

                            ${
                              index !==
                              notifications.length - 1
                                ? "border-b border-[#E2E8F0]"
                                : ""
                            }
                          `}
                        >
                          <div
                            className="
                              w-[32px]
                              h-[32px]
                              shrink-0
                              rounded-[8px]
                              bg-[#EEF2F8]
                              flex
                              items-center
                              justify-center
                              text-[#09379A]
                            "
                          >
                            <Bell
                              size={17}
                              strokeWidth={1.7}
                            />
                          </div>

                          <div
                            className="
                              mr-[12px]
                              flex-1
                              min-w-0
                            "
                          >
                            <p
                              className="
                                m-0
                                text-[13px]
                                leading-[19px]
                                font-semibold
                                text-[#1E293B]
                                truncate
                              "
                            >
                              {notification.title}
                            </p>

                            <p
                              dir="ltr"
                              className="
                                m-0
                                mt-[2px]
                                text-[10px]
                                leading-[14px]
                                font-normal
                                text-[#94A3B8]
                                text-right
                              "
                            >
                              {notification.date}
                            </p>
                          </div>

                          {notification.unread && (
                            <span
                              className="
                                w-[6px]
                                h-[6px]
                                shrink-0
                                rounded-full
                                bg-[#FF6B35]
                                ml-[4px]
                              "
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div
                    className="
                      h-[270px]
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      text-[#64748B]
                    "
                  >
                    <div
                      className="
                        w-[44px]
                        h-[44px]
                        rounded-[10px]
                        bg-[#F8FAFC]
                        flex
                        items-center
                        justify-center
                        mb-[12px]
                      "
                    >
                      <BellOff
                        size={21}
                        strokeWidth={1.7}
                      />
                    </div>

                    <p
                      className="
                        m-0
                        text-[13px]
                        leading-[20px]
                        font-medium
                      "
                    >
                      لا توجد إشعارات جديدة حالياً
                    </p>
                  </div>
                )}
              </section>

              {/* =================================================
                  OPPORTUNITIES
              ================================================== */}
              <section
                dir="rtl"
                className="
                  w-full
                  h-[376px]
                  min-w-0
                  rounded-[14px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  shadow-[0_1px_1.5px_rgba(0,0,0,0.03)]
                  px-[24px]
                  pt-[24px]
                  overflow-hidden
                "
              >
                {/* HEADER */}
                <div
                  className="
                    h-[52px]
                    border-b
                    border-[#E2E8F0]
                    flex
                    items-start
                    justify-between
                  "
                >
                  <h2
                    className="
                      m-0
                      text-[18px]
                      leading-[26px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    فرص تدريب مقترحة لك
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/student/opportunities")
                    }
                    className="
                      h-[36px]
                      px-[16px]
                      rounded-[10px]
                      border
                      border-[#09379A]
                      bg-white
                      text-[#09379A]
                      flex
                      items-center
                      justify-center
                      gap-[6px]
                      text-[14px]
                      font-normal
                      transition
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <span>عرض الكل</span>

                    <ChevronLeft
                      size={16}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>

                {/* ROWS */}
                <div>
                  {opportunities.map(
                    (opportunity, index) => {
                      const Icon = opportunity.icon;

                      return (
                        <button
                          type="button"
                          key={opportunity.title}
                          onClick={() =>
                            navigate(
                              "/student/opportunities/details"
                            )
                          }
                          className={`
                            w-full
                            h-[88px]
                            px-[10px]
                            rounded-[10px]
                            bg-white
                            flex
                            items-center
                            text-right
                            transition
                            hover:bg-[#F8FAFC]

                            ${
                              index !==
                              opportunities.length - 1
                                ? "border-b border-[#E2E8F0]"
                                : ""
                            }
                          `}
                        >
                          {/* ICON */}
                          <div
                            style={{
                              backgroundColor:
                                opportunity.iconBg,
                              borderColor:
                                opportunity.iconBorder,
                            }}
                            className="
                              w-[48px]
                              h-[48px]
                              shrink-0
                              rounded-[10px]
                              border
                              flex
                              items-center
                              justify-center
                              text-[#09379A]
                            "
                          >
                            <Icon
                              size={24}
                              strokeWidth={1.8}
                            />
                          </div>

                          {/* TEXT */}
                          <div
                            className="
                              mr-[14px]
                              flex-1
                              min-w-0
                            "
                          >
                            <h3
                              className="
                                m-0
                                text-[16px]
                                leading-[23px]
                                font-semibold
                                text-[#1E293B]
                                truncate
                              "
                            >
                              {opportunity.title}
                            </h3>

                            <div
                              className="
                                mt-[5px]
                                flex
                                items-center
                                gap-[8px]
                              "
                            >
                              {/* FIELD */}
                              <span
                                style={{
                                  backgroundColor:
                                    opportunity.chipBg,
                                }}
                                className="
                                  h-[24px]
                                  px-[10px]
                                  rounded-[10px]
                                  flex
                                  items-center
                                  gap-[5px]
                                  text-[12px]
                                  leading-[18px]
                                  text-[#1E293B]
                                  whitespace-nowrap
                                "
                              >
                                <span
                                  style={{
                                    backgroundColor:
                                      opportunity.chipDot,
                                  }}
                                  className="
                                    w-[5px]
                                    h-[5px]
                                    rounded-full
                                    shrink-0
                                  "
                                />

                                {opportunity.field}
                              </span>

                              {/* TYPE */}
                              <span
                                className="
                                  h-[24px]
                                  px-[10px]
                                  rounded-[10px]
                                  border
                                  border-[#E2E8F0]
                                  bg-white
                                  flex
                                  items-center
                                  text-[12px]
                                  leading-[18px]
                                  text-[#64748B]
                                  whitespace-nowrap
                                "
                              >
                                {opportunity.type}
                              </span>
                            </div>
                          </div>

                          {/* ARROW */}
                          <ChevronLeft
                            size={20}
                            strokeWidth={1.8}
                            className="
                              mr-[8px]
                              shrink-0
                              text-[#94A3B8]
                            "
                          />
                        </button>
                      );
                    }
                  )}
                </div>
              </section>
            </section>

            {/* =================================================
                FOOTER
            ================================================== */}
            <footer
              className="
                mt-[24px]
                w-full
                flex
                flex-wrap
                items-center
                justify-between
                gap-[12px]
                text-[12px]
                leading-[18px]
                font-normal
                text-[#64748B]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[16px]
                "
              >
                <button
                  type="button"
                  className="
                    border-0
                    bg-transparent
                    p-0
                    text-[#09379A]
                    cursor-pointer
                    hover:underline
                  "
                >
                  دليل الطالب للتدريب الميداني
                </button>

                <span>•</span>

                <button
                  type="button"
                  className="
                    border-0
                    bg-transparent
                    p-0
                    text-[#09379A]
                    cursor-pointer
                    hover:underline
                  "
                >
                  الدعم الفني والأكاديمي
                </button>
              </div>

              <p className="m-0 text-right">
                جميع الحقوق محفوظة © {currentYear} كلية
                الدراسات المتوسطة - جامعة الأزهر - غزة
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}