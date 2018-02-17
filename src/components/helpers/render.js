export const currencySymbol = code => {
  switch (code) {
    case "EUR":
      return "€";
    default:
      return "$";
  }
};
