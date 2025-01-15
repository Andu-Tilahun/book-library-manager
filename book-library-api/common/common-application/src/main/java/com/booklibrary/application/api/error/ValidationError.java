package com.booklibrary.application.api.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidationError {

	private String code;
	private String message;
	private String field;
}
