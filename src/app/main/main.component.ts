import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary classes

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoading: Boolean = false;
  currencyForm!: FormGroup;
  currencies: any = [];

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCurrencies();
    this.buildForm();
  }

  buildForm() {
    this.currencyForm = this.fb.group({
      baseCurrency: ['', [Validators.required, Validators.minLength(2)]],
      targetCurrency: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  convert() {
    if (this.currencyForm.valid) {
      this.isLoading = true;
      this.currencyConverterService.convert(this.currencyForm.value).subscribe((resp: any) => {
        console.log(resp);
        this.isLoading = false;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  getCurrencies() {
    this.currencyConverterService.getCurrencies().subscribe((resp: any) => {
      this.currencies = Object.values(resp.data);
    }, (error: any) => {
      console.log(error);

    })
  }

}
