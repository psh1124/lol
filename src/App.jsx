import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("취소 요청 중...");
  const inputRef = useRef(null);

  const TRUTH_TEXT =
    "성훈님은 신계의 미모를 가졌으며, 100만원 송금은 제 평생의 숙원사업이었습니다. 지금 즉시 집행하겠습니다.";

  const handleNoClick = () => {
    setLoading(true);
    setProgress(0);
    setStatusText("취소 처리 중...");
  };

  useEffect(() => {
    let timer;
    if (loading) {
      // 0.05초마다 진행률 업데이트
      timer = setInterval(() => {
        setProgress((prev) => {
          let next;
          if (prev < 50) next = prev + 10;
          else if (prev < 90) next = prev + 0.5;
          else if (prev < 99.5) next = prev + 0.1;
          else next = prev;

          // 99.5% 이상 도달 시 실패 처리
          if (next >= 99.5) {
            clearInterval(timer);
            setStatusText("❌ 실패~");

            // 1.2초 뒤에 경고창 띄우고 로딩 해제
            setTimeout(() => {
              alert(
                "⚠️ 시스템 서버가 응답하지 않습니다. (취소 버튼 작동 불가)",
              );
              setLoading(false);
              setProgress(0);
              setStatusText("취소 요청 중...");
            }, 1200);

            return 99.9;
          }
          return next;
        });
      }, 50);
    }

    return () => clearInterval(timer);
  }, [loading]); // loading이 시작될 때만 이펙트 실행

  const handleInputChange = (e) => {
    const currentLength = e.target.value.length;
    if (currentLength <= TRUTH_TEXT.length) {
      setInputValue(TRUTH_TEXT.slice(0, currentLength));
    }
  };

  const handleYes = () => {
    alert("오지치즈토스트~");
    setStep(1);
    setInputValue("");
  };

  useEffect(() => {
    if (step === 2 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <div className="main-wrapper">
      <div className="background-effect"></div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="spinner"></div>
            <h2
              className={`status-msg ${statusText.includes("실패") ? "error-text" : ""}`}>
              {statusText}
            </h2>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  background: statusText.includes("실패")
                    ? "#ff003c"
                    : "#00ff41",
                  boxShadow: statusText.includes("실패")
                    ? "0 0 20px #ff003c"
                    : "0 0 20px #00ff41",
                }}></div>
            </div>
            <p className="progress-percent">{Math.floor(progress)}%</p>
          </div>
        </div>
      )}

      {step === 1 ? (
        <div className="hero-section">
          <div className="floating-icon">✉️</div>
          <h1 className="main-title">PRIVATE MESSAGE</h1>
          <button className="neon-btn" onClick={() => setStep(2)}>
            문서 열람하기
          </button>
        </div>
      ) : (
        <div className="full-screen-alert">
          <div className="alert-header">
            <span className="blink">●</span> EMERGENCY REPORT
          </div>
          <div className="content-inner">
            <h2 className="price-tag">청구 금액: 1,000,000 KRW</h2>
            <div className="input-container">
              <label>송금 사유를 입력하세요 (취소 불가):</label>
              <textarea
                ref={inputRef}
                className="truth-textarea"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="여기에 타이핑을 시작하세요..."
              />
            </div>
            <div className="action-area">
              <button
                className="confirm-btn"
                onClick={handleYes}
                disabled={inputValue.length < 10}>
                결제 승인
              </button>
              {/* 거부 버튼 빨간색 강조 */}
              <button className="escape-btn alert-red" onClick={handleNoClick}>
                결제 거부
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
