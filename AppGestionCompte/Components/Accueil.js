import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert, FlatList, StyleSheet} from "react-native";
import {Card} from "react-native-paper";

function Accueil(props){

    const [data, setData] = useState([]);

    const [loading, setIsLoading] = useState(true);
    const loadData = () => {
        fetch('http://192.168.24.248:19000/get', {
            method:'GET'
        })
            .then(resp=>resp.json())
            .then(article => {
                setData(article);
                setIsLoading(false);
            })
            .catch(error=>console.log(error));
    }

    useEffect(()=>{
        loadData();
    }, [])

    const modifier = (donnees) => {
        props.navigation.navigate('Modifier', {data:donnees});
    }

    const supprimer = (data) => {
        console.log(data.id);
        fetch(`http://192.168.24.248:19000/delete/${data.id}/`, {
            method: 'DELETE',
            headers:  {
                'Content-Type': 'application/json',
            }
        })
            .then(data=>{
                props.navigation.navigate("Accueil")
            })
            .catch(error=>console.log(error));
    }


    const renderData = (item) => {
        return (
            <Card style = {styles.card}>
                <Text> {item.date}</Text>
                <Text> {item.magasin} - {item.montant} $</Text>
                <Button title={'Modifier'} color={'orange'} onPress={()=> modifier(item)}/>
                <Button title={'Delete'} onPress={()=>supprimer(item)} color={'red'}/>
            </Card>

        )
    }

    return (
        <View>
            <FlatList data={data} renderItem={({item}) => {return renderData(item)}} onRefresh={()=>loadData()} refreshing={loading} keyExtractor={item =>`${item.id}`}/>
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