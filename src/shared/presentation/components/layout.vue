<script lang="js" setup>
import {encyclopediaStore} from "@/encyclopedia/application/encyclopedia.store.js";
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";
import {ref, computed, onMounted} from "vue";
import ResultList from "@/encyclopedia/presentation/components/result-list.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

const errors = computed(() => encyclopediaStore.errors);
const results = computed(() => encyclopediaStore.results || []);

onMounted(() => {
  encyclopediaStore.loadResults();
});
</script>

<template>
  <div class="layout-container">
    <header class="sticky-header">
      <pv-menubar>
        <template #start>
          <pv-button
              icon="pi pi-bars"
              :aria-label="t('title')"
              text
              class="mr-2"
              @click="toggleDrawer"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </header>
    <pv-drawer v-model:visible="drawerVisible" header="Species">
      <ResultList
          :results="results"
          @result-shared="drawerVisible = false"
      />
    </pv-drawer>
    <main class="content-padding">
      <h1 class="page-title">
        {{ t("title") }}
      </h1>
      <h2 class="featured-title">
        {{ t("featured") }}
      </h2>
      <ResultList
          v-if="results.length > 0"
          :results="results"/>
      <div
          v-else-if="errors.length > 0"
          class="error-message">
        <p v-for="(error, index) in errors" :key="index">
          {{ error }}
        </p>
      </div>
      <p v-else class="loading-message">
        Loading...
      </p>
    </main>
    <footer>
      <FooterContent />
    </footer>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 1rem;
  text-align: center;
}

.featured-title {
  margin: 0 0 1.5rem;
  text-align: center;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.content-padding {
  padding: 1rem;
  flex: 1;
}

@media screen and (min-width: 768px) {
  .content-padding {
    padding: 2rem;
  }
}
</style>
