
const axios = require('axios');
const { constructor } = require('sendgrid');

class NewsApi {

    apiKey = 'd8b897e905974a0d826ee8d4cf627403'
    languages = {
        ar: 'ar',
        de: 'de',
        en: 'en',
        es: 'es',
        fr: 'fr',
        he: 'he',
        it: 'it',
        nl: 'nl',
        no: 'no',
        pt: 'pt',
        ru: 'ru',
        se: 'se',
        ud: 'ud',
        zh: 'zh',
    };
    categories = {
        business: 'business',
        entertainment: 'entertainment',
        general: 'general',
        health: 'health',
        science: 'science',
        sports: 'sports',
        technology: 'technology'
    }
    domains = 'bbc.co.uk,techcrunch.com,engadget.com, google.com, bing.com';
    sources = "";
    endpoint = "https://newsapi.org/v2/everything?language=pt&sortBy=publishedAt&apiKey="+this.apiKey//+'&domains='+this.domains







    constructor(callback) {
        let host = this.endpoint + '&q=angola'
        console.log(host)
        axios.get(host, {})
            .then(callback)
            .catch(callback);
    }
}


module.exports = NewsApi