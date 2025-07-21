import React, { useRef, useState } from 'react';

const playlist = [
  {
    title: 'Solar Fields - Introduction',
    artist: 'Solar Fields',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Solar_Fields/Random_Album/Solar_Fields_-_01_-_Introduction.mp3',
    art: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Windows_Vista_Aero.png',
  },
  {
    title: 'PS Vita - Home Menu',
    artist: 'Sony',
    url: 'https://vgmsite.com/soundtracks/ps-vita-system-music/01%20Home%20Menu.mp3',
    art: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Windows_Vista_Aero.png',
  },
  {
    title: 'Wii Shop Channel',
    artist: 'Nintendo',
    url: 'https://vgmsite.com/soundtracks/wii-shop-channel-music/01%20Wii%20Shop%20Channel.mp3',
    art: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Windows_Vista_Aero.png',
  },
  {
    title: 'PlayStation 3 System Music',
    artist: 'Sony',
    url: 'https://vgmsite.com/soundtracks/ps3-system-music/01%20Startup%20Intro.mp3',
    art: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Windows_Vista_Aero.png',
  },
  {
    title: 'Wii Sports OST - Title Screen',
    artist: 'Nintendo',
    url: 'https://vgmsite.com/soundtracks/wii-sports-ost/01%20Title%20Screen.mp3',
    art: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Windows_Vista_Aero.png',
  },
];

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const track = playlist[current];

  const playPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const next = () => {
    setCurrent((current + 1) % playlist.length);
    setPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const prev = () => {
    setCurrent((current - 1 + playlist.length) % playlist.length);
    setPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const onTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onEnded = () => {
    if (loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      next();
    }
  };

  const handleProgressClick = e => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 40,
      right: 40,
      zIndex: 1000,
      background: 'rgba(20,40,60,0.7)',
      borderRadius: '2rem',
      boxShadow: '0 8px 32px 0 rgba(0,255,255,0.25)',
      backdropFilter: 'blur(16px)',
      padding: '2rem 2.5rem',
      minWidth: 340,
      maxWidth: 400,
      color: '#fff',
      fontFamily: 'Orbitron, sans-serif',
      border: '1.5px solid rgba(0,255,255,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'box-shadow 0.3s',
    }}>
      <audio
        ref={audioRef}
        src={track.url}
        loop={loop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        autoPlay={playing}
      />
      <div style={{
        width: 110,
        height: 110,
        borderRadius: '50%',
        background: 'rgba(0,255,255,0.08)',
        boxShadow: '0 0 32px 0 #00ffff55',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        border: '2.5px solid rgba(0,255,255,0.18)',
      }}>
        <img src={track.art} alt="album art" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 16px #00ffff55' }} />
      </div>
      <div style={{ fontWeight: 700, fontSize: 18, textShadow: '0 0 8px #00ffff88' }}>{track.title}</div>
      <div style={{ fontWeight: 400, fontSize: 14, color: '#aaffff', marginBottom: 10 }}>{track.artist}</div>
      <div style={{ width: '100%', margin: '10px 0', cursor: 'pointer' }} onClick={handleProgressClick}>
        <div style={{
          width: '100%',
          height: 8,
          borderRadius: 8,
          background: 'rgba(0,255,255,0.10)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: `${(progress / duration) * 100 || 0}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00ffff 40%, #0077ff 100%)',
            boxShadow: '0 0 12px #00ffff',
            borderRadius: 8,
            transition: 'width 0.2s',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aaffff', marginTop: 2 }}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, margin: '18px 0' }}>
        <button onClick={prev} style={iconBtnStyle} title="Previous">
          <span style={iconStyle}>&#9198;</span>
        </button>
        <button onClick={playPause} style={{ ...iconBtnStyle, background: playing ? 'linear-gradient(90deg,#00ffff,#0077ff)' : 'rgba(0,255,255,0.12)', boxShadow: playing ? '0 0 16px #00ffff' : 'none' }} title={playing ? 'Pause' : 'Play'}>
          <span style={{ ...iconStyle, fontSize: 32 }}>{playing ? '❚❚' : '►'}</span>
        </button>
        <button onClick={next} style={iconBtnStyle} title="Next">
          <span style={iconStyle}>&#9197;</span>
        </button>
        <button onClick={() => setLoop(!loop)} style={{ ...iconBtnStyle, color: loop ? '#00ffff' : '#aaffff' }} title="Loop">
          <span style={iconStyle}>&#128257;</span>
        </button>
      </div>
      <div style={{ width: '100%', marginTop: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#00ffff', marginBottom: 6 }}>Playlist</div>
        <div style={{ maxHeight: 120, overflowY: 'auto' }}>
          {playlist.map((t, i) => (
            <div
              key={i}
              onClick={() => { setCurrent(i); setPlaying(true); setTimeout(() => audioRef.current.play(), 100); }}
              style={{
                padding: '6px 0',
                cursor: 'pointer',
                color: i === current ? '#00ffff' : '#fff',
                fontWeight: i === current ? 700 : 400,
                textShadow: i === current ? '0 0 8px #00ffff88' : 'none',
                borderBottom: '1px solid rgba(0,255,255,0.07)',
                background: i === current ? 'rgba(0,255,255,0.07)' : 'none',
                borderRadius: 6,
                transition: 'background 0.2s',
              }}
            >
              {t.title} <span style={{ color: '#aaffff', fontWeight: 400, fontSize: 12 }}>— {t.artist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: 'rgba(0,255,255,0.12)',
  border: 'none',
  borderRadius: '50%',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  color: '#00ffff',
  cursor: 'pointer',
  boxShadow: '0 0 8px #00ffff44',
  transition: 'background 0.2s, box-shadow 0.2s',
};

const iconStyle = {
  fontSize: 24,
  filter: 'drop-shadow(0 0 4px #00ffff88)',
};

export default MusicPlayer; 