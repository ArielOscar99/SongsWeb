/**
 * src/services/api.ts
 *
 * Axios instance for API calls to the backend.
 * Change baseURL if your backend runs elsewhere.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // backend address
  timeout: 10000,
});

export default api;
