import { ApplicationInfo } from "../models/core-models";

export class CoreModelHelper {

    private static _instance = new CoreModelHelper();
    private _appInfo : ApplicationInfoHelper;

    constructor() {
        if (CoreModelHelper._instance) {
            throw new Error("Error: Instantiation failed: Use CoreModelHelper.instance instead of new.");
        }
        CoreModelHelper._instance = this;
    }
    get appInfoHelper() : ApplicationInfoHelper {
        this._appInfo = this._appInfo || new ApplicationInfoHelper();
        return this._appInfo;
    }
    static get instance() : CoreModelHelper {
        return CoreModelHelper._instance;
    }
}

class ApplicationInfoHelper {

    get emptyAppInfo() : ApplicationInfo {
        return {
            name              : '(empty)',
            type              : '(empty)',
            env               : '(empty)',
            region            : '(empty)',
            version           : '(empty)'
        };
    }
}