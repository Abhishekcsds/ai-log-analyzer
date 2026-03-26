import { useState } from "react";
import axios from "axios";

const LogUpload = ({ setResult }) => {
  const [log, setLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // 📂 Read file
  const readFile = (file) => {
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      setLog(e.target.result);
    };
    reader.readAsText(file);
  };

  // 🖱 Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    readFile(file);
  };

  // 🔍 Analyze Logs
  const analyze = async () => {
    if (!log.trim()) return alert("Enter or upload logs");

    setLoading(true);

    try {
      const res = await axios.post("https://ai-log-analyzer-jw3y.onrender.com/api/analyze", {
        content: log,
        input_type: "log",
        options: {
          mask: true,
          block_high_risk: true,
          log_analysis: true
        }
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Error analyzing logs");
      }
    }

    setLoading(false);
  };

  return (
    <div className="upload">
      <h2>Upload Logs</h2>

      {/* 📝 TEXT INPUT */}
      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder="Paste logs here..."
        className="log-input"
      />

      {/* 📦 DRAG & DROP AREA */}
      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>📂 Drag & Drop log file here</p>
        <span>or</span>

        <div className="drop-actions">
          {/* 📁 FILE INPUT */}
          <label className="file-upload">
            Choose File
            <input
              type="file"
              hidden
              accept=".log,.txt"
              onChange={(e) => readFile(e.target.files[0])}
            />
          </label>

          {/* 🔍 ANALYZE BUTTON */}
          <button onClick={analyze} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </div>

      {/* 📄 FILE NAME DISPLAY */}
      {fileName && (
        <p className="file-name">
          📄 <b>{fileName}</b>
        </p>
      )}
    </div>
  );
};

export default LogUpload;