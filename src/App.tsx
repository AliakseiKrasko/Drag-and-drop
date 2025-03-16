import { useEffect, useState } from 'react'
import './App.css'
import { DraggableCard } from './components/DraggableCard.tsx'
import { CardType } from './types'
import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'

function App() {
    const [cardList, setCardList] = useState<CardType[]>([
        { id: 1, order: 3, image: img1 },
        { id: 2, order: 1, image: img2 },
        { id: 3, order: 2, image: img3 },
        { id: 4, order: 4, image: img4 }
    ])

    const [currentCard, setCurrentCard] = useState<CardType | null>(null)

    const DragStartHandler = (_e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        setCurrentCard(card)
    }

    const DragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'white'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.scale = '1'
    }

    const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.background = 'blue'
        e.currentTarget.style.boxShadow = '0 8px 10px rgba(0, 5, 5, 0.2)'
        e.currentTarget.style.scale = '0.95'
    }

    const DropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
        e.preventDefault()
        e.currentTarget.style.scale = '1'
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

