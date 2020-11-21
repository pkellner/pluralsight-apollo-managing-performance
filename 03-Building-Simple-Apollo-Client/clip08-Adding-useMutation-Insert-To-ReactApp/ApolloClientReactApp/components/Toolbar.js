import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const Toolbar = ({ insertSpeakerEvent }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    insertSpeakerEvent(first, last, favorite);
    setFirst('');
    setLast('');
    setFavorite(false);
    setModal(!modal);
  };

  return (
    <section className="toolbar">
      <div className="container">
        <ul className="toolrow">
          <li>
            <div>
              <Button color="info" onClick={toggle}>
                <span>Insert Speaker</span>
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <Form onSubmit={handleSubmit}>
                  <ModalHeader toggle={toggle}>
                    Insert Speaker Dialog
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="first">First Name</Label>{' '}
                      <Input
                        name="first"
                        onChange={(e) => setFirst(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="first">Last Name</Label>{' '}
                      <Input
                        name="first"
                        onChange={(e) => setLast(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => setFavorite(e.target.value === 'on')}
                        />{' '}
                        Favorite
                      </Label>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit">Save</Button>
                  </ModalFooter>
                </Form>
              </Modal>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Toolbar;
