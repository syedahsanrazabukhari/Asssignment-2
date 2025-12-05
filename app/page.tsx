"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showBirthdayText, setShowBirthdayText] = useState(true);

  const wishes = [
    "May all your dreams come true! 💖",
    "Wishing you a day full of love & joy! 🥰",
    "Stay happy, healthy & blessed! 🌸",
    "May your year be filled with laughter! 🎉",
    "Sending hugs, kisses and endless smiles! 💕",
    "You deserve all the happiness today! 🦋",
  ];

  // === Text blink/fade logic ===
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBirthdayText(false);
      setTimeout(() => setShowBirthdayText(true), 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // === Floating hearts, sparkles, balloons, wishes ===
  useEffect(() => {
    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart";
      const emojis = ["💖", "💗", "💞", "💕"];
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    }

    function createSparkle() {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      sparkle.style.animationDuration = 2 + Math.random() * 2 + "s";
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 4000);
    }

    function createBalloon() {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      const messages = ["🎈 Happy Birthday!", "🎉 Celebrate!", "🥳 Enjoy your day!", "💌 With love"];
      balloon.textContent = messages[Math.floor(Math.random() * messages.length)];
      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.animationDuration = 8 + Math.random() * 4 + "s";
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 12000);
    }

    function createWish() {
      const wish = document.createElement("div");
      wish.className = "wish";
      wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];
      wish.style.left = Math.random() * 80 + "vw";
      wish.style.animationDuration = 6 + Math.random() * 4 + "s";
      document.body.appendChild(wish);
      setTimeout(() => wish.remove(), 10000);
    }

    const heartInterval = setInterval(createHeart, 600);
    const sparkleInterval = setInterval(createSparkle, 400);
    const balloonInterval = setInterval(createBalloon, 1500);
    const wishInterval = setInterval(createWish, 2000);

    return () => {
      clearInterval(heartInterval);
      clearInterval(sparkleInterval);
      clearInterval(balloonInterval);
      clearInterval(wishInterval);
    };
  }, []);

  // Navigate to gallery
  const startJourney = () => {
    try { localStorage.setItem("playMusicRequested", "1"); } catch(e) {}
    setTimeout(() => router.push("/gallery?play=1"), 120);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center bg-gradient">
      {/* Birthday Text */}
      {showBirthdayText && (
        <h1 className="birthday-text">🎉 Happy Birthday to you dear 💖</h1>
      )}

      <div className="text-center z-10 px-6">
        <h2 className="main-title">Tumaree liyee chotaa surprise</h2>
        <p className="subtitle">
          Heyyy, Sunoo 💖 <br />
          I have something for you 🦋 <br />
          <strong>Hehehe</strong> ... and this one's only for <strong>YOU</strong> 💕
        </p>
        <button onClick={startJourney} className="start-btn">
          Play Music & Start Surprise 💫
        </button>
      </div>

      <audio id="bgMusic" loop>
        <source src="https://www.soundjay.com/misc/sounds/romantic-piano.mp3" type="audio/mpeg" />
      </audio>

      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb);
        }
        .birthday-text {
          position: absolute;
          top: 5%;
          font-size: 3rem;
          color: #fff;
          font-weight: bold;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
          animation: pulse 2s infinite alternate;
          z-index: 1000;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .main-title {
          font-size: 3rem;
          color: #ff5ca2;
          font-family: 'Brush Script MT', cursive;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        }
        .subtitle {
          font-size: 1.25rem;
          color: #fff;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
        }
        .start-btn {
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(6px);
          border: 2px solid #ff9ac2;
          border-radius: 9999px;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          color: #ff5ca2;
          cursor: pointer;
          transition: transform 0.3s;
          box-shadow: 0 10px 25px rgba(255,192,203,0.5);
        }
        .start-btn:hover {
          transform: translateY(-5px);
        }
        .heart {
          position: fixed;
          font-size: 1.5rem;
          animation: floatHeart 5s ease-in-out forwards;
          pointer-events: none;
        }
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-80px) rotate(15deg); opacity: 1; }
          100% { transform: translateY(-160px) rotate(-10deg); opacity: 0; }
        }
        .sparkle {
          position: fixed;
          font-size: 1rem;
          animation: sparkleAnim 1.5s ease-in-out forwards;
          pointer-events: none;
        }
        @keyframes sparkleAnim {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        .balloon {
          position: fixed;
          font-size: 1.5rem;
          animation: floatBalloon linear forwards;
          pointer-events: none;
        }
        @keyframes floatBalloon {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1); opacity: 0; }
        }
        .wish {
          position: fixed;
          font-size: 1.25rem;
          color: #fff;
          font-weight: bold;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
          animation: floatWish linear forwards;
          pointer-events: none;
        }
        @keyframes floatWish {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
