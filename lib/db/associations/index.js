exports.applyAssociations = (sequelize) => {
  const { league, user, org, team } = sequelize.models;

  league.belongsTo(org, {
    targetKey: "id",
    foreignKey: "orgId",
    onDelete: "CASCADE",
    allowNull: false,
  });
  org.hasMany(league);

  user.belongsTo(org, {
    constraints: true,
    targetKey: "id",
    foreignKey: "orgId",
    onDelete: "CASCADE",
    allowNull: true,
  });
  org.hasMany(user);

  user.belongsTo(team, {
    targetKey: "id",
    foreignKey: "teamId",
    allowNull: true,
  });
  team.hasMany(user);

  team.belongsTo(org, {
    targetKey: "id",
    foreignKey: "orgId",
    onDelete: "CASCADE",
    allowNull: false,
  });
  org.hasMany(team);

  team.belongsTo(league, {
    targetKey: "id",
    foreignKey: "leagueId",
    onDelete: "CASCADE",
    allowNull: false,
  });
  org.hasMany(league);
};
