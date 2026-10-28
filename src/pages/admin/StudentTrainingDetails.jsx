import { useNavigate, useParams } from "react-router-dom";

import {
  Bell,
  Menu,
  ChevronLeft,
  ArrowRight,
  PlusSquare,
  Percent,
  CalendarCheck,
  FileText,
  Star,
  Check,
  Clock3,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

export default function StudentTrainingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-admin-sidebar")
    );
  };

  return (
    <div
      dir="rtl"
      className="
        flex
        h-screen
        w-full
        overflow-hidden
        bg-[#F8FAFC]
        font-['Cairo']
        text-[#111C2D]
      "
    >
      <Sidebar />

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          navigate={navigate}
        />

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1450px]">
            <Breadcrumb
              navigate={navigate}
              title="تفاصيل التدريب"
            />

            <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="m-0 text-[26px] font-bold">
                  تفاصيل تدريب الطالب
                </h1>

                <p className="m-0 mt-1 text-[13px] text-[#64748B]">
                  أمل أحمد حجام - شركة القدس للاتصالات
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/admin/visits")}
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    px-5
                    text-[12px]
                  "
                >
                  <ArrowRight size={16} />
                  رجوع
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    rounded-[8px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    px-5
                    text-[12px]
                  "
                >
                  <PlusSquare size={16} />
                  إضافة ملاحظة
                </button>
              </div>
            </section>

            {/* CARDS */}

            <section className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="التقدم"
                value="60"
                suffix="%"
                icon={Percent}
                iconClass="bg-[#E8EEF9] text-[#09379A]"
              />

              <StatCard
                title="الحضور"
                value="92"
                suffix="%"
                icon={CalendarCheck}
                iconClass="bg-[#DCFCE7] text-[#15803D]"
                onClick={() =>
                  navigate(
                    `/admin/visits/${id}/attendance`
                  )
                }
              />

              <StatCard
                title="التقارير"
                value="3 من 4"
                icon={FileText}
                iconClass="bg-[#FFE5D9] text-[#B54708]"
              />

              <StatCard
                title="التقييم"
                value="4.0"
                suffix="من 5"
                icon={Star}
                iconClass="bg-[#DDF6FF] text-[#08759B]"
              />
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_390px]">
              <div className="flex flex-col gap-6">
                {/* TRAINING INFO */}

                <section className="rounded-[12px] border border-[#E0E7F2] bg-white p-6">
                  <h2 className="m-0 border-b border-[#E6EBF5] pb-4 text-[17px] font-bold text-[#062569]">
                    معلومات التدريب
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-4">
                    <Info
                      label="جهة التدريب"
                      value="شركة القدس للاتصالات"
                    />

                    <Info
                      label="المشرف الميداني"
                      value="م. خالد عودة"
                    />

                    <Info
                      label="البداية"
                      value="2025/12/01"
                    />

                    <Info
                      label="النهاية"
                      value="2026/02/01"
                    />
                  </div>
                </section>

                {/* PROGRESS */}

                <section
                  onClick={() =>
                    navigate(
                      "/admin/visits/progress"
                    )
                  }
                  className="
                    cursor-pointer
                    rounded-[12px]
                    border
                    border-[#E0E7F2]
                    bg-white
                    p-6
                  "
                >
                  <h2 className="m-0 border-b border-[#E6EBF5] pb-4 text-[17px] font-bold text-[#062569]">
                    التقدم
                  </h2>

                  <div className="mt-4">
                    <div className="h-[12px] overflow-hidden rounded-full bg-[#E5EAF2]">
                      <div className="h-full w-[60%] rounded-full bg-[#09379A]" />
                    </div>

                    <p className="m-0 mt-2 text-[11px] text-[#64748B]">
                      72 من 120 ساعة تدريبية
                    </p>
                  </div>
                </section>
              </div>

              {/* TIMELINE */}

              <section className="rounded-[12px] border border-[#E0E7F2] bg-white p-6">
                <h2 className="m-0 border-b border-[#E6EBF5] pb-4 text-[17px] font-bold text-[#062569]">
                  مسار التدريب
                </h2>

                <div className="mt-2">
                  <TimelineItem
                    done
                    title="بدء التدريب"
                    subtitle="2025/12/01"
                  />

                  <TimelineItem
                    done
                    title="تقرير الأسبوع 1"
                    subtitle="معتمد"
                  />

                  <TimelineItem
                    done
                    title="زيارة المشرف"
                    subtitle="2025/12/10"
                  />

                  <TimelineItem
                    title="تقرير الأسبوع 3"
                    subtitle="بانتظار المراجعة"
                  />

                  <TimelineItem
                    title="التقييم النهائي"
                    subtitle="2026/02/01"
                  />
                </div>
              </section>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

function Header({
  toggleSidebar,
  navigate,
}) {
  return (
    <header className="z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-[#E6EBF5] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu size={21} />
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/announcements")
          }
          className="relative p-2"
        >
          <Bell size={20} />

          <span className="absolute right-[7px] top-[6px] h-[7px] w-[7px] rounded-full bg-[#FF6534]" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#E8EEF9] text-[12px] font-bold text-[#09379A]">
          سم
        </div>

        <div>
          <p className="m-0 text-[12px] font-bold">
            د. سامر يوسف
          </p>

          <p className="m-0 text-[10px] text-[#64748B]">
            مشرف أكاديمي
          </p>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb({
  navigate,
  title,
}) {
  return (
    <div className="mb-8 flex items-center gap-2 text-[12px] text-[#64748B]">
      <button
        type="button"
        onClick={() =>
          navigate("/admin/dashboard")
        }
      >
        الرئيسية
      </button>

      <ChevronLeft size={15} />

      <span className="font-bold text-[#111C2D]">
        {title}
      </span>
    </div>
  );
}

function StatCard({
  title,
  value,
  suffix,
  icon: Icon,
  iconClass,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        min-h-[150px]
        rounded-[12px]
        border
        border-[#E0E7F2]
        bg-white
        p-5
        text-right
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold">
          {title}
        </span>

        <div
          className={`
            flex
            h-[44px]
            w-[44px]
            items-center
            justify-center
            rounded-[9px]
            ${iconClass}
          `}
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-7 flex items-baseline gap-2">
        <strong className="text-[30px] text-[#062569]">
          {value}
        </strong>

        {suffix && (
          <span className="text-[10px] text-[#64748B]">
            {suffix}
          </span>
        )}
      </div>
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="m-0 text-[10px] text-[#64748B]">
        {label}
      </p>

      <p className="m-0 mt-2 text-[12px] font-semibold">
        {value}
      </p>
    </div>
  );
}

function TimelineItem({
  done,
  title,
  subtitle,
}) {
  return (
    <div className="relative flex gap-3 pb-5">
      <div
        className={`
          flex
          h-[32px]
          w-[32px]
          shrink-0
          items-center
          justify-center
          rounded-full

          ${
            done
              ? "bg-[#159447] text-white"
              : "bg-[#EEF4FF] text-[#09379A]"
          }
        `}
      >
        {done ? (
          <Check size={16} />
        ) : (
          <Clock3 size={16} />
        )}
      </div>

      <div>
        <p className="m-0 text-[11px] font-bold">
          {title}
        </p>

        <p className="m-0 mt-1 text-[9px] text-[#64748B]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-[180px] flex flex-col gap-3 pb-2 text-[11px] text-[#64748B] sm:flex-row sm:justify-between">
      <p className="m-0">
        جميع الحقوق محفوظة © 2025 كلية الدراسات المتوسطة - جامعة الأزهر - غزة
      </p>

      <div className="flex gap-3">
        <span className="text-[#09379A]">
          الدعم الفني والأكاديمي
        </span>

        <span>•</span>

        <span className="text-[#09379A]">
          دليل الطالب للتدريب الميداني
        </span>
      </div>
    </footer>
  );
}