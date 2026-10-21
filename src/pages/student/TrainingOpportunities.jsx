import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  Clock3,
  ArrowLeft,
  BriefcaseBusiness,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingOpportunities() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("الكل");

  const filters = [
    "الكل",
    "داخلي",
    "خارجي",
    "حضوري",
    "عن بعد",
  ];

  const opportunities = [
    {
      id: 1,
      title: "تدريب في شركة التقنية الحديثة",
      category: "تقنية المعلومات",
      mode: "حضوري",
      location: "غزة - الرمال",
      date: "2025/10/15",
      hours: "120 ساعة",
      image: "/training-tech.jpg",
      categoryBg: "#E6F8FB",
      categoryText: "#287E8C",
    },
    {
      id: 2,
      title: "تدريب في مركز فلسطين للتطوير",
      category: "إدارة أعمال",
      mode: "عن بعد",
      location: "غزة",
      date: "2025/10/10",
      hours: "100 ساعة",
      image: "/training-business.jpg",
      categoryBg: "#FFF4D6",
      categoryText: "#A56A00",
    },
    {
      id: 3,
      title: "تدريب في مستشفى الشهيد الأزهر",
      category: "خدمات طبية",
      mode: "حضوري",
      location: "غزة - الزيتون",
      date: "2025/10/20",
      hours: "150 ساعة",
      image: "/training-medical.jpg",
      categoryBg: "#E7F8EE",
      categoryText: "#26764A",
    },
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        opportunity.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        opportunity.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "الكل" ||
        opportunity.mode === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

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
      {/* =========================
          SIDEBAR
      ========================== */}
      <Sidebar />

      {/* =========================
          MAIN AREA
      ========================== */}
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
        {/* =========================
            HEADER
        ========================== */}
        <div className="relative shrink-0">
          <Header />

          {/* Breadcrumb */}
          <div
            className="
              absolute
              top-0
              right-[40px]
              h-[72px]
              flex
              items-center
              gap-[8px]
              text-[13px]
              font-medium
            "
          >
            <span className="text-[#64748B]">
              الرئيسية
            </span>

            <span className="text-[#94A3B8]">
              ›
            </span>

            <span className="font-bold text-[#09379A]">
              فرص التدريب
            </span>
          </div>
        </div>

        {/* =========================
            SCROLLABLE CONTENT
        ========================== */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[34px]
            pb-[40px]
          "
        >
          <div className="w-full max-w-[1080px] mx-auto">

            {/* =========================
                PAGE TITLE
            ========================== */}
            <section className="text-right">
              <h1
                className="
                  m-0
                  text-[28px]
                  leading-[40px]
                  font-bold
                  text-[#09379A]
                "
              >
                فرص التدريب
              </h1>

              <p
                className="
                  m-0
                  mt-[4px]
                  text-[15px]
                  leading-[24px]
                  font-normal
                  text-[#475569]
                "
              >
                اكتشف الفرص التدريبية المناسبة لتخصصك وابدأ رحلتك المهنية
              </p>
            </section>

            {/* =========================
                SEARCH + FILTERS
            ========================== */}
            <section
              className="
                mt-[16px]
                w-full
                min-h-[140px]
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                px-[16px]
                py-[15px]
              "
            >
              {/* Search row */}
              <div
                dir="ltr"
                className="
                  w-full
                  flex
                  items-center
                  gap-[14px]
                "
              >
                {/* Filter Button */}
                <button
                  type="button"
                  className="
                    w-[108px]
                    h-[51px]
                    shrink-0
                    rounded-[10px]
                    border
                    border-[#09379A]
                    bg-white
                    text-[#09379A]
                    flex
                    items-center
                    justify-center
                    gap-[10px]
                    text-[14px]
                    font-bold
                    transition
                    hover:bg-[#F5F7FB]
                  "
                >
                  <span>تصفية</span>

                  <SlidersHorizontal
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

                {/* Search */}
                <div
                  dir="rtl"
                  className="
                    flex-1
                    h-[51px]
                    min-w-0
                    rounded-[8px]
                    border
                    border-[#D9E1EC]
                    bg-white
                    flex
                    items-center
                    px-[16px]
                    transition
                    focus-within:border-[#09379A]
                    focus-within:ring-2
                    focus-within:ring-[#09379A]/10
                  "
                >
                  <Search
                    size={20}
                    strokeWidth={1.8}
                    className="
                      shrink-0
                      text-[#64748B]
                    "
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="ابحث عن فرصة تدريب..."
                    className="
                      flex-1
                      min-w-0
                      h-full
                      mr-[10px]
                      border-0
                      outline-none
                      bg-transparent
                      text-[14px]
                      font-normal
                      text-[#1E293B]
                      placeholder:text-[#94A3B8]
                      font-['Cairo']
                    "
                  />
                </div>
              </div>

              {/* Filters */}
              <div
                className="
                  mt-[18px]
                  flex
                  items-center
                  justify-start
                  gap-[7px]
                "
              >
                {filters.map((filter) => {
                  const isActive =
                    activeFilter === filter;

                  return (
                    <button
                      type="button"
                      key={filter}
                      onClick={() =>
                        setActiveFilter(filter)
                      }
                      className={`
                        h-[38px]
                        px-[19px]
                        rounded-[11px]
                        border
                        text-[13px]
                        font-medium
                        transition-all

                        ${
                          isActive
                            ? `
                              border-[#09379A]
                              bg-[#09379A]
                              text-white
                            `
                            : `
                              border-[#E2E8F0]
                              bg-white
                              text-[#475569]
                              hover:border-[#09379A]/40
                              hover:bg-[#F8FAFC]
                            `
                        }
                      `}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =========================
                OPPORTUNITIES
            ========================== */}
            <section
              className="
                mt-[15px]
                flex
                flex-col
                gap-[14px]
              "
            >
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map(
                  (opportunity) => (
                    <article
                      key={opportunity.id}
                      className="
                        group
                        w-full
                        min-h-[146px]
                        rounded-[14px]
                        border
                        border-[#DDE5EF]
                        bg-white
                        px-[23px]
                        py-[23px]
                        flex
                        items-center
                        justify-between
                        transition-all
                        duration-200
                        hover:border-[#09379A]/35
                        hover:shadow-[0_5px_18px_rgba(15,23,42,0.07)]
                      "
                    >
                      {/* =====================
                          INFORMATION SIDE
                      ====================== */}
                      <div
                        className="
                          flex
                          items-center
                          min-w-0
                        "
                      >
                        {/* Image */}
                        <div
                          className="
                            w-[120px]
                            h-[96px]
                            shrink-0
                            rounded-[10px]
                            overflow-hidden
                            bg-[#F5F7FB]
                          "
                        >
                          <img
                            src={opportunity.image}
                            alt={opportunity.title}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />

                          <div
                            className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                              text-[#09379A]
                            "
                          >
                            <BriefcaseBusiness
                              size={30}
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>

                        {/* Details */}
                        <div
                          className="
                            mr-[17px]
                            min-w-0
                            text-right
                          "
                        >
                          <h2
                            className="
                              m-0
                              text-[18px]
                              leading-[27px]
                              font-bold
                              text-[#172033]
                            "
                          >
                            {opportunity.title}
                          </h2>

                          {/* Chips */}
                          <div
                            className="
                              mt-[6px]
                              flex
                              items-center
                              gap-[7px]
                            "
                          >
                            <span
                              style={{
                                backgroundColor:
                                  opportunity.categoryBg,
                                color:
                                  opportunity.categoryText,
                              }}
                              className="
                                min-h-[30px]
                                px-[13px]
                                rounded-[10px]
                                flex
                                items-center
                                text-[12px]
                                font-medium
                              "
                            >
                              {opportunity.category}
                            </span>

                            <span
                              className="
                                min-h-[30px]
                                px-[13px]
                                rounded-[10px]
                                border
                                border-[#E2E8F0]
                                bg-[#F8FAFC]
                                flex
                                items-center
                                text-[12px]
                                font-normal
                                text-[#64748B]
                              "
                            >
                              {opportunity.mode}
                            </span>
                          </div>

                          {/* Metadata */}
                          <div
                            className="
                              mt-[11px]
                              flex
                              items-center
                              gap-[20px]
                              text-[11px]
                              font-normal
                              text-[#6B7280]
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-[5px]
                              "
                            >
                              <MapPin
                                size={15}
                                strokeWidth={1.7}
                              />

                              <span>
                                {opportunity.location}
                              </span>
                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-[5px]
                              "
                            >
                              <CalendarDays
                                size={15}
                                strokeWidth={1.7}
                              />

                              <span dir="ltr">
                                {opportunity.date}
                              </span>
                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-[5px]
                              "
                            >
                              <Clock3
                                size={15}
                                strokeWidth={1.7}
                              />

                              <span>
                                {opportunity.hours}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* =====================
                          DETAILS BUTTON
                      ====================== */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/student/opportunities/details"
                          )
                        }
                        className="
                          w-[145px]
                          h-[46px]
                          shrink-0
                          rounded-[10px]
                          border
                          border-[#09379A]
                          bg-white
                          text-[#09379A]
                          flex
                          items-center
                          justify-center
                          gap-[10px]
                          text-[14px]
                          font-medium
                          transition
                          group-hover:bg-[#F5F7FB]
                          hover:!bg-[#09379A]
                          hover:!text-white
                        "
                      >
                        <span>عرض التفاصيل</span>

                        <ArrowLeft
                          size={18}
                          strokeWidth={1.7}
                        />
                      </button>
                    </article>
                  )
                )
              ) : (
                /* =========================
                    EMPTY STATE
                ========================== */
                <div
                  className="
                    w-full
                    min-h-[250px]
                    rounded-[14px]
                    border
                    border-[#E2E8F0]
                    bg-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-[24px]
                  "
                >
                  <div
                    className="
                      w-[52px]
                      h-[52px]
                      rounded-[12px]
                      bg-[#F5F7FB]
                      flex
                      items-center
                      justify-center
                      text-[#09379A]
                    "
                  >
                    <Search
                      size={24}
                      strokeWidth={1.7}
                    />
                  </div>

                  <h3
                    className="
                      m-0
                      mt-[14px]
                      text-[16px]
                      leading-[24px]
                      font-bold
                      text-[#1E293B]
                    "
                  >
                    لا توجد فرص تدريب مطابقة
                  </h3>

                  <p
                    className="
                      m-0
                      mt-[5px]
                      text-[13px]
                      leading-[20px]
                      font-normal
                      text-[#64748B]
                    "
                  >
                    جرّب تغيير كلمة البحث أو اختيار تصنيف آخر
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("الكل");
                    }}
                    className="
                      mt-[16px]
                      h-[38px]
                      px-[18px]
                      rounded-[9px]
                      border
                      border-[#09379A]
                      bg-white
                      text-[#09379A]
                      text-[13px]
                      font-medium
                      transition
                      hover:bg-[#09379A]
                      hover:text-white
                    "
                  >
                    إعادة ضبط البحث
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}