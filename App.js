import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
export default function App() {
  const [userNum, setUserNum] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function handleStartNewGame() {
    setUserNum(null);
    setRoundsNumber(0);
  }

  function handlePickNum(number) {
    setUserNum(number);
    setIsGameOver(false);
  }

  function handleGameOver() {
    setIsGameOver(true);
  }
  let screen = <StartGameScreen onPickNumber={handlePickNum} />;

  if (userNum)
    screen = (
      <GameScreen
        userNum={userNum}
        onGameOver={handleGameOver}
        onSetRounds={setRoundsNumber}
      />
    );

  if (isGameOver && userNum)
    screen = (
      <GameOverScreen
        userNumber={userNum}
        roundsNumber={roundsNumber}
        onStartNewGame={handleStartNewGame}
      />
    );

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.secondary500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/background.png')}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          style={styles.rootScreen}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.1,
  },
});
