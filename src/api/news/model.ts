import {Schema, model} from 'mongoose';

export interface News {
    title: string;
    creator: string;
    creator_id: Schema.Types.ObjectId;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema<News>({
    title: {type: String, require: true},
    creator: {type: String, require: true},
    creator_id: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, require: true},
    createdAt: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)},
    updatedAt: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)}
});

export const Model = model('News', schema);