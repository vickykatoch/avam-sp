export class CommonUtils {
    private static _instance = new CommonUtils();

    constructor() {
        if(CommonUtils._instance) {
            throw new Error("Error: Instantiation failed: Use CommonUtils.instance instead of new.");
        }
        CommonUtils._instance = this;
    }

    //#region String Helpers  
    isStringNullOrEmpty(str: string, checkLocalEmpty?: boolean) : boolean {
        return !str || str.trim() === '' || ( checkLocalEmpty && str.toLowerCase() === '(empty)');
    }
    //#endregion

    //#region Assertion Helpers
    throwIfTrue(isTrue: boolean, errorString: string) {
        if(isTrue) {
            throw new Error(errorString);
        }
    }
    //#endregion


    static get instance() : CommonUtils {
        return CommonUtils._instance;
    }
}