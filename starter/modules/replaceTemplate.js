module.exports = (card, tempCard) => {
  let output = tempCard
    .replaceAll("{%ID%}", card.id)
    .replaceAll("{%IMAGE%}", card.image)
    .replaceAll("{%PRODUCT_NAME%}", card.productName)
    .replaceAll("{%FROM%}", card.from)
    .replaceAll("{%NUTRIENTS%}", card.nutrients)
    .replaceAll("{%IS_NOT_ORGANIC%}", card.organic ? "" : "not-organic")
    .replaceAll("{%QUANTITY%}", card.quantity)
    .replaceAll("{%PRICE%}", card.price)
    .replaceAll("{%DESCRIPTION%}", card.description);
  return output;
};
