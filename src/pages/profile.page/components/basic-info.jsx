import React, { useState } from 'react';

import { useUser } from '../../../context/user';
import { Input } from '../../../components/Form';

const BasicInfoPage = () => {
  const {
    userState: { currentUser },
    dispatch,
  } = useUser();

  const [formData, setFormData] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { displayName: firstname, ...current } = currentUser;
    dispatch({
      type: 'ProfileUpdate',
      payload: { ...current, firstname, ...formData },
    });
  };

  return (
    <>
      <h1>Basic Information</h1>
      <p>
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Tempor orci dapibus
        ultrices in iaculis. Suspendisse potenti nullam ac tortor. In aliquam
        sem fringilla ut.
      </p>
      <br />
      <form onSubmit={handleSave} onChange={handleChange}>
        <div className="row">
          <Input
            label="firstname"
            type="text"
            defaultValue={currentUser.displayName}
          />
          <Input label="lastname" type="text" placeholder="nisai" />
        </div>
        <Input label="email" type="email" defaultValue={currentUser.email} />
        <div className="row">
          <Input label="phone" type="tel" placeholder="+91 |" />
          <Input label="birth" type="date" />
        </div>

        <p>
          In order to access some features of Service, you will have to star
          this project. We may use it for over advantage for more detail --click
          here--
        </p>
        <div>
          <button className="primary">save</button>{' '}
          <button type="button" className="secondary">
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default BasicInfoPage;
