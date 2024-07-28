// components/AttachmentFiles.js
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const AttachmentFiles = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [displayText, setDisplayText] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file upload logic here
    console.log(file, displayText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg text-gray-500 w-70 relative">
        <AiOutlineClose 
          className="absolute top-2 right-2 cursor-pointer"
          size={18}
          onClick={onClose}
        />
        <h2 className="text-xl mb-4">Attach</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Attach a file from your computer</label>
            <small className="block mb-2">You can also drag and drop files to upload them</small>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Display text (optional)</label>
            <input
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              placeholder="Text to display"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className=" text-gray-700 p-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttachmentFiles;
