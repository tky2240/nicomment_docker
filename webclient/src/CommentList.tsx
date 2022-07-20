import React, { useState, useRef, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { JsxEmit } from 'typescript';
import { RgbaColorPicker, RgbaColor } from "react-colorful";

class Comment {
    UserID: string;
    UserName: string;
    Message: string;
    IsFixedComment: boolean;
    R: number;
    G: number;
    B: number;
    A: number;
    constructor(userID: string, userName: string, message: string, isFixedComment: boolean, color: RgbaColor) {
        this.UserID = userID;
        this.UserName = userName;
        this.Message = message;
        this.IsFixedComment = isFixedComment;
        this.R = color.r;
        this.G = color.g;
        this.B = color.b;
        this.A = color.a;
    }
}

type Props = {
    CommentSettings: Comment[]
    WebSocket: WebSocket
    UserID: string
    UserName: string
}

const CommentList = (props: Props) => {
    const CommentListItem = (comment: Comment) => {
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar children={comment.UserName.substring(0, 1)} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={comment.UserName}
                        secondary={comment.Message}
                    />
                </ListItem>
                <Divider />
            </div>
        )
    }
    const socket = props.WebSocket
    const [commentList, setComment] = useState<JSX.Element[]>([]);
    socket.onmessage = function (event) {
        const recieve: Comment = JSON.parse(event.data)
        setComment([...commentList, CommentListItem(new Comment(recieve.UserID, recieve.UserName, recieve.Message, recieve.IsFixedComment, { r: recieve.R, g: recieve.G, b: recieve.B, a: recieve.A }))]);
    }

    const scrollRef = useRef<null | HTMLDivElement>(null)
    const listRef = useRef<null | HTMLUListElement>(null)
    useEffect(() => {
        scrollRef.current?.scroll({ top: listRef.current?.clientHeight, behavior: "smooth" })
    }, [commentList]);
    return (
        <Paper style={{ maxHeight: '100%', height: '100%', overflow: 'auto' }} ref={scrollRef} >
            <List sx={{ bgcolor: 'background.paper' }} ref={listRef}
                children={commentList} />
        </Paper>
    );
}


export { CommentList, Comment };