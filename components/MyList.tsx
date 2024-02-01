import { ActivityIndicator, FlatList } from "react-native";
import SingleCharacter from "./SingleCharacter";
import { useEffect, useState } from "react";

const MyList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setItems(data.results);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => <SingleCharacter character={item} />}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default MyList;
