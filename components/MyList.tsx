import { FlatList } from "react-native";
import character from "../data/character.json";
import SingleCharacter from "./SingleCharacter";

const MyList = () => {
  // return <CharacterListItem character={character.results[0]} />;
  return (
    <FlatList
      data={character.results}
      renderItem={({ item, index }) => {
        return <SingleCharacter character={item} />;
      }}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default MyList;
