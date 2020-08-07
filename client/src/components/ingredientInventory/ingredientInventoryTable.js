import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Ingredients",
  },
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
        <TableRow>
          <TableCell padding="15">
          </TableCell>
          {headCells.map((headCell) => (
              <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                >
                  <b>{headCell.label}</b>
                  {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  editAmountPanel: {
    display: "inline-block",
    float: "center",
    marginTop: 35,
  },
  toggleDense: {
    marginLeft: 10,
    float: "left",
    marginTop: 35,
  },
}));


let amountEdit = 0;

export default function IngredientInventoryTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("category");
  const [selected, setSelected] = React.useState([]);
  const [selectedEdit, setSelectedEdit] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isRowSelected, setIsRowSelected] = React.useState(false);

  const rows = props.inventory;


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };



  const handleClickDescription = (event, name, rowIndex) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    setIsRowSelected(!isRowSelected);
    console.log("rowIndex: ", JSON.stringify(rowIndex));

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleClickKey = (event, name, rowIndex) => {
    const selectedIndex = selectedEdit.indexOf(name);
    let newSelected = [];

    setIsRowSelected(!isRowSelected);
    console.log("rowIndex: ", JSON.stringify(rowIndex));

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedEdit, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedEdit.slice(1));
    } else if (selectedIndex === selectedEdit.length - 1) {
      newSelected = newSelected.concat(selectedEdit.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selectedEdit.slice(0, selectedIndex),
          selectedEdit.slice(selectedIndex + 1)
      );
    }

    setSelectedEdit(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeEdit = (event) => {
    amountEdit = event.target.value;
    console.log(amountEdit);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
                style={{ borderStyle: "hidden" }}
            >
              <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.description);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                          <TableRow
                              hover
                              onClick={(event) => {
                                handleClickDescription(event, row.description, row.key);
                                handleClickKey(event, row.key, row.key);
                              }}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.description}
                              selected={isItemSelected}
                          >
                            <TableCell padding="15">
                              <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                  color="primary"
                              />
                            </TableCell>
                            <TableCell
                                component="th"
                                padding="20"
                                marginLeft="20"
                            >
                              {row.description}
                            </TableCell>
                            <TableCell align="left">{row.category}</TableCell>
                            <TableCell align="right" style={{ marginRight: 20 }}>
                              {row.amount}
                            </TableCell>
                          </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 50 : 70) * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>


          <div className={classes.toggleDense}>
            <FormControlLabel
                control={
                  <Switch
                      color="primary"
                      checked={dense}
                      onChange={handleChangeDense}
                  />
                }
                label="Dense padding"
            />
          </div>

          <div className={classes.editAmountPanel}>
            <Tooltip title="Enter amount" arrow>
              <TextField
                  type="text"
                  id="amountEdit"
                  style={{ width: 100 }}
                  onChange={handleChangeEdit}
              />
            </Tooltip>
            <Tooltip title="Add amount to selected items">
              <IconButton aria-label="add">
                <AddIcon
                    onClick={() => {
                      props.onEdit(selected, Number(amountEdit));
                    }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Subtract amount from selected items">
              <IconButton aria-label="remove">
                <RemoveIcon
                    onClick={() => {
                      props.onEdit(selected, -Number(amountEdit));
                    }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete selected items">
              <IconButton aria-label="delete">
                <DeleteIcon
                    onClick={() => {
                      props.onDelete(selectedEdit);
                    }}
                />
              </IconButton>
            </Tooltip>
          </div>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
  );
}