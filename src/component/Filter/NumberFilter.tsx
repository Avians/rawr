import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

interface NumberFilterProps {
    label: string;
    onValueChanged: (oldValue: string, newValue: string) => void;
}

export const NumberFilter: React.FC<NumberFilterProps> = props => {
    const [value, setValue] = useState("");

    const { label, onValueChanged } = props;

    return (
        <TextField
            label={label}
            value={value}
            onChange={e => {
                onValueChanged(value, e.target.value);
                setValue(e.target.value);
            }}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            margin="normal"
            variant="outlined"
        />
    );
};
