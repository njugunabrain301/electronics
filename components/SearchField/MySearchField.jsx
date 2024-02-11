import Timeless from "./templates/Timeless";
import Opulence from "./templates/Opulence";

export default function MySearchField({
  label,
  value,
  onChange,
  onClick,
  template,
}) {
  return (
    <>
      {template === "Timeless" && (
        <Timeless
          label={label}
          value={value}
          onClick={onClick}
          onChange={onChange}
        />
      )}
      {template === "Opulence" && (
        <Opulence
          label={label}
          value={value}
          onClick={onClick}
          onChange={onChange}
        />
      )}
    </>
  );
}
