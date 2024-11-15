import React from 'react';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="text-md text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
