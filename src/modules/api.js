import mainSearchResults from "../../data/main-search-results";
import categoriesData from "../../data/categories";
import brandsData from "../../data/brands";
import brandnewData from "../../data/brandnew-products";
import topsellerData from "../../data/topseller-products";
import productsData from "../../data/products";

const fakeRequest = (data, ms = 1500) => new Promise(resolve => setTimeout(() => resolve(data), ms));
const getResultWithTotal = (result, total) => ({ records: result, total });
const shuffleResult = data =>
  data
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const api = {
  products: params =>
    fakeRequest(productsData, 2500).then(res => getResultWithTotal(shuffleResult(res), res.length * 16)),
  mainSearch: query =>
    fakeRequest(mainSearchResults).then(res =>
      res.filter(
        row =>
          String(row.title)
            .toLowerCase()
            .indexOf(query.toLowerCase()) >= 0
            ? row
            : false
      )
    ),
  catalog: () => fakeRequest(categoriesData),
  brands: () => fakeRequest(brandsData),
  brandnew: () => fakeRequest(brandnewData).then(res => getResultWithTotal(shuffleResult(res), res.length * 3)),
  topseller: () => fakeRequest(topsellerData).then(res => getResultWithTotal(shuffleResult(res), res.length * 3))
};

export default api;
