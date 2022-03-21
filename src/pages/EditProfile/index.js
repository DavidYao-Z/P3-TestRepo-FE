import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import NavBar from '../../common/layout/Navbar'
import {PageWrapper} from './Elements'

const EditProfile = props => {
  const [formData, setFormDate] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook:'',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  return (
    <PageWrapper>
      <NavBar/>
      <EditProfileForm/>
    </PageWrapper>
  )
}

CreateProfile.propTypes = {

}

export default EditProfile
