
import { useEffect, useState } from 'react';

interface BackgroundConfig {
  type: string;
  images: string[];
  animationType: string;
  primaryColor: string;
  secondaryColor: string;
}

interface AnimatedBackgroundProps {
  backgroundConfig: BackgroundConfig;
}

export function AnimatedBackground({ backgroundConfig }: AnimatedBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (backgroundConfig.type === 'slideshow' && backgroundConfig.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundConfig.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [backgroundConfig]);

  const renderParticles = () => {
    if (backgroundConfig.animationType !== 'particles') return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: backgroundConfig.primaryColor,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
    );
  };

  const renderGeometric = () => {
    if (backgroundConfig.animationType !== 'geometric') return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={backgroundConfig.primaryColor} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${backgroundConfig.primaryColor}15, ${backgroundConfig.secondaryColor}25, #f8fafc)`
        }}
      />
      
      {/* Background image */}
      {backgroundConfig.images.length > 0 && (
        <div className="absolute inset-0 opacity-5">
          <img
            src={`https://images.unsplash.com/${backgroundConfig.images[currentImageIndex]}?w=1920&h=1080&fit=crop`}
            alt="Background"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        </div>
      )}
      
      {/* Animated elements */}
      {renderParticles()}
      {renderGeometric()}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
    </div>
  );
}
