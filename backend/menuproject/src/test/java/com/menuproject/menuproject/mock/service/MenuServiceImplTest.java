package com.menuproject.menuproject.mock.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.menuproject.menuproject.dto.request.menu.MenuRequestDto;
import com.menuproject.menuproject.models.Business;
import com.menuproject.menuproject.models.Menu;
import com.menuproject.menuproject.repository.MenuRepository;
import com.menuproject.menuproject.service.business.BusinessServiceImpl;
import com.menuproject.menuproject.service.menu.MenuServiceImpl;
import com.menuproject.menuproject.service.user.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
class MenuServiceImplTest {

    @Mock
    private MenuRepository menuRepository;

    @InjectMocks
    private MenuServiceImpl menuServiceSut;

    @Mock
    private Business business;

    @Mock
    private BusinessServiceImpl businessServiceImpl;

    @Mock
    private UserServiceImpl userService;

    MenuRequestDto menuRequestDto = new MenuRequestDto("test Menu", 1L);

    Menu menu = new Menu(menuRequestDto.name(), 1L, business, null);

    @Test
    void menuSaveTest() {

        menuServiceSut.save(menuRequestDto);

        Mockito.when(menuRepository.findById(1L)).thenReturn(Optional.of(menu));

        assertEquals(menuRequestDto.name(), menuRepository.findById(menuRequestDto.businessId()).get().getName());
    }

}
