import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from "@material-ui/core/TextField";


import FilterListIcon from "@material-ui/icons/FilterList";
import { useDispatch } from "react-redux";

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
  {id: "description",numeric: false,disablePadding: false,label: "Ingredients"},
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  // { id: "edit", numeric: true, disablePadding: false, label: "Edit" },

];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="15">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all ingredients" }}
          /> */}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     color: "black",
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;
//   const { rowIndexToDel } = props;
//   const { delFunc } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {/* {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           //   color="black"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} item selected
//         </Typography>
//       ) : // Need to change this
//       <Typography
//         className={classes.title}
//         variant="h6"
//         id="tableTitle"
//         component="div"
//       >
//         Nutrition
//       </Typography>
//       null} */}

//       {/* {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton
//             aria-label="delete"
//             onClick={() => {
//               delFunc({ rowIndexToDel });
//             }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : // need to change this
//       <Tooltip title="Filter list">
//         <IconButton aria-label="filter list">
//           <FilterListIcon />
//         </IconButton>
//       </Tooltip>
//       null} */}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

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
}));

// {
//     props.inventory &&
//       props.inventory.map((item) => {
//         // rows.push(createData(item.description, item.amount, item.category));

//         createData(String(item.description), item.amount, item.category);
//         console.log(item.description, item.amount, item.category);
//         //   <div>
//         //     {item.description}
//         //     {item.amount}
//         //     {item.category}
//         //   </div>
//       });
//   }

let amountEdit=0


export default function IngredientInventoryTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("category");
  const [selected, setSelected] = React.useState([]);
  const [selectedEdit, setSelectedEdit] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isRowSelected, setIsRowSelected] = React.useState(false);

  const rows = props.inventory;
  // const delFunc = props.onDelete;
  //   console.log("ori ", JSON.stringify(props.inventory));
  //   console.log("del func ", JSON.stringify(delFunc));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.description);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
    amountEdit = event.target.value
    console.log(amountEdit)
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar
          numSelected={selected.length}
         
        /> */}
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
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
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
                      onClick={(event) =>
                       { handleClickDescription(event, row.description, row.key)
                        handleClickKey(event, row.key, row.key)}
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.description}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" padding="15">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        // id={labelId}
                        // scope="row"
                        padding="20"
                        marginLeft="20"
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="right" style={{ marginRight: 20 }}>
                        {row.amount}
                      </TableCell>

                      {/* {edit ? (
                      <TableCell component="th" scope="row" align="center">
                          <TextField
                            // label="Amount"
                            // variant="filled"
                            type="text"
                            id = {`amountEdit-${index}`}
                            style={{ width: 100 }}
                            //   name="fname"
                          />

                          <IconButton aria-label="add">
                            <AddIcon
                              onClick={() => {
                                props.onEdit([row.description],Number(document.getElementById(`amountEdit-${index}`).value));
                               }}
                            />

                          </IconButton>

                          <IconButton aria-label="remove">

                            <RemoveIcon
                              onClick={() => {
                                props.onEdit([row.description],-Number(document.getElementById(`amountEdit-${index}`).value));
                               }}
                            />

                          </IconButton>

                        <IconButton aria-label="delete">

                            <DeleteIcon
                              onClick={() => {
                                 props.onDelete([row.key]);
                              }}
                            />
                          </IconButton>

                          
                        </TableCell>

                      ) : null} */}

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

                          <TextField
                            type="text"
                            id="amountEdit"
                            style={{ width: 100 }}
                            onChange={handleChangeEdit}
                          />

                          <IconButton aria-label="add">
                            <AddIcon
                              onClick={() => {
                                props.onEdit(selected,Number(amountEdit))
                               }}
                            />

                          </IconButton>

                          <IconButton aria-label="remove">

                            <RemoveIcon
                              onClick={() => {
                                props.onEdit(selected,-Number(amountEdit))
                               }}
                            />

                          </IconButton>

                        <IconButton aria-label="delete">

                            <DeleteIcon
                              onClick={() => {
                                props.onDelete(selectedEdit)
                              }}
                            />
                          </IconButton>
        {/* <div
          className={classes.toggleEdit}
          style={{ marginLeft: 10, float: "left" }}
        >
          <FormControlLabel
            control={<Switch checked={edit} onChange={handleChangeEdit} />}
            label="Edit mode"
          />
        </div> */}

        <div
          className={classes.toggleDense}
          style={{ marginLeft: 10, float: "left" }}
        >
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
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
