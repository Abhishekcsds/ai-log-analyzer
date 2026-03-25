export const calculateRisk = (findings) => {
  let score = 0;

  findings.forEach(f => {
    if (f.risk === "critical") score += 5;
    else if (f.risk === "high") score += 3;
    else if (f.risk === "medium") score += 2;
    else score += 1;
  });

  let level = "low";
  if (score >= 10) level = "high";
  else if (score >= 5) level = "medium";

  return { score, level };
};