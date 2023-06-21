import { BaseSyntheticEvent, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

const generateId = (): string => 'id' + Math.random().toString(16).slice(2);

function AddNewEventPage(): React.JSX.Element {
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState('');

    function handleChange(e: BaseSyntheticEvent): void {
        if (!e.target.files.length) {
            setImage('');
            return;
        }

        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const createEvent = (e: BaseSyntheticEvent): void => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(e.target);
        const name = data.get('name');
        const location = data.get('location');
        const date = data.get('date');
        const image = data.get('image');


        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        // ensure we don't do anything past this point if some data is missing
        if (!name || !date || !location || !image || (image as File).size === 0) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function () {
            const base64image = reader.result;

            // save form to localStorage
            const newEvent = {
                name,
                location,
                date,
                image: base64image,
            };

            localStorage.setItem(generateId(), JSON.stringify(newEvent));

            // clear form and reset validations
            e.target.reset();
            setValidated(false);
            setImage('');
        };
        reader.readAsDataURL(image as Blob);
    };

    return (
        <div className='page add-new-event'>
            <Container>
                <Row>
                    <Col className='text-center' xs={12}>
                        <h2 className='mt-4 mb-4'>Add new event</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        {/* name, date, locatiom, picture */}
                        <Form noValidate validated={validated} onSubmit={createEvent}>
                            <Form.Group className='mb-3' controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type='text' name='name' placeholder='Enter name' />
                                <Form.Control.Feedback type='invalid'>
                                    Please enter a name
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control required type='text' name='location' placeholder='Enter location' />
                                <Form.Control.Feedback type='invalid'>
                                    Please enter a location
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control required type='date' name='date' placeholder='Enter date' />
                                <Form.Control.Feedback type='invalid'>
                                    Please add a date
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control required onChange={handleChange} name='image' type='file' placeholder='Upload image' />
                                <Form.Control.Feedback type='invalid'>
                                    Please add an image
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Image fluid src={image} />

                            <Button className='float-end mt-3 mb-3' variant='primary' type='submit'>
                                Add event
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddNewEventPage;