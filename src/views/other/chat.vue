
<template>
  <div></div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {
    location = "whatsapp://send?phone=" + this.$store.state.whatsapp;
    setTimeout(() => {
      this.$router.go(-1);
    }, 500);
  }
};
</script>