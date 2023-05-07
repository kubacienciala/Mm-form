import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export const HideKeyboard = ({ children }: any) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
