import axios from 'axios'

type RequestCodeReponse = {
  expires: string;
  codes: string[];
};

export async function generateCodes(count: number) {
  const r = await axios.post<RequestCodeReponse>("/api/request-codes", { count })
  return {
    expires: new Date(r.data.expires),
    codes: r.data.codes,
  }
}
