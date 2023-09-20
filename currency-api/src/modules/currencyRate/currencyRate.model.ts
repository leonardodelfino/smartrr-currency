import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { ICurrencyRateDoc, ICurrencyRateModel } from './currencyRate.interfaces';

const currencyRateSchema = new mongoose.Schema<ICurrencyRateDoc, ICurrencyRateModel>(
  {
    baseCurrency: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return value.length === 3;
        },
        message: 'Base currency must have exactly 3 characters',
      },
    },
    targetCurrency: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return value.length === 3;
        },
        message: 'Target currency must have exactly 3 characters',
      },
    },
    exchangeRate: {
      type: Number,
      required: true,
    },
    currencyTime: {
      type: Date,
      required: true,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
currencyRateSchema.plugin(toJSON);
currencyRateSchema.plugin(paginate);


const CurrencyRate = mongoose.model<ICurrencyRateDoc, ICurrencyRateModel>('CurrencyRate', currencyRateSchema);

export default CurrencyRate;
