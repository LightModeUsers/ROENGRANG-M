import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const EditButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
    );
};

const DeleteButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
    );
};

const AddCartButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.addCartButton}>
            <Text style={styles.buttonTextlBlue}>ใส่ตะกร้า</Text>
        </TouchableOpacity>
    );
};
const CheckoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.checkoutButton}>
            <Text style={styles.buttonText}>ชำระเงิน</Text>
        </TouchableOpacity>
    );
};
const Status0Button = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.checkoutButton}>
            <Text style={styles.buttonText}>ยืนยัน</Text>
        </TouchableOpacity>
    );
};

const styles = {
    editButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
    },
    addCartButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        margin: 20,
        borderColor: '#2196F3', 
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
    },
    checkoutButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 20,
        borderRadius: 5,
        width: 150,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonTextlBlue: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

export { EditButton, DeleteButton, AddCartButton ,CheckoutButton, Status0Button};