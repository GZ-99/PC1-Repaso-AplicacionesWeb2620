import {StringValidator} from "@/shared/domain/model/string-validator.js";
import {Url} from "@/shared/domain/model/url.js";

export class Result {
    constructor({id = 0, scientific_name = '', common_name = '',
                    slug = '', genus_slug = '', conservation_status = '',
                    diet = '', image_url = '', is_featured = false} = {}) {
        if (!StringValidator.isNotEmptyString(scientific_name))
            throw new Error('Scientific name must be a non-empty string');
        if (!StringValidator.isNotEmptyString(common_name))
            throw new Error('Common name must be a non-empty string');
        this.image_url = image_url instanceof Url
            ? image_url
            : new Url(image_url);
        this.id = id;
        this.scientific_name = scientific_name;
        this.common_name = common_name;
        this.slug = slug;
        this.genus_slug = genus_slug;
        this.conservation_status = conservation_status;
        this.diet = diet;
        this.is_featured = is_featured;
    }


    getId() {
        return this.id;
    }

    getScientific_name() {
        return this.scientific_name;
    }

    getCommon_name() {
        return this.common_name;
    }

    getSlug() {
        return this.slug;
    }

    getGenus_slug() {
        return this.genus_slug;
    }

    getConservation_status() {
        return this.conservation_status;
    }

    getDiet() {
        return this.diet;
    }

    getImage_url() {
        return this.image_url;
    }

    getIs_featured() {
        return this.is_featured;
    }
}
