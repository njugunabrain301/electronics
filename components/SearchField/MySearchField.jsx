import Timeless from "./templates/Timeless";
import Opulence from "./templates/Opulence";

export default function MySearchField({
  label,
  value,
  onChange,
  onClick,
  template,
  inverted,
}) {
  return (
    <>
      {template === "Timeless" && (
        <Timeless
          label={label}
          value={value}
          onClick={onClick}
          onChange={onChange}
          inverted={inverted}
        />
      )}
      {template === "Opulence" && (
        <Opulence
          label={label}
          value={value}
          onClick={onClick}
          onChange={onChange}
          inverted={inverted}
        />
      )}
    </>
  );
}
