import {Linking, Alert} from 'react-native';

export const toUrl = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Internet Not Working', 'Please try again later.', [
      {text: 'OK'},
    ]);
  }
};
