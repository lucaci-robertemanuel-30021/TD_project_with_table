module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define("device", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    condition: {
      type: Sequelize.STRING
    },
    available: {
      type: Sequelize.STRING
    },
    in_stock: {
      type: Sequelize.STRING
    },
    warranty: {
      type: Sequelize.STRING
    },
    delivery_options: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Device;
};
