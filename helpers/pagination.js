module.exports = (objectPagination, query, countProduts) => {
  // Pagination

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  console.log(objectPagination.currentPage);

  objectPagination.skipPages =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;
  //  Math chia so san pham va so trang
  const totalPages = Math.ceil(countProduts / objectPagination.limitItems);
  objectPagination.toltalPage = totalPages;
  return objectPagination;
};
