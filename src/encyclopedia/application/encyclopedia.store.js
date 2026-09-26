import {EncyclopediaApi} from "@/encyclopedia/infrastructure/encyclopedia-api.js";
import {ResultAssembler} from "@/encyclopedia/infrastructure/result.assembler.js";
import {reactive} from "vue";

const encyclopediaApi = new EncyclopediaApi();
const resultAssembler = new ResultAssembler();
/**
 * Reactive application store that coordinates use cases for encyclopedia management.
 *
 * @remarks
 * In DDD, this serves as an Encyclopedia Service, managing the interaction
 * between UI components and infrastructure-driven data acquisition.
 *
 * @type {encyclopediaStore}
 */
export const encyclopediaStore = reactive({
    results: [],
    errors: [],
    currentResult: null,

    async loadResults() {
        this.errors = [];
        try {
            const response = await encyclopediaApi.getFeaturedSpecies();
            this.results = ResultAssembler.toEntitiesFromResponse(response);
            this.currentResult = this.results[0] || null;
            return this.results;
        } catch(message) {
            this.errors.push(message);
            this.results = [];
            this.currentResult = null;
            return [];
        }
    },
    setCurrentResult(result) {
        this.currentResult = result;
    }
});
