import Button from 'components/Form/button';
import React, { useEffect, useRef, useState } from 'react';
import { mutateMobile } from '../../../api-functions/mobileFiles';
import { Formik, Form } from 'formik';
import Input, { FileInput } from '../../../components/Form/formik-input';
import * as yup from 'yup';
import { wait } from 'utils';

const placeholderImgSrc = '/static/img/placeholder.bmp';
const initialValues = {
  title: '',
  imgUrl: '',
  manufacturer: '',
  points: '',
  price: '',
};

/**
 * Takes values from formik,
 *
 * transforms some values and creates a payload value,
 *
 * send request to backend using a user defined mutate fn
 *
 * @param {import('formik').FormikValues} values
 * @param {import('formik').FormikHelpers.<any> | {setMessage: () => void}} helpers
 */
const handleSaveMobile = async (values, helpers) => {
  const { points, imgUrl, ...data } = values;

  const newMobilePayload = {
    ...data,
    imgUrl: URL.createObjectURL(imgUrl),
    points: points
      .split(/\n|,/)
      .map((pointStr) => pointStr.trim())
      .filter(Boolean),
  };

  helpers.setSubmitting(true);
  await wait(3000);
  const res = await mutateMobile(newMobilePayload);

  if (res.success) {
    helpers.setMessage('Saved New Mobile Successfully!');
    helpers.resetForm(initialValues);
  } else {
    helpers.setMessage('Failed to Saved your Mobile!');
  }
  return res;
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
  message: {
    paddingLeft: '1rem',
  },
};

const ProductMasterPage = () => {
  const previewRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!previewRef.current) return;

    if (previewImg) {
      const localUrl = URL.createObjectURL(previewImg);
      previewRef.current.src = localUrl;
      return () => URL.revokeObjectURL(previewImg);
    } else {
      previewRef.current.src = placeholderImgSrc;
    }
  }, [previewImg]);

  return (
    <main style={styles.main}>
      <h1 style={styles.header}>Add New Product</h1>
      <div style={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validateOnBlur={true}
          validationSchema={addProductSchema}
          onSubmit={(values, helpers) =>
            handleSaveMobile(values, { ...helpers, setMessage })
          }
          onReset={() => setPreviewImg(null)}
        >
          {(formik) => (
            <Form style={styles.form}>
              <Input label="Product Name" name="title" />

              <FileInput
                label="Thumbnail"
                name="imgUrl"
                accept="image/*"
                onChange={(ev) => setPreviewImg(ev.currentTarget.files[0])}
              />

              {/* Preview image of product item */}
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
                <Button.Primary type="submit" isLoading={formik.isSubmitting}>
                  Save
                </Button.Primary>

                {message ? <span style={styles.message}>{message}</span> : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default ProductMasterPage;
