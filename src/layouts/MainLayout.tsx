// src/components/layout/MainLayout.tsx
import React from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}