import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from './color';
import { useEffect, useState } from 'react';

// Pressable 은 좀 더 세심한 터치 범위 조정이 가능하도록 함
// TextInput 안에 keyboardType props 설정 가능
//                returnKeyTypes props 는? 엔더키에 들어가는 문구 바꿀수있음 ㅇㅇ
//                secureTextEntry 는 비번 입력 폼으로 바뀜
//                multiline 설정 가능
//                autoCapitalize 대분자 자동 셋

const STORAGE_KEY = '@toDos';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    loadTodos();
    loadLastView();
    console.log('working =============', working);
  }, []);
  const onChangeText = (payload) => setText(payload);
  const travel = () => {
    setWorking(false);
    saveLastView(false);
  };
  const work = () => {
    setWorking(true);
    saveLastView(true);
  };

  const loadLastView = async () => {
    const view = JSON.parse(await AsyncStorage.getItem('lastView'));
    setWorking(view);
  };

  const saveLastView = async (bool) => {
    console.log('JSON.stringify(bool) ================', JSON.stringify(bool));
    await AsyncStorage.setItem('lastView', JSON.stringify(bool));
  };

  const saveTodos = async (toSave) => {
    const s = JSON.stringify(toSave);
    await AsyncStorage.setItem(STORAGE_KEY, s);
  };

  const loadTodos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);

    setToDos(JSON.parse(s));
  };

  const delTodos = async (key) => {
    Alert.alert('Delete To Do', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: "I'm Sure",
        style: 'destructive',
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveTodos(newToDos);
        },
      },
    ]);
    return;
  };

  const addTodo = async () => {
    if (!text) {
      return;
    }
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await saveTodos(newToDos);
    // save to do
    setText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0} onPress={() => work()}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? 'white' : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => travel()}
          // underlayColor={"red"}
          // activeOpacity={0.5}
        >
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.grey : 'white',
            }}
          >
            Travel
          </Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          returnKeyType="done"
          onSubmitEditing={addTodo}
          style={styles.input}
          placeholder={working ? 'Add a To Do' : 'Where do you wanna go?'}
          onChangeText={onChangeText}
        ></TextInput>
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.todoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => delTodos(key)}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },

  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  toDo: {
    color: 'white',
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    backgroundColor: theme.todoBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    color: 'white',
    fontSize: 16,
  },
});
