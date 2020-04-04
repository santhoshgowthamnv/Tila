import React from 'react';
import { Modal } from 'react-native';

const Dialog = ({
    animationType,
    transparent,
    visible,
    onRequestClose,
    children,
}) => {
    return (
        <Modal
            animationType={animationType}
            transparent={transparent}
            visible={visible}
            onRequestClose={onRequestClose}>
            {children}
        </Modal>
    );
};

export default Dialog;
