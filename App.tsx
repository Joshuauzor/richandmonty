import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState<string>('');
  const [character, setCharacter] = useState<ICharacters | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<ICharacters>>([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    fetch('https://rickandmortyapi.com/api/character', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results as ICharacters[]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    setCharacter(null);

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.name.toLowerCase() === input.toLowerCase()) {
        setCharacter(element);
      }
      break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty</Text>
      <TextInput
        value={input}
        placeholder="Enter character name"
        onChangeText={(input) => setInput(input)}
        style={styles.inputField}
        editable={data.length > 0}
      />
      {character && (
        <Image
          source={{
            uri: character.image,
          }}
          style={styles.image}
        />
      )}
      {/* {!character && input.length > 0 && (
        <Text style={styles.notFound}>Character Not Found! Try again</Text>
      )} */}

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  notFound: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 20,
    color: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
