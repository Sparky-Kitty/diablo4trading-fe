import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

const toString = (value: string) => (value === undefined ? '' : value.toString());

interface ServiceTitleProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    helperText?: string;
    disabled?: boolean;
}

export const ServiceTitleInput: React.FC<ServiceTitleProps> = ({
    value,
    onChange,
    label,
    helperText,
    disabled,
}) => {
    const [textValue, setTextValue] = React.useState<string>(toString(value));
    useEffect(() => {
        setTextValue(toString(value));
    }, [value]);

    const setValue = (next: string) => {
        if (next === value) {
            setTextValue(toString(value));
            return;
        }
        onChange(next);
    };

    return (
        <TextField
            value={textValue}
            label={label}
            helperText={helperText}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => {
                const numericValue = parseInt(textValue);
                if (isNaN(numericValue)) {
                    setValue(undefined);
                    return;
                }
                setValue(numericValue.toString());
            }}
            disabled={disabled}
        />
    );
};
