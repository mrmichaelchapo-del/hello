import { useState } from "react";

type AlertProps = {
  id: number;
  message: string;
  onClose: (id: number) => void;
};

function Alert({ id, message, onClose }: AlertProps) {
  return (
    <div
      style={{
        background: "#ff4444",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <p>{message}</p>
      <button onClick={() => onClose(id)}>Dismiss</button>
    </div>
  );
}

export default function App() {
  const [alerts, setAlerts] = useState<
    { id: number; message: string }[]
  >([]);

  const addAlert = (msg: string) => {
    setAlerts((prev) => [
      ...prev,
      { id: Date.now(), message: msg },
    ]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const validateCode = () => {
    const fakeCode = {
      hasMissingSemicolon: true,
      hasWrongType: false,
      forgotReturn: true,
      serverDown: false,
    };

    if (fakeCode.hasMissingSemicolon) {
      addAlert("⚠️ Missing semicolon detected!");
    }

    if (fakeCode.hasWrongType) {
      addAlert("❌ Wrong TypeScript type!");
    }

    if (fakeCode.forgotReturn) {
      addAlert("🚨 Function missing return statement!");
    if (fakeCode.serverDown) {
       addAlert("Server is down");
    }
  };

  return (
    <div>
      <h1>Alert</h1>

      <button onClick={validateCode}>
        Validate Code
      </button>

      <div style={{ marginTop: "20px" }}>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            id={alert.id}
            message={alert.message}
            onClose={removeAlert}
          />
        ))}
      </div>
    </div>
  );
}