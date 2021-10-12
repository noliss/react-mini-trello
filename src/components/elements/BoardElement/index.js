import './style.sass'
import { toogleStateTaskInList } from '../../../store/boardSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newTaskInList } from '../../../store/boardSlice'
function BoardElement(props) {

	const { title, listId, fullList } = props

	const [taskName, setTaskName] = useState("")

	const dispatch = useDispatch()
	const toggleTaskComplete = ({ id, complete }) => {
		dispatch(
			toogleStateTaskInList({ taskId: id, listId, complete })
		)
	}

	const addTask = (e) => {
		if (e.key === "Enter") {
			return dispatch(newTaskInList({ title: taskName, id: Date.now(), listId }))
		}
	}

	return (
		<div className="lists-item">
			<div className="lists-item__action_delete"></div>
			<div className="lists-item__title">{title}</div>
			{
				fullList.map((item) => {
					return <li
						key={item.id}
						className="lists-item__row"
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