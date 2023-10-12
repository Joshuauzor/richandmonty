import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
const HomeScreen = ({ navigation }) => {
  // State variables to manage input, character data, loading state, and characters list
  const [input, setInput] = useState<string>(''); // User input for character search
  const [character, setCharacter] = useState<ICharacters | null>(null); // Selected character
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [data, setData] = useState<Array<ICharacters>>([]); // List of characters

  // Fetch characters from the API when the component mounts
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Function to fetch characters from the API
  const fetchCharacters = async () => {
    setLoading(true); // Set loading state to true
    fetch('https://rickandmortyapi.com/api/character', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results as ICharacters[]); // Store character data in state
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Set loading state to false in case of an error
      });
  };

  // Function to handle form submission when the "Submit" button is pressed
  const handleSubmit = () => {
    setCharacter(null); // Reset the selected character

    // Iterate through the characters data to find a match based on user input
    // Use the find method to find the first match in the data array
    const foundCharacter = data.find(
      (element) => element.name.toLowerCase() === input.toLowerCase(),
    );

    if (foundCharacter) {
      setCharacter(foundCharacter); // Set the selected character if found
    }
  };

  // Render the UI components
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty guide.</Text>
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

      {/* Button to trigger the character search */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text
        style={styles.next}
        onPress={() => navigation.navigate('InfoScreen')}
      >
        Go to Next screen
      </Text>

      {/* Display the status bar */}
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

// Styles for the components
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
  next: {
    marginTop: 40,
  },
});
