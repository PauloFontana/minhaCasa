import { NgModule } from '@angular/core';

import { MinhaCasaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [MinhaCasaSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [MinhaCasaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class MinhaCasaSharedCommonModule {}
