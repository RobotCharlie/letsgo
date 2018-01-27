'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
}, {
  versionKey: false
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);