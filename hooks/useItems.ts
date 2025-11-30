import { useReducer } from 'react';

export type Item = {
  id: string;
  name: string;
  done: boolean;
};

type ItemAction =
  | { type: 'ADD'; name: string }
  | { type: 'DELETE'; id: string }
  | { type: 'TOGGLE'; id: string };

const initialState: Item[] = [];

const itemsReducer = (state: Item[], action: ItemAction): Item[] => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: Date.now().toString(), name: action.name, done: false }
      ];

    case 'DELETE':
      return state.filter(item => item.id !== action.id);

    case 'TOGGLE':
      return state.map(item =>
        item.id === action.id ? { ...item, done: !item.done } : item
      );

    default:
      return state;
  }
};

export const useItems = () => {
  const [items, dispatch] = useReducer(itemsReducer, initialState);

  const addItem = (name: string) =>
    dispatch({ type: 'ADD', name });

  const deleteItem = (id: string) =>
    dispatch({ type: 'DELETE', id });

  const toggleDone = (id: string) =>
    dispatch({ type: 'TOGGLE', id });

  return {
    items,
    addItem,
    deleteItem,
    toggleDone
  };
};
