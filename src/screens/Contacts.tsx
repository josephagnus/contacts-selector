import { useCallback, useState, memo, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useContacts } from "../service";

import { ContactList } from "../components/contacts";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";

import Exception from "../service/Exception";

const ContactsScreen = () => {
  const [searchQuery, setSearchQuery] = useState();

  const onSearch = useCallback((query) => setSearchQuery(query), []);

  const { data, error, isInitialLoading } = useContacts(searchQuery);


  const getComponent = () => {
    if (isInitialLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <View style={styles.emptyStatecontainer}>
          <Text>
            {error instanceof Exception
              ? error.message
              : "Something went wrong"}
          </Text>
        </View>
      );
    } else if (data && data.length === 0) {
      if (searchQuery) {
        return (
          <View style={styles.emptyStatecontainer}>
            <Text>No contacts for the searched query</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.emptyStatecontainer}>
            <Text>Please add contacts</Text>
          </View>
        );
      }
    } else {
      return <ContactList contactData={data} />;
    }
  };

  return (
    <View style={styles.container}>
      {!error && (
        <SearchBar onChange={onSearch} value={searchQuery} isDisabled={isInitialLoading} />
      )}
      {getComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyStatecontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default memo(ContactsScreen);
