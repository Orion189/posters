import { FC } from 'react';
import { Formik, Form, FastField } from 'formik';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import SelectInput from '@components/shared/SelectInput';
import { Settings, Genre, Country } from 'src/types';
import { Forms, MovieType } from 'src/enums';
import { validationConfig, yearsList } from 'src/configs/validation.config';
import styles from './style.module.scss';
import commonStyles from '@styles/common.module.scss';

type SettingsProps = {
    genresData?: [Genre];
    countriesData?: [Country];
    onSaveForm: (values: Settings) => void;
    onResetForm: () => void;
};

const Settings: FC<SettingsProps> = ({ onSaveForm, genresData, countriesData, onResetForm }) => {
    const { t } = useTranslation();
    const movieTypeData = [
        { key: MovieType.BOTH, value: t(`common.label.MovieType.${MovieType.BOTH}`) },
        { key: MovieType.MOVIE, value: t(`common.label.MovieType.${MovieType.MOVIE}`) },
        { key: MovieType.SERIES, value: t(`common.label.MovieType.${MovieType.SERIES}`) }
    ];
    const countryTypeData =
        countriesData &&
        countriesData.map((country: Country) => ({
            key: country.country_code,
            value: country.country
        }));
    const genreTypeData =
        genresData &&
        genresData.map((genre: Genre) => ({
            key: genre.id.toString(),
            value: genre.name
        }));
    const yearData = yearsList.map((year: string) => ({
        key: year,
        value: year
    }));
    const initialValues = {
        movieType: MovieType.BOTH,
        genreType: '',
        yearFrom: '',
        yearTo: '',
        country: ''
    };

    return (
        <Formik
            onSubmit={onSaveForm}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationConfig[Forms.SETTINGS]}
        >
            {({ resetForm }) => (
                <Form noValidate autoComplete="off" className={styles.form}>
                    <Typography variant="h5" gutterBottom className={styles.panelTitle}>
                        {t('components.main.Settings.title')}
                    </Typography>
                    <FormControl variant="standard">
                        <FastField
                            component={SelectInput}
                            name="movieType"
                            label={t('components.main.Settings.placeholder.movieType')}
                            data={movieTypeData}
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <FastField
                            component={SelectInput}
                            name="genreType"
                            label={t('components.main.Settings.placeholder.genreType')}
                            data={genreTypeData}
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <FastField
                            component={SelectInput}
                            name="yearFrom"
                            label={t('components.main.Settings.placeholder.yearFrom')}
                            data={yearData}
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <FastField
                            component={SelectInput}
                            name="yearTo"
                            label={t('components.main.Settings.placeholder.yearTo')}
                            data={yearData}
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <FastField
                            component={SelectInput}
                            name="country"
                            label={t('components.main.Settings.placeholder.country')}
                            data={countryTypeData}
                        />
                    </FormControl>
                    <FormGroup className={commonStyles.actionsCont}>
                        <FormControl variant="standard">
                            <Button type="submit" color="primary" variant="contained">
                                {t('components.main.Settings.label.save')}
                            </Button>
                        </FormControl>
                        <FormControl variant="standard">
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    resetForm();
                                    onResetForm();
                                }}
                            >
                                {t('components.main.Settings.label.reset')}
                            </Button>
                        </FormControl>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    );
};

export default Settings;
