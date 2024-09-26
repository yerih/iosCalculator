// import { StatusBar } from 'expo-status-bar';
import { View, StatusBar } from 'react-native';
import { CalculatorScreen } from './src/presentation/screens/CalculatorScreen';
import { styles } from './src/config/theme/app-theme';

export default function App() {
  return (
    <View style={styles.background}>
      <StatusBar style="auto" bar barStyle='light-content'/>
      <CalculatorScreen />
    </View>
  );
}




