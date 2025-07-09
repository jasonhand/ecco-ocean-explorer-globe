import { useEffect, useRef, useState } from 'react';
import { BarChart3, TrendingUp, Download, Maximize2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScientificChartsProps {
  selectedLayer: string;
  selectedRegion: string;
  timeRange: { start: string; end: string };
}

export const ScientificCharts = ({ selectedLayer, selectedRegion, timeRange }: ScientificChartsProps) => {
  const timeSeriesRef = useRef<HTMLCanvasElement>(null);
  const depthProfileRef = useRef<HTMLCanvasElement>(null);
  const statisticsRef = useRef<HTMLCanvasElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('timeseries');

  // Generate mock data for demonstration
  const generateTimeSeriesData = () => {
    const data = [];
    const startDate = new Date('2023-01-01');
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Generate mock values based on layer type
      let value;
      switch (selectedLayer) {
        case 'temperature':
          value = 20 + Math.sin(i * Math.PI / 182.5) * 10 + Math.random() * 3;
          break;
        case 'salinity':
          value = 34 + Math.sin(i * Math.PI / 182.5) * 2 + Math.random() * 0.5;
          break;
        case 'currents':
          value = 0.5 + Math.sin(i * Math.PI / 91.25) * 0.8 + Math.random() * 0.2;
          break;
        default:
          value = Math.random() * 50;
      }
      
      data.push({ date: date.toISOString().split('T')[0], value });
    }
    return data;
  };

  const generateDepthProfile = () => {
    const depths = [0, 10, 20, 50, 100, 200, 500, 1000, 2000, 4000];
    return depths.map(depth => ({
      depth,
      value: selectedLayer === 'temperature' 
        ? 25 - depth * 0.01 + Math.random() * 2
        : 34 + depth * 0.001 + Math.random() * 0.5
    }));
  };

  const timeSeriesData = generateTimeSeriesData();
  const depthProfileData = generateDepthProfile();

  useEffect(() => {
    // Simulate chart loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedLayer, selectedRegion]);

  const drawTimeSeriesChart = () => {
    const canvas = timeSeriesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Set up chart dimensions
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Find min/max values
    const values = timeSeriesData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue;

    // Draw axes
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw data line
    ctx.strokeStyle = 'hsl(var(--primary))';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    timeSeriesData.forEach((point, index) => {
      const x = padding + (index / (timeSeriesData.length - 1)) * chartWidth;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = 'hsl(var(--primary))';
    timeSeriesData.forEach((point, index) => {
      if (index % 30 === 0) { // Show every 30th point
        const x = padding + (index / (timeSeriesData.length - 1)) * chartWidth;
        const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Add labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Time Series Data', width / 2, 30);
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(getUnitLabel(), 0, 0);
    ctx.restore();
  };

  const drawDepthProfile = () => {
    const canvas = depthProfileRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Find min/max values
    const values = depthProfileData.map(d => d.value);
    const depths = depthProfileData.map(d => d.depth);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const maxDepth = Math.max(...depths);

    // Draw axes
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw profile line
    ctx.strokeStyle = 'hsl(var(--accent))';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    depthProfileData.forEach((point, index) => {
      const x = padding + ((point.value - minValue) / (maxValue - minValue)) * chartWidth;
      const y = padding + (point.depth / maxDepth) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw depth markers
    ctx.fillStyle = 'hsl(var(--accent))';
    depthProfileData.forEach((point) => {
      const x = padding + ((point.value - minValue) / (maxValue - minValue)) * chartWidth;
      const y = padding + (point.depth / maxDepth) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Add labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Depth Profile', width / 2, 30);
  };

  const getUnitLabel = () => {
    switch (selectedLayer) {
      case 'temperature': return 'Temperature (°C)';
      case 'salinity': return 'Salinity (PSU)';
      case 'currents': return 'Velocity (m/s)';
      case 'sealevel': return 'Height (cm)';
      default: return 'Value';
    }
  };

  useEffect(() => {
    if (!isLoading) {
      drawTimeSeriesChart();
      drawDepthProfile();
    }
  }, [isLoading, selectedLayer, timeSeriesData, depthProfileData]);

  return (
    <div className="w-full h-full bg-background p-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading Scientific Charts...</p>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col">
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Scientific Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedLayer} data for {selectedRegion} region
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chart Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Time Series Chart */}
          <Card className="scientific-chart">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Time Series Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <canvas
                ref={timeSeriesRef}
                width={400}
                height={250}
                className="w-full border border-border rounded"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Daily {getUnitLabel()} over {timeRange.start} to {timeRange.end}
              </div>
            </CardContent>
          </Card>

          {/* Depth Profile Chart */}
          <Card className="scientific-chart">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Depth Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas
                ref={depthProfileRef}
                width={400}
                height={250}
                className="w-full border border-border rounded"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                {getUnitLabel()} vs. Ocean Depth (meters)
              </div>
            </CardContent>
          </Card>

          {/* Statistics Panel */}
          <Card className="scientific-chart lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Statistical Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">24.5</div>
                  <div className="text-xs text-muted-foreground">Mean</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">±2.3</div>
                  <div className="text-xs text-muted-foreground">Std Dev</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">18.2</div>
                  <div className="text-xs text-muted-foreground">Minimum</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">31.8</div>
                  <div className="text-xs text-muted-foreground">Maximum</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Trend Analysis</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Linear Trend:</span>
                      <span className="text-green-500">+0.02°C/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">R² Correlation:</span>
                      <span>0.73</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seasonal Cycle:</span>
                      <span>Strong</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Data Quality</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completeness:</span>
                      <span className="text-green-500">96.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Missing Values:</span>
                      <span>13/365</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>2024-01-15</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};