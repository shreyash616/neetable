import { createStore } from 'redux'
import StudentsData from './StudentData.json'

const INITIAL_STATE = {
	studentsData: StudentsData.students,
	clientsData: []
}

const ACTION_TYPES = {
	SAVE_SELECTED_CLIENTS: 'SAVE_SELECTED_CLIENTS',
	SAVE_ALL_STUDENT_DATA: 'SAVE_ALL_STUDENT_DATA'
}

export const sendAllStudentsData = (data) => ({
	type: ACTION_TYPES.SAVE_ALL_STUDENT_DATA,
	data
})

export const sendAllClientsData = data => ({
	type: ACTION_TYPES.SAVE_SELECTED_CLIENTS,
	data
})

const appReducer = function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTION_TYPES.SAVE_SELECTED_CLIENTS:
			return {
				...state,
				clientsData: action.data
			};
		case ACTION_TYPES.SAVE_ALL_STUDENT_DATA:
			return {
				...state,
				studentsData: action.data
			};
		default:
			return state;
	}
};

const store = createStore(appReducer)

export default store
