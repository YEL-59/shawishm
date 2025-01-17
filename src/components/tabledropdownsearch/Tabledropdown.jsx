import { useState } from "react";
import { useDropdown } from "../../contexts/DropdownContext";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const Tabledropdown = () => {
  const { dropdownOptions, updateDropdown, resetDropdowns } = useDropdown();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleMultiSelectChange = (key, event) => {
    const { value } = event.target;

    // Handle "All" selection
    if (value.includes("All")) {
      const allSelected =
        selectedOptions[key]?.length === dropdownOptions[key]?.length - 1; // Adjust to exclude "All"
      const newValue = allSelected
        ? [] // If all are selected, deselect all
        : [...dropdownOptions[key].slice(1)]; // Exclude "All" from selection
      setSelectedOptions((prev) => ({
        ...prev,
        [key]: newValue,
      }));
      updateDropdown(key, newValue);
    } else {
      // Handle individual selection
      setSelectedOptions((prev) => ({
        ...prev,
        [key]: value,
      }));
      updateDropdown(key, value);
    }
  };

  const isAllSelected = (key) =>
    selectedOptions[key]?.length === dropdownOptions[key]?.length - 1; // Adjust to exclude "All"

  return (
    <div className="mt-4 p-6 bg-white border rounded-lg shadow-lg">
      <div className="flex gap-6">
        {/* Render all dropdowns */}
        {Object.keys(dropdownOptions).map((key) => (
          <FormControl key={key} sx={{ width: 300 }}>
            <InputLabel id={`multi-select-label-${key}`} className="text-sm">
              Select {key}
            </InputLabel>
            <Select
              labelId={`multi-select-label-${key}`}
              id={`multi-select-${key}`}
              multiple
              value={selectedOptions[key] || []}
              onChange={(event) => handleMultiSelectChange(key, event)}
              input={<OutlinedInput label={key} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              className="text-sm"
            >
              {/* "All" Option */}
              <MenuItem value="All">
                <Checkbox checked={isAllSelected(key)} />
                <ListItemText primary="All" />
              </MenuItem>
              {/* Individual Options */}
              {dropdownOptions[key]?.slice(1).map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={selectedOptions[key]?.includes(option) || isAllSelected(key)}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        {/* Reset Button */}
        <Button
          onClick={() => {
            resetDropdowns();
            setSelectedOptions({});
          }}
          variant="contained"
          color="primary"
          sx={{ width: 300 }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Tabledropdown;
