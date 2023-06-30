import { useCallback, useState } from "react";
import { Image as NativeImage } from "react-native";

const Image = (props) => {
  const { defaultComponent } = props;
  const [isError, setIsError] = useState(false);

  return isError || !props.source?.uri ? (
    defaultComponent
  ) : (
    <NativeImage {...props} onError={() => {
        setIsError(true)
    }} />
  );
};

export default Image;
