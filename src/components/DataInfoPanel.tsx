import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DataInfoPanelProps {
  selectedLayer: string;
  selectedRegion: string;
  timeRange: { start: string; end: string };
}

export const DataInfoPanel = ({
  selectedLayer,
  selectedRegion,
  timeRange
}: DataInfoPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock data for demonstration
  const getLayerStats = () => {
    const stats = {
      temperature: {
        current: '24.5°C',
        trend: 'up',
        change: '+0.3°C',
        quality: 95,
        description: 'Sea surface temperature measurement'
      },
      currents: {
        current: '1.2 m/s',
        trend: 'stable',
        change: '±0.1 m/s',
        quality: 88,
        description: 'Ocean current velocity vectors'
      },
      salinity: {
        current: '34.7 PSU',
        trend: 'down',
        change: '-0.1 PSU',
        quality: 92,
        description: 'Practical salinity units measurement'
      },
      sealevel: {
        current: '+12.3 cm',
        trend: 'up',
        change: '+1.2 cm',
        quality: 85,
        description: 'Sea level anomaly from mean'
      }
    };
    return stats[selectedLayer as keyof typeof stats] || stats.temperature;
  };

  const layerStats = getLayerStats();

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-l border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="rotate-180"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        <div className="flex flex-col items-center space-y-3 mt-4">
          <div className="w-2 h-8 bg-primary rounded-full"></div>
          <div className="text-xs text-center transform -rotate-90 whitespace-nowrap">
            Data Info
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center">
          <Info className="w-4 h-4 mr-2" />
          Data Information
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Value Card */}
        <Card className="data-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-primary">
                {layerStats.current}
              </span>
              <div className="flex items-center space-x-1">
                {layerStats.trend === 'up' && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
                {layerStats.trend === 'down' && (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                {layerStats.trend === 'stable' && (
                  <Activity className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-sm text-muted-foreground">
                  {layerStats.change}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {layerStats.description}
            </p>
          </CardContent>
        </Card>

        {/* Data Quality */}
        <Card className="data-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Confidence</span>
                <span className="text-sm font-medium">{layerStats.quality}%</span>
              </div>
              <Progress value={layerStats.quality} className="h-2" />
              <div className="flex items-center space-x-2">
                {layerStats.quality >= 90 ? (
                  <Badge variant="default" className="bg-green-500">
                    Excellent
                  </Badge>
                ) : layerStats.quality >= 80 ? (
                  <Badge variant="secondary">
                    Good
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Fair
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="data-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-secondary/50 rounded">
                <div className="text-lg font-semibold text-primary">156</div>
                <div className="text-xs text-muted-foreground">Data Points</div>
              </div>
              <div className="text-center p-2 bg-secondary/50 rounded">
                <div className="text-lg font-semibold text-accent">23.4</div>
                <div className="text-xs text-muted-foreground">Mean Value</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Min:</span>
                <span className="font-medium">18.2°C</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Max:</span>
                <span className="font-medium">28.7°C</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Std Dev:</span>
                <span className="font-medium">±2.1°C</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card className="data-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs space-y-1">
              <div>
                <span className="text-muted-foreground">Source:</span>{' '}
                <span className="font-medium">ECCO v4r4</span>
              </div>
              <div>
                <span className="text-muted-foreground">Resolution:</span>{' '}
                <span className="font-medium">0.5° × 0.5°</span>
              </div>
              <div>
                <span className="text-muted-foreground">Updated:</span>{' '}
                <span className="font-medium">2024-01-15</span>
              </div>
              <div>
                <span className="text-muted-foreground">Units:</span>{' '}
                <span className="font-medium">°C</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="data-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: '2 hours ago', event: 'Data refresh completed' },
                { time: '1 day ago', event: 'Quality check passed' },
                { time: '3 days ago', event: 'New dataset version' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{item.event}</div>
                    <div className="text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};