import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const staticMembers = [
  { id: 1, name: 'Himanshu Mehar' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Alice Johnson' },
  { id: 5, name: 'Bob Brown' },
];

const Members = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (!isOpen) return null;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (member) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  // Filter out selected members from the available members
  const filteredMembers = staticMembers
    .filter(
      (member) =>
        !selectedMembers.find((selected) => selected.id === member.id) &&
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg text-white w-96 relative">
        <AiOutlineClose
          className="absolute top-2 right-2 cursor-pointer"
          size={24}
          onClick={onClose}
        />
        <h2 className="text-xl mb-4">Members</h2>
        <input
          type="text"
          placeholder="Search members"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        />
        <div>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleSelect(member)}
            >
              <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                {member.name[0]}
              </div>
              <span className="ml-2">{member.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg">Board members</h3>
          {selectedMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center mt-2"
            >
              <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                {member.name[0]}
              </div>
              <span className="ml-2">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
