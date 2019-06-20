import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { inject, observer } from 'mobx-react';
import ProfileStore from '../../app/stores/ProfileStore';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../app/layout/LoadingComponent';

interface RouteParams {
    username: string
}

interface IProps extends RouteComponentProps<RouteParams> {
    profileStore: ProfileStore
}

const ProfilePage: React.FC<IProps> = ({profileStore, match}) => {
    const {loadProfile, loadingProfile, profile} = profileStore;

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match.params.username])

    if (loadingProfile || !profile) return <LoadingComponent content='Loading profile...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile}/>
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
}

export default inject('profileStore')(observer(ProfilePage))
