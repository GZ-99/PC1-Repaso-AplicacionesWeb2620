<script setup>
import ResultItem from "./result-item.vue";

const props = defineProps({
  results: {
    type: Array,
    required: true,
    default: () => []
  }
});
const emit = defineEmits(["result-shared"]);
const handleResultShared = (resultId) => {
  emit("result-shared", resultId);
}
</script>

<template>
  <div class="results-grid">
  <div
      v-for="result in props.results"
      :key="result.getId()"
      class="result-column">
    >
    <result-item
        :result="result"
        @result-shared="handleResultShared"/>
    </div>
  </div>
</template>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  width: 100%;
}

.result-column {
  min-width: 0;
}

:deep(.p-card) {
  height: 100%;
  margin: 0 !important;
}

@media screen and (max-width: 600px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
