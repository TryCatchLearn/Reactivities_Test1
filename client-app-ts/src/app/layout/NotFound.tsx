import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const NotFound: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we've looked everywhere but couldn't find this.
            </Header>
            <Segment.Inline>
                <Button onClick={() => history.push('/activities')} primary>
                    Return to Activities page
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default withRouter(NotFound);