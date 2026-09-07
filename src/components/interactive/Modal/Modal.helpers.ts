export const normalizeHtml = (isOpen: boolean): void => {
    if (isOpen) {
        document.body.classList.add('ovh', 'hide');
    } else {
        document.body.classList.remove('ovh', 'hide');
    }
};
