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
import { KeyObject } from 'crypto';
import InitializeWebSocket from './InitializeWebSocket';

type Props = {
  WebSocket: WebSocket
}

type KeycloakState = {
  Keycloak: Keycloak | null
  IsAuthenticated: boolean
}

function App() {
  const commentSettings: Comment[] = [
    /*new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),
    new CommentSetting("hoge", "joge", "fuga"),*/
  ]
  const { keycloak, initialized } = useKeycloak();
  if (!initialized) {
    return (<div> 初期化中</div>)
  }
  if (!keycloak.authenticated) {
    return (<div> 認証エラー </div>)
  }
  return <InitializeWebSocket Keycloak={keycloak} />
}
export default App;
