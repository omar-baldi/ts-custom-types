import { useMemo, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export type TypeAheadData = {
  label: string;
  value: string;
};

type Props = {
  data: TypeAheadData[];
  label?: string;
  debounce?: number;
  onOptionClick?: (v: TypeAheadData["value"]) => void;
} & React.ComponentProps<"input">;

export const DEFAULT_DEBOUNCE_VALUE = 1000;

export default function TypeAhead({
  data,
  label,
  debounce = DEFAULT_DEBOUNCE_VALUE,
  onOptionClick,
  ...inputProps
}: Props) {
  const [inputV, setInputV] = useState("oo");
  const debouncedValue = useDebouncedValue(inputV, debounce, { updateOnMount: false });

  const elements = useMemo<JSX.Element[]>(() => {
    return data
      .filter((opt) => opt.value.toLowerCase().match(debouncedValue.toLowerCase()))
      .map((filteredOpt) => {
        const { value, label } = filteredOpt;
        const startIdx = label.toLowerCase().indexOf(debouncedValue.toLowerCase());
        const endIdx = startIdx + (debouncedValue.length - 1);

        const charsData = [...label].map((char, idxChar) => ({
          char,
          isHighlighted: idxChar >= startIdx && idxChar <= endIdx,
        }));

        return {
          charsData,
          value,
        };
      })
      .map(({ charsData, value }) => {
        return (
          <div key={undefined} style={{ textAlign: "start", margin: "0.5rem 0" }}>
            {charsData.map((charData) => {
              const charId = undefined;
              const { char, isHighlighted } = charData;
              const charColor: React.CSSProperties["color"] = isHighlighted
                ? "orange"
                : "initial";

              return (
                <span
                  key={charId}
                  style={{ color: charColor }}
                  onClick={() => onOptionClick?.(value)}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      });
  }, [debouncedValue, data, onOptionClick]);

  return (
    <>
      {label && <label htmlFor="typeahead-input">{label}</label>}

      <input
        {...inputProps}
        type="text"
        id="typeahead-input"
        value={inputV}
        onChange={(e) => setInputV(e.target.value)}
      />

      {elements}
    </>
  );
}
