import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import css from './style.css';

type PostProps = {
    date: string;
    title: string;
    description: string;
};

const Post: FunctionComponent<PostProps> = ({date, title, description}) => (
    <Card className={css.post} variant="outlined">
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                {date}
            </Typography>
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <Typography variant="body2" component="p">
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card>
);

const NewPost: FunctionComponent = observer(() => {
    const {t} = useTranslation();
    const posts = [
        {
            date: '2021-09-01',
            title: 'Все хорошо',
            description: 'Все очень хорошо',
        },
        {
            date: '2021-09-01',
            title: 'Все нормально',
            description: 'Все вполне себе ничего',
        },
        {
            date: '2021-09-01',
            title: 'Все хорошо',
            description: 'Все очень хорошо',
        },
        {
            date: '2021-09-01',
            title: 'Все нормально',
            description: 'Все вполне себе ничего',
        },
    ];

    return (
        <div className={css.posts}>
            <Typography variant="h4" gutterBottom>
                Posts list
            </Typography>
            <div className={css.posts__container}>
                {posts.map((post, i) => (
                    <Post key={i} {...post} />
                ))}
            </div>
        </div>
    );
});

export default NewPost;
