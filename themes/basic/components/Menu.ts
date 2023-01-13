import colors from '@themes/basic/colors.module.scss';

const MuiMenu = {
    styleOverrides: {
        paper: {
            border: `0.5px solid ${colors.menuBorder}`,
            boxShadow: `0px 2px 5px ${colors.menuBoxShadow}`,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            '&::-webkit-scrollbar': {
                width: '0.7rem'
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: colors.primaryColorLight12
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.primaryColorMain100
            }
        },
        list: {
            padding: 0,
            maxHeight: '13.7rem'
        }
    }
};

export default MuiMenu;