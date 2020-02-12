import React, {useState, MouseEvent} from 'react';
import classNames from 'classnames';
import './Button.scss';

interface PropTypes {
    children?: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'info' | 'warning',
    outline?: boolean,
    className?: string,
    onClick?: (e: MouseEvent) => any,
    onMouseOut?: (e: MouseEvent) => any,
    onMouseOver?: (e: MouseEvent) => any,
    [propName: string]: any
}

const Button = React.forwardRef<any, PropTypes>(({outline, variant, className, ...props}: PropTypes, ref: React.Ref<any>) => {
    const concatClassName = classNames(
        'btn',
        `btn-${variant || 'primary'}${outline ? '-outline' : ''}`,
        className
    );
    return (
        <button ref={ref} {...props} className={concatClassName}>
            {props.children}
        </button>
    );
});

export const ReactiveButton = React.forwardRef<any, PropTypes>(({onClick, onMouseOver, onMouseOut, disabled, ...props}: PropTypes, ref: React.Ref<any>) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    let clickTimeout: any = null;

    let className = classNames(
        {
            'btn-clicked': isClicked,
            'btn-mouse-over': isMouseOver,
        },
    );

    const handleClick = (e: MouseEvent) => {
        if (!disabled) {
            clearTimeout(clickTimeout);
            setIsMouseOver(false);
            setIsClicked(true);
            clickTimeout = setTimeout(() => {setIsClicked(false)}, 200);
        }
        onClick && onClick(e);
    }

    const handleMouseOver = (value: boolean, e: MouseEvent) => {
        if (!disabled) {
            setIsMouseOver(value);
        }
        value && onMouseOver && onMouseOver(e);
        !value && onMouseOut && onMouseOut(e);
    }

    return (
        <Button 
            {...props}
            onClick={handleClick} 
            onMouseOver={(e: MouseEvent) => handleMouseOver(true, e)} 
            onMouseOut={(e: MouseEvent) => handleMouseOver(false, e)} 
            ref={ref} 
            className={className}
            disabled={disabled}
        >
            {props.children}
        </Button>
    );
});

export default Button;
