// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect'
// Zone JS is required by default for Angular itself.
import 'zone.js/dist/zone'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import '../styles.styl'

platformBrowserDynamic().bootstrapModule(AppModule)
