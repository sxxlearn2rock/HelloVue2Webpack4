<style lang="scss" scoped>
$blue: blue;
h1 {
  color: $blue;
}
</style>

<template>
  <h1>Hello {{ name }}!</h1>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  mounted() {
    const m = new Map();
    console.log(m);
  }
}
</script>

