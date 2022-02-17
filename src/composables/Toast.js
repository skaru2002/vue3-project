import {ref, onUnmounted} from 'vue';

export const useToast = () => {
    onUnmounted (() => {
        clearTimeout(toastTimeout.value)
    })

    const showToast = ref (false);
    const toastMessage = ref ('');
    const toastType = ref('success');
    const toastTimeout = ref (null);
    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastType.value = type;
        showToast.value =true;
        
        toastTimeout.value = setTimeout ( () => {
            toastMessage.value = '';
            toastType.value = 'success';
            showToast.value = false;
        }, 3000)
    }
    return {
        showToast,
        toastMessage,
        toastType,
        triggerToast,
    }
} 