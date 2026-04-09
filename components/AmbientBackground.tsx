import React from 'react';

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-vn-red/5 dark:bg-vn-red/10 rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default AmbientBackground;
