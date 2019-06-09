import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import { Guid } from 'guid-typescript';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: Activity | null;
  createActivity: (activity: Activity) => void;
  editActivity: (activity: Activity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [activity, setActivity] = useState<Activity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: Guid.create().toString()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
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
          type='date'
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
        <Button type='submit' floated='right' positive>
          Submit
        </Button>
        <Button
          type='button'
          floated='right'
          onClick={() => setEditMode(false)}
        >
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
