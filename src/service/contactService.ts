import * as Contacts from "expo-contacts";
import { UnavailabilityError } from 'expo-modules-core'
import { QueryKey, useQuery } from "@tanstack/react-query";

import Exception from "./Exception";

const getContacts = async ( name) => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
        sort: "firstName",
        name: !!name ? name : undefined
      });
      return data;
    } else {
      throw new Exception('Allow access to contacts to continue using the app')
    }
  } catch (error) {
    if (error instanceof UnavailabilityError) {
      throw new Exception('Allow access to contacts to continue using the app')
    } else if(error instanceof Exception) {
      throw new Exception('Allow access to contacts to continue using the app')
    }
    throw new Exception("Something went wrong")
  }
};


export const useContacts = (name: string) =>{
  return useQuery({
    queryFn: () => getContacts(name),
    queryKey: ["GET_CONTACTS", name],
  })
}

// ask for permission at the starting and disable the button if permission not allowed;
