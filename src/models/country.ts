import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Country extends Model {
  public id!: number;
  public name!: string;
  public country_code_two!: string;
  public country_code_three!: string;
  public mobile_code!: number;
  public continent_id!: number;
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    country_code_two: DataTypes.STRING,
    country_code_three: DataTypes.STRING,
    mobile_code: DataTypes.INTEGER,
    continent_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Country",
  }
);

export default Country;
