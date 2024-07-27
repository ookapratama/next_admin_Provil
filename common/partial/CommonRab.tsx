import React, { FC, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FormikHelpers, useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import Icon from '../../components/icon/Icon';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '@call-components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import data from '../data/dummyEventsData';
import USERS from '../data/userDummyData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import Select from '@call-components/bootstrap/forms/Select';
import InputGroup, { InputGroupText } from '@call-components/bootstrap/forms/InputGroup';
import CommonItem from '@call-common/partial/item/CommonItem';

interface IDataLahanProps {
	isFluid?: boolean;
}
const CommonRab: FC<IDataLahanProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const SELECT_TYPE_MODEL = [
		{ value: 1, text: 'Kapling' },
		{ value: 2, text: 'Fasum' },
		{ value: 3, text: 'Fasos' },
	];

	const SELECT_OPTIONS_CLUSTER = [
		{ value: 'Cluster Contoh 1', text: 'Cluster Contoh 1' },
		{ value: 'Cluster Contoh 2', text: 'Cluster Contoh 2' },
		{ value: 'Cluster Contoh 3', text: 'Cluster Contoh 3' },
	];

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [state, setState] = useState(false);
	const [showTipeBayar, setShowTipeBayar] = useState(false);

	// state value form
	const [catatTipe, setCatatTipe] = useState('');

	// handle option catatan
	const handleCatatOption = () => {};

	// BEGIN :: Upcoming Events
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};

	const [modalHapusRab, setModalHapusRab] = useState(false);
	const handleModalHapus = () => {
		setModalHapusRab(!modalHapusRab);
	};

	const [addRabModal, setRabModal] = useState(false);
	const [editRabModal, setEditRabModal] = useState(false);
	const handleEditRab = () => {
		setEditRabModal(!upcomingEventsEditOffcanvas);
	};

	// END :: Upcoming Events

	const formik = useFormik({
		onSubmit<Values>(
			values: Values,
			formikHelpers: FormikHelpers<Values>,
		): void | Promise<any> {
			return undefined;
		},
		initialValues: {
			customerName: 'Alison Berry',
			service: 'Exercise Bike',
			employee: `${USERS.GRACE.name} ${USERS.GRACE.surname}`,
			location: 'Maryland',
			date: dayjs().add(1, 'days').format('YYYY-MM-DD'),
			time: '10:30',
			note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisi odio. Nam sit amet pharetra enim. Nulla facilisi. Nunc dictum felis id massa mattis pretium. Mauris at blandit orci. Nunc vulputate vulputate turpis vitae cursus. In sit amet turpis tincidunt, interdum ex vitae, sollicitudin massa. Maecenas eget dui molestie, ullamcorper ante vel, tincidunt nisi. Donec vitae pulvinar risus. In ultricies nisl ac massa malesuada, vel tempus neque placerat.',
			notify: true,
			examplePrice: '',
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(data);

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Money' iconColor='success'>
						<CardTitle>Data RAB & RAP</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='primary'
							icon='Add'
							isLight
							onClick={() => {
								setRabModal(true);
							}}>
							Tambah RAB & RAP
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>No</th>
								<th>Judul</th>
								<th>Type</th>
								<th
									onClick={() => requestSort('date')}
									className='cursor-pointer text-decoration-underline'>
									Tanggal{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th>
								<th>Total RAP</th>
								<th>Total RAB</th>
								{/* <th>Status</th> */}
								<td style={{ width: 60 }} />

								<td />
							</tr>
						</thead>
						<tbody>
							{dataPagination(items, currentPage, perPage).map((item) => (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>
										<div className='d-flex'>
											<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
												RAB 01 Lorem ipsum dolor sit amet consectetur
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex'>
											<div className='flex-grow-1 ms-3 d-flex align-items-center '>
												Kavling
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center'>
											{/* <span
												className={classNames(
													'badge',
													'border border-2',
													[`border-${themeStatus}`],
													'rounded-circle',
													'bg-success',
													'p-2 me-2',
												)}>
												<span className='visually-hidden'>
													{item.status.name}
												</span>
											</span> */}
											<span className='text-nowrap'>
												{dayjs(`${item.date} ${item.time}`).format(
													'D-MMMM-YYYY',
												)}
											</span>
										</div>
									</td>

									<td>
										<div className='text-nowrap'>200.000.000</div>
									</td>

									<td>
										<div className='text-nowrap'>200.000.000</div>
									</td>

									<td>
										<div className='d-flex flew-row'>
											<Button
												isOutline={!darkModeStatus}
												color='dark'
												isLight={darkModeStatus}
												className={classNames(
													'text-nowrap',
													{
														'border-light': !darkModeStatus,
													},
													'mx-3',
												)}
												icon='Edit'
												onClick={handleEditRab}>
												Edit
											</Button>

											<Button
												isOutline={!darkModeStatus}
												color='danger'
												isLight={darkModeStatus}
												className={classNames('text-nowrap', {
													'border-light': !darkModeStatus,
												})}
												icon='Delete'
												onClick={handleModalHapus}>
												Hapus
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			{/* Modal Add RAB */}
			<Modal
				isOpen={addRabModal}
				setIsOpen={setRabModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xxl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Tambah RAP & RAB
					</ModalTitle>
				</ModalHeader>
				{/* Form */}
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<FormGroup
									id='exampleTypesPlaceholder--$'
									label='Judul'
									labelClassName='text-capitalize'>
									<Input
										// size='md'
										type='text'
										placeholder=''
										aria-label='.form-control-lg example'
									/>
								</FormGroup>

								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Perumahan / CLuster'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Perumahan / Cluster --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_OPTIONS_CLUSTER}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Persentase Kenaikan Qty RAP ke RAB'
										labelClassName='text-capitalize'>
										<InputGroup>
											{/* <InputGroupText>$</InputGroupText> */}
											<Input
												id='examplePrice'
												// ariaLabel='Amount (to the nearest dollar)'
												component='NumberFormat'
												placeholder='Format persen'
												// @ts-ignore
												thousandSeparator
												onChange={formik.handleChange}
												// value={formik.values.examplePrice}
											/>
											<InputGroupText>%</InputGroupText>
										</InputGroup>
										{/* <InputGroup /> */}
									</FormGroup>
								</div>

								{/* <div className='row g-4 mt-2'>
									<FormGroup id='exampleSizeTextarea' label='Catatan'>
										<Textarea placeholder='Catatan mengenai lahan' />
									</FormGroup>
								</div> */}
							</div>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Type Model '
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Type --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_TYPE_MODEL}
										/>
									</FormGroup>
								</div>
								<div className='row g-4 mt-2'>
									{/* <TipeBayar /> */}
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Total RAP'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='number'
											placeholder='0'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>
								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Total RAB'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='number'
											placeholder='0'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>
							</div>
						</div>

						<div className='text-center '>
							<ModalTitle id='exampleModalLabel' tag='h3' className=' mt-5'>
								Item RAP & RAB
							</ModalTitle>
							Silahkan masukkan poin-poin RAP & RAB
						</div>

						<div className='row'>
							<CommonItem />
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setRabModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Simpan
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Edit RAB */}
			<Modal
				isOpen={editRabModal}
				setIsOpen={setEditRabModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xxl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Edit RAP & RAB
					</ModalTitle>
				</ModalHeader>
				{/* Form */}
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<FormGroup
									id='exampleTypesPlaceholder--$'
									label='Judul'
									labelClassName='text-capitalize'>
									<Input
										// size='md'
										type='text'
										placeholder=''
										aria-label='.form-control-lg example'
									/>
								</FormGroup>

								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Perumahan / CLuster'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Perumahan / Cluster --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_OPTIONS_CLUSTER}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Persentase Kenaikan Qty RAP ke RAB'
										labelClassName='text-capitalize'>
										<InputGroup>
											{/* <InputGroupText>$</InputGroupText> */}
											<Input
												id='examplePrice'
												// ariaLabel='Amount (to the nearest dollar)'
												component='NumberFormat'
												placeholder='Format persen'
												// @ts-ignore
												thousandSeparator
												onChange={formik.handleChange}
												// value={formik.values.examplePrice}
											/>
											<InputGroupText>%</InputGroupText>
										</InputGroup>
										{/* <InputGroup /> */}
									</FormGroup>
								</div>

								{/* <div className='row g-4 mt-2'>
									<FormGroup id='exampleSizeTextarea' label='Catatan'>
										<Textarea placeholder='Catatan mengenai lahan' />
									</FormGroup>
								</div> */}
							</div>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Type Model '
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Type --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_TYPE_MODEL}
										/>
									</FormGroup>
								</div>
								<div className='row g-4 mt-2'>
									{/* <TipeBayar /> */}
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Total RAP'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='number'
											placeholder='0'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>
								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--'
										label='Total RAB'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='number'
											placeholder='0'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>
							</div>
						</div>

						<div className='text-center '>
							<ModalTitle id='exampleModalLabel' tag='h3' className=' mt-5'>
								Item RAP & RAB
							</ModalTitle>
							Silahkan masukkan poin-poin RAP & RAB
						</div>

						<div className='row'>
							<CommonItem />
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setEditRabModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Simpan
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Hapus RAB */}
			<Modal
				isOpen={modalHapusRab}
				setIsOpen={setModalHapusRab}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='sm'
				fullScreen='sm'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Hapus RAB & RAP ?
					</ModalTitle>
				</ModalHeader>

				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setModalHapusRab(false)}>
						Close
					</Button>
					<Button color='danger' icon='Delete'>
						Hapus
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CommonRab;
