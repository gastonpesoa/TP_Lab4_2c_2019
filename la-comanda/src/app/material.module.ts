import { NgModule } from '@angular/core'
import {
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule
} from '@angular/material'

const MaterialComponents = [
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
]

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }