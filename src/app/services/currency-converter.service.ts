import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyPostModel } from '../models/currency-post.model';
import { Observable } from 'rxjs';
import { CurrencyGetModel } from '../models/currency-get.model';
import { AvailableCurrencyModel } from '../models/available-currency-converter.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  // base_url = "http://localhost:3000/";
  base_url = "https://currency-converter-backend-tau.vercel.app/";

  constructor(
    private http: HttpClient
  ) { }

  convert(form: CurrencyPostModel): Observable<CurrencyGetModel>{
    return this.http.post<CurrencyGetModel>(`${this.base_url}currency/convert`, form);
  }

  getAvailableCurrencies(): Observable<AvailableCurrencyModel[]> {
    return this.http.get<AvailableCurrencyModel[]>(`${this.base_url}currency/getAvailableCurrencies`);
  }

  getCurrencyRecords(): Observable<CurrencyGetModel[]> {
    return this.http.get<CurrencyGetModel[]>(`${this.base_url}currency/getHistory`);
  }

}
