import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MyEventData } from '../../Core/Types/Types';
import EventImage from '../Shared/Events/EventImage';

function MyEventsPage(): React.JSX.Element {
    const [hasRemoved, setHasRemoved] = useState(false);
    const localStorageEvents = { ...localStorage };

    const myEvents = Object.entries(localStorageEvents).map(event => {
        return {
            id: event[0],
            ...JSON.parse(event[1])
        };
    });

    const removeEvent = (id: string) => (): void => {
        setHasRemoved(true);
        localStorage.removeItem(id);
    };

    if (hasRemoved) {
        console.log('user has removed an event', hasRemoved);

        setHasRemoved(false);
    }

    return (
        <div className='page my-events'>
            <Container>
                <Row>
                    <Col className='text-center' xs={12}>
                        <h2 className='mt-4 mb-4'>My events</h2>
                    </Col>
                </Row>
                <Row>
                    {myEvents.map((eventData: MyEventData) => (
                        <Col key={`event-${eventData.id}`} className='event text-center' xs={12} sm={6} md={3}>
                            <h4 className='event-title'>{eventData.name}</h4>
                            <EventImage image={eventData.image} />
                            <p className='mb-0'>
                                <strong>{eventData.location}</strong><br />
                                <small>{eventData.date}</small>
                            </p>
                            <Button size='sm' variant='danger' className='view-details' onClick={removeEvent(eventData.id)}>
                                Remove event
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default MyEventsPage;