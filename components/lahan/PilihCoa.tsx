import FormGroup from '@call-components/bootstrap/forms/FormGroup';
import Select from '@call-components/bootstrap/forms/Select';
import React from 'react';

const PilihCoa = () => {
	const SELECT_OPTIONS_COA = [
		{ value: 1, text: '1.000.000.000 Kas besar' },
		{ value: 2, text: '2.000.000 Kas sedang' },
		{ value: 3, text: '3.000 Kas kecil' },
	];

	return (
		<FormGroup
			id='exampleTypesPlaceholder--$'
			label='Dicatat sebagai :'
			labelClassName='text-capitalize'>
			<Select
				// size='md'
				ariaLabel='Default select example'
				placeholder='-- Pilih COA --'
				// onChange={formikOneWay.handleChange}
				// value={formikOneWay.values.exampleSelectOneWay}
				list={SELECT_OPTIONS_COA}
			/>
		</FormGroup>
	);
};

export default PilihCoa;
