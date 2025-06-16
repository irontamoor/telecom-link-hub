
import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

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
  const [status, setStatus] = useState<'operational' | 'warning' | 'error'>('operational');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!config.enabled) return;

    const checkSystemStatus = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call the Zabbix API
        // For demo purposes, we'll simulate random status changes
        const mockStatuses: Array<'operational' | 'warning' | 'error'> = ['operational', 'operational', 'operational', 'warning'];
        const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
        
        setStatus(randomStatus);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error checking system status:', error);
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkSystemStatus();

    // Set up interval
    const interval = setInterval(checkSystemStatus, config.refreshInterval);

    return () => clearInterval(interval);
  }, [config]);

  const getStatusInfo = () => {
    switch (status) {
      case 'operational':
        return {
          icon: CheckCircle,
          text: 'All Systems Operational',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          text: 'Minor Issues Detected',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'System Issues',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
    }
  };

  if (!config.enabled) {
    return (
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-200 rounded-lg">
            <Activity className="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Monitoring Disabled</p>
            <p className="text-xs text-slate-500">Enable in settings</p>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className={`p-4 rounded-xl border ${statusInfo.bgColor} ${statusInfo.borderColor} transition-all duration-300`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${statusInfo.bgColor} relative`}>
          <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
          {isLoading && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${statusInfo.color} truncate`}>
            {statusInfo.text}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Clock className="h-3 w-3 text-slate-400" />
            <p className="text-xs text-slate-500">
              {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
