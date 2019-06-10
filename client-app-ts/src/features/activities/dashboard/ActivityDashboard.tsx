import React, { SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
  activities: Activity[];
  createActivity: (activity: Activity) => void;
  editActivity: (activity: Activity) => void;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement> ,activityId: string) => void;
  editMode: boolean;
  setSelectedActivity: (activity: Activity | null) => void;
  selectedActivity: Activity | null;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  createActivity,
  editActivity,
  setEditMode,
  editMode,
  setSelectedActivity,
  selectedActivity,
  deleteActivity,
  submitting,
  target
}) => {

  const handleSelectActivity = (activity: Activity) => {
    setEditMode(false);
    setSelectedActivity(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={handleSelectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {editMode &&  (
          <ActivityForm
            setEditMode={setEditMode}
            editActivity={editActivity}
            activity={selectedActivity}
            createActivity={createActivity}
            submitting={submitting}
          />
        )}
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            setEditMode={setEditMode}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
