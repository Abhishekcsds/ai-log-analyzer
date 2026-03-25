const Result = ({ result }) => {
  if (!result) return null;

  return (
    <div className="insights">
      <h2>Analysis Output</h2>

      <p><b>Summary:</b> {result.summary}</p>
      <p><b>Risk Score:</b> {result.risk_score}</p>
      <p><b>Risk Level:</b> {result.risk_level}</p>
      <p><b>Action:</b> {result.action}</p>

      <h3>Insights</h3>
      <ul>
        {result.insights?.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3>Full JSON</h3>
      <pre className="json-box">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default Result;