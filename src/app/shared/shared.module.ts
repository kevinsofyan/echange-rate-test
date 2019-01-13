import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import {CurrencyComponent} from "@app/shared/currency/currency.component";
import { CurrencyService } from './currency/currency.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderComponent,
        CurrencyComponent
    ],
    providers: [CurrencyService],
    exports: [
        LoaderComponent,
        CurrencyComponent
    ]
})
export class SharedModule { }
