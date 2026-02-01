import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button/Button";
import styles from "./ReservationForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  date: Yup.date().required("Required"),
  comment: Yup.string(),
});

const initialFormValues = {
  name: "",
  email: "",
  date: "",
  comment: "",
};

const ReservationForm = () => {
  const handleSubmit = (formData, { resetForm }) => {
    console.log("Reservation data:", formData);
    alert("Booking successful!");
    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Book your campervan now</h3>
      <p className={styles.description}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.formField}>
              <Field
                name="name"
                type="text"
                placeholder="Name*"
                className={`${styles.textInput} ${touched.name && errors.name ? styles.hasError : ""}`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMsg}
              />
            </div>

            <div className={styles.formField}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${styles.textInput} ${touched.email && errors.email ? styles.hasError : ""}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMsg}
              />
            </div>

            <div className={styles.formField}>
              <Field
                name="date"
                type="date"
                placeholder="Booking date*"
                className={`${styles.textInput} ${touched.date && errors.date ? styles.hasError : ""}`}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={styles.errorMsg}
              />
            </div>

            <div className={styles.formField}>
              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={`${styles.textArea} ${touched.comment && errors.comment ? styles.hasError : ""}`}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.errorMsg}
              />
            </div>

            <div className={styles.submitSection}>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationForm;
