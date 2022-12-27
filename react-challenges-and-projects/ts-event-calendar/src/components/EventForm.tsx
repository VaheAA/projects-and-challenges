import { Form, Input, DatePicker, Button, Row, Select } from 'antd';
import { FC, useState } from 'react';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Dayjs } from 'dayjs';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
  guests: IUser[];
  submit: (e: IEvent) => void;
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent);

  const { user } = useTypedSelector((state) => state.auth);

  const selectDate = (date: Dayjs | null) => {
    if (date) setEvent({ ...event, date: formatDate(date.toDate()) });
  };

  const onSubmit = () => {
    submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("Can't add event in the past")
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Event guest" name="guest" rules={[rules.required()]}>
        <Select
          onChange={(guest: string) => setEvent({ ...event, guest })}
          options={guests.map((guest) => ({
            value: guest.username,
            label: guest.username
          }))}
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={false}>
            Create event
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
