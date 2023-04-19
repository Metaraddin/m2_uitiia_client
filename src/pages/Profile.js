import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
// import image from '../static/images/profile.jpg';

function Profile() {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    if (!store.isAuth) {
        return (
            navigate('/signin')
        )
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        // image={`url(${image})`}
                        image={require('../static/images/profile.jpg')}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {store.user.first_name} {store.user.last_name} <br/>
                            {store.user.middle_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {store.user.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => store.logout()}
                        >
                            Выйти
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}

export default observer(Profile)