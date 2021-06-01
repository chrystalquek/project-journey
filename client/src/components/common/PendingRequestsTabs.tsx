import React, { FC, useEffect } from 'react';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCommitmentApplications } from '@redux/actions/commitmentApplication';
import { getPendingVolunteers } from '@redux/actions/volunteer';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { Tabs } from '@components/common/Tabs';
import { useRouter } from 'next/dist/client/router';
import { getEventsUpcomingEvent } from '@redux/actions/event';
import { EventData } from '@type/event';
import { SignUpData } from '@type/signUp';

interface TabsProps {
    clickedOn: number
}

const PendingRequestsTabs: FC<TabsProps> = (props: TabsProps) => {
    const { clickedOn } = props;

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getEventsUpcomingEvent({ eventType: 'upcoming' }));
        dispatch(getPendingVolunteers());
        dispatch(getCommitmentApplications({ status: CommitmentApplicationStatus.Pending }));
    }, []);

    // volunteer no
    const volunteers = useSelector((state: StoreState) => state.pendingVolunteersState);
    const upcomingVolunteersIds = volunteers.pendingVolunteers.ids;

    // event no
    const events = useSelector((state: StoreState) => state.event);
    const signUps = useSelector((state: StoreState) => state.signUp);

    const upcomingEventsIds = events.upcomingEvent.ids;
    const upcomingSignUpsIds = signUps.pendingSignUps.ids;

    const upcomingEvents = upcomingEventsIds.map((id) => events.data[id]);
    const upcomingSignUps = upcomingSignUpsIds.map((id) => signUps.data[id]);

    const pendingRequestsForEventCount = (event: EventData) => {
        let result = 0;
        upcomingSignUps.forEach((signUp: SignUpData) => {
            if (signUp.eventId == event._id && signUp.status == 'pending') result++;
        });
        return result;
    };

    const upcomingEventsWithPendingSignUps = upcomingEvents.filter(event => (pendingRequestsForEventCount(event) != 0))

    const tabs = [
        {
            label: `Volunteers (${upcomingVolunteersIds.length})`,
            onClick: () => router.push('/volunteer/pending-requests'),
        },
        {
            label: `Events (${upcomingEventsWithPendingSignUps.length})`,
            onClick: () => router.push('/event/pending-requests'),
        },
    ];

    return (

        <Tabs tabs={tabs} clickedOn={clickedOn} />

    );
};

export default PendingRequestsTabs;
