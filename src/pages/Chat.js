import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { Context } from "../index";


const MESSAGE_TYPES = {
    MESSAGE: 'message',
    CONNECTION: 'connection',
    DISCONNECTION: 'disconnection'
}


function Chat() {
    const { store } = useContext(Context)
    const [ws, setWs] = useState()
    const [textValue, setTextValue] = useState('')
    const [history, setHistory] = useState([])

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/chat?token=${store.readAccessToken()}`)
        setWs(ws)

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setHistory((history) => [
                ...history,
                message
            ])
        }

        setWs(ws)
        return () => ws.close()
    }, [])

    const sendMessage = () => {
        ws.send(textValue)
        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setHistory((history) => [
                ...history,
                message
            ])
        }
        setTextValue('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    const MessageComponent = React.memo(({ item }) => {
        try {
            item = JSON.parse(item)
        }
        catch (e) {
            item = item
        }
        if (item.type === MESSAGE_TYPES.MESSAGE) {
            if (item.email === store.user.email) return (
                <Grid item xs={12}>
                    <ListItemText align='right' primary={item.text} secondary={item.datetime} />
                </Grid>
            )
            return (
                <Grid item xs={12}>
                    <ListItemText align='left' primary={item.text} secondary={`${item.email} ${item.datetime}`} />
                </Grid>
            )
        }
        if (item.type === MESSAGE_TYPES.CONNECTION) return (
            <Grid item xs={12}>
                <ListItemText align='center' secondary={`${item.email} подключился к чату`} />
            </Grid>
        )
        if (item.type === MESSAGE_TYPES.DISCONNECTION) return (
            <Grid item xs={12}>
                <ListItemText align='center' secondary={`${item.email} отключился от чата`} />
            </Grid>
        )
    })

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Grid item xs={9} width='40vw' sx={{maxHeight: '70%'}}>
                <List sx={{ overflowY: 'auto', maxHeight: '100%' }}>
                    {history.map((item, index) => (
                        <ListItem key={index}>
                            <Grid container>
                                <MessageComponent item={item} />
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <TextField 
                    id="outlined-basic-email" 
                    label="Введите сообщение" 
                    fullWidth
                    onChange={(e) => { setTextValue(e.target.value) }}
                    onKeyDown={handleKeyDown}
                />
            </Grid>
        </Box>
    )    
}

export default observer(Chat)