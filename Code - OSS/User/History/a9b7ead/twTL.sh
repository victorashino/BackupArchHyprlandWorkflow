#!/bin/bash

# Endereço IP do dispositivo
device_ip="192.168.0.159"

# Tenta conectar ao dispositivo pelo IP
adb connect "$device_ip:5555"

# Verifica se a conexão foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "Conectado ao dispositivo em $device_ip"
else
    echo "Falha ao conectar ao dispositivo em $device_ip"
fi
