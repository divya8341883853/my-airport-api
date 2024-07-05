import express from "express";
import sequelize from "./database";
import Country from "./models/country";
import City from "./models/city";
import Airport from "./models/airport";

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.get("/airport", async (req, res) => {
  const { iata_code } = req.query;
  try {
    const airport = await Airport.findOne({
      where: { iata_code },
      include: {
        model: City,
        include: [Country],
      },
    });

    if (!airport) {
      return res.status(404).json({ error: "Airport not found" });
    }

    res.json({
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: {
            id: airport.city.id,
            name: airport.city.name,
            country_id: airport.city.country_id,
            is_active: airport.city.is_active,
            lat: airport.city.lat,
            long: airport.city.long,
          },
          country: airport.city.country,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
