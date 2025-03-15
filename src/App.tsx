import {useEffect, useState} from 'react'
import './App.css'

type CardType = {
    id: number
    order: number
    text: string
}

function App() {


    const [cardList, setCardList] = useState<CardType[]>([
        {id: 1, order: 3, text: 'Карточка 3'},
        {id: 2, order: 1, text: 'Карточка 1'},
        {id: 3, order: 2, text: 'Карточка 2'},
        {id: 4, order: 4, text: 'Карточка 4'}
    ])

    const [currentCard, setCurrentCard] = useState<CardType | null>(null)


    function DragStartHandler(_e: React.DragEvent<HTMLDivElement>, card: CardType) {
        setCurrentCard(card)
    }


    function DragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'white'
    }

    function DragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const target = e.target as HTMLDivElement
        target.style.background = 'lightgray'
    }

    function DropHandler(e: React.DragEvent<HTMLDivElement>, card: CardType) {
        e.preventDefault()

        if (!currentCard) return // safety check

        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))

        e.currentTarget.style.background = 'white'
    }

    const sortCards = (a: CardType, b: CardType) => {
        if(a.order > b.order){
            return 1
        } else {
            return -1
        }
    }

    useEffect(() => {
        localStorage.setItem('cardList', JSON.stringify(cardList))
    }, [cardList])

    useEffect(() => {
        const saved = localStorage.getItem('cardList')
        if (saved) {
            setCardList(JSON.parse(saved))
        }
    }, [])


    return (
        <div className={'app'}>
            {cardList.sort(sortCards).map((card) =>
                <div
                    onDragStart={(e) => DragStartHandler(e, card)}
                    onDragLeave={(e) => DragEndHandler(e)}
                    onDragEnd={(e) => DragEndHandler(e)}
                    onDragOver={(e) => DragOverHandler(e)}
                    onDrop={(e) => DropHandler(e, card)}
                    key={card.id}
                    draggable={true}
                    className={`card ${currentCard?.id === card.id ? 'active' : ''}`}>
                    {card.text}
                </div>
            )}
        </div>
    )
}

export default App
