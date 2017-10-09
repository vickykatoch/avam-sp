export class CommonUtils {
    private static _instance = new CommonUtils();

    constructor() {
        if(CommonUtils._instance) {
            throw new Error("Error: Instantiation failed: Use CommonUtils.instance instead of new.");
        }
        CommonUtils._instance = this;
    }

    isStringNullOrEmpty(str: string, checkLocalEmpty?: boolean) : boolean {
        return !str || str.trim() === '' || ( checkLocalEmpty && str.toLowerCase() === '(empty)');
    }

    static get instance() : CommonUtils {
        return CommonUtils._instance;
    }
}