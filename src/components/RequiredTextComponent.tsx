import { Text, StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

export const RequiredTextComponent = ({children}: any) => {
	return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
	text: {
		color: theme.colors.red,
	},
});
