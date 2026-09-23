<script setup>
import ResultItem from "./result-item.vue";
import {Result} from "@/encyclopedia/domain/model/result.entity.js";

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
  <div
      v-for="result in props.results"
      :key="result.getId()">
    <result-item
        :result="result"
        @result-shared="handleResultShared"/>
  </div>
</template>

<style scoped>

</style>
