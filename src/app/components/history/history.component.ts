import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CurrencyGetModel } from '../../models/currency-get.model';

@Component({
  selector: 'app-history',
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
    FormsModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  displayedColumns: string[] = ['baseCurrency', 'targetCurrency', 'amount', 'conversionRate', 'Total', 'Create At'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private currencyConverterService: CurrencyConverterService
  ) { }

  ngOnInit() {
    this.getCurrencyRecords();
  }

  getCurrencyRecords() {
    this.currencyConverterService.getCurrencyRecords().subscribe((resp: any) => {
      this.dataSource.data = resp.data.map((x: CurrencyGetModel) => {
        x.conversionRate = parseFloat(x.conversionRate.toFixed(4));
        return x;
      });     
    }, (error: any) => {
      console.log(error);
    });
  }

}
