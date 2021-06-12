import Button from 'components/Form/button';
import React, { useEffect, useRef, useState } from 'react';
import { mutateMobile } from '../../../api-functions/mobileFiles';
import { Formik, Form } from 'formik';
import Input, { FileInput } from '../../../components/Form/formik-input';
import * as yup from 'yup';

/**
 * Takes values from formik,
 *
 * transforms some values and creates a payload value,
 *
 * send request to backend using a user defined mutate fn
 */
const handleSubmit = (values) => {
  const { points, imgUrl, ...data } = values;

  const newMobilePayload = {
    ...data,
    imgUrl: URL.createObjectURL(imgUrl),
    points: points
      .split(/\n|,/)
      .map((pointStr) => pointStr.trim())
      .filter(Boolean),
  };

  console.log(`newMobilePayload`, newMobilePayload);

  mutateMobile(newMobilePayload);
};

const initialValues = {
  title: '',
  imgUrl: '',
  manufacturer: '',
  points: '',
  price: '',
};

const addProductSchema = yup.object({
  title: yup.string().required(),
  manufacturer: yup.string().required(),
  imgUrl: yup.mixed('File mixed').required('Image File is required'),
  points: yup
    .string()
    .required()
    .matches(/.+\n.+/, 'Must have atleast 2 highlights'),
  price: yup.number().required().min(10000).max(50000),
});

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  main: {
    paddingTop: '4rem',
  },
  header: {
    textAlign: 'center',
  },
  formWrapper: {
    padding: '4rem',
    display: 'grid',
    placeItems: 'center',
  },
  form: {
    width: '60vw',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formTextArea: {
    resize: 'vertical',
  },
  previewImgWrapper: {
    width: '12rem',
    height: '12rem',
  },
  previewImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
};

const ProductMasterPage = () => {
  const previewRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    if (!(previewRef.current && previewImg)) return;

    const localUrl = URL.createObjectURL(previewImg);

    previewRef.current.src = localUrl;

    return () => URL.revokeObjectURL(previewImg);
  }, [previewImg]);

  return (
    <main style={styles.main}>
      <h1 style={styles.header}>Add New Product</h1>
      <div style={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validateOnBlur={true}
          validationSchema={addProductSchema}
          onSubmit={handleSubmit}
        >
          <Form style={styles.form}>
            <Input label="Product Name" name="title" />

            <FileInput
              label="Thumbnail"
              name="imgUrl"
              accept="image/*"
              onChange={(ev) => setPreviewImg(ev.currentTarget.files[0])}
            />
            <div style={styles.previewImgWrapper}>
              <img
                style={styles.previewImg}
                ref={previewRef}
                alt="product preview"
              />
            </div>

            <Input label="Manufacturer" name="manufacturer" />

            <Input
              style={styles.formTextArea}
              label="Features (seperate in lines or by comma)"
              name="points"
              as="textarea"
              rows="5"
            />
            <Input label="Price in Rupees" name="price" />

            <div>
              <Button.Primary type="submit">Save</Button.Primary>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default ProductMasterPage;
