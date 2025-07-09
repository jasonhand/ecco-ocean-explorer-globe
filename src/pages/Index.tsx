import { useState, useEffect } from 'react';
import { ECCOHeader } from '@/components/ECCOHeader';
import { ControlPanel } from '@/components/ControlPanel';
import { VisualizationArea } from '@/components/VisualizationArea';
import { DataInfoPanel } from '@/components/DataInfoPanel';
import { Waves, Globe, BarChart3 } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState('temperature');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState({ start: '2023-01', end: '2023-12' });

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <Globe className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
            <Waves className="w-8 h-8 absolute -bottom-2 -right-2 text-accent animate-wave" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Loading ECCO Data</h2>
            <p className="text-muted-foreground">Initializing ocean visualization...</p>
            <div className="w-64 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-ocean rounded-full animate-data-stream"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ECCOHeader />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Control Panel */}
        <ControlPanel 
          selectedLayer={selectedLayer}
          onLayerChange={setSelectedLayer}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
        
        {/* Main Visualization Area */}
        <VisualizationArea 
          selectedLayer={selectedLayer}
          selectedRegion={selectedRegion}
          timeRange={timeRange}
        />
        
        {/* Data Information Panel */}
        <DataInfoPanel 
          selectedLayer={selectedLayer}
          selectedRegion={selectedRegion}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
};

export default Index;
