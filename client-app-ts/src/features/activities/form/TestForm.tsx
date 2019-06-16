import React from 'react'
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';
import TextInputFormik from '../../../app/common/form/TextInputFormik';

interface MyFormValues {
    firstName: string;
  }

const TestForm = () => {
    return (
        <div>
           <h1>My Example</h1>
      <Formik
        initialValues={{ firstName: '' }}
        onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false)
         }}
        render={(formikBag: FormikProps<MyFormValues>) => (
          <Form>
            <Field
              name="firstName"
              component={TextInputFormik}
            //   render={({ field, form }: FieldProps<MyFormValues>) => (
            //     <div>
            //       <input type="text" {...field} placeholder="First Name" />
            //       {form.touched.firstName &&
            //         form.errors.firstName &&
            //         form.errors.firstName}
            //     </div>
            //   )}
            />
          </Form>
        )}
      />
        </div>
    )
}

export default TestForm
