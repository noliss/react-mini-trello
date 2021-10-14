import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
	boards: [
		{
			id: 0,
			title: "Моя доска 1",
			lists: [
				{
					id: 6543,
					title: "Список 1",
					fullList: [
						{
							id: 12425,
							title: "Что-то купить",
							complete: false,
						},
						{
							id: 5462,
							title: "Прогулка",
							complete: false,
						},
						{
							id: 7653,
							title: "Купить кошку",
							complete: false,
						}
					]
				},
				{
					id: 1,
					title: "Список 99",
					fullList: [
						{
							id: 123546,
							title: "Поездка на дачу",
							complete: false,
						},
						{
							id: 876,
							title: "Покормить хомяука",
							complete: false,
						},
						{
							id: 968,
							title: "Читать книгу",
							complete: false,
						}
					]
				},
				{
					id: 2,
					title: "Список zero",
					fullList: [
						{
							id: 946,
							title: "Зеро",
							complete: false,
						},
						{
							id: 5367,
							title: "Все ещё 0",
							complete: false,
						},
						{
							id: 9468,
							title: "0 больше чем -1",
							complete: false,
						},
					]
				},
				{
					title: "Пусто",
					fullList: []
				}
			]
		},
		{
			id: 1,
			title: "Моя доска 2",
			lists: [
				{
					id: 0,
					title: "Список 2",
					fullList: [
						{
							id: 5879,
							title: "Попугай",
							complete: false,
						},
						{
							id: 4678,
							title: "Вымыть пол",
							complete: false,
						},
						{
							id: 45322,
							title: "Покупки",
							complete: false,
						}
					]
				}
			]
		},
		{
			id: 2,
			title: "Моя доска 3",
			lists: [
				{
					id: 0,
					title: "Список 3",
					fullList: [
						{
							id: 9875,
							title: "Фантазии нет",
							complete: false,
						},
						{
							id: 890,
							title: "Или есть",
							complete: false,
						},
						{
							id: 988,
							title: "Нету",
							complete: false,
						}
					]
				}
			]
		},
	],
	currentBoard: [],
	value: []
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		takeListById: (state, action) => {
			const { payload } = action
			state.currentBoard = state.boards.filter((item) => item.id === parseInt(payload) ? item : false)[0]
		},
		addBoard: (state, action) => {
			const { payload: { title, id, lists } } = action
			state.boards.push({
				title,
				id,
				lists
			})
		},
		deleteListInBoard: (state, action) => {
			const { payload: { listId } } = action
			state.boards.filter((e) => e.id === state.currentBoard.id)[0].lists =
				state.boards.filter((e) => e.id === state.currentBoard.id)[0].lists
					.filter((x) => x.id !== listId)
		},
		toogleStateTaskInList: (state, action) => {
			const { payload: { taskId, listId, complete } } = action
			console.log(taskId, listId, complete)
			state.boards.filter((e) => e.id === state.currentBoard.id)[0].lists
				.filter((x) => x.id === listId)[0].fullList
				.filter((z) => z.id === taskId)[0].complete = !complete
		},
		newListInBoard: (state, action) => {
			const { payload: { title } } = action
			state.boards
				.filter((el) => el.id === state.currentBoard.id)[0].lists =
				[...state.currentBoard.lists, { title, id: Date.now(), fullList: [] }]
		},
		newTaskInList: (state, action) => {
			const { payload: { title, id, listId } } = action
			state.boards
				.filter((el) => el.id === state.currentBoard.id)[0].lists
				.filter((element) => element.id === listId)[0].fullList.push({ title, id, complete: false })
		},
		updateListsInBoard: (state, action) => {
			const { payload: { currentList, swapList, task } } = action
			state.boards
				.filter((el) => el.id === state.currentBoard.id)[0].lists
				.filter((element) => element.id === swapList.id)[0].fullList.push(task)
			state.boards
				.filter((el) => el.id === state.currentBoard.id)[0].lists
				.filter((element) => element.id === currentList.id)[0].fullList =
			state.boards
				.filter((el) => el.id === state.currentBoard.id)[0].lists
				.filter((element) => element.id === currentList.id)[0].fullList
				.filter((zel) => zel.id !== task.id)
		}
	},
})

export const {
	takeListById,
	addBoard,
	toogleStateTaskInList,
	newListInBoard,
	newTaskInList,
	deleteListInBoard,
	updateListsInBoard
} = boardSlice.actions

export default boardSlice.reducer