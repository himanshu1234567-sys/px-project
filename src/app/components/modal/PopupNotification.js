import React from 'react';

const PopupNotification = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      {message}
      <button onClick={onClose} className="ml-4 text-red-500">
        Undo
      </button>
    </div>
  );
};

export default PopupNotification;
