import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const WooCommerceAPI = axios.create({
    baseURL: 'https://auction.nyelizabeth.com/wp-json/wc/v3',
    auth: {
      username: process.env.WC_CONSUMER_KEY,  // Use environment variables
      password: process.env.WC_CONSUMER_SECRET,
    },
  });

  try {
    const response = await WooCommerceAPI.get('/products', {
      params: { per_page: 10 },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('WooCommerce API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
