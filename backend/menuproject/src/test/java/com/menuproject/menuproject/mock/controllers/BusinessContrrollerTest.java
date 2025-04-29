package com.menuproject.menuproject.mock.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.menuproject.menuproject.controller.business.BusinessController;
import com.menuproject.menuproject.dto.request.business.BusinessRequestDto;
import com.menuproject.menuproject.repository.UserRepository;
import com.menuproject.menuproject.service.business.BusinessServiceImpl;
import com.menuproject.menuproject.util.JwtUtils;

@WebMvcTest(BusinessController.class)
@AutoConfigureMockMvc(addFilters = false)
public class BusinessContrrollerTest {

    @MockitoBean
    private BusinessController businessController;

    @MockitoBean
    private BusinessServiceImpl businessServiceImpl;

    @MockitoBean
    private JwtUtils jwtUtils;

    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testSaveBusiness() throws Exception {
        BusinessRequestDto businessRequest = new BusinessRequestDto("test-business", "213245", "dasdaddas");

        mockMvc.perform(post("/api/business/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(businessRequest)))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.name").value(businessRequest.name()));
        Mockito.verify(businessServiceImpl).save(Mockito.any(BusinessRequestDto.class));

    }

}
