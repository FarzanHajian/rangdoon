import { store } from 'react-notifications-component';

function showToast(message, type) {
    store.addNotification({
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000,
            showIcon: true,
            pauseOnHover: true
        }
    });
}

export function rgbToHex(red, green, blue) {
    return `${Number(red).toString(16).padStart(2, '0')}${Number(green).toString(16).padStart(2, '0')}${Number(blue).toString(16).padStart(2, '0')}`;
}

export function showSuccess(message) {
    showToast(message, "success");
}

export function showError(message) {
    showToast(message, "danger");
}
