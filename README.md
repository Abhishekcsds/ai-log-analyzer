# 🧠 AI Secure Data Intelligence Platform

An advanced AI-powered platform that analyzes logs, detects sensitive data, identifies security risks, and generates intelligent insights in real-time.

---

## 🚀 Overview

The **AI Secure Data Intelligence Platform** acts as:

* 🔐 AI Gateway
* 📊 Data Scanner
* 📄 Log Analyzer
* ⚠️ Risk Engine

It processes structured and unstructured data to detect vulnerabilities, sensitive information, and anomalies.

---

## ✨ Features

### 🔍 Sensitive Data Detection

Detects:

* Emails
* Passwords
* API Keys
* Tokens
* Secrets
* Phone numbers

---

### 🧾 Log Analyzer

* Upload `.log` / `.txt` files
* Line-by-line parsing
* Pattern detection (Regex + AI)
* Highlights risky lines

---

### ⚠️ Risk Engine

* Calculates:

  * Risk Score
  * Risk Level (Low / Medium / High)
* Classifies threats:

  * Critical
  * High
  * Medium
  * Low

---

### 🤖 AI Insights

* Generates:

  * Summary
  * Security risks
  * Anomalies
* Uses **Google Gemini API** (optional)

---

### 🛡️ Policy Engine

* Takes actions:

  * Mask sensitive data
  * Block high-risk logs
  * Allow safe content

---

### 🎨 UI Features

* Drag & Drop log upload
* Log visualization with color highlighting
* Risk badges per line
* JSON output viewer

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Custom CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── app.js
│
├── frontend/
│   ├── components/
│   ├── App.jsx
│
├── README.md
├── .gitignore
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-log-analyzer.git
cd ai-log-analyzer
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment (Render)

### Backend

* Create **Web Service**
* Start command:

```bash
node app.js
```

---

### Frontend

* Create **Static Site**
* Build command:

```bash
npm run build
```

---

## 🔗 API Usage

### Endpoint

```
POST /api/analyze
```

---

### Request Format

```json
{
  "input_type": "log",
  "content": "your log data",
  "options": {
    "mask": true,
    "block_high_risk": true,
    "log_analysis": true
  }
}
```

---

### Response Format

```json
{
  "summary": "Log contains high-risk issues",
  "findings": [
    {
      "type": "password",
      "risk": "critical",
      "line": 2
    }
  ],
  "risk_score": 12,
  "risk_level": "high",
  "action": "masked",
  "insights": [
    "Sensitive credentials exposed"
  ],
  "content": "processed logs"
}
```

---

## 🧪 Example

### Input

```
email=admin@gmail.com
password=admin123
api_key=sk-xyz
ERROR Exception
```

---

### Output

* Detects sensitive data
* Assigns risk score
* Highlights risky lines
* Masks credentials

---

## 🏆 Key Highlights

* Real-time log analysis
* AI-powered insights
* Security-focused design
* Modular architecture
* Hackathon-ready implementation

---

## 🚀 Future Improvements

* Real-time log streaming
* Dashboard analytics (charts & graphs)
* Multi-file analysis
* Chatbot-based log querying

---

## 👨‍💻 Author

**Abhishek Yadav**
Full Stack Developer | AI Enthusiast

---


