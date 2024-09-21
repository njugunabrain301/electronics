"use client";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchFieldContent from "./Content";

export default function Timeless({
  label,
  value,
  onChange,
  onClick,
  inverted,
  searching,
}) {
  const { theme } = useGlobalContext();

  return (
    <SearchFieldContent
      label={label}
      value={value}
      onChange={onChange}
      onClick={onClick}
      inverted={inverted}
      searching={searching}
      theme={theme}
    />
  );
}
