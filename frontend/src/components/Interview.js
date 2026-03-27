import { useEffect, useRef, useState } from "react";

function Interview({ setScreen, setScores }) {
    const videoRef = useRef(null);

    const [question, setQuestion] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const answersRef = useRef([]);
    const currentAnswerRef = useRef("");

    const questions = [
        "Tell me about yourself",
        "Explain JavaScript",
        "Describe your project"
    ];

    useEffect(() => {
        startCamera();
        startSpeech();
        startTimer();
        ask(0);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    /* 🎥 CAMERA */
    const startCamera = async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch {
            alert("Camera permission denied");
        }
    };

    /* 🎤 SPEECH */
    const startSpeech = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported");
            return;
        }

        const rec = new SpeechRecognition();
        rec.continuous = true;

        rec.onresult = (e) => {
            let t = e.results[e.results.length - 1][0].transcript;
            currentAnswerRef.current += " " + t;
            setText(currentAnswerRef.current);
        };

        rec.start();
    };

    /* 🗣️ AI SPEAK */
    const speak = (q) => {
        setIsSpeaking(true);

        let speech = new SpeechSynthesisUtterance(q);

        speech.onend = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(speech);
    };

    /* ⏱ TIMER */
    const startTimer = () => {
        setInterval(() => {
            setTime((t) => t + 1);
        }, 1000);
    };

    /* ❓ FLOW */
    const ask = (i) => {
        if (i >= questions.length) return finish();

        setQuestion(questions[i]);
        speak(questions[i]);

        currentAnswerRef.current = "";

        setTimeout(() => {
            answersRef.current.push(currentAnswerRef.current);
            ask(i + 1);
        }, 8000);
    };

    /* ✅ FINISH */
    const finish = () => {
        setScores({
            confidence: Math.random() * 100,
            fluency: Math.random() * 100,
            clarity: Math.random() * 100
        });

        setScreen("result");
    };

    return (
        <div className="meet-container">

            {/* 🎥 USER FULL VIDEO */}
            <video ref={videoRef} autoPlay muted className="main-video" />

            {/* 🤖 AI SMALL BOX */}
            <div className="ai-box">
                <img
                    src="/avatar.gif"
                    alt="AI"
                    className={`ai-avatar ${isSpeaking ? "speaking" : ""}`}
                />
                <p>{isSpeaking ? "AI Speaking..." : "Listening..."}</p>
            </div>

            {/* 📋 BOTTOM PANEL */}
            <div className="bottom-panel">

                <h2 className="question">{question}</h2>

                <p className="transcript">
                    {text || "Start speaking..."}
                </p>

                <p className="timer">⏱ {time}s</p>

            </div>

        </div>
    );
}

export default Interview;