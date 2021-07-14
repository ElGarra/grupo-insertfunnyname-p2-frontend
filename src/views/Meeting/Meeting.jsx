import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import BaseCard from '../../components/Cards/BaseCard/BaseCard';
import MeetingCard from '../../components/Cards/MeetingCard/MeetingCard';
import ElementToggler from '../../components/ElementToggler/ElementToggler';
import MeetingEditForm from '../../components/Forms/MeetingEditForm/MeetingEditForm';

import useAuth from '../../hooks/useAuth';

const Meeting = () => {
  const { currentUser } = useAuth();
  const { meetingId } = useParams();
  const history = useHistory();
  const [meeting, setMeeting] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.getMeeting(meetingId, currentUser);
      const meetingData = response.data.meeting;
      if (!meetingData) {
        throw new Error();
      }
      setMeeting(meetingData);
    } catch (error) {
      setMessage('Could not retrieve meeting!');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMeetingInfo = (data) => {
    const newMeeting = { ...meeting, ...data };
    setMeeting(newMeeting);
  };

  const deleteMeeting = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.deleteMeeting(meetingId, currentUser);
      if (response.status !== 204) {
        throw new Error();
      }
      setLoading(false);
      history.goBack();
    } catch (error) {
      setMessage('Could not delete meeting');
      setLoading(false);
    }
  };

  const renderMeetingContents = () => {
    const { type, date } = meeting;
    const splitDate = new Date(date).toISOString().split('T');
    const datePart = splitDate[0];
    const timePart = splitDate[1].split(':', 2).slice(0, 2).join(':');

    return (
      <>
        <MeetingCard meeting={meeting} />
        <ElementToggler prompt="Edit meeting">
          <BaseCard padding>
            <MeetingEditForm
              meetingId={meetingId}
              initialValues={{ type, datePart, timePart }}
              parentCallback={updateMeetingInfo}
            />
          </BaseCard>
        </ElementToggler>
        <BaseButton onClick={deleteMeeting} styleType="warning">
          Delete meeting
        </BaseButton>
      </>
    );
  };

  return (
    <div>
      {!currentUser && <Redirect to="/" />}
      <h1 className="view-title">Meeting</h1>
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {meeting.id ? renderMeetingContents() : null}
    </div>
  );
};

export default Meeting;
