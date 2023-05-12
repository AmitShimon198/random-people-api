import { ChangeEvent, FunctionComponent, ReactNode, useState } from "react";
import { SxProps, TextField, Theme, Typography } from "../mui";

interface EditableTextFieldProps {
    textFieldSx?: SxProps<Theme> | undefined
    value: string;
    children: ReactNode;
    styles?: { typography?: string; textField?: string };
    textFieldStyle?: React.CSSProperties | undefined;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

const EditableTextField: FunctionComponent<EditableTextFieldProps> = ({ onBlur, textFieldStyle, textFieldSx, children, value, styles, onChange }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [textFieldValue, setTextFieldValue] = useState<string>('');
    
    const onTypographyClick = () => {
        setIsFocused(true);
        setTextFieldValue(value);
    };

    const onBlurHandler = () => {
        if (typeof onBlur === 'function') { onBlur(textFieldValue) }
        setIsFocused(false)
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
        setTextFieldValue(event.target.value);
    };
    
    return (<>
        {!isFocused ? (
            <Typography
                className={styles?.typography}
                onClick={onTypographyClick}
            >
                {children}
            </Typography>
        ) : (
            <TextField
                variant="standard"
                autoFocus
                style={textFieldStyle}
                sx={textFieldSx}
                value={textFieldValue}
                inputProps={{ className: styles?.textField }}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
        )}
    </>
    );
}

export default EditableTextField;