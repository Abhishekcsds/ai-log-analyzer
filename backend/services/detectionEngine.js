export const detectSensitiveData = (content) => {
    const findings = [];
  
    const lines = content.split("\n");
  
    lines.forEach((line, index) => {
      // Email
      if (line.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)) {
        findings.push({ type: "email", risk: "low", line: index + 1 });
      }
  
      // Password
      if (line.toLowerCase().includes("password")) {
        findings.push({ type: "password", risk: "critical", line: index + 1 });
      }
  
      // API Key
      if (line.match(/sk-[a-zA-Z0-9]+/)) {
        findings.push({ type: "api_key", risk: "high", line: index + 1 });
      }
  
      // Stack trace
      if (line.toLowerCase().includes("exception")) {
        findings.push({ type: "stack_trace", risk: "medium", line: index + 1 });
      }
    });
  
    return findings;
  };