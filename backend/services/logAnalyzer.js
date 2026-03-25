export const analyzeLogs = (content) => {
  const findings = [];
  const lines = content.split("\n");

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /\b\d{10}\b/;
  const ipRegex = /\b\d{1,3}(\.\d{1,3}){3}\b/;
  const passwordRegex = /password\s*=\s*\S+/i;
  const apiKeyRegex = /api[_-]?key\s*=\s*\S+/i;
  const tokenRegex = /bearer\s+[a-zA-Z0-9._-]+/i;
  const sqlRegex = /(SELECT|DROP|INSERT|DELETE)/i;

  let failedLoginCount = 0;

  lines.forEach((line, index) => {
    const lineNo = index + 1;

    if (emailRegex.test(line)) {
      findings.push({ type: "email", value: line.match(emailRegex)[0], risk: "low", line: lineNo });
    }

    if (phoneRegex.test(line)) {
      findings.push({ type: "phone", value: line.match(phoneRegex)[0], risk: "medium", line: lineNo });
    }

    if (ipRegex.test(line)) {
      findings.push({ type: "ip", value: line.match(ipRegex)[0], risk: "low", line: lineNo });
    }

    if (passwordRegex.test(line)) {
      findings.push({ type: "password", value: line.split("=")[1], risk: "critical", line: lineNo });
    }

    if (apiKeyRegex.test(line)) {
      findings.push({ type: "api_key", value: line.split("=")[1], risk: "high", line: lineNo });
    }

    if (tokenRegex.test(line)) {
      findings.push({ type: "token", value: "hidden", risk: "high", line: lineNo });
    }

    if (sqlRegex.test(line)) {
      findings.push({ type: "sql_injection", risk: "high", line: lineNo });
    }

    if (line.toLowerCase().includes("exception") || line.toLowerCase().includes("error")) {
      findings.push({ type: "stack_trace", risk: "medium", line: lineNo });
    }

    if (line.toLowerCase().includes("failed login")) {
      failedLoginCount++;
      if (failedLoginCount >= 3) {
        findings.push({ type: "brute_force", risk: "high", line: lineNo });
      }
    }
  });

  // ✅ REMOVE DUPLICATES
  const unique = [];
  const seen = new Set();

  findings.forEach(f => {
    const key = `${f.type}-${f.line}-${f.value}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(f);
    }
  });

  return unique;
};