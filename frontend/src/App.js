import { useState, useEffect } from "react";
import Home from "./components/Home";
import Instructions from "./components/Instructions";
import Permission from "./components/Permission";
import Interview from "./components/Interview";
import Result from "./components/Result";
import ParticleBackground from "./components/ParticleBackground";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [scores, setScores] = useState(null);

  // 🌌 Parallax glow effect
  useEffect(() => {
    const glow1 = document.querySelector(".bg-glow");
    const glow2 = document.querySelector(".bg-glow2");

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (glow1 && glow2) {
        glow1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        glow2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      {/* 🌌 Background */}
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>
      <ParticleBackground />

      {/* 📱 Screens */}
      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "instructions" && <Instructions setScreen={setScreen} />}
      {screen === "permission" && <Permission setScreen={setScreen} />}
      {screen === "interview" && (
        <Interview setScreen={setScreen} setScores={setScores} />
      )}
      {screen === "result" && (
        <Result scores={scores} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;