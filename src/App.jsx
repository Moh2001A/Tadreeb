
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ========================================
// STUDENT PAGES
// ========================================

import Login from "./pages/student/Login";
import ForgotPassword from "./pages/student/ForgotPassword";
import ResetPassword from "./pages/student/ResetPassword";

import Dashboard from "./pages/student/Dashboard";
import TrainingOpportunities from "./pages/student/TrainingOpportunities";
import TrainingDetails from "./pages/student/TrainingDetails";
import TrainingApplication from "./pages/student/TrainingApplication";
import TrainingDocuments from "./pages/student/TrainingDocuments";
import Applications from "./pages/student/Applications";
import ApplicationStatus from "./pages/student/ApplicationStatus";
import TrainingAccepted from "./pages/student/TrainingAccepted";
import TrainingProfile from "./pages/student/TrainingProfile";
import TrainingPlan from "./pages/student/TrainingPlan";
import DailyTrainingLog from "./pages/student/DailyTrainingLog";
import DailyTrainingLogDetails from "./pages/student/DailyTrainingLogDetails";
import Attendance from "./pages/student/Attendance";
import AbsenceExcuse from "./pages/student/AbsenceExcuse";
import Reports from "./pages/student/Reports";
import Evaluation from "./pages/student/Evaluation";
import FinishTraining from "./pages/student/FinishTraining";
import Certificate from "./pages/student/Certificate";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";

// ========================================
// ADMIN PAGES
// ========================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import RecentActivities from "./pages/admin/RecentActivities";
import TrainingStatistics from "./pages/admin/TrainingStatistics";
import OrganizationStatistics from "./pages/admin/OrganizationStatistics";
import StudentStatistics from "./pages/admin/StudentStatistics";
import PerformanceReports from "./pages/admin/PerformanceReports";

import Students from "./pages/admin/Students";
import StudentDetails from "./pages/admin/StudentDetails";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";
import StudentTrainingHistory from "./pages/admin/StudentTrainingHistory";

import TrainingRequests from "./pages/admin/TrainingRequests";
import TrainingRequestDetails from "./pages/admin/TrainingRequestDetails";

import TrainingOrganizations from "./pages/admin/TrainingOrganizations";
import TrainingOrganizationDetails from "./pages/admin/TrainingOrganizationDetails";
import ApprovalsTrainingProviders from "./pages/admin/ApprovalsTrainingProviders";

import Approvals from "./pages/admin/Approvals";
import ApprovalDetails from "./pages/admin/ApprovalDetails";
import CompleteTraining from "./pages/admin/CompleteTraining";
import Visits from "./pages/admin/Visits";
import StudentTrainingDetails from "./pages/admin/StudentTrainingDetails";
import StudentAttendance from "./pages/admin/StudentAttendance";
import TrainingProgress from "./pages/admin/TrainingProgress";
import ReportsAdmin from "./pages/admin/Reports";
import ReportDetails from "./pages/admin/ReportDetails";
import ReviewReport from "./pages/admin/ReviewReport";
import Evaluations from "./pages/admin/Evaluations";
import EvaluationDetails from "./pages/admin/EvaluationDetails";
import StudentEvaluation from "./pages/admin/StudentEvaluation";
import Announcements from "./pages/admin/Announcements";

import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";
import AddTrainingOrganization from "./pages/admin/AddTrainingOrganization";
import EditTrainingOrganization from "./pages/admin/EditTrainingOrganization";

// ========================================
// MAIN APP
// ========================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            AUTHENTICATION
        ================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =================================
            STUDENT ROUTES
        ================================= */}

        <Route
          path="/student/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/student/opportunities"
          element={<TrainingOpportunities />}
        />

        <Route
          path="/student/opportunities/details"
          element={<TrainingDetails />}
        />

        <Route
          path="/student/apply-training"
          element={<TrainingApplication />}
        />

        <Route
          path="/student/apply-training/documents"
          element={<TrainingDocuments />}
        />

        <Route
          path="/student/applications"
          element={<Applications />}
        />

        <Route
          path="/student/applications/:id/status"
          element={<ApplicationStatus />}
        />

        <Route
          path="/student/applications/:id/accepted"
          element={<TrainingAccepted />}
        />

        <Route
          path="/student/training-profile"
          element={<TrainingProfile />}
        />

        <Route
          path="/student/training-plan"
          element={<TrainingPlan />}
        />

        <Route
          path="/student/daily-training-log"
          element={<DailyTrainingLog />}
        />

        <Route
          path="/student/daily-training-log/details"
          element={<DailyTrainingLogDetails />}
        />

        <Route
          path="/student/attendance"
          element={<Attendance />}
        />

        <Route
          path="/student/attendance/absence-excuse"
          element={<AbsenceExcuse />}
        />

        <Route
          path="/student/reports"
          element={<Reports />}
        />

        <Route
          path="/student/evaluation"
          element={<Evaluation />}
        />

        <Route
          path="/student/finish-training"
          element={<FinishTraining />}
        />

        <Route
          path="/student/certificate"
          element={<Certificate />}
        />

        <Route
          path="/student/notifications"
          element={<Notifications />}
        />

        <Route
          path="/student/profile"
          element={<Profile />}
        />

        {/* =================================
            ADMIN ROUTES
        ================================= */}

        {/* Redirect to Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        {/* Admin Dashboard */}

        <Route
          path="/admin/dashboard/performance-reports"
          element={<PerformanceReports />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/recent-activities"
          element={<RecentActivities />}
        />

        <Route
          path="/admin/training-statistics"
          element={<TrainingStatistics />}
        />

        <Route
          path="/admin/organization-statistics"
          element={<OrganizationStatistics />}
        />

        <Route
          path="/admin/student-statistics"
          element={<StudentStatistics />}
        />

        {/* Students Management */}

        <Route
          path="/admin/students"
          element={<Students />}
        />

        <Route
          path="/admin/students/:id"
          element={<StudentDetails />}
        />

        <Route
          path="/admin/add-student"
          element={<AddStudent />}
        />

        <Route
          path="/admin/edit-student"
          element={<EditStudent />}
        />

        <Route
          path="/admin/students/:id/edit"
          element={<EditStudent />}
        />

        <Route
          path="/admin/student-training-history"
          element={<StudentTrainingHistory />}
        />

        <Route
          path="/admin/students/:id/training-history"
          element={<StudentTrainingHistory />}
        />

        {/* Training Requests */}

        <Route
          path="/admin/training-requests"
          element={<TrainingRequests />}
        />

        <Route
          path="/admin/training-requests/:id"
          element={<TrainingRequestDetails />}
        />

        <Route
          path="/admin/training-request-details"
          element={<TrainingRequestDetails />}
        />

        {/* Training Organizations */}

        <Route
          path="/admin/training-organizations"
          element={<TrainingOrganizations />}
        />

        <Route
          path="/admin/training-organizations/:id"
          element={<TrainingOrganizationDetails />}
        />

        <Route
          path="/admin/approvals/training-providers"
          element={<ApprovalsTrainingProviders />}
        />

        {/* Training Approvals */}

        <Route
          path="/admin/approvals"
          element={<Approvals />}
        />
        <Route
          path="/admin/approvals/:id"
          element={<ApprovalDetails />}
        />

        <Route
          path="/admin/complete-training"
          element={<CompleteTraining />}
        />

        {/* Training Visits */}

        <Route
          path="/admin/visits"
          element={<Visits />}
        />

        <Route
          path="/admin/visits/:id"
          element={<StudentTrainingDetails />}
        />

        <Route
          path="/admin/visits/:id/attendance"
          element={<StudentAttendance />}
        />

        <Route
          path="/admin/visits/progress"
          element={<TrainingProgress />}
        />

        {/* Reports */}

        <Route
          path="/admin/reports"
          element={<ReportsAdmin />}
        />
        <Route
          path="/admin/reports/:id"
          element={<ReportDetails />}
        />

        <Route
          path="/admin/reports/:id/review"
          element={<ReviewReport />}
        />

        {/* Evaluations */}

        <Route
          path="/admin/evaluations"
          element={<Evaluations />}
        />

        <Route
          path="/admin/evaluations/:id"
          element={<EvaluationDetails />}
        />
        <Route
          path="/admin/evaluations/add"
          element={<StudentEvaluation />}
        />

        {/* Announcements */}

        <Route
          path="/admin/announcements"
          element={<Announcements />}
        />

        {/* Recent Activities */}

        <Route
          path="/admin/recent-activities"
          element={<RecentActivities />}
        />

        {/* Admin Profile */}

        <Route
          path="/admin/profile"
          element={<AdminProfile />}
        />

        {/* Admin Settings */}

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />
        <Route
          path="/admin/training-organizations/add"
          element={<AddTrainingOrganization />}
        />
        <Route
          path="/admin/training-organizations/:id/edit"
          element={<EditTrainingOrganization />}
        />

        {/* =================================
            FALLBACK ROUTES
        ================================= */}

        <Route
          path="/admin/*"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
