import Pagination from "react-bootstrap/Pagination";

function Paging({ categoryData, fetchCategory }) {
  const totalPages =
    categoryData.list !== undefined && categoryData.navigatepageNums.length > 0
      ? categoryData.navigatepageNums.length
      : 0;

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === categoryData.pageNum}
        onClick={() => fetchCategory(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="pb-5">
      <Pagination.First
        onClick={() => fetchCategory(categoryData.navigateFirstPage)}
      />
      <Pagination.Prev
        onClick={() =>
          fetchCategory(categoryData.isFirstPage ? 1 : categoryData.prePage)
        }
      />
      {items}
      <Pagination.Next
        onClick={() =>
          fetchCategory(
            categoryData.isLastPage ? categoryData.pages : categoryData.nextPage
          )
        }
      />
      <Pagination.Last
        onClick={() => fetchCategory(categoryData.navigateLastPage)}
      />
    </Pagination>
  );
}

export default Paging;
