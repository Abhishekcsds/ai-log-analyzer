export const patterns = {
    // ✅ Email
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i,
  
    // ✅ Phone
    phone: /\b\d{10}\b/,
  
    // ✅ API Key (full capture)
    api_key: /sk-[a-zA-Z0-9-]+/,
  
    // ✅ Password (full line, will clean later)
    password: /password\s*=\s*\S+/i,
  
    // ✅ Token
    token: /token\s*=\s*\S+/i,
  
    // ✅ FIXED: Only capture actual exception names
    stack_trace: /\b[A-Za-z]+Exception\b/,
  };