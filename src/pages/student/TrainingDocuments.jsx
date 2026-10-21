import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  FileText,
  Image,
  Mail,
  Paperclip,
  RefreshCw,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";

import Header from "../../components/student/Header";
import Sidebar from "../../components/student/Sidebar";

export default function TrainingDocuments() {
  const navigate = useNavigate();

  const transcriptInputRef = useRef(null);
  const idInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const letterInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const extraInputRef = useRef(null);

  const [documents, setDocuments] = useState({
    transcript: {
      uploaded: true,
      fileName: "transcript_amal_2025.pdf",
      size: "1.6 MB",
      progress: 100,
      error: "",
    },

    idCard: {
      uploaded: true,
      fileName: "national_id_card.pdf",
      size: "550 KB",
      progress: 100,
      error: "",
    },

    photo: {
      uploaded: false,
      fileName: "",
      size: "",
      progress: 0,
      error: "",
    },

    recommendation: {
      uploaded: false,
      fileName: "",
      size: "",
      progress: 0,
      error: "",
    },

    cv: {
      uploaded: false,
      fileName: "",
      size: "",
      progress: 0,
      error: "",
    },

    extra: {
      uploaded: false,
      fileName: "",
      size: "",
      progress: 0,
      error: "",
    },
  });

  const [isUploading, setIsUploading] = useState(false);

  const acceptedExtensions = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const getFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (documentKey, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!acceptedExtensions.includes(file.type)) {
      setDocuments((previous) => ({
        ...previous,
        [documentKey]: {
          ...previous[documentKey],
          uploaded: false,
          fileName: file.name,
          size: getFileSize(file.size),
          progress: 0,
          error: "نوع الملف غير مدعوم. يرجى رفع PDF أو JPG أو PNG أو DOC.",
        },
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setDocuments((previous) => ({
        ...previous,
        [documentKey]: {
          ...previous[documentKey],
          uploaded: false,
          fileName: file.name,
          size: getFileSize(file.size),
          progress: 0,
          error: "تجاوز حجم الملف الحد الأقصى المسموح به وهو 5 ميجابايت.",
        },
      }));

      return;
    }

    setIsUploading(true);

    setDocuments((previous) => ({
      ...previous,
      [documentKey]: {
        uploaded: false,
        fileName: file.name,
        size: getFileSize(file.size),
        progress: 35,
        error: "",
      },
    }));

    window.setTimeout(() => {
      setDocuments((previous) => ({
        ...previous,
        [documentKey]: {
          ...previous[documentKey],
          progress: 70,
        },
      }));
    }, 350);

    window.setTimeout(() => {
      setDocuments((previous) => ({
        ...previous,
        [documentKey]: {
          ...previous[documentKey],
          uploaded: true,
          progress: 100,
          error: "",
        },
      }));

      setIsUploading(false);
    }, 750);
  };

  const removeFile = (documentKey) => {
    setDocuments((previous) => ({
      ...previous,
      [documentKey]: {
        uploaded: false,
        fileName: "",
        size: "",
        progress: 0,
        error: "",
      },
    }));
  };

  const requiredDocumentsComplete =
    documents.transcript.uploaded &&
    documents.idCard.uploaded &&
    documents.photo.uploaded;

  const handleNext = () => {
    if (!requiredDocumentsComplete) {
      return;
    }

    navigate("/student/applications/status");
  };

  const DocumentCard = ({
    title,
    description,
    documentKey,
    inputRef,
    icon: Icon,
    required = false,
    badge,
  }) => {
    const document = documents[documentKey];

    const hasProgress =
      document.fileName &&
      !document.uploaded &&
      !document.error &&
      document.progress > 0;

    return (
      <article
        className="
          min-h-[134px]
          rounded-[14px]
          border
          border-[#DCE4EF]
          bg-white
          px-[16px]
          py-[15px]
          flex
          flex-col
          justify-between
          transition
          hover:border-[#B6C9EC]
        "
      >
        <div>
          <div className="flex items-start justify-between gap-[12px]">
            <div className="text-right">
              <h3
                className="
                  m-0
                  text-[14px]
                  leading-[22px]
                  font-bold
                  text-[#1E293B]
                "
              >
                {title}

                {required && (
                  <span className="text-[#DC2626] mr-[2px]">
                    *
                  </span>
                )}
              </h3>

              <p
                className="
                  m-0
                  mt-[3px]
                  text-[10px]
                  leading-[16px]
                  text-[#94A3B8]
                "
              >
                {description}
              </p>
            </div>

            <div
              className="
                w-[40px]
                h-[40px]
                shrink-0
                rounded-full
                bg-[#F0F5FD]
                flex
                items-center
                justify-center
                text-[#8EA4C5]
              "
            >
              <Icon size={19} strokeWidth={1.7} />
            </div>
          </div>

          {badge && (
            <div className="mt-[6px]">
              <span
                className="
                  inline-flex
                  h-[22px]
                  px-[8px]
                  rounded-[10px]
                  bg-[#E8FFF3]
                  text-[#12A766]
                  items-center
                  gap-[5px]
                  text-[9px]
                  font-medium
                "
              >
                <span
                  className="
                    w-[5px]
                    h-[5px]
                    rounded-full
                    bg-[#10B981]
                  "
                />

                {badge}
              </span>
            </div>
          )}
        </div>

        {document.uploaded ? (
          <div
            className="
              mt-[10px]
              min-h-[42px]
              rounded-[7px]
              border
              border-[#D9E2EC]
              bg-[#F8FAFC]
              px-[10px]
              flex
              items-center
              justify-between
              gap-[8px]
            "
          >
            <div className="flex items-center min-w-0 gap-[8px]">
              <CheckCircle2
                size={15}
                strokeWidth={1.8}
                className="text-[#10B981] shrink-0"
              />

              <span
                dir="ltr"
                className="
                  text-[10px]
                  text-[#475569]
                  truncate
                "
              >
                {document.fileName}
              </span>

              <span
                className="
                  text-[9px]
                  text-[#94A3B8]
                  whitespace-nowrap
                "
              >
                {document.size}
              </span>
            </div>

            <button
              type="button"
              onClick={() => removeFile(documentKey)}
              className="
                border-0
                bg-transparent
                text-[#09379A]
                text-[10px]
                font-bold
                cursor-pointer
                shrink-0
              "
            >
              استبدال
            </button>
          </div>
        ) : document.error ? (
          <div
            className="
              mt-[10px]
              min-h-[44px]
              rounded-[8px]
              border
              border-[#FDA4AF]
              bg-[#FFF6F7]
              px-[10px]
              flex
              items-center
              justify-between
              gap-[10px]
            "
          >
            <div className="min-w-0">
              <div className="flex items-center gap-[6px]">
                <XCircle
                  size={15}
                  className="text-[#DC2626] shrink-0"
                />

                <span
                  dir="ltr"
                  className="
                    text-[10px]
                    font-bold
                    text-[#DC2626]
                    truncate
                  "
                >
                  {document.fileName}
                </span>
              </div>

              <p
                className="
                  m-0
                  mt-[3px]
                  text-[8px]
                  leading-[14px]
                  text-[#DC2626]
                "
              >
                {document.error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="
                border-0
                bg-transparent
                p-0
                text-[#DC2626]
                cursor-pointer
                shrink-0
              "
            >
              <RefreshCw size={15} />
            </button>
          </div>
        ) : hasProgress ? (
          <div
            className="
              mt-[10px]
              rounded-[8px]
              border
              border-[#09379A]
              bg-white
              px-[10px]
              py-[8px]
            "
          >
            <div className="flex items-center justify-between gap-[10px]">
              <span
                dir="ltr"
                className="
                  text-[10px]
                  font-bold
                  text-[#475569]
                  truncate
                "
              >
                {document.fileName}
              </span>

              <span
                className="
                  text-[9px]
                  font-bold
                  text-[#09379A]
                "
              >
                {document.progress}%
              </span>
            </div>

            <div
              className="
                mt-[7px]
                w-full
                h-[6px]
                rounded-full
                bg-[#E8EEF7]
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#09379A]
                  transition-all
                  duration-300
                "
                style={{
                  width: `${document.progress}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="
              mt-[10px]
              h-[30px]
              w-full
              rounded-[6px]
              border
              border-[#C9D5E6]
              bg-white
              text-[#09379A]
              flex
              items-center
              justify-center
              gap-[6px]
              text-[10px]
              font-bold
              cursor-pointer
              transition
              hover:bg-[#F6F9FF]
            "
          >
            <Upload size={13} strokeWidth={1.8} />
            رفع الملف
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(event) =>
            handleFileSelect(documentKey, event)
          }
          className="hidden"
        />
      </article>
    );
  };

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
      <Sidebar />

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
        {/* HEADER */}
        <div className="relative shrink-0">
          <Header />

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
            "
          >
            <button
              type="button"
              onClick={() => navigate("/student/dashboard")}
              className="
                border-0
                bg-transparent
                p-0
                text-[#64748B]
                font-medium
                cursor-pointer
              "
            >
              الرئيسية
            </button>

            <span className="text-[#94A3B8]">›</span>

            <button
              type="button"
              onClick={() =>
                navigate("/student/opportunities")
              }
              className="
                border-0
                bg-transparent
                p-0
                text-[#09379A]
                font-bold
                cursor-pointer
              "
            >
              فرص التدريب
            </button>
          </div>
        </div>

        {/* MAIN SCROLL */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            px-[24px]
            xl:px-[40px]
            pt-[28px]
            pb-[40px]
          "
        >
          <div className="w-full max-w-[1080px] mx-auto">
            {/* PAGE TITLE */}
            <section className="text-right">
              <h1
                className="
                  m-0
                  text-[28px]
                  leading-[40px]
                  font-bold
                  text-[#14213D]
                "
              >
                استمارة التقديم على التدريب
              </h1>

              <p
                className="
                  m-0
                  mt-[4px]
                  text-[14px]
                  leading-[22px]
                  text-[#64748B]
                "
              >
                يرجى رفع المستندات التالية بصيغة PDF أو صورة
                واضحة لإتمام مسوغات التدريب الميداني
              </p>
            </section>

            {/* STEPPER */}
            <section
              className="
                mt-[18px]
                rounded-[14px]
                border
                border-[#E2E8F0]
                bg-white
                px-[50px]
                py-[28px]
              "
            >
              <div className="relative">
                <div
                  className="
                    absolute
                    top-[19px]
                    right-[17%]
                    left-[17%]
                    h-[4px]
                    bg-[#E2E8F0]
                  "
                />

                <div
                  className="
                    absolute
                    top-[19px]
                    right-[17%]
                    w-[33%]
                    h-[4px]
                    bg-[#09379A]
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    grid
                    grid-cols-3
                  "
                >
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        rounded-full
                        bg-[#09379A]
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check size={20} strokeWidth={2.2} />
                    </div>

                    <h3
                      className="
                        m-0
                        mt-[7px]
                        text-[13px]
                        font-bold
                        text-[#1E293B]
                      "
                    >
                      البيانات الأساسية
                    </h3>

                    <span
                      className="
                        mt-[1px]
                        text-[9px]
                        text-[#10B981]
                      "
                    >
                      تم الاكتمال
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        rounded-full
                        bg-[#09379A]
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-[0_0_0_4px_#E7EFFF]
                        text-[14px]
                        font-bold
                      "
                    >
                      2
                    </div>

                    <h3
                      className="
                        m-0
                        mt-[7px]
                        text-[13px]
                        font-bold
                        text-[#09379A]
                      "
                    >
                      المستندات
                    </h3>

                    <span
                      className="
                        mt-[1px]
                        px-[7px]
                        rounded-[6px]
                        bg-[#EFF4FF]
                        text-[9px]
                        text-[#09379A]
                        font-bold
                      "
                    >
                      الخطوة الحالية
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        rounded-full
                        border-2
                        border-[#CBD5E1]
                        bg-white
                        text-[#94A3B8]
                        flex
                        items-center
                        justify-center
                        text-[14px]
                        font-bold
                      "
                    >
                      3
                    </div>

                    <h3
                      className="
                        m-0
                        mt-[7px]
                        text-[13px]
                        font-bold
                        text-[#64748B]
                      "
                    >
                      تأكيد الطلب
                    </h3>

                    <span
                      className="
                        mt-[1px]
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      المراجعة والإرسال
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* DOCUMENTS HEADER */}
            <section
              className="
                mt-[14px]
                flex
                items-center
                justify-between
                gap-[16px]
              "
            >
              <div className="flex items-center gap-[8px]">
                <span
                  className="
                    w-[4px]
                    h-[24px]
                    rounded-full
                    bg-[#09379A]
                  "
                />

                <h2
                  className="
                    m-0
                    text-[17px]
                    font-bold
                    text-[#1E293B]
                  "
                >
                  المستندات المطلوبة
                </h2>
              </div>

              <div
                className="
                  h-[26px]
                  px-[11px]
                  rounded-[13px]
                  bg-[#F3F6FA]
                  flex
                  items-center
                  text-[9px]
                  text-[#64748B]
                  whitespace-nowrap
                "
              >
                الحد الأقصى لحجم الملف: 5 ميجابايت -
                الصيغ المقبولة: PDF, JPG, PNG, DOC
              </div>
            </section>

            {/* DOCUMENTS GRID */}
            <section
              className="
                mt-[12px]
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-[14px]
              "
            >
              <DocumentCard
                title="كشف علامات حديث"
                description="إلزامي - PDF"
                documentKey="transcript"
                inputRef={transcriptInputRef}
                icon={FileText}
                required
                badge="تم الرفع بنجاح"
              />

              <DocumentCard
                title="صورة عن الهوية"
                description="PDF, JPG, PNG - سارية"
                documentKey="idCard"
                inputRef={idInputRef}
                icon={FileText}
                required
                badge="تم الرفع بنجاح"
              />

              <DocumentCard
                title="صورة شخصية رسمية"
                description="يفضل بخلفية رسمية JPG, PNG"
                documentKey="photo"
                inputRef={photoInputRef}
                icon={Camera}
                required
              />

              <DocumentCard
                title="رسالة تحفيزية للجهة"
                description="اختياري - PDF, DOC"
                documentKey="recommendation"
                inputRef={letterInputRef}
                icon={Mail}
              />

              <DocumentCard
                title="سيرة ذاتية محدثة"
                description="اختياري - PDF, DOC"
                documentKey="cv"
                inputRef={cvInputRef}
                icon={Image}
              />

              <DocumentCard
                title="أي مستندات إضافية"
                description="شهادات، دورات - اختياري"
                documentKey="extra"
                inputRef={extraInputRef}
                icon={Paperclip}
              />
            </section>

            {/* INFO MESSAGE */}
            <section
              className="
                mt-[14px]
                min-h-[42px]
                rounded-[9px]
                border
                border-[#BFD6FF]
                bg-[#F2F7FF]
                px-[16px]
                flex
                items-center
                gap-[8px]
                text-[10px]
                leading-[18px]
                text-[#64748B]
              "
            >
              <CheckCircle2
                size={16}
                strokeWidth={1.7}
                className="text-[#09379A] shrink-0"
              />

              تم تدقيق المستندات المرفوعة من قبل وحدة التدريب
              الميداني بالكلية قبل إرسال ملف الترشيح للمؤسسة
              الشريكة، يرجى التأكد من وضوح الأختام الرسمية في
              كشف العلامات.
            </section>

            {/* ACTIONS */}
            <section
              className="
                mt-[20px]
                flex
                items-center
                justify-between
                gap-[16px]
              "
            >
              <button
                type="button"
                disabled={
                  !requiredDocumentsComplete ||
                  isUploading
                }
                onClick={handleNext}
                className={`
                  min-w-[220px]
                  h-[44px]
                  px-[20px]
                  rounded-[9px]
                  border-0
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[13px]
                  font-bold
                  transition

                  ${
                    requiredDocumentsComplete &&
                    !isUploading
                      ? `
                        bg-[#09379A]
                        text-white
                        cursor-pointer
                        shadow-[0_3px_7px_rgba(9,55,154,0.18)]
                        hover:bg-[#072E81]
                      `
                      : `
                        bg-[#CBD5E1]
                        text-white
                        cursor-not-allowed
                      `
                  }
                `}
              >
                <span>التالي: تأكيد ومراجعة الطلب</span>

                <ArrowLeft
                  size={17}
                  strokeWidth={1.8}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/apply-training"
                  )
                }
                className="
                  h-[38px]
                  px-[16px]
                  rounded-[8px]
                  border
                  border-[#D7DEE9]
                  bg-white
                  text-[#09379A]
                  flex
                  items-center
                  gap-[7px]
                  text-[11px]
                  font-bold
                  cursor-pointer
                  hover:bg-[#F8FAFC]
                "
              >
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                />

                العودة إلى البيانات الأساسية
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}