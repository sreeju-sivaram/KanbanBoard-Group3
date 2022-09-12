import axios from 'axios';

const TASKS_URL = '/tasks';
const STATUS_URL = '/statuses';
const LOGIN_URL = '/login'; 
const REGISTER_URL = '/register';
const PROJECTS_URL = '/projects';
const PRIORITY_URL = '/priorities';
const ROLES_URL = '/roles';
const PROJECT_USER_URL = '/projectroles'
const COMMENTS_URL = '/comments';
const USERS_URL = '/users';

export const getTasksData = async (projectId) => {
    const response = await axios.get(`${TASKS_URL}/${projectId}`).then((response) => response.data);
    return response.data;
}

export const addNewTask = async (params) => {
    const response = await axios.post(TASKS_URL, params).then((response) => response);
    return response;
}

export const getStatusData = async () => {
    const response = await axios.get(STATUS_URL).then((response) => response.data);
    return response.data;
}


export const login = async (params) => {
    const response = await axios.post(LOGIN_URL, params).then((response) => response);
    return response;
}


export const addNewUser = async (params) => {
    const response = await axios.post(REGISTER_URL, params).then((response) => response);
    return response;
}

export const addNewStatus = async (params) => {
    const response = await axios.post(STATUS_URL, params).then((response) => response);
    return response;
}

export const getPriorityList = async () => {
    const response = await axios.get(PRIORITY_URL).then((response) => response.data);
    return response.data;
}

export const addProject = async (params,userId) => {
    const allProjects = await axios.get(PROJECTS_URL).then((response) => response.data);
    const projId = allProjects.data.length+1;
    const response1 = await axios.post(PROJECTS_URL, {...params,"id":projId}).then((response) => response);
    const response2 = await assignUserToProject({ "roleId": 1,"userId":userId,"projectId":projId});
    return {response1,response2};
}

export const getRolesList = async () => {
    const response = await axios.get(ROLES_URL).then((response) => response.data);
    return response.data;
}

export const getUsersList = async () => {
    const response = await axios.get(USERS_URL).then((response) => response.data);
    return response.data;
}

export const assignUserToProject = async (params) => {
    const response = await axios.post(PROJECT_USER_URL, params).then((response) => response);
    return response;
}

export const addComment = async (params) => {
    const response = await axios.post(COMMENTS_URL, params).then((response) => response);
    return response;
}

export const getCommentsListByTask = async (id) => {
    const response = await axios.get(`${COMMENTS_URL}/${id}`).then((response) => response.data);
    return response.data;
}

export const deleteComment = async (id) => {
    const response = await axios.delete(`${COMMENTS_URL}/${id}`).then((response) => response.data);
    return response;
}

export const getUsersByProjectId = async (id) => {
    const response = await axios.get(`${USERS_URL}/${id}`).then((response) => response.data);
    return response.data;
}

export const changePassword = async (params) => {
    const response = await axios.put(LOGIN_URL,params).then((response) => response.data);
    return response;
}

export const updateTaskDetails = async (id, params) => {
    const response = await axios.put(`${TASKS_URL}/${id}`, params).then((response) => response.data);
    return response.data;
}

export const deleteTask = async (id) => {
    const response = await axios.delete(`${TASKS_URL}/${id}`).then((response) => response.data);
    return response;
}

export const updateComment = async (id, params) => {
    const response = await axios.put(`${COMMENTS_URL}/${id}`, params).then((response) => response.data);
    return response;
}

export const getProjectsList = async (id) => {
    const response = await axios.get(`${PROJECT_USER_URL}/${id}`).then((response) => response.data);
    console.log("getting project list?",response.data)
    return response.data;
}

export const getProjectRole = async (id,pId) =>{
    const response = await axios.get(`${PROJECT_USER_URL}/${id}/${pId}`).then((response) => response.data);
    console.log(response)
    return response.data;
}

export const getExistingUsersList = async (id) => {
    const response = await axios.get(`${PROJECTS_URL}/${id}`).then((response) => response.data);
    return response.data;
}

export const deleteUserFrmProject = async (id) => {
    const response = await axios.delete(`${PROJECT_USER_URL}/${id}`).then((response) => response.data);
    return response;
}