const API_URL  = "https://zippy-freedom-production.up.railway.app";

export async function getBackendMessage() {
  const response = await fetch(`${API_URL}/api/message`);

  if (!response.ok) {
    throw new Error("Failed to connect to backend");
  }

  return response.json();
}