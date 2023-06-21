import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEvents } from '../../Core/Contexts/EventsContext';
import html2pdf from 'html2pdf.js';

import './WishlistPage.scss';
import { EventActionTypes } from '../../Core/Types/Types';

function WishlistPage() {
    const events = useEvents();
    const { wishlistData } = events;
    const exportOptions = {
        margin: 1,
        filename: 'wishlist.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const exportToPDF = (): void => {
        const element = document.getElementById('content-to-export');
        html2pdf().from(element).set(exportOptions).save();
    };

    const removeEvent = (id: string): void => {
        events.dispatch?.({
            type: EventActionTypes.RemoveFromWishlist,
            id
        });
    };

    return (
        <div className='wishlist'>
            <Container>
                <Row>
                    <Col className='text-center' md={{ span: 6, offset: 3 }}>
                        <h2 className='mt-4 mb-4'>Events wishlist</h2>
                    </Col>
                    <Col md={3}>
                        <Button disabled={!wishlistData?.length} className='mt-4 mb-4' onClick={exportToPDF}>
                            Export wishlist to .pdf
                        </Button>
                    </Col>
                </Row>
                <Row id='content-to-export'>
                    {wishlistData?.map(wishlistItem => (
                        <Card key={wishlistItem.id} className='wishlist-item'>
                            <Card.Body>
                                <Card.Title>{wishlistItem.name}</Card.Title>
                                <Card.Text>
                                    {wishlistItem.venueName}
                                </Card.Text>
                                <Card.Text>
                                    <strong>{wishlistItem.date}</strong>
                                </Card.Text>
                                <Card.Text>
                                    Tickets purchased: {wishlistItem.ticketsCount}
                                </Card.Text>
                                <Button onClick={() => removeEvent(wishlistItem.id)} size='sm' variant='danger' className='float-end'>
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}

                    {!wishlistData?.length && (
                        <div className='text-center mt-5'>
                            <span className='align-middle'>Your saved events will appear here</span>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default WishlistPage;