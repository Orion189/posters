import * as yup from 'yup';
import type { NextApiRequest } from 'next';
import { MovieType, PosterType, Forms } from 'src/enums';
import { validationConfig } from 'src/configs/validation.config';

export type Genre = {
    id: number;
    name: string;
};

export type Country = {
    country_code: string;
    country: string;
};

export type Poster = {
    id: number;
    group_id: number;
    country_code: string;
    file_location: string;
    width: number;
    height: number;
    size: number;
    type_id: PosterType;
};

export type Movie = {
    id: number;
    imdb: number;
    type: MovieType;
    year: number;
    original_title: string;
    url_title: string;
    num_posters: number;
    num_groups: number;
    language: string;
    country: string;
    release_date: string;
    director: string;
    genre: string;
    runtime: number;
    summary: string;
    poster?: Poster;
};

export type GraphQLServerContext = {
    req: NextApiRequest;
};

export type Settings = yup.InferType<(typeof validationConfig)[Forms.SETTINGS]>;

export type MovieInfo = Pick<
    Movie,
    'year' | 'original_title' | 'country' | 'director' | 'genre' | 'runtime' | 'summary'
>;
