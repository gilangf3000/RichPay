import axios, { AxiosInstance } from "axios"

interface RichPayOptions {
  baseURL?: string
  timeout?: number
}

interface CreatePaymentResponse {
  status: string
  data: {
    trx_id: string
    qr_link: string
    amount: number
  }
}

interface StatusResponse {
  status: string
  data: {
    trx_id: string
    payment_status: string
    amount: number
  }
}

interface CancelResponse {
  status: string
  message: string
  data: {
    trx_id: string
    new_status: string
  }
}

export default class RichPay {
  private apiKey: string
  private client: AxiosInstance

  constructor(apiKey: string, options?: RichPayOptions) {
    if (!apiKey) {
      throw new Error("apikey is required")
    }

    this.apiKey = apiKey

    this.client = axios.create({
      baseURL: options?.baseURL || "https://richmarket.my.id/api/v1",
      timeout: options?.timeout || 15000,
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json"
      }
    })
  }

  async createPayment(amount: number): Promise<CreatePaymentResponse> {
    const res = await this.client.post("/create_payment.php", { amount })
    return res.data
  }

  async checkStatus(trx_id: string): Promise<StatusResponse> {
    const res = await this.client.get("/get_status.php", {
      params: { trx_id }
    })
    return res.data
  }

  async cancelPayment(trx_id: string): Promise<CancelResponse> {
    const res = await this.client.post("/cancel_payment.php", { trx_id })
    return res.data
  }

  async checkID(code: string, id: string): Promise<string> {
    const res = await this.client.get("/cek_id.php", {
      params: { code, id },
      responseType: "text"
    })
    return res.data
  }
}