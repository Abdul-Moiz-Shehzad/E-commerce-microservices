import React from 'react';
import type { LayoutProps } from '../interfaces/ui';

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <nav>
          <h2>Microservices Portal</h2>
        </nav>
      </header>
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        <p>&copy; {new Date().getFullYear()} Industrial Microservices Architecture</p>
      </footer>
    </div>
  );
};
