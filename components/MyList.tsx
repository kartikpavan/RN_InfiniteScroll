import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SingleCharacter from "./SingleCharacter";
import { useEffect, useState } from "react";

const initialPageURL = "https://rickandmortyapi.com/api/character";

const MyList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [nextPageURL, setNextPageURL] = useState<string>("");

  const fetchItems = async (url: string) => {
    if (isLoading) return; // if loading don't fetch
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setItems((prev) => {
        return [...prev, ...data.results];
      });
      setNextPageURL(data.info.next);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Pull down to refresh
  const onRefresh = () => {
    // reset data
    setItems([]);
    setNextPageURL(initialPageURL);
    fetchItems(initialPageURL);
  };

  // on Component Mount fetch data with intialPageURL
  useEffect(() => {
    fetchItems(initialPageURL);
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => <SingleCharacter character={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => fetchItems(nextPageURL)}
      onEndReachedThreshold={2}
      refreshing={isLoading}
      onRefresh={onRefresh}
      ListFooterComponent={() => isLoading && <ActivityIndicator />}
      contentContainerStyle={{ gap: 10 }}
      numColumns={2}
    />
  );
};

export default MyList;
