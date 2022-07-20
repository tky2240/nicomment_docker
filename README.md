# nicomment_docker

## つかいかた
```sudo doker compose up```を叩くとlocalhostで起動

## ホストの変え方
下記のファイル中のlocalhost部分をホスト名に変更
- ./webserver/setting.yml
- ./webclient/src/Config.tsx
- ./webclient/public/keycloak.json (4箇所)
- ./keycloak/realm-export.json

## コメント表示クライアントの使い方
nicomment.exeを起動させてください

起動しない場合は[.NET6のランタイム](https://dotnet.microsoft.com/ja-jp/download/dotnet/6.0)を導入

ホストを変えている場合は設定からホスト名を変更

## keycloack新規登録用メールの送り方
デフォルトではlocalhost:8080にアクセス

Administration Consoleからユーザー名:admin,パスワード:adminでログイン

右上のManageAccount→PersonalInfoから送信用のメールアドレスを設定

AdminConsoleに戻り、左上のRealms→NiCmment→Emailからメール送信サーバーの設定を行う

TestConnectionで疎通確認
