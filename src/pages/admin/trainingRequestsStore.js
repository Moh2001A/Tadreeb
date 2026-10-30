import { canAcceptOrganization } from "./trainingOrganizationsStore";
// Shared demo-only training request store for admin pages.
// Real approval and authorization must happen on the backend.
import { getStudent, saveStudent } from "./studentsStore";

export const REQUESTS_STORAGE_KEY = "cis-field-training-requests-v1";

const INITIAL_REQUESTS = [
  {
    id: "APP-0412",
    studentId: "20231234",
    studentName: "أمل أحمد",
    fullName: "أمل أحمد صيام أبو زيد",
    major: "البرمجيات وقواعد البيانات",
    gpa: "3.42",
    organization: "شركة القدس للاتصالات",
    requestDate: "2025/10/01",
    position: "تدريب تطوير الويب",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "pending",
    note: "",
  },
  {
    id: "APP-0409",
    studentId: "20231045",
    studentName: "محمود رضوان",
    fullName: "محمود إبراهيم رضوان",
    major: "تكنولوجيا علم البيانات",
    gpa: "3.65",
    organization: "شركة المشرق الرقمية",
    requestDate: "2025/09/29",
    position: "تدريب تحليل البيانات",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "approved",
    note: "",
  },
  {
    id: "APP-0405",
    studentId: "20231533",
    studentName: "بلال الشيخ",
    fullName: "بلال مصطفى الشيخ",
    major: "صيانة الحاسب الآلي",
    gpa: "2.90",
    organization: "شركة جوال",
    requestDate: "2025/09/27",
    position: "تدريب صيانة ودعم فني",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "rejected",
    note: "",
  },
  {
    id: "APP-0401",
    studentId: "20231450",
    studentName: "هدى شهير",
    fullName: "هدى شهير",
    major: "التصميم الجرافيكي والفنون الرقمية",
    gpa: "3.50",
    organization: "استوديو بيكسل الإبداعية",
    requestDate: "2025/09/25",
    position: "تدريب تصميم جرافيكي",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "pending",
    note: "",
  },
  {
    id: "APP-0398",
    studentId: "20231744",
    studentName: "أحمد ناصر",
    fullName: "أحمد سامي ناصر",
    major: "إلكترونيات صناعية وتحكم",
    gpa: "3.10",
    organization: "شركة التقنية الحديثة",
    requestDate: "2025/09/21",
    position: "تدريب أنظمة التحكم",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "approved",
    note: "",
  },
  {
    id: "APP-0394",
    studentId: "20231628",
    studentName: "نور خليل",
    fullName: "نور أحمد خليل",
    major: "تكنولوجيا علم البيانات",
    gpa: "3.70",
    organization: "شركة الأمل للأنظمة",
    requestDate: "2025/09/19",
    position: "تدريب معالجة البيانات",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "pending",
    note: "",
  },
  {
    id: "APP-0390",
    studentId: "20231712",
    studentName: "ياسمين محمود",
    fullName: "ياسمين محمود",
    major: "التصميم الجرافيكي والفنون الرقمية",
    gpa: "3.30",
    organization: "شركة جوال",
    requestDate: "2025/09/17",
    position: "تدريب التصميم الرقمي",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "rejected",
    note: "",
  },
  {
    id: "APP-0388",
    studentId: "20231601",
    studentName: "محمد العطار",
    fullName: "محمد خالد العطار",
    major: "البرمجيات وقواعد البيانات",
    gpa: "3.60",
    organization: "شركة القدس للاتصالات",
    requestDate: "2025/09/15",
    position: "تدريب تطوير البرمجيات",
    duration: "120 ساعة",
    attendanceMode: "حضوري",
    status: "approved",
    note: "",
  },
];

function savedRequests() {
  try {
    if (typeof window === "undefined") return [];
    const value = JSON.parse(window.localStorage.getItem(REQUESTS_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter(item => item && item.id != null) : [];
  } catch {
    return [];
  }
}

export function getRequests() {
  const saved = savedRequests();
  const byId = new Map(INITIAL_REQUESTS.map(item => [String(item.id), { ...item }]));
  saved.forEach(item => {
    const id = String(item.id);
    byId.set(id, { ...(byId.get(id) || {}), ...item, id });
  });
  return [...byId.values()].map(request => {
    const student = getStudent(request.studentId);
    if (!student) return request;
    return {
      ...request,
      studentName: student.name,
      fullName: student.name,
      major: student.major || request.major,
    };
  });
}

export function getRequest(id) {
  if (id == null) return null;
  return getRequests().find(item => String(item.id) === String(id)) || null;
}

export function saveRequest(request) {
  const id = String(request?.id ?? "").trim();
  if (!id) throw new Error("معرّف الطلب غير صالح");
  const current = getRequest(id);
  const records = savedRequests();
  const merged = { ...(current || {}), ...request, id };
  const index = records.findIndex(item => String(item.id) === id);
  if (index === -1) records.push(merged);
  else records[index] = merged;
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event("admin-training-requests-updated"));
  return merged;
}

// A decision also updates the shared student registry used by admin pages.
// Keep existing training status if the student already started or completed.
export function decideRequest(request, status) {
  if (!["approved", "rejected"].includes(status)) throw new Error("قرار غير صالح");
  const current = getRequest(request?.id);
  if (!current || current.status !== "pending") throw new Error("هذا الطلب غير متاح لاتخاذ قرار");
  const studentId = String(current.studentId || "");
  const student = getStudent(studentId);
  if (!student) throw new Error("الطالب غير موجود في سجل الإدارة");
  if (status === "approved") {
    if (!canAcceptOrganization(current.organization)) throw new Error("جهة التدريب غير معتمدة أو غير مسجلة، لا يمكن قبول الطلب");
    const hasOtherApproved = getRequests().some(item =>
      String(item.id) !== String(current.id) &&
      String(item.studentId) === studentId &&
      item.status === "approved"
    );
    if (hasOtherApproved) throw new Error("يوجد طلب تدريب مقبول آخر لهذا الطالب");
  }
  // Request decision and training progress are separate concepts.
  // Approval does not mean the student has started attending training.
  const studentUpdate = { ...student, requestStatus: status };
  if (status === "approved") {
    studentUpdate.organization = current.organization || student.organization;
    // Keep in-progress and completed training intact. Otherwise the approved
    // student is waiting to start, NOT already in training.
    if (!["قيد التدريب", "منتهٍ"].includes(student.status)) {
      studentUpdate.status = "لم يبدأ";
    }
  }
  // A rejected application must NOT change the student's training progress;
  // the two statuses have independent lifecycles.
  const saved = saveRequest({ ...current, ...request, status });
  try {
    saveStudent(studentUpdate);
  } catch (error) {
    try { saveRequest(current); } catch {}
    throw error;
  }
  return saved;
}
