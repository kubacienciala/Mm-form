import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ContractorFormScreen } from './screens/ContractorFormScreen';
import { theme } from '../assets/theme';

export default function App() {
	return (
		<SafeAreaView style={styles.appContainer}>
			<ContractorFormScreen />
			<StatusBar style='light' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: theme.colors.black,
	},
});
