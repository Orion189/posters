import React, { ReactNode } from 'react';
import { Translation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import styles from './style.module.scss';

interface ErrorInfo {
    componentStack: string;
}

type ErrorBoundaryProps = {
    children?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Translation>
                    {(t) => (
                        <Typography variant="h5" gutterBottom className={styles.message}>
                            {t('components.shared.ErrorBoundary.title')}
                        </Typography>
                    )}
                </Translation>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
