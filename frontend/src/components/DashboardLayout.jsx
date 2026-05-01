import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../Styles/dashboard.css";

export default function DashboardLayout({
  children,
  patientContext,
  stats,
  messageCount,
  onReset
}) {
  return (
    <div className="layout">
      <Sidebar
        patientContext={patientContext}
        stats={stats}
        messageCount={messageCount}
        onReset={onReset}
      />

      <div className="main">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}