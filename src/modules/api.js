import mainSearchResults from "../../data/main-search-results";
import categoriesData from "../../data/categories";
import brandsData from "../../data/brands";
import brandnewData from "../../data/brandnew-products";
import topsellerData from "../../data/topseller-products";

const fakeRequest = data => new Promise(resolve => setTimeout(() => resolve(data), 1000));

const api = {
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
  brandnew: () => fakeRequest(brandnewData),
  topseller: () => fakeRequest(topsellerData)
};

export default api;
