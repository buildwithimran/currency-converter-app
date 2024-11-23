import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { CurrencyGetModel } from '../../models/currency-get.model';
import { AvailableCurrencyModel } from '../../models/available-currency-converter.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoading: Boolean = false;
  currencyForm!: FormGroup;
  currencies: AvailableCurrencyModel[] = [];
  createdRecord!: CurrencyGetModel;
  displayedColumns: string[] = ['baseCurrency', 'targetCurrency', 'amount', 'conversionRate', 'Create At'];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAvailableCurrencies();
    this.getCurrencyRecords();
    this.buildForm();
  }

  buildForm() {
    this.currencyForm = this.fb.group({
      baseCurrency: ['', [Validators.required, Validators.minLength(2)]],
      targetCurrency: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['1', [Validators.required, Validators.minLength(1)]]
    });
  }

  convert() {
    if (this.currencyForm.valid) {
      if(this.currencyForm.value.baseCurrency === this.currencyForm.value.targetCurrency) {
        Swal.fire({
          icon: "warning",
          title: "Oops",
          text: "Base currency and target currency cannot be the same!",
          showConfirmButton: false,
          timer: 5000
        });
        return;
      }
      
      if(this.currencyForm.value.amount <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Oops",
          text: " Amount must be greater than 0.",
          showConfirmButton: false,
          timer: 5000
        });
        return;
      }
      this.isLoading = true;
      this.currencyConverterService.convert(this.currencyForm.value).subscribe((respomse: CurrencyGetModel) => {
        this.createdRecord = respomse;
        this.isLoading = false;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  getAvailableCurrencies() {
    this.currencyConverterService.getAvailableCurrencies().subscribe((resp: AvailableCurrencyModel[]) => {
      this.currencies = Object.values(resp);      
    }, (error: any) => {
      console.log(error);
    });
  }

  getCurrencyRecords() {
    this.currencyConverterService.getCurrencyRecords().subscribe((resp: any) => {
      this.dataSource.data = resp.data;      
    }, (error: any) => {
      console.log(error);
    });
  }

  navigateToHistory() {
    this.router.navigate(['/history'])
  }

}
