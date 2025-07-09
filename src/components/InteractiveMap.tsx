import { useEffect, useRef, useState } from 'react';
import { Map, Layers, Compass, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface InteractiveMapProps {
  selectedLayer: string;
  selectedRegion: string;
  timeRange: { start: string; end: string };
}

export const InteractiveMap = ({ selectedLayer, selectedRegion, timeRange }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapProjection, setMapProjection] = useState('mercator');
  const [layerOpacity, setLayerOpacity] = useState([80]);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration - in real app this would come from ECCO API
  const generateHeatmapData = () => {
    const data = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      for (let lng = -180; lng <= 180; lng += 5) {
        // Generate mock temperature data based on latitude
        const baseTemp = 30 - Math.abs(lat) * 0.5;
        const noise = (Math.random() - 0.5) * 10;
        const temp = baseTemp + noise;
        
        data.push({
          lat,
          lng,
          value: temp,
          intensity: Math.max(0, Math.min(1, (temp + 10) / 50))
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const projections = [
    { id: 'mercator', name: 'Mercator' },
    { id: 'robinson', name: 'Robinson' },
    { id: 'orthographic', name: 'Orthographic' },
    { id: 'equirectangular', name: 'Equirectangular' }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading Interactive Map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Projection</label>
            <Select value={mapProjection} onValueChange={setMapProjection}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projections.map((proj) => (
                  <SelectItem key={proj.id} value={proj.id}>
                    {proj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Layer Opacity: {layerOpacity[0]}%
            </label>
            <Slider
              value={layerOpacity}
              onValueChange={setLayerOpacity}
              max={100}
              step={1}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Layer Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <h3 className="text-sm font-semibold mb-2 flex items-center">
            <Layers className="w-4 h-4 mr-2" />
            {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)} Scale
          </h3>
          <div className="space-y-1">
            {/* Color scale for temperature */}
            {selectedLayer === 'temperature' && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0066cc' }}></div>
                  <span className="text-xs">-2°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00ccff' }}></div>
                  <span className="text-xs">10°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ffcc00' }}></div>
                  <span className="text-xs">20°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ff6600' }}></div>
                  <span className="text-xs">30°C</span>
                </div>
              </div>
            )}
            
            {/* Current data info */}
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Region: {selectedRegion}
              </p>
              <p className="text-xs text-muted-foreground">
                Period: {timeRange.start}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full relative overflow-hidden rounded-lg"
      >
        {/* Mock World Map with Heatmap Overlay */}
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1000 500"
          style={{ opacity: layerOpacity[0] / 100 }}
        >
          {/* World outline (simplified) */}
          <rect width="1000" height="500" fill="hsl(var(--secondary))" />
          
          {/* Mock continents */}
          <rect x="100" y="150" width="200" height="100" fill="hsl(var(--muted))" rx="10" />
          <rect x="350" y="100" width="250" height="150" fill="hsl(var(--muted))" rx="10" />
          <rect x="650" y="120" width="180" height="120" fill="hsl(var(--muted))" rx="10" />
          <rect x="50" y="300" width="300" height="150" fill="hsl(var(--muted))" rx="10" />
          <rect x="400" y="350" width="200" height="100" fill="hsl(var(--muted))" rx="10" />
          <rect x="700" y="280" width="250" height="180" fill="hsl(var(--muted))" rx="10" />

          {/* Heatmap visualization */}
          {heatmapData
            .filter((_, index) => index % 8 === 0) // Reduce density for demo
            .map((point, index) => {
              const x = ((point.lng + 180) / 360) * 1000;
              const y = ((90 - point.lat) / 180) * 500;
              const color = selectedLayer === 'temperature' 
                ? `hsl(${240 - point.intensity * 240}, 80%, 60%)`
                : `hsl(${200 + point.intensity * 60}, 70%, 50%)`;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={color}
                  opacity="0.6"
                  className="animate-pulse-glow"
                />
              );
            })}

          {/* Ocean currents visualization (for currents layer) */}
          {selectedLayer === 'currents' && (
            <g>
              {Array.from({ length: 20 }, (_, i) => (
                <g key={i}>
                  <path
                    d={`M${100 + i * 40},${200 + Math.sin(i) * 50} Q${150 + i * 40},${180 + Math.sin(i) * 50} ${200 + i * 40},${220 + Math.sin(i) * 50}`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                    className="animate-data-stream"
                  />
                  <circle
                    cx={200 + i * 40}
                    cy={220 + Math.sin(i) * 50}
                    r="2"
                    fill="hsl(var(--accent))"
                    className="animate-pulse"
                  />
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Map Navigation */}
      <div className="absolute bottom-20 left-4 z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Compass className="w-4 h-4" />
          </Button>
          <div className="text-xs text-muted-foreground">
            Lat: 0°, Lng: 0°
          </div>
        </div>
      </div>

      {/* Map Actions */}
      <div className="absolute bottom-20 right-4 z-10">
        <Button variant="secondary" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Map
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1">
          <p className="text-xs text-muted-foreground">
            Interactive 2D map visualization • {selectedLayer} layer • {mapProjection} projection
          </p>
        </div>
      </div>
    </div>
  );
};