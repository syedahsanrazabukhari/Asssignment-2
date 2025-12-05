"use client";
import { useEffect, useRef } from "react";

export default function GalleryPage() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const heartsRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // === Stars ===
    const starsContainer = starsRef.current;
    if (starsContainer) {
      starsContainer.innerHTML = "";
      for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
      }
    }

    // === Floating Hearts ===
    const heartsContainer = heartsRef.current;
    if (heartsContainer) {
      heartsContainer.innerHTML = "";
      const heartSymbols = ["♥", "❤", "💕", "💖", "💗"];
      for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${15 + Math.random() * 15}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${10 + Math.random() * 20}px`;
        heart.style.opacity = `${0.5 + Math.random() * 0.5}`;
        heart.style.color = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, ${Math.floor(100 + Math.random() * 100)}, ${0.5 + Math.random() * 0.5})`;
        heartsContainer.appendChild(heart);
      }
    }

    // === Gallery Cards ===
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.innerHTML = "";

    const totalCards = 10;
    const radius = window.innerWidth < 768 ? 350 : 500;
    let currentAngle = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let autoRotateInterval: any = null;

    const imageUrls = [
      "pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg","pic5.jpg",
      "pic6.jpg","pic7.jpg","pic8.jpg","pic9.jpg","pic10.jpg"
    ];

    for (let i = 0; i < totalCards; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${imageUrls[i]}" alt="Memories ${i + 1}"><div class="number">${i+1}</div>`;
      gallery.appendChild(card);
    }

    const cards = Array.from(gallery.querySelectorAll(".card"));

    function updateCards(extraRotation = 0) {
      cards.forEach((card, index) => {
        const angle = (currentAngle + extraRotation + index * (360 / totalCards)) * (Math.PI / 180);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = 20;
        const rotateY = (angle * 180) / Math.PI;

        (card as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg)`;

        const normalizedAngle = ((currentAngle + extraRotation + index * (360 / totalCards)) % 360 + 360) % 360;
        (card as HTMLElement).classList.toggle("active", normalizedAngle < 10 || normalizedAngle > 350);

        // Front bright, back dim
        let opacity = 0.3 + (Math.abs(normalizedAngle - 180) / 180) * 0.7;
        if (opacity > 1) opacity = 1;
        if (opacity < 0.3) opacity = 0.3;
        (card as HTMLElement).style.opacity = String(opacity);
      });
    }

    // === Dragging ===
    gallery.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      currentX = currentAngle;
      gallery.style.cursor = "grabbing";
      clearInterval(autoRotateInterval);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const diff = (e.clientX - startX) * 0.5;
      currentAngle = currentX + diff;
      updateCards();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      gallery.style.cursor = "grab";
      setTimeout(() => startAutoRotate(), 3000);
    });

    // === Auto Rotate ===
    function startAutoRotate() {
      clearInterval(autoRotateInterval);
      autoRotateInterval = setInterval(() => {
        currentAngle += 0.3;
        updateCards();
      }, 100);
    }

    updateCards();
    startAutoRotate();

    // Spotlight follow
    const mouseMoveHandler = (e: MouseEvent) => {
      if (spotlightRef.current) {
        (spotlightRef.current as HTMLElement).style.left = `${e.clientX}px`;
        (spotlightRef.current as HTMLElement).style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", mouseMoveHandler);

    // Music play
    let musicStarted = false;
    const startMusic = () => {
      if (musicStarted) return;
      if (bgMusicRef.current) {
        bgMusicRef.current.volume = 0.5;
        bgMusicRef.current.play().catch(() => {});
        musicStarted = true;
      }
    };
    document.body.addEventListener("click", startMusic, { once: true });
    document.body.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      clearInterval(autoRotateInterval);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        :global(body){
          margin:0;padding:0;overflow:hidden;font-family:Arial;display:flex;justify-content:center;align-items:center;min-height:100vh;
          background:linear-gradient(135deg,#ff9a9e,#fad0c4,#a18cd1,#fbc2eb);
        }
        .title-container{
          position:fixed;top:20px;width:100%;text-align:center;z-index:1000;pointer-events:none;
        }
        .title{font-family:'Brush Script MT', cursive;font-size:60px;color:white;margin:0;animation:float 3s ease-in-out infinite;}
        .subtitle{font-size:18px;color:white;margin-top:10px;opacity:.9;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .spotlight{position:fixed;top:0;left:50%;width:500px;height:500px;transform:translateX(-50%);background:radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%);pointer-events:none;z-index:2;animation:spotlightPulse 4s infinite;}
        @keyframes spotlightPulse{0%,100%{opacity:.5}50%{opacity:.9}}
        .stars{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}
        .star{position:absolute;background:white;border-radius:50%;animation:twinkle 1.5s infinite ease-in-out;}
        @keyframes twinkle{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
        .gallery-container{position:fixed;top:58%;left:50%;transform:translate(-50%,-50%);width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;perspective:2000px;z-index:1;}
        .gallery{position:relative;width:300px;height:400px;transform-style:preserve-3d;transition:transform .5s ease-out;z-index:3;}
        .center-heart{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;z-index:2;border-radius:15px;}
        .center-heart img{width:100%;height:100%;object-fit:cover;border-radius:15px;filter:brightness(1.1) saturate(1.2);}
        .card{position:absolute;width:300px;height:400px;background:rgba(255,255,255,0.2);border-radius:15px;backdrop-filter:blur(5px);border:2px solid rgba(255,255,255,0.6);transition:all .6s cubic-bezier(.4,0,.2,1);cursor:pointer;overflow:hidden;transform-origin:center center;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:4;}
        .card img{width:100%;height:100%;object-fit:cover;transform:scale(1.1);transition:transform .5s;}
        .card:hover img{transform:scale(1.2);}
        .card.active{transform:scale(1.2) translateZ(200px);box-shadow:0 20px 60px rgba(255,192,203,0.6);border:3px solid rgba(255,255,255,0.9);}
        @media(max-width:768px){
          .title{font-size:40px;}
          .gallery-container{transform:translate(-50%,-45%);}
          .center-heart{width:60px;height:60px;}
        }
      `}</style>

      <div className="title-container">
        <h1 className="title">♥ <b>"Happy Memories A special gallery for you"</b></h1>
        <p className="subtitle"></p>
      </div>

      <div className="stars" ref={starsRef}></div>
      <div className="floating-hearts" ref={heartsRef}></div>
      <div className="spotlight" ref={spotlightRef}></div>

      <div className="gallery-container">
        <div className="gallery" ref={galleryRef}></div>
        <div className="center-heart">
          <img src="/hurt.png" alt="Center Heart" />
        </div>
      </div>

      <audio ref={bgMusicRef} src="/romantic2.mp3" loop />
    </>
  );
}
