---
title: LTCGI实时光教程
published: 2024-03-13
description: "LTCGI的简单教程"
tags: ["vrchat", "ltcgi", "unity"]
category: vrchat
draft: false
---
## 前言
>LTCGI 是一种优化的即插即用实时区域光解决方案，使用线性变换余弦算法，适用于独立的 Unity 和 VRChat。免费使用并注明出处。它可以利用Unity内置光照贴图或Bakery在静态对象上获得逼真的阴影。

使用ltcgi可以給vrchat地圖内的物體乃至視頻播放器實現優雅的反射效果，同時也能獲得較好的性能

>本文只是大概講述用法，具體請看官方文檔：https://ltcgi.dev/

## 安裝
確保你的項目使用的是受支持的著色器
|  著色器列表 |
|-------
|ORL Shader Family by @orels1 |
|Silent's Filamented   |
|Mochie's Unity Shaders |
|Hekky Shaders |
|z3y's Shaders |
|Basic "Unlit" Test Shader (included) |
|Surface Shader (included)  |

使用vcc添加
https://vpm.pimaker.at/

若非用於vrchat項目，可以在package manger内用git導入
```shell
https://github.com/PiMaker/ltcgi.git
```

在導入項目后，找到`LTCGI_Controller`並把他丟進sence中，位置隨意;這是用於控制ltcgi的烘焙以及調節一些設置所用的prefab


## 使用
ltcgi用於控制發光的組件是一個名爲`LTCGI_Screen`的組件

他必須放在至少有3或者4個頂點的`Mesh Filter`物體上
**舉例子: quad**

![alt text](<屏幕截图 2024-03-12 222653.png>)

## 控制器内容解釋

![controller](<屏幕截图 2024-03-12 223421.png>)


|  名稱  |  含義 |
| ------|-------|
| arealight shapre | 定義發光的形狀 |
| color | 光顔色（下面的按鈕用於嘗試直接從附著的物體上）|
| Diffuse mode | 漫反射方式 |
| specular | 選擇是否反射 | 
| Dynamic | 将此屏物體标记为动态。具有轻微的性能开销，但允许在运行时移动屏幕并更改其颜色 | 
| double sided | 物體兩面都發光而不是一面 |
| filp uv | 把uv翻轉過來 |
| affect avatars |是否影響角色本身（前提是角色使用的著色器兼容）|
| color mode | 色彩模式 |
| Affected Renderers | 选择场景中的哪些渲染器应接收来自此ltcgi screen的光线 | 
| Lightmap Channel | 选择烘焙阴影贴图时此屏幕将占用的光照贴图通道

### 漫反射方式
| 類型 | 意義 |
| -----| ----|
| no diffuse | 禁用 |
| LTC Diffuse | 使用 LTC 算法的漫反射 | 
| Lightmap Diffuse | 直接使用在阴影贴图烘焙中计算的数据 |

### 色彩模式
| 類型 | 意義 |
| -----| ----|
| stanic | 靜態的
| Texture | 從紋理中選擇顔色，可用於視頻紋理或者其他的靜態紋理| 
| Single UV | 和texture差不多，但是会以从纹理中获取的单一颜色点亮屏幕，并在下面指定的确切 UV 坐标处点亮屏幕| 
| audiolink | 鏈接audiolink並偵測指定區域的信號，比如bass |


## 應用實時視頻紋理
下面舉例的是vidviz播放器，如果你使用的是protv播放器可以直接使用controller的按鈕一鍵配置；部分播放器本身也帶有自動化配置ltcgi的選項

>其他播放器參考：https://ltcgi.dev/Getting%20Started/Setup/Realtime_Video

1. 把ltcgi的使用的屏幕紋理丟進播放器的輸出目標内

![video target](<屏幕截图 2024-03-12 225036.png>)


2. 前往`ltcgi controller`把剛剛添加進播放器的texture丟盡video texture選項内

![123](<屏幕截图 2024-03-12 225441.png>)


4. 之後選擇播放器的`screen` 組件添加一個component-就是上文的`LTCGI_Screen`， 配置好選項，完成

## 後記
大概講完了ltcgi的基本内容，我本身也對這玩意屬於是一知半解，待以後使用這個工具更加熟練后可能會更新這文章吧，而且他也能和audiolink進行聯動整出一些炫酷的效果，當然這就是另外的事情了

>建議看一下官方文檔：https://ltcgi.dev/
