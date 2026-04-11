// ✅ DYNAMIC OG IMAGE — /services/[id]/opengraph-image.tsx
// Next.js auto-wires this file: visiting /services/seo generates a unique 1200×630 PNG.
// Works on GCloud Cloud Run, Railway, Render, Fly.io — any Docker/standalone host.
// Uses edge runtime so it's fast everywhere — no Node.js cold start delay.
//
// HOW IT WORKS:
// - Next.js detects this file and overrides the OG image for all /services/[id] routes
// - Also auto-applies to /services/[id]/[city] routes (child routes inherit parent OG image)
// - No changes needed in generateMetadata() — Next.js handles the image URL automatically
// - The image is generated once per service, then cached by your CDN/Cloud Run cache
//
// DEPLOYMENT NOTE FOR GCLOUD:
// Cloud Run works perfectly with edge runtime. No extra config needed.
// If you use Cloud CDN in front of Cloud Run, OG images will be cached at the edge.

import { ImageResponse } from 'next/og';
import { SERVICES } from '@/constants/constants';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// ─── Service category → accent colour map ────────────────────────────────────
// Each service gets a unique accent so OG images look distinct in social feeds.
const SERVICE_COLOR: Record<string, { accent: string; bg: string; label: string }> = {
  'digital-marketing':    { accent: '#FF1F1F', bg: '#1a0505', label: 'Marketing' },
  'seo':                  { accent: '#0054D2', bg: '#020d1a', label: 'SEO' },
  'branding':             { accent: '#9B5CF6', bg: '#0d0516', label: 'Branding' },
  'content-marketing':    { accent: '#FF1F1F', bg: '#1a0505', label: 'Content' },
  'social-media-marketing': { accent: '#E91E8C', bg: '#1a0510', label: 'Social' },
  'ppc-advertising':      { accent: '#F59E0B', bg: '#1a1005', label: 'PPC Ads' },
  'web-dev':              { accent: '#0054D2', bg: '#020d1a', label: 'Development' },
  'app-dev':              { accent: '#06B6D4', bg: '#021318', label: 'Development' },
  'ecommerce-dev':        { accent: '#10B981', bg: '#031510', label: 'E-commerce' },
  'ui-ux-design':         { accent: '#9B5CF6', bg: '#0d0516', label: 'Design' },
  'cms-dev':              { accent: '#0054D2', bg: '#020d1a', label: 'CMS' },
  'api-integration':      { accent: '#06B6D4', bg: '#021318', label: 'API' },
  'whatsapp-automation':  { accent: '#25D366', bg: '#031a0b', label: 'Automation' },
  'email-automation':     { accent: '#F59E0B', bg: '#1a1005', label: 'Automation' },
  'ai-voice':             { accent: '#9B5CF6', bg: '#0d0516', label: 'AI' },
  'automation-crm':       { accent: '#25D366', bg: '#031a0b', label: 'Automation' },
  'chatbot-dev':          { accent: '#06B6D4', bg: '#021318', label: 'AI' },
  'data-analytics':       { accent: '#F59E0B', bg: '#1a1005', label: 'Analytics' },
  'startup-mentorship':   { accent: '#10B981', bg: '#031510', label: 'Consulting' },
  'digital-transformation': { accent: '#0054D2', bg: '#020d1a', label: 'Strategy' },
  'it-strategy':          { accent: '#9B5CF6', bg: '#0d0516', label: 'Strategy' },
  'market-research':      { accent: '#F59E0B', bg: '#1a1005', label: 'Research' },
  'consulting':           { accent: '#10B981', bg: '#031510', label: 'Consulting' },
};

// Default theme for any service ID not in the map above
const DEFAULT_THEME = { accent: '#0054D2', bg: '#020d1a', label: 'Services' };

export default async function OGImage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  const theme = SERVICE_COLOR[id] ?? DEFAULT_THEME;

  // Truncate description to fit cleanly in the card
  const desc = service?.description
    ? service.description.length > 120
      ? service.description.slice(0, 117) + '...'
      : service.description
    : 'Expert digital services for businesses worldwide.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: theme.bg,
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* ── Grid texture overlay ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Accent glow top-right ── */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: theme.accent,
            opacity: 0.12,
            filter: 'blur(80px)',
          }}
        />

        {/* ── Accent glow bottom-left ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: theme.accent,
            opacity: 0.08,
            filter: 'blur(60px)',
          }}
        />

        {/* ── Left accent bar ── */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '5px',
            height: '100%',
            background: theme.accent,
          }}
        />

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '56px 72px 56px 80px',
            position: 'relative',
          }}
        >
          {/* Top row — logo + category badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Logo */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
                <span style={{ color: '#FF1F1F', fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>SC</span>
                <span style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>ALLAR</span>
              </div>
              <span style={{ color: '#0054D2', fontSize: '11px', fontWeight: 700, letterSpacing: '4px', marginTop: '2px' }}>
                IT SOLUTION
              </span>
            </div>

            {/* Category pill */}
            <div
              style={{
                background: theme.accent + '22',
                border: `1px solid ${theme.accent}44`,
                color: theme.accent,
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '8px 20px',
                borderRadius: '999px',
              }}
            >
              {theme.label}
            </div>
          </div>

          {/* Centre — service title + description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
            {/* Accent line */}
            <div style={{ width: '48px', height: '4px', background: theme.accent, borderRadius: '2px' }} />

            {/* Service title */}
            <div
              style={{
                color: '#FFFFFF',
                fontSize: service?.title && service.title.length > 30 ? '52px' : '62px',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                maxWidth: '860px',
              }}
            >
              {service?.title ?? 'Our Services'}
            </div>

            {/* Description */}
            <div
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '22px',
                lineHeight: 1.5,
                maxWidth: '760px',
                fontWeight: 400,
              }}
            >
              {desc}
            </div>
          </div>

          {/* Bottom row — CTA + URL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* CTA button */}
            <div
              style={{
                background: theme.accent,
                color: '#FFFFFF',
                fontSize: '17px',
                fontWeight: 700,
                padding: '14px 32px',
                borderRadius: '8px',
                letterSpacing: '0.3px',
              }}
            >
              Get Free Consultation →
            </div>

            {/* Domain */}
            <div
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '16px',
                fontWeight: 500,
                letterSpacing: '1px',
              }}
            >
              scallar.in
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
