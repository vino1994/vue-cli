<template>
    <div class="content">
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">发送语音</p>
            </div>
            <div class="weui-uploader__bd">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @touchstart="startRecord" @touchend="stopRecord">开始录音</a>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;" v-show="recordStatus === 'complete'">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="playVoice">播放录音({{Math.ceil(longTapTime)}}')</a>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="translateVoice">识别音频</a>
                <p>{{translateResult}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            longTapTime: 0, //录音时长
            recordTimer: null, //录音时长定时器
            recordStatus: "stop", //录音状态
            recordLocalId: "", //录音id
            isPlayVoice: false, //是否在播放录音
            translateResult:''//识别音频结果
        };
    },
    methods: {
        //开始录音接口
        startRecord() {
            this.longTapTime = 0;
            this.recordStatu = "stop";
            window.app.wxSDK.startRecord({
                success: () => {
                    this.recordTimer = setInterval(() => {
                        this.longTapTime += 0.5;
                    }, 500);
                    this.onVoiceRecordEnd();
                },
                cancel: () => {
                    window.app.weui.alert("用户拒绝授权录音");
                }
            });
        },
        //停止录音接口
        stopRecord() {
            window.app.wxSDK.stopRecord({
                success: res => {
                    this.recordLocalId = res.localId;
                    this.voiceLength();
                    clearInterval(this.recordTimer);
                }
            });
        },
        //音频长度判断
        voiceLength() {
            if (Math.ceil(this.longTapTime) < 1) {
                window.app.weui.toast("说话时间太短");
                this.longTapTime = 0;
            } else {
                this.recordStatus = "complete";
            }
        },
        //监听录音自动停止接口
        onVoiceRecordEnd() {
            window.app.wxSDK.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: res => {
                    this.recordLocalId = res.localId;
                    window.app.weui.toast("60秒停止录音");
                }
            });
        },
        //播放、暂停语音接口
        playVoice() {
            if (!this.isPlayVoice) {
                window.app.wxSDK.playVoice({
                    localId: this.recordLocalId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
                this.onVoicePlayEnd();
                this.isPlayVoice = true;
            } else {
                window.app.wxSDK.pauseVoice({
                    localId: this.recordLocalId // 需要暂停的音频的本地ID，由stopRecord接口获得
                });
                this.isPlayVoice = false;
            }
        },
        //监听语音播放完毕接口
        onVoicePlayEnd(){
            window.app.wxSDK.onVoicePlayEnd({
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID
                }
            });
        },
        //识别音频并返回识别结果接口
        translateVoice() {
            if(!this.recordLocalId){
                window.app.weui.toast("请录音");
                return
            }
            window.app.wxSDK.translateVoice({
                localId: this.recordLocalId, // 需要识别的音频的本地Id，由录音相关接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                    this.translateResult = res.translateResult;
                }
            });
        }
    }
};
</script>
<style scoped>
.content {
    width: calc(100vw - 20px);
    overflow-x: hidden;
    padding: 10px;
}
</style>
