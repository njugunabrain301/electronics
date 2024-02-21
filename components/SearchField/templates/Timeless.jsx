"use client";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Timeless({
  label,
  value,
  onChange,
  onClick,
  inverted,
}) {
  const { theme } = useGlobalContext();
  return (
    <div className="my-text-field flex pt-2">
      <TextField
        label={label}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: inverted
                ? theme.palette.background.primary
                : theme.palette.input.border,
            },
            "&:hover fieldset": {
              borderColor: inverted
                ? theme.palette.background.primary
                : theme.palette.input.light,
            },
          },

          input: {
            color: inverted
              ? theme.palette.text.inverted
              : theme.palette.text.base,
          },
        }}
        color={"input-inverted"}
        InputLabelProps={{
          sx: {
            color: inverted
              ? theme.palette.text.inverted
              : theme.palette.text.alt,
          },
        }}
        size="small"
        value={value}
        onChange={onChange}
      ></TextField>
      <Button
        style={{
          borderColor: inverted
            ? theme.palette.background.primary
            : theme.palette.background.alt,
          paddingRight: "6px",
          paddingLeft: "6px",
          minWidth: "30px",
          marginLeft: "-35px",
          borderLeft:
            "solid 1px " +
            (inverted
              ? theme.palette.background.primary
              : theme.palette.text.alt) +
            "90",
          borderRadius: 0,
          color: inverted ? theme.palette.text.inverted : "initial",
        }}
        onClick={onClick}
        color={"flat-button"}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
