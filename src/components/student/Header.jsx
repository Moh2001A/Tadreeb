import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        h-[72px]
        w-full
        bg-white
        shadow-[0_1px_4px_rgba(0,0,0,0.16)]
        flex
        items-center
        px-[43px]
        shrink-0
        relative
        z-20
      "
      dir="ltr"
    >
      <div className="flex items-center">
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
          أح
        </div>

        {/* Student Data */}
        <div
          dir="rtl"
          className="
            mr-[12px]
            min-w-[59px]
            text-right
            font-['Cairo']
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
            أمل أحمد
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
            طالبة
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
          "
        >
          <Bell size={20} strokeWidth={1.8} />

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
    </header>
  );
}