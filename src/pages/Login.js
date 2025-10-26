import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    // Save fake user for session/demo
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        email,
        full_name: email.split('@')[0] || 'Campus User',
        role: 'student',
        points: 50,
        created_date: new Date().toISOString()
      })
    );
    // Reload - always works in any router/tunnel
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "linear-gradient(135deg, #f8fafc, #dbeafe)"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff', padding: 32, borderRadius: 16,
          boxShadow: '0 4px 24px #0001', minWidth: 350, maxWidth: 400
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{
            width: 54, height: 54, background: "linear-gradient(to right,#2563eb,#6366f1)",
            borderRadius: 16, margin: "0 auto 12px auto", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>CC</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: 28 }}>Campus Connect</h1>
          <div style={{ color: "#64748b", fontSize: 16 }}>Lost & Found Hub</div>
        </div>
        {error && (
          <div style={{
            background: "#fee2e2", color: "#b91c1c", padding: 10,
            borderRadius: 8, marginBottom: 16, textAlign: "center"
          }}>{error}</div>
        )}
        <label style={{ fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>
          Email
          <input
            type="email"
            value={email}
            autoFocus
            style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 6, border: "1px solid #cbd5e1", marginBottom: 16 }}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#334155", display: "block", marginBottom: 20 }}>
          Password
          <input
            type="password"
            value={password}
            style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 6, border: "1px solid #cbd5e1" }}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(90deg, #2563eb, #6366f1)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            boxShadow: "0 1px 6px #1e293b22"
          }}
        >
          Sign In
        </button>
        <div style={{ color: "#9ca3af", marginTop: 16, textAlign: "center", fontSize: 13 }}>
          Demo: Use any email and password
        </div>
      </form>
    </div>
  );
}
