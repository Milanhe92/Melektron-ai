// apps/web/utils/performance.ts
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // 监控核心Web指标
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}`);
      }
    });
    
    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
  }
};

// 在_app.tsx中调用