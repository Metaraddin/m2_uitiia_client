import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useState, useEffect, useCallback, useRef } from "react";
import { Context } from "../index";


const MESSAGE_TYPES = {
    MESSAGE: 'message',
    CONNECTION: 'connection',
    DISCONNECTION: 'disconnection'
}


function Chat() {
    const { store } = useContext(Context)
    const [chatHistory, setChatHistory] = useState([
        {type: "connection", email: "metaraddin@gmail.com", datatime: "2023-05-09 22:58:38.425591"}
    ])
    const [messageText, setMessageText] = useState('')
    // const [chatHistory, setChatHistory] = useState([
    //     { type: MESSAGE_TYPES.CONNECTION, email'klim_zhukov@example.com' },
    //     { type: MESSAGE_TYPES.CONNECTION, user: store.user },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Спасибо, Клим Саныч', datetime: '11:00' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Старались', user: { email: 'klim_zhukov@example.com' }, datetime: '11:00' },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Честно говоря, потраченного времени жаль', datetime: '11:01' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Да', user: { email: 'klim_zhukov@example.com' }, datetime: '11:01' },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Пятикратно переваренный кал', datetime: '11:01' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Да', user: { email: 'klim_zhukov@example.com' }, datetime: '11:01' },
    //     { type: MESSAGE_TYPES.DISCONNECTION, user: { email: 'klim_zhukov@example.com' } },
    //     { type: MESSAGE_TYPES.DISCONNECTION, user: store.user },
    //     { type: MESSAGE_TYPES.CONNECTION, user: { email: 'klim_zhukov@example.com' } },
    //     { type: MESSAGE_TYPES.CONNECTION, user: store.user },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Спасибо, Клим Саныч', datetime: '11:00' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Старались', user: { email: 'klim_zhukov@example.com' }, datetime: '11:00' },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Честно говоря, потраченного времени жаль', datetime: '11:01' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Да', user: { email: 'klim_zhukov@example.com' }, datetime: '11:01' },
    //     { type: MESSAGE_TYPES.OUTGOING, text: 'Пятикратно переваренный кал', datetime: '11:01' },
    //     { type: MESSAGE_TYPES.INCOMING, text: 'Да', user: { email: 'klim_zhukov@example.com' }, datetime: '11:01' },
    //     { type: MESSAGE_TYPES.DISCONNECTION, user: { email: 'klim_zhukov@example.com' } },
    //     { type: MESSAGE_TYPES.DISCONNECTION, user: store.user }
    // ])

    const ws = useRef(null)

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/chat?token=${store.readAccessToken()}`)
        ws.current.onopen = () => {
            // message = { type: MESSAGE_TYPES.CONNECTION, user: store.user}
            // setChatHistory((history) => [
            //     ...history,
            //     message
            // ])
            // ws.current.send(message)
            console.log('OPEN')
        }
        ws.current.onclose = () => {
            console.log('CLOSE')
        }
        gettiongData()
        return () => ws.current.close()
    }, [ws])

    const gettiongData = useCallback(() => {
        if (!ws.current) return
        ws.current.onmessage = e => {
            console.log(e)
            const message = JSON.parse(e.data)

            setChatHistory((history) => [
                ...history,
                message
            ])
            console.log('MESSAGE')
        }
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            ws.current.send(messageText)
        }
    }

    const MessageComponent = React.memo(({ item }) => {
        try {
            item = JSON.parse(item)
        }
        catch (e) {
            console.log(item)
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
        // if (item.type === MESSAGE_TYPES.CONNECTION) return (
        //     <Grid item xs={12}>
        //         <ListItemText align='center' secondary={`${item.email} подключился к чату`} />
        //     </Grid>
        // )
        // if (item.type === MESSAGE_TYPES.DISCONNECTION) return (
        //     <Grid item xs={12}>
        //         <ListItemText align='center' secondary={`${item.email} отключился от чата`} />
        //     </Grid>
        // )
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
                    {chatHistory.map((item, index) => (
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
                    onChange={(e) => { setMessageText(e.target.value) }}
                    onKeyDown={handleKeyDown}
                />
            </Grid>
        </Box>
    )
}

export default observer(Chat)