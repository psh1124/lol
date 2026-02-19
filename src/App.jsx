import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [noPos, setNoPos] = useState({});

  const handleNoHover = () => {
    // 1. 마우스가 버튼 근처에 오자마자 즉시 이동 (0초)
    const randomTop = Math.floor(Math.random() * 85 + 5) + "%";
    const randomLeft = Math.floor(Math.random() * 85 + 5) + "%";

    // 2. 0.01초의 찰나도 허용하지 않는 즉각 이동
    setNoPos({
      position: "fixed",
      top: randomTop,
      left: randomLeft,
      zIndex: 9999,
      // 0s로 설정하면 '슥'이 아니라 '슉' 하고 사라집니다.
      transition: "none",
      transform: `rotate(${Math.random() * 360}deg)`, // 각도까지 무작위로 바꿔서 더 혼란스럽게!
    });
  };

  const handleYes = () => {
    alert("슬라이스~ 치즈");
    setStep(1); // 다시 처음으로
    setNoPos({}); // 버튼 위치 초기화
  };

  return (
    <div className="main-container">
      <div className="glass-card">
        {step === 1 ? (
          <div className="content-box">
            <div className="icon">✉️</div>
            <h1>중요한 알림이 있습니다</h1>
            <p>익명으로부터 개인적인 메시지가 도착했습니다.</p>
            <button className="btn-primary" onClick={() => setStep(2)}>
              지금 확인하기
            </button>
          </div>
        ) : (
          <div className="content-box">
            <div className="icon">🚨</div>
            <h1>결제 최종 승인</h1>
            <p className="alert-text">
              성훈이의 밥값으로 <strong>1,000,000원</strong>이 청구됩니다.
              <br />
              이대로 결제를 진행하시겠습니까?
            </p>

            <div className="btn-group">
              <button className="btn-primary" onClick={handleYes}>
                네, 승인합니다
              </button>
              <button
                className="btn-secondary"
                onMouseEnter={handleNoHover} // 마우스가 닿기 전 반응
                style={noPos}>
                아니요
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
