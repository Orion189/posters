import colors from '@themes/basic/colors.module.scss';

const MuiInputBase = {
    styleOverrides: {
        input: {
            fontSize: '1.15rem',
            '&::placeholder': {
                color: colors.white87
            },
            '&$disabled': {
                color: colors.white87,
                backgroundColor: 'transparent'
            }
        }
    }
};

export default MuiInputBase;