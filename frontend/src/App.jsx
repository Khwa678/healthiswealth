import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputPanel from "./components/InputPanel.jsx";
import OnboardingModal from "./components/OnboardingModal.jsx";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Doctors from "./Pages/Doctors";

import "./App.css";

export default function App() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientContext, setPatientContext] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [stats, setStats] = useState(null);

  const [activePage, setActivePage] = useState("dashboard");

  // 🔐 Auth
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [authPage, setAuthPage] = useState("login");

  const handleLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const handleRegister = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🧠 Context setup
  const handleContextSubmit = useCallback((context) => {
    setPatientContext(context);
    setShowOnboarding(false);

    setMessages([
      {
        id: uuidv4(),
        role: "assistant",
        content: `Hello ${context.patientName || ""}!

I'm CuraaLink, your AI medical research assistant.

I’ll help you explore research on ${context.disease} using trusted medical sources.

Ask me anything — treatments, trials, insights 🚀`,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // 💬 Send message
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || loading) return;

      const userMsg = {
        id: uuidv4(),
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const { data } = await axios.post(
          "https://healthiswealth-6.onrender.com/api/chat",
          {
            sessionId,
            message: text,
            disease: patientContext?.disease,
          }
        );

        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            role: "assistant",
            content: data.llm?.researchInsights || "No response",
          },
        ]);

        setStats(data.stats);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, sessionId, patientContext]
  );

  // 🔄 Reset
  const handleReset = () => {
    setMessages([]);
    setPatientContext(null);
    setShowOnboarding(true);
  };

  // 🔐 Auth UI
  if (!user) {
    return authPage === "login" ? (
      <Login
        onLogin={handleLogin}
        goToRegister={() => setAuthPage("register")}
      />
    ) : (
      <Register
        onRegister={handleRegister}
        goToLogin={() => setAuthPage("login")}
      />
    );
  }

  // ✅ MAIN UI
  return (
    <div className="app-layout">
      <Sidebar
        patientContext={patientContext}
        stats={stats}
        messageCount={messages.length}
        onReset={handleReset}
        onLogout={logout}
        setActivePage={setActivePage}
      />

      <main className="app-main">
        {/* Dashboard */}
        {activePage === "dashboard" && (
          <Dashboard
            patientContext={patientContext}
            messageCount={messages.length}
            stats={stats}
          />
        )}

        {/* Chat */}
        {activePage === "chat" && (
          <>
            {showOnboarding && (
              <OnboardingModal onSubmit={handleContextSubmit} />
            )}

            <ChatWindow
              messages={messages}
              loading={loading}
              patientContext={patientContext}
            />

            {!showOnboarding && (
              <InputPanel
                onSend={sendMessage}
                loading={loading}
                disabled={!patientContext}
              />
            )}
          </>
        )}

        {/* Doctors */}
        {activePage === "doctors" && <Doctors />}
      </main>
    </div>
  );
}