import {useState} from 'react'
import './App.css'

function App() {
  const [cardList] = useState([
      {id: 1, order: 3, text: 'Карточка 3'},
      {id: 2, order: 1, text: 'Карточка 1'},
      {id: 3, order: 2, text: 'Карточка 2'},
      {id: 4, order: 4, text: 'Карточка 4'}
  ])


  return (
    <div className={'app'}>
        {cardList.map((card) =>
            <div
                key={card.id}
                draggable={true}
                className={'card'}>
                {card.text}
            </div>
        )}
    </div>
  )
}

export default App
