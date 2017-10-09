import { AppConfig } from './../common-model-utils/models/config-models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import * as jsyaml from 'js-yaml';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigurationService {
  private appConfigNotifier = new BehaviorSubject<AppConfig>(null);
  private appConfig: AppConfig;

  constructor(private http: HttpClient) {
    // http.get(url)
  }

  get(): Promise<AppConfig> {
    return new Promise<AppConfig>((resolve, reject) => {
      if (this.appConfig) {
        resolve(this.appConfig);
      } else {
        this.appConfigNotifier.first(x => x != null).subscribe(resolve, reject);
      }
    });
  }

}
