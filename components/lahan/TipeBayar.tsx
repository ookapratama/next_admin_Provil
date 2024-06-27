import React from 'react';
import FormGroup from '@call-components/bootstrap/forms/FormGroup';
import Select from '@call-components/bootstrap/forms/Select';

const TipeBayar = () => {
	// const [tipeBayarm setTipeBayar] = useState(false);

	const SELECT_OPTIONS_TIPE = [
		{ value: 1, text: 'Tunai' },
		{ value: 2, text: 'Kredit' },
	];

	return (
		<FormGroup
			id='exampleTypesPlaceholder--$'
			label='Tipe Pembayaran :'
			labelClassName='text-capitalize'>
			<Select
				// size='md'
				ariaLabel='Default select example'
				placeholder='-- Pilih --'
				// onChange={formikOneWay.handleChange}
				// value={formikOneWay.values.exampleSelectOneWay}
				list={SELECT_OPTIONS_TIPE}
			/>
		</FormGroup>
	);
};

export default TipeBayar;
