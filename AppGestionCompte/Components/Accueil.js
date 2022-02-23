import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet} from "react-native";
import {Card, TextInput, Button, Text} from "react-native-paper";

function Accueil(props){

    const [data, setData] = useState([]);
    const [img, setImg] = useState("");

    const [loading, setIsLoading] = useState(true);
    const loadData = () => {
        fetch('http://10.1.55.165:49176/get', {
            method:'GET'
        })
            .then(resp=>resp.json())
            .then(article => {
                setData(article);
                setIsLoading(false);
            })
            .catch(error=>console.log(error));
    }

    const loadimg = () => {
        fetch('http://10.1.55.165:49176/getImg', {
            method:'GET'
        })
            .then(resp=>resp.json())
            .then(text => {
                setImg(text);
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
        fetch(`http:/10.1.55.165:49176/delete/${data.id}/`, {
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
                <Button style={
                    {margin: 10, backgroundColor: '#ffa800', width: 150}
                }
                        mode={"contained"}
                        onPress={()=> modifier(item)}>Modifier</Button>
                <Button style={
                    {margin: 10, backgroundColor: 'red', width: 150}
                }
                        mode={"contained"}
                        onPress={()=> supprimer(item)}>Supprimer</Button>
                <Button style={
                    {margin: 10, backgroundColor: 'blue', width: 300}
                }
                        mode={"contained"}
                        onPress={()=>loadimg()}>Obtenir texte image</Button>
                <Text> {img}</Text>
            </Card>

        )
    }

    return (
        <View>
            <Button style={
                {margin: 10, backgroundColor: '#7D1DFF', width: 250}
            }
                    mode={"contained"}
                    onPress={()=> props.navigation.navigate("Ajouter")}>Ajouter une dépense</Button>
                <FlatList data={data} renderItem={({item}) => {return renderData(item)}} onRefresh={()=>loadData()} refreshing={loading} keyExtractor={item =>`${item.id}`}/>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#e7e7e7'
    }
})

export default Accueil;