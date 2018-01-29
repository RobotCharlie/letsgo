import _ from 'lodash';

const NUMBER_OF_PROFILE_PICS = 12;

export default class {
  constructor() {
    'ngInject';
  }

  getSrcPicture() {
    const userId = this.user._id;
    let sumOfElements = 0;
    _.each(userId, element => {
      sumOfElements = sumOfElements + this.convertToNum(element);
    });
    const profilePicNum = sumOfElements % NUMBER_OF_PROFILE_PICS;
    return `assets/images/default-profile-pictures/${profilePicNum}.jpg`;
  }

  convertToNum(element) {
    if(element instanceof Number) {
      return element;
    } else {
      return Math.abs(element.charCodeAt(0) - 97);
    }
  }
}
