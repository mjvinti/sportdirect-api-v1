exports.applyAssociations = (sequelize) => {
  const { user, org, team } = sequelize.models;

  user.belongsTo(org, {
    constraints: true,
    targetKey: "id",
    foreignKey: "orgId",
    onDelete: "CASCADE",
    allowNull: false,
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
};
