import {
  PaginationContainer,
  PageButton,
  PageNumber,
} from "./pagination.styles.jsx";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <PageButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </PageButton>
      <PageNumber>
        {currentPage} / {totalPages}
      </PageNumber>
      <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
