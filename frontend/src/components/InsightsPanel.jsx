const InsightsPanel = ({ result }) => {
    return (
      <div className="insights">
        <h2>AI Insights</h2>
  
        <p><strong>Summary:</strong> {result.summary}</p>
        <p><strong>Risk Score:</strong> {result.risk_score}</p>
        <p><strong>Risk Level:</strong> {result.risk_level}</p>
  
        <pre>{result.insights}</pre>
  
        <h3>Findings</h3>
        <ul>
          {result.findings.map((f, i) => (
            <li key={i}>
              {f.type} → {f.value} (Line {f.line}, {f.risk})
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default InsightsPanel;