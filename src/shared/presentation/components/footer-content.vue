<script setup lang="js">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="grid mt-4 p-4 justify-content-center bg-primary text-primary-contrast text-center">
    <div class="col-12 flex flex-column align-items-center">
      <p>Copyright &copy; 2026. ACME Studios</p>
    </div>
    <div  class="col-12 flex flex-column align-items-center mt-3">
      <p>
        {{ t('footer.copyright') }} <i class="pi pi-heart text-red-500"/>
        {{ t('footer.developed-by', {author: 'Gabriel Vilchez Vite - U202416903'}) }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
