import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black dark:border-white"></div>
    </div>
  );
};

export default Loading;
