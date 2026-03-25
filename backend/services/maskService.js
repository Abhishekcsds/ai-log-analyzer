export const maskUsingFindings = (content, findings) => {
  let maskedContent = content;

  findings.forEach((f) => {
    if (f.value) {
      const safeValue = f.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safeValue, "g");
      maskedContent = maskedContent.replace(regex, "****");
    }

    // fallback masking
    if (f.type === "password") {
      maskedContent = maskedContent.replace(/password\s*=\s*\S+/gi, "password=****");
    }
  });

  return maskedContent;
};