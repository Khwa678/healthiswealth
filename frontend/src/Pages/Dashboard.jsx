import ChatWindow from "../components/ChatWindow";
import InputPanel from "../components/InputPanel";
import OnboardingModal from "../components/OnboardingModal";

export default function Dashboard({
  showOnboarding,
  onSubmit,
  messages,
  loading,
  patientContext,
  sendMessage
}) {
  return (
    <>
      {showOnboarding && (
        <OnboardingModal onSubmit={onSubmit} />
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
  );
}