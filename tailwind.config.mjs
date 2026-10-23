/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#181818',
          deep: '#0B0F17',
          elevated: '#303030',
          light: '#FFFFFF',
          soft: '#F7F7F7',
          strong: '#EBEBEB',
        },
        lunar: {
          slate: '#0F172A',
          silver: '#E2E8F0',
          cyan: '#06B6D4',
          cyanGlow: '#22D3EE',
        },
        rosso: {
          DEFAULT: '#DA291C',
          active: '#B01E0A',
          hover: '#9D2211',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          body: '#969696',
          muted: '#666666',
          onLight: '#181818',
        },
        hairline: {
          dark: '#303030',
          light: '#D2D2D2',
          soft: '#EBEBEB',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        xxxs: '4px',
        xxs: '8px',
        xs: '16px',
        sm: '24px',
        md: '32px',
        lg: '48px',
        xl: '64px',
        xxl: '96px',
        super: '128px',
      },
      letterSpacing: {
        mega: '-1.6px',
        xl: '-1.12px',
        lg: '-0.36px',
        nav: '0.65px',
        caption: '1.1px',
        cta: '1.4px',
      },
    },
  },
  plugins: [],
};

