
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
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [backgroundConfig]);

  const renderFloatingElements = () => {
    if (backgroundConfig.animationType !== 'particles') return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              backgroundColor: i % 2 === 0 ? backgroundConfig.primaryColor : backgroundConfig.secondaryColor,
              borderRadius: '50%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full opacity-10 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: `linear-gradient(45deg, ${backgroundConfig.primaryColor}40, ${backgroundConfig.secondaryColor}40)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 6 + 4}s`,
            }}
          />
        ))}
      </div>
    );
  };

  const renderGeometric = () => {
    if (backgroundConfig.animationType !== 'geometric') return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 50,20 50,40 30,55 10,40 10,20" fill="none" stroke={backgroundConfig.primaryColor} strokeWidth="1"/>
            </pattern>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={backgroundConfig.primaryColor} stopOpacity="0.1"/>
              <stop offset="100%" stopColor={backgroundConfig.secondaryColor} stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" />
          <rect width="100%" height="100%" fill="url(#fadeGradient)" />
        </svg>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Modern gradient base */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${backgroundConfig.primaryColor}15 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${backgroundConfig.secondaryColor}15 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)
          `
        }}
      />
      
      {/* Subtle background image */}
      {backgroundConfig.images.length > 0 && (
        <div className="absolute inset-0 opacity-3">
          <img
            src={`https://images.unsplash.com/${backgroundConfig.images[currentImageIndex]}?w=1920&h=1080&fit=crop&auto=format&q=80`}
            alt="Background"
            className="w-full h-full object-cover transition-opacity duration-2000"
          />
        </div>
      )}
      
      {/* Animated elements */}
      {renderFloatingElements()}
      {renderGeometric()}
      
      {/* Modern overlay with better depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/30 via-transparent to-white/20" />
    </div>
  );
}
