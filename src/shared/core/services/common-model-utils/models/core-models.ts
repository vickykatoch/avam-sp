export interface ApplicationInfo {
      name              : string;
      user              : string;
      type              : string;
      env               : string;
      region            : string;
      version           : string;      
}
export const MAIN_APP_NAME = "AVAM-MAIN-APP";

export interface UserInfo {
      id                : string;
      name              : string;
      resources         : {[key: string] : UserResource};
}

export interface UserResource {
      id                : number;
      name              : string;
      type              : string;
      permissions       : number;
}

export const ResourceType = Object.freeze({
      APP : "APP",
      VIEW : "VIEW"
});