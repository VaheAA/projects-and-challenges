import { bindActionCreators } from 'redux';
import { allActionCreators } from '../store/reducers/actionCreators';
import { useTypedDispatch } from './useTypedDispatch';

export const useActions = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};