/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  TextField,
  IconButton,
  ListItemButton,
  ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseURL from 'utils/authAxios';

const ItemTable = ({ rows, setRows, setTotalAmount, totalAmount }) => {
  const handleAddRow = () => {
    setRows([...rows, { item: '', qty: 0, unit: 'NONE', price: 0, taxpercent: 0, amount: 0 }]);
  };
  const [units, setUnits] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [gst, setGst] = useState([]);
  console.log('rows', rows);

  console.log('materials', materials);

  const handleDeleteRow = (index) => {
    setRows(rows.filter((row, i) => i !== index));
  };

  const calculateAmount = (row) => {
    const price = parseFloat(row.price || 0);
    const qty = parseInt(row.qty || 0, 10);
    const gstId = row.taxpercent; // This holds the selected GST ID
    const taxPercent = gst.find((g) => g.gst_id === gstId)?.igst || 0; // Get the corresponding percentage

    const taxAmount = (price * qty * taxPercent) / 100;
    return price * qty + taxAmount;
  };

  const handleFieldChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === 'item') {
      const material = materials.find((m) => m.material_id === value);
      if (material) {
        newRows[index].unit = material.unit_id;
        newRows[index].taxpercent = material.gst_id;
        newRows[index].price = material.price;
      }
    }
    // Recalculate the amount after any field change (qty, price, tax)
    newRows[index].amount = calculateAmount(newRows[index]);
    setRows(newRows);
  };

  const handleTaxChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].taxpercent = value;
    // Recalculate the amount after tax percent change
    newRows[index].amount = calculateAmount(newRows[index]);
    setRows(newRows);
  };

  useEffect(() => {
    const totalAmount = rows.reduce((total, row) => total + row.amount, 0).toFixed(2);
    setTotalAmount(totalAmount);
  }, [rows, setTotalAmount]);

  const isItemDisabled = (itemId) => {
    return rows.some((row) => row.item === itemId); // Check if itemId is already selected
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await BaseURL.get('api/units');
        if (response.data.data) {
          setUnits(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetctMaterials = async () => {
      try {
        const response = await BaseURL.get('api/materials');
        if (response.data.data) {
          setMaterials(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGst = async () => {
      try {
        const response = await BaseURL.get('api/gst');
        if (response.data.data) {
          setGst(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGst();
    fetctMaterials();
    fetchUnits();
  }, []);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Price/Unit</TableCell>
            <TableCell>GST</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select
                  value={row.item}
                  onChange={(e) => handleFieldChange(index, 'item', e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  style={{ width: '200px' }}
                >
                  <MenuItem>
                    <ListItemButton>
                      <ListItemText primary="+ Add Category" />
                    </ListItemButton>
                  </MenuItem>
                  {materials
                    .sort((a, b) => a.material_name.localeCompare(b.material_name))
                    .map((unit) => (
                      <MenuItem key={unit.material_id} value={unit.material_id} disabled={isItemDisabled(unit.material_id)}>
                        {unit.material_name}
                      </MenuItem>
                    ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={row.qty}
                  onChange={(e) => handleFieldChange(index, 'qty', e.target.value)}
                  style={{ width: '100px' }}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.unit}
                  onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  style={{ width: '100px' }}
                >
                  <MenuItem value="NONE">NONE</MenuItem>
                  {units
                    .sort((a, b) => a.unit_name.localeCompare(b.unit_name))
                    .map((unit) => (
                      <MenuItem key={unit.unit_id} value={unit.unit_id}>
                        {unit.unit_name}
                      </MenuItem>
                    ))}
                  {/* Add more unit options here */}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={row.price}
                  onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                  style={{ width: '100px' }}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.taxpercent} // This holds the gst_id
                  onChange={(e) => handleTaxChange(index, e.target.value)} // Pass the gst_id
                  displayEmpty
                  variant="outlined"
                  size="small"
                  style={{ width: '100px' }}
                >
                  <MenuItem value="0">NONE</MenuItem>
                  {gst.map((gst) => (
                    <MenuItem key={gst.gst_id} value={gst.gst_id}>
                      {' '}
                      {gst.igst} {'%'}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>

              <TableCell>{row.amount.toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => handleDeleteRow(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} align="left">
              <Button onClick={handleAddRow} variant="contained" color="primary" size="small">
                Add Row
              </Button>
            </TableCell>
            <TableCell colSpan={4} align="right">
              TOTAL
            </TableCell>
            <TableCell> {totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
