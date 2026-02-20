import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          backgroundImage: 'linear-gradient(to bottom right, #0a0a0f, #1a1a2e)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              background: 'linear-gradient(to right, #06b6d4, #a855f7, #ef4444)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              padding: 0,
            }}
          >
            TETRIS
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 36,
              color: '#9ca3af',
              margin: '20px 0 60px 0',
              padding: 0,
            }}
          >
            Classic Block Puzzle Game
          </p>

          {/* Tetromino blocks visual */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              marginTop: 20,
            }}
          >
            {/* I piece - Cyan */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#22d3ee',
                borderRadius: 8,
              }}
            />
            {/* O piece - Yellow */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#facc15',
                borderRadius: 8,
              }}
            />
            {/* T piece - Purple */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#c084fc',
                borderRadius: 8,
              }}
            />
            {/* S piece - Green */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#4ade80',
                borderRadius: 8,
              }}
            />
            {/* Z piece - Red */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#f87171',
                borderRadius: 8,
              }}
            />
            {/* J piece - Blue */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#60a5fa',
                borderRadius: 8,
              }}
            />
            {/* L piece - Orange */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fb923c',
                borderRadius: 8,
              }}
            />
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 60,
              fontSize: 24,
              color: '#6b7280',
            }}
          >
            <span>🎮 Classic Gameplay</span>
            <span>📱 Mobile Friendly</span>
            <span>🌓 Theme Support</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
