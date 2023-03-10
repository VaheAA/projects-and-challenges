import { AppDispatch } from '../../index';
import { IEvent } from '../../../models/IEvent';
import { IUser } from '../../../models/IUser';
import { EventActionsEnum, SetEventsAction, SetGuestsAction } from './types';
import UserService from '../../../api/userService';

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionsEnum.SET_GUESTS,
    payload
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionsEnum.SET_EVENTS,
    payload
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (error) {
      console.error(error);

    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || `[]`;
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || `[]`;
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (error) {
      console.error(error);
    }
  }
};