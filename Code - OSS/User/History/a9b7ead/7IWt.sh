#!/bin/bash
adb devices

device_ip=$(adb shell ip route | awk '{print $9}' | grep -oP '\d+\.\d+\.\d+\.\d+')

if [ -n "$device_ip" ]; then
    adb connect "$device_ip"
    echo "Conectado ao dispositivo em $device_ip"
else
    echo "Nenhum dispositivo encontrado."
fi
