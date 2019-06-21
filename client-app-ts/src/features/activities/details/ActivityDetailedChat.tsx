import React, { Fragment, useEffect } from 'react';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import { IComment } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

interface IProps {
  activityStore?: ActivityStore;
}

const ActivityDetailedChat: React.FC<IProps> = ({ activityStore }) => {
  const { activity, addComment } = activityStore!;

  useEffect(() => {
    activityStore!.createHubConnection();
    return () => {
      activityStore!.stopHubConnection();
    };
  }, [activityStore]);

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
          {activity!.comments.map((comment: IComment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, form }) => (
              <Form onSubmit={(event) => handleSubmit(event)!.then(() => form.reset())}>
                <Field
                  name='body'
                  component={TextAreaInput}
                  rows={2}
                  placeholder='Add your comment'
                />
                <Button
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default inject('activityStore')(observer(ActivityDetailedChat));
