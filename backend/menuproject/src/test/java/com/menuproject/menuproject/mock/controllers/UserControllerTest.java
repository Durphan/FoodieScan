package com.menuproject.menuproject.mock.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.menuproject.menuproject.controller.user.UserController;
import com.menuproject.menuproject.dto.request.user.UserLoginDto;
import com.menuproject.menuproject.dto.request.user.UserRequestDto;
import com.menuproject.menuproject.dto.response.JwtDto;
import com.menuproject.menuproject.repository.UserRepository;
import com.menuproject.menuproject.service.user.UserServiceImpl;
import com.menuproject.menuproject.util.JwtUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserServiceImpl userServiceImpl;

    @MockitoBean
    private JwtUtils jwtUtils;
    @MockitoBean
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testAutenticacionUser() throws Exception {
        // Datos de prueba
        UserLoginDto userLoginDto = new UserLoginDto("test@example.com", "Password123");
        JwtDto jwtDto = new JwtDto(1L, "Test User", "test@example.com", "123456789", "fake-jwt-token");

        when(userServiceImpl.authotenticacionUser(any(UserLoginDto.class))).thenReturn(jwtDto);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userLoginDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(jwtDto.id()))
                .andExpect(jsonPath("$.name").value(jwtDto.name()))
                .andExpect(jsonPath("$.email").value(jwtDto.email()))
                .andExpect(jsonPath("$.phoneNumber").value(jwtDto.phoneNumber()))
                .andExpect(jsonPath("$.jwtToken").value(jwtDto.jwtToken()));
    }

    @Test
    void testRegisterUser() throws Exception {
        // Datos de prueba
        UserRequestDto userRequestDto = new UserRequestDto("Test User", "test@example.com", "123456789", "Pasword1234",
                new Date(2025 - 12 - 31));

        // realizamos simulacion de metodos
        when(bCryptPasswordEncoder.encode("Pasword1234")).thenReturn("hashedPassword");

        // realizamos conversion
        this.userServiceImpl.save(userRequestDto);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequestDto)))
                .andExpect(status().isCreated());
    }
}
