import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Calendar, Layers, MapPin, Thermometer, Waves, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface ControlPanelProps {
  selectedLayer: string;
  onLayerChange: (layer: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  timeRange: { start: string; end: string };
  onTimeRangeChange: (range: { start: string; end: string }) => void;
}

export const ControlPanel = ({
  selectedLayer,
  onLayerChange,
  selectedRegion,
  onRegionChange,
  timeRange,
  onTimeRangeChange
}: ControlPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [opacity, setOpacity] = useState([80]);

  const dataLayers = [
    { id: 'temperature', name: 'Sea Surface Temperature', icon: Thermometer, color: 'text-red-500' },
    { id: 'currents', name: 'Ocean Currents', icon: Waves, color: 'text-blue-500' },
    { id: 'salinity', name: 'Salinity', icon: Gauge, color: 'text-green-500' },
    { id: 'sealevel', name: 'Sea Level', icon: Layers, color: 'text-purple-500' }
  ];

  const regions = [
    { id: 'global', name: 'Global Ocean' },
    { id: 'atlantic', name: 'Atlantic Ocean' },
    { id: 'pacific', name: 'Pacific Ocean' },
    { id: 'indian', name: 'Indian Ocean' },
    { id: 'arctic', name: 'Arctic Ocean' },
    { id: 'southern', name: 'Southern Ocean' }
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-r border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        {dataLayers.map((layer) => {
          const Icon = layer.icon;
          return (
            <Button
              key={layer.id}
              variant={selectedLayer === layer.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onLayerChange(layer.id)}
              className="mb-2 p-2"
            >
              <Icon className={`w-4 h-4 ${layer.color}`} />
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border overflow-y-auto control-panel">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Controls</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Data Layers */}
        <Card className="data-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Layers className="w-4 h-4 mr-2" />
              Data Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dataLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    selectedLayer === layer.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => onLayerChange(layer.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${layer.color}`} />
                    <span className="text-sm font-medium">{layer.name}</span>
                  </div>
                  {selectedLayer === layer.id && (
                    <Badge variant="default" className="text-xs">Active</Badge>
                  )}
                </div>
              );
            })}
            
            <div className="pt-2">
              <label className="text-xs text-muted-foreground mb-2 block">Layer Opacity</label>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{opacity[0]}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Region Selection */}
        <Card className="data-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Time Controls */}
        <Card className="data-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Time Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Time Range</label>
              <div className="text-sm font-mono bg-secondary/50 p-2 rounded">
                {timeRange.start} → {timeRange.end}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Data Info */}
        <Card className="data-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Current Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs">
              <span className="text-muted-foreground">Layer:</span>{' '}
              <span className="font-medium">
                {dataLayers.find(l => l.id === selectedLayer)?.name}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Region:</span>{' '}
              <span className="font-medium">
                {regions.find(r => r.id === selectedRegion)?.name}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Status:</span>{' '}
              <Badge variant="secondary" className="text-xs">Data Available</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};