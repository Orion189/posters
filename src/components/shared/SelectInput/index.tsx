import React, { ReactNode } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { ErrorMessage, FastFieldProps } from 'formik';

import commonStyles from '@styles/common.module.scss';

type SelectData = {
    key: number;
    value: string;
};

type SelectProps = {
    children?: ReactNode;
    data: [SelectData];
    label: string;
};

const SelectInput = ({
    field, // consist of { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    data,
    children,
    ...props
}: FastFieldProps & SelectProps) => (
    <>
        <InputLabel id={field.name}>{label}</InputLabel>
        <Select
            {...field}
            {...props}
            defaultValue=""
            value={field.value || ''}
            labelId={field.name}
            error={Boolean(touched[field.name]) && Boolean(errors[field.name])}
            className={field.value ? '' : commonStyles.menuItemDefaultValue}
            MenuProps={{
                anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                transformOrigin: { vertical: 'top', horizontal: 'center' }
            }}
        >
            {children
                ? children
                : data.map(({ key, value }: SelectData) => (
                      <MenuItem key={key} value={key.toString()}>
                          {value}
                      </MenuItem>
                  ))}
        </Select>
        <ErrorMessage name={field.name} component={FormHelperText} className={commonStyles.fieldError} />
    </>
);

export default SelectInput;
