/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

import {toUrl} from './utils/toUrl';
import {indexesToShow} from './utils/indexesToShow';
import {itemPerPage} from './utils/itemsPerPage';
import {paginationIndexes} from './utils/paginationIndexes';

export interface IUniversity {
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
  name: string;
  'state-province': string;
}

export const ITEMS_PER_PAGE = 50;

const App = () => {
  const [list, setList] = useState<IUniversity[]>([]);
  const [paginList, setPaginList] = useState<number[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortedFullList, setSortedFullList] = useState<IUniversity[]>([]);

  //get API data
  useEffect(() => {
    fetchAPIData();
  }, []);

  const fetchAPIData = async () => {
    try {
      const res = await axios.get('http://universities.hipolabs.com/search');
      const data = res.data;
      const sorted = data.sort((a: IUniversity, b: IUniversity) =>
        a.country.localeCompare(b.country),
      );
      setSortedFullList(sorted);
    } catch (error) {
      Alert.alert('Server Not Working', 'Please try again later.', [
        {text: 'OK'},
      ]);
    }
  };

  //pagination indexes
  useEffect(() => {
    setPaginList(paginationIndexes(sortedFullList.length));
  }, [sortedFullList.length]);

  //items per page
  useEffect(() => {
    setList(itemPerPage(selectedPage, sortedFullList));
  }, [selectedPage, sortedFullList]);

  if (list.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <View style={styles.backgroundStyle}>
        <ScrollView style={styles.listView}>
          <Text style={styles.sectionTitle}>Our list of universities</Text>
          <View style={styles.paginationView}>
            {selectedPage !== 1 ? (
              <Text
                style={styles.paginationText}
                onPress={() => setSelectedPage(selectedPage - 1)}>
                {'<'}
              </Text>
            ) : null}
            {paginList
              ? indexesToShow(selectedPage, paginList).map((item, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.paginationText,
                      selectedPage === item ? styles.red : styles.black,
                    ]}
                    onPress={() => setSelectedPage(item)}>
                    {item}
                  </Text>
                ))
              : null}
            {selectedPage !== paginList.length ? (
              <Text
                style={styles.paginationText}
                onPress={() => setSelectedPage(selectedPage + 1)}>
                {'>'}
              </Text>
            ) : null}
          </View>
          <View>
            {list
              ? list.map((item, index) => (
                  <View key={index} style={styles.universityView}>
                    <Pressable onPress={() => toUrl(item.web_pages[0])}>
                      <Text>{item.name}</Text>
                    </Pressable>
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  backgroundStyle: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  listView: {
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingBottom: 15,
  },
  universityView: {
    marginVertical: 3,
  },
  paginationView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  paginationText: {
    marginHorizontal: 4,
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
  displayNone: {
    display: 'none',
  },
});

export default App;
