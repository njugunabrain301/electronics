export default function CounterContent({
  title,
  prefix,
  suffix,
  count,
  theme,
  elementRef,
}) {
  return (
    <main-content>
      <span className="m-2 flex flex-col items-center">
        <span
          className="text-5xl rounded-[100%] border-[10px] w-[250px] h-[250px] flex items-center justify-center"
          style={{ borderColor: theme.palette.highlight.main }}
          ref={elementRef}
        >
          <span className="flex items-end justify-center">
            <span className="text-3xl">{prefix}</span>
            {" " + count}
            <span className="text-3xl">{suffix}</span>
          </span>
        </span>
        <span className="text-center mt-3">{title}</span>
      </span>
    </main-content>
  );
}
