# ECCO Ocean Explorer Globe

An interactive 3D visualization platform for exploring ocean data from the ECCO (Estimating the Circulation and Climate of the Ocean) project. This application provides scientists, researchers, and ocean enthusiasts with an immersive way to explore global ocean data through an interactive 3D globe interface.

## 🌊 About ECCO

The **Estimating the Circulation and Climate of the Ocean (ECCO)** project provides global ocean state estimates that are consistent with oceanographic data and climate models. This application visualizes ECCO data to help understand ocean dynamics, climate patterns, and environmental changes.

## ✨ Features

### 🗺️ Interactive 3D Globe
- **Real-time 3D Visualization**: Explore ocean data on an interactive 3D globe using Three.js
- **Multi-layer Data Display**: Switch between different ocean parameters:
  - Sea Surface Temperature
  - Ocean Currents
  - Salinity
  - Sea Level
- **Interactive Controls**: Rotate, zoom, and navigate the globe with mouse and touch controls

### 📊 Data Visualization
- **Regional Focus**: Explore specific ocean basins (Atlantic, Pacific, Indian, Arctic, Southern)
- **Time Series Analysis**: View data across different time periods
- **Real-time Statistics**: Get current values, trends, and quality metrics for each data layer

### 🎛️ Advanced Controls
- **Layer Management**: Toggle between different ocean data layers with opacity controls
- **Region Selection**: Focus on specific ocean basins or global view
- **Time Controls**: Play/pause time series data with customizable date ranges
- **Data Quality Indicators**: View confidence levels and data quality metrics

### 📱 Responsive Design
- **Collapsible Panels**: Optimize screen real estate with collapsible control and info panels
- **Mobile-Friendly**: Responsive design that works across different screen sizes
- **Modern UI**: Clean, intuitive interface built with shadcn/ui components

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ecco-ocean-explorer-globe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js for 3D globe visualization
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom ocean-themed animations
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router for navigation
- **State Management**: React Query for data fetching and caching
- **Charts**: Recharts and Plotly.js for data visualization

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Globe3D.tsx     # 3D globe visualization
│   ├── ControlPanel.tsx # Data layer and region controls
│   ├── DataInfoPanel.tsx # Data statistics and metadata
│   ├── ECCOHeader.tsx  # Application header
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🎯 Key Components

### Globe3D Component
- Renders an interactive 3D globe using Three.js
- Implements mouse/touch controls for rotation and zoom
- Applies ocean-themed shaders and materials
- Supports real-time data visualization

### ControlPanel Component
- Manages data layer selection (temperature, currents, salinity, sea level)
- Provides region selection (global and ocean basins)
- Includes time range controls and playback functionality
- Features collapsible interface for space optimization

### DataInfoPanel Component
- Displays current data values and trends
- Shows data quality metrics and confidence levels
- Provides statistical information (min, max, standard deviation)
- Includes metadata about data sources and processing

## 🌊 Data Layers

1. **Sea Surface Temperature**: Visualize ocean temperature patterns and thermal anomalies
2. **Ocean Currents**: Explore surface and subsurface current velocities
3. **Salinity**: Monitor ocean salinity variations and freshwater input
4. **Sea Level**: Track sea level changes and anomalies

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in `src/components/`
2. Add new data layers in the ControlPanel
3. Implement new visualization types in Globe3D
4. Update the DataInfoPanel for new metrics

## 🚀 Deployment

### Using Lovable
Visit the [Lovable Project](https://lovable.dev/projects/aed9b2cb-53d4-4706-b2a4-c5114dfe19c7) and click **Share → Publish** to deploy.

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Configure your domain in Lovable Project Settings

## 🤝 Contributing

This project is built with [Lovable](https://lovable.dev) - an AI-powered development platform. You can:

- **Edit via Lovable**: Visit the project URL and start prompting
- **Edit locally**: Clone the repo and push changes
- **Edit in GitHub**: Use GitHub's web editor
- **Use GitHub Codespaces**: Launch a development environment

## 📚 Resources

- [ECCO Project Documentation](https://ecco-group.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is part of the ECCO Ocean Explorer initiative. Please refer to the ECCO project for data usage and licensing information.

---

**Built with ❤️ using Lovable** - The AI-powered development platform that makes building applications faster and more collaborative.
