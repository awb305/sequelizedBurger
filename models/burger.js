module.exports = function(sequelize, DataTypes) {
  let Burgers = sequelize.define("Burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    }
  });


  return Burgers;


}




