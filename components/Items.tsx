import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Item {
  id: string;
  name: string;
  done: boolean;
}

interface Props {
  items: Item[];
  addItem: (name: string) => void;
  deleteItem: (id: string) => void;
  toggleDone: (id: string) => void;
}

export default function Items({ items, addItem, deleteItem, toggleDone }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addItem(input.trim());
      setInput('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Input Bar */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      {/* Item List */}
      <SwipeListView
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.rowFront, item.done && styles.rowDone]}
            onPress={() => toggleDone(item.id)}
          >
            <Text style={[styles.itemText, item.done && styles.itemDone]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={styles.rowBack}>
            <Button
              title="X"
              color="#d11a2a"
              onPress={() => {
                deleteItem(item.id);
                rowMap[item.id]?.closeRow();
              }}
            />
          </View>
        )}
        rightOpenValue={-75}
        disableRightSwipe
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 22,
    paddingHorizontal: 10,
    marginRight: 8,
  },

  rowFront: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 5,
  },

  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 16,
  },

  itemDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  rowDone: {
    backgroundColor: '#ddd',
  },
});
