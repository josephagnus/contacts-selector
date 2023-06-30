import { useEffect } from "react";
import { Card, Searchbar } from "react-native-paper";

const MyComponent = (props) => {
  const { onChange } = props;

  const onChangeSearch = (query) => {
    onChange(query);
  };

  return (
    <Card>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={props.value}
        mode="bar"
        elevation={2}
        style={{ borderRadius: 0 }}
      />
    </Card>
  );
};

export default MyComponent;
