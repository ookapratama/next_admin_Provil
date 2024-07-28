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
import Option from '@call-components/bootstrap/Option';

interface IDataLahanProps {
	isFluid?: boolean;
}
const CommonCluster: FC<IDataLahanProps> = ({ isFluid }) => {
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
	const [editClusterModal, setEditClusterModal] = useState(false);
	const handleEditLahan = () => {
		setEditClusterModal(!editClusterModal);
	};

	const [modalHapusCluster, setModalHapusCluster] = useState(false);
	const handleModalHapus = () => {
		setModalHapusCluster(!modalHapusCluster);
	};

	const [addClusterModal, setAddClusterModal] = useState(false);
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
						<CardTitle>Data Cluster</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='primary'
							icon='Add'
							isLight
							onClick={() => {
								setAddClusterModal(true);
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
								<th>Nama</th>
								<th>Kota</th>
								<th>No. HP</th>
								<th>Luas Tanah Total</th>
								<th>Total Unit</th>
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
											Cluster pembangunan 1
										</div>
									</td>
									<td>Kota Makassar</td>
									<td>
										<div>08123456789</div>
									</td>
									<td>12000.00</td>
									<td className='text-center'>80</td>
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
												onClick={handleEditLahan}>
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
				isOpen={addClusterModal}
				setIsOpen={setAddClusterModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Tambah Cluster
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Nama Cluster'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='Masukkan Nama Cluster'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='No. Hp'
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

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Tanah Total (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='Luas tanah total (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Total unit'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='total unit'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Provinsi :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Provinsi --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kota :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Kota --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kecamatan'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='kecamatan'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kelurahan'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='kelurahan'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup id='exampleSizeTextarea' label='Alamat lengkap'>
										<Textarea placeholder='alamat' />
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
						onClick={() => setAddClusterModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Tambah Cluster
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Edit Lahan */}
			<Modal
				isOpen={editClusterModal}
				setIsOpen={setEditClusterModal}
				titleId='exampleModalLabel'
				// isStaticBackdrop={staticBackdropStatus}
				isScrollable={true}
				isCentered={true}
				size='xl'
				fullScreen='xl'
				isAnimation={false}>
				<ModalHeader>
					<ModalTitle id='exampleModalLabel' tag='h2' className='m-3'>
						Edit Cluster
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Nama Cluster'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='Masukkan Nama Cluster'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='No. Hp'
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

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Luas Tanah Total (m2)'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='Luas tanah total (m2)'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Total unit'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='number'
											placeholder='total unit'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='row g-4'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Provinsi :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Provinsi --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kota :'
										labelClassName='text-capitalize'>
										<Select
											// size='md'
											ariaLabel='Default select example'
											placeholder='-- Pilih Kota --'
											// onChange={(v) => setVcatatan(v)}
											// value={vCatatan}
											list={SELECT_OPTIONS_CATATAN}
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kecamatan'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='kecamatan'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup
										id='exampleTypesPlaceholder--$'
										label='Kelurahan'
										labelClassName='text-capitalize'>
										<Input
											// size='md'
											type='text'
											placeholder='kelurahan'
										/>
									</FormGroup>
								</div>

								<div className='row g-4 mt-1'>
									<FormGroup id='exampleSizeTextarea' label='Alamat lengkap'>
										<Textarea placeholder='alamat' />
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
						onClick={() => setEditClusterModal(false)}>
						Close
					</Button>
					<Button color='info' icon='Save'>
						Update Cluster
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Hapus Lahan */}
			<Modal
				isOpen={modalHapusCluster}
				setIsOpen={setModalHapusCluster}
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
						onClick={() => setModalHapusCluster(false)}>
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

export default CommonCluster;
