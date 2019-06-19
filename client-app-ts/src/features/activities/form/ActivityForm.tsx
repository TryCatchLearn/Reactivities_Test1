import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Grid } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import Activity, { ActivityToCreate } from '../../../app/models/activity';
import { Guid } from 'guid-typescript';
import { RouteComponentProps } from 'react-router';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { toast } from 'react-toastify';
import { inject, observer } from 'mobx-react';
import ActivityStore from '../../../app/stores/ActivityStore';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'The category is required' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date'),
  time: isRequired('time')
});

interface DetailParams {
  id: string;
}

interface IProps extends RouteComponentProps<DetailParams> {
  activityStore: ActivityStore;
}

const ActivityForm: React.FC<IProps> = ({ history, match, activityStore }) => {
  const { createActivity, editActivity, loadActivity } = activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id, { acceptCached: true }).then(activity => {
        if (activity) {
          activity.time = activity.date;
          setActivity(activity);
        }
      });
    }
  }, [loadActivity, match.params.id]);

  const [activity, setActivity] = useState<ActivityToCreate>({
    id: undefined,
    title: '',
    category: '',
    description: '',
    date: undefined,
    time: undefined,
    city: '',
    venue: ''
  });

  const handleFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity: Activity = {
        ...activity,
        id: Guid.create().toString()
      };
      createActivity(newActivity)
        .then(response => {
          console.log({ response });
          history.push(`/activities/${newActivity.id}`);
        })
        .catch(error => {
          toast.error('Oops, problem submitting form');
        });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            validate={validate}
            onSubmit={handleFormSubmit}
            render={({
              handleSubmit,
              invalid,
              submitting,
              pristine,
              submitError
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  value={activity.title}
                  component={TextInput}
                  placeholder='Title'
                />
                <Field
                  name='description'
                  value={activity.description}
                  component={TextAreaInput}
                  rows={3}
                  placeholder='Description'
                />
                <Field
                  name='category'
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                  placeholder='Category'
                />
                <Form.Group widths='equal'>
                  <Field
                    name='date'
                    date={true}
                    value={activity.date}
                    component={DateInput}
                    placeholder='Date'
                  />
                  <Field
                    name='time'
                    time={true}
                    value={activity.date}
                    component={DateInput}
                    placeholder='Time'
                  />
                </Form.Group>
                <Field
                  name='city'
                  value={activity.city}
                  component={TextInput}
                  placeholder='City'
                />
                <Field
                  name='venue'
                  value={activity.venue}
                  component={TextInput}
                  placeholder='Venue'
                />
                {submitError && <span>Submit error: {submitError}</span>}
                <Button
                  // disabled={invalid || pristine}
                  type='submit'
                  floated='right'
                  positive
                  loading={submitting}
                >
                  Submit
                </Button>
                <Button
                  type='button'
                  floated='right'
                  onClick={() => history.push('/activities')}
                >
                  Cancel
                </Button>
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default inject('activityStore')(observer(ActivityForm));
