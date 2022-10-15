const _ = require("lodash");
const pluralize = require("pluralize");
const {
  AMAZING_GAME_TEMPLATE,
} = require("../constants/game-recap-templates-constants");
const { THESAURUS_TREE } = require("../constants/thesaurus-constants");

class GameRecapsService {
  static recapGame({ playerName, boxScore }) {
    return generateBasicRecap({ playerName, boxScore });
  }
}

function generatePhrase(category, value) {
  if (THESAURUS_TREE[category] && value > 0) {
    const categoryName = _.sample(THESAURUS_TREE[category]);
    return pluralize(categoryName, value, true);
  }
}

function generateBasicRecap({ playerName, boxScore }) {
  const statsPhrases = [];
  for (const category of Object.keys(THESAURUS_TREE)) {
    const value = boxScore[category];
    const phrase = generatePhrase(category, value);
    if (phrase) {
      statsPhrases.push(phrase);
    }
  }

  return `${playerName} (${statsPhrases.join(", ")})`;
}

module.exports = GameRecapsService;
