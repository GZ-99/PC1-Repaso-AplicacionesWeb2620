<script setup lang="js">
import {useI18n} from "vue-i18n";
/**
 * Presentation component for the application footer.
 *
 * @remarks
 * Displays attribution links, copyright information, and supports localization.
 */
const { t } = useI18n();
</script>

<template>
  <div class="grid mt-4 p-4 justify-content-center bg-primary text-primary-contrast text-center">
    <div class="col-12 flex flex-column align-items-center">
      {{ t('footer.copyright') }} <i class="pi pi-heart text-red-500"/>
    </div>
    <div  class="col-12 flex flex-column align-items-center mt-3">
      <p>
        {{ t('footer.developed-by', {author: 'Gabriel Vilchez Vite - U202416903'}) }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
