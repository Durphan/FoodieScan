package com.menuproject.menuproject.mock.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.assertj.MockMvcTester.MockMvcRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.menuproject.menuproject.controller.menu.MenuController;
import com.menuproject.menuproject.dto.request.menu.MenuRequestDto;
import com.menuproject.menuproject.dto.response.menu.MenuResponseDto;
import com.menuproject.menuproject.repository.UserRepository;
import com.menuproject.menuproject.service.business.BusinessServiceImpl;
import com.menuproject.menuproject.service.menu.MenuServiceImpl;
import com.menuproject.menuproject.util.JwtUtils;

@WebMvcTest(MenuController.class)
@AutoConfigureMockMvc(addFilters = false)
class MenuControllerTest {

    @MockitoBean
    private MenuController menuController;

    @MockitoBean
    private MenuServiceImpl menuServiceImpl;

    @MockitoBean
    private BusinessServiceImpl businessServiceImpl;

    @MockitoBean
    JwtUtils jwtUtils;

    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testSaveMenu() throws Exception {
        MenuRequestDto menuRequestDto = new MenuRequestDto("menu name", 0L);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/menu")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(menuRequestDto)))
                .andDo(MockMvcResultHandlers.print())
                .andExpectAll(
                        status().isOk(),
                        content().string("Menu creado correctamente"),
                        jsonPath("$.name").value(menuRequestDto.name()),
                        jsonPath("$.businessId").value(menuRequestDto.businessId()));
        Mockito.verify(menuServiceImpl).save(Mockito.any(MenuRequestDto.class));

    }

}
