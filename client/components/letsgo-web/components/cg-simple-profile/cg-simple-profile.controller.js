export default class {
  constructor() {
    'ngInject';
  }

  getSrcPicture() {
    return `assets/images/default-profile-pictures/${this.user.profilePicNum}.jpg`;
  }
}
