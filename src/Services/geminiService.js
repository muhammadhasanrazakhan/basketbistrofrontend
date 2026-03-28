import API from "../api";

class ComparisonService {
  async comparePrices(productName) {
    try {
      const { data } = await API.post("/api/bb/compare-prices", { productName });
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Failed to fetch prices");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to fetch prices from AI. Please check your network or server logs.");
    }
  }
}

export const comparisonService = new ComparisonService();
