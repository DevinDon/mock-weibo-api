#!/usr/bin/env sh

# if [ -z "$HOST_IP" ]; then
#   HOST_IP=`nslookup your.domain.com | grep Address | tail -n 1 | awk '{print $2}'`
# fi

IP=`cat /etc/hosts | grep $HOSTNAME | awk '{print $1}'`

sleep 3 && (
  if [ "$MAIN" = "true" ];
  then
    # echo yes | redis-cli -a rester-redis --cluster create \
    # `getent hosts rester-redis-001 | awk '{ print $1 }'`:7001 \
    # `getent hosts rester-redis-002 | awk '{ print $1 }'`:7002 \
    # `getent hosts rester-redis-003 | awk '{ print $1 }'`:7003 \
    # `getent hosts rester-redis-004 | awk '{ print $1 }'`:7004 \
    # `getent hosts rester-redis-005 | awk '{ print $1 }'`:7005 \
    # `getent hosts rester-redis-006 | awk '{ print $1 }'`:7006 \
    # --cluster-replicas 1
    echo yes | redis-cli -a rester-redis --cluster create \
      $HOST_IP:7001 \
      $HOST_IP:7002 \
      $HOST_IP:7003 \
      $HOST_IP:7004 \
      $HOST_IP:7005 \
      $HOST_IP:7006 \
    --cluster-replicas 1
  fi
) & (
mkdir -p /config
cat > /config/redis-cluster.conf <<EOF
# Redis 端口
port $PORT
# 密码
masterauth rester-dev
requirepass rester-dev
# 集群节点端口
cluster-announce-port $PORT
cluster-announce-bus-port 1$PORT
# 开启集群
cluster-enabled yes
# 集群节点配置
cluster-config-file /config/nodes.conf
# 超时
cluster-node-timeout 5000
# 开启 appendonly 备份模式
appendonly yes
# 集群节点 IP 为宿主机 IP
cluster-announce-ip $HOST_IP
# 事件监听
notify-keyspace-events "Ex"
EOF

redis-server /config/redis-cluster.conf
)
