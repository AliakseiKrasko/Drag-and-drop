import {useState} from 'react'
import './App.css'

type CardType = {
    id: number
    order: number
    text: string
}

function App() {


    const [cardList] = useState<CardType[]>([
        {id: 1, order: 3, text: 'Карточка 3'},
        {id: 2, order: 1, text: 'Карточка 1'},
        {id: 3, order: 2, text: 'Карточка 2'},
        {id: 4, order: 4, text: 'Карточка 4'}
    ])


    function DragStartHandler(_e: React.DragEvent<HTMLDivElement>, card: CardType) {
        console.log('drag', card)
    }


    function DragEndHandler() {

    }

    function DragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function DropHandler(e: React.DragEvent<HTMLDivElement>, card: CardType) {
        e.preventDefault()
        console.log('drop', card)
    }


    return (
        <div className={'app'}>
            {cardList.map((card) =>
                <div
                    onDragStart={(e) => DragStartHandler(e, card)}
                    onDragLeave={() => DragEndHandler()}
                    onDragEnd={() => DragEndHandler()}
                    onDragOver={(e) => DragOverHandler(e)}
                    onDrop={(e) => DropHandler(e, card)}
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
