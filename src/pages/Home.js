import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiCheckCircle, FiSearch, FiCamera, FiUsers, FiThumbsUp, FiFileText, FiClock, FiShield } from "react-icons/fi";

export default function Home() {
  const username = "Kushal Smarty";
  const navigate = useNavigate();

  const stats = [
    { icon: <FiUsers size={22} />, label: "Total Items", value: 0 },
    { icon: <FiClock size={22} />, label: "This Week", value: 0 },
    { icon: <FiFileText size={22} />, label: "Your Reports", value: 0 },
    { icon: <FiThumbsUp size={22} />, label: "Successful Matches", value: 0 },
  ];

  const features = [
    {
      icon: <FiCamera size={30} color="#2563eb" />,
      title: "Instant QR Scanning",
      desc: "Scan QR codes on found items for instant identification and owner contact",
      color: "#e0f2fe"
    },
    {
      icon: <FiCheckCircle size={30} color="#16a34a" />,
      title: "Real-time Matching",
      desc: "Get notified instantly when someone reports finding your lost item",
      color: "#dcfce7"
    },
    {
      icon: <FiShield size={30} color="#a21caf" />,
      title: "Easy Claims",
      desc: "Simple verification process to claim your items securely",
      color: "#f3e8ff"
    }
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: 32 }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px #1e293b12",
        padding: 32,
        maxWidth: 1100,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 4 }}>SREC Found IT</h1>
          <div style={{ color: "#64748b", letterSpacing: 1, fontWeight: 500, marginBottom: 16 }}>
            Connect with your college community to reunite lost items with their owners.<br />
            <span style={{ color: "#2563eb", fontWeight: 700 }}>Powered by QR technology.</span>
          </div>
        </div>
        <div style={{
          background: "#e0e7ff", borderRadius: 12, display: "inline-block", padding: "12px 28px",
          margin: "16px auto 36px", fontWeight: 600, color: "#3730a3"
        }}>
          <span style={{
            background: "#6366f1", color: "#fff", fontWeight: 700, padding: "7px 13px",
            borderRadius: "50%", marginRight: 14
          }}>K</span>
          Welcome back, {username}!
        </div>
        <div style={{
          display: "flex", gap: 28, justifyContent: "space-between", marginTop: 10, marginBottom: 44, flexWrap: "wrap"
        }}>
          <ActionCard
            title="Report Lost Item"
            desc="Lost something? Let us help you find it"
            icon={<FiPlusCircle size={40} color="#ea580c" />}
            color="#fee2e2"
            onClick={() => navigate('/lost')}
          />
          <ActionCard
            title="Report Found Item"
            desc="Found something? Help return it to owner"
            icon={<FiCheckCircle size={40} color="#17a34a" />}
            color="#dcfce7"
            onClick={() => navigate('/found')}
          />
          <ActionCard
            title="Scan QR Code"
            desc="Scan item QR code for instant details"
            icon={<FiCamera size={40} color="#a21caf" />}
            color="#f3e8ff"
            onClick={() => alert('This is a demo QR code scanner popup!')}
          />
          <ActionCard
            title="Browse Items"
            desc="Search all lost & found items"
            icon={<FiSearch size={40} color="#3b82f6" />}
            color="#dbeafe"
            onClick={() => navigate('/browse')}
          />
        </div>
        <div style={{ display: "flex", gap: 30, justifyContent: "center", marginTop: 16, marginBottom: 40, flexWrap: "wrap" }}>
          {stats.map(({ icon, label, value }, i) =>
            <div key={label} style={{
              padding: "20px 38px",
              borderRadius: 12,
              background: "#f1f5f9",
              textAlign: "center",
              minWidth: 150
            }}>
              <div style={{ marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: 900, fontSize: 21 }}>{value}</div>
              <div style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}>{label}</div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 25, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
          {features.map((f, i) =>
            <div key={i} style={{
              background: f.color,
              borderRadius: 13,
              flex: 1,
              minWidth: 250,
              maxWidth: 340,
              padding: 28,
              margin: "0 6px",
              display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <div style={{ marginBottom: 13 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: "#334155", fontSize: 14, textAlign: "center" }}>{f.desc}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: color,
        borderRadius: 16,
        flex: 1,
        minWidth: 230,
        maxWidth: 255,
        minHeight: 170,
        margin: "0 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 2px 12px #0001",
        padding: 24,
        transition: "transform 0.1s",
      }}>
      <div style={{ marginBottom: 13 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 7 }}>{title}</div>
      <div style={{ color: "#334155", fontSize: 14, textAlign: "center" }}>{desc}</div>
    </div>
  );
}
