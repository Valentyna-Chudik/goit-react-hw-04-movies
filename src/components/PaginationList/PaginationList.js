import { Pagination } from '@material-ui/lab';

export default function PaginationList({ page, totalPages, handleChange }) {
  return (
    <>
      {totalPages > 1 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={handleChange}
          color="primary"
          size="large"
        />
      )}
    </>
  );
}
