exports.applyAssociations = (sequelize) => {
  const { user, org } = sequelize.models;

  org.hasMany(user, { foreignKey: "adminId" });
  user.belongsTo(org, {
    constraints: true,
    foreignKey: "orgId",
    onDelete: "CASCADE",
  });
};
