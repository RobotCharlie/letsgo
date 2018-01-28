'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  what: { type: String, required: true },
  when: { type: Date, required: true },
  where: { type: String, required: true },
  active: { type: Boolean, default: true, required: true},
  private: { type: Boolean, default: false, required: true },
}, {
  versionKey: false
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
