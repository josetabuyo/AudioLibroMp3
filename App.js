import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var timeElapsed = Date.now();


setInterval(function(){


  timeElapsed = timeElapsed - Date.now();

}, 1000);

export default function App() {
  const [sound, setSound] = React.useState();


  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/zelda-navi-listen.mp3')

      // require('./assets/de-animales-a-dioses-yuval-noah-harari-audiolibro-parte-1.mp3')

    );
    setSound(sound);

    console.log('Playing Sound');

    //
    // <Text>{this.state.timeElapsed}</Text>
    //
    // this.setState({
    //   timeElapsed: 'okokok'
    // });

    await sound.playAsync();
    await sleep(200);

    await sound.playFromPositionAsync(700);


  }

  async function stopSound() {
    console.log('Stoping Sound');
    await sound.pauseAsync();
  }





  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text>Hola compañera Noelía, que gusto es verla este día</Text>
      <Text>{timeElapsed}</Text>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
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
});
