export class RegexUtil {
    public static space = /\s/g;
    public static onlyNumbers = /^[0-9]*$/;
    public static onlyLetters = /^[a-zA-Z]*$/;
    public static onlySpecialChars = /^[^a-zA-Z0-9]*$/;
    public static onlyLettersAndNumbers = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]*$/;
    public static onlyLettersAndSpecialChars = /^(?=.*?[a-zA-Z])(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    public static onlyNumbersAndSpecialChars = /^(?=.*?\d)(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]*$/;
}