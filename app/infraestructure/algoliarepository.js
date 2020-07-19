import config from '../config'
import configClient from '../../services/config'
const algoliasearch = require("algoliasearch");

class AlgoliaRepository {
    constructor() {
        this.client = algoliasearch(config.algoliaApplicationID, config.algoliaSecret);
        this.index = this.client.initIndex("pizzas");
    }

    async add(id, pizza) {
        const objects = [
            {
                objectID: id,
                ...pizza
            }
        ];
        return this.index.saveObjects(objects)
    }
    async get({ text, page, pageRecords }) {
        return this.index.search(text || "", {
            page: page || 0,
            hitsPerPage: pageRecords || configClient.pageRecords
        });
    }
}

module.exports = new AlgoliaRepository();