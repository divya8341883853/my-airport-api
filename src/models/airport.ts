import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import City from "./city";

class Airport extends Model {
  public id!: number;
  public icao_code!: string;
  public iata_code!: string;
  public name!: string;
  public type!: string;
  public latitude_deg!: number;
  public longitude_deg!: number;
  public elevation_ft!: number;
  public city_id!: number;
}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    icao_code: DataTypes.STRING,
    iata_code: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    latitude_deg: DataTypes.FLOAT,
    longitude_deg: DataTypes.FLOAT,
    elevation_ft: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Airport",
  }
);

Airport.belongsTo(City, { foreignKey: "city_id" });

export default Airport;
