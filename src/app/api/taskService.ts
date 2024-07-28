"use client";
// src/api/taskService.ts

import axios from 'axios';

const GET_API_URL = 'https://task.8px.us/api/task/list';
const POST_API_URL = 'https://task.8px.us/api/task/list/insert';
const UPDATE_API_URL = 'https://task.8px.us/api/task/list/update';


// ................task add api.....................
const TASK_CARD_POST_API = 'https://task.8px.us/api/task/insert';
const TASK_CARD_UPDATE_API = "https://task.8px.us/api/task/update"
const TASK_CARD_UPDATE_DONE_API = "https://task.8px.us/api/task/update/done"
const TASK_CARD_GET_API = (taskListNum: number) => `https://task.8px.us/api/task/${taskListNum}`;
const GET_USER_API = 'https://task.8px.us/api/task/get/user/list'
const POST_NOTE_API = 'https://task.8px.us/api/task/note/insert'
const PRIORITY_REMINDER_GET_API = "https://task.8px.us/api/task/get/priority/list"
const GET_NOTE = (TaskNum: number) => `https://task.8px.us/api/get/task/note?taskNum/${TaskNum}`


export const updateTask = async (taskListNum: string, descript: string) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json'
  };
  const data = {
    taskListNum: taskListNum,
    descript: descript,
    parent: 1

  };


  try {
    const response = await axios.post(UPDATE_API_URL, data, { headers: headers });
    console.log("Update response:", response);
    return response.data;
  } catch (error) {
    console.error('Failed to update task', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};



export const fetchTasks = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(GET_API_URL, {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
    });


    return response.data;

  } catch (error) {
    console.error('Failed to fetch tasks', error);
    throw error; // Rethrow the error to handle it in the caller function (like loadTasks in page.tsx)
  }
};


export const createTask = async (descript: string, parent: number) => {

  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json'
  };
  const data = {
    descript: descript,
    parent: parent
  };

  axios.post(POST_API_URL, data, { headers: headers })
    .then(response => {
      console.log("responsedata.....", response);
      return response
    })
    .catch(error => {
      console.error('Error:', error);
    });
};



export const fetchTaskCard = async (taskListNum: any) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(TASK_CARD_GET_API(taskListNum), {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch task card', error);
    throw error;
  }
};


export const createTaskCard = async (taskListNum: any, description: string,) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json'
  };
  const data = {
    taskListNum: taskListNum,
    descript: '',
    keyNum: "",
    objectType: 0,
    dateTimeEntry: "",
    priorityDefNum: 0,
    secDateTEdit: "",
    descriptOverride: description
  };

  try {
    const response = await axios.post(TASK_CARD_POST_API, data, { headers });

    return response;
  } catch (error) {
    console.error('Failed to create task card', error);
    throw error;
  }
};

export const updateTaskDescription = async (data: any) => {

  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json'

  };
  try {
    const response = await axios.post((TASK_CARD_UPDATE_API), data, { headers: headers });
    console.log("Update response:", JSON.parse(response.config.data));
    return JSON.parse(response.config.data);
  } catch (error) {
    console.error('Failed to update task description', error);
    throw error;
  }
};

export const updateEndTask = async (data: any) => {

  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json'

  };
  try {
    const response = await axios.post((TASK_CARD_UPDATE_DONE_API), data, { headers: headers });
    console.log("Update response:", JSON.parse(response.config.data));
    return JSON.parse(response.config.data);
  } catch (error) {
    console.error('Failed to update task description', error);
    throw error;
  }
};

export const fetchUser = async (data: any) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(GET_USER_API, {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
    });

    return response.data;

  } catch (error) {
    console.error('Failed to fetch user list', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};


export const fetchNote = async (taskNum: any) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(GET_NOTE(taskNum), {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
    });

    return response.data;

  } catch (error) {
    console.error('Failed to fetch notes', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};


export const update_note = async (data: { taskNum: number; dateTimeNote: string; note: string; userNum: number }) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'token': token,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(POST_NOTE_API, data, { headers });
    console.log('Update response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};


export const fetchPriority_Reminder = async (priorityDefNum: number) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(PRIORITY_REMINDER_GET_API, {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
    });

    return response.data;

  } catch (error) {
    console.error('Failed to fetch user list', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};