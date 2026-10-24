import { useMemo, useState } from "react";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  Megaphone,
  Pin,
  PinOff,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Announcements() {
  /* =========================================================
     STATE
  ========================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [audienceFilter, setAudienceFilter] =
    useState("الكل");

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const [showAnnouncementModal, setShowAnnouncementModal] =
    useState(false);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState(null);

  /* =========================================================
     ANNOUNCEMENTS
  ========================================================= */

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,

      title: "بدء التسجيل لفترة التدريب الميداني",

      content:
        "تم فتح باب التسجيل لفترة التدريب الميداني للفصل الأول 2026/2027. يرجى من الطلبة المؤهلين تقديم الطلبات قبل انتهاء الموعد المحدد.",

      audience: "الطلبة",

      status: "منشور",

      publishDate: "2026/10/24",

      publishTime: "09:00",

      author: "مدير النظام",

      pinned: true,

      views: 418,

      priority: "مهم",
    },

    {
      id: 2,

      title: "تذكير بتسليم التقارير النهائية",

      content:
        "يرجى من الطلبة الذين أتموا الساعات المطلوبة رفع التقرير النهائي ومتابعة اعتماده من المشرف الأكاديمي.",

      audience: "طلبة التدريب الميداني",

      status: "منشور",

      publishDate: "2026/10/23",

      publishTime: "12:30",

      author: "إدارة التدريب",

      pinned: false,

      views: 286,

      priority: "عادي",
    },

    {
      id: 3,

      title: "موعد دورة الإنعاش القلبي الرئوي",

      content:
        "سيتم عقد دورة الإنعاش القلبي الرئوي CPR يوم الأحد القادم في قاعة التدريب الرئيسية، ويطلب من المقبولين الحضور قبل الموعد بنصف ساعة.",

      audience: "متدربو الدورات",

      status: "مجدول",

      publishDate: "2026/10/27",

      publishTime: "08:00",

      author: "منسق الدورات",

      pinned: false,

      views: 0,

      priority: "مهم",
    },

    {
      id: 4,

      title: "تحديث بيانات جهات التدريب",

      content:
        "نرجو من منسقي التدريب مراجعة بيانات الجهات المعتمدة وتحديث بيانات التواصل والطاقة الاستيعابية قبل بدء التوزيع الجديد.",

      audience: "منسقو التدريب",

      status: "مسودة",

      publishDate: "2026/10/25",

      publishTime: "10:00",

      author: "مدير النظام",

      pinned: false,

      views: 0,

      priority: "عادي",
    },

    {
      id: 5,

      title: "تعليمات المشرفين الأكاديميين",

      content:
        "تم تحديث تعليمات الزيارات الميدانية وآلية اعتماد تقارير الزيارة. يرجى الاطلاع على التعليمات قبل تسجيل أي زيارة جديدة.",

      audience: "المشرفون الأكاديميون",

      status: "منشور",

      publishDate: "2026/10/21",

      publishTime: "11:15",

      author: "إدارة التدريب",

      pinned: true,

      views: 124,

      priority: "مهم",
    },
  ]);

  /* =========================================================
     FILTERED DATA
  ========================================================= */

  const filteredAnnouncements = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return announcements.filter((item) => {
      const matchesSearch =
        !query ||
        item.title
          .toLowerCase()
          .includes(query) ||
        item.content
          .toLowerCase()
          .includes(query) ||
        item.author
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "الكل" ||
        item.status === statusFilter;

      const matchesAudience =
        audienceFilter === "الكل" ||
        item.audience === audienceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAudience
      );
    });
  }, [
    announcements,
    search,
    statusFilter,
    audienceFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const published =
      announcements.filter(
        (item) =>
          item.status === "منشور"
      ).length;

    const scheduled =
      announcements.filter(
        (item) =>
          item.status === "مجدول"
      ).length;

    const drafts =
      announcements.filter(
        (item) =>
          item.status === "مسودة"
      ).length;

    const totalViews =
      announcements.reduce(
        (total, item) =>
          total + item.views,
        0
      );

    return {
      total: announcements.length,
      published,
      scheduled,
      drafts,
      totalViews,
    };
  }, [announcements]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const openAddModal = () => {
    setEditingAnnouncement(null);
    setShowAnnouncementModal(true);
  };

  const openEditModal = (announcement) => {
    setEditingAnnouncement(
      announcement
    );

    setShowAnnouncementModal(true);
  };

  const saveAnnouncement = (
    data
  ) => {
    if (editingAnnouncement) {
      setAnnouncements(
        (previous) =>
          previous.map(
            (announcement) =>
              announcement.id ===
              editingAnnouncement.id
                ? {
                    ...announcement,
                    ...data,
                  }
                : announcement
          )
      );

      setSelectedAnnouncement(
        (previous) =>
          previous?.id ===
          editingAnnouncement.id
            ? {
                ...previous,
                ...data,
              }
            : previous
      );
    } else {
      setAnnouncements(
        (previous) => [
          {
            id:
              Math.max(
                ...previous.map(
                  (item) => item.id
                ),
                0
              ) + 1,

            ...data,

            author:
              "مدير النظام",

            views: 0,
          },

          ...previous,
        ]
      );
    }

    setShowAnnouncementModal(
      false
    );

    setEditingAnnouncement(
      null
    );
  };

  const deleteAnnouncement = (
    id
  ) => {
    setAnnouncements(
      (previous) =>
        previous.filter(
          (item) => item.id !== id
        )
    );

    setSelectedAnnouncement(
      null
    );
  };

  const togglePinned = (id) => {
    setAnnouncements(
      (previous) =>
        previous.map(
          (announcement) =>
            announcement.id === id
              ? {
                  ...announcement,

                  pinned:
                    !announcement.pinned,
                }
              : announcement
        )
    );

    setSelectedAnnouncement(
      (previous) => {
        if (
          !previous ||
          previous.id !== id
        ) {
          return previous;
        }

        return {
          ...previous,

          pinned:
            !previous.pinned,
        };
      }
    );
  };

  const publishNow = (id) => {
    setAnnouncements(
      (previous) =>
        previous.map(
          (announcement) =>
            announcement.id === id
              ? {
                  ...announcement,

                  status: "منشور",

                  publishDate:
                    "2026/10/24",

                  publishTime:
                    "22:30",
                }
              : announcement
        )
    );

    setSelectedAnnouncement(
      (previous) => {
        if (
          !previous ||
          previous.id !== id
        ) {
          return previous;
        }

        return {
          ...previous,

          status: "منشور",

          publishDate:
            "2026/10/24",

          publishTime:
            "22:30",
        };
      }
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("الكل");
    setAudienceFilter("الكل");
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "منشور":
        return `
          border-[#BBF7D0]
          bg-[#ECFDF3]
          text-[#15803D]
        `;

      case "مجدول":
        return `
          border-[#D7E5FF]
          bg-[#EEF4FF]
          text-[#09379A]
        `;

      case "مسودة":
        return `
          border-[#E2E8F0]
          bg-[#F8FAFC]
          text-[#64748B]
        `;

      default:
        return `
          border-[#E2E8F0]
          bg-[#F8FAFC]
          text-[#64748B]
        `;
    }
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
                    الإعلانات والإشعارات
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
                  الإعلانات والإشعارات
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
                  نشر وإدارة الإعلانات
                  الموجهة للطلبة
                  والمشرفين ومنسقي
                  التدريب ومتابعة حالة
                  النشر.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="
                  flex
                  h-[40px]
                  w-fit
                  items-center
                  justify-center
                  gap-[7px]
                  rounded-[9px]
                  border-0
                  bg-[#09379A]
                  px-[15px]
                  text-[9px]
                  font-bold
                  text-white
                  transition

                  hover:bg-[#072E81]
                "
              >
                <Plus size={15} />

                إعلان جديد
              </button>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <section
              className="
                mt-[20px]
                grid
                grid-cols-2
                gap-[10px]

                md:grid-cols-5
              "
            >
              <StatCard
                title="الإجمالي"
                value={stats.total}
                icon={Megaphone}
                iconClass="bg-[#EEF3FF] text-[#09379A]"
              />

              <StatCard
                title="منشورة"
                value={
                  stats.published
                }
                icon={CheckCircle2}
                iconClass="bg-[#ECFDF3] text-[#15803D]"
              />

              <StatCard
                title="مجدولة"
                value={
                  stats.scheduled
                }
                icon={Clock3}
                iconClass="bg-[#EEF4FF] text-[#09379A]"
              />

              <StatCard
                title="مسودات"
                value={stats.drafts}
                icon={Edit3}
                iconClass="bg-[#F1F5F9] text-[#64748B]"
              />

              <StatCard
                title="المشاهدات"
                value={
                  stats.totalViews
                }
                icon={Eye}
                iconClass="bg-[#FFF7E6] text-[#C65D00]"
              />
            </section>

            {/* =================================================
                FILTERS
            ================================================== */}

            <section
              className="
                mt-[17px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[15px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  lg:grid-cols-[minmax(0,1fr)_180px_190px_auto]
                  lg:items-end
                "
              >
                <div>
                  <label
                    className="
                      mb-[5px]
                      block
                      text-[9px]
                      font-bold
                      text-[#64748B]
                    "
                  >
                    البحث
                  </label>

                  <div
                    className="
                      flex
                      h-[40px]
                      items-center
                      gap-[8px]
                      rounded-[9px]
                      border
                      border-[#DCE5F0]
                      bg-white
                      px-[11px]
                    "
                  >
                    <Search
                      size={15}
                      className="text-[#94A3B8]"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(
                        event
                      ) =>
                        setSearch(
                          event.target
                            .value
                        )
                      }
                      placeholder="عنوان الإعلان أو محتواه..."
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
                  </div>
                </div>

                <FilterSelect
                  label="الحالة"
                  value={
                    statusFilter
                  }
                  onChange={
                    setStatusFilter
                  }
                  options={[
                    "الكل",
                    "منشور",
                    "مجدول",
                    "مسودة",
                  ]}
                />

                <FilterSelect
                  label="الجمهور"
                  value={
                    audienceFilter
                  }
                  onChange={
                    setAudienceFilter
                  }
                  options={[
                    "الكل",
                    "جميع المستخدمين",
                    "الطلبة",
                    "طلبة التدريب الميداني",
                    "متدربو الدورات",
                    "منسقو التدريب",
                    "المشرفون الأكاديميون",
                    "المشرفون الميدانيون",
                  ]}
                />

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="
                    h-[40px]
                    rounded-[9px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[13px]
                    text-[8px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  إعادة تعيين
                </button>
              </div>
            </section>

            {/* =================================================
                ANNOUNCEMENTS
            ================================================== */}

            <section
              className="
                mt-[16px]
                grid
                grid-cols-1
                gap-[11px]
              "
            >
              {filteredAnnouncements.map(
                (announcement) => (
                  <article
                    key={
                      announcement.id
                    }
                    className="
                      rounded-[14px]
                      border
                      border-[#DDE5EF]
                      bg-white
                      p-[15px]
                      shadow-[0_1px_2px_rgba(15,23,42,0.03)]

                      sm:p-[17px]
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-4

                        md:flex-row
                        md:items-start
                        md:justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          items-start
                          gap-[11px]
                        "
                      >
                        <div
                          className={`
                            flex
                            h-[40px]
                            w-[40px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-[10px]

                            ${
                              announcement.priority ===
                              "مهم"
                                ? "bg-[#FFF3EB] text-[#EA580C]"
                                : "bg-[#EEF3FF] text-[#09379A]"
                            }
                          `}
                        >
                          <Megaphone
                            size={18}
                            strokeWidth={
                              1.8
                            }
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              gap-[6px]
                            "
                          >
                            <h2
                              className="
                                m-0
                                text-[12px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {
                                announcement.title
                              }
                            </h2>

                            {announcement.pinned && (
                              <span
                                className="
                                  flex
                                  items-center
                                  gap-[3px]
                                  rounded-full
                                  bg-[#FFF7E6]
                                  px-[7px]
                                  py-[3px]
                                  text-[7px]
                                  font-bold
                                  text-[#C65D00]
                                "
                              >
                                <Pin
                                  size={10}
                                />

                                مثبت
                              </span>
                            )}

                            {announcement.priority ===
                              "مهم" && (
                              <span
                                className="
                                  rounded-full
                                  bg-[#FFF1F2]
                                  px-[7px]
                                  py-[3px]
                                  text-[7px]
                                  font-bold
                                  text-[#BE123C]
                                "
                              >
                                مهم
                              </span>
                            )}
                          </div>

                          <p
                            className="
                              m-0
                              mt-[6px]
                              max-w-[780px]
                              text-[9px]
                              leading-[19px]
                              text-[#64748B]
                            "
                          >
                            {
                              announcement.content
                            }
                          </p>

                          <div
                            className="
                              mt-[10px]
                              flex
                              flex-wrap
                              items-center
                              gap-x-[14px]
                              gap-y-[6px]
                            "
                          >
                            <MetaItem
                              icon={Users}
                              value={
                                announcement.audience
                              }
                            />

                            <MetaItem
                              icon={
                                CalendarDays
                              }
                              value={`${announcement.publishDate} - ${announcement.publishTime}`}
                            />

                            <MetaItem
                              icon={Eye}
                              value={`${announcement.views} مشاهدة`}
                            />

                            <span
                              className="
                                text-[8px]
                                text-[#94A3B8]
                              "
                            >
                              بواسطة{" "}
                              {
                                announcement.author
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                          flex
                          shrink-0
                          flex-wrap
                          items-center
                          gap-[6px]
                        "
                      >
                        <StatusBadge
                          status={
                            announcement.status
                          }
                          getStatusStyle={
                            getStatusStyle
                          }
                        />

                        <IconButton
                          title="عرض التفاصيل"
                          onClick={() =>
                            setSelectedAnnouncement(
                              announcement
                            )
                          }
                        >
                          <Eye
                            size={14}
                          />
                        </IconButton>

                        <IconButton
                          title="تعديل الإعلان"
                          onClick={() =>
                            openEditModal(
                              announcement
                            )
                          }
                        >
                          <Edit3
                            size={14}
                          />
                        </IconButton>

                        <IconButton
                          title={
                            announcement.pinned
                              ? "إلغاء التثبيت"
                              : "تثبيت الإعلان"
                          }
                          onClick={() =>
                            togglePinned(
                              announcement.id
                            )
                          }
                        >
                          {announcement.pinned ? (
                            <PinOff
                              size={14}
                            />
                          ) : (
                            <Pin
                              size={14}
                            />
                          )}
                        </IconButton>
                      </div>
                    </div>

                    {announcement.status !==
                      "منشور" && (
                      <div
                        className="
                          mt-[13px]
                          flex
                          justify-end
                          border-t
                          border-[#EEF2F7]
                          pt-[11px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            publishNow(
                              announcement.id
                            )
                          }
                          className="
                            flex
                            h-[34px]
                            items-center
                            gap-[5px]
                            rounded-[8px]
                            border-0
                            bg-[#09379A]
                            px-[11px]
                            text-[8px]
                            font-bold
                            text-white
                          "
                        >
                          <Send
                            size={13}
                          />

                          نشر الآن
                        </button>
                      </div>
                    )}
                  </article>
                )
              )}

              {filteredAnnouncements.length ===
                0 && (
                <EmptyState
                  onReset={
                    resetFilters
                  }
                />
              )}
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          DETAILS DRAWER
      ====================================================== */}

      {selectedAnnouncement && (
        <>
          <button
            type="button"
            aria-label="إغلاق التفاصيل"
            onClick={() =>
              setSelectedAnnouncement(
                null
              )
            }
            className="
              fixed
              inset-0
              z-[80]
              border-0
              bg-[#0F172A]/30
            "
          />

          <aside
            dir="rtl"
            className="
              fixed
              bottom-0
              left-0
              top-0
              z-[90]
              w-full
              max-w-[430px]
              overflow-y-auto
              bg-white
              shadow-[12px_0_35px_rgba(15,23,42,0.12)]
            "
          >
            <div
              className="
                flex
                min-h-[72px]
                items-center
                justify-between
                border-b
                border-[#E2E8F0]
                px-[18px]
              "
            >
              <div>
                <h2
                  className="
                    m-0
                    text-[15px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  تفاصيل الإعلان
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  إعلان رقم ANN-
                  {String(
                    selectedAnnouncement.id
                  ).padStart(
                    3,
                    "0"
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(
                    null
                  )
                }
                className="
                  flex
                  h-[34px]
                  w-[34px]
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  text-[#64748B]
                "
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-[18px]">
              <div
                className="
                  rounded-[12px]
                  border
                  border-[#D7E5FF]
                  bg-[#F6F9FF]
                  p-[14px]
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
                  <div
                    className="
                      flex
                      h-[40px]
                      w-[40px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]
                      bg-white
                      text-[#09379A]
                    "
                  >
                    <Megaphone
                      size={18}
                    />
                  </div>

                  <StatusBadge
                    status={
                      selectedAnnouncement.status
                    }
                    getStatusStyle={
                      getStatusStyle
                    }
                  />
                </div>

                <h3
                  className="
                    m-0
                    mt-[11px]
                    text-[13px]
                    font-bold
                    leading-[21px]
                    text-[#1E293B]
                  "
                >
                  {
                    selectedAnnouncement.title
                  }
                </h3>

                <p
                  className="
                    m-0
                    mt-[7px]
                    text-[9px]
                    leading-[19px]
                    text-[#64748B]
                  "
                >
                  {
                    selectedAnnouncement.content
                  }
                </p>
              </div>

              <div
                className="
                  mt-[13px]
                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <DetailBox
                  label="الجمهور"
                  value={
                    selectedAnnouncement.audience
                  }
                />

                <DetailBox
                  label="الأولوية"
                  value={
                    selectedAnnouncement.priority
                  }
                />

                <DetailBox
                  label="تاريخ النشر"
                  value={
                    selectedAnnouncement.publishDate
                  }
                />

                <DetailBox
                  label="وقت النشر"
                  value={
                    selectedAnnouncement.publishTime
                  }
                />

                <DetailBox
                  label="بواسطة"
                  value={
                    selectedAnnouncement.author
                  }
                />

                <DetailBox
                  label="المشاهدات"
                  value={`${selectedAnnouncement.views}`}
                />
              </div>

              <div
                className="
                  mt-[15px]
                  flex
                  flex-wrap
                  gap-[7px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    openEditModal(
                      selectedAnnouncement
                    )
                  }
                  className="
                    flex
                    h-[38px]
                    flex-1
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border-0
                    bg-[#09379A]
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  <Edit3
                    size={14}
                  />

                  تعديل الإعلان
                </button>

                <button
                  type="button"
                  onClick={() =>
                    togglePinned(
                      selectedAnnouncement.id
                    )
                  }
                  className="
                    flex
                    h-[38px]
                    flex-1
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    text-[8px]
                    font-bold
                    text-[#475569]
                  "
                >
                  {selectedAnnouncement.pinned ? (
                    <>
                      <PinOff
                        size={14}
                      />

                      إلغاء التثبيت
                    </>
                  ) : (
                    <>
                      <Pin
                        size={14}
                      />

                      تثبيت الإعلان
                    </>
                  )}
                </button>

                {selectedAnnouncement.status !==
                  "منشور" && (
                  <button
                    type="button"
                    onClick={() =>
                      publishNow(
                        selectedAnnouncement.id
                      )
                    }
                    className="
                      flex
                      h-[38px]
                      w-full
                      items-center
                      justify-center
                      gap-[6px]
                      rounded-[8px]
                      border
                      border-[#BBF7D0]
                      bg-[#ECFDF3]
                      text-[8px]
                      font-bold
                      text-[#15803D]
                    "
                  >
                    <Send
                      size={14}
                    />

                    نشر الآن
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteAnnouncement(
                      selectedAnnouncement.id
                    )
                  }
                  className="
                    flex
                    h-[38px]
                    w-full
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border
                    border-[#FECDD3]
                    bg-[#FFF1F2]
                    text-[8px]
                    font-bold
                    text-[#BE123C]
                  "
                >
                  <Trash2
                    size={14}
                  />

                  حذف الإعلان
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {showAnnouncementModal && (
        <AnnouncementModal
          announcement={
            editingAnnouncement
          }
          onClose={() => {
            setShowAnnouncementModal(
              false
            );

            setEditingAnnouncement(
              null
            );
          }}
          onSave={
            saveAnnouncement
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function AnnouncementModal({
  announcement,
  onClose,
  onSave,
}) {
  const [form, setForm] =
    useState({
      title:
        announcement?.title ||
        "",

      content:
        announcement?.content ||
        "",

      audience:
        announcement?.audience ||
        "جميع المستخدمين",

      status:
        announcement?.status ||
        "مسودة",

      publishDate:
        announcement?.publishDate ||
        "2026/10/24",

      publishTime:
        announcement?.publishTime ||
        "09:00",

      priority:
        announcement?.priority ||
        "عادي",

      pinned:
        announcement?.pinned ||
        false,
    });

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  };

  const handleSave = () => {
    if (
      !form.title.trim() ||
      !form.content.trim()
    ) {
      return;
    }

    onSave(form);
  };

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
          max-w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[14px]
          bg-white
          shadow-[0_24px_70px_rgba(15,23,42,0.18)]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E2E8F0]
            px-[18px]
            py-[14px]
          "
        >
          <div>
            <h2
              className="
                m-0
                text-[15px]
                font-bold
                text-[#1E293B]
              "
            >
              {announcement
                ? "تعديل الإعلان"
                : "إعلان جديد"}
            </h2>

            <p
              className="
                m-0
                mt-[2px]
                text-[8px]
                text-[#94A3B8]
              "
            >
              إعداد محتوى الإعلان
              والجمهور ووقت النشر
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
              border
              border-[#E2E8F0]
              bg-white
              text-[#64748B]
            "
          >
            <X size={15} />
          </button>
        </div>

        <div
          className="
            max-h-[70vh]
            overflow-y-auto
            p-[18px]
          "
        >
          <FormInput
            label="عنوان الإعلان"
            value={form.title}
            onChange={(value) =>
              updateField(
                "title",
                value
              )
            }
            placeholder="عنوان واضح ومختصر"
          />

          <div className="mt-[11px]">
            <label
              className="
                mb-[5px]
                block
                text-[9px]
                font-bold
                text-[#64748B]
              "
            >
              محتوى الإعلان
            </label>

            <textarea
              rows={5}
              value={form.content}
              onChange={(event) =>
                updateField(
                  "content",
                  event.target.value
                )
              }
              placeholder="اكتب نص الإعلان..."
              className="
                w-full
                resize-none
                rounded-[9px]
                border
                border-[#DCE5F0]
                bg-white
                px-[11px]
                py-[9px]
                text-[9px]
                leading-[18px]
                text-[#475569]
                outline-none
                placeholder:text-[#94A3B8]
              "
            />
          </div>

          <div
            className="
              mt-[11px]
              grid
              grid-cols-1
              gap-[10px]

              sm:grid-cols-2
            "
          >
            <FormSelect
              label="الجمهور"
              value={form.audience}
              onChange={(value) =>
                updateField(
                  "audience",
                  value
                )
              }
              options={[
                "جميع المستخدمين",
                "الطلبة",
                "طلبة التدريب الميداني",
                "متدربو الدورات",
                "منسقو التدريب",
                "المشرفون الأكاديميون",
                "المشرفون الميدانيون",
              ]}
            />

            <FormSelect
              label="الأولوية"
              value={form.priority}
              onChange={(value) =>
                updateField(
                  "priority",
                  value
                )
              }
              options={[
                "عادي",
                "مهم",
              ]}
            />

            <FormSelect
              label="حالة النشر"
              value={form.status}
              onChange={(value) =>
                updateField(
                  "status",
                  value
                )
              }
              options={[
                "مسودة",
                "مجدول",
                "منشور",
              ]}
            />

            <FormInput
              label="تاريخ النشر"
              value={
                form.publishDate
              }
              onChange={(value) =>
                updateField(
                  "publishDate",
                  value
                )
              }
              placeholder="2026/10/24"
            />

            <FormInput
              label="وقت النشر"
              value={
                form.publishTime
              }
              onChange={(value) =>
                updateField(
                  "publishTime",
                  value
                )
              }
              placeholder="09:00"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              updateField(
                "pinned",
                !form.pinned
              )
            }
            className="
              mt-[12px]
              flex
              w-full
              items-center
              justify-between
              rounded-[9px]
              border
              border-[#E2E8F0]
              bg-[#F8FAFC]
              px-[12px]
              py-[10px]
              text-right
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
                تثبيت الإعلان
              </p>

              <p
                className="
                  m-0
                  mt-[2px]
                  text-[8px]
                  text-[#94A3B8]
                "
              >
                يظهر الإعلان في أعلى
                قائمة الإعلانات.
              </p>
            </div>

            <span
              className={`
                relative
                block
                h-[22px]
                w-[40px]
                shrink-0
                rounded-full
                transition

                ${
                  form.pinned
                    ? "bg-[#09379A]"
                    : "bg-[#CBD5E1]"
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
                  transition

                  ${
                    form.pinned
                      ? "right-[21px]"
                      : "right-[3px]"
                  }
                `}
              />
            </span>
          </button>
        </div>

        <div
          className="
            flex
            justify-end
            gap-[7px]
            border-t
            border-[#E2E8F0]
            px-[18px]
            py-[13px]
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-[37px]
              rounded-[8px]
              border
              border-[#DCE5F0]
              bg-white
              px-[14px]
              text-[8px]
              font-bold
              text-[#64748B]
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              flex
              h-[37px]
              items-center
              gap-[5px]
              rounded-[8px]
              border-0
              bg-[#09379A]
              px-[14px]
              text-[8px]
              font-bold
              text-white
            "
          >
            <Bell size={14} />

            {announcement
              ? "حفظ التعديلات"
              : "حفظ الإعلان"}
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({
  icon: Icon,
  value,
}) {
  return (
    <span
      className="
        flex
        items-center
        gap-[4px]
        text-[8px]
        text-[#94A3B8]
      "
    >
      <Icon size={11} />

      {value}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-[12px]
        border
        border-[#DDE5EF]
        bg-white
        p-[13px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              m-0
              text-[8px]
              font-medium
              text-[#64748B]
            "
          >
            {title}
          </p>

          <strong
            className="
              mt-[4px]
              block
              text-[21px]
              font-bold
              text-[#14213D]
            "
          >
            {value}
          </strong>
        </div>

        <div
          className={`
            flex
            h-[34px]
            w-[34px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]

            ${iconClass}
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
  getStatusStyle,
}) {
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
        text-[8px]
        font-bold

        ${getStatusStyle(status)}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   ICON BUTTON
========================================================= */

function IconButton({
  title,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="
        flex
        h-[31px]
        w-[31px]
        shrink-0
        items-center
        justify-center
        rounded-[7px]
        border
        border-[#DCE5F0]
        bg-white
        text-[#64748B]
        transition

        hover:border-[#B7C8E4]
        hover:bg-[#F8FAFC]
        hover:text-[#09379A]
      "
    >
      {children}
    </button>
  );
}

/* =========================================================
   FILTER
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        className="
          mb-[5px]
          block
          text-[9px]
          font-bold
          text-[#64748B]
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[40px]
          w-full
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[10px]
          text-[9px]
          font-medium
          text-[#475569]
          outline-none
        "
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[9px]
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        p-[11px]
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
          leading-[17px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label
        className="
          mb-[5px]
          block
          text-[9px]
          font-bold
          text-[#64748B]
        "
      >
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          h-[39px]
          w-full
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[10px]
          text-[9px]
          text-[#475569]
          outline-none
          placeholder:text-[#94A3B8]
        "
      />
    </div>
  );
}

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        className="
          mb-[5px]
          block
          text-[9px]
          font-bold
          text-[#64748B]
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[39px]
          w-full
          rounded-[9px]
          border
          border-[#DCE5F0]
          bg-white
          px-[10px]
          text-[9px]
          text-[#475569]
          outline-none
        "
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  onReset,
}) {
  return (
    <div
      className="
        flex
        min-h-[250px]
        flex-col
        items-center
        justify-center
        rounded-[14px]
        border
        border-[#DDE5EF]
        bg-white
        px-5
        py-10
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
          rounded-[12px]
          bg-[#F1F5F9]
          text-[#64748B]
        "
      >
        <Megaphone size={20} />
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
        لا توجد إعلانات مطابقة
      </h3>

      <p
        className="
          m-0
          mt-[3px]
          text-[8px]
          text-[#94A3B8]
        "
      >
        غيّر البحث أو الفلاتر الحالية.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="
          mt-[11px]
          h-[34px]
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
        عرض جميع الإعلانات
      </button>
    </div>
  );
}