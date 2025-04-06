package com.menuproject.menuproject.mock.service;


import com.menuproject.menuproject.dto.request.user.UserLoginDto;
import com.menuproject.menuproject.dto.request.user.UserRequestDto;
import com.menuproject.menuproject.dto.response.JwtDto;
import com.menuproject.menuproject.models.User;
import com.menuproject.menuproject.repository.UserRepository;
import com.menuproject.menuproject.service.user.UserServiceImpl;
import com.menuproject.menuproject.util.JwtUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private  BCryptPasswordEncoder bCryptPasswordEncoder;
    @Mock
    private  AuthenticationManager authenticationManager;
    @Mock
    private  JwtUtils jwtUtils;


    @InjectMocks
    private UserServiceImpl userService;


    @Test
    void testSave(){
        //damos datos
        when(bCryptPasswordEncoder.encode("123456")).thenReturn("hashedPassword");

        UserRequestDto userTest = new UserRequestDto("TestUsuario","testUsuario@email.com", "3514558796","123456", new Date(1996, 12, 31));

        //realizamos accion
        this.userService.save(userTest);

        //comprobamos
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(this.userRepository).save( userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        assertEquals("TestUsuario", capturedUser.getName());
        assertEquals("testUsuario@email.com", capturedUser.getEmail());
        assertEquals("3514558796", capturedUser.getPhoneNumber());
        assertEquals("hashedPassword", capturedUser.getPassword());
        assertEquals(new Date(1996, 12, 31), capturedUser.getDateOfBirth());

    }

    @Test
    void tesAuthenticacion() {
        //damos datos
        UserLoginDto userLoginDto = new UserLoginDto("testUsuario@email.com", "123456");

        //realizamos de autenticacion
        Authentication authenticationMock = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authenticationMock);

        //realizamos creacion del token
        String testJwt = "esto-es-un-token";
        when(jwtUtils.createToken(authenticationMock)).thenReturn(testJwt);

        //realizamos busqueda en BD
        User user = new User(1L, "testUsuario@email.com", "123456", "3514558796", new Date(1996, 12, 31), "TestUsuario");
        when(userRepository.findByEmail("testUsuario@email.com")).thenReturn(Optional.of(user));

        //llamamos al metodo
        JwtDto jwtDto = userService.authotenticacionUser(userLoginDto);


        // Verificar que los mocks fueron llamados correctamente
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtils).createToken(authenticationMock);
        verify(userRepository).findByEmail("testUsuario@email.com");

        // Verificar resultados
        assertNotNull(jwtDto);
        assertEquals(1L, jwtDto.id());
        assertEquals("TestUsuario", jwtDto.name());
        assertEquals("testUsuario@email.com", jwtDto.email());
        assertEquals("3514558796", jwtDto.phoneNumber());
        assertEquals("esto-es-un-token", jwtDto.jwtToken());

    }

    @Test
    void TestAuthenticacionNoFount(){

        //damos datos
        UserLoginDto userLoginDto = new UserLoginDto("noFoundEmail@gmail.com", "123456");

        //Realizamos consulta en BD "usuario no encontrado"
        when(userRepository.findByEmail("noFoundEmail@gmail.com")).thenReturn(Optional.empty());

        //verificar si lanza excepcion esperada
        assertThrows(UsernameNotFoundException.class, ()-> userService.authotenticacionUser(userLoginDto));

    }
}
