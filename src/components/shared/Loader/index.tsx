import { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useLoader } from '@components/hooks/useLoader';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: FC = () => {
    const { isLoaderVisible } = useLoader();

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoaderVisible}>
            <CircularProgress />
        </Backdrop>
    );
};

export default Loader;
