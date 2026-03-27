function Permission({ setScreen }) {
    const handlePermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setScreen("interview");
        } catch {
            alert("Permission denied");
        }
    };

    return (
        <div className="screen">
            <div className="card">

                <h2>🎥 Camera & Microphone</h2>

                <p>
                    We need access to your camera and microphone
                    to conduct the interview.
                </p>

                <button onClick={handlePermission}>
                    Allow & Start →
                </button>

            </div>
        </div>
    );
}

export default Permission;