#!/bin/bash

curl -sL https://civo.com/get | sh
civo apikey add production "${CIVO_API_KEY}"
civo apikey current production

civo instance list


export KEY_DIR="$HOME/.ssh"

echo "Creating SSH keys: $KEY_DIR"

mkdir -p $KEY_DIR
chmod 700 $KEY_DIR

# Convert the text back into human-readable format:
echo -n "${SSH_PUBLIC_KEY}" | base64 --decode > $KEY_DIR/id_rsa.pub
echo -n "${SSH_PRIVATE_KEY}" | base64 --decode > $KEY_DIR/id_rsa

chmod 600 $KEY_DIR/id_rsa

echo -n $SSH_KEY_ID > $HOME/key_ids.txt

# Check the keys exist correctly:
echo "HOME: $HOME"

cat $HOME/.ssh/id_rsa.pub
stat $HOME/.ssh/id_rsa
