<style scoped>
.full-width {
  width: 100%;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="full-width center-content">
    <h1>Vue2 + webpack4</h1>

    <div>
      <hello
       name="world">
      </hello>
    </div>

  </div>
</template>

<script>
import Hello from "./components/Hello.vue";

export default {
  components: {
    Hello
  },
  mounted() {
    console.log('sss');
  }
}
</script>