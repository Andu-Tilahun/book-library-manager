package com.booklibrary.application.constant;

public enum ErrorCodes {
    DATA_NOT_FOUND("CMS4001","Data not found"),
    BAD_REQUEST("CMS4002", "Invalid request"),
    GENERIC_ERROR("CMS5001", "Generic error"),

    PASS_LST_FILE_NOT_PROVIDED("CMS4101","No File"),
    PASS_LST_INVALID_FILE_EXTENSION("CMS4102","Invalid file extension"),
    INPUT_NOT_NULL("CMS4103","Input not null"),

    EMAIL_NOT_VALID("CMS4104","Email not correct or in format"),

    STRING_WHITESPACE_NOT_ALLOWED("CMS4105","white space not allowed on string"),
    INTEGER_WHITESPACE_NOT_ALLOWED("CMS4106","white space not allowed on integer"),
    PHONE_NOT_VALID("CMS4107","phone is not valid"),
    SPECIAL_CHARACTERS_NOT_ALLOWED( "CMS4108","no special character"),
    IS_NOT_ALLOWED_STATUS_TYPE( "CMS4110","not valid status type"),

    DATE_NOT_VALID("CMS4111","Date not correct or in format"),

    UUID_NOT_NULL("CMS4111","No related object ID");
    private final String code;
    private final String message;

    ErrorCodes(String code, String message) {
        this.code = code;
        this.message= message;
    }
    public String getCode(){
        return this.code;
    }
    public String getMessage(){
        return this.message;
    }
}
