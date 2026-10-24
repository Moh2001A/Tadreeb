import {
  Bell,
  ChevronDown,
  Menu,
  UserRound,
} from "lucide-react";

export default function Header() {
  const openSidebar = () => {
    window.dispatchEvent(
      new Event("toggle-admin-sidebar")
    );
  };

  return (
    <header
      dir="rtl"
      className="
        relative
        z-20

        flex
        h-[72px]
        w-full
        shrink-0
        items-center
        justify-between

        border-b
        border-[#E9EEF5]

        bg-white

        px-4

        font-['Cairo']

        sm:px-6
        lg:px-[32px]
        xl:px-[40px]
      "
    >
      {/* =====================================================
          RIGHT SIDE
          PAGE / SYSTEM INFO
      ====================================================== */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-[10px]
        "
      >
        {/* MOBILE MENU */}

        <button
          type="button"
          aria-label="فتح القائمة"
          onClick={openSidebar}
          className="
            hidden
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center

            rounded-[9px]

            border
            border-[#E2E8F0]

            bg-white

            text-[#09379A]

            transition-all
            duration-200

            hover:border-[#C8D5E7]
            hover:bg-[#F8FAFC]

            active:scale-[0.97]

            max-lg:flex
          "
        >
          <Menu
            size={22}
            strokeWidth={1.8}
          />
        </button>

        {/* DESKTOP PAGE AREA */}

        <div
          className="
            hidden
            min-w-0
            items-center
            gap-[10px]

            lg:flex
          "
        >
          <div
            className="
              flex
              h-[36px]
              w-[36px]
              shrink-0
              items-center
              justify-center

              rounded-[9px]

              bg-[#EEF3FF]

              text-[#09379A]
            "
          >
            <UserRound
              size={17}
              strokeWidth={1.8}
            />
          </div>

          <div
            className="
              min-w-0
              text-right
            "
          >
            <p
              className="
                m-0

                text-[12px]
                font-bold
                leading-[18px]

                text-[#334155]
              "
            >
              لوحة إدارة النظام
            </p>

            <p
              className="
                m-0
                mt-[1px]

                text-[10px]
                font-medium
                leading-[15px]

                text-[#94A3B8]
              "
            >
              بوابة التدريب الجامعية
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          LEFT SIDE
          USER / NOTIFICATIONS
      ====================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-[8px]
        "
      >
        {/* NOTIFICATION */}

        <button
          type="button"
          aria-label="الإشعارات"
          className="
            relative

            flex
            h-[40px]
            w-[40px]
            shrink-0
            items-center
            justify-center

            rounded-[9px]

            border
            border-transparent

            bg-transparent

            text-[#475569]

            transition-all
            duration-200

            hover:border-[#E2E8F0]
            hover:bg-[#F8FAFC]
            hover:text-[#09379A]

            active:scale-[0.97]
          "
        >
          <Bell
            size={20}
            strokeWidth={1.8}
          />

          <span
            className="
              absolute
              left-[7px]
              top-[6px]

              h-[8px]
              w-[8px]

              rounded-full

              bg-[#FF6B35]

              ring-2
              ring-white
            "
          />
        </button>

        {/* SEPARATOR */}

        <div
          className="
            mx-[4px]

            hidden
            h-[30px]
            w-px

            bg-[#E2E8F0]

            sm:block
          "
        />

        {/* USER */}

        <button
          type="button"
          className="
            group

            flex
            min-h-[48px]
            items-center

            gap-[10px]

            rounded-[10px]

            border-0

            bg-transparent

            px-[5px]
            py-[4px]

            transition-all
            duration-200

            hover:bg-[#F8FAFC]
          "
        >
          {/* AVATAR */}

          <div
            className="
              flex
              h-[40px]
              w-[40px]
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-[#D7E5FF]

              bg-[#EEF3FF]

              text-[12px]
              font-bold
              text-[#09379A]

              transition-all
              duration-200

              group-hover:border-[#BFCFEA]
            "
          >
            أم
          </div>

          {/* USER TEXT */}

          <div
            className="
              hidden
              min-w-0
              text-right

              sm:block
            "
          >
            <p
              className="
                m-0

                whitespace-nowrap

                text-[12px]
                font-bold
                leading-[18px]

                text-[#1E293B]
              "
            >
              أ. أحمد محمد
            </p>

            <p
              className="
                m-0
                mt-[1px]

                whitespace-nowrap

                text-[10px]
                font-medium
                leading-[15px]

                text-[#64748B]
              "
            >
              مدير النظام
            </p>
          </div>

          {/* ARROW */}

          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className="
              hidden
              shrink-0

              text-[#94A3B8]

              transition-transform
              duration-200

              group-hover:text-[#64748B]

              sm:block
            "
          />
        </button>
      </div>
    </header>
  );
}