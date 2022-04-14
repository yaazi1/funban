import axios from "axios";

// Action Constants 
const GET_TASKS = 'GET_TASKS'
const ADD_TASK = 'ADD_TASKS'
const UPDATE_TASK_STATUS = 'UPDATE_TASK'

// Action Creators 
const getTasks = (allTasks) => {
	return {
		type: GET_TASKS,
		allTasks
	}
}

const addTask = (task) => {
	return {
		type: ADD_TASK,
		task
	}
}

const updateTaskStatus = (updatedTask) => {
	return {
		type: UPDATE_TASK_STATUS,
		updatedTask
	}
}

// Thunks
export const getTasksThunk = (userId) => {
	return async (dispatch) => {
		const response = await axios.get(`/api/users/${userId}/tasks`);
		const userTasks = response.data;
		dispatch(getTasks(userTasks))
	}
}

export const addTaskThunk = (userId, newTask) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/api/users/${userId}/tasks`, newTask)
			const data = response.data
			dispatch(addTask(data))

		} catch (error) {
			console.log(error)

		}
	}
}

export const updateTaskStatusThunk = (task, updatedStatus) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/users/${task.userId}/tasks/${task.id}`, updatedStatus);
			const updatedTask = response.data;
			dispatch(updateTaskStatus(updatedTask))

		} catch (error) {
			console.log("!!! Error from updateTaskStatusThunk !!!", error)
		}

	}
}

// reducer 
const initialState = [];
export default function tasksReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASKS:
			console.log('[ tasksReducer/GET_TASKS ] - action: ', action)
			return action.allTasks;
		case ADD_TASK:
			return [...state, action.task]
		case UPDATE_TASK_STATUS:
			console.log('[ tasksReducer/UPDATE_TASK_STATUS ] - action: ', action);
			const taskIndex = state.findIndex((task => task.title === action.updatedTask.title));
			state[taskIndex] = action.updatedTask;
			return [...state];
		// return [...state, state[taskIndex] = action.updatedTask]
		// return [...state, action.updatedTask]
		default:
			return state;
	}
}