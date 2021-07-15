import React, { createContext, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import useAuth from '../hooks/useAuth';
import ReportForm from '../components/Forms/ReportForm/ReportForm';
import apiClient, { parseErrors } from '../apis/backend';
import BaseButton from '../components/BaseButton/BaseButton';

export const ReportContext = createContext();

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const customStyles = {
  overlay: {
    zIndex: 100,
  },
  content: {
    marginLeft: 'auto',
    margin: 'auto',
    width: '60vw',
    maxWidth: '600px',
    height: '50vh',
    maxHeight: '400px',
  },
};

const ReportContextProvider = (props) => {
  const { children } = props;
  const { currentUser } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [idArg, setIdArg] = useState(null);

  const openModal = (newType, newIdArg) => () => {
    setType(newType);
    setIdArg(newIdArg);
    setModalIsOpen(true);
    setMessage(false);
  };

  const apiMethods = {
    comment: 'createCommentReport',
    user: 'createUserReport',
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const apiMethod = apiMethods[type];
      const response = await apiClient[apiMethod](idArg, formValues, currentUser);
      if (response.data.error) {
        parseErrors(response);
      }
      if (response.status !== 201) {
        throw new Error('Could not create report');
      }
      setMessage('Report created successfully! We will review it shortly...');
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <ReportContext.Provider value={{ openModal }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <ReportForm onSubmit={onSubmit} reportType={type} />
        {loading ? <p className="subtitle1">Creating report...</p> : null}
        {message ? <p className="subtitle1">{message}</p> : null}
        <BaseButton type="button" onClick={closeModal}>
          Close
        </BaseButton>
      </Modal>
    </ReportContext.Provider>
  );
};

ReportContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReportContextProvider;
