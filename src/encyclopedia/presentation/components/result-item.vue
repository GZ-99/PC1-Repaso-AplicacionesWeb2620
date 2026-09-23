<script setup>
import {useI18n} from "vue-i18n";
import {Result} from "@/encyclopedia/domain/model/result.entity.js";

const {t} = useI18n();

const props = defineProps({
  result: {
    type: Result,
    required: true
  }
});

const emit = defineEmits(['result-shared']);

const shareResult = async () => {
  const result = props.result;
  const resultId = result.getId().toString();
  const slug = result.getSlug();

  const shareData = {
    title: result.getCommon_name(),
    text: `${result.getCommon_name()} (${result.getScientific_name()})`,
    url: slug
        ? `https://speciesfyi.com/species/${slug}`
        : undefined
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(resultId);
    } else {
      throw new Error("Clipboard API is not available");
    }
    emit("result-shared", resultId);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error sharing the result: ", error);
    }
  }
};
</script>

<template>
  <pv-card class="m-2">
    <template #header>
      <img
          v-if="!result.image_url.isEmpty()"
          :alt="result.getScientific_name()"
          :src="result.image_url.toString()"
          class="image-fit"
      />
    </template>

    <template #title>
      <p class="flex align-content-start flex-wrap">
        {{ result.getScientific_name() }}
      </p>
    </template>

    <template #subtitle>
      <div class="flex flex-column gap-2">
        <p class="flex align-content-start flex-wrap cursor-pointer">
          <span class="flex align-items-center justify-content-center mr-2">
            <pv-avatar :aria-label="result.common_name"
                       :image="result.getImage_url().toString()"
                       shape="circle"/>
          </span>
          <span>{{ result.getCommon_name() }}</span>
        </p>
      </div>
    </template>

    <template #content>
      <p class="flex align-content-start flex-wrap mt-4">
        {{ t('card.about-info') }}
      </p>
      <p>
        Slug: {{ result.getSlug() }}<br/>
        Genus Slug: {{ result.getGenus_slug() }}<br/>
        {{ t('card.conservation-info') }}: {{ result.getConservation_status() }}<br/>
        {{ t('card.diet-info') }}: {{ result.getDiet() }}
      </p>
    </template>

    <template #footer>
      <div class="flex justify-content-between align-items-center">
        <pv-button
            v-if="result.slug"
            as="a"
            :href="`https://speciesfyi.com/species/${result.slug}`"
            target="_blank"
            :label="t('card.more-info')"
            link
            class="p-0"
        />
        <pv-button
            v-tooltip.top="t('card.share-info')"
            :label="t('card.share-info')"
            aria-label="Share Information"
            text
            size="small"
            icon="pi pi-share-alt"
            @click="shareResult"
        />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.image-fit {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
