// components/Modal.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineClose } from 'react-icons/ai';

const Date_Time_Rem = ({ isOpen, onClose, fetchTaskDetails, saveTaskDetails }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [reminder, setReminder] = useState('None');

  useEffect(() => {
    if (isOpen) {
      fetchTaskDetails().then(details => {
        setStartDate(new Date(details.startDate));
        setEndDate(details.endDate ? new Date(details.endDate) : null);
        setEndTime(details.endTime ? new Date(details.endTime) : null);
        setReminder(details.reminder || 'None');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Combine endDate and endTime into a single datetime object if both are set
    const combinedEndDateTime = endDate && endTime ? new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    ) : null;

    saveTaskDetails({
      startDate,
      endDate: combinedEndDateTime,
      reminder
    }).then(onClose);
  };

  const handleRemove = () => {
    // Handle remove logic, e.g., call an API to delete or reset task details
    setStartDate(null);
    setEndDate(null);
    setEndTime(null);
    setReminder('None');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg text-gray-500 w-96 relative">
        <AiOutlineClose 
          className="absolute top-2 right-2 cursor-pointer"
          size={18}
          onClick={onClose}
        />
        <h2 className="text-xl mb-4">Dates</h2>
        <div className="mb-4">
          <label className="block mb-2">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholderText="Select start date"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholderText="Select end date"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Time</label>
          <DatePicker
            selected={endTime}
            onChange={time => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholderText="Select end time"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Set due date reminder</label>
          <select
            value={reminder}
            onChange={e => setReminder(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="None">None</option>
            <option value="1 hour before">1 hour before</option>
            <option value="1 day before">1 day before</option>
            <option value="1 week before">1 week before</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className=" text-gray-500 p-2 rounded-lg"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Date_Time_Rem;
