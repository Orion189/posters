import { FC, memo } from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useMovieInfo } from '@components/hooks/useMovieInfo';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styles from './style.module.scss';

const Info: FC = () => {
    const { t } = useTranslation();
    const { movieInfo } = useMovieInfo();

    return movieInfo ? (
        <Box className={styles.cont}>
            <Typography variant="h5" gutterBottom className={styles.panelTitle}>
                {t('components.main.Info.title')}
            </Typography>
            <List className={styles.list}>
                <ListItem>
                    <ListItemText
                        primary={t('components.main.Info.label.originalTitle')}
                        primaryTypographyProps={{
                            className: styles.listItemKey
                        }}
                        secondary={movieInfo.original_title}
                        secondaryTypographyProps={{
                            variant: 'h6',
                            className: styles.listItemValue
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.main.Info.label.year')}
                        primaryTypographyProps={{
                            className: styles.listItemKey
                        }}
                        secondary={movieInfo.year}
                        secondaryTypographyProps={{
                            variant: 'h6',
                            className: styles.listItemValue
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.main.Info.label.country')}
                        primaryTypographyProps={{
                            className: styles.listItemKey
                        }}
                        secondary={movieInfo.country}
                        secondaryTypographyProps={{
                            variant: 'h6',
                            className: styles.listItemValue
                        }}
                    />
                </ListItem>
                {movieInfo.director ? (
                    <ListItem>
                        <ListItemText
                            primary={t('components.main.Info.label.director')}
                            primaryTypographyProps={{
                                className: styles.listItemKey
                            }}
                            secondary={movieInfo.director}
                            secondaryTypographyProps={{
                                variant: 'h6',
                                className: styles.listItemValue
                            }}
                        />
                    </ListItem>
                ) : null}
                <ListItem>
                    <ListItemText
                        primary={t('components.main.Info.label.genre')}
                        primaryTypographyProps={{
                            className: styles.listItemKey
                        }}
                        secondary={movieInfo.genre}
                        secondaryTypographyProps={{
                            variant: 'h6',
                            className: styles.listItemValue
                        }}
                    />
                </ListItem>
                {movieInfo.runtime > 0 ? (
                    <ListItem>
                        <ListItemText
                            primary={t('components.main.Info.label.runtime')}
                            primaryTypographyProps={{
                                className: styles.listItemKey
                            }}
                            secondary={movieInfo.runtime}
                            secondaryTypographyProps={{
                                variant: 'h6',
                                className: styles.listItemValue
                            }}
                        />
                    </ListItem>
                ) : null}
                {movieInfo.summary ? (
                    <ListItem>
                        <ListItemText
                            primary={t('components.main.Info.label.summary')}
                            primaryTypographyProps={{
                                className: styles.listItemKey
                            }}
                            secondary={movieInfo.summary}
                            secondaryTypographyProps={{
                                variant: 'h6',
                                className: styles.listItemValue
                            }}
                        />
                    </ListItem>
                ) : null}
            </List>
        </Box>
    ) : null;
};

export default memo(Info);
