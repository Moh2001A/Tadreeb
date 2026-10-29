
import {
  Bell,
  Menu,
} from "lucide-react";

export default function Header() {
  const openSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-admin-sidebar")
    );
  };

  return (
    <header
      className="
        h-[72px]
        w-full
        bg-white
        shadow-[0_1px_4px_rgba(0,0,0,0.16)]
        flex
        items-center
        px-4
        sm:px-6
        lg:px-[43px]
        shrink-0
        relative
        z-20
      "
      dir="ltr"
    >
      {/* =========================================
          LEFT SIDE - ADMIN HEADER CONTENT
      ========================================== */}
      <div className="flex items-center min-w-0">
        {/* Avatar */}
        <div
          className="
            w-[40px]
            h-[40px]
            rounded-full
            bg-[#09379A]/10
            border
            border-[#09379A]/20
            flex
            items-center
            justify-center
            text-[#09379A]
            text-[14px]
            font-semibold
            font-['Cairo']
            shrink-0
          "
        >
          سم
        </div>

        {/* Admin Data */}
        <div
          dir="rtl"
          className="
            ml-[16px]
            mr-0
            min-w-[59px]
            text-right
            font-['Cairo']
            shrink-0
          "
        >
          <p
            className="
              m-0
              text-[14px]
              leading-[18px]
              font-semibold
              text-[#1E293B]
              whitespace-nowrap
            "
          >
            د. سامر يوسف
          </p>

          <p
            className="
              m-0
              mt-[2px]
              text-[12px]
              leading-[14px]
              font-normal
              text-[#64748B]
            "
          >
            مشرف أكاديمي
          </p>
        </div>

        {/* Separator */}
        <div
          className="
            w-px
            h-[32px]
            bg-[#E2E8F0]
            ml-[16px]
            mr-[15px]
            shrink-0
          "
        />

        {/* Notification */}
        <button
          type="button"
          aria-label="الإشعارات"
          className="
            relative
            w-[40px]
            h-[40px]
            rounded-[8px]
            flex
            items-center
            justify-center
            text-[#475569]
            transition
            hover:bg-[#F8FAFC]
            hover:text-[#09379A]
            shrink-0
          "
        >
          <Bell
            size={20}
            strokeWidth={1.8}
          />

          <span
            className="
              absolute
              top-[8px]
              left-[8px]
              w-[8px]
              h-[8px]
              rounded-full
              bg-[#FF6B35]
              ring-2
              ring-white
            "
          />
        </button>
      </div>

      {/* =========================================
          MOBILE MENU BUTTON
      ========================================== */}
      <button
        type="button"
        aria-label="فتح القائمة"
        onClick={openSidebar}
        className="
          ml-auto
          w-[42px]
          h-[42px]
          rounded-[9px]
          border
          border-[#E2E8F0]
          bg-white
          text-[#09379A]
          hidden
          max-lg:flex
          items-center
          justify-center
          shrink-0
          cursor-pointer
          transition
          hover:bg-[#F8FAFC]
          hover:border-[#C8D5E7]
          active:scale-[0.97]
        "
      >
        <Menu
          size={22}
          strokeWidth={1.8}
        />
      </button>
    </header>
  );
}
