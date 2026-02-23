import axios from "axios";

class RichPay {
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error("RichPay: API key is required");
    }

    this.apiKey = apiKey;

    this.client = axios.create({
      baseURL: options.baseURL || "https://richmarket.my.id/api/v1",
      timeout: options.timeout || 15000,
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    });
  }

  async createPayment(amount) {
    const res = await this.client.post("/create_payment.php", { amount });
    return res.data;
  }

  async checkStatus(trx_id) {
    const res = await this.client.get("/get_status.php", {
      params: { trx_id }
    });
    return res.data;
  }

  async cancelPayment(trx_id) {
    const res = await this.client.post("/cancel_payment.php", { trx_id });
    return res.data;
  }

  async checkID(code, id) {
    const res = await this.client.get("/cek_id.php", {
      params: { code, id },
      responseType: "text"
    });
    return res.data;
  }
}

export default RichPay;