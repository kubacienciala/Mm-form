import React from 'react';
import { Picker as PickerExpo } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

interface Item {
	label: string;
	value: string;
}

interface PickerProps {
	items: Item[];
	selectedItem: Item;
	setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
	enabled?: boolean;
}

export const Picker: React.FC<PickerProps> = ({
	items,
	selectedItem,
	setSelectedItem,
	enabled,
}) => (
	<PickerExpo
		selectedValue={selectedItem && selectedItem.label}
		onValueChange={(itemValue: string) =>
			setSelectedItem({ label: itemValue, value: itemValue })
		}
		enabled={enabled}
		style={styles.picker}
		itemStyle={styles.itemPicker}>
		{items.map((el) => (
			<PickerExpo.Item label={el.label} value={el.value} key={el.label} />
		))}
	</PickerExpo>
);

const styles = StyleSheet.create({
	picker: {
		height: 50,
		width: 200,
		marginBottom: 40,
	},
	itemPicker: {
		color: theme.colors.darkViolet,
	},
});
