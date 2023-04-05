export type LayoutProps = {
  children: JSX.Element;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type SearchBoxProps = {
  label: string;
  name: string;
  value: string;
  isSearched: boolean;
  dataList: any[];
  onSearch: Function;
  onChange: Function;
};
