import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../../common/layout/SpinnerGraphic';
import {
  WelcomeWord,
  PersonalBackgroundWrapper,
  EduExpContainer,
  DashboardWrapper,
  DeleteSection,
  DeleteButton,
  DashboardTitle,
  WelcomeIcon,
  PersonalBackgroundContainer,
  CreateProfileContainer
} from './DashboardElements';
import CreateProfileForm from './components/CreateProfileForm';
import NavBar from '../../common/layout/Navbar';
import DashboardAction from './components/DashboardAction';
import Experience from './components/Experiences';
import Education from './components/Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <DashboardWrapper>
      <NavBar />
      <Spinner />
    </DashboardWrapper>
  ) : (
    <DashboardWrapper>
      <NavBar />
      {profile !== null ? (
        <Fragment>
          <PersonalBackgroundWrapper>
            <PersonalBackgroundContainer>
              <DashboardTitle>Dashboard</DashboardTitle>
              <WelcomeWord>
                {' '}
                <WelcomeIcon />
                Welcome {user && user.name}
              </WelcomeWord>
              <DashboardAction />
              <EduExpContainer>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
              </EduExpContainer>
              <DeleteSection>
                <DeleteButton onClick={deleteAccount}>
                  Delete My Account
                </DeleteButton>
              </DeleteSection>
            </PersonalBackgroundContainer>
          </PersonalBackgroundWrapper>
        </Fragment>
      ) : (
        <CreateProfileContainer>
          <CreateProfileForm />
          <DeleteSection>
            <DeleteButton onClick={() => deleteAccount()}>
              Delete My Account
            </DeleteButton>
          </DeleteSection>
        </CreateProfileContainer>
      )}
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
