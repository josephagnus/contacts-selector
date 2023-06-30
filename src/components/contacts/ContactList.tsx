import { memo, useMemo } from "react";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";

import ContactItem from "./ContactItem";

const ContactList = (props) => {
  const { contactData } = props;
  const renderItem = useMemo(() => ({ item, index }) => (
    <ContactItem
      key={`${item.id}-${index}`}
      name={item.name}
      image={item.image}
      type={item.contactType}
      phoneNumbers={item.phoneNumbers}
    />
  ), [])
  return (
    <Card style={{ marginTop: 8 }}>
      <FlatList
        data={contactData}
        renderItem={renderItem}
      />
    </Card>
  );
};

export default memo(ContactList);
