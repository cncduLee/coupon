# Core Data Service

## 介绍

核心数据存储层：负责存储设备、传感器、和数据点，只供开放平台调用。

* 设备：设备连接传感器
* 传感器：传感器申请数据类型
* 数据点：根据传感器类型提交相应时间点的数据值

## Install

```
$ git clone https://git.oschina.net/taber/CoreDataServer.git
$ npm install
$ npm start
$ open http://127.0.0.1:8001/api.html
```

## Todos:

1.	历史数据点查询:

    /api/datapoints?start=timestamp & end=timestamp & interval=millisecond

2.  资源单字段的复数查询： 

    /api/devices?_id=ObjectId1,ObjectId2

    /api/sensors?_id=ObjectId1,ObjectId2
