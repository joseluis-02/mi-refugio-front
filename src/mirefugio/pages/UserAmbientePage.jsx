import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "../../hooks";
import { getMisVersiculosApi, registrarVersiculoApi } from "../../store/mirefugio/slices/versiculos/thunks";
import { NavBarApp } from "../components/NavBarApp";
import { VersiculoCard } from "../components/VersiculoCard";

export const UserAmbientePage = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { isLoading, misVersiculos } = useSelector(state => state.misVersiculos);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(getMisVersiculosApi(0, uid));
    }, [,uid]);

    const { onInputChange, formState, onResetForm } = useForm({
        libroBiblico: '',
        capitulo: '',
        versiculo: '',
        mensaje: ''
    });

    const onSubmitForm = async (event) => {
        event.preventDefault();
        if (formState.libroBiblico === "" || formState.mensaje === "" || formState.capitulo === 0 || formState.versiculo === 0) {
            toast.warning("Todos los campos son obligatorios");
            return;
        }

        setIsSubmitting(true);

        try {
            await dispatch(registrarVersiculoApi(formState, uid));
            toast.success("Frase publicada con éxito");
        } catch (error) {
            toast.error("Hubo un error al publicar la frase");
        } finally {
            setIsSubmitting(false);
            onResetForm();
        }
    }

    return (
        <>
            <NavBarApp />
            <Container fluid="sm">
                <Row>
                    <Col sm={6} className="mt-3">
                        <Card className="shadow">
                            <Card.Body>
                                <Form onSubmit={onSubmitForm}>
                                    <Form.Group className="mb-1">
                                        <FloatingLabel label="Libro bíblico">
                                            <Form.Control
                                                size="sm"
                                                aria-label="libroBiblico"
                                                name="libroBiblico"
                                                value={formState.libroBiblico}
                                                onChange={onInputChange}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-1">
                                        <Row>
                                            <Col xs={6}>
                                                <FloatingLabel label="Capítulo">
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        placeholder="Número capítulo"
                                                        name="capitulo"
                                                        value={formState.capitulo}
                                                        onChange={onInputChange}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col>
                                                <FloatingLabel label="Versículo">
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        placeholder="Versículo"
                                                        name="versiculo"
                                                        value={formState.versiculo}
                                                        onChange={onInputChange}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Describe frase</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="textarea"
                                            rows={4}
                                            placeholder="Mensaje..."
                                            name="mensaje"
                                            value={formState.mensaje}
                                            onChange={onInputChange}
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="light" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span><FontAwesomeIcon icon={faSave} /> Publicar frase</span>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <h4 className="mt-3"><em>Tus versículos publicados</em></h4>
                        <hr />
                        {isLoading ? (
                            <div className="text-center"><Spinner animation="border" /></div>
                        ) : (
                            misVersiculos && misVersiculos.length > 0 ? (
                                misVersiculos.map(v => (
                                    <VersiculoCard
                                        key={v._id}
                                        mensaje={v.mensaje}
                                        libro={v.libroBiblico}
                                        capitulo={v.capitulo}
                                        versiculo={v.versiculo}
                                        fecha={v.fechaPublicado}
                                        id={v._id}
                                        userid={v.userId}
                                        returnIdVersiculo={(id, esMio) => onEventVersiculo(id, esMio)}
                                        esMio={true}
                                    />
                                ))
                            ) : (
                                <p className="shadow my-2 p-2">Aún no publicaste frases bíblicas</p>
                            )
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
