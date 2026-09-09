export const toggleOverflow = (isOpen: boolean): void => {
    if (isOpen) {
        document.body.classList.add('ovh');
    } else {
        document.body.classList.remove('ovh');
    }
};
