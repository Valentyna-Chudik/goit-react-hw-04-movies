import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      '& .MuiPaginationItem-root': {
        color: '#e5e5e5',
        textShadow: '1px 3px 2px rgb(0 0 0 / 40%)',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        backgroundColor: '#2371b1',
      },
    },
  },
}));

export default function PaginationList({ page, totalPages, handleChange }) {
  const classes = useStyles();
  return (
    <>
      {totalPages > 1 && (
        <Pagination
          className={classes.root}
          page={page}
          count={totalPages}
          onChange={handleChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
}
