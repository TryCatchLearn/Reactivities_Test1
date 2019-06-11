import React, { useState, ChangeEvent, useContext, useEffect } from 'react';
import { Button, Form, Segment, Grid } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import { Guid } from 'guid-typescript';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id, { acceptCached: true }).then(activity => {
      if (activity) setActivity(activity);
    });
  }, [activityStore, loadActivity, match.params.id]);

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: Guid.create().toString()
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label='Title'
              placeholder='Title'
              name='title'
              value={activity.title}
              onChange={handleInputChange}
            />
            <Form.Input
              label='Description'
              placeholder='Description'
              name='description'
              value={activity.description}
              onChange={handleInputChange}
            />
            <Form.Input
              label='Category'
              placeholder='Category'
              name='category'
              value={activity.category}
              onChange={handleInputChange}
            />
            <Form.Input
              label='Date'
              placeholder='Date'
              type='datetime-local'
              name='date'
              value={activity.date}
              onChange={handleInputChange}
            />
            <Form.Input
              label='City'
              placeholder='City'
              name='city'
              value={activity.city}
              onChange={handleInputChange}
            />
            <Form.Input
              label='Venue'
              placeholder='Venue'
              name='venue'
              value={activity.venue}
              onChange={handleInputChange}
            />
            <Button type='submit' floated='right' positive loading={submitting}>
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
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
