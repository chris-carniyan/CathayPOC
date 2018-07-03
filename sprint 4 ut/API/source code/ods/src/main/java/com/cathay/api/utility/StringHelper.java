package com.cathay.api.utility;

public class StringHelper {
	
	private StringHelper() {}
	
	public static boolean isEqual(String value, String value1) {
        if (((value == null) || (value.trim().length() == 0)) && ((value1 == null) || (value1.trim().length() == 0))) {
            return true;
        } else {
            if (value != null) {
                return value.equalsIgnoreCase(value1);
            } else {
                return value1.equalsIgnoreCase(value);
            }
        }
    }
	
	public static boolean isEmpty(String value) {
        return ((value == null) || (value.trim().length() == 0));
    }

}
