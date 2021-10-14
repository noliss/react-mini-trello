import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addBoard } from './store/boardSlice'
import { Link } from "react-router-dom"
import './styles/fonts.sass'
import './styles/main.sass'
import './styles/reset.sass'

function App() {
  const [newBoard, setNewBoard] = useState("")
  const [showCreator, setShowCreator] = useState(true)

  const dispatch = useDispatch()
  const boards = useSelector(({ board: { boards } }) => boards)

  const addNewBoard = () => {
    if (newBoard.length) {
      dispatch(
        addBoard(
          {
            title: newBoard,
            id: Date.now(),
            lists: []
          }
        )
      )
      setNewBoard("")
    }
  }

  const closeBoardCreator = () => { 
    setShowCreator(!showCreator)
    setNewBoard("")
  }

  return (
    <div className="App">
      <div className="container">
        <div className="board">
          <div className="board-gen">
            <div className="board-gen__up" onClick={() => closeBoardCreator()}>Создать новую доску +</div>
            { showCreator &&
              <div className="board-gen__toggled">
                <div className="board-gen__title">Название доски</div>
                <input
                  className="board-gen__bname"
                  value={newBoard}
                  onChange={(e) => setNewBoard(e.target.value)}
                />
                <div className="board-gen__actions">
                  <div 
                    className="board-gen__actions_button board-gen__actions_button-cancel" 
                    onClick={() => closeBoardCreator() }>
                    Отмена
                  </div>
                  <div className="board-gen__actions_button" onClick={() => addNewBoard()}>Сохранить</div>
                </div>
              </div>
            }
          </div>
          <div className="board__boards">
            <div className="board__boards_title">Список досок:</div>
            {
              boards.map((item) => {
                return <Link to={`/board/${item.id}`} className="board-item" key={item.id}>
                  <div className="board-item__title">{item.title}</div>
                  <div className="board-item__count">{item.lists.length}</div>
                </Link>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
