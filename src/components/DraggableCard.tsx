import React from 'react'
import { CardType } from '../types'


type Props = {
    card: CardType
    currentCard: CardType | null
    onDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    onDrop: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void
}

export const DraggableCard: React.FC<Props> = ({
                                            card,
                                            currentCard,
                                            onDragStart,
                                            onDragEnd,
                                            onDragOver,
                                            onDrop
                                        }) => {
    return (
        <div
            draggable={true}
            className={`card ${currentCard?.id === card.id ? 'active' : ''}`}
            onDragStart={(e) => onDragStart(e, card)}
            onDragEnd={onDragEnd}
            onDragLeave={onDragEnd}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, card)}
        >
            {card.text}
        </div>
    )
}


