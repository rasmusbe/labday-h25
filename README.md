# BeActive - Swedish Activity Booking Platform

A modern Swedish activity booking platform built with Next.js 16, Tailwind CSS, and shadcn/ui.

## Features

- 🗺️ Interactive Mapbox integration with activity markers
- 🎯 Activity categories and filtering
- 🎠 Swiper-powered carousels for activity recommendations
- 📱 Fully responsive design
- 🎨 Modern UI with shadcn/ui components
- 🇸🇪 Swedish localization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Mapbox account (for map functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd labday-h25
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Get API keys:
   - **Mapbox**: Go to [Mapbox Account](https://account.mapbox.com/access-tokens/) and create a new access token
   - **Unsplash**: Go to [Unsplash Developers](https://unsplash.com/developers) and create a new application
   - Add both to your `.env.local` file:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Site header
│   ├── HeroSection.tsx # Hero section with search
│   ├── InteractiveMap.tsx # Mapbox integration
│   ├── ActivityCard.tsx # Activity card component
│   ├── ActivityCarousel.tsx # Swiper carousel
│   └── CallToAction.tsx # CTA section
├── lib/                # Utilities and data
│   ├── types.ts        # TypeScript interfaces
│   ├── mock-data.ts    # Mock activity data
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Adding New Pages

To add new pages to the site:

1. Create a new file in `src/app/` directory (e.g., `src/app/activities/page.tsx`)
2. Export a default React component
3. Use the existing components and styling patterns
4. The page will be automatically available at `/activities`

## Customization

### Styling
- All styling uses Tailwind CSS classes
- shadcn/ui components can be customized in `src/components/ui/`
- Global styles are in `src/app/globals.css`

### Data
- Mock data is in `src/lib/mock-data.ts`
- Types are defined in `src/lib/types.ts`
- Replace mock data with real API calls as needed

### Map Configuration
- Map center and zoom can be adjusted in `InteractiveMap.tsx`
- Map style can be changed in the Mapbox initialization
- Marker icons can be customized in the `addMarkers` function

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Mapbox GL JS** - Interactive maps
- **Swiper** - Touch slider/carousel
- **Lucide React** - Icon library

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox access token for map functionality | Yes |
| `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` | Unsplash API key for fetching images | Yes |

## Deployment

The site can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS Amplify**

Make sure to set the `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` environment variable in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.