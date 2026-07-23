// src/components/layout/MainLayout.tsx
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container-main px-4 md:px-6 lg:px-8 xl:px-32 py-4 md:py-6 lg:py-8 xl:py-12">
        {/* 12-column grid for exact control */}
        <div className="grid grid-cols-12 gap-5 lg:gap-6 xl:gap-[29px]">
          {/* Builder - 8 columns out of 12 (≈66.7%) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-8">
            {childrenArray[0] || null}
          </div>
          {/* Review Panel - 4 columns out of 12 (≈33.3%) */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-4">
            {childrenArray[1] || null}
          </div>
        </div>
      </div>
    </div>
  );
}