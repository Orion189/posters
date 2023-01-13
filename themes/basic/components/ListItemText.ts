import colors from '@themes/basic/colors.module.scss';

const MuiListItemText = {
    styleOverrides: {
        root: {
            '& $primary': {
                fontWeight: 'normal'
            },
            '&$inset': {
                paddingLeft: '3rem',
                '& $primary': {
                    color: colors.listItemText
                }
            }
        }
    }
};

export default MuiListItemText;