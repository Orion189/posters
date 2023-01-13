import colors from '@themes/basic/colors.module.scss';

const MuiButton = {
    styleOverrides: {
        root: {
            transition: 'none',
            '&$disabled$outlinedPrimary': {
                color: colors.black40
            },
            '&$textPrimary': {
                fontWeight: 'bold',
                color: colors.secondaryColorContrastText
            },
            '&$outlinedPrimary': {
                fontWeight: 'bold',
                color: colors.primaryColorMain100,
                border: `1px solid ${colors.primaryColorMain100}`,
                backgroundColor: 'transparent',
                '&:hover': {
                    color: colors.white100,
                    backgroundColor: colors.primaryColorMain100
                }
            },
            '&$outlinedSecondary': {
                fontWeight: 'normal',
                color: colors.secondaryColorMain100,
                border: `1px solid ${colors.secondaryColorMain100}`,
                backgroundColor: 'transparent',
                '&:hover': {
                    color: colors.secondaryColorContrastText,
                    border: `1px solid ${colors.secondaryColorMain100}`,
                    backgroundColor: colors.secondaryColorMain100
                }
            },
            '&$containedSecondary': {
                boxShadow: 'none',
                border: '1px solid transparent'
            },
            '&$containedPrimary': {
                boxShadow: 'none',
                border: '1px solid transparent'
            },
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '20px'
        },
        label: {
            fontSize: '1.15rem',
            fontFamily: 'Montserrat',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    }
};

export default MuiButton;