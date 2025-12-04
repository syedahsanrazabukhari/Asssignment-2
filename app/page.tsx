"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Recreate original index.html dynamic behaviors
    function createHeart() {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.innerHTML = '💖'
      heart.style.left = Math.random() * 100 + 'vw'
      heart.style.animationDelay = Math.random() * 2 + 's'
      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 4000)
    }

    function createSparkle() {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      sparkle.style.left = Math.random() * 100 + 'vw'
      sparkle.style.top = Math.random() * 100 + 'vh'
      sparkle.style.animationDelay = Math.random() * 3 + 's'
      document.body.appendChild(sparkle)

      setTimeout(() => sparkle.remove(), 3000)
    }

    const heartInterval = setInterval(createHeart, 800)
    const sparkleInterval = setInterval(createSparkle, 500)

    document.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.8) {
        const sparkle = document.createElement('div')
        sparkle.className = 'sparkle'
        sparkle.style.left = e.clientX + 'px'
        sparkle.style.top = e.clientY + 'px'
        sparkle.style.position = 'fixed'
        document.body.appendChild(sparkle)

        setTimeout(() => sparkle.remove(), 3000)
      }
    })

    // Add animation delays for floating emojis if present
    document.querySelectorAll('.floating-emoji').forEach((emoji, index) => {
      const el = emoji as HTMLElement
      el.style.animationDelay = `${index * 0.5}s`
      el.style.animationDuration = `${4 + Math.random() * 4}s`
    })

    return () => {
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  // startJourney mirrors original behavior: store localStorage then navigate to gallery
  function startJourney() {
    try { localStorage.setItem('playMusicRequested', '1') } catch (e) { console.warn(e) }
    // small visual press feedback handled in CSS; navigate after short delay
    setTimeout(() => router.push('/gallery?play=1'), 120)
  }

  return (
    <main>
      {/* Background floating emojis (kept markup identical) */}
      <div className="floating-emoji" style={{ top: '10%', left: '5%' }}>💖</div>
      <div className="floating-emoji" style={{ top: '20%', right: '10%' }}>💋</div>
      <div className="floating-emoji" style={{ top: '60%', left: '8%' }}>🥰</div>
      <div className="floating-emoji" style={{ top: '70%', right: '15%' }}>🌸</div>
      <div className="floating-emoji" style={{ top: '30%', left: '85%' }}>💫</div>
      <div className="floating-emoji" style={{ top: '80%', right: '5%' }}>💌</div>
      <div className="floating-emoji" style={{ top: '15%', left: '70%' }}>🧸</div>
      <div className="floating-emoji" style={{ top: '45%', right: '80%' }}>💖</div>
      <div className="floating-emoji" style={{ top: '85%', left: '25%' }}>🌸</div>
      <div className="floating-emoji" style={{ top: '5%', right: '40%' }}>💫</div>

      <div className="container">
        <h1 className="main-title">Tumaree liyee chotaa surprise</h1>

        <div className="main-heading">
          Heyyy ,Sunoo 💖<br />
          I Have something for you 🦋<br />
           <strong>Hehehe </strong>... and this one's only for <strong>YOU</strong> 💕
        </div>

        <button className="journey-btn" onClick={startJourney} aria-label="Play music and start surprise">
          Play Music & Start Surprise 💫
        </button>
      </div>

      <audio id="bgMusic" loop>
        <source src="https://www.soundjay.com/misc/sounds/romantic-piano.mp3" type="audio/mpeg" />
      </audio>
    </main>
  )
}
