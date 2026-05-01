import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
<<<<<<< HEAD

=======
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import InputPanel from './components/InputPanel.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';
<<<<<<< HEAD

// Auth Pages
import Login from './Pages/Login';
import Register from './Pages/Register';

// New Pages
import Dashboard from './Pages/Dashboard';
import Doctors from './Pages/Doctors';

import './App.css';

export default function App() {

  // ================= EXISTING STATES =================
=======
import './App.css';

export default function App() {
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientContext, setPatientContext] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [stats, setStats] = useState(null);

<<<<<<< HEAD
  // 🔥 NEW: page navigation
  const [activePage, setActivePage] = useState("dashboard");

  // ================= AUTH STATES =================
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authPage, setAuthPage] = useState('login');

  // ================= AUTH HANDLERS =================
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
    localStorage.removeItem("token");
    setUser(null);
  };

  // ================= EXISTING LOGIC =================
=======
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
  const handleContextSubmit = useCallback((context) => {
    setPatientContext(context);
    setShowOnboarding(false);

<<<<<<< HEAD
=======
    // Add a welcome message
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
    const welcomeMsg = {
      id: uuidv4(),
      role: 'assistant',
      content: `Hello${context.patientName ? `, ${context.patientName}` : ''}! I'm **CuraaLink**, your AI medical research assistant. I'm ready to help you explore research on **${context.disease}**.

I'll search thousands of peer-reviewed publications and active clinical trials to give you accurate, source-backed answers. Ask me anything — from treatment options to clinical trials near you.`,
      isWelcome: true,
      timestamp: new Date().toISOString(),
    };
<<<<<<< HEAD

=======
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
    setMessages([welcomeMsg]);
  }, []);

  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMsg = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
      const baseURL = 'https://healthiswealth-6.onrender.com';

      const { data } = await axios.post(
        `${baseURL}/api/chat`,
        {
          sessionId,
          message: messageText,
          disease: patientContext?.disease,
          location: patientContext?.location,
          patientName: patientContext?.patientName,
          additionalContext: patientContext?.additionalContext,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
=======
      // const { data } = await axios.post('/api/chat', {
      const baseURL = 'https://healthiswealth-6.onrender.com';
      const { data } = await axios.post(`${baseURL}/api/chat`, {
        sessionId,
        message: messageText,
        disease: patientContext?.disease,
        location: patientContext?.location,
        patientName: patientContext?.patientName,
        additionalContext: patientContext?.additionalContext,
      },{
          headers: {
    "Content-Type": "application/json"
     } });
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9

      const assistantMsg = {
        id: uuidv4(),
        role: 'assistant',
        llm: data.llm,
        publications: data.publications || [],
        trials: data.trials || [],
        content: data.llm?.researchInsights || '',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setStats(data.stats);
<<<<<<< HEAD

    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || 'Request failed';

      setError(errMsg);

=======
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errMsg);
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'error',
          content: `Error: ${errMsg}. Please check your server and try again.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, sessionId, patientContext]);

  const handleReset = useCallback(() => {
    setMessages([]);
    setPatientContext(null);
    setShowOnboarding(true);
    setStats(null);
    setError(null);
  }, []);

<<<<<<< HEAD
  // ================= AUTH UI =================
  if (!user) {
    if (authPage === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          goToRegister={() => setAuthPage('register')}
        />
      );
    }

    return (
      <Register
        onRegister={handleRegister}
        goToLogin={() => setAuthPage('login')}
      />
    );
  }

  // ================= MAIN DASHBOARD =================
  return (
    <div className="app-layout">
      
=======
  return (
    <div className="app-layout">
      {showOnboarding && (
        <OnboardingModal onSubmit={handleContextSubmit} />
      )}

>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
      <Sidebar
        patientContext={patientContext}
        stats={stats}
        messageCount={messages.length}
        onReset={handleReset}
<<<<<<< HEAD
        onLogout={logout}
        setActivePage={setActivePage}   // 🔥 navigation control
      />

      <main className="app-main">

        {/* 🏠 Dashboard */}
        {activePage === "dashboard" && <Dashboard />}

        {/* 💬 Chat */}
        {activePage === "chat" && (
          <>
            {showOnboarding && (
              <OnboardingModal onSubmit={handleContextSubmit} />
            )}

            <ChatWindow
              messages={messages || []}
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

        {/* 🧑‍⚕️ Doctors */}
        {activePage === "doctors" && <Doctors />}

=======
      />

      <main className="app-main">
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
            suggestions={
              messages.length > 0 &&
              messages[messages.length - 1]?.llm?.followUpSuggestions
            }
          />
        )}
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
      </main>
    </div>
  );
}