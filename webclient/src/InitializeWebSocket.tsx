import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { CommentList, Comment } from './CommentList';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { width } from '@mui/system';
import Container from '@mui/material/Container';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import SendCommentForm from './SendCommentForm'
import Config from './Config'
type Props = {
    Keycloak: Keycloak
}

const InitializeWebSocket = (props: Props) => {
    const commentSettings: Comment[] = [];

    const loadUserProfilePromise = props.Keycloak.loadUserProfile();
    const [userName, setUserName] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [webSocket, setUseWebSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const socket = new WebSocket(`ws://${Config.WEBSOCKET_HOST}:${Config.WEBSOCKET_PORT}${Config.WEBSOCKET_PATH}?ID=${props.Keycloak.idTokenParsed?.sub}`);
        setUseWebSocket(socket)
        return () => {
            socket.close();
        }
    }, []);
    if (webSocket == null) {
        return (<div> 初期化中</div>);
    }
    webSocket.onopen = () => {
        loadUserProfilePromise.then(profile => {
            webSocket?.send(JSON.stringify(new Comment(props.Keycloak.idTokenParsed?.sub ?? "", profile.username ?? "", "connect server", false, { r: 255, g: 255, b: 255, a: 1.0 })));
            setUserName(profile.username ?? "");
        }).catch(() => {
            return (<div> 認証エラー </div>)
        });
    }
    webSocket.onclose = () => {
        setIsOpen(false);
    }
    return (
        <Container style={{ width: '100vh', height: '100vh', minWidth: 200, minHeight: 200 }}>
            <Container style={{ padding: 20, width: '80%', height: '75%', alignItems: 'center', justifyContent: 'center' }}>
                <CommentList CommentSettings={commentSettings} WebSocket={webSocket} UserID={props.Keycloak.idTokenParsed?.sub ?? ""} UserName={userName} />
            </Container>
            <Container style={{ padding: 20, width: '80%', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
                <SendCommentForm WebSocket={webSocket} UserID={props.Keycloak.idTokenParsed?.sub ?? ""} UserName={userName} IsOpen={isOpen} />
            </Container>
        </Container>
    );
}

export default InitializeWebSocket;