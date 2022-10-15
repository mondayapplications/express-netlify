const _ = require("lodash");
const StatsCalculationService = require("./stats-calculation-service");
const {
  PERCENTAGE_CATEGORIES,
  SIMPLE_CATEGORIES,
} = require("../constants/stats-constants");

class StatsParserService {
  static parsePlayerBoxScore(categories, values) {
    let boxScore = {};
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const value = values[i];
      boxScore = { ...boxScore, ...this.parseCategory(category, value) };
    }

    boxScore["2PTA"] = _.subtract(boxScore.FGA, boxScore["3PTA"]);
    boxScore["2PTM"] = _.subtract(boxScore.FGM, boxScore["3PTM"]);
    boxScore["2PTP"] = _.round(
      _.divide(boxScore["2PTM"], boxScore["2PTA"]) || 0,
      2
    );

    return boxScore;
  }

  static parseCategory(category, value) {
    if (SIMPLE_CATEGORIES.includes(category)) {
      return { [category]: _.parseInt(value) || 0 };
    } else if (PERCENTAGE_CATEGORIES.includes(category)) {
      const values = _.split(value, "-");
      if (!_.isEmpty(values)) {
        const madeValue = _.parseInt(values[0]) || 0;
        const attemptsValue = values[1] || 0;
        const madeCategory = `${category}M`;
        const attemptsCategory = `${category}A`;
        const pctCategory = `${category}P`;
        const pctValue = _.round(_.divide(madeValue, attemptsValue) || 0, 2);
        const fixedCategory = `${pctCategory}FIXED`;
        const fixedValue = StatsCalculationService.convertPercentToFixed(
          attemptsValue,
          pctValue,
          pctCategory
        );
        return {
          [madeCategory]: madeValue,
          [attemptsCategory]: attemptsValue,
          [pctCategory]: pctValue,
          [fixedCategory]: fixedValue,
        };
      }
    }
    return {};
  }
}

module.exports = StatsParserService;
