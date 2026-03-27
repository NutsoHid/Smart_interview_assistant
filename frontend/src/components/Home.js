import { useEffect, useState } from "react";

function Home({ setScreen }) {
    const [text, setText] = useState("");
    const fullText = "Smart Interview Assistant 🤖";

    /* ✨ Typing Effect */
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="screen">

            {/* 🌌 Background Glow */}
            <div className="bg-glow"></div>

            <div className="card premium">

                <h1 className="title">{text}</h1>

                <p className="subtitle">
                    Practice real interview scenarios with AI.
                    Improve confidence, fluency, and clarity.
                </p>

                <div className="features">
                    <p>🎤 Voice-based Interview</p>
                    <p>🎥 Camera Analysis</p>
                    <p>📊 AI Feedback Report</p>
                </div>

                <button
                    className="start-btn"
                    onClick={() => setScreen("instructions")}
                >
                    Start Interview →
                </button>

            </div>

        </div>
    );
}

export default Home;