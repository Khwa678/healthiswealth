import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import './ChatWindow.css';

<<<<<<< HEAD
export default function ChatWindow({ messages = [], loading, patientContext }) {
=======
export default function ChatWindow({ messages, loading, patientContext }) {
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-window">
<<<<<<< HEAD
      
      {/* Empty state */}
      {messages?.length === 0 && !patientContext && (
=======
      {/* Empty state */}
      {messages.length === 0 && !patientContext && (
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
        <div className="chat-empty">
          <div className="empty-icon">🔬</div>
          <h2 className="empty-title">Welcome to CuraLink</h2>
          <p className="empty-desc">
            Your AI-powered medical research companion. Complete the form to begin exploring
            peer-reviewed publications and clinical trials.
          </p>
          <div className="empty-pills">
            {[
              'Latest treatments for lung cancer',
              'Clinical trials for diabetes',
              'Deep Brain Stimulation in Parkinson\'s',
              'Recent studies on Alzheimer\'s',
            ].map((s) => (
<<<<<<< HEAD
              <span
    key={s}
    className="empty-pill"
        onClick={() => window.dispatchEvent(new CustomEvent("sendMessage", { detail: s }))}
>
  {s}
</span>
=======
              <span key={s} className="empty-pill">{s}</span>
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="messages-list">
<<<<<<< HEAD
        {messages?.map((msg, idx) => (
=======
        {messages.map((msg, idx) => (
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
          <MessageBubble
            key={msg.id}
            message={msg}
            isLatest={idx === messages.length - 1}
          />
        ))}

        {/* Typing indicator */}
        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}