'use client'
import { ButtonProps } from '@/interface/components';
import React from 'react';

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;