import { useEffect, useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaCalendarAlt, FaTrash, FaInbox } from "react-icons/fa";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await API.get("/contact");
      setMessages(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    try {
      await API.delete(`/contact/${id}`);
      toast.success("Message deleted successfully");
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  }

  if (loading) return <h2 style={{ padding: "20px" }}>Loading Messages...</h2>;
  if (error) return <h2 style={{ padding: "20px", color: "#dc3545" }}>{error}</h2>;

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Contact Messages</h1>
        <span style={{
          background: "#007bff",
          color: "white",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "0.9rem",
          fontWeight: "bold"
        }}>
          Total: {messages.length}
        </span>
      </div>

      {messages.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "45px 20px",
          color: "#888",
          border: "2px dashed #ccc",
          borderRadius: "12px",
          margin: "20px 0"
        }}>
          <FaInbox size={48} style={{ marginBottom: "12px", opacity: 0.7 }} />
          <p style={{ fontSize: "1.1rem" }}>No messages received yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="course-item"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderLeft: "5px solid #007bff",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaUser style={{ color: "#007bff" }} /> {msg.name}
                  </span>
                  <a
                    href={`mailto:${msg.email}`}
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.95rem"
                    }}
                  >
                    <FaEnvelope /> {msg.email}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8, display: "flex", alignItems: "center", gap: "6px" }}>
                    <FaCalendarAlt /> {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#bd2130"}
                    onMouseLeave={(e) => e.target.style.background = "#dc3545"}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "8px 0" }} />
              <p style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
                fontSize: "1rem",
                opacity: 0.9
              }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
