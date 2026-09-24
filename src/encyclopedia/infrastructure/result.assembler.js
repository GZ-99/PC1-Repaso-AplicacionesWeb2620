import {Result} from "@/encyclopedia/domain/model/result.entity.js";

const encyclopediaApiUrl = import.meta.env.VITE_ENCYCLOPEDIA_API_URL;
const encyclopediaApiOrigin = new URL(encyclopediaApiUrl).origin;

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
