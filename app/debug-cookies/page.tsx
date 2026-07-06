// app/debug-cookies/page.tsx
// DOCASNA DIAGNOSTICKA STRANKA - po vyrieseni bugu ZMAZAT.
// Zobrazuje sb-* cookies tak, ako ich realne drzi BROWSER (nie server).

"use client";

import { useEffect, useState } from "react";

type CookieInfo = { name: string; length: number };

export default function DebugCookiesPage() {
  const [cookies, setCookies] = useState<CookieInfo[]>([]);
  const [ts, setTs] = useState("");

  const read = () => {
    const found = document.cookie
      .split("; ")
      .filter(Boolean)
      .map((c) => {
        const eq = c.indexOf("=");
        return { name: c.slice(0, eq), length: c.length - eq - 1 };
      })
      .filter((c) => c.name.startsWith("sb-"));
    setCookies(found);
    setTs(new Date().toISOString());
  };

  useEffect(() => {
    read();
    const id = setInterval(read, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "monospace", fontSize: 18, color: "#eee", background: "#1a2a1a", minHeight: "100vh" }}>
      <h1>Browser sb-* cookies</h1>
      <p>refresh: {ts} (auto kazdu sekundu)</p>
      {cookies.length === 0 ? (
        <p style={{ color: "#f66", fontSize: 24 }}>ZIADNE sb-* COOKIES V BROWSERI</p>
      ) : (
        <ul>
          {cookies.map((c) => (
            <li key={c.name} style={{ color: "#8f8" }}>
              {c.name} (dlzka {c.length})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
