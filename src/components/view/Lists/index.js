import './style.sass'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { newListInBoard } from '../../../store/boardSlice'
import { takeListById } from '../../../store/boardSlice'
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

		const { droppableId, index } = destination
		// let updatedBoard = {...board}
		// let filterUpdatedBoard = updatedBoard.lists.filter((e) => { return e.id === parseInt(droppableId)})[0]
		// filterUpdatedBoard = filterUpdatedBoard.fullList.push({title: "123451", id: 4315134, complete: false})
		// console.log(filterUpdatedBoard)
		// updatedBoard.fullList.push({title: "123451", id: 4315134, complete: false})
		// draggable - айди таска (taskId)
		// droppable - куда кидаем (listId)
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