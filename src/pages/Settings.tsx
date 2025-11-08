import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Type, Contrast, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Type className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">Text Size</h2>
                <p className="text-muted-foreground mb-4">Adjust the size of text throughout the app</p>
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Contrast className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">High Contrast</h2>
                <p className="text-muted-foreground mb-4">Increase contrast for better visibility</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">Normal</Button>
                  <Button variant="default" className="flex-1">High Contrast</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">About EverMind</h2>
                <p className="text-muted-foreground">
                  EverMind helps you revisit precious life moments through photos, stories, and memories shared by your loved ones.
                </p>
                <p className="text-muted-foreground mt-4">Version 1.0.0</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
