import { GoogleGenerativeAI } from "@google/generative-ai";

// API key environment variable se access karein
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);

// Model ko yahan configure karein taake baar baar na karna paray
// Hum sab se tez model aur JSON response format istemal kar rahe hain
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview", // Sab se tez aur latest model
  generationConfig: {
    responseMimeType: "application/json" // Tez response ke liye JSON format
  },
});

class ComparisonService {
  async comparePrices(productName) {
    const prompt = `
      You are a price comparison expert for Karachi, Pakistan. 
      Find the current price of "${productName}" at these specific stores: Imtiaz Super Market, Naheed Super Market, Chase Up, Bin Hashim, and Metro Pakistan.
      
      Return a JSON object with the following structure:
      {
        "productQuery": "${productName}",
        "prices": [
          {
            "martName": "Store Name",
            "productName": "Exact product name found",
            "price": 1234,
            "currency": "PKR",
            "url": "Product URL",
            "availability": "In Stock"
          }
        ],
        "summary": "A brief 2-3 sentence summary of which mart offers the best value and why.",
        "groundingSources": [
          {
            "title": "Source Website Title",
            "uri": "URL of the website you used"
          }
        ]
      }
      
      If a price is not found for a store, do not include it in the 'prices' array.
      Ensure the price is a number, not a string. Do not add any text or markdown before or after the JSON object.
    `;

    try {
      const result = await model.generateContent(prompt, {
        tools: [{ googleSearch: {} }],
      });
      const response = result.response;
      const text = response.text();

      const parsedJson = JSON.parse(text);

      // Sort prices and find the cheapest
      const sortedPrices = [...parsedJson.prices].sort((a, b) => a.price - b.price);
      parsedJson.prices = sortedPrices;
      parsedJson.cheapest = sortedPrices[0] || null;

      return parsedJson;

    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to fetch prices from AI. Please check your API key and network.");
    }
  }
}

export const comparisonService = new ComparisonService();
