const API_URL = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr";

export async function fetchCDRData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}