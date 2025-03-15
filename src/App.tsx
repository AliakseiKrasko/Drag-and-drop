import { useEffect, useState } from 'react'
import './App.css'
import { DraggableCard } from './components/DraggableCard.tsx'
import { CardType } from './types'

function App() {
    const [cardList, setCardList] = useState<CardType[]>([
        { id: 1, order: 3, text: 'Карточка 3' },
        { id: 2, order: 1, text: 'Карточка 1' },
        { id: 3, order: 2, text: 'Карточка 2' },
        { id: 4, order: 4, text: 'Карточка 4' }
    ])

    const [currentCard, setCurrentCard] = useState<CardType | null>(null)

    const DragStartHandler = (_e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        setCurrentCard(card)
    }

    const DragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'white'
    }

    const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.background = 'lightgray'
    }

    const DropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        e.preventDefault()
        if (!currentCard) return

        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return { ...c, order: currentCard.order }
            }
            if (c.id === currentCard.id) {
                return { ...c, order: card.order }
            }
            return c
        }))

        e.currentTarget.style.background = 'white'
    }

    const sortCards = (a: CardType, b: CardType) => a.order - b.order

    useEffect(() => {
        const saved = localStorage.getItem('cardList')
        if (saved) {
            setCardList(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cardList', JSON.stringify(cardList))
    }, [cardList])

    return (
        <div className="app">
            {cardList.sort(sortCards).map(card => (
                <DraggableCard
                    key={card.id}
                    card={card}
                    currentCard={currentCard}
                    onDragStart={DragStartHandler}
                    onDragEnd={DragEndHandler}
                    onDragOver={DragOverHandler}
                    onDrop={DropHandler}
                />
            ))}
        </div>
    )
}

export default App

