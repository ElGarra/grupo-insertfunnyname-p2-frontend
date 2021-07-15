import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Admin.scss';

import useAuth from '../../hooks/useAuth';
import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import BaseTable from '../../components/Tables/BaseTable/BaseTable';

const Admin = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [userReports, setUserReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const userIsAdmin = currentUser && jwtDecode(currentUser).admin;

  useEffect(async () => {
    if (!userIsAdmin) {
      history.push('/');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient.retrieveReports(currentUser);
      const userReportsData = await response.data.userReports;
      const commentReportsData = response.data.commentReports;
      if (!userReportsData && !commentReportsData) {
        throw new Error();
      }
      if (userReportsData.length === 0 && commentReportsData.length === 0) {
        setMessage('There are no reports to show, come back later!');
      }
      setUserReports(userReportsData);
      setCommentReports(commentReportsData);
    } catch (error) {
      setMessage('Could not retrieve reports!');
    } finally {
      setLoading(false);
    }
  }, []);

  const objTypes = {
    comment: {
      method: 'adminDeleteComment',
      stateObj: commentReports,
      setStateObj: setCommentReports,
      args: ['propertyId', 'commentId'],
      idField: 'commentId',
    },
    user: {
      method: 'adminDeleteUser',
      stateObj: userReports,
      setStateObj: setUserReports,
      idField: 'reportedUserId',
    },
  };

  const deleteObject = (objType, report, args) => async () => {
    const {
      method, //
      stateObj,
      setStateObj,
      idField,
    } = objTypes[objType];
    try {
      setLoading(true);
      setMessage('');
      const response = await apiClient[method](...args, currentUser);
      if (response.status !== 204) {
        throw new Error();
      }
      setLoading(false);
      const newState = stateObj.filter((obj) => obj[idField] !== report[idField]);
      setStateObj(newState);
    } catch (error) {
      setMessage(`Could not delete ${objType}`);
      setLoading(false);
    }
  };

  return (
    <>
      {userIsAdmin ? null : <Redirect to="/" />}
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {userReports ? (
        <BaseTable
          title="User reports"
          headers={[
            'User ID',
            'Reported User ID',
            'Reason',
            'Profile picture',
            'Name',
            'Email',
            'Delete',
          ]}
        >
          {userReports.map((report) => {
            const reportedUserName = `${report.reportedUser.firstName} ${report.reportedUser.lastName}`;
            return (
              <div key={report.id} className="row">
                <div className="cell">{report.userId}</div>
                <div className="cell">{report.reportedUserId}</div>
                <div className="cell">{report.reason}</div>
                <div className="cell">
                  <img src={report.reportedUser.avatarLink} alt={`${reportedUserName} Profile`} />
                </div>
                <div className="cell">{reportedUserName}</div>
                <div className="cell">{report.reportedUser.email}</div>
                <div className="cell">
                  <BaseButton
                    type="button"
                    styleType="warning"
                    onClick={deleteObject('user', report, [report.reportedUserId])}
                  >
                    Delete user
                  </BaseButton>
                </div>
              </div>
            );
          })}
        </BaseTable>
      ) : null}

      {commentReports ? (
        <BaseTable
          title="Comment reports"
          headers={['User ID', 'Comment ID', 'Reason', 'Comment body', 'Delete']}
        >
          {commentReports.map((report) => (
            <div key={report.id} className="row">
              <div className="cell">{report.userId}</div>
              <div className="cell">{report.commentId}</div>
              <div className="cell">{report.reason}</div>
              <div className="cell">{report.Comment.body}</div>
              <div className="cell">
                <BaseButton
                  type="button"
                  styleType="warning"
                  onClick={deleteObject('comment', report, [
                    report.Comment.propertyId,
                    report.commentId,
                  ])}
                >
                  Delete comment
                </BaseButton>
              </div>
            </div>
          ))}
        </BaseTable>
      ) : null}
    </>
  );
};

export default Admin;
