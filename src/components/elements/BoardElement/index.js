import './style.sass'
import { toogleStateTaskInList, deleteListInBoard, newTaskInList, takeListById } from '../../../store/boardSlice'
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
function BoardElement(props) {

	const { title, listId, fullList } = props

	const [taskName, setTaskName] = useState("")

	const dispatch = useDispatch()

	const toggleTaskComplete = ({ id, complete }) => {
		dispatch(toogleStateTaskInList({ taskId: id, listId, complete }))
		dispatch(takeListById());
	}

	const addTask = (e) => {
		if (e.key === "Enter" && taskName.length) {
			dispatch(newTaskInList({ title: taskName, id: Date.now(), listId }))
			dispatch(takeListById());
			setTaskName("")
		}
	}

	const deleteList = () => {
		dispatch(deleteListInBoard({ listId }))
		dispatch(takeListById());
	}

	return (
		<div className="lists-item">
			<div className="lists-item__action_delete" onClick={() => deleteList()}></div>
			<div className="lists-item__title">{title}</div>
			<ul>

				<Droppable droppableId={listId + ""}>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{
								fullList.map((item, index) => {
									return (
										<Draggable key={item.id} draggableId={item.id + ""} index={index}>
											{(provided) => (
												<li
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
													key={item.id}
													className={`lists-item__row ${item.complete ? 'lists-item__row_completed' : ''}`}
													onClick={() => toggleTaskComplete({ id: item.id, complete: item.complete })}>
													{item.title}
												</li>
											)}
										</Draggable>
									)
								})
							}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</ul>
			<div className="lists-item__add">
				<input
					className="lists-item__add-action"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					onKeyPress={(e) => addTask(e)}
				/>
			</div>
		</div>
	)
}

export default BoardElement;