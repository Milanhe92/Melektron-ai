'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function RevenueChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Creator Staking', 'Genesis NFT', 'AI Tržište', 'AI Avatari', 'Melektron Shield', 'Kvantni Krediti', 'Ugljenični Krediti', 'Enterprise API'],
            datasets: [{
              label: 'Projekcija godišnjeg prihoda (milioni $)',
              data: [5, 12, 8, 6, 15, 20, 50, 25],
              backgroundColor: [
                'rgba(6, 182, 212, 0.7)',
                'rgba(139, 92, 246, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(0, 255, 157, 0.7)',
                'rgba(255, 0, 255, 0.7)',
                'rgba(255, 123, 0, 0.7)',
                'rgba(0, 255, 255, 0.7)',
                'rgba(255, 50, 50, 0.7)'
              ],
              borderColor: [
                'rgba(6, 182, 212, 1)',
                'rgba(139, 92, 246, 1)',
                'rgba(255, 215, 0, 1)',
                'rgba(0, 255, 157, 1)',
                'rgba(255, 0, 255, 1)',
                'rgba(255, 123, 0, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 50, 50, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#e5e7eb',
                  font: {
                    size: 14
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#e5e7eb'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
              x: {
                ticks: {
                  color: '#e5e7eb',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          }
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} className="w-full h-96" />;
}