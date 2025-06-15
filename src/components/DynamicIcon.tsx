
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className = '', size = 24 }: DynamicIconProps) {
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[name];
  
  // Fallback to Monitor icon if the specified icon doesn't exist
  const FallbackIcon = LucideIcons.Monitor;
  
  const Icon = IconComponent || FallbackIcon;
  
  return <Icon className={className} size={size} />;
}
