import * as React from 'react';
import styled from 'styled-components';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
}


export const Input: React.FC<IInputProps> = ({ labelText, ...rest }) => {
    return (
        <div>
            <label htmlFor={rest.id}>{labelText}</label>
            <input {...rest} />
        </div>
    );
}

export default Input;