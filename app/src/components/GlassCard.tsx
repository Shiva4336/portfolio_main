import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  padding = '32px',
}) => {
  return (
    <div className={`glass-card ${className}`}>
      <div className="glass-card-border" />
      <div
        className="glass-card-content"
        style={{ padding }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
