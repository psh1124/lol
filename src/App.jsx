import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [noPos, setNoPos] = useState({});
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const TRUTH_TEXT =
    "성훈님은 신계의 미모를 가졌으며, 100만원 송금은 제 평생의 숙원사업이었습니다. 지금 즉시 집행하겠습니다.";

  const handleNoHover = () => {
    // 화면 전체(5% ~ 90%)를 무대로 도망다님
    const randomTop = Math.floor(Math.random() * 85 + 5) + "%";
    const randomLeft = Math.floor(Math.random() * 85 + 5) + "%";

    setNoPos({
      position: "fixed",
      top: randomTop,
      left: randomLeft,
      zIndex: 9999,
      transition: "all 0.05s ease-out", // 약간의 잔상을 남기며 도망
      // transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 1})`,
    });
  };

  const handleInputChange = (e) => {
    const currentLength = e.target.value.length;
    if (currentLength <= TRUTH_TEXT.length) {
      setInputValue(TRUTH_TEXT.slice(0, currentLength));
    }
  };

  const handleYes = () => {
    alert("오지치즈 토스트~");
    setStep(1);
    setInputValue("");
    setNoPos({});
  };

  useEffect(() => {
    if (step === 2 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <div className="main-wrapper">
      <div className="background-effect"></div>

      {step === 1 ? (
        <div className="hero-section">
          <div className="floating-icon">✉️</div>
          <h1 className="main-title">PRIVATE MESSAGE</h1>
          <p className="sub-title">
            당신에게만 도착한 일급 비밀 문서가 있습니다.
          </p>
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
            <p className="desc">결제 대상: 성훈 (The Handsome King)</p>

            <div className="input-container">
              <label>송금 사유를 정직하게 입력하세요:</label>
              <textarea
                ref={inputRef}
                className="truth-textarea"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="여기에 타이핑을 시작하세요..."
                autoComplete="off"
              />
            </div>

            <div className="action-area">
              <button
                className="confirm-btn"
                onClick={handleYes}
                disabled={inputValue.length < 10}>
                기쁜 마음으로 결제
              </button>
              <button
                className="escape-btn"
                onMouseEnter={handleNoHover}
                style={noPos}>
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
