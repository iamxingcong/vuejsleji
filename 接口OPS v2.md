### 授权类型
```
授权类型列表
    GET:/ops/price_item/

添加授权类型
    POST:/ops/price_item/
        参数:
            name
            desc
            rate    比例(1 < rate < 10)

修改授权类型
    PUT:/ops/price_item/<uuid>/
        参数:
            name
            desc
            rate    比例(1 < rate < 10)

删除授权类型（绑定了其它定价方案无法删除）
    DELETE:/ops/price_item/<uuid>/

获取全部授权类型
    GET:/ops/price_area_search/
    参数:
        search(搜索):
            uuid、type、name、desc
```

### 定价方案
```
创建定价方案
    POST:/ops/price/
        参数:
            name	        定价方案名
            desc	        定价方案描述
            price           基本价
            area_uuids      定价项-授权类型UUID列表
            place_cn        授权地域-中国
            place_global    授权地域-全球
            time_one	    授权时间-一年
            time_forever    授权时间-永久

定价方案列表
    GET:/ops/price/

定价方案添加授权类型
    POST:/ops/price/<uuid>/price_area_add/
        参数:
            uuids   授权类型UUID列表

定价方案移除授权类型
    POST:/ops/price/<uuid>/price_area_remove/
        参数:
            uuids   授权类型UUID列表

删除定价方案
    DELETE:/ops/price/<uuid>/
```

#### 定价方案详情
```
定价方案详情
    GET:/ops/price/<uuid>/

更新定价方案
    PUT:/ops/price/
        参数:
            name	        定价方案名
            desc	        定价方案描述
            price           基本价
            area_uuids      定价项-授权类型UUID列表
            place_cn        授权地域-中国
            place_global    授权地域-全球
            time_one	    授权时间-一年
            time_forever    授权时间-永久

定价方案添加音乐
    POST:/ops/price/<uuid>/music_add/
        参数:
            uuids   音乐ID列表   ["xxx-xxx-xxx-xxx", "xxx-xxx-yyy-yyy"]

定价方案移除音乐
    POST:/ops/price/<uuid>/music_remove/
        参数:
            uuids   音乐ID列表   ["xxx-xxx-xxx-xxx", "xxx-xxx-yyy-yyy"]

定价方案下的音乐
    GET:/ops/price/<uuid>/musics/

```

#### 订单管理
```
订单列表
    GET:/ops/order/

    search(搜索):
        uuid

    过滤参数:
        status
            WAITING/SUCCEED/CANCELED
        pay_method
            ALI_QR/WECHAT_QR/TRANSFER/OFFLINE
        paid_time__gt
        paid_time__lte	
        created_at__gt	
        created_at__lte

    ordering(排序):
        created_at paid_time

订单删除
    DELETE /ops/order/{uuid}/

        注意:
            1. 只有被取消订单才能被删除 status=CANCELED

订单详情
    GET /ops/order/{uuid}/

订单修改金额(等待支付状态)
    PUT /ops/order/{uuid}/modify_amount/
        参数:
            amount  实际支付金额(需要小于订单总金额)

订单修改支付成功(等待支付状态)
    PUT /ops/order/{uuid}/pay_success/
```

#### 授权管理
```
授权列表
    GET /ops/certificate/
        过滤
            status
                WAITING(等待授权)/SUCCEED(授权成功)/FAILED(授权失败)/CANCELED(取消授权)
    
授权详情
    GET /ops/certificate/{uuid}/

修改授权信息
    PUT /ops/certificate/{uuid}/
        参数
            use_name        使用方名称
            project_name    项目名
```

#### 数据统计
```
面板数据统计
    GET /ops/data/panel/

下载记录
    GET /ops/download/?type=DOWNLOAD

播放记录
    GET /ops/download/?type=PREVIEW
```

#### 音乐管理
```
音乐列表
    GET /ops/music/
        过滤:
            styles: 风格 styles=10,11
            moods: 情绪 moods=12,13
            instruments: 乐器 instruments=14,15
            tempo_notes_id: 速度 tempo_notes_id=16
            album_id: 专辑ID
            length__gte: 时长大于 length__gte=0
            length__lt: 时长小于 length__lt=30
            created_at__gte: 时长大于 created_at__gte=2019-01-01 00:00:00
            created_at__lt: 时长小于 created_at__lt=2019-02-01 00:00:00
        
        search 搜索:
            音乐ID, 音乐名, 专辑名, 词作者, 曲作者, 编曲作者, 主要表演者, 关键词
        
        ordering 排序:
            -created_at(最新) -order(最热)

添加音乐
    POST /ops/music/
        参数:
            name        必填
            musician_id
            album_id
            desc
            path        必填

编辑音乐
    PUT /ops/music/{uuid}/edit_info/
        参数:
            name        必填
            musician_id
            album_id
            desc

编辑音乐更多信息
    PUT /ops/music/{uuid}/edit_more_info/
        参数:
            music_no	        音乐编号
            format	            音乐格式
            metre	            节拍
            key_mood	        大小调
            opening_key	        开始的Key
            closing_key	        结束的Key
            tempo_open_id	    开始速度
            tempo_end_id	    结束速度
            bpm	                节拍/分钟
            isrc	            ISRC号
            styles	            风格
            moods	            情绪
            main_instruments	主奏乐器
            accompanied_instruments	    伴奏乐器
            tempo_notes_id	    整体速度
            keyword	            关键词
            desc	            音乐描述
            lyricist	        词作者
            composer	        曲作者
            arranged_by	        编曲作者
            release_year	    歌曲发行时间
            publisher	        原发行者（公司名/厂牌名）
            agent_publisher	    代理发行者（公司名/厂牌名）
            factoid	            主要表演者
            place_of_recording	录制地点

音乐上线
    PUT /ops/music/online/
        参数:
            type:
                ALL         上线全部音乐
                PRICE       上线定价音乐

音乐单个上线
    PUT /ops/music/{uuid}/set_online/

音乐单个下线
    PUT /ops/music/{uuid}/set_offline/

音乐详情
    GET /ops/music/{uuid}/

上传音乐文件
    PUT /ops/music/{uuid}/upload_music_file/
        参数:
            path        必填

上传歌词和歌词文件
    PUT /ops/music/{uuid}/upload_music_lrc/
        参数:
            lrc_path	歌词链接
            lrc_text	歌词文本

多版本音乐
    GET /ops/music/{uuid}/tracks/

添加多版本音乐
    POST /ops/music/{uuid}/track_add/
        参数:
            uuids   音乐ID

移除多版本音乐
    POST /ops/music/{uuid}/track_remove/
        参数:
            uuids   音乐ID

相似音乐
    GET /ops/music/{uuid}/relates/

添加相似音乐
    POST /ops/music/{uuid}/relate_add/
        参数:
            uuids   音乐ID

移除相似音乐
    POST /ops/music/{uuid}/relate_remove/
        参数:
            uuids   音乐ID

删除单个音乐
    DELETE /ops/music/{uuid}/

批量删除音乐
    POST /ops/music/batch_destroy/
        参数:
            uuids   音乐列表

```

#### 音乐批量处理
```
音乐批量加入专辑
    POST /ops/album/{uuid}/music_add/
        参数:
            uuids   音乐UUID列表
音乐批量移出专辑
    POST /ops/album/{uuid}/music_remove/
        参数:
            uuids   音乐UUID列表
音乐批量加入曲单
    
音乐批量下载
    前端JS加入队列下载
音乐批量绑定艺术家
    POST /ops/musician/{uuid}/music_add/
        参数:
            uuids   音乐UUID列表
批量解绑艺术家
    POST /ops/musician/{uuid}/music_remove/
        参数:
            uuids   音乐UUID列表
音乐批量上线
    POST /ops/music/batch_online/
        参数:
            uuids   音乐列表
音乐批量下线    
    POST /ops/music/batch_offline/
        参数:
            uuids   音乐列表
批量删除音乐
    POST /ops/music/batch_destroy/
        参数:
            uuids   音乐列表
```

#### 音乐下载
```
下载/试听原始音频
    GET /ops/music/{uuid}/path/
        参数
            disposition(文件)：
                attachment：下载
                inline：在线试听

下载/试听高清mp3音频
    GET /ops/music/{uuid}/mp3/
        参数
            disposition(文件)：
                attachment：下载
                inline：在线试听

下载/试听高清wav音频
    GET /ops/music/{uuid}/wav/
        参数
            disposition(文件)：
                attachment：下载
                inline：在线试听

下载/试听低清水印音频
    GET /ops/music/{uuid}/preview/
        参数
            disposition(文件)：
                attachment：下载
                inline：在线试听
```


#### 艺术家
```
艺术家列表
    GET /ops/musician/

创建艺术家（刷新缓存）
    POST /ops/musician/
        参数
            name	用户名
            label_id 厂牌     必填
            desc	描述备注
            avatar	音乐人头像

更新艺术家（刷新缓存）
    PUT /ops/musician/{uuid}/
        参数
            name	用户名
            label_id 厂牌     必填
            desc	描述备注
            avatar	音乐人头像

艺术家详情
    GET /ops/musician/{uuid}/

艺术家删除
    DELETE /ops/musician/{uuid}/


艺术家下的音乐列表
    GET /ops/musician/{uuid}/musics/

艺术家下音乐批量添加
    POST /ops/musician/{uuid}/music_add/
        参数:
            uuids   音乐UUID列表

艺术家下音乐批量移除
    POST /ops/musician/{uuid}/music_remove/
        参数:
            uuids   音乐UUID列表

艺术家下的专辑列表
    GET /ops/musician/{uuid}/albums/

艺术家下专辑批量添加
    POST /ops/musician/{uuid}/album_add/
        参数:
            uuids   专辑UUID列表

艺术家下专辑批量移除
    POST /ops/musician/{uuid}/album_remove/
        参数:
            uuids   专辑UUID列表

```


#### 专辑管理
```
专辑列表
    GET /ops/album/
        search(搜索):
            uuid, name, album_no
        ordering(排序):
            created_at, updated_at
        过滤:
            label_id	
            musician_id

添加专辑
    POST /ops/album/
        name            必填	
        musician_id
        label_id        必填	
        cover	专辑封面
        desc	
        created_at

删除专辑
    DELETE /ops/album/{uuid}/

编辑专辑
    PUT /ops/album/{uuid}/

专辑详情
    GET /ops/album/{uuid}/

专辑下的音乐
    GET /ops/album/{uuid}/musics/
```


#### 厂牌管理
```
厂牌列表
    GET /ops/label/

创建厂牌
    POST /ops/label/

厂牌详情
    GET /ops/label/{uuid}/

全部更新厂牌
    PUT /ops/label/{uuid}/

部分更新厂牌
    PATCH /ops/label/{uuid}/

删除厂牌
    DELETE /ops/label/{uuid}/

厂牌下的专辑
    GET /ops/label/{uuid}/albums/

厂牌下的音乐
    GET /ops/label/{uuid}/musics/
```
