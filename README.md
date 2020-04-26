# Vue3Cesium
基于Vue-Cli3 集成Cesium，相关基本配置, 初始加载显示

### 注意点
 -  Cesium实例化对象 不要放入Vue data中，放入的全局比如 window中来引用
 -  初始化Cesium时  方法放入mounted 中去执行
 -  模型数据如果是静态文件访问，放入public文件夹下访问

### 结果
