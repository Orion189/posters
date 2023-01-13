import colors from '@themes/basic/colors.module.scss';

const MuiListItem = {
    styleOverrides: {
        root: {
            color: '#686868',
            '&$button:hover, &$selected': {
                color: '#686868',
                backgroundColor: 'rgba(145, 161, 198, .09)',
                '& .MuiListItemIcon-root, & .MuiListItemText-inset .MuiListItemText-primary': {
                    color: colors.primaryColorMain100
                }
            }
        }
    }
};

export default MuiListItem;