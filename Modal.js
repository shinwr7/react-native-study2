import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TextModal = ({ toDos, setToDos, saveTodos, loadTodos, itKey }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const editTodos = async () => {
    console.log(toDos, setToDos, saveTodos, itKey);
    Alert.alert('Edit To do', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: "I'm Sure",
        style: 'default',
        onPress: async () => {
          const editedTodos = { ...toDos };

          editedTodos[itKey].text = modalText;

          const newTodos = Object.assign(toDos, editedTodos);

          setToDos(newTodos);
          await saveTodos(newTodos);
          await loadTodos();
        },
      },
    ]);
    onPressModalClose();
  };
  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setModalText('');
    setIsModalVisible(false);
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={onPressModalOpen}>
          <Text>📝</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Modal
          animationType="slide"
          visible={isModalVisible}
          transparent={true}
        >
          <View style={styles.modalView}>
            <View>
              <TextInput
                style={styles.modalInputStyle}
                onChangeText={setModalText}
              ></TextInput>
            </View>
            <Pressable onPress={editTodos}>
              <Text>edit!</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default TextModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#17191c',
  },

  /**
   * 일반 화면 영역
   */
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 400,
  },

  /**
   * 모달 화면 영역
   */
  modalView: {
    marginTop: 230,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  modalInputStyle: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
});
