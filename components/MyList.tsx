import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SingleCharacter from "./SingleCharacter";
import { useEffect, useState } from "react";

const MyList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [nextPageURL, setNextPageURL] = useState<string>(
    "https://rickandmortyapi.com/api/character"
  );

  const fetchItems = async () => {
    if (isLoading) return; // if loading don't fetch

    console.log(nextPageURL);
    try {
      setIsLoading(true);
      const response = await fetch(nextPageURL);
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

  // on Component Mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => <SingleCharacter character={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={fetchItems}
      onEndReachedThreshold={2}
      ListFooterComponent={() => isLoading && <ActivityIndicator />}
      contentContainerStyle={{ gap: 10 }}
      numColumns={2}
    />
  );
};

export default MyList;
