import React from 'react';
import { Card, CardContent } from './ui/Card';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

const features: Feature[] = [
  {
    title: "Minimalist Grid",
    description: "Swiss-inspired layout system for clarity and impact."
  },
  {
    title: "Immersive 3D",
    description: "React Three Fiber integration for high-end visuals."
  },
  {
    title: "Smooth Scroll",
    description: "Fluid, high-performance scrolling experience."
  }
];

export const ComponentGallery: React.FC = () => {
  return (
    <div className="py-24 px-6 bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-mono text-accent mb-12 uppercase tracking-widest">
          Component Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card key={i} className="bg-background/40">
              <CardContent>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
