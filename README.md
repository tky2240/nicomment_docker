# nicomment_docker

## つかいかた
```sudo doker compose up```を叩くとlocalhostで立ち上がります

## ホストの変え方
下記のファイル中のlocalhost部分をホスト名に変えてください
- ./webserver/setting.yml
- ./webclient/src/Config.tsx
- ./webclient/public/keycloak.json (4箇所)
- ./keycloak/realm-export.json

## コメント表示クライアントの使い方
nicomment.exeを起動させてください

ホストを変えている場合は設定からホスト名を変更してください

## keycloack新規登録用メールの送り方
デフォルトではlocalhost:8080にアクセスするとkeycloakのWelcomeページが開きます

Administration Consoleからユーザー名:admin,パスワード:adminでログインします

右上のManageAccount→PersonalInfoから送信用のメールアドレスを設定します

AdminConsoleに戻り、左上のRealms→NiCmment→Emailからメール送信サーバーの設定をします

TestConnectionで成功すれば終了です
