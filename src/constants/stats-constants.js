const PERCENTAGE_CATEGORIES = ["FG", "3PT", "FT"];

const SIMPLE_CATEGORIES = [
  "MIN",
  "OREB",
  "DREB",
  "REB",
  "AST",
  "STL",
  "BLK",
  "TO",
  "PF",
  "+/-",
  "PTS",
];

const DFS_RATIO = {
  PTS: 1,
  AST: 1.5,
  BLK: 3,
  STL: 3,
  REB: 1.2,
  TO: -1,
};

const ROTO_8CAT_RATIO = {
  PTS: 1.333, //1
  AST: 4.579,
  STL: 14.293,
  BLK: 20.0,
  REB: 2.598,
  "3PTM": 10.833,
  FGPFIXED: 2.724,
  FTPFIXED: 5.762,
};

const ROTO_9CAT_RATIO = {
  ...ROTO_8CAT_RATIO,
  TO: -8.024,
};

const PCT_BOUNDS = {
  "3PTP": { MIN: 0.364, MAX: 0.48 },
  FGP: { MIN: 0.458, MAX: 0.59 },
  FTP: { MIN: 0.782, MAX: 1.0 },
};

const PERFORMANCE_THRESHOLDS = {
  DFS: {
    GOOD: 25,
    GREAT: 40,
    BEST: 50,
  },
  ROTO9: {
    GOOD: 60,
    GREAT: 80,
    BEST: 100,
  },
};

module.exports = {
  PERCENTAGE_CATEGORIES,
  SIMPLE_CATEGORIES,
  DFS_RATIO,
  ROTO_8CAT_RATIO,
  ROTO_9CAT_RATIO,
  PCT_BOUNDS,
  PERFORMANCE_THRESHOLDS,
};
