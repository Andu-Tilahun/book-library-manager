package com.booklibrary.application.api.error;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GlobalError {

	private String code;
	private String displayCode;
	private String message;

}
