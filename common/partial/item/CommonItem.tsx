import React, { useState } from 'react';
import type { NextPage } from 'next';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import Page from '@call-layout/Page/Page';
import Card, { CardBody } from '@call-components/bootstrap/Card';
import useSelectTable from '@call-hooks/useSelectTable';
import PaginationButtons, { dataPagination } from '@call-components/PaginationButtons';
import useSortableData from '@call-hooks/useSortableData';
import Icon from '@call-components/icon/Icon';
import Button from '@call-components/bootstrap/Button';
import Select from '@call-components/bootstrap/forms/Select';
import Input from '@call-components/bootstrap/forms/Input';
import FormGroup from '@call-components/bootstrap/forms/FormGroup';

const CommonItem: NextPage = () => {
	const data = [
		{ id: 1, firstName: 'John', lastName: 'Doe' },
		{ id: 2, firstName: 'Ella', lastName: 'Oliver' },
		{ id: 3, firstName: 'Sam', lastName: 'Roberts' },
		{ id: 4, firstName: 'Grace', lastName: 'Buckland' },
		{ id: 5, firstName: 'Jane', lastName: 'Lee' },
		{ id: 6, firstName: 'Chloe', lastName: 'Walker' },
		{ id: 7, firstName: 'Ryan', lastName: 'McGrath' },
	];

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(3);

	const { items, requestSort, getClassNamesFor } = useSortableData(data);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	return (
		<PageWrapper>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardBody>
								<table className='table table-modern'>
									<thead>
										<tr>
											<th scope='col' className='text-decoration-underline'>
												No
											</th>
											<th  style={{ width: '200px' }} scope='col' className='text-decoration-underline'>
												Item
											</th>
											<th  style={{ width: '150px' }}  scope='col' className='text-decoration-underline'>
												Satuan
											</th>
											<th scope='col' className=''>
												Qty RAP
											</th>
											<th scope='col' className=''>
												(%) Naik
											</th>
											<th scope='col' className=''>
												Qty RAB
											</th>
											<th style={{ width: '200px' }} scope='col' className=''>
												Harga
											</th>
											<th style={{ width: '150px' }} scope='col' className=''>
												Total
											</th>
											<th scope='col' className='text-end'>
												<Button color={'success'} isLight icon='Add' />
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>
												<Select
													// size='md'
													ariaLabel='Default select example'
													placeholder='-- Pilih Item --'
													// onChange={formikOneWay.handleChange}
													// value={formikOneWay.values.exampleSelectOneWay}
													list={[
														{ value: 'ASD', text: 'ASD' },
														{ value: 'CVB', text: 'CVB' },
														{ value: 'FDS', text: 'FDS' },
														{ value: 'QWE', text: 'QWE' },
													]}
												/>
											</td>
											<td>
                      <Select
													// size='md'
													ariaLabel='Default select example'
													placeholder='-- Pilih Satuan --'
													// onChange={formikOneWay.handleChange}
													// value={formikOneWay.values.exampleSelectOneWay}
													list={[
														{ value: 'ASD', text: 'ASD' },
														{ value: 'CVB', text: 'CVB' },
														{ value: 'FDS', text: 'FDS' },
														{ value: 'QWE', text: 'QWE' },
													]}
												/>
                      </td>

											<td>
                      <Input
														// size='md'
														
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
                      </td>
											<td>
                      <Input
														// size='md'
														
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
                      </td>
											<td>
                      <Input
														// size='md'
														
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
                      </td>
											<td>
                      <Input
														// size='md'
														readOnly
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
                      </td>
											<td>
												<FormGroup
													id='exampleTypesPlaceholder--'
													label='Total RAP'
													labelClassName='text-capitalize'>
													<Input
														// size='md'
														readOnly
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
												</FormGroup>
												<FormGroup
													id='exampleTypesPlaceholder--'
													label='Total RAB'
													labelClassName='text-capitalize'>
													<Input
														// size='md'
														readOnly
														type='number'
														placeholder='0'
														aria-label='.form-control-sm example'
													/>
												</FormGroup>
											</td>
											<td className='text-end'>
												<Button color='danger' isLight icon='Delete' />
											</td>
										</tr>
									</tbody>
								</table>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CommonItem;
