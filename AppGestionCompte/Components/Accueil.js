import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet, VirtualizedList, SectionList, blurRadius} from "react-native";
import {Card, TextInput, Button, Text, List} from "react-native-paper";
import Appareil from "./Appareil";
import { Appbar } from 'react-native-paper';
import {ScrollView} from "react-native-gesture-handler";

function Accueil(props){

    let url= "http://192.168.24.49:55496/"

    const [data, setData] = useState([]);
    const [img, setImg] = useState("");

    const [loading, setIsLoading] = useState(true);
    const loadData = () => {
        fetch( url + 'get', {
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
        fetch( url + `/delete/${data.id}/`, {
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
            <View style={styles.card}>
                <Text style={styles.texte}> {item.date}</Text>
                <Text style={styles.texte}> {item.magasin} - {item.montant} $</Text>
                <View style={styles.box}>
                    <Button style={
                        {backgroundColor: '#3138ea', width: 10, paddingLeft: 15}
                    }
                            icon={"pen"}
                            mode={"contained"}
                            onPress={() => modifier(item)}/>
                    <Button style={
                        {backgroundColor: '#7D1DFF', marginLeft: 10}
                    }
                            mode={"contained"}
                            onPress={()=> supprimer(item)}>Supprimer</Button>
                </View>

            </View>

        )
    }

    return (

        <View style={{flex: 1}}>
            <View style={styles.accueil}>
                <View style={styles.txt}>
                    <Button style={
                        {margin: 10, backgroundColor: '#3138ea', width: 250}
                    }
                            icon={"camera"}
                            mode={"contained"}
                            onPress={()=> props.navigation.navigate("Appareil")}>Prendre une photo</Button>
                    <Button style={
                        {margin: 10, backgroundColor: '#7D1DFF', width: 250}
                    }
                            icon={"graph"}
                            mode={"contained"}
                            onPress={()=> props.navigation.navigate("Depenses")}>Accéder au diagramme</Button>
                    <Button style={
                        {margin: 10, backgroundColor: '#af31e0', width: 250}
                    }
                            icon={"pencil"}
                            mode={"contained"}
                            onPress={()=> props.navigation.navigate("Ajouter")}>Ajouter une dépense</Button>
                </View>
                <View>
                    <FlatList style={{
                        height: 600,
                        borderRadius: 10,
                        marginTop: 30,
                        marginLeft: 10,
                        marginRight: 10
                    }
                    } data={data} renderItem={({item}) => {return renderData(item)}} onRefresh={()=>loadData()} refreshing={loading} keyExtractor={item =>`${item.id}`}/>
                </View>
            </View>
    </View>


    )
}

const styles = StyleSheet.create({
    accueil: {
        flex: 1,
        backgroundColor: '#c7ccfc'
    },
    camera: {
        marginLeft: 170,
    },
    txt: {
        marginLeft: 60,
    },
    texte: {
        fontSize: 18,
        marginTop: 2
    },
    box: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
    },
    card: {
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#f8f8ff',
    }
})

export default Accueil;