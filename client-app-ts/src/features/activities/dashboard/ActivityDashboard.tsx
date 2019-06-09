import React from 'react';
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
  deleteActivity: (activityId: string) => void;
  editMode: boolean;
  setSelectedActivity: (activity: Activity | null) => void;
  selectedActivity: Activity | null;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  createActivity,
  editActivity,
  setEditMode,
  editMode,
  setSelectedActivity,
  selectedActivity,
  deleteActivity
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
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {editMode &&  (
          <ActivityForm
            setEditMode={setEditMode}
            editActivity={editActivity}
            activity={selectedActivity}
            createActivity={createActivity}
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
