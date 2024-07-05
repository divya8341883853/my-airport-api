import "reflect-metadata";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import Country from "./models/country";
import City from "./models/city";
import Airport from "./models/airport";
import sequelize from "./database";

const loadData = async () => {
  await sequelize.sync({ force: true }); // Drop and re-create tables

  // Load countries
  const countryFile = createInterface({
    input: createReadStream("data/country.tsv"),
  });

  for await (const line of countryFile) {
    const [
      id,
      name,
      country_code_two,
      country_code_three,
      mobile_code,
      continent_id,
    ] = line.split("\t");
    await Country.create({
      id: parseInt(id),
      name,
      country_code_two,
      country_code_three,
      mobile_code: parseInt(mobile_code),
      continent_id: parseInt(continent_id),
    });
  }

  // Load cities
  const cityFile = createInterface({
    input: createReadStream("data/city.tsv"),
  });

  for await (const line of cityFile) {
    const [id, name, country_id, is_active, lat, long] = line.split("\t");
    await City.create({
      id: parseInt(id),
      name,
      country_id: parseInt(country_id),
      is_active: is_active === "true",
      lat: parseFloat(lat),
      long: parseFloat(long),
    });
  }

  // Load airports
  const airportFile = createInterface({
    input: createReadStream("data/airport.tsv"),
  });

  for await (const line of airportFile) {
    const [
      id,
      icao_code,
      iata_code,
      name,
      type,
      latitude_deg,
      longitude_deg,
      elevation_ft,
      city_id,
    ] = line.split("\t");
    await Airport.create({
      id: parseInt(id),
      icao_code,
      iata_code,
      name,
      type,
      latitude_deg: parseFloat(latitude_deg),
      longitude_deg: parseFloat(longitude_deg),
      elevation_ft: parseInt(elevation_ft),
      city_id: parseInt(city_id),
    });
  }

  console.log("Data loaded successfully!");
};

loadData().catch((error) => {
  console.error("Error loading data: ", error);
});
