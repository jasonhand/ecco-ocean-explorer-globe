import { useState } from 'react';
import { Globe, Settings, Info, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ECCOHeader = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-depth">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-8 h-8 text-primary animate-float" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              ECCO Ocean Visualization
            </h1>
            <p className="text-xs text-muted-foreground">
              Estimating the Circulation and Climate of the Ocean
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className="hover:bg-secondary"
        >
          <Info className="w-4 h-4 mr-2" />
          About
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-secondary"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-secondary"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-secondary"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {isInfoOpen && (
        <div className="absolute top-16 right-6 w-80 bg-card border border-border rounded-lg shadow-ocean p-4 z-50">
          <h3 className="font-semibold mb-2">About ECCO</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The Estimating the Circulation and Climate of the Ocean (ECCO) project provides 
            global ocean state estimates that are consistent with oceanographic data and 
            climate models.
          </p>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsInfoOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};