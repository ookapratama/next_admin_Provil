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
	CardSubTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
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
import Textarea from '../../components/bootstrap/forms/Textarea';
import Checks from '../../components/bootstrap/forms/Checks';
import Popovers from '../../components/bootstrap/Popovers';
import data from '../data/dummyEventsData';
import USERS from '../data/userDummyData';
import EVENT_STATUS from '../data/enumEventStatus';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import Select from '@call-components/bootstrap/forms/Select';
import TipeBayar from '@call-components/lahan/TipeBayar';

interface IDataLahanProps {
	isFluid?: boolean;
}
const CommonLahan: FC<IDataLahanProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const SELECT_OPTIONS_CATATAN = [
		{ value: 1, text: 'Pembelian Laham Baru (Belum dicatat pada Persediaan Tanah' },
		{ value: 2, text: 'Sebelumnya sudah dibeli (Sudah dicatat Persediaan Tanah' },
	];

	const SELECT_OPTIONS_CLUSTER = [
		{ value: 'Cluster 1', text: 'Cluster 1' },
		{ value: 'Cluster 2', text: 'Cluster 2' },
		{ value: 'Cluster 3', text: 'Cluster 3' },
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

	const [modalHapusLahan, setModalHapusLahan] = useState(false);
	const handleModalHapus = () => {
		setModalHapusLahan(!modalHapusLahan);
	};

	const [addLahanModal, setAddLahanModal] = useState(false);
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
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(data);

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Upcoming Appointments</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='primary'
							icon='Add'
							isLight
							onClick={() => {
								setAddLahanModal(true);
							}}>
							Tambah Lahan
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>No</th>
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
								<th>Untuk Cluster/Proyek</th>
								<th>Tuan Tanah</th>
								<th>Luas Area (m2)</th>
								<th>Harga per m2</th>
								<th>Total</th>
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
										<div className='d-flex align-items-center'>
											<span
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
											</span>
											<span className='text-nowrap'>
												{dayjs(`${item.date} ${item.time}`).format(
													'MMM Do YYYY, h:mm a',
												)}
											</span>
										</div>
									</td>
									<td>
										<div className='d-flex'>
											<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
												Cluster pembangunan 1
											</div>
										</div>
									</td>
									<td>
										<div>Budi Santoso</div>
									</td>
									<td>400</td>
									<td>Rp. 200.000.000</td>
									<td>Rp. 1.000.000</td>
									{/* <td>
										<Dropdown>
											<DropdownToggle hasIcon={false}>
												<Button
													isLink
													color={item.status.color}
													icon='Circle'
													className='text-nowrap'>
													{item.status.name}
												</Button>
											</DropdownToggle>
											<DropdownMenu>
												{Object.keys(EVENT_STATUS).map((key) => (
													<DropdownItem key={key}>
														<div>
															<Icon
																icon='Circle'
																color={EVENT_STATUS[key].color}
															/>
															{EVENT_STATUS[key].name}
														</div>
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</td> */}
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
												onClick={handleUpcomingEdit}>
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

			{/* Modal Add Lahan */}
			<Modal
				isOpen={addLahanModal}
				setIsOpen={setAddLahanModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Tambah Data Lahan
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Nama Tanah'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='text'
												placeholder='Masukkan Nama Tanah'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Untuk Cluster/Proyek'
											labelClassName='text-capitalize'>
											<Select
												// size='md'
												ariaLabel='Default select example'
												placeholder='-- Pilih Perumahan --'
												// onChange={formikOneWay.handleChange}
												// value={formikOneWay.values.exampleSelectOneWay}
												list={SELECT_OPTIONS_CLUSTER}
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Tanggal Perolehan'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='date'
												placeholder='Tanggal Perolehan Lahan'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='No. Hp Tuan Tanah'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='tel'
												placeholder='+1 (999) 999-9999'
												autoComplete='tel'
												mask='+1 (999) 999-9999'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--'
											label='Luas Area'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='number'
												placeholder='Luas Area Tanah'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Harga per m^2'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='number'
												placeholder='Harga tanah per m^2'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<FormGroup id='exampleSizeTextarea' label='Catatan'>
										<Textarea placeholder='Catatan mengenai lahan' />
									</FormGroup>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Dicatat sebagai :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>
								<div className='row g-4 mt-2'>
									<TipeBayar />
								</div>
							</div>
						</div>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setAddLahanModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Tambah Lahan
					</Button>
				</ModalFooter>
			</Modal>

			{/* Canvas Info Lahan */}
			<OffCanvas
				setOpen={setUpcomingEventsInfoOffcanvas}
				isOpen={upcomingEventsInfoOffcanvas}
				titleId='upcomingDetails'
				placement='bottom'>
				<OffCanvasHeader setOpen={setUpcomingEventsInfoOffcanvas}>
					<OffCanvasTitle id='upcomingDetails'>Customer: Alison Berry</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-lg-6'>
							<FormGroup
								id='dateInfo'
								name='date'
								label='Date/Time'
								isColForLabel
								labelClassName='col-sm-2 text-capitalize'
								childWrapperClassName='col-sm-10'>
								<Input
									value={dayjs(
										// @ts-ignore
										`${data.find((e) => e.id === 1).date} ${
											// @ts-ignore
											data.find((e) => e.id === 1).time
										}`,
									).format('MMM Do YYYY, h:mm a')}
									readOnly
									disabled
								/>
							</FormGroup>
						</div>
						<div className='w-100' />
						<div className='col-lg-6'>
							<FormGroup
								id='noteInfo'
								name='note'
								label='Note'
								isColForLabel
								labelClassName='col-sm-2 text-capitalize'
								childWrapperClassName='col-sm-10'>
								<Textarea value={formik.values.note} readOnly disabled />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
			</OffCanvas>

			{/* Canvas Edit Lahan */}
			<OffCanvas
				setOpen={setUpcomingEventsEditOffcanvas}
				isOpen={upcomingEventsEditOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setUpcomingEventsEditOffcanvas}>
					<OffCanvasTitle id='upcomingEdit'>Edit Data Lahan</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<form>
						<div className='row'>
							<div className='col-lg'>
								<div className='row g-4'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Nama Tanah'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='text'
												placeholder='Masukkan Nama Tanah'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Untuk Cluster/Proyek'
											labelClassName='text-capitalize'>
											<Select
												// size='md'
												ariaLabel='Default select example'
												placeholder='-- Pilih Perumahan --'
												// onChange={formikOneWay.handleChange}
												// value={formikOneWay.values.exampleSelectOneWay}
												list={SELECT_OPTIONS_CLUSTER}
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Tanggal Perolehan'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='date'
												placeholder='Tanggal Perolehan Lahan'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='No. Hp Tuan Tanah'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='tel'
												placeholder='+1 (999) 999-9999'
												autoComplete='tel'
												mask='+1 (999) 999-9999'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--'
											label='Luas Area'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='number'
												placeholder='Luas Area Tanah'
												aria-label='.form-control-lg example'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup
											id='exampleTypesPlaceholder--$'
											label='Harga per m^2'
											labelClassName='text-capitalize'>
											<Input
												// size='md'
												type='number'
												placeholder='Harga tanah per m^2'
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 mt-2'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Dicatat sebagai :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih --'
											// onChange={formikOneWay.handleChange}
											// value={formikOneWay.values.exampleSelectOneWay}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>

									{/* tipe bayar lahan */}
									<TipeBayar />
								</div>

								<div className='row g-4 mt-2'>
									<div className='col'>
										<FormGroup id='exampleSizeTextarea' label='Catatan'>
											<Textarea placeholder='Catatan mengenai lahan' />
										</FormGroup>
									</div>
								</div>
							</div>
						</div>
					</form>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							onClick={() => setUpcomingEventsEditOffcanvas(false)}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			{/* Modal Hapus Lahan */}
			<Modal
				isOpen={modalHapusLahan}
				setIsOpen={setModalHapusLahan}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='sm'
				fullScreen='sm'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Hapus Lahan ?
					</ModalTitle>
				</ModalHeader>

				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setModalHapusLahan(false)}>
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

export default CommonLahan;
