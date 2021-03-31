import * as React from 'react';
import styled from 'styled-components';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText: string;
}

export const TextArea: React.FC<ITextAreaProps> = ({ labelText, ...rest }) => {
    return (
        <>
            <label htmlFor={rest.id}>{labelText}</label>
            <textarea {...rest} />
        </>
    );
}

export default TextArea;