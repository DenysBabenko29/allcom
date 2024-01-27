import { ChangeEvent, FC, memo } from 'react';
import { FormikProps } from 'formik';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import FormikInputField from '../../../components/FormikInputField/FormikInputField';
import Datepicker from '../../../components/Datepicker/Datepicker';
import FormikTextAriaField from '../../../components/FormikTextAriaField/FormikTextAriaField';
import { ProductFormValues } from '../../../types/product/ProductFormValues';
import SwiperModalWindow from '../../../components/SwiperModalWindow/SwiperModalWindow';

import styles from './ProductFields.module.scss';
import Spinner from '../../../components/Spinner/Spinner';

const DECIMAL_STEP = '0.01';

type Options = {
	value: number;
	label: string;
};

interface PropsInterface {
	loadingImage?: boolean;
	onDeleteImage: (index: number) => void;
	onFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
	linkList: string[];
	values: ProductFormValues;
	handleChange: FormikProps<ProductFormValues>['handleChange'];
	setFieldValue: FormikProps<ProductFormValues>['setFieldValue'];
	resizingError: string | undefined;
}
const ProductFields: FC<PropsInterface> = (props) => {
	const {
		linkList,
		values,
		handleChange,
		onDeleteImage,
		onFileChange,
		setFieldValue,
		resizingError,
		loadingImage,
	} = props;

	const { t } = useTranslation('product_fields');

	const selectOptionsCategory: Options[] = [
		{ value: 1, label: t('categories:category_1') },
		{ value: 2, label: t('categories:category_2') },
		{ value: 3, label: t('categories:category_3') },
		{ value: 4, label: t('categories:category_4') },
		{ value: 5, label: t('categories:category_5') },
		{ value: 6, label: t('categories:category_6') },
		{ value: 7, label: t('categories:category_7') },
		{ value: 8, label: t('categories:category_8') },
		{ value: 9, label: t('categories:category_9') },
	];

	const filterOptions = (selectedValue: number): Options[] => {
		return selectOptionsCategory.filter(({ value }) => value === selectedValue);
	};

	const selectOptionsArea: Options[] = [
		{ value: 1, label: 'R' },
		{ value: 2, label: 'L' },
	];

	return (
		<>
			<div className={styles.container}>
				<div className={styles.add_img}>
					<h3>{t('product_foto')}</h3>
					<input
						className={`form-control ${styles.file_form}`}
						name="product.images"
						type="file"
						id="formFileMultiple"
						multiple
						onChange={onFileChange}
					/>
					{loadingImage ? (
						<div className="d-flex align-items-center justify-content-center h-100">
							<Spinner />
						</div>
					) : (
						<>
							<SwiperModalWindow images={linkList} onDelete={onDeleteImage} />
						</>
					)}
					{resizingError && <div className="warning_message--validation">{resizingError}</div>}
				</div>
				<div className={styles.product_info}>
					<div className={styles.product_info__details}>
						<h3 className="mb-3">{t('product_info')}</h3>
						<FormikInputField
							name="product.name"
							placeholder={t('name')}
							id="productName"
							value={values.product.name}
						/>
						<FormikTextAriaField
							name="product.description"
							placeholder={t('description')}
							id="description"
							className={styles.description}
							value={values.product.description}
						/>
						<div className="d-flex">
							<FormikInputField
								name="product.weight"
								placeholder={t('weight')}
								id="weight"
								type="number"
								step={DECIMAL_STEP}
								value={values.product.weight}
							/>
							<FormikInputField
								name="product.color"
								placeholder={t('color')}
								id="color"
								value={values.product.color}
							/>
						</div>
						<Select
							defaultValue={selectOptionsCategory}
							value={filterOptions(values.product.categoryId)}
							name="product.categoryId"
							options={selectOptionsCategory}
							onChange={(option) =>
								setFieldValue('product.categoryId', option ? option.value : null)
							}
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
							})}
						/>
					</div>
					<div className={styles.verticale}></div>
					<div className={styles.product_info__auction}>
						<h3 className="mb-3">{t('auction_info')}</h3>
						<div className={styles.datepicker}>
							<FormikInputField
								id="startPrice"
								name="auction.startPrice"
								placeholder={t('start_price')}
								type="number"
								value={values.auction.startPrice}
							/>
							<Datepicker
								id="startAt"
								name="auction.startAt"
								label={t('start_at')}
								value={values.auction.startAt}
								handleChange={handleChange}
							/>
							<Datepicker
								id="plannedEndAt"
								name="auction.plannedEndAt"
								label={t('planned_end_at')}
								value={values.auction.plannedEndAt}
								handleChange={handleChange}
							/>
						</div>
					</div>
					<div className={styles.verticale}></div>
					<div className={styles.product_info__storage}>
						<h3 className="mb-3">{t('storage_info')}</h3>
						<div className={styles.product_info__storage__item}>
							<Select
								id="area"
								defaultValue={selectOptionsArea[0]}
								value={selectOptionsArea.find((option) => option.label === values.storage.area)}
								name="storage.area"
								options={selectOptionsArea}
								onChange={(option) => setFieldValue('storage.area', option ? option.value : null)}
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									spacing: {
										...theme.spacing,
										controlHeight: 48,
									},
								})}
							/>
							<FormikInputField
								name="storage.rack"
								id="rack"
								type="number"
								value={values.storage.rack}
							/>
							<FormikInputField
								name="storage.section"
								id="section"
								type="number"
								value={values.storage.section}
							/>
							<FormikInputField
								name="storage.shelve"
								id="shelve"
								type="number"
								value={values.storage.shelve}
							/>
							<button type="submit" name="submit" className={styles.btn}>
								{t('btn')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(ProductFields);