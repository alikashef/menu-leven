
import axios from "axios";

export const BASE_URL = "https://admin.levenbakery.ir/api/";
export const BASE_URL_MEDIA = "https://admin.levenbakery.ir";

const Api = axios.create({
  baseURL: BASE_URL,

  headers: {
    Authorization:
      "Bearer 4c55b462d6caae44ce0214f0e8f8ac0d0da768d0435bddc6bc82c90d648f1e21b09ebc81127e1ebf536e08b078b1ba25838ffde527bbd4f51e929c65161763475778289f812c1772c5b823d6a9998d15c52cb3a455b9ed1ce89683863906c11bd8e9fef20a042aee4a1f09c00639c1a349ae50087766aca372606123384dddfe",
  },
});

export default Api;
