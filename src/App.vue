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
  height: 500px;
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

export default {
  components: {
    Hello,
    Watermark
  },
  methods: {

  },
  mounted() {
    // this.addWatermark('.info');
  }
}
</script>