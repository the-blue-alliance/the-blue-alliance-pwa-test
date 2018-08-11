import { Record } from 'immutable';

export default class Media extends Record({
  key: undefined,
  type: undefined,
  foreign_key: undefined,
  preferred: undefined,
  details:  undefined,
}) {
  isImage() {
    return this.type === 'imgur'
  }

  getThumbnailURL() {
    if (this.thumbnailURL === undefined) {
      this.thumbnailURL = `https://i.imgur.com/${this.foreign_key}m.jpg`
    }
    return this.thumbnailURL
  }
}
