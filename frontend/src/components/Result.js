function Result({ scores, setScreen }) {
    return (
        <div className="screen">

            <div className="card premium">

                <h2 className="title">📊 Interview Result</h2>

                <div className="score-box">

                    <div className="score">
                        <p>Confidence</p>
                        <div className="bar">
                            <div style={{ width: `${scores?.confidence}%` }}></div>
                        </div>
                        <span>{scores?.confidence.toFixed(0)}%</span>
                    </div>

                    <div className="score">
                        <p>Fluency</p>
                        <div className="bar">
                            <div style={{ width: `${scores?.fluency}%` }}></div>
                        </div>
                        <span>{scores?.fluency.toFixed(0)}%</span>
                    </div>

                    <div className="score">
                        <p>Clarity</p>
                        <div className="bar">
                            <div style={{ width: `${scores?.clarity}%` }}></div>
                        </div>
                        <span>{scores?.clarity.toFixed(0)}%</span>
                    </div>

                </div>

                <button onClick={() => setScreen("home")}>
                    Restart
                </button>

            </div>

        </div>
    );
}

export default Result;