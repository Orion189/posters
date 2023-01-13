import colors from '@themes/basic/colors.module.scss';

const MuiInputLabel = {
    styleOverrides: {
        root: {
            fontSize: '1.15rem',
            color: colors.white87,
            '&$disabled': {
                color: colors.white87
            }
        }
    }
};

export default MuiInputLabel;