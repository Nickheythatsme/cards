import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import './Card.scss'

interface CardPropTypes {
    style?: CSSProperties
    children?: React.ReactNode
    className?: string
}

interface CardImagePropTypes extends CardPropTypes {
    src: string
    alt: string
}

type CardForwardRef<T, P = CardPropTypes> = React.ForwardRefExoticComponent<
    P & React.RefAttributes<T>
>
interface CardModule extends CardForwardRef<HTMLDivElement> {
    Heading: CardForwardRef<HTMLDivElement>
    Title: CardForwardRef<HTMLHeadingElement>
    Subtitle: CardForwardRef<HTMLDivElement>
    Body: CardForwardRef<HTMLDivElement>
    Image: CardForwardRef<HTMLImageElement, CardImagePropTypes>
}

const Card = React.forwardRef<HTMLDivElement, CardPropTypes>((props, ref) => (
    <div
        ref={ref}
        style={props.style}
        className={classNames('card', props.className)}
    >
        {props.children}
    </div>
))
Card.displayName = 'card'

;(Card as CardModule).Heading = React.forwardRef<HTMLDivElement, CardPropTypes>(
    (props, ref) => (
        <div
            ref={ref}
            style={props.style}
            className={classNames('card-heading', props.className)}
        >
            {props.children}
        </div>
    )
)

;(Card as CardModule).Title = React.forwardRef<
    HTMLHeadingElement,
    CardPropTypes
>((props, ref) => (
    <h3
        ref={ref}
        style={props.style}
        className={classNames('card-title', props.className)}
    >
        {props.children}
    </h3>
))

;(Card as CardModule).Subtitle = React.forwardRef<
    HTMLHeadingElement,
    CardPropTypes
>((props, ref) => (
    <h4
        ref={ref}
        style={props.style}
        className={classNames('card-subtitle', props.className)}
    >
        {props.children}
    </h4>
))

;(Card as CardModule).Body = React.forwardRef<HTMLDivElement, CardPropTypes>(
    (props, ref) => (
        <div
            ref={ref}
            style={props.style}
            className={classNames('card-body', props.className)}
        >
            {props.children}
        </div>
    )
)

;(Card as CardModule).Image = React.forwardRef<
    HTMLImageElement,
    CardImagePropTypes
>((props, ref) => (
    <img
        src={props.src}
        style={props.style}
        alt={props.alt}
        ref={ref}
        className={classNames('card-image', props.className)}
    />
))
export default Card as CardModule
