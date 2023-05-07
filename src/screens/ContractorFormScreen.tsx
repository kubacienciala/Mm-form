import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '../components/Picker';
import { RequiredTextComponent } from '../components/RequiredTextComponent';
import { HideKeyboard } from '../components/HideKeyboard';
import { theme } from '../../assets/theme';

enum typeValue {
	PERSON = 'osoba',
	COMPANY = 'firma',
}

enum typeLabel {
	PERSON = 'Osoba',
	COMPANY = 'Firma',
}

type FormData = {
	firstName: string;
	lastName: string;
	type: string;
	identificationNumber: string;
};

interface OptionType {
	label: string;
	value: string;
}

const types = [
	{ label: typeLabel.PERSON, value: typeValue.PERSON },
	{
		label: typeLabel.COMPANY,
		value: typeValue.COMPANY,
	},
];

const peselRegex = /^[0-9]{11}$/;
const nipRegex = /^[0-9]{10}$/;
const fieldRequired = 'This field is required.';

export const ContractorFormScreen = () => {
	const [image, setImage] = useState<string | null>(null);
	const [type, setType] = useState<OptionType>({
		label: typeLabel.PERSON,
		value: typeValue.PERSON,
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = async ({
		firstName,
		lastName,
		identificationNumber,
	}: FormData) => {
		if (!image) {
			alert('Please select an image.');
			return;
		}
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				type: type.value,
				identificationNumber: identificationNumber,
				image: image,
			}),
		};
		try {
			await fetch(
				'https://localhost:60001/Contractor/Save',
				requestOptions
			).then((response) => {
				response.json().then(() => {
					alert('Data sent');
				});
			});
		} catch (error) {
			alert('No method of saving found');
		}
	};

	const handleImageSelect = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			const fileExtension = result.assets[0].uri.split('.').pop();
			if (fileExtension !== 'jpeg' && fileExtension !== 'jpg') {
				alert('Please choose a JPEG or JPG image');
				return;
			}
			setImage(result.assets[0].uri);
		}
	};

	return (
		<HideKeyboard>
			<View style={styles.container}>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							placeholder='First name'
							placeholderTextColor={theme.colors.grey}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='firstName'
				/>
				{errors.firstName && (
					<RequiredTextComponent>{fieldRequired}</RequiredTextComponent>
				)}

				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							placeholder='Last name'
							placeholderTextColor={theme.colors.grey}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='lastName'
				/>
				{errors.lastName && (
					<RequiredTextComponent>{fieldRequired}</RequiredTextComponent>
				)}
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={() => (
						<View style={styles.pickerContainer}>
							<Picker
								items={types}
								setSelectedItem={setType}
								selectedItem={type}
							/>
						</View>
					)}
					defaultValue={typeValue.PERSON}
					name='type'
				/>

				<Controller
					control={control}
					rules={{
						required: true,
						pattern: {
							value: type.value === typeValue.PERSON ? peselRegex : nipRegex,
							message: `Invalid ${
								type.value === typeValue.PERSON ? 'PESEL' : 'NIP'
							} format.`,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							placeholder={type.value === typeValue.PERSON ? 'PESEL' : 'NIP'}
							placeholderTextColor={theme.colors.grey}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType='number-pad'
						/>
					)}
					name='identificationNumber'
				/>

				{errors.identificationNumber &&
					errors.identificationNumber.type === 'required' && (
						<RequiredTextComponent>{fieldRequired}</RequiredTextComponent>
					)}
				{errors.identificationNumber &&
					errors.identificationNumber.type === 'pattern' && (
						<RequiredTextComponent>
							{errors.identificationNumber.message}
						</RequiredTextComponent>
					)}
				<View style={styles.bottomContainer}>
					<Button
						color={theme.colors.darkViolet}
						title='Select image'
						onPress={handleImageSelect}
					/>
					{image && <Image source={{ uri: image }} style={styles.image} />}
					<Button
						color={theme.colors.darkViolet}
						title='Submit'
						onPress={handleSubmit(onSubmit)}
					/>
				</View>
			</View>
		</HideKeyboard>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.darkViolet,
		borderRadius: 15,
		color: theme.colors.white,
		marginVertical: 12,
		padding: 8,
	},
	pickerContainer: {
		marginBottom: 120,
	},
	bottomContainer: {
		flex: 1,
		marginVertical: 16,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	image: {
		width: 100,
		height: 100,
		marginVertical: 32,
	},
});
