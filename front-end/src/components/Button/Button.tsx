import React, {useState, MouseEvent} from 'react';
import classNames from 'classnames';
import './Button.scss';

interface PropTypes {
    children?: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'info' | 'warning',
    outline?: boolean,
    disabled?: boolean,
    className?: string,
    [propName: string]: any
}

interface ButtonType extends React.ForwardRefExoticComponent<any> {
    Reactive: React.ForwardRefExoticComponent<any>;
}

const B: any = React.forwardRef<any, PropTypes>((props: PropTypes, ref: React.Ref<any>) => {
    const className = classNames(
        'btn',
        {disabled: props.disabled},
        `btn-${props.variant || 'primary'}${props.outline ? '-outline' : ''}`,
        props.className
    );
    return (
        <button ref={ref} {...props} className={className}>
            {props.children}
        </button>
    );
});

B.Reactive = React.forwardRef<any, PropTypes>((props: PropTypes, ref: React.Ref<any>) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    let largerTimeout: any = null;

    let className = classNames(
        'btn',
        {
            disabled: props.disabled, 
            'btn-clicked': isClicked,
            'btn-mouse-over': isMouseOver,
        },
        `btn-${props.variant || 'primary'}${props.outline ? '-outline' : ''}`,
        props.className,
    );

    const handleClick = (e: MouseEvent) => {
        clearTimeout(largerTimeout);
        setIsMouseOver(false);
        setIsClicked(true);
        setTimeout(() => {setIsClicked(false)}, 200);
        if (props.onClick) {
            props.onClick(e);
        }
    }

    const handleMouseOver = (value: boolean, e: MouseEvent) => {
        setIsMouseOver(value);
        if (value) {
            if (props.onMouseOver) {
                props.onMouseOver(e);
            }
        } else {
            if (props.onMouseOut) {
                props.onMouseOut(e);
            }
        }
    }

    return (
        <button 
            onClick={handleClick} 
            onMouseOver={(e: MouseEvent) => handleMouseOver(true, e)} 
            onMouseOut={(e: MouseEvent) => handleMouseOver(false, e)} 
            ref={ref} 
            className={className}
            {...props}
            >
            {props.children}
        </button>
    );
});

const Button: ButtonType = B;

export default Button;
