import { makeObservable, observable, action } from "mobx";

class EditStore {
  isEditClicked = false;

  constructor() {
    makeObservable(this, {
      isEditClicked: observable,
      toggleEditClick: action,
    });
  }

  toggleEditClick() {
    this.isEditClicked = !this.isEditClicked;
  }
}

const editStore = new EditStore();
export default editStore;
