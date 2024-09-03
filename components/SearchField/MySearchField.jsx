import Timeless from "./templates/Timeless";

export default function MySearchField({
  label,
  value,
  onChange,
  onClick,
  inverted,
}) {
  return (
    <>
      <Timeless
        label={label}
        value={value}
        onClick={onClick}
        onChange={onChange}
        inverted={inverted}
      />
    </>
  );
}
