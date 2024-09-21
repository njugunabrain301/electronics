"use client";
import { useGlobalContext } from "@/Context/context";
import EmptyContent from "./Content";

export default function Empty() {
  const { theme } = useGlobalContext();
  return <EmptyContent theme={theme} />;
}
