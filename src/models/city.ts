import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import Country from "./country";

class City extends Model {
  public id!: number;
  public name!: string;
  public country_id!: number;
  public is_active!: boolean;
  public lat!: number;
  public long!: number;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "City",
  }
);

City.belongsTo(Country, { foreignKey: "country_id" });

export default City;
