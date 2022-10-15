const _ = require("lodash");

class PlayerService {
  static serializePlayer(player, team) {
    const { id, fullName: name, displayHeight, position } = player;

    const serializedPlayer = {
      id,
      name,
      position: serializePosition(position.abbreviation),
      height: serializeHeight(displayHeight),
      team: team.abbreviation,
      health: "",
      image: "",
      image_credit: "",
      image_credit_url: "",
      extra_info: "",
    };

    return serializedPlayer;
  }
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
