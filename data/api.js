import mainSearchResults from "./main-search-results";

const fakeRequest = data => new Promise(resolve => setTimeout(() => resolve(data), 1000));

const api = {
  mainSearch: query =>
    fakeRequest(mainSearchResults).then(res =>
      res.filter(
        row =>
          String(row.title)
            .toLowerCase()
            .indexOf(query) >= 0
            ? row
            : false
      )
    )
};

export default api;
