import colors from '@themes/basic/colors.module.scss';

const MuiInput = {
    styleOverrides: {
        root: {
            color: colors.white87,
            '&$underline': {
                '&:before': {
                    borderBottom: `1px solid ${colors.white50}`
                },
                '&:hover:not(.Mui-disabled):before': {
                    borderBottom: `1px solid ${colors.white87}`
                },
                '&:after': {
                    borderBottom: `1px solid ${colors.white87}`
                }
            }
        },
        input: {
            fontSize: '1.15rem',
            '&::placeholder': {
                color: colors.white87
            },
            '&$disabled': {
                color: colors.white50,
                backgroundColor: 'transparent'
            }
        }
    }
};

export default MuiInput;