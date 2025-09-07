import React, { useState, useEffect } from "react";
import styles from "../styles";

export default function Dashboard({ currentUser, setRoute }) {
  const [tab, setTab] = useState("all");
  const [items, setItems] = useState([]);
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [matchCandidate, setMatchCandidate] = useState(null);

  const [lostName, setLostName] = useState("");
  const [lostDesc, setLostDesc] = useState("");
  const [lostImage, setLostImage] = useState("");

  const [foundName, setFoundName] = useState("");
  const [foundDesc, setFoundDesc] = useState("");
  const [foundImage, setFoundImage] = useState("");

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setItems(savedItems);
    setStories(savedStories);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  useEffect(() => {
    const lostItem = items.find((it) => it.status === "Lost");
    if (lostItem) {
      const matches = items.filter(
        (f) =>
          f.status === "Found" &&
          (f.name.toLowerCase().includes(lostItem.name.toLowerCase()) ||
            f.desc.toLowerCase().includes(lostItem.desc.toLowerCase()))
      );
      if (matches.length > 0) setMatchCandidate({ lost: lostItem, found: matches });
    }
  }, [items]);

  const confirmMatch = (lost, found) => {
    setStories((prev) => [
      ...prev,
      { ...lost, status: "Returned", message: `🎉 Great news! "${lost.name}" has been returned.` },
    ]);
    setItems((prev) => prev.filter((it) => it.id !== lost.id && it.id !== found.id));
    setMatchCandidate(null);
    showToast(`✅ ${lost.name} marked as returned!`);
  };

  const rejectMatch = () => setMatchCandidate(null);

  const handleLostSubmit = (e) => {
    e.preventDefault();
    if (!lostName || !lostDesc) return alert("Fill all fields");
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: lostName,
        desc: lostDesc,
        image: lostImage,
        status: "Lost",
        reporter: currentUser.name,
        regdNo: currentUser.regdNo,
      },
    ]);
    setLostName(""); setLostDesc(""); setLostImage(""); setTab("all");
    showToast(`✅ Lost item "${lostName}" added`);
  };

  const handleFoundSubmit = (e) => {
    e.preventDefault();
    if (!foundName || !foundDesc) return alert("Fill all fields");
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: foundName,
        desc: foundDesc,
        image: foundImage,
        status: "Found",
        reporter: currentUser.name,
        regdNo: currentUser.regdNo,
      },
    ]);
    setFoundName(""); setFoundDesc(""); setFoundImage(""); setTab("all");
    showToast(`✅ Found item "${foundName}" added`);
  };

  const handleReturn = (item, message = `"${item.name}" successfully returned`) => {
    setItems((prev) => prev.filter((it) => it.id !== item.id));
    setStories((prev) => [...prev, { ...item, status: "Returned", message }]);
    showToast(`✅ "${item.name}" returned`);
    setEditing(null);
  };

  const handleOpenEdit = (item) => setEditing(item);
  const handleCloseModal = () => setEditing(null);

  const filtered = items.filter((it) => {
    if (filter !== "all" && it.status !== filter) return false;
    if (!searchQuery) return true;
    return it.name.toLowerCase().includes(searchQuery.toLowerCase()) || it.desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const similarFound = lostName
    ? items.filter((it) => it.status === "Found" && it.name.toLowerCase().includes(lostName.toLowerCase()))
    : [];

  // Adjusted navbar height and spacing beneath navbar
  const NAV_HEIGHT = 70; // Adjust this to your navbar's actual height

  return (
    <div
      style={{
        ...styles.pageBg("#7e22ce", "#ef4444"),
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          ...styles.dashboardHeader,
          flexWrap: "wrap",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between", // Keeps title left, buttons right
      alignItems: "center",
      minHeight: NAV_HEIGHT,
        }}
      >
        <div style={{ color: "white", paddingRight: 8}}>
          🎒 Dashboard - <span style={{ color: "black" }}>{currentUser.name} ({currentUser.regdNo})</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" ,justifyContent: "flex-end",
        alignItems: "center",
        maxWidth: "100vw", // Limit container width to viewport width
        paddingRight: 10}}>
          <button style={styles.btnWhite} onClick={() => setTab("lost")}>Lost Report</button>
          <button style={styles.btnYellow} onClick={() => setTab("found")}>Found Report</button>
          <button style={styles.btnBlue} onClick={() => setTab("all")}>All Reports</button>
          <button style={styles.btnGreen} onClick={() => setTab("stories")}>Success Stories</button>
          <button style={{...styles.btnRed,marginRight:18}} onClick={() => setRoute("home")}>Logout</button>
        </div>
      </div>

      {/* Reduced spacer below navbar */}
      <div style={{ height: NAV_HEIGHT - 20 }} />

      {/* Lost Form */}
      {tab === "lost" && (
        <div style={{ ...styles.centerCard, overflowY: "auto" }}>
          <div style={styles.card}>
            <h2 style={styles.title}>📢 Report Lost Item</h2>
            <form onSubmit={handleLostSubmit}>
              <label style={styles.label}>Item Name</label>
              <input style={styles.input} value={lostName} onChange={(e) => setLostName(e.target.value)} />
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, minHeight: 80 }} value={lostDesc} onChange={(e) => setLostDesc(e.target.value)} />
              <label style={styles.label}>Upload Image</label>
              <input type="file" accept="image/*" style={styles.input} onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setLostImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }} />
              <button type="submit" style={{ ...styles.btnBlue, marginTop: 12 }}>Submit Lost Report</button>
            </form>

            {similarFound.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3 style={{ ...styles.sectionTitle, color: "black" }}>🔎 Similar Found Items</h3>
                <div style={{ ...styles.cardGrid, overflowX: "auto" }}>
                  {similarFound.map((it) => (
                    <div key={it.id} style={{ background: "white", padding: 12, borderRadius: 12 }}>
                      <div style={{ fontWeight: 800, color: "black" }}>{it.name}</div>
                      <div style={{ fontWeight: 800, color: "black" }}>{it.desc}</div>
                      {it.image && <img src={it.image} alt="found" style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8 }} />}
                      <div style={{ color: "black" }}>{it.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Found Form */}
      {tab === "found" && (
        <div style={{ ...styles.centerCard, overflowY: "auto" }}>
          <div style={styles.card}>
            <h2 style={styles.title}>🔎 Report Found Item</h2>
            <form onSubmit={handleFoundSubmit}>
              <label style={styles.label}>Item Name</label>
              <input style={styles.input} value={foundName} onChange={(e) => setFoundName(e.target.value)} />
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, minHeight: 80 }} value={foundDesc} onChange={(e) => setFoundDesc(e.target.value)} />
              <label style={styles.label}>Upload Image</label>
              <input type="file" accept="image/*" style={styles.input} onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setFoundImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }} />
              <button type="submit" style={{ ...styles.btnYellow, marginTop: 12 }}>Submit Found Report</button>
            </form>
          </div>
        </div>
      )}

      {/* All Items */}
      {tab === "all" && (
        <div style={{ padding: "12px 20px 20px 20px", overflowX: "auto" }}>
          <h3 style={{ ...styles.sectionTitle, color: "black", marginTop: 0 }}>🔍 All Items</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <button style={{ ...styles.btnWhite, opacity: filter === "all" ? 1 : 0.6 }} onClick={() => setFilter("all")}>All</button>
            <button style={{ ...styles.btnBlue, opacity: filter === "Lost" ? 1 : 0.6 }} onClick={() => setFilter("Lost")}>Lost</button>
            <button style={{ ...styles.btnYellow, opacity: filter === "Found" ? 1 : 0.6 }} onClick={() => setFilter("Found")}>Found</button>
            <button style={{ ...styles.btnGreen, opacity: filter === "Returned" ? 1 : 0.6 }} onClick={() => setFilter("Returned")}>Returned</button>
          </div>
          <input placeholder="Search..." style={styles.input} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Only two columns per row
            gap: 16,
            marginTop: 12,
          }}>
            {filtered.map((it) => (
              <div key={it.id} style={{ background: "white", padding: 12, borderRadius: 12 }}>
                <div style={{ fontWeight: 800, color: "#1d4ed8" }}>Item Name: <span style={{ color: "black" }}>{it.name}</span></div>
                <div style={{ fontWeight: 800, color: "#1d4ed8" }}>Item Description: <span style={{ color: "black" }}>{it.desc}</span></div>
                <div style={{ fontWeight: 600, color: "#1d4ed8" }}>Status: <span style={{ color: "black" }}>{it.status}</span></div>
                <div style={{ color: "black", fontSize: 14 }}>Reported by: <b>{currentUser.section}</b> ({currentUser.regdNo|| "N/A"})</div>
                {it.image && <img src={it.image} alt="item" style={{ maxWidth: 180, borderRadius: 8, marginTop: 6 }} />}
                <button style={styles.btnYellow} onClick={() => handleOpenEdit(it)}>Edit</button>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ color: "white" }}>No items found</div>}
          </div>
        </div>
      )}

      {/* Success Stories */}
      {tab === "stories" && (
        <div style={{ padding: 20, overflowY: "auto" }}>
          <h3 style={{ ...styles.sectionTitle, color: "black" }}>🌟 Success Stories</h3>
          <div style={{ ...styles.cardGrid, overflowX: "auto" }}>
            {stories.map((s, i) => (
              <div key={i} style={{ background: "white", padding: 12, borderRadius: 12 }}>
                <div style={{ fontWeight: 800, color: "black" }}>{s.name}</div>
                <div style={{ color: "black" }}>{s.message}</div>
                {s.image && <img src={s.image} alt="success" style={{ maxWidth: 180, borderRadius: 8, marginTop: 6 }} />}
              </div>
            ))}
            {stories.length === 0 && <div style={{ color: "white" }}>No success stories yet.</div>}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div style={{ ...styles.modalOverlay, overflowY: "auto" }}>
          <div style={{ ...styles.modalBox, maxHeight: "90vh", overflowY: "auto" }}>
            <h3>Edit Item</h3>
            <label style={styles.label}>Name</label>
            <input style={styles.input} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <label style={styles.label}>Description</label>
            <textarea style={{ ...styles.input, minHeight: 60 }} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />
            <label style={styles.label}>Upload Image</label>
            <input type="file" accept="image/*" style={styles.input} onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setEditing({ ...editing, image: reader.result });
                reader.readAsDataURL(file);
              }
            }} />
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {editing.status !== "Returned" && (
                <button style={styles.btnGreen} onClick={() => handleReturn(editing, prompt("Enter success message:") || `"${editing.name}" returned`)}>Mark as Returned</button>
              )}
              <button style={styles.btnBlue} onClick={() => {
                setItems((prev) => prev.map((it) => (it.id === editing.id ? editing : it)));
                setEditing(null);
                showToast(`✅ "${editing.name}" updated`);
              }}>Save Changes</button>
              <button style={styles.btnRed} onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Match Modal */}
      {matchCandidate && (
        <div style={{ ...styles.modalOverlay, overflowY: "auto" }}>
          <div style={{ ...styles.modalBox, maxHeight: "90vh", overflowY: "auto" }}>
            <h3>🔎 Possible Matches</h3>
            <div>
              <h4>Lost Item</h4>
              <div style={{ fontWeight: 800, color: "black" }}>{matchCandidate.lost.name}</div>
              <div style={{ fontWeight: 800, color: "black" }}>{matchCandidate.lost.desc}</div>
              {matchCandidate.lost.image && <img src={matchCandidate.lost.image} alt="lost" style={{ maxWidth: 200, borderRadius: 8, marginTop: 6 }} />}
            </div>

            <h2 style={{ marginTop: 20 ,color:"blueviolet"}}>Matching Found Items</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {matchCandidate.found.map((f) => (
                <div key={f.id} style={{ background: "#f9f9f9", padding: 10, borderRadius: 10 }}>
                  <div style={{ fontWeight: 800, color:"black" }}>{f.name}</div>
                  <div style={{ fontWeight: 800, color:"black" }}>{f.desc}</div>
                  {f.image && <img src={f.image} alt="found" style={{ maxWidth: 180, borderRadius: 8, marginTop: 6 }} />}
                  <button style={{ ...styles.btnGreen, marginTop: 10 }} onClick={() => confirmMatch(matchCandidate.lost, f)}>This is Mine ✅</button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <button style={styles.btnRed} onClick={rejectMatch}>Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ background: "white", padding: 10, borderRadius: 8, fontWeight: 600 }}>{t.msg}</div>
        ))}
      </div>
    </div>
  );
}
