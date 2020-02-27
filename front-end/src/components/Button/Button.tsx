import React, { useState, MouseEvent } from 'react';
import { VariantTypes } from '../Theming';
import classNames from 'classnames';
import './Button.scss';

const REACTIVE_TRANSITION_TIME = 100; // ms

interface PropTypes {
    children?: React.ReactNode;
    variant?: VariantTypes;
    outline?: boolean;
    className?: string;
    [propName: string]: any;
}

const Button = React.forwardRef<any, PropTypes>(
    (
        { outline, variant, className, ...props }: PropTypes,
        ref: React.Ref<any>
    ) => {
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
    }
);

export const ReactiveButton = React.forwardRef<any, PropTypes>(
    ({ ...props }: PropTypes, ref: React.Ref<any>) => {
        const [isClicked, setIsClicked] = useState(false);
        const [isMouseOver, setIsMouseOver] = useState(false);
        let clickTimeout: any = null;

        let className = classNames({
            'btn-clicked': isClicked,
            'btn-mouse-over': isMouseOver,
        });

        const handleClick = (e: MouseEvent) => {
            clearTimeout(clickTimeout);
            setIsMouseOver(false);
            setIsClicked(true);
            clickTimeout = setTimeout(() => {
                setIsClicked(false);
            }, REACTIVE_TRANSITION_TIME);
            props.onClick && props.onClick(e);
        };

        const handleMouseOver = (value: boolean, e: MouseEvent) => {
            setIsMouseOver(value);
            value && props.onMouseOver && props.onMouseOver(e);
            !value && props.onMouseOut && props.onMouseOut(e);
        };

        return (
            <Button
                {...props}
                onClick={handleClick}
                onMouseOver={(e: MouseEvent) => handleMouseOver(true, e)}
                onMouseOut={(e: MouseEvent) => handleMouseOver(false, e)}
                ref={ref}
                className={className}
                disabled={props.disabled}
            >
                {props.children}
            </Button>
        );
    }
);

export default Button;
