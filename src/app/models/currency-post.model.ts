export class CurrencyPostModel {
    baseCurrency: string;
    targetCurrency: string;
    amount: number;

    constructor(
        baseCurrency: string,
        targetCurrency: string,
        amount: number
    ) {
        this.baseCurrency = baseCurrency;
        this.targetCurrency = targetCurrency;
        this.amount = amount;
    }
}
