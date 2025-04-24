package com.apb.getout.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import com.apb.getout.config.SecurityConfig;

@WebMvcTest
@Import(SecurityConfig.class)
public class CategoryRestControllerTest {

	@Autowired
	private MockMvc mocMvc;
	
	//@Test
	void testListSuccess() throws Exception {
		mocMvc.perform(get("/api/categories/"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$").isArray());
			
	}
}
