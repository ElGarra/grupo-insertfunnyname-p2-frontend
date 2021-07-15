import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './ReportForm.scss';

import BaseForm from '../BaseForm/BaseForm';
import BaseButton from '../../BaseButton/BaseButton';
import TextArea from '../TextArea/TextArea';

const ReportForm = ({ onSubmit, reportType }) => {
  const initialValues = { reason: '' };

  const validationSchema = Yup.object({
    reason: Yup.string()
      .min(1, 'Comments must have at least one character')
      .max(255, 'Comments cannot be longer than 255 characters')
      .required('This field is required'),
  });

  return (
    <BaseForm title={`Create ${reportType} report`}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <TextArea
            label="Report reason"
            id="reason"
            name="reason"
            placeholder="Write the reason here..."
            rows={3}
            minLength={1}
            maxLength={255}
          />
          <BaseButton type="submit" styleType="success">
            Submit
          </BaseButton>
        </Form>
      </Formik>
    </BaseForm>
  );
};

ReportForm.propTypes = {
  reportType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

ReportForm.defaultProps = {
  onSubmit: () => {},
};

export default ReportForm;
