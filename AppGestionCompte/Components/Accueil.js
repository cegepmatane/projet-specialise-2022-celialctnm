import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert, FlatList, StyleSheet} from "react-native";
import {Card} from "react-native-paper";

function Accueil(){

    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://192.168.24.248:19000/get', {
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
            <Button color={'#8C27FF'} title={'Ajouter une dépense'} onPress={()=>console.log("Press")}/>
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