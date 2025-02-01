export default async function handler(req, res) {
    const { country } = req.query;
  
    if (!country) {
      return res.status(400).json({ error: "Country name is required" });
    }
  
    const API_KEY = "ZzIzSTA5TEJnWUVFakFRY3lhT0FubVE4ZmNzdDNNY0ZlcTBCM1ppTg==";
    const url = `https://api.countrystatecity.in/v1/countries/${country}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
      const { latitude, longitude } = data;
  
      return res.status(200).json({ latitude, longitude });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch coordinates" });
    }
  }
  