import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilterListIcon from '@mui/icons-material/FilterList';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function EnhancedTable() {
  const [columns, setColumns] = useState([
    { id: 'name', label: 'Dessert (100g serving)', numeric: false },
    { id: 'calories', label: 'Calories', numeric: true },
    { id: 'fat', label: 'Fat (g)', numeric: true },
    { id: 'carbs', label: 'Carbs (g)', numeric: true },
    { id: 'protein', label: 'Protein (g)', numeric: true },
  ]);

  const [rows, setRows] = useState([
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedColumns = reorder(
      columns,
      result.source.index,
      result.destination.index
    );
    setColumns(reorderedColumns);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Nutrition Table
          </Typography>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <TableHead>
                <Droppable droppableId="columns" direction="horizontal">
                  {(provided) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {columns.map((column, index) => (
                        <Draggable
                          key={column.id}
                          draggableId={column.id}
                          index={index}
                        >
                          {(provided) => (
                            <TableCell
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              align={column.numeric ? 'right' : 'left'}
                              sx={{
                                cursor: 'grab',
                                backgroundColor: '#f9f9f9',
                              }}
                            >
                              {column.label}
                            </TableCell>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableRow>
                  )}
                </Droppable>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.name}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.numeric ? 'right' : 'left'}
                        >
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </DragDropContext>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default EnhancedTable;
