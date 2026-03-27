function Instructions({ setScreen }) {
    return (
        <div className="screen">
            <div className="card">

                <h2>📋 Instructions</h2>

                <ul className="list">
                    <li>Allow camera & microphone</li>
                    <li>Speak clearly and confidently</li>
                    <li>Answer each question carefully</li>
                </ul>

                <button onClick={() => setScreen("permission")}>
                    Continue →
                </button>

            </div>
        </div>
    );
}

export default Instructions;