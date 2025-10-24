import { useEffect, useState } from "react";
import LogoGastroFlow from "../../../assets/LogoGastroFlow.png";

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Começa o fadeOut um pouco antes de terminar
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // aos 2.5s começa sumir

    // Remove totalmente depois do fade
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3500); // total de 3.5s (1s fade out)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-orange-500/80 via-yellow-500/70 to-orange-600/80
      ${fadeOut ? "animate-fadeOut" : "animate-fadeIn"}`}
    >
      <img
        src={LogoGastroFlow}
        alt="Logo GastroFlow"
        className="w-90 animate-zoomIn"
      />
    </div>
  );
}