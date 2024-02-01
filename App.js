import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { theme } from "./color";
import { useState } from "react";

// Pressable 은 좀 더 세심한 터치 범위 조정이 가능하도록 함
// TextInput 안에 keyboardType props 설정 가능
//                returnKeyTypes props 는? 엔더키에 들어가는 문구 바꿀수있음 ㅇㅇ
//                secureTextEntry 는 비번 입력 폼으로 바뀜
//                multiline 설정 가능
//                autoCapitalize 대분자 자동 셋

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (payload) => setText(payload);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const addTodo = () => {
    if (!text) {
      return;
    }
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
    setToDos(newToDos);
    // save to do
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0} onPress={() => work()}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.grey,
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
              color: working ? theme.grey : "white",
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
          placeholder={working ? "Add a To Do" : "Where do you wanna go?"}
          onChangeText={onChangeText}
        ></TextInput>
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.todoText}>{toDos[key].text}</Text>
            </View>
          ))}
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
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  toDo: {
    color: "white",
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    backgroundColor: theme.todoBg,
  },
  todoText: {
    color: "white",
    fontSize: 16,
  },
});
