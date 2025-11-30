import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Items from './components/Items';
import { useItems } from './hooks/useItems';

export default function App() {
  const { items, addItem, deleteItem, toggleDone } = useItems();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <Items
        items={items}
        addItem={addItem}
        deleteItem={deleteItem}
        toggleDone={toggleDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  }
});
