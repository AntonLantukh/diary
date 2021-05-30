import React, {FunctionComponent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import Button from '˜/components/Button';
import Error from '˜/components/Error';

import type {CreatePostForm} from '../../../typings';
import {getDefaultDate} from '../../../utils/date';

import css from './style.css';

const CreatePost: FunctionComponent = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, errors} = useForm<CreatePostForm>({});

    const onSubmit = useCallback(async (form: CreatePostForm) => {
        console.log(form, 'form');
        await Promise.resolve(form);
    }, []);

    return (
        <div className={css.createPost}>
            <Typography variant="h4" gutterBottom>
                Create new post
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={css.createPost__form}>
                <FormControl fullWidth>
                    <TextField
                        name="date"
                        type="date"
                        defaultValue={getDefaultDate()}
                        label={t('main:authorize.field.email')}
                        // @ts-expect-error
                        inputRef={register({required: t('main:authorize.error.email')})}
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.date)}
                    />
                    <Error name="date" errors={errors} />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="title"
                        label={t('main:authorize.field.email')}
                        // @ts-expect-error
                        inputRef={register({required: t('main:authorize.error.email')})}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.title)}
                    />
                    <Error name="title" errors={errors} />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="description"
                        label={t('main:authorize.field.email')}
                        // @ts-expect-error
                        inputRef={register({required: t('main:authorize.error.email')})}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={10}
                        error={Boolean(errors.description)}
                    />
                    <Error name="description" errors={errors} />
                </FormControl>

                <div className={css.createPost__button}>
                    <Button type="submit" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
