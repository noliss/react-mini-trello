import './style.sass'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { newListInBoard, takeListById, updateListsInBoard } from '../../../store/boardSlice'
import BoardElement from '../../elements/BoardElement'
import { Link } from "react-router-dom"
function Lists(props) {

	const [listTitle, setListTitle] = useState("")

	const dispatch = useDispatch()
	dispatch(takeListById(props.match.params.id))
	const board = useSelector(({ board: { currentBoard } }) => currentBoard)

	const addNewList = () => {
		if (listTitle.length) {
			dispatch(newListInBoard({ title: listTitle }))
			dispatch(takeListById());
		}
	}

	const handleDragEnd = (result) => {
		const { destination, draggableId } = result
		if (!destination) {
			return
		}
		let currentLists = [...board.lists]
		let currentList = currentLists
							.map((e) => e.fullList
							.map((z) => z.id === parseInt(draggableId) ? e : null))
							.flat(2)
							.filter((i) => i)[0]
		let swapList = currentLists.filter((el) => el.id === parseInt(destination.droppableId))[0]
		let task = currentList.fullList.filter((el) => el.id === parseInt(draggableId))[0]
		console.log("КУДА НУЖНО СВАПНУТЬ:")
		console.log(swapList)
		console.log("ТЕКУЩИЙ ЛИСТ")
		console.log(currentList)
		console.log("ПЕРЕМЕЩАЕМЫЙ ТАСК")
		console.log(task)
		console.log(result)
		dispatch(updateListsInBoard({currentList, swapList, task}))
		dispatch(takeListById());
	}

	return (
		<div className="lists">
			<div className="container">
				<div className="lists__board">
					<Link to="/">{board ? board.title : "Такой доски не существует :/"}</Link>
				</div>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className="lists__list">
						{
							board ? board.lists.map((item) => {
								return (
									<BoardElement key={item.id} listId={item.id} title={item.title} fullList={item.fullList} />
								)
							}) : ""
						}
						{board &&
							<div className="lists-new">
								<input className="lists-new__title" value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
								<div className="lists__add" onClick={() => addNewList()}>Добавить список</div>
							</div>
						}
					</div>
				</DragDropContext>
			</div>
		</div>
	)
}

export default Lists;