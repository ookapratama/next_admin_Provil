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

interface IDataLahanProps {
	isFluid?: boolean;
}
const CommonKavling: FC<IDataLahanProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	// data form
	const [vCatatan, setVcatatan] = useState('tes');
	console.log(vCatatan);

	const SELECT_OPTIONS_CATATAN = [
		{ value: 'Belum', text: 'Pembelian Laham Baru (Belum dicatat pada Persediaan Tanah' },
		{ value: 'Sudah', text: 'Sebelumnya sudah dibeli (Sudah dicatat Persediaan Tanah' },
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
	const [editKavlingModal, setEditKavlingModal] = useState(false);
	const handleEditKavling = () => {
		setEditKavlingModal(!editKavlingModal);
	};

	const [modalHapusKavling, setModalHapusKavling] = useState(false);
	const handleModalHapus = () => {
		setModalHapusKavling(!modalHapusKavling);
	};

	const [addKavlingModal, setAddKavlingModal] = useState(false);
	const handleChangeCatatan = (e) => {
		setVcatatan(e.target.value);
	};
	// END :: Upcoming Events

	const formik = useFormik({
		onSubmit<Values>(
			values: Values,
			formikHelpers: FormikHelpers<Values>,
		): void | Promise<any> {
			console.log(values);
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
						<CardTitle>Data Kavling</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='primary'
							icon='Add'
							isLight
							onClick={() => {
								setAddKavlingModal(true);
							}}>
							Tambah Cluster
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>No</th>
								<th>Nama Cluster</th>
								<th>Blok</th>
								<th>No. Unit</th>
								<th>Jumlah Lantai</th>
								<th>LT (m2)</th>
								<th>LB (m2)</th>
								<th>Status Pembangunan</th>
								<th>Status Penjualan</th>
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
										<div className='flex-grow-1 d-flex align-items-center text-nowrap'>
											Cluster Residence 2
										</div>
									</td>
									<td>A2</td>
									<td>1</td>
									<td>2</td>
									<td>75</td>
									<td>36</td>
									<td>Kavling Kosong</td>
									<td>Siap Jual</td>
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
												onClick={handleEditKavling}>
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
				isOpen={addKavlingModal}
				setIsOpen={setAddKavlingModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Tambah Kavling
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Pilih Cluster :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Cluster --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Tipe Model'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='text'
											placeholder='Tipe Model'
											aria-label='.form-control-lg example'
											value='Kavling'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Blok'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='Jumlah blok'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Nomor unit'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='nomor unit'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Jumlah Lantai'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='jumlah lantai'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Pilih RAB & RAP :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih RAB & RAP --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='row g-4 '>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Tanah (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='luas tanah (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Bangunan (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='luas bangunan (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Harga'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder=''
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup id='exampleSizeTextarea' label='Spesifikasi'>
										<Textarea placeholder='' />
									</FormGroup>
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
						onClick={() => setAddKavlingModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Tambah Kavling
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Edit Lahan */}
			<Modal
				isOpen={editKavlingModal}
				setIsOpen={setEditKavlingModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Edit Kavling
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Pilih Cluster :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Cluster --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Tipe Model'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											readOnly
											type='text'
											placeholder='Tipe Model'
											aria-label='.form-control-lg example'
											value='Kavling'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Blok'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='Jumlah blok'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Nomor unit'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='nomor unit'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Jumlah Lantai'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='jumlah lantai'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Pilih RAB & RAP :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih RAB & RAP --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='row g-4 '>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Tanah (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='luas tanah (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Bangunan (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='luas bangunan (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Harga'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder=''
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup id='exampleSizeTextarea' label='Spesifikasi'>
										<Textarea placeholder='' />
									</FormGroup>
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
						onClick={() => setEditKavlingModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Update Kavling
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Hapus Lahan */}
			<Modal
				isOpen={modalHapusKavling}
				setIsOpen={setModalHapusKavling}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='sm'
				fullScreen='sm'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Hapus Cluster ?
					</ModalTitle>
				</ModalHeader>

				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setModalHapusKavling(false)}>
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

export default CommonKavling;
