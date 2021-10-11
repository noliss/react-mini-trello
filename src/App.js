import './styles/fonts.sass'
import './styles/main.sass'
import './styles/reset.sass'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="board">
          <div className="board-gen">
            <div className="board-gen__up">Создать новую доску +</div>
            <div className="board-gen__toggled">
              <div className="board-gen__title">Название доски</div><input className="board-gen__bname" />
              <div className="board-gen__actions">
                <div className="board-gen__actions_button board-gen__actions_button-cancel">Отмена</div>
                <div className="board-gen__actions_button">Сохранить</div>
              </div>
            </div>
          </div>
          <div className="board__boards">
            <div className="board__boards_title">Список досок:</div>
            <div className="board-item">
                <div className="board-item__title">Доска 1</div>
                <div className="board-item__count">12</div>
            </div>
            <div className="board-item">
                <div className="board-item__title">Доска 2</div>
                <div className="board-item__count">93</div>
            </div>
            <div className="board-item">
                <div className="board-item__title">Доска 3</div>
                <div className="board-item__count">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
