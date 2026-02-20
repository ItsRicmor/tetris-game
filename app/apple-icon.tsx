import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        }}
      >
        {/* T-piece Tetromino */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Top row - 3 blocks */}
          <div style={{ display: 'flex', gap: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                borderRadius: 6,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                borderRadius: 6,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                borderRadius: 6,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            />
          </div>
          {/* Bottom row - 1 block centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                borderRadius: 6,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
