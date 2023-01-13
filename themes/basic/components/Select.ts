import colors from '@themes/basic/colors.module.scss';

const MuiSelect = {
    styleOverrides: {
        select: {
            '&:focus': {
                backgroundColor: 'transparent'
            }
        },
        icon: {
            color: colors.white100
        },
        selectMenu: {
            height: '1.1875rem'
        },
        list: {
            padding: 0,
            maxHeight: '13.7rem'
        }
    }
};

export default MuiSelect;