import express from "express";
import { analyzeLogs } from "../services/logAnalyzer.js";
import { calculateRisk } from "../services/riskEngine.js";
import { maskUsingFindings } from "../services/maskService.js";
import { generateInsights } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { content, input_type, options } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    // ✅ MULTI INPUT
    let findings = [];
    if (["log", "text", "sql", "chat"].includes(input_type)) {
      findings = analyzeLogs(content);
    }

    // ✅ RISK
    const { score, level } = calculateRisk(findings);

    // ✅ AI INSIGHTS
    let insights = [];
    const aiResponse = await generateInsights(content);
    if (typeof aiResponse === "string") {
      insights.push(aiResponse);
    }

    // fallback insights
    if (findings.some(f => f.type === "password")) {
      insights.push("Plain-text password detected, system vulnerable");
    }
    if (findings.some(f => f.type === "api_key")) {
      insights.push("API key exposed in logs");
    }
    if (findings.some(f => f.type === "stack_trace")) {
      insights.push("Stack trace reveals internal system details");
    }

    // ✅ POLICY ENGINE
    let action = "allowed";

    if (score > 12 && options?.block_high_risk) {
      action = "blocked";
    } else if (score >= 10) {
      action = "masked";
    }

    // ✅ MASKING
    let processedContent = content;
    if (options?.mask && action !== "blocked") {
      processedContent = maskUsingFindings(content, findings);
    }

    // ✅ DYNAMIC SUMMARY
    let summary = "No major issues detected";
    if (score >= 10) {
      summary = "Log contains high-risk sensitive data and security issues";
    } else if (score >= 5) {
      summary = "Log contains moderate risks and anomalies";
    }

    // ✅ BLOCK RESPONSE FORMAT FIX
    if (action === "blocked") {
      return res.json({
        summary: "Blocked due to high risk content",
        findings,
        risk_score: score,
        risk_level: level,
        action,
        insights: ["Request blocked due to critical risk"],
        content: null
      });
    }

    return res.json({
      summary,
      findings,
      risk_score: score,
      risk_level: level,
      action,
      insights,
      content: processedContent
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;