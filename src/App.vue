<style scoped>
/*@import "./commons/style/common_style.scss"*/
/*.full-width {
  width: 100%;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}*/

div.info {
  border: 1px solid #aaa;
  height: 300px;
  position: relative;
}
</style>

<template>
  <div class="full-width center-content">
    <div class="info" id="info-1">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?
    </div>
    <div class="info" id="info-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laborum, voluptate, repellendus amet impedit inventore. Optio nisi quibusdam nemo, laudantium ad nobis beatae eum rem cum, doloribus error. Fugiat, harum?
    </div>
    <watermark
     target-id="info-1">
    </watermark>
    <watermark
     target-id="info-2">
    </watermark>
  </div>
</template>

<script>
import Hello from "./components/Hello.vue";
import Watermark from "./components/Watermark.vue";
import $ from 'jquery';

export default {
  components: {
    Hello,
    Watermark
  },
  methods: {
    addWatermark(selector, options=null) {
      const url = this.createCanvasDataUrl();
      let $wm =  this.addWatermarkToTarget('.info', url);
      this.observeWaterMark($wm, '.info', url);
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
    addWatermarkToTarget(selector, url) {
      // 获取目标元素
      const $target = $(selector);
      // 创建水印覆盖目标元素
      let $wm = $(document.createElement('div'));
      $wm.attr('id', 'watermark_id');
      $wm.width('100%');
      $wm.height('100%');
      $wm.css('background', '#cba');
      $wm.css('position', 'absolute');
      $wm.css('top', '0');
      $wm.css('left', '0');  
      $wm.css('z-index', '-1');
      $wm.css('pointer-events', 'none');
      $wm.css('background', 'url(' + url + ') repeat top left');
      $target.append($wm);
      return $wm;
    },
    /**
     * [observeWaterMark 监控水印元素，从两方面防止被修改：1.属性被修改，2.元素被删除]
     * @param  {[type]} $wm      [水印元素]
     * @param  {[type]} selector [被添加水印的目标元素的选择器]
     * @param  {[type]} url      [水印的url]
     * @return {[type]}          [description]
     */
    observeWaterMark($wm, targetSelector, url) {
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
          this.resetWatermark($wm, url);
          // 重新监听元素
          observer.observe($wm[0], obConfig);
        }
      });
      observer.observe($wm[0], obConfig);

      // 进一步加强监控，防止元素被删除
      let pObserver = new MutationObserver((mutations, observer) => {
        for (let m of mutations) {
          if(m.type === 'childList' && m.removedNodes.length > 0) {
            for (let n of m.removedNodes) {
              if (n.id = "watermark_id") {
                console.log('delete mutation observed!')
                console.log(m);
                pObserver.disconnect();
                const url = this.createCanvasDataUrl();
                let $wm =  this.addWatermarkToTarget('.info', url);
                this.observeWaterMark($wm, '.info', url);
              }
            }
          }
        }
      });
      const pObConfig = {
        childList: true, 
        subtree:true
      };
      pObserver.observe($(targetSelector)[0], pObConfig);
    },
    resetWatermark($wm, url) {
      $wm.attr('id', 'watermark_id');
      $wm.width('100%');
      $wm.height('100%');
      $wm.css('background', '#cba');
      $wm.css('position', 'absolute');
      $wm.css('top', '0');
      $wm.css('left', '0');
      $wm.css('z-index', '-1');
      $wm.css('pointer-events', 'none');
      $wm.css('background', 'url(' + url + ') repeat top left');
    }
  },
  mounted() {
    // this.addWatermark('.info');
  }
}
</script>