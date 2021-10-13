import './style.sass'
import { toogleStateTaskInList, deleteListInBoard, newTaskInList, takeListById } from '../../../store/boardSlice'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
function BoardElement(props) {

	const { title, listId, fullList } = props

	const [taskName, setTaskName] = useState("")

	const dispatch = useDispatch()
	const toggleTaskComplete = ({ id, complete }) => {
		dispatch(
			toogleStateTaskInList({ taskId: id, listId, complete })
		)
		dispatch(takeListById());
	}

	const addTask = (e) => {
		if (e.key === "Enter" && taskName.length) {
			dispatch(newTaskInList({ title: taskName, id: Date.now(), listId }))
			dispatch(takeListById());
		}
	}

	const deleteList = () => {
		dispatch(deleteListInBoard({listId}))
		dispatch(takeListById());
	}

	return (
		<div className="lists-item">
			<div className="lists-item__action_delete" onClick={() => deleteList()}></div>
			<div className="lists-item__title">{title}</div>
			{
				fullList.map((item) => {
					return <li
						key={item.id}
						className={`lists-item__row ${item.complete ? 'lists-item__row_completed' : ''}`}
						onClick={() => toggleTaskComplete({ id: item.id, complete: item.complete })}>
						{item.title}
					</li>
				})
			}
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