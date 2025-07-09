import { useState, useRef, useEffect } from 'react';
import { Globe3D } from '@/components/Globe3D';
import { InteractiveMap } from '@/components/InteractiveMap';
import { ScientificCharts } from '@/components/ScientificCharts';
import { Maximize2, Minimize2, RotateCcw, Download, Map, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VisualizationAreaProps {
  selectedLayer: string;
  selectedRegion: string;
  timeRange: { start: string; end: string };
}

export const VisualizationArea = ({
  selectedLayer,
  selectedRegion,
  timeRange
}: VisualizationAreaProps) => {
  const [activeView, setActiveView] = useState('globe');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-background relative overflow-hidden"
    >
      {/* Visualization Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="globe" className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>3D Globe</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center space-x-1">
                <Map className="w-4 h-4" />
                <span>2D Map</span>
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center space-x-1">
                <RotateCcw className="w-4 h-4" />
                <span>Charts</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Action Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1 flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-secondary"
          >
            <Download className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="hover:bg-secondary"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Visualization Content */}
      <div className="w-full h-full">
        {activeView === 'globe' && (
          <Globe3D
            selectedLayer={selectedLayer}
            selectedRegion={selectedRegion}
            timeRange={timeRange}
          />
        )}
        
        {activeView === 'map' && (
          <InteractiveMap
            selectedLayer={selectedLayer}
            selectedRegion={selectedRegion}
            timeRange={timeRange}
          />
        )}
        
        {activeView === 'charts' && (
          <ScientificCharts
            selectedLayer={selectedLayer}
            selectedRegion={selectedRegion}
            timeRange={timeRange}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Layer: {selectedLayer}</span>
            <span>•</span>
            <span>Region: {selectedRegion}</span>
            <span>•</span>
            <span>Period: {timeRange.start} - {timeRange.end}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};