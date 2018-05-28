<style lang="scss" scoped>
.component-wrapper {
  width: 100%;
  height: 100%;
  #info {
    height: 2500px;
    border: 1px solid #aaa;
  }
}  
</style>

<template>
  <div class="component-wrapper">
  </div>
</template>

<script lang="babel">
import $ from 'jquery';

export default {
  props: {
    targetId: {
      required: true
    }
  },
  data() {
    return {
      watermarkId: "",
      url: "",
      // 被覆盖水印的目标元素
      $target: undefined,
      // 水印元素
      $wm: undefined
    }
  },
  methods: {
    init() {
      this.watermarkId = this.targetId + "_watermark_xx512";
      this.$target = $('#' + this.targetId);
      this.url = this.createCanvasDataUrl();
    },
    addWatermark() {
      this.addWatermarkToTarget();
      this.observeWaterMark();
    },
    createCanvasDataUrl() {
      // 创建canvas
      let canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = "rgba(204,204,204,0.45)";
      ctx.font = "36px Times New Roman";
      ctx.rotate(30 * Math.PI / 180);
      ctx.fillText("samsang", 20, 20);
      return canvas.toDataURL('image/png');
    },
    addWatermarkToTarget() {
      // 创建水印覆盖目标元素
      let $wm = $(document.createElement('div'));
      $wm.attr('id', this.watermarkId);
      $wm.width('100%');
      $wm.height('100%');
      $wm.css('background', '#cba');
      $wm.css('position', 'absolute');
      $wm.css('top', '0');
      $wm.css('left', '0');  
      $wm.css('z-index', '-1');
      $wm.css('pointer-events', 'none');
      $wm.css('background', 'url(' + this.url + ') repeat top left');
      this.$wm = $wm;
      this.$target.append($wm);
    },
    /**
     * [observeWaterMark 监控水印元素，从两方面防止被修改：1.属性被修改，2.元素被删除]
     * @param  {[type]} $wm      [水印元素]
     * @param  {[type]} selector [被添加水印的目标元素的选择器]
     * @param  {[type]} url      [水印的url]
     * @return {[type]}          [description]
     */
    observeWaterMark() {
      const obConfig = {
        attributes: true, 
        characterData: true
      };
      // 增加监控，防止水印被修改
      let observer = new MutationObserver((mutations, observer) => {
        for (let m of mutations) {
          // 先取消监听，避免死循环
          observer.disconnect();
          console.log('mutation observed!')
          console.log(m);
          this.resetWatermark();
          // 重新监听元素
          observer.observe(this.$wm[0], obConfig);
        }
      });
      observer.observe(this.$wm[0], obConfig);

      // 进一步加强监控，防止元素被删除
      let pObserver = new MutationObserver((mutations, observer) => {
        for (let m of mutations) {
          if(m.type === 'childList' && m.removedNodes.length > 0) {
            for (let n of m.removedNodes) {
              if (n.id == this.watermarkId) {
                console.log('delete mutation observed!')
                console.log(m);
                pObserver.disconnect();
                this.addWatermarkToTarget();
                this.observeWaterMark();
              }
            }
          }
        }
      });
      const pObConfig = {
        childList: true, 
        subtree:true
      };
      pObserver.observe(this.$target[0], pObConfig);
    },
    resetWatermark() {
      this.$wm.attr('id', this.watermarkId);
      this.$wm.width('100%');
      this.$wm.height('100%');
      this.$wm.css('background', '#cba');
      this.$wm.css('position', 'absolute');
      this.$wm.css('top', '0');
      this.$wm.css('left', '0');
      this.$wm.css('z-index', '-1');
      this.$wm.css('pointer-events', 'none');
      this.$wm.css('background', 'url(' + this.url + ') repeat top left');
    }
  },
  mounted() {
    this.init();
    this.addWatermark();
  }
}  
</script>