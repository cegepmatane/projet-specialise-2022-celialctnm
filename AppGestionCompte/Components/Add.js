import React, {useState, useEffect} from 'react';
import {Text, View, Alert, FlatList, StyleSheet, Image} from "react-native";
import {Card, TextInput, Button} from "react-native-paper";

function Add(props){
    const [magasin,setMagasin] = useState("");
    const [date,setDate] = useState("");
    const [montant,setMontant] = useState("");
    const [categorie, setCategorie] = useState("");

    let url = "192.168.24.49:55496/"

    const insertData = () => {
        fetch('http://' + url+ '/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({magasin:magasin, date:date, montant:montant, categorie:categorie})
        })
            .then(resp=>resp.json())
            .then(data=>{
                props.navigation.navigate('Accueil')
            })
            .catch(error=>console.log(error))
    }

    return (
        <View style={styles.page}>
            <View style={{margin: 10}}>
                <TextInput
                    label = "Magasin"
                    value = {magasin}
                    mode = "outlined"
                    onChangeText = {text => setMagasin(text)}/>
                <TextInput
                    label = "Date"
                    value = {date}
                    mode = "outlined"
                    onChangeText = {text => setDate(text)}/>
                <TextInput
                    label = "Catégorie"
                    value = {categorie}
                    mode = "outlined"
                    onChangeText = {text => setCategorie(text)}/>
                <TextInput
                    label = "Montant"
                    value = {montant}
                    mode = "outlined"
                    onChangeText = {text => setMontant(text)}/>
                <Button style={
                    {margin: 10, backgroundColor: '#af31e0'}
                }
                        icon={"pencil"}
                        mode={"contained"}
                        onPress={()=>insertData()}>Insérer dépense</Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    },
    page: {
        backgroundColor: '#c7ccfc',
        height: 900,
    }
})

export default Add;