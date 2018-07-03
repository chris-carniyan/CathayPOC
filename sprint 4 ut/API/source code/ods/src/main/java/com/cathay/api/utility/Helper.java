package com.cathay.api.utility;

public class Helper {

	private Helper() {
		super();
	}

	public static String getCurrentClassAndMethodName() { 

		return Thread.currentThread().getStackTrace()[2].getClassName() + "." + 
		Thread.currentThread().getStackTrace()[2].getMethodName() + "()"; 
	}

}