import React, { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { FaSave, FaEdit, FaTimes, FaPlus, FaTasks, FaClipboard, FaListUl, FaCheckSquare, FaCheck, FaTimesCircle } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { MdAccessTime, MdOutlineAssignmentInd, MdAttachment, MdPeople } from 'react-icons/md';
import { GrArchive, GrRevert } from 'react-icons/gr';
import Date_Time_Rem from './modal/Date_Time_Rem';
import AttachmentFiles from "./modal/AttachmentFiles";
import Members from "./modal/Members"

interface Task {
  id: string;
  name: string;
  taskStartdate?: Date | null;
  taskenddate?: Date | null;
  description: string;
  shortDescription?: string;
  comment?: string;
  priority?: string;
  reminder?: string;
  fromUser?: string;
  assignToUser?: string[];
  attachment?: any[];
  descriptions: any
}

interface Comment {
  id: string;
  username: string;
  text: string;
  date: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  // onSave: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, }) => {
  const [startDate, setStartDate] = useState<Date | null>(task.taskStartdate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(task.taskenddate ?? null);
  const [priority, setPriority] = useState(task.priority ?? 'Normal');
  const [reminder, setReminder] = useState(task.reminder ?? 'None');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(task.assignToUser ?? []);
  const [attachments, setAttachments] = useState<File[]>(task.attachment ?? []);
  const [editableDescription, setEditableDescription] = useState(task.description);
  const [editableName, setEditableName] = useState(task.name);
  const [assignedBy, setAssignedBy] = useState(task.fromUser ?? 'Manager');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [hideCheckedItems, setHideCheckedItems] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [buttonTitle, setButtonTitle] = useState('Archive');
  const [showSendToBoardButton, setShowSendToBoardButton] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const userList = [
    { id: '1', name: 'User A' },
    { id: '2', name: 'User B' },
    { id: '3', name: 'User C' },
    { id: '4', name: 'User D' },
  ];

  const handleUserSelection = (userId: string) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (descriptionRef.current && !descriptionRef.current.contains(e.target as Node)) {
      handleSaveDescription();
    }
  }, []);

  useEffect(() => {
    setEditableDescription(task.description);
    setEditableName(task.name);
    setStartDate(task.taskStartdate ?? null);
    setEndDate(task.taskenddate ?? null);
    setPriority(task.priority ?? 'Normal');
    setReminder(task.reminder ?? 'None');
    setSelectedUsers(task.assignToUser ?? []);
    setAttachments(task.attachment ?? []);
    setComments([]);
    setNewComment('');
    setChecklistItems([]);
    setNewChecklistItem('');
    setIsEditingName(false);
    if (isEditing) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [task, isEditing, handleOutsideClick]);




  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setAttachments(filesArray);
    }
  };

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEditableDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    // onSave({ ...task, description: editableDescription });
    setIsEditing(false); // Exit edit mode after saving
  };


  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    // onSave({ ...task, name: editableName });
  };
  const handleArchiveClick = () => {
    setShowSendToBoardButton(true); // Show Send to Board button
    // Additional logic for archiving
  };

  const handleSendToBoardClick = () => {
    setShowSendToBoardButton(false); // Hide Send to Board button
    // Additional logic for sending to board
  };

  const handleToggleArchive = () => {
    setIsArchived(!isArchived); // Toggle the archive state
  };

  const handleAddComment = () => {
    const trimmedComment = newComment.trim();

    if (trimmedComment !== '') {
      const newCommentObj = {
        id: uuidv4(),
        username: 'User', // Replace with actual username logic if applicable
        date: new Date().toLocaleDateString(), // Example date format, adjust as needed
        text: trimmedComment,
      };

      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleAddChecklistItem = () => {
    const trimmedItem = newChecklistItem.trim();

    if (trimmedItem !== '') {
      const newItem: ChecklistItem = {
        id: uuidv4(),
        text: trimmedItem,
        completed: false,
      };

      setChecklistItems([...checklistItems, newItem]);
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (itemId: string) => {
    setChecklistItems(
      checklistItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const renderUserList = () => {
    const assignTask = () => {
      setShowUserModal(false);
    };



    return (
      <div className="bg-white p-4 rounded shadow-md w-full sm:w-1/2">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{task.name}</h2>
        {userList.map((user) => (
          <div key={user.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserSelection(user.id)}
              className="mr-2"
            />
            <label htmlFor={user.id}>{user.name}</label>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button onClick={() => setShowUserModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            Close
          </button>
          <button onClick={assignTask} className="bg-slate-950 text-white px-4 py-2 rounded">
            Assign
          </button>
        </div>
      </div>
    );
  };
  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'click') {
      e.preventDefault(); // Prevent de.keefault newline behavior
      handleSaveDescription();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchTaskDetails = async () => {
    const response = await fetch('/api/task-details');
    const data = await response.json();
    return data;
  };

  const saveTaskDetails = async (details: any) => {
    const response = await fetch('/api/task-details', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    return data;
  };
  const openAttachmentModal = () => {
    setIsAttachmentModalOpen(true);
  };

  const closeAttachmentModal = () => {
    setIsAttachmentModalOpen(false);
  };
  const openMembersModal = () => {
    setIsMembersModalOpen(true);
  };

  const closeMembersModal = () => {
    setIsMembersModalOpen(false);
  };
  const fetchMembers = async () => {
    const response = await fetch('/api/members');
    const data = await response.json();
    return data;
  };
  return (
    <div className='flex'>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-md w-50 sm:w-3/4 md:w-2/1 lg:w-1/3 max-h-[100%] min-w-[50%] overflow-y-scroll  relative" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
          <div className='inline-flex pt-2' >
            <FaTimes className="absolute top-5 mr-1 right-2 text-gray-700 cursor-pointer " onClick={onClose} />
          </div>
          {/* <div className="inline-flex justify-start items-center">
          <label className="font-mono  ">Assigned by: </label>
          <p className=" font-bold ">{assignedBy}</p>
        </div> */}
          <h2 className="text-xl font-bold mb-4">

            <div className=" items-center inline-block
          ">
              <h3>{task.descriptions}</h3>
              <span className='text-sm font-normal'> in list {editableName}</span>
            </div>

          </h2>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/1 pr-0 sm:pr-2 mb-4 sm:mb-0">
              <label className="block mb-2 flex items-center ">
                <FaClipboard className="mr-2 " /> <h3 className='font-bold'>Description</h3>
              </label>

              <textarea
                ref={descriptionRef}
                className="border w-full p-2 mb-2 rounded-lg"
                value={editableDescription}
                onChange={handleDescriptionChange}
                onKeyDown={handleKeyDown}
                placeholder="Add description"
              ></textarea>




            </div>

            <div className="w-full sm:w-1/3 ml-1 ">


              <div className="flex flex-col  ">
                <div className=" flex items-center justify-end">
                  <button
                    className="bg-slate-700 w-full relative text-white p-1.5 pl-8 rounded-lg flex items-center"
                    onClick={openModal}
                  >
                    <MdAccessTime className="absolute left-2" color="white" />
                    Dates
                  </button>
                  <Date_Time_Rem
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    fetchTaskDetails={fetchTaskDetails}
                    saveTaskDetails={saveTaskDetails}
                  />
                </div>

              </div>

              <div className="flex flex-col ">
                <div className="flex items-center justify-end">
                  <button
                    className="bg-slate-700 w-full relative text-white p-2 pl-8 rounded-lg flex items-center mt-3"
                    onClick={openAttachmentModal}
                  >
                    <MdAttachment className="absolute left-2" color="white" />
                    Attachments
                  </button>
                  <AttachmentFiles
                    isOpen={isAttachmentModalOpen}
                    onClose={closeAttachmentModal}
                  />
                </div>

              </div>
              <div className="flex flex-col ">
                <div className="flex items-center justify-end">
                  <button
                    className="bg-slate-700 w-full relative text-white p-2 pl-8 rounded-lg flex items-center mt-3"
                    onClick={openMembersModal}
                  >
                    <MdPeople className="absolute left-2" color="white" />
                    Members
                  </button>
                  <Members
                    isOpen={isMembersModalOpen}
                    onClose={closeMembersModal} />
                </div>

              </div>
              {/* Assigned To section */}
              <div className="flex flex-col">
                <div className="flex items-center justify-end">
                  <button
                    className={`p-2 rounded-lg mt-3 w-full flex items-center justify-start ${isArchived ? 'bg-red-950' : 'bg-slate-700'
                      } text-white`}
                    onClick={handleToggleArchive}
                  >
                    {!isArchived && <GrArchive className="mr-2" />}
                    {isArchived && <GrRevert className="mr-2" />}
                    {isArchived ? 'Send to Board' : 'Archive'}
                  </button>
                </div>
              </div>

            </div>

          </div>
          <div className='mt-2'>
            <label className="block font-bold mb-2">Comments</label>
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="border-b-2 w-full p-1 "
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}

              />
              <button
                onClick={handleAddComment}
                className="bg-slate-800 text-white px-4 p-2 py-2 ml-2 rounded"
              >
                <IoSend />
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{comment.username}</span>
                      <span className="text-gray-600 text-sm">{comment.date}</span>
                    </div>
                    <p>{comment.text}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {showUserModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              {renderUserList()}
            </div>
          )}
        </div>

      </div>

    </div>

  );
};

export default TaskModal;
