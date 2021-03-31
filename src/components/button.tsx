import * as React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button {...props} />
    );
}

export default Button;