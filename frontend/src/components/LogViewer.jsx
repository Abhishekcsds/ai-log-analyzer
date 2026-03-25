const LogViewer = ({ result }) => {
  if (!result) return null;

  // ✅ Handle blocked case (content = null)
  const lines = result.content
    ? result.content.split("\n")
    : [];

  // ✅ Smart matching (line + fallback)
  const getFindings = (line, lineNo) => {
    return (result.findings || []).filter((f) => {
      // exact line match
      if (f.line === lineNo) return true;

      // fallback value match
      if (f.value && line.includes(f.value)) return true;

      // fallback keyword match
      const lower = line.toLowerCase();

      if (f.type === "password" && lower.includes("password")) return true;
      if (f.type === "api_key" && lower.includes("api_key")) return true;
      if (f.type === "token" && lower.includes("bearer")) return true;
      if (f.type === "stack_trace" && (lower.includes("error") || lower.includes("exception"))) return true;
      if (f.type === "email" && lower.includes("@")) return true;
      if (f.type === "sql_injection" && (lower.includes("select") || lower.includes("drop"))) return true;

      return false;
    });
  };

  // ✅ Color logic (priority-based)
  const getLineStyle = (findings) => {
    if (!findings.length) return {};

    const risks = findings.map((f) => f.risk);

    if (risks.includes("critical")) {
      return {
        background: "rgba(239,68,68,0.12)",
        borderLeft: "4px solid #ef4444"
      };
    }
    if (risks.includes("high")) {
      return {
        background: "rgba(249,115,22,0.12)",
        borderLeft: "4px solid #f97316"
      };
    }
    if (risks.includes("medium")) {
      return {
        background: "rgba(245,158,11,0.12)",
        borderLeft: "4px solid #f59e0b"
      };
    }
    return {
      background: "rgba(34,197,94,0.12)",
      borderLeft: "4px solid #22c55e"
    };
  };

  return (
    <div className="viewer">
      <h2>Log Visualization</h2>

      {/* ❌ If blocked */}
      {!result.content && (
        <p style={{ color: "#ef4444", fontWeight: "bold" }}>
          🚫 Content blocked due to high risk
        </p>
      )}

      <pre className="log-box">
        {lines.map((line, i) => {
          if (!line.trim()) return null;

          const lineNo = i + 1;
          const findings = getFindings(line, lineNo);

          return (
            <div
              key={i}
              className="log-line"
              style={{
                ...getLineStyle(findings),
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px",
                borderRadius: "6px"
              }}
            >
              {/* 🔢 Line number */}
              <span className="line-number">{lineNo}</span>

              {/* 📄 Log text */}
              <span>{line}</span>

              {/* 🔥 Risk badges */}
              {findings.length > 0 && (
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap"
                  }}
                >
                  {findings.map((f, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        background:
                          f.risk === "critical"
                            ? "#ef4444"
                            : f.risk === "high"
                            ? "#f97316"
                            : f.risk === "medium"
                            ? "#f59e0b"
                            : "#22c55e",
                        color: "#fff"
                      }}
                    >
                      {f.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
};

export default LogViewer;