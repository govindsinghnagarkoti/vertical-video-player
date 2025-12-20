# Vertical Video App

A production-ready Next.js 14+ application implementing a high-performance vertical video player with seamless looping and social media integration.

## Features

- **Vertical Video Player**:
  - Full-screen, responsive layout.
  - Seamless loop and autoplay support.
  - Touch gestures:
    - **Tap**: Toggle Play/Pause.
    - **Double Tap**: Toggle Fullscreen.
    - **Vertical Swipe**: Adjust Volume.
  - Custom controls (Play/Pause, Mute/Unmute, Progress).

- **Social Integration**:
  - **Instagram Button**: Animated gradient hover effect matching official branding.
  - **Google Pay Button**: Payment simulation integration.

- **Tech Stack**:
  - Next.js 14+ (App Router)
  - TypeScript
  - Tailwind CSS (v4)
  - Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1.  Navigate to the project directory:
    ```bash
    cd vertical-video-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Vercel

This project is optimized for deployment on Vercel.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect the Next.js configuration.
4.  Deploy.

Configuration is handled in `vercel.json` for headers and rewrites.

## Project Structure

```
vertical-video-app/
├── app/                  # Next.js App Router pages and layout
├── components/           # React components
│   ├── VideoPlayer/      # Video player logic and UI
│   └── SocialButtons/    # Instagram and GPay buttons
├── lib/                  # Utilities (Tailwind merge, etc.)
├── public/               # Static assets
└── ...config files
```

## Performance & Accessibility

- **Accessibility**: All interactive elements have proper `aria-label` attributes.
- **Performance**:
  - Video uses `object-cover` to handle aspect ratios efficiently without layout shifts.
  - Minimal dependencies to keep bundle size low.
  - Tailwind CSS v4 for optimized CSS delivery.

## License

MIT
