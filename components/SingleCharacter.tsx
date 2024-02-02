import { View, Text, Image, StyleSheet } from "react-native";
import { Character } from "../types/types";

type CharacterType = {
  character: Character;
};

const SingleCharacter = ({ character }: CharacterType) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "50%",
    padding: 5,
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "brown",
    alignSelf: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default SingleCharacter;
