"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // タイマーの開始
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("時間切れです！");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // beforeunloadイベントのリスナーを追加
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // 一部のブラウザで必要
      alert("ページを閉じようとしています。タイマーがリセットされます！");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // クリーンアップ
    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 時間をMM:SS形式にフォーマット
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div>
      残り時間: <span className="text-2xl">{formatTime(timeLeft)}</span>
    </div>
  );
}
