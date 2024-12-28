#!/bin/sh

if [ "${MODE}" = "master" ]; then
    # マスターモードの場合は何もせずに待機
    tail -f /dev/null
elif [ "${MODE}" = "slave" ]; then
    # スレーブモードの場合はJMeterサーバーを起動
    jmeter-server $@
fi
