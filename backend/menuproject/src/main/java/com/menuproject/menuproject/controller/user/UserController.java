package com.menuproject.menuproject.controller.user;

import com.menuproject.menuproject.dto.request.user.UserRequestDto;
import com.menuproject.menuproject.dto.request.user.UserLoginDto;
import com.menuproject.menuproject.dto.response.JwtDto;
import com.menuproject.menuproject.service.user.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController( UserServiceImpl userServiceImpl){
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> autenticacionUser(@RequestBody @Valid UserLoginDto userLoginDto){
        JwtDto jwtDto = userServiceImpl.authotenticacionUser(userLoginDto);
        return ResponseEntity.ok(jwtDto);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> saveUser(@RequestBody @Valid UserRequestDto userRequestDto){

            userServiceImpl.save(userRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
