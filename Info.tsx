import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="This is the info screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default InfoScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
