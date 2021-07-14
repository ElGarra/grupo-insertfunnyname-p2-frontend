import React, { useEffect, useState } from 'react';

import './Admin.scss';

import apiClient from '../../apis/backend';
import BaseButton from '../../components/BaseButton/BaseButton';
import BaseTable from '../../components/Tables/BaseTable/BaseTable';
import useAuth from '../../hooks/useAuth';

const Admin = () => {
  const { currentUser } = useAuth();
  const [userReports, setUserReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async () => {
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

  return (
    <div>
      <h1 className="view-title">User reports</h1>
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {userReports ? (
        <BaseTable>
          <div className="row header">
            <div className="cell">
              UserId
            </div>
            <div className="cell">
              ReportedUserId
            </div>
            <div className="cell">
              Reason
            </div>
          </div>
          {userReports.map((report) => (
            <div className="row header">
              <div className="cell">
                {report.userId}
              </div>
              <div className="cell">
                {report.reportedUserId}
              </div>
              <div className="cell">
                {report.reason}
              </div>
            </div>
          ))}
        </BaseTable>
      ) : null}

      <h1 className="view-title">Comment reports</h1>
      {loading ? <p className="subtitle1">Loading...</p> : null}
      {message ? <p className="subtitle1">{message}</p> : null}
      {userReports ? (
        <BaseTable>
          <div className="row header">
            <div className="cell">
              UserId
            </div>
            <div className="cell">
              CommentId
            </div>
            <div className="cell">
              Reason
            </div>
            <div className="cell"> </div>
          </div>
          {commentReports.map((report) => (
            <div className="row header">
              <div className="cell">
                {report.userId}
              </div>
              <div className="cell">
                {report.commentId}
              </div>
              <div className="cell">
                {report.reason}
              </div>
              <div className="cell">
                <BaseButton type="button">
                  Edit property
                </BaseButton>
              </div>
            </div>
          ))}
        </BaseTable>
      ) : null}
    </div>
  );
};

export default Admin;
