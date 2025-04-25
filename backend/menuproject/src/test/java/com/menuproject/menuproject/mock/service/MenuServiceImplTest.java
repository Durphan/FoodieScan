package com.menuproject.menuproject.mock.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.menuproject.menuproject.dto.request.menu.MenuRequestDto;
import com.menuproject.menuproject.models.Business;
import com.menuproject.menuproject.models.Menu;
import com.menuproject.menuproject.models.User;
import com.menuproject.menuproject.repository.MenuRepository;
import com.menuproject.menuproject.service.business.BusinessServiceImpl;
import com.menuproject.menuproject.service.menu.MenuServiceImpl;

@ExtendWith(MockitoExtension.class)
class MenuServiceImplTest {

    @Mock
    private MenuRepository menuRepository;

    @InjectMocks
    private MenuServiceImpl menuServiceSut;

    @Mock
    private BusinessServiceImpl businessServiceImpl;

    private final Calendar calendar = Calendar.getInstance();
    {
        calendar.set(1996, Calendar.SEPTEMBER, 31);
    }

    private final Date date = calendar.getTime();

    private final MenuRequestDto menuRequestDto = new MenuRequestDto("test Menu", 0L);

    private final User testUser = new User(0L, "testuser@gmail.com", "testpassword", "1234532", date, "testuser");

    private final Business testBusiness = new Business(0L, "test business", "1234356", "testebusiness@gmail.com",
            testUser, false);

    @Test
    void menuSaveTest() {

        menuServiceSut.save(menuRequestDto);

        ArgumentCaptor<Menu> capturedMenu = ArgumentCaptor.forClass(Menu.class);

        Mockito.verify(menuRepository).save((capturedMenu.capture()));

        assertEquals("test Menu", capturedMenu.getValue().getName());
    }

    @Test
    void menuUpdateTest() {

        Menu menu = new Menu("testMenu", 0L, testBusiness, null);

        MenuRequestDto newMenuRequestDto = new MenuRequestDto("new test menu", 0L);

        Mockito.when(menuRepository.findById(0L)).thenReturn(Optional.of(menu));

        Mockito.when(businessServiceImpl.findById(0L)).thenReturn(testBusiness);

        menuServiceSut.upDateMenu(0L, newMenuRequestDto);

        ArgumentCaptor<Menu> capturedMenu = ArgumentCaptor.forClass(Menu.class);

        Mockito.verify(menuRepository).save(capturedMenu.capture());

        Menu newMenu = capturedMenu.getValue();

        assertEquals("new test menu", newMenu.getName());
    }

}
