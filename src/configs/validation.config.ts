import * as yup from 'yup';
import i18n from 'i18next';
import { Forms, MovieType } from 'src/enums';

export const yearsList = [
    '1900',
    '1910',
    '1920',
    '1930',
    '1940',
    '1950',
    '1960',
    '1970',
    '1980',
    '1990',
    '2000',
    '2010',
    '2020',
    '2030'
];

export const validationConfig = {
    [Forms.SETTINGS]: yup.object({
        movieType: yup
            .string()
            .oneOf([MovieType.BOTH, MovieType.MOVIE, MovieType.SERIES], () =>
                i18n.t('common.errors.movieType.invalid')
            ),
        genreType: yup.string().ensure().trim().optional(),
        yearFrom: yup.string().oneOf(yearsList, () => i18n.t('common.errors.yearFrom.invalid')),
        yearTo: yup.string().oneOf(yearsList, () => i18n.t('common.errors.yearTo.invalid')),
        country: yup.string().ensure().trim().optional()
    })
};
