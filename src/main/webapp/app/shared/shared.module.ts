import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MinhaCasaSharedLibsModule, MinhaCasaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MinhaCasaSharedLibsModule, MinhaCasaSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MinhaCasaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinhaCasaSharedModule {
  static forRoot() {
    return {
      ngModule: MinhaCasaSharedModule
    };
  }
}
