// currency-get.model.ts
export class CurrencyGetModel {
  id?: string;
  baseCurrency!: string;
  targetCurrency!: string;
  amount!: number;
  conversionRate!: number;
  lastUpdated?: Date;
}