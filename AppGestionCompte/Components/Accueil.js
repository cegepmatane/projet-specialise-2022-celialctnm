import React, {useState} from 'react';
import {Text, View, Button, Alert, FlatList} from "react-native";

function Accueil(){

    const data = [
        {id: 1, magasin: "Carrefour", date: "2022-02-03", montant: 30},
        {id: 2, magasin: "Intermarché", date: "2022-01-25", montant: 95},
    ]

    return (
        <View>
            <Button title={"Découvrir"} onPress={() => Alert.alert("It's working")}/>
            <FlatList data={data} renderItem={(data) => {console.log(data)}} keyExtractor={item =>`$item.id`}/>
        </View>
    )
}

export default Accueil;