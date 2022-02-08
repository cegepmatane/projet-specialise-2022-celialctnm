import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert, FlatList, StyleSheet} from "react-native";
import {Card} from "react-native-paper";

function Accueil(props){

    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://10.1.55.165:19000/get', {
            method:'GET'
        })
            .then(resp=>resp.json())
            .then(article => {
                setData(article)
            })
    }, [])

    const renderData = (item) => {
        return (
            <Card style = {styles.card}>
                <Text> {item.date}</Text>
                <Text> {item.magasin} - {item.montant} $</Text>
            </Card>

        )
    }

    return (
        <View>
            <FlatList data={data} renderItem={({item}) => {return renderData(item)}} keyExtractor={item =>`${item.id}`}/>
            <Button color={'#8C27FF'} title={'Ajouter une dépense'} onPress={()=> props.navigation.navigate("Ajouter")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    }
})

export default Accueil;