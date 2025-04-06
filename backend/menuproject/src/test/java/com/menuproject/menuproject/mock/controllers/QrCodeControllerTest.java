package com.menuproject.menuproject.mock.controllers;

import com.menuproject.menuproject.controller.qrcode.QrCodeController;
import com.menuproject.menuproject.repository.UserRepository;
import com.menuproject.menuproject.service.qrcode.QrCodeServiceImpl;
import com.menuproject.menuproject.util.JwtUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QrCodeController.class)
@AutoConfigureMockMvc(addFilters = false)

class QrCodeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtUtils jwtUtils;
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private QrCodeServiceImpl qrCodeServiceImpl;

    @Test
    void QrSaveTest() throws Exception{
        //damos datos
        String ulr = "Este es un url";

        // Simulamos comportamiento del servicio
        doNothing().when(qrCodeServiceImpl).saveQr(anyString());

        //simalamos accion
        mockMvc.perform(post("/api/qrcode/save")
                        .param("url", ulr)
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isAccepted())
                .andExpect(content().string("Se genero el QR"));

        // Verificar que el servicio se llamó correctamente
        verify(qrCodeServiceImpl, times(1)).saveQr("Este es un url");

    }
}
