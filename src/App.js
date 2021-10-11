import './styles/fonts.sass'
import './styles/main.sass'
import './styles/reset.sass'

function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="board">
          <div class="board-gen">
            <div class="board-gen__up">Создать новую доску +</div>
            <div class="board-gen__toggled">
              <div class="board-gen__title">Название доски</div><input class="board-gen__bname" />
              <div class="board-gen__actions">
                <div class="board-gen__actions_button board-gen__actions_button-cancel">Отмена</div>
                <div class="board-gen__actions_button">Сохранить</div>
              </div>
            </div>
          </div>
          <div class="board__boards">
            <div class="board__boards_title">Список досок:</div>
            <div class="board-item">
                <div class="board-item__title">Доска 1</div>
                <div class="board-item__count">12</div>
            </div>
            <div class="board-item">
                <div class="board-item__title">Доска 2</div>
                <div class="board-item__count">93</div>
            </div>
            <div class="board-item">
                <div class="board-item__title">Доска 3</div>
                <div class="board-item__count">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
