import {Result} from "@/encyclopedia/domain/model/result.entity.js";

const encyclopediaApiUrl = import.meta.env.VITE_ENCYCLOPEDIA_API_URL;
const encyclopediaApiOrigin = new URL(encyclopediaApiUrl).origin;
/**
 * Infrastructure service that maps result data from API responses into Domain Entities.
 *
 * @remarks
 * Following DDD patterns, this assembler acts as a Data Mapper between the
 * infrastructure-specific result format and the Result domain entity.
 */
export class ResultAssembler {
    static toEntitiesFromResponse(response) {
        if (response?.status !== 200) {
            console.error(response?.statusText || "Unexpected API response status");
            return [];
        }

        const data = response?.data;
        const resources = Array.isArray(data) ? data
            : data?.results;

        if (!Array.isArray(resources)) {
            console.error('Invalid API response: results must be an array');
            return [];
        }

        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    static toEntityFromResource(resource = {}) {
        const imageUrl = resource.image_url
            ? new URL(
                resource.image_url.replace(/^\/+/, ""),
                "https://cdn.speciesfyi.com/"
            ).toString()
            : "";

        return new Result({
            ...resource,
            image_url: imageUrl
        });
    }
}
