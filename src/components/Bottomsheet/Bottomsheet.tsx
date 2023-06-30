import { useEffect, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

const Bottomsheet = (props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { isVisible } = props;
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef?.current?.present();
    } else {
      bottomSheetModalRef?.current?.dismiss();
    }
  }, [isVisible]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      snapPoints={animatedSnapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={[backdropProps.style, { opacity: 0.5 }]}
        />
      )}
      onDismiss={props.onDismiss}
    >
      <BottomSheetScrollView onLayout={handleContentLayout}>
        {props.children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default Bottomsheet;
