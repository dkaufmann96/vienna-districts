<template>
  <div id="loading"></div>
</template>

<script>
export default {};
</script>

<style scoped>
#loading {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -3rem;
  margin-left: -3rem;
  display: block;
  width: 6rem;
  height: 6rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #da121a;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
