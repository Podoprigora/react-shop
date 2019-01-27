class ModalManager {
    constructor() {
        this.modals = [];
    }

    add(modal) {
        let modalIdx = this.modals.indexOf(modal);

        if (modalIdx !== -1) {
            return modalIdx;
        }

        modalIdx = this.modals.length;
        this.modals.push(modal);

        return modalIdx;
    }

    remove(modal) {
        const modalIdx = this.modals.indexOf(modal);

        if (modalIdx === -1) {
            return modalIdx;
        }
        this.modals.splice(modalIdx, 1);

        return modalIdx;
    }

    isTopModal(modal) {
        return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
    }
}

export default ModalManager;
