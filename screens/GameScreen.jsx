import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Title from '../components/Title';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from './../components/PrimaryButton';
import Card from '../components/Card';
import CustomText from '../components/CustomText';
import GuessItem from '../components/GuessItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;
function GameScreen({ userNum, onGameOver, onSetRounds }) {
  const initialGuess = useCallback(() =>
    generateRandomBetween(min, max, userNum)
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNum) {
      onSetRounds(guessRounds.length);
      onGameOver();
    }
  }, [currentGuess, userNum, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  function handleNextGuess(direction) {
    if (
      (direction === 'lower' && currentGuess < userNum) ||
      (direction === 'higher' && currentGuess > userNum)
    ) {
      Alert.alert("Don't lie", 'You know that is wrong...', [
        { text: 'Sorry!' },
      ]);
      return;
    }
    if (direction === 'lower') {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    console.log(min, max);
    const newRandomNumber = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newRandomNumber);
    setGuessRounds(prevGuesses => [newRandomNumber, ...prevGuesses]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <CustomText style={styles.customText}>Higher or lower?</CustomText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('higher')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('higher')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.screen, { marginTop: width > 500 ? 10 : 30 }]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          keyExtractor={item => item}
          renderItem={itemData => (
            <GuessItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
    padding: 24,
    alignItems: 'center',
  },
  customText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
