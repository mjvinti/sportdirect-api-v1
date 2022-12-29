exports.applyAssociations = (sequelize) => {
  const { user, org } = sequelize.models;

  user.belongsTo(org, {
    constraints: true,
    targetKey: "id",
    foreignKey: "orgId",
    onDelete: "CASCADE",
    allowNull: false,
  });
};
