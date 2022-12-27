import { Button, Layout, Modal, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  const { fetchGuests, createEvent, fetchEvents } = useActions();

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewEvent = (event: IEvent) => {
    setIsModalOpen(false);
    createEvent(event);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setIsModalOpen(true)}>Add event</Button>
      </Row>
      <Modal
        title="Add Event"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
