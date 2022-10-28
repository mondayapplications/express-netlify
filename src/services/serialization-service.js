const _ = require("lodash");

class SerializationService {
  static serializePlayer(player, team) {
    const { id, fullName: name, displayHeight, position } = player;

    const serializedPlayer = {
      id,
      name,
      position: this.serializePosition(position.abbreviation),
      height: this.serializeHeight(displayHeight),
      team: this.serializeTeamAbbreviation(team.abbreviation),
      health: "",
      image: "",
      image_credit: "",
      image_credit_url: "",
      extra_info: "",
    };

    return serializedPlayer;
  }

  static serializeGameLog(gameLog) {
    const { team, opp } = gameLog;

    const serializedGameLog = {
      ...gameLog,
      team: this.serializeTeamAbbreviation(team),
      opp: this.serializeTeamAbbreviation(opp),
    };

    return serializedGameLog;
  }

  static serializeTeamAbbreviation(team) {
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

  static serializePosition(position) {
    switch (position) {
      case "G":
        return "PG/SG";
      case "F":
        return "SF/PF";
    }
    return position;
  }

  static serializeHeight(height) {
    return height.replace("'", "").replace('"', "").replace(" ", "-");
  }
}

module.exports = SerializationService;
