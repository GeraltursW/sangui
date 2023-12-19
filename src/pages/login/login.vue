<template>
     login
</template>

<script setup lang="ts">
  import {login} from '../../api/user';
  const requestRes = async () => {
    let result = await login('zhangsan', '123456');
    console.log(result)
    debugger
  }
  requestRes()
</script>
<style scoped>

</style>
