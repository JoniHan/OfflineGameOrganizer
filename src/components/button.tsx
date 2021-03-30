import * as React from 'react';
import styled from 'styled-components';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button {...props} />
    );
}