#!/bin/bash

# Defina o caminho para o arquivo de estado
STATE_FILE="/tmp/hypruware_state"

# Verifique se o aplicativo já está em execução
if pgrep -f "/opt/HyprUware/bin/HyprUware" > /dev/null; then
    # Se estiver em execução, feche o aplicativo
    pkill -f "/opt/HyprUware/bin/HyprUware"
    # Remova o arquivo de estado
    rm -f "$STATE_FILE"
else
    # Se não estiver em execução, inicie o aplicativo
    /opt/HyprUware/bin/HyprUware --power &
    # Crie o arquivo de estado
    touch "$STATE_FILE"
fi
