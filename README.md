# JMeter 分散負荷テストセットアップガイド / JMeter Distributed Testing Setup Guide

## 概要 / Overview

このリポジトリでは、JMeterを使用した分散負荷テストの設定方法について説明します。
物理サーバーとDockerの両方の環境での設定方法を記載しています。

This repository explains how to set up distributed load testing using JMeter.
It covers setup methods for both physical servers and Docker environments.

### システム構成 / System Configuration

JMeterの分散負荷テストでは、1台のマスターノードと複数のスレーブノードを使用して
大規模な負荷テストを実行することができます。

In JMeter distributed load testing, you can perform large-scale load tests using
one master node and multiple slave nodes.

```
[JMeter Controller(Master)] --- [JMeter Agent(Slave1)]
                            |- [JMeter Agent(Slave2)]
                            |- [JMeter Agent(Slave3)]
```

## 必要なポート設定 / Required Port Settings

### 物理サーバー環境の場合 / For Physical Server Environment

分散テストを実行する際に必要なTCPポート：
TCP ports required for distributed testing:

- 1099: RMIレジストリ用のデフォルトポート / Default port for RMI registry
- 追加のRMIポート（動的に割り当て） / Additional RMI ports (dynamically assigned)

ファイアウォールがある環境では、以下の設定を`jmeter.properties`に追加して固定ポートを使用します：
In environments with firewalls, add the following settings to `jmeter.properties` to use fixed ports:

```properties
server.rmi.localport=50000
client.rmi.localport=50001
```

### Docker環境の場合 / For Docker Environment

Docker Composeを使用する場合、以下のような設定で自動的にコンテナ間通信が確立されます：
When using Docker Compose, container-to-container communication is automatically established with the following configuration:

```yaml
version: '3'
services:
  jmeter-master:
    image: justb4/jmeter
    networks:
      - jmeter-net
      
  jmeter-slave:
    image: justb4/jmeter
    networks:
      - jmeter-net

networks:
  jmeter-net:
```

Docker環境では以下の理由により、明示的なポート設定が不要です：
In Docker environments, explicit port settings are not required due to:

1. Docker Compose による自動的なコンテナ間通信の設定 / Automatic container communication configuration by Docker Compose
2. Docker network による自動的な通信許可 / Automatic communication allowance through Docker network
3. ホストネットワークモードの使用 / Use of host network mode

## セットアップ手順 / Setup Procedures

### 物理サーバー環境 / Physical Server Environment

1. マスターノードの設定 / Master Node Configuration
   ```bash
   # jmeter.propertiesの編集 / Edit jmeter.properties
   vim $JMETER_HOME/bin/jmeter.properties
   
   # 必要に応じて固定ポートを設定 / Set fixed ports if needed
   server.rmi.localport=50000
   client.rmi.localport=50001
   ```

2. スレーブノードの設定 / Slave Node Configuration
   ```bash
   # JMeterをサーバーモードで起動 / Start JMeter in server mode
   jmeter-server
   ```

### Docker環境 / Docker Environment

1. Docker Composeファイルの作成 / Create Docker Compose file
2. 以下のコマンドで環境を起動 / Start the environment with the following command:
   ```bash
   docker-compose up -d
   ```

## 使用方法 / Usage

1. JMeterのGUIでテストプランを作成 / Create test plan in JMeter GUI
2. Remote Start設定でスレーブノードを指定 / Specify slave nodes in Remote Start settings
3. テストの実行 / Execute the test

## トラブルシューティング / Troubleshooting

RMI接続エラーが発生する場合、以下を確認してください：
If RMI connection errors occur, check the following:

- ファイアウォール設定の確認 / Verify firewall settings
- ポート番号の確認 / Check port numbers
- ネットワーク接続の確認 / Verify network connectivity

## 参考情報 / References

- [JMeter公式ドキュメント - 分散テスト / JMeter Official Documentation - Distributed Testing](https://jmeter.apache.org/usermanual/remote-test.html)
- [Docker Hub - JMeter](https://hub.docker.com/r/justb4/jmeter)

## ライセンス / License

このドキュメントはMITライセンスの下で公開されています。
This document is released under the MIT License.