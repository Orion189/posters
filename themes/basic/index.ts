import { createTheme } from '@mui/material/styles';
import MuiMenu from '@themes/basic/components/Menu';
import MuiInput from '@themes/basic/components/Input';
import MuiRadio from '@themes/basic/components/Radio';
import MuiSelect from '@themes/basic/components/Select';
import MuiButton from '@themes/basic/components/Button';
import MuiDrawer from '@themes/basic/components/Drawer';
import MuiMenuItem from '@themes/basic/components/MenuItem';
import MuiCheckbox from '@themes/basic/components/Checkbox';
import MuiListItem from '@themes/basic/components/ListItem';
import MuiInputBase from '@themes/basic/components/InputBase';
import MuiFormGroup from '@themes/basic/components/FormGroup';
import MuiTextField from '@themes/basic/components/TextField';
import MuiInputLabel from '@themes/basic/components/InputLabel';
import MuiFormControl from '@themes/basic/components/FormControl';
import MuiListItemIcon from '@themes/basic/components/ListItemIcon';
import MuiListItemText from '@themes/basic/components/ListItemText';
import MuiFormHelperText from '@themes/basic/components/FormHelperText';
import MuiFormControlLabel from '@themes/basic/components/FormControlLabel';
import colors from '@themes/basic/colors.module.scss';

export const theme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
    palette: {
        primary: {
            light: colors.primaryColorLight100,
            main: colors.primaryColorMain100,
            dark: colors.primaryColorDark100,
            contrastText: colors.primaryColorContrastText
        },
        secondary: {
            light: colors.secondaryColorLight100,
            main: colors.secondaryColorMain100,
            dark: colors.secondaryColorDark100,
            contrastText: colors.secondaryColorContrastText
        }
    },
    components: {
        MuiMenu,
        MuiInput,
        MuiRadio,
        MuiDrawer,
        MuiSelect,
        MuiButton,
        MuiCheckbox,
        MuiListItem,
        MuiMenuItem,
        MuiInputBase,
        MuiFormGroup,
        MuiTextField,
        MuiInputLabel,
        MuiFormControl,
        MuiListItemIcon,
        MuiListItemText,
        MuiFormHelperText,
        MuiFormControlLabel
    }
});