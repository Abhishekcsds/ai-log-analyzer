// import { useState } from "react";
// import LogUpload from "./components/LogUpload.jsx";
// import LogViewer from "./components/LogViewer.jsx";
// import InsightsPanel from "./components/InsightsPanel.jsx";
// import "./style.css";

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <div className="app">
//       <h1>🔐 AI Secure Log Analyzer</h1>

//       <LogUpload setResult={setResult} />

//       {result && (
//         <>
//           <LogViewer result={result} />
//           <InsightsPanel result={result} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import LogUpload from "./components/LogUpload";
import Result from "./components/Result";
import LogViewer from "./components/LogViewer";
import "./style.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <div class="header-card">
  <h1>🧠 AI Secure Data Intelligence Platform</h1>

</div>

      {/* 🔼 Upload */}
      <LogUpload setResult={setResult} />

      {/* 🔥 Insights + JSON (TOP) */}
      {result && <Result result={result} />}

      {/* 🔽 Log Visualization (BOTTOM) */}
      {result && <LogViewer result={result} />}
    </div>
  );
}

export default App;