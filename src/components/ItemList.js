import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';

// definisikan items di sini
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
];

// definisikan context untuk selected items
const SelectedItemsContext = React.createContext();

// definisikan reducer untuk mengubah state selected items
const selectedItemsReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(item => item.id !== action.payload.id);
    default:
      throw new Error();
  }
};

const ItemList = () => {
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, []);
  const [totalSelected, setTotalSelected] = useState(0);

  // gunakan useEffect untuk memperbarui totalSelected setiap kali selectedItems berubah
  useEffect(() => {
    setTotalSelected(selectedItems.length);
  }, [selectedItems]);

  // gunakan useCallback untuk mencegah Item komponen yang tidak perlu di-render ulang setiap kali selectedItems berubah
  const handleItemClick = useCallback(
    item => {
      if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
        dispatch({ type: 'remove', payload: item });
      } else {
        dispatch({ type: 'add', payload: item });
      }
    },
    [selectedItems]
  );

  return (
    <div>
      <SelectedItemsContext.Provider value={selectedItems}>
        <p>Total Selected: {totalSelected}</p>
        <ul>
          {items.map(item => (
            <Item key={item.id} item={item} onItemClick={handleItemClick} />
          ))}
        </ul>
      </SelectedItemsContext.Provider>
    </div>
  );
};

const Item = ({ item, onItemClick }) => {
  const selectedItems = useContext(SelectedItemsContext);

  // gunakan useEffect untuk memperbarui daftar item yang dipilih setiap kali selectedItems berubah
  useEffect(() => {
    console.log('Selected Items:', selectedItems);
  }, [selectedItems]);

  return (
    <li onClick={() => onItemClick(item)}>
      {item.name} {selectedItems.some(selectedItem => selectedItem.id === item.id) ? '(Selected)' : ''}
    </li>
  );
};

export default ItemList;