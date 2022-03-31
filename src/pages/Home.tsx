import React, {
  useState,
  useEffect
}
  from 'react'; //use são componete hooks
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}


export function Home() {
  const [newSkill, setNewSkill] = useState('');// Criando um vetor sendo que newSkill é o estado,e setNewSkill é função atualiza o estado
  const [mySkills, setMySkils] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    };

    setMySkils(oldState => [...oldState, data]); //Utilizando spread operator ...
  };
  function handleRemoveSkill(id: string) {
    setMySkils(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  };


  useEffect(() => {
    const currentHours = new Date().getHours();

    if (currentHours < 12) {
      setGretting('Good morning');
    } else if (currentHours > 12 && currentHours < 18) {
      setGretting('Good afternoon');
    } else {
      setGretting('Good night');
    }

  }, [])


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome, Wesley !
      </Text>
      <Text style={styles.gretting}>
        {gretting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite aqui...."
        placeholderTextColor="#555"
        onChangeText={setNewSkill} //onChangeText fica observando
      />

      <Button
        title="Adicionar"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        Lista de Compras
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 30,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS == 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  gretting: {
    color: '#fff'
  }
});