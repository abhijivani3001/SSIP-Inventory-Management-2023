import { useContext } from 'react';
import MergeContext from './merge-context';

const initialState = {
  mergedOrders: [],
};

const mergeReducer = (state, action) => {
  switch (action.type) {
    case 'MERGE_ORDER':
      return {
        ...state,
        mergedOrders: action.payload,
      };
    default:
      return initialState;
  }
};

export const getMergedOrders = () => {
  const context = useContext(MergeContext);
  return context;
};

const MergeProvider = (props) => {
  <MergeContext.Provider value={{ merge, dispatch }}>
    {props.children}
  </MergeContext.Provider>;
};

export default MergeProvider;
