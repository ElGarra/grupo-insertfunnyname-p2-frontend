import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './PropertyForm.scss';

import apiClient from '../../../apis/backend';
import BaseForm from '../BaseForm/BaseForm';
import TextInput from '../TextInput/TextInput';
import BaseButton from '../../BaseButton/BaseButton';
import useAuth from '../../../hooks/useAuth';
import TextArea from '../TextArea/TextArea';
import Select from '../Select/Select';

const PropertyForm = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setimageFile] = useState({});

  const initialValues = {
    title: '',
    type: '',
    bathrooms: 0,
    bedrooms: 0,
    size: 0,
    region: '',
    commune: '',
    street: '',
    streetNumber: 0,
    description: '',
    price: 0,
    listingType: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(1, 'Title must be at least 1 character long')
      .max(255, 'Title cannot be longer than 255 characters')
      .required('This field is required'),
    type: Yup.string()
      .oneOf(
        [
          'house',
          'apartment',
          'tent',
          'cabin',
          'lot',
          'farm',
          'room',
          'mansion',
          'business',
          'office',
          'other',
        ],
        'You must select a type of property',
      )
      .required('This field is required'),
    bathrooms: Yup.number()
      .min(0, 'Bathrooms cannot be less than 0')
      .max(999, 'Bathrooms cannot be greater than 999')
      .nullable(),
    bedrooms: Yup.number()
      .min(0, 'Bedrooms cannot be less than 0')
      .max(999, 'Bedrooms cannot be greater than 999')
      .nullable(),
    size: Yup.number()
      .min(0, 'Size cannot be less than 0')
      .max(999999, 'Size cannot be greater than 999,999')
      .nullable(),
    region: Yup.string()
      .min(0, 'Region cannot be empty')
      .max(255, 'Region cannot be longer than 255 characters')
      .required('This field is required'),
    commune: Yup.string()
      .min(0, 'Commune cannot be empty')
      .max(255, 'Commune cannot be longer than 255 characters')
      .required('This field is required'),
    street: Yup.string()
      .min(0, 'Street cannot be empty')
      .max(255, 'Street cannot be longer than 255 characters')
      .required('This field is required'),
    streetNumber: Yup.number()
      .min(0, 'Street number cannot be less than 0')
      .max(999999, 'Street number cannot be greater than 999,999')
      .nullable(),
    description: Yup.string()
      .max(255, 'Description cannot be longer than 1000 characters')
      .nullable(),
    price: Yup.number()
      .min(0, 'Price cannot be less than 0')
      .max(9999999999, 'Price cannot be greater than 9,999,999,999'),
    listingType: Yup.string()
      .oneOf(['sale', 'rent'], 'You must select a type of listing')
      .required('This field is required'),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      setMessage('');
      const response = await apiClient.createProperty({ ...formValues, imageFile }, currentUser);
      const { error } = response.data;
      if (error) {
        let errorMessage = `${error}. `;
        const { errors } = response.data;
        if (errors) {
          errorMessage += Object.values(errors).join('. ');
          errorMessage += '.';
        }
        throw new Error(errorMessage);
      }
      if (response.status === 201) {
        setMessage('Property created');
        const propertyId = response.data.id;
        history.push(`/properties/${propertyId}`);
      } else {
        throw new Error('Could not create property');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseForm>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
          <Form>
            <TextInput
              type="text"
              label="Property title"
              id="title"
              name="title"
              placeholder="Property title"
            />
            <Select label="Type" id="type" name="type">
              <option label=" " value="" />
              <option label="House" value="house" />
              <option label="Apartment" value="apartment" />
              <option label="Tent" value="tent" />
              <option label="Cabin" value="cabin" />
              <option label="Lot" value="lot" />
              <option label="Farm" value="farm" />
              <option label="Room" value="room" />
              <option label="Mansion" value="mansion" />
              <option label="Business" value="business" />
              <option label="Office" value="office" />
              <option label="Other" value="other" />
            </Select>
            <TextInput
              type="number"
              label="Bathrooms"
              id="bathrooms"
              name="bathrooms"
              placeholder="Bathrooms"
              min={0}
              max={999}
            />
            <TextInput
              type="number"
              label="Bedrooms"
              id="bedrooms"
              name="bedrooms"
              placeholder="Bedrooms"
              min={0}
              max={999}
            />
            <TextInput
              type="number"
              label="Size"
              id="size"
              name="size"
              placeholder="Size"
              min={0}
              max={999999}
            />
            <TextInput type="text" label="Region" id="region" name="region" placeholder="Region" />
            <TextInput
              type="text"
              label="Commune"
              id="commune"
              name="commune"
              placeholder="Commune"
            />
            <TextInput type="text" label="Street" id="street" name="street" placeholder="Street" />
            <TextInput
              type="number"
              label="Street Number"
              id="streetNumber"
              name="streetNumber"
              placeholder="Street Number"
              min={0}
              max={999999}
            />
            <TextArea
              label="Description"
              id="description"
              name="description"
              placeholder="Description"
              rows={3}
              minLength={0}
              maxLength={1000}
            />
            <TextInput
              type="number"
              label="Price"
              id="price"
              name="price"
              placeholder="Price"
              min={0}
              max={9999999999}
            />
            <Select label="Property listing" id="listingType" name="listingType">
              <option label=" " value="" />
              <option label="Sale" value="sale" />
              <option label="Rent" value="rent" />
            </Select>
            <TextInput
              type="file"
              label="Property Image"
              id="imageFile"
              name="imageFile"
              onChange={async (e) => {
                setimageFile(e.currentTarget.files[0]);
              }}
            />
            <BaseButton type="submit">Submit</BaseButton>
          </Form>
        )}
      </Formik>
      {loading ? <p className="subtitle1">Posting property...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
    </BaseForm>
  );
};

export default PropertyForm;
