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
    // 被覆盖水印的目标元素的id
    targetId: {
      required: true
    },
    // 水印文字
    text: "",
    // 是否开启修改防护
    modifyProtect: true,
    // 是否开启删除防护
    removeProtect: true,
    // 水印图案的用户配置项
    canvasUserOptions: Object,
    // 水印元素的用户配置项
    wmUserOptions: Object
  },
  data() {
    return {
      // 水印元素的id
      watermarkId: "",
      // 水印图案，由canvas生成的url
      url: "",
      // 被覆盖水印的目标元素
      $target: undefined,
      // 水印元素
      $wm: undefined,
      canvasOptions: {
        width: 320,
        height: 240,
        fillStyle: "rgba(204,204,204,0.45)",
        font: "36px Times New Roman",
        rotateDegree: 30,
        fillText: {
          text: "watermark",
          x: 20,
          y: 20,
          maxWidth: undefined
        }
      },
      wmOptions: {
        "z-index": -1
      }
    }
  },
  methods: {
    /**
     * [init 进行一些初始化操作]
     * @return {[type]} [description]
     */
    init() {
      // 生成水印元素的id，用于监控该元素是否被删除
      this.watermarkId = this.targetId + "_watermark_xx512";
      // 获取到目标元素
      this.$target = $('#' + this.targetId);
      // 生成水印图案的配置项
      this.createCanvasOption();
      // 生成水印元素的配置项
      this.createWmOption();
      // 生成水印图案的url
      this.url = this.createCanvasDataUrl();
    },
    /**
     * [addWatermark 添加水印]
     */
    addWatermark() {
      this.addWatermarkToTarget();
      this.observeWaterMark();
    },

    /**
     * [createCanvasOption 根据用户传入的参数，生成水印图案的配置项]
     * @return {[type]} [description]
     */
    createCanvasOption() {
      for (let key in this.canvasUserOptions) {
        if (this.canvasOptions.hasOwnProperty(key)) {
          this.canvasOptions[key] = this.canvasUserOptions[key];
        }
      }
    },

    /**
     * [createWmOption 根据用户传入的参数，生成水印元素的配置项]
     * @return {[type]} [description]
     */
    createWmOption() {
      for (let key in this.wmUserOptions) {
        if (this.wmOptions.hasOwnProperty(key)) {
          this.wmOptions[key] = this.wmUserOptions[key];
        }
      }
    },

    /**
     * [createCanvasDataUrl 生成水印图案的url]
     * @return {[type]} [description]
     */
    createCanvasDataUrl() {
      // 创建canvas
      let canvas = document.createElement('canvas');
      canvas.width = this.canvasOptions.width;
      canvas.height = this.canvasOptions.height;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = this.canvasOptions.fillStyle;
      ctx.font = this.canvasOptions.font;
      ctx.rotate(this.canvasOptions.rotateDegree * Math.PI / 180);
      ctx.fillText("samsang", 20, 20);
      return canvas.toDataURL('image/png');
    },

    /**
     * [addWatermarkToTarget 在目标元素上面添加水印层，这种方式没有直接修改目标元素的background，这样可以单独操纵水印元素]
     */
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
      $wm.css('pointer-events', 'none');
      for (let key in this.wmOptions) {
        $wm.css(key, this.wmOptions[key]);
      }
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