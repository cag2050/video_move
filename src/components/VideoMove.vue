<template>
<div>
    <div class="word">拖动视频能上下拖动(不能拖出包含 video 的容器)</div>
    <div class="container">
        <video class="video" id='videoDemo' src="http://gslb.miaopai.com/stream/Ql-FWzggS2fa9oGCDD-40IyDaMgG0x1J.mp4" controls autoplay="autoplay"></video>
    </div>
</div>
</template>

<style>
.word {
    text-align: left;
}
.container {
    width: 640px;
    height: 360px;
    overflow: hidden;
    border: 1px solid gray;
}
.video {
    width: 100%;
    position: relative;
    cursor: move;
}
</style>

<script>
export default {
    name: 'video-move',
    mounted () {
        let _this = this
        let target = document.getElementById('videoDemo')
        if (this.getCss(target, 'left') !== 'auto') {
            // this.params.left = this.getCss(target, 'left')
        }
        if (this.getCss(target, 'top') !== 'auto') {
            this.params.top = this.getCss(target, 'top')
        }
        target.addEventListener('loadedmetadata', function () {
            _this.params.videoWidth = target.videoWidth
            _this.params.videoHeight = target.videoHeight
        })
        target.onmousedown = function (event) {
            _this.params.flag = true
            if (!event) {
                event = window.event
                target.onselectstart = function () {
                    return false
                }
            }
            var e = event
            // _this.params.currentX = e.clientX
            _this.params.currentY = e.clientY
            console.log('mousedown')
        }
        target.onmousemove = function (event) {
            // var e = (event  ? event : window.event)
            var e = event
            if (_this.params.flag) {
                // var nowX = e.clientX
                var nowY = e.clientY
                // var disX = nowX - _this.params.currentX
                var disY = nowY - _this.params.currentY
                // target.style.left = parseInt(_this.params.left) + disX + 'px'
                let maxTop = 360 - _this.params.videoHeight * 640 / _this.params.videoWidth
                if (parseInt(_this.params.top) + disY >= 0) {
                    target.style.top = '0px'
                } else if (_this.params.videoWidth !== 0 && _this.params.videoHeight !== 0 && parseInt(_this.params.top) + disY < maxTop) {
                    target.style.top = maxTop + 'px'
                } else {
                    target.style.top = parseInt(_this.params.top) + disY + 'px'
                }
                if (event.preventDefault) {
                    event.preventDefault()
                }
                return false
            }
            // if (typeof callback === 'function') {
                // callback(parseInt(_this.params.left) + disX, parseInt(_this.params.top) + disY)
            // }
        }
        target.onmouseup = function (event) {
            _this.params.flag = false
            if (_this.getCss(target, 'left') !== 'auto') {
                // _this.params.left = _this.getCss(target, 'left')
            }
            if (_this.getCss(target, 'top') !== 'auto') {
                _this.params.top = _this.getCss(target, 'top')
            }
            console.log('mouseup')
        }
    },
    data () {
        return {
            params: {
                left: 0,
                top: 0,
                currentX: 0,
                currentY: 0,
                flag: false,
                videoWidth: 0,
                videoHeight: 0
            }
        }
    },
    methods: {
        getCss (o, key) {
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
        }
    }
}
</script>
