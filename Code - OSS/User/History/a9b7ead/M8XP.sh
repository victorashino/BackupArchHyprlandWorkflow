#!/bin/bash

# Obtém o IP do dispositivo Android
device_ip=$(adb shell ip route | awk '{print $9}' | grep -oP '\d+\.\d+\.\d+\.\d+')

if [ -z "$device_ip" ]; then
    echo "Nenhum dispositivo encontrado."
else
    # Tenta conectar ao dispositivo pelo IP
    adb connect "$device_ip:5555"
    echo "Conectado ao dispositivo em $device_ip"
fi
