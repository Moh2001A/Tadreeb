import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  Eye,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserRound,
  UserRoundX,
  Users as UsersIcon,
  X,
} from "lucide-react";

import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function Users() {
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [showUserModal, setShowUserModal] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  /* =========================================================
     USERS
  ========================================================= */

  const [users, setUsers] = useState([
    {
      id: 1,

      name: "أحمد محمد علي",

      code: "ADM-001",

      email: "ahmed.admin@azhar.edu.ps",

      phone: "0599123456",

      role: "مدير النظام",

      entity: "إدارة التدريب",

      type: "إداري",

      status: "نشط",

      lastLogin: "2026/10/24 - 21:35",

      joinedAt: "2024/09/01",

      description:
        "مسؤول عن الإدارة العامة للنظام ومتابعة عمليات التدريب.",
    },

    {
      id: 2,

      name: "د. سامر يوسف",

      code: "SUP-018",

      email: "samer.yousef@azhar.edu.ps",

      phone: "0599301122",

      role: "مشرف أكاديمي",

      entity:
        "كلية الهندسة وتكنولوجيا المعلومات",

      type: "أكاديمي",

      status: "نشط",

      lastLogin: "2026/10/24 - 18:20",

      joinedAt: "2025/02/10",

      description:
        "مشرف أكاديمي لطلبة هندسة البرمجيات ونظم المعلومات.",
    },

    {
      id: 3,

      name: "د. سارة خليل",

      code: "SUP-027",

      email: "sara.khalil@azhar.edu.ps",

      phone: "0599211085",

      role: "مشرف أكاديمي",

      entity:
        "كلية العلوم الطبية التطبيقية",

      type: "أكاديمي",

      status: "نشط",

      lastLogin: "2026/10/24 - 16:44",

      joinedAt: "2025/05/18",

      description:
        "مشرفة التدريب السريري لطلبة التمريض.",
    },

    {
      id: 4,

      name: "أ. محمود حسن",

      code: "FLD-014",

      email: "mahmoud.hassan@shifa.ps",

      phone: "0599457712",

      role: "مشرف ميداني",

      entity: "مستشفى الشفاء",

      type: "جهة تدريب",

      status: "نشط",

      lastLogin: "2026/10/23 - 13:21",

      joinedAt: "2025/08/01",

      description:
        "مشرف ميداني مسؤول عن متابعة طلبة التدريب السريري.",
    },

    {
      id: 5,

      name: "د. ليلى أحمد",

      code: "COO-004",

      email: "laila.ahmad@azhar.edu.ps",

      phone: "0599071453",

      role: "منسق تدريب",

      entity:
        "كلية الاقتصاد والعلوم الإدارية",

      type: "أكاديمي",

      status: "نشط",

      lastLogin: "2026/10/23 - 11:08",

      joinedAt: "2024/10/15",

      description:
        "منسقة التدريب الميداني لطلبة كلية الاقتصاد.",
    },

    {
      id: 6,

      name: "م. خالد يوسف",

      code: "FLD-021",

      email: "khaled.yousef@paltel.ps",

      phone: "0599400211",

      role: "مشرف ميداني",

      entity:
        "شركة الاتصالات الفلسطينية",

      type: "جهة تدريب",

      status: "معطل",

      lastLogin: "2026/09/30 - 09:15",

      joinedAt: "2025/09/12",

      description:
        "حساب مشرف ميداني تم تعطيله مؤقتًا.",
    },

    {
      id: 7,

      name: "أ. رامي حسن",

      code: "FLD-026",

      email: "rami.hassan@bank.ps",

      phone: "0599318820",

      role: "مشرف ميداني",

      entity: "بنك فلسطين",

      type: "جهة تدريب",

      status: "نشط",

      lastLogin: "2026/10/22 - 15:30",

      joinedAt: "2026/01/05",

      description:
        "مشرف ميداني للطلبة المتدربين في بنك فلسطين.",
    },
  ]);

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredUsers = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        user.code
          .toLowerCase()
          .includes(normalizedSearch) ||
        user.email
          .toLowerCase()
          .includes(normalizedSearch) ||
        user.entity
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesRole =
        roleFilter === "الكل" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "الكل" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const active = users.filter(
      (user) => user.status === "نشط"
    ).length;

    const disabled = users.filter(
      (user) => user.status === "معطل"
    ).length;

    const academic = users.filter(
      (user) =>
        user.type === "أكاديمي"
    ).length;

    return {
      total: users.length,
      active,
      disabled,
      academic,
    };
  }, [users]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const toggleUserStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "نشط"
                  ? "معطل"
                  : "نشط",
            }
          : user
      )
    );

    setSelectedUser((previous) => {
      if (
        !previous ||
        previous.id !== id
      ) {
        return previous;
      }

      return {
        ...previous,
        status:
          previous.status === "نشط"
            ? "معطل"
            : "نشط",
      };
    });
  };

  const openAddUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const openEditUser = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const saveUser = (data) => {
    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...data,
              }
            : user
        )
      );

      setSelectedUser((previous) =>
        previous?.id === editingUser.id
          ? {
              ...previous,
              ...data,
            }
          : previous
      );
    } else {
      setUsers((previous) => [
        {
          id:
            Math.max(
              ...previous.map(
                (item) => item.id
              ),
              0
            ) + 1,

          ...data,

          code: `USR-${String(
            previous.length + 1
          ).padStart(3, "0")}`,

          status: "نشط",

          lastLogin: "لم يسجل الدخول بعد",

          joinedAt: "2026/10/24",

          description:
            "حساب مستخدم جديد في نظام التدريب الجامعي.",
        },

        ...previous,
      ]);
    }

    setShowUserModal(false);
    setEditingUser(null);
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("الكل");
    setStatusFilter("الكل");
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
                  <span>الرئيسية</span>

                  <span>/</span>

                  <span>
                    الإدارة العامة
                  </span>

                  <span>/</span>

                  <span className="text-[#64748B]">
                    المستخدمون
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
                  إدارة المستخدمين
                </h1>

                <p
                  className="
                    m-0
                    mt-[4px]
                    max-w-[680px]
                    text-[11px]
                    leading-[20px]
                    text-[#64748B]
                  "
                >
                  إدارة حسابات موظفي النظام
                  والمنسقين والمشرفين الأكاديميين
                  والمشرفين الميدانيين.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-[7px]
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/admin/users/permissions"
                    )
                  }
                  className="
                    flex
                    h-[40px]
                    items-center
                    gap-[6px]
                    rounded-[9px]
                    border
                    border-[#D7E5FF]
                    bg-[#F6F9FF]
                    px-[14px]
                    text-[9px]
                    font-bold
                    text-[#09379A]
                  "
                >
                  <ShieldCheck
                    size={15}
                  />

                  الأدوار والصلاحيات
                </button>

                <button
                  type="button"
                  onClick={openAddUser}
                  className="
                    flex
                    h-[40px]
                    items-center
                    gap-[6px]
                    rounded-[9px]
                    border-0
                    bg-[#09379A]
                    px-[14px]
                    text-[9px]
                    font-bold
                    text-white
                    transition

                    hover:bg-[#072E81]
                  "
                >
                  <Plus size={15} />

                  إضافة مستخدم
                </button>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <section
              className="
                mt-[20px]
                grid
                grid-cols-1
                gap-[11px]

                sm:grid-cols-2

                xl:grid-cols-4
              "
            >
              <StatCard
                title="إجمالي المستخدمين"
                value={stats.total}
                description="جميع الحسابات المسجلة"
                icon={UsersIcon}
                iconClass="bg-[#EEF3FF] text-[#09379A]"
              />

              <StatCard
                title="حسابات نشطة"
                value={stats.active}
                description="يمكنها الدخول للنظام"
                icon={UserCheck}
                iconClass="bg-[#ECFDF3] text-[#15803D]"
              />

              <StatCard
                title="حسابات معطلة"
                value={stats.disabled}
                description="تم إيقاف صلاحية الدخول"
                icon={UserRoundX}
                iconClass="bg-[#FFF1F2] text-[#BE123C]"
              />

              <StatCard
                title="مستخدمون أكاديميون"
                value={stats.academic}
                description="مشرفون ومنسقو تدريب"
                icon={GraduationCap}
                iconClass="bg-[#F3E8FF] text-[#7E22CE]"
              />
            </section>

            {/* =================================================
                FILTERS
            ================================================== */}

            <section
              className="
                mt-[18px]
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                p-[16px]
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-[10px]

                  md:grid-cols-[minmax(0,1fr)_180px_150px_auto]
                  md:items-end
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
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="الاسم، الرقم، البريد أو الجهة..."
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
                  label="الدور"
                  value={roleFilter}
                  onChange={
                    setRoleFilter
                  }
                  options={[
                    "الكل",
                    "مدير النظام",
                    "منسق تدريب",
                    "مشرف أكاديمي",
                    "مشرف ميداني",
                  ]}
                />

                <FilterSelect
                  label="الحالة"
                  value={statusFilter}
                  onChange={
                    setStatusFilter
                  }
                  options={[
                    "الكل",
                    "نشط",
                    "معطل",
                  ]}
                />

                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    h-[40px]
                    rounded-[9px]
                    border
                    border-[#DCE5F0]
                    bg-white
                    px-[13px]
                    text-[9px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  إعادة تعيين
                </button>
              </div>
            </section>

            {/* =================================================
                TABLE
            ================================================== */}

            <section
              className="
                mt-[16px]
                overflow-hidden
                rounded-[14px]
                border
                border-[#DDE5EF]
                bg-white
                shadow-[0_1px_2px_rgba(15,23,42,0.03)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-[#EEF2F7]
                  px-[16px]
                  py-[14px]

                  sm:px-[20px]
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
                    حسابات المستخدمين
                  </h2>

                  <p
                    className="
                      m-0
                      mt-[2px]
                      text-[9px]
                      text-[#94A3B8]
                    "
                  >
                    {filteredUsers.length}{" "}
                    مستخدم مطابق للفلاتر
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-[34px]
                    items-center
                    gap-[6px]
                    rounded-[8px]
                    bg-[#F8FAFC]
                    px-[10px]
                    text-[8px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  <UserCog size={14} />

                  إدارة الحسابات
                </div>
              </div>

              {/* DESKTOP */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <TableHead>
                        المستخدم
                      </TableHead>

                      <TableHead>
                        الدور
                      </TableHead>

                      <TableHead>
                        الجهة / الكلية
                      </TableHead>

                      <TableHead>
                        آخر دخول
                      </TableHead>

                      <TableHead>
                        الحالة
                      </TableHead>

                      <TableHead>
                        الإجراءات
                      </TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map(
                      (user) => (
                        <tr
                          key={user.id}
                          className="
                            border-t
                            border-[#EEF2F7]
                            transition
                            hover:bg-[#FBFCFE]
                          "
                        >
                          <TableCell>
                            <div
                              className="
                                flex
                                items-center
                                gap-[10px]
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-[37px]
                                  w-[37px]
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#EEF3FF]
                                  text-[#09379A]
                                "
                              >
                                <UserRound
                                  size={17}
                                />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="
                                    m-0
                                    text-[10px]
                                    font-bold
                                    text-[#334155]
                                  "
                                >
                                  {user.name}
                                </p>

                                <span
                                  className="
                                    mt-[2px]
                                    block
                                    text-[8px]
                                    text-[#94A3B8]
                                  "
                                >
                                  {user.code}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div>
                              <p
                                className="
                                  m-0
                                  text-[9px]
                                  font-bold
                                  text-[#475569]
                                "
                              >
                                {user.role}
                              </p>

                              <span
                                className="
                                  mt-[2px]
                                  block
                                  text-[8px]
                                  text-[#94A3B8]
                                "
                              >
                                {user.type}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                block
                                max-w-[200px]
                                text-[9px]
                                leading-[17px]
                                text-[#64748B]
                              "
                            >
                              {user.entity}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className="
                                whitespace-nowrap
                                text-[8px]
                                text-[#64748B]
                              "
                            >
                              {user.lastLogin}
                            </span>
                          </TableCell>

                          <TableCell>
                            <UserStatusBadge
                              status={
                                user.status
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <div
                              className="
                                flex
                                items-center
                                gap-[5px]
                              "
                            >
                              <IconButton
                                title="عرض التفاصيل"
                                onClick={() =>
                                  setSelectedUser(
                                    user
                                  )
                                }
                              >
                                <Eye
                                  size={14}
                                />
                              </IconButton>

                              <IconButton
                                title="تعديل المستخدم"
                                onClick={() =>
                                  openEditUser(
                                    user
                                  )
                                }
                              >
                                <UserCog
                                  size={14}
                                />
                              </IconButton>

                              <IconButton
                                title={
                                  user.status ===
                                  "نشط"
                                    ? "تعطيل الحساب"
                                    : "تفعيل الحساب"
                                }
                                onClick={() =>
                                  toggleUserStatus(
                                    user.id
                                  )
                                }
                              >
                                {user.status ===
                                "نشط" ? (
                                  <UserRoundX
                                    size={14}
                                  />
                                ) : (
                                  <UserCheck
                                    size={14}
                                  />
                                )}
                              </IconButton>
                            </div>
                          </TableCell>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div
                className="
                  flex
                  flex-col
                  gap-[10px]
                  p-[12px]

                  lg:hidden
                "
              >
                {filteredUsers.map(
                  (user) => (
                    <article
                      key={user.id}
                      className="
                        rounded-[11px]
                        border
                        border-[#E7ECF2]
                        bg-[#FAFBFC]
                        p-[13px]
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
                            min-w-0
                            items-center
                            gap-[9px]
                          "
                        >
                          <div
                            className="
                              flex
                              h-[38px]
                              w-[38px]
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#EEF3FF]
                              text-[#09379A]
                            "
                          >
                            <UserRound
                              size={17}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3
                              className="
                                m-0
                                truncate
                                text-[11px]
                                font-bold
                                text-[#334155]
                              "
                            >
                              {user.name}
                            </h3>

                            <p
                              className="
                                m-0
                                mt-[2px]
                                text-[8px]
                                text-[#64748B]
                              "
                            >
                              {user.role} •{" "}
                              {user.code}
                            </p>
                          </div>
                        </div>

                        <UserStatusBadge
                          status={
                            user.status
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[11px]
                          grid
                          grid-cols-2
                          gap-[10px]
                          border-t
                          border-[#E7ECF2]
                          pt-[10px]
                        "
                      >
                        <InfoItem
                          label="الجهة"
                          value={
                            user.entity
                          }
                        />

                        <InfoItem
                          label="آخر دخول"
                          value={
                            user.lastLogin
                          }
                        />

                        <InfoItem
                          label="البريد"
                          value={
                            user.email
                          }
                        />

                        <InfoItem
                          label="نوع الحساب"
                          value={
                            user.type
                          }
                        />
                      </div>

                      <div
                        className="
                          mt-[11px]
                          flex
                          gap-[6px]
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedUser(
                              user
                            )
                          }
                          className="
                            flex
                            h-[35px]
                            flex-1
                            items-center
                            justify-center
                            gap-[5px]
                            rounded-[8px]
                            border
                            border-[#D7E5FF]
                            bg-[#F6F9FF]
                            text-[8px]
                            font-bold
                            text-[#09379A]
                          "
                        >
                          <Eye size={13} />

                          التفاصيل
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditUser(
                              user
                            )
                          }
                          className="
                            flex
                            h-[35px]
                            flex-1
                            items-center
                            justify-center
                            gap-[5px]
                            rounded-[8px]
                            border
                            border-[#DCE5F0]
                            bg-white
                            text-[8px]
                            font-bold
                            text-[#475569]
                          "
                        >
                          <UserCog
                            size={13}
                          />

                          تعديل
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>

              {filteredUsers.length ===
                0 && (
                <EmptyState
                  onReset={resetFilters}
                />
              )}
            </section>
          </div>
        </main>
      </div>

      {/* =====================================================
          USER DETAILS DRAWER
      ====================================================== */}

      {selectedUser && (
        <>
          <button
            type="button"
            aria-label="إغلاق التفاصيل"
            onClick={() =>
              setSelectedUser(null)
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
                  تفاصيل المستخدم
                </h2>

                <p
                  className="
                    m-0
                    mt-[2px]
                    text-[8px]
                    text-[#94A3B8]
                  "
                >
                  {selectedUser.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
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
                  p-[15px]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[11px]
                  "
                >
                  <div
                    className="
                      flex
                      h-[48px]
                      w-[48px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#09379A]
                    "
                  >
                    <UserRound
                      size={22}
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        m-0
                        text-[13px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      {selectedUser.name}
                    </h3>

                    <p
                      className="
                        m-0
                        mt-[2px]
                        text-[9px]
                        text-[#64748B]
                      "
                    >
                      {selectedUser.role}
                    </p>
                  </div>
                </div>

                <div className="mt-[11px]">
                  <UserStatusBadge
                    status={
                      selectedUser.status
                    }
                  />
                </div>
              </div>

              <div
                className="
                  mt-[14px]
                  grid
                  grid-cols-2
                  gap-[9px]
                "
              >
                <DetailBox
                  label="الرقم"
                  value={
                    selectedUser.code
                  }
                />

                <DetailBox
                  label="نوع الحساب"
                  value={
                    selectedUser.type
                  }
                />

                <DetailBox
                  label="الدور"
                  value={
                    selectedUser.role
                  }
                />

                <DetailBox
                  label="تاريخ الانضمام"
                  value={
                    selectedUser.joinedAt
                  }
                />
              </div>

              <div
                className="
                  mt-[10px]
                  rounded-[10px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  p-[13px]
                "
              >
                <ContactRow
                  icon={Mail}
                  label="البريد الإلكتروني"
                  value={
                    selectedUser.email
                  }
                />

                <ContactRow
                  icon={Phone}
                  label="رقم الجوال"
                  value={
                    selectedUser.phone
                  }
                />

                <ContactRow
                  icon={GraduationCap}
                  label="الجهة / الكلية"
                  value={
                    selectedUser.entity
                  }
                  last
                />
              </div>

              <div
                className="
                  mt-[10px]
                  rounded-[10px]
                  border
                  border-[#E2E8F0]
                  bg-[#F8FAFC]
                  p-[13px]
                "
              >
                <p
                  className="
                    m-0
                    text-[8px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  آخر تسجيل دخول
                </p>

                <p
                  className="
                    m-0
                    mt-[3px]
                    text-[9px]
                    font-medium
                    text-[#334155]
                  "
                >
                  {
                    selectedUser.lastLogin
                  }
                </p>
              </div>

              <div
                className="
                  mt-[10px]
                  rounded-[10px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  p-[13px]
                "
              >
                <p
                  className="
                    m-0
                    text-[8px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  ملاحظات
                </p>

                <p
                  className="
                    m-0
                    mt-[4px]
                    text-[9px]
                    leading-[18px]
                    text-[#475569]
                  "
                >
                  {
                    selectedUser.description
                  }
                </p>
              </div>

              <div
                className="
                  mt-[15px]
                  flex
                  gap-[7px]
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    openEditUser(
                      selectedUser
                    );
                  }}
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
                  <UserCog size={14} />

                  تعديل الحساب
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleUserStatus(
                      selectedUser.id
                    )
                  }
                  className={`
                    flex
                    h-[38px]
                    flex-1
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    border
                    text-[8px]
                    font-bold

                    ${
                      selectedUser.status ===
                      "نشط"
                        ? `
                            border-[#FECDD3]
                            bg-[#FFF1F2]
                            text-[#BE123C]
                          `
                        : `
                            border-[#BBF7D0]
                            bg-[#ECFDF3]
                            text-[#15803D]
                          `
                    }
                  `}
                >
                  {selectedUser.status ===
                  "نشط" ? (
                    <>
                      <UserRoundX
                        size={14}
                      />

                      تعطيل الحساب
                    </>
                  ) : (
                    <>
                      <UserCheck
                        size={14}
                      />

                      تفعيل الحساب
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/users/permissions"
                  )
                }
                className="
                  mt-[7px]
                  flex
                  h-[38px]
                  w-full
                  items-center
                  justify-center
                  gap-[6px]
                  rounded-[8px]
                  border
                  border-[#D7E5FF]
                  bg-[#F6F9FF]
                  text-[8px]
                  font-bold
                  text-[#09379A]
                "
              >
                <ShieldCheck size={14} />

                إدارة الأدوار والصلاحيات
              </button>
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          ADD / EDIT USER MODAL
      ====================================================== */}

      {showUserModal && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowUserModal(false);
            setEditingUser(null);
          }}
          onSave={saveUser}
        />
      )}
    </div>
  );
}

/* =========================================================
   USER MODAL
========================================================= */

function UserModal({
  user,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: user?.name || "",

    email: user?.email || "",

    phone: user?.phone || "",

    role:
      user?.role || "منسق تدريب",

    entity: user?.entity || "",

    type:
      user?.type || "أكاديمي",
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
      !form.name.trim() ||
      !form.email.trim()
    ) {
      return;
    }

    onSave(form);
  };

  return (
    <>
      <button
        type="button"
        aria-label="إغلاق النافذة"
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
          max-w-[610px]
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
              {user
                ? "تعديل المستخدم"
                : "إضافة مستخدم"}
            </h2>

            <p
              className="
                m-0
                mt-[2px]
                text-[8px]
                text-[#94A3B8]
              "
            >
              بيانات حساب المستخدم
              ودوره في النظام
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
            grid
            max-h-[70vh]
            grid-cols-1
            gap-[11px]
            overflow-y-auto
            p-[18px]

            sm:grid-cols-2
          "
        >
          <FormInput
            label="الاسم الكامل"
            value={form.name}
            onChange={(value) =>
              updateField(
                "name",
                value
              )
            }
            placeholder="اسم المستخدم"
          />

          <FormInput
            label="البريد الإلكتروني"
            value={form.email}
            onChange={(value) =>
              updateField(
                "email",
                value
              )
            }
            placeholder="user@azhar.edu.ps"
          />

          <FormInput
            label="رقم الجوال"
            value={form.phone}
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
            placeholder="059xxxxxxx"
          />

          <FormSelect
            label="الدور"
            value={form.role}
            onChange={(value) =>
              updateField(
                "role",
                value
              )
            }
            options={[
              "مدير النظام",
              "منسق تدريب",
              "مشرف أكاديمي",
              "مشرف ميداني",
            ]}
          />

          <FormSelect
            label="نوع الحساب"
            value={form.type}
            onChange={(value) =>
              updateField(
                "type",
                value
              )
            }
            options={[
              "إداري",
              "أكاديمي",
              "جهة تدريب",
            ]}
          />

          <FormInput
            label="الجهة / الكلية"
            value={form.entity}
            onChange={(value) =>
              updateField(
                "entity",
                value
              )
            }
            placeholder="مثال: كلية الهندسة"
          />
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
            <CheckCircle2
              size={14}
            />

            {user
              ? "حفظ التعديلات"
              : "إضافة المستخدم"}
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-[13px]
        border
        border-[#DDE5EF]
        bg-white
        p-[15px]
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
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
              mt-[5px]
              block
              text-[24px]
              font-bold
              text-[#14213D]
            "
          >
            {value}
          </strong>

          <p
            className="
              m-0
              mt-[2px]
              text-[8px]
              text-[#94A3B8]
            "
          >
            {description}
          </p>
        </div>

        <div
          className={`
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center
            rounded-[9px]

            ${iconClass}
          `}
        >
          <Icon
            size={18}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   USER STATUS
========================================================= */

function UserStatusBadge({
  status,
}) {
  return (
    <span
      className={`
        inline-flex
        min-h-[24px]
        items-center
        rounded-full
        border
        px-[8px]
        text-[8px]
        font-bold

        ${
          status === "نشط"
            ? `
                border-[#BBF7D0]
                bg-[#ECFDF3]
                text-[#15803D]
              `
            : `
                border-[#FECDD3]
                bg-[#FFF1F2]
                text-[#BE123C]
              `
        }
      `}
    >
      {status}
    </span>
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
   TABLE
========================================================= */

function TableHead({
  children,
}) {
  return (
    <th
      className="
        whitespace-nowrap
        px-[13px]
        py-[11px]
        text-right
        text-[8px]
        font-bold
        text-[#64748B]
      "
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
}) {
  return (
    <td
      className="
        px-[13px]
        py-[11px]
        align-middle
      "
    >
      {children}
    </td>
  );
}

/* =========================================================
   INFO
========================================================= */

function InfoItem({
  label,
  value,
}) {
  return (
    <div>
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
          mt-[2px]
          break-words
          text-[8px]
          font-medium
          leading-[16px]
          text-[#475569]
        "
      >
        {value}
      </p>
    </div>
  );
}

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
   CONTACT ROW
========================================================= */

function ContactRow({
  icon: Icon,
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-[9px]
        py-[9px]

        ${
          !last
            ? "border-b border-[#EEF2F7]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          h-[30px]
          w-[30px]
          shrink-0
          items-center
          justify-center
          rounded-[7px]
          bg-[#F1F5F9]
          text-[#64748B]
        "
      >
        <Icon size={14} />
      </div>

      <div>
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
            mt-[2px]
            break-all
            text-[9px]
            font-medium
            text-[#475569]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FORM
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
        min-h-[260px]
        flex-col
        items-center
        justify-center
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
        <Search size={20} />
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
        لا توجد حسابات مطابقة
      </h3>

      <p
        className="
          m-0
          mt-[3px]
          text-[8px]
          text-[#94A3B8]
        "
      >
        جرّب تغيير البحث أو الفلاتر.
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
        عرض جميع المستخدمين
      </button>
    </div>
  );
}