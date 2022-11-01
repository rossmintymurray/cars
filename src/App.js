import React, {useState} from 'react';
import { Card, Container, Row, Col, CloseButton, Stack, Form, Button, Image} from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){

    const initialCars = [
        {
            id: uuid(),
            type: 'Peugot 205',
            description: 'Good handling, easy to drive',
            image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/Pug_21.JPG?itok=7Lakc1eO'
        }
    ];
    const [cars, setCars] = useState(initialCars);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newCar = [
            {
                id: uuid(),
                type: event.target[0].value,
                description: event.target[1].value,
                image: URL.createObjectURL(event.target[2].files[0])
            }
        ];
        setCars([...cars, newCar[0]]);

        event.target.reset();
    };

    const removeCar = (event) => {
        setCars(cars.filter(car => car.id !== event.target.id));
    }

    return(
        <Container>
            <h4 className={"mt-5 mb-2"}>Car Management</h4>
            {cars.map((car) => (
                <Card key={car.id} className={"mt-2 mb-2"} style={{backgroundColor: "#E1E8F1"}}>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col sm={1}>
                                <Image src={car.image} fluid />
                            </Col>
                            <Col sm={10}>
                                {car.type} - {car.description}.
                            </Col>
                            <Col sm={1} className={"text-end"}>
                                <CloseButton id={car.id} onClick={removeCar} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}

            <Form onSubmit={handleSubmit}>
                <Card style={{backgroundColor: "#F0F5FA"}} className={"p-2"}>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control id={"car_type"} placeholder="Car Type" />
                        <Form.Control id={"description"} placeholder="Description" />
                        <Form.Control type="file" />
                        <Button type={"submit"}>Save</Button>
                    </Stack>
                </Card>
            </Form>
        </Container>
    )
}

export default App;
