"use client";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function MySearchField({ label, value, onChange, onClick }) {
  const { theme } = useGlobalContext();
  return (
    <div className="my-text-field flex pt-2">
      <TextField
        label={label}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.input.border,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.input.light,
            },
          },

          input: { color: theme.palette.text.base },
        }}
        color={"input"}
        InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
        size="small"
        value={value}
        onChange={onChange}
      ></TextField>
      <Button
        style={{
          borderColor: theme.palette.background.alt,
          paddingRight: "6px",
          paddingLeft: "6px",
          minWidth: "30px",
          marginLeft: "-35px",
          borderLeft: "solid 1px " + theme.palette.text.alt + "90",
          borderRadius: 0,
        }}
        onClick={onClick}
        color={"flat-button"}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
