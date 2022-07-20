import React, { useState, useRef, useEffect, ChangeEvent, ChangeEventHandler } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { CommentList, Comment } from './CommentList';
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

type Props = {
    WebSocket: WebSocket
    UserID: string
    UserName: string
    IsOpen: boolean
}

const SendCommentForm = (props: Props) => {
    const socket = props.WebSocket;
    const [message, setMessage] = useState("");
    const sendMessage = () => {
        if (message != "") {
            socket.send(JSON.stringify(new Comment(props.UserID, props.UserName, message, isFixedComment, color)));
        }
        setMessage("");
    };
    const [color, setColor] = useState<RgbaColor>({ r: 255, g: 255, b: 255, a: 1.0 });
    const [isFixedComment, setIsFixedComment] = useState(false);
    if (props.IsOpen) {
        return (
            <Stack style={{ width: '100%', height: '100%' }} direction="row" justifyContent="center" spacing={5}>
                <Stack style={{ width: '30%', height: '100%' }}>
                    <RgbaColorPicker style={{ width: '100%', height: '100%' }} color={color} onChange={(c: RgbaColor) => setColor(c)} />
                    <Typography >{`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}</Typography>
                </Stack>

                <Stack style={{ width: '70%' }} justifyContent="center">
                    <Stack direction="row" justifyContent='center' spacing={5}>

                        <TextField style={{ width: '70%' }} id="outlined-search" label="コメント" type='search' value={message} onChange={(e: ChangeEvent) => setMessage((e.target as HTMLInputElement).value)} />
                        <Button style={{ width: '10%' }} variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
                            送信
                        </Button>
                    </Stack>
                    <FormControlLabel style={{ width: '60%' }} control={<Checkbox checked={isFixedComment} onChange={(e: ChangeEvent) => setIsFixedComment((e.target as HTMLInputElement).checked)} />} label="コメントを固定" />
                </Stack>
            </Stack>
        );
    } else {
        return (<div>接続終了</div>)
    }

}

export default SendCommentForm;