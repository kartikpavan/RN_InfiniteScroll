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

  useEffect(() => {
    // On mount ,fetch items
    fetchItems();
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => <SingleCharacter character={item} />}
      contentContainerStyle={{ gap: 10 }}
      ListFooterComponent={() => (
        <View>
          {isLoading && <ActivityIndicator />}
          <Text
            onPress={fetchItems} // on press fetch More items
            style={{ textAlign: "center", fontSize: 20, color: "green" }}
          >
            Load More
          </Text>
        </View>
      )}
    />
  );
};

export default MyList;
