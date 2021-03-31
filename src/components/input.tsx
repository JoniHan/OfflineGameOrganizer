import * as React from 'react';
import styled from 'styled-components';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
}

export const Input: React.FC<IInputProps> = ({ labelText, ...rest }) => {
    return (
        <>
            <label htmlFor={rest.id}>{labelText}</label>
            <input {...rest} />
        </>
    );
}

export default Input;