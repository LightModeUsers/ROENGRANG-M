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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

export { EditButton, DeleteButton };