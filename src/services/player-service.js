const _ = require("lodash");

class PlayerService {
  static serializePlayer(player, team) {
    const { id, fullName: name, displayHeight, position } = player;

    const serializedPlayer = {
      id,
      name,
      position: serializePosition(position.abbreviation),
      height: serializeHeight(displayHeight),
      team: serializeTeamAbbreviation(team.abbreviation),
      health: "",
      image: "",
      image_credit: "",
      image_credit_url: "",
      extra_info: "",
    };

    return serializedPlayer;
  }
}

function serializeTeamAbbreviation(team) {
  switch (team) {
    case "SA":
      return "SAS";
    case "GS":
      return "GSW";
    case "PHX":
      return "PHO";
    case "UTAH":
      return "UTA";
    case "NY":
      return "NYK";
    case "NO":
      return "NOP";
    case "WSH":
      return "WAS";
  }
  return team;
}

function serializePosition(position) {
  switch (position) {
    case "G":
      return "PG/SG";
    case "F":
      return "SF/PF";
  }
  return position;
}

function serializeHeight(height) {
  return height.replace("'", "").replace('"', "").replace(" ", "-");
}

module.exports = PlayerService;
