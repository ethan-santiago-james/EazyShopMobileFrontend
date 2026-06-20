import { View, Text, Image, Button } from "react-native";

type ProductProps = {

    productName: string;
    description: string;
    price: number;
    imageUrl: string;
    storeName: string;

}

export default function Product({ productName, description, price, imageUrl, storeName }: ProductProps) { {

    return (

        <View>

            <Text>{productName}</Text>
            <Text>{description}</Text>
            <Text>${price.toFixed(2)}</Text>
            <Image source={{ uri: imageUrl }} />
            <Text>{storeName}</Text>
            <Button title="Add to Cart" onPress={() => {}} />
        </View>

    );

}