import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet, Dimensions} from "react-native";
import {Card, TextInput, Button, Text, List} from "react-native-paper";
import Appareil from "./Appareil";
import {
    PieChart,
} from "react-native-chart-kit";

function Depenses(props){

    let url = "http://192.168.24.49:55496/"

    const [depenses, setDepense] = useState([
        {
            name: "Alimentaire",
            montant: 300,
            color: "rgb(255,204,247)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Voyage",
            montant: 500,
            color: "rgb(192,250,156)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Assurances",
            montant: 200,
            color: "rgb(255,234,156)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Banque",
            montant: 250,
            color: "rgb(180,250,255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Loisirs",
            montant: 100,
            color: "rgb(201,196,255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ]);

    const recupererData = () => {
        fetch(url + '/somme', {
            method:'GET'
        })
            .then(resp=>resp.json())
            .then(article => {
                console.log("____________")
                setDepense(article);
                console.log(depenses);
            })
            .catch(error=>console.log(error));
    }

    const chartConfig = {
        backgroundGradientFrom: "#000000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#0c0c0c",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    return (
        <View style={styles.page}>
            <View>
                <Button style={
                    {margin: 10, backgroundColor: '#af31e0', width: 300, marginLeft: 35}
                }
                        mode={"contained"}
                        onPress={()=> recupererData()}>Chargement des donn??es</Button>
            </View>
            <View>
                <PieChart
                    data={depenses}
                    width={400}
                    height={470}
                    chartConfig={chartConfig}
                    accessor={"montant"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />
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

export default Depenses;