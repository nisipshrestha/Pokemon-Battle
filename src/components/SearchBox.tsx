import { memo } from "react";
import { SearchBoxProps } from "../types";

function SearchBox({
  label,
  name,
  dataList = [],
  value,
  onSearch,
  onChange,
  isSearched,
}: SearchBoxProps) {
  return (
    <div className="search_wrapper">
      <label>{label}</label>
      <input
        name={name}
        value={value}
        className="search_box"
        onChange={(e) => onChange(e)}
        type="search"
        autoComplete="off"
      />

      {!isSearched && value && (
        <div className="data_list">
          {dataList.reduce(
            (acc: any[], each: { name: string; url: string }) =>
              each.name.startsWith(value)
                ? acc.concat(
                    <div
                      onClick={() => onSearch(name, each.name)}
                      className="data_row"
                      key={each.name}
                    >
                      {each.name}
                    </div>
                  )
                : acc,
            []
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchBox);
