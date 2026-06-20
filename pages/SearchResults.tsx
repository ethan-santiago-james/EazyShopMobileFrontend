import { Button, StyleSheet, Text, View } from "react-native";
import { useSearch } from "../context/SearchContext";

type Props = {

    numBrands: number;
    numStores: number;
}
export default function SearchResults({ numBrands, numStores }: Props) {

    const { brands, stores, setBrands, setStores } = useSearch();
    
    return (

        <View>

            <Button title="View All" onPress={() => {}} />
            <Button title={`View Stores With This Product (${numStores})`} onPress={() => {}} />
            <Button title={`View Brands With This Product (${numBrands})`} onPress={() => {}} />
        
        </View>

    );

}