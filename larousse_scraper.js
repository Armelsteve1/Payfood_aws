const axios = require('axios');
const cheerio = require('cheerio');

async function extractFirstNames() {

    try {
        const response = await axios.get('https://fr.wiktionary.org/wiki/Cat%C3%A9gorie:Pr%C3%A9noms_mixtes_en_fran%C3%A7ais');
        const $ = cheerio.load(response.data);

        const firstNames = {};

        $('div.mw-category-group a').each((index, element) => {

            const name = $(element).text().trim();

            if (name.match(/^[A-Za-z][A-Za-z]*$/)) {

                const firstLetter = name.charAt(0).toUpperCase();
                if (!firstNames[firstLetter]) {
                    firstNames[firstLetter] = name;
                }

            }

        });

        return firstNames;
    } catch (error) {
        console.error('Error while extracting first names', error);
    }
}

extractFirstNames().then((firstNames) => {
    console.log('Firstnames extracted', firstNames);
});


async function extractCitiesByLetter(letter) {
    try {
        const url = `https://www.linternaute.com/ville/index/villes/${letter}/`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const cities = [];

        $('ul.list--2colcount.list--bullet > li > a').each((index, element) => {
            if (cities.length >= 5) return false;
            const city = $(element).text().trim();
            cities.push(city);
        });

        return cities;
    } catch (error) {
        console.error(`Error while extracting cities starting with letter ${letter}`, error);
        return [];
    }
}



async function extractAllFrenchCities() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const allCities = {};

    for (const letter of alphabet) {
        const cities = await extractCitiesByLetter(letter);
        allCities[letter.toUpperCase()] = cities;
    }

    return allCities;
}

extractAllFrenchCities().then((allCities) => {
    console.log('French cities extracted:', allCities);
});
