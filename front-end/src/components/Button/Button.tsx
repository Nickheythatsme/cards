import React, {useState, MouseEvent} from 'react';
import classNames from 'classnames';
import './Button.scss';

interface PropTypes {
    children?: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'info' | 'warning',
    outline?: boolean,
    disabled?: boolean,
    className?: string,
    onClick?: (event: MouseEvent) => any,
}

const Button = React.forwardRef<any, PropTypes>((props: PropTypes, ref: React.Ref<any>) => {
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
})

export const Reactive = React.forwardRef<any, PropTypes>((props: PropTypes, ref: React.Ref<any>) => {
    const [isLarger, setIsLarger] = useState(false);
    let largerTimeout: any = null;

    let className = classNames(
        'btn',
        {disabled: props.disabled, 'btn-larger': isLarger},
        `btn-${props.variant || 'primary'}${props.outline ? '-outline' : ''}`,
        props.className,
    );

    const handleClick = () => {
        clearTimeout(largerTimeout);
        setIsLarger(true);
        setTimeout(() => {setIsLarger(false)}, 200);
    }

    return (
        <button onClick={handleClick} ref={ref} {...props} className={className}>
            {props.children}
        </button>
    );
});

export default Button;
