
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';

interface SystemMonitoringConfig {
  enabled: boolean;
  zabbixUrl: string;
  refreshInterval: number;
  displayName: string;
  fallbackStatus: string;
}

interface SystemMonitoringProps {
  config: SystemMonitoringConfig;
}

export function SystemMonitoring({ config }: SystemMonitoringProps) {
  const [systemStatus, setSystemStatus] = useState<'operational' | 'warning' | 'error' | 'loading'>('loading');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState({
    uptime: '99.9%',
    responseTime: '45ms',
    activeUsers: '1,247'
  });

  useEffect(() => {
    if (!config.enabled) return;

    const fetchSystemStatus = async () => {
      try {
        // For demo purposes, simulate API call
        // In production, this would call the actual Zabbix API
        const isOperational = Math.random() > 0.1; // 90% chance of being operational
        
        setSystemStatus(isOperational ? 'operational' : 'warning');
        setLastUpdated(new Date());
        
        // Simulate some metrics
        setMetrics({
          uptime: `${(99.5 + Math.random() * 0.4).toFixed(1)}%`,
          responseTime: `${Math.floor(30 + Math.random() * 30)}ms`,
          activeUsers: `${Math.floor(1200 + Math.random() * 300).toLocaleString()}`
        });
      } catch (error) {
        console.error('Failed to fetch system status:', error);
        setSystemStatus('error');
      }
    };

    // Initial fetch
    fetchSystemStatus();

    // Set up interval
    const interval = setInterval(fetchSystemStatus, config.refreshInterval);
    return () => clearInterval(interval);
  }, [config]);

  if (!config.enabled) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          <span className="text-xs font-medium text-gray-600">Monitoring disabled</span>
        </div>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (systemStatus) {
      case 'operational':
        return {
          icon: CheckCircle,
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          dotColor: 'bg-green-500',
          message: 'All systems operational'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          dotColor: 'bg-yellow-500',
          message: 'Minor issues detected'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          dotColor: 'bg-red-500',
          message: 'System issues detected'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          dotColor: 'bg-gray-400',
          message: 'Checking systems...'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-lg p-3 space-y-3`}>
      <div className="flex items-center space-x-2">
        <div className={`h-2 w-2 ${statusConfig.dotColor} rounded-full ${systemStatus === 'loading' ? 'animate-pulse' : 'animate-pulse'}`}></div>
        <span className={`text-xs font-medium ${statusConfig.color}`}>
          {statusConfig.message}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className={`font-semibold ${statusConfig.color}`}>{metrics.uptime}</div>
          <div className="text-gray-500">Uptime</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${statusConfig.color}`}>{metrics.responseTime}</div>
          <div className="text-gray-500">Response</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${statusConfig.color}`}>{metrics.activeUsers}</div>
          <div className="text-gray-500">Users</div>
        </div>
      </div>
      
      <p className="text-xs text-gray-600">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </p>
    </div>
  );
}
